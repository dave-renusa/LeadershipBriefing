import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { BoardApp } from '@/components/BoardApp';
import type { Board, Card, Comment, Profile, Survey, Vote } from '@/lib/board';

export default async function BoardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const [{ data: { user } }, { data: board }] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from('boards').select('id, title, subtitle, framing').eq('id', id).maybeSingle<Board>(),
  ]);
  if (!board || !user) notFound();

  const { data: cards } = await supabase.from('cards').select('*').eq('board_id', id).returns<Card[]>();
  const cardIds = (cards ?? []).map(c => c.id);
  const [{ data: votes }, { data: comments }, { data: profiles }, { data: survey }] = await Promise.all([
    supabase.from('votes').select('*').in('card_id', cardIds).returns<Vote[]>(),
    supabase.from('comments').select('*').in('card_id', cardIds).returns<Comment[]>(),
    supabase.from('profiles').select('id, display_name').returns<Profile[]>(),
    supabase.from('surveys').select('*').eq('board_id', id).limit(1).maybeSingle<Survey>(),
  ]);

  return (
    <BoardApp
      board={board}
      initialCards={cards ?? []}
      initialVotes={votes ?? []}
      initialComments={comments ?? []}
      initialProfiles={profiles ?? []}
      survey={survey ?? null}
      userId={user.id}
    />
  );
}
