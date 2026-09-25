import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Header } from '@/components/Header';

async function createBoard(formData: FormData) {
  'use server';
  const title = String(formData.get('title') ?? '').trim();
  if (!title) return;
  const id = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${Date.now().toString(36)}`;
  const supabase = await createClient();
  const { error } = await supabase.from('boards').insert({
    id, title,
    subtitle: String(formData.get('subtitle') ?? '').trim() || null,
    framing: String(formData.get('framing') ?? '').trim() || null,
  });
  if (error) throw new Error(`Could not create the board: ${error.message}`);
  redirect(`/b/${id}`);
}

export default async function Home() {
  const supabase = await createClient();
  const { data: boards } = await supabase.from('boards').select('id, title, subtitle, created_at').order('created_at', { ascending: false });
  if (boards?.length === 1) redirect(`/b/${boards[0].id}`);

  return (
    <>
      <Header title="Hot Wash" subtitle="Boards" />
      <main>
        <div className="section-heading"><h2>Boards</h2><div className="line" /></div>
        <div className="home-list">
          {(boards ?? []).map(b => (
            <Link key={b.id} href={`/b/${b.id}`} className="panel home-card">
              <h3>{b.title}</h3>
              <div className="hint">{b.subtitle}</div>
            </Link>
          ))}
          <form className="panel" action={createBoard}>
            <div className="panel-head"><h3>New board</h3></div>
            <div className="modal-body">
              <div className="field"><label htmlFor="nb-title">Title</label><input id="nb-title" name="title" required placeholder="Silver Maple hot wash" /></div>
              <div className="field"><label htmlFor="nb-sub">Subtitle</label><input id="nb-sub" name="subtitle" /></div>
              <div className="field"><label htmlFor="nb-framing">Framing line</label><textarea id="nb-framing" name="framing" rows={2} /></div>
              <button className="btn btn-navy" type="submit">Create board</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
