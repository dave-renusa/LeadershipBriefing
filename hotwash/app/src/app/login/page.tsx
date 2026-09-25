'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');
    const params = new URLSearchParams(window.location.search);
    const next = params.get('next') ?? '/';
    const { error } = await createClient().auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}` },
    });
    if (error) { setState('error'); setMessage(error.message); } else setState('sent');
  }

  return (
    <div className="login">
      <div className="panel login-panel">
        <div className="panel-head"><h3>Sign in to Hot Wash</h3></div>
        <form className="modal-body" onSubmit={submit}>
          <div className="field">
            <label htmlFor="email">RenUSA email</label>
            <input id="email" type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <button className="btn btn-navy" type="submit" disabled={state === 'sending'}>
            {state === 'sending' ? 'Sending link' : 'Email me a sign-in link'}
          </button>
          {state === 'sent' && <p className="hint">Check your inbox for a sign-in link. It opens this board.</p>}
          {state === 'error' && <p className="notice">Could not send the link: {message}</p>}
        </form>
      </div>
    </div>
  );
}
