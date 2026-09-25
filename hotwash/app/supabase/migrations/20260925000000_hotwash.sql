-- Hot Wash board schema. Ported from the artifact prototype's data model:
-- boards, cards, votes (one per person per card), comments, plus profiles and surveys.

-- Who may use the app. Edit the domain list to add staff email domains.
create or replace function public.is_staff() returns boolean
language sql stable as $$
  select coalesce(split_part(auth.jwt() ->> 'email', '@', 2), '') = any (array['renusa.org'])
$$;

create table public.boards (
  id text primary key,
  title text not null,
  subtitle text,
  framing text,
  created_at timestamptz not null default now()
);

create table public.cards (
  id uuid primary key default gen_random_uuid(),
  board_id text not null references public.boards(id) on delete cascade,
  n integer,
  title text not null,
  col text not null default 'parking' check (col in ('build','in','debate','care','out','parking')),
  ord double precision not null default 0,
  description text not null default '',
  verdict text not null default '',
  breaks text not null default '',
  owner text not null default '',
  effort text check (effort in ('S','M','L')),
  track text check (track in ('community','cover')),
  survey_tactic text,
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index cards_board_idx on public.cards (board_id, col, ord);

create table public.votes (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references public.cards(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  vote text not null check (vote in ('keep','kill','unsure')),
  ts timestamptz not null default now(),
  unique (card_id, user_id)
);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  card_id uuid not null references public.cards(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  text text not null check (length(text) between 1 and 4000),
  ts timestamptz not null default now()
);
create index comments_card_idx on public.comments (card_id, ts);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default ''
);

-- Post-mortem survey results shown on the Scorecard tab (one row per survey).
create table public.surveys (
  id text primary key,
  board_id text references public.boards(id) on delete cascade,
  title text not null,
  respondents integer,
  note text,
  tactics jsonb not null default '[]',
  responses jsonb not null default '[]',
  takeaways jsonb not null default '[]'
);

-- Keep updated_at current on card edits.
create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
create trigger cards_touch before update on public.cards for each row execute function public.touch_updated_at();

-- Create a profile for each new user, named from the email local part until they edit it.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, initcap(replace(split_part(new.email, '@', 1), '.', ' ')))
  on conflict (id) do nothing;
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Row level security: staff read everything; votes and comments are written only by their author.
alter table public.boards   enable row level security;
alter table public.cards    enable row level security;
alter table public.votes    enable row level security;
alter table public.comments enable row level security;
alter table public.profiles enable row level security;
alter table public.surveys  enable row level security;

create policy "staff read boards"   on public.boards   for select to authenticated using (public.is_staff());
create policy "staff create boards" on public.boards   for insert to authenticated with check (public.is_staff());
create policy "staff edit boards"   on public.boards   for update to authenticated using (public.is_staff());

create policy "staff read cards"    on public.cards for select to authenticated using (public.is_staff());
create policy "staff add cards"     on public.cards for insert to authenticated with check (public.is_staff());
create policy "staff edit cards"    on public.cards for update to authenticated using (public.is_staff());
create policy "staff delete cards"  on public.cards for delete to authenticated using (public.is_staff());

create policy "staff read votes"    on public.votes for select to authenticated using (public.is_staff());
create policy "cast own vote"       on public.votes for insert to authenticated with check (public.is_staff() and user_id = auth.uid());
create policy "change own vote"     on public.votes for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "clear own vote"      on public.votes for delete to authenticated using (user_id = auth.uid());

create policy "staff read comments" on public.comments for select to authenticated using (public.is_staff());
create policy "post own comment"    on public.comments for insert to authenticated with check (public.is_staff() and user_id = auth.uid());
create policy "delete own comment"  on public.comments for delete to authenticated using (user_id = auth.uid());

create policy "staff read profiles" on public.profiles for select to authenticated using (public.is_staff());
create policy "edit own profile"    on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

create policy "staff read surveys"  on public.surveys for select to authenticated using (public.is_staff());

-- Realtime on the three live tables.
alter publication supabase_realtime add table public.cards, public.votes, public.comments;
