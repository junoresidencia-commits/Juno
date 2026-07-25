'use client';

import { useState } from 'react';

export function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    setErr('');
    try {
      const res = await fetch('/api/aluno/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword, confirm }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(data.error || 'Não foi possível alterar');
      } else {
        setMsg(data.message || 'Senha alterada.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirm('');
      }
    } catch {
      setErr('Erro de conexão');
    }
    setLoading(false);
  }

  const input =
    'mt-1 w-full rounded-xl border border-slate-300 px-3 py-3 text-base focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200';

  return (
    <form onSubmit={(e) => void submit(e)} className="space-y-4 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
      <div>
        <h2 className="font-semibold text-slate-900">Trocar senha</h2>
        <p className="mt-1 text-sm text-slate-600">
          Use a senha que o professor criou (ou a atual) e escolha uma nova.
        </p>
      </div>

      <label className="block text-sm font-medium text-slate-700">
        Senha atual
        <input
          type="password"
          autoComplete="current-password"
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className={input}
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Nova senha
        <input
          type="password"
          autoComplete="new-password"
          required
          minLength={4}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={input}
        />
      </label>

      <label className="block text-sm font-medium text-slate-700">
        Confirmar nova senha
        <input
          type="password"
          autoComplete="new-password"
          required
          minLength={4}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className={input}
        />
      </label>

      {err ? <p className="text-sm text-red-600">{err}</p> : null}
      {msg ? <p className="text-sm text-emerald-700">{msg}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="exam-tap w-full rounded-xl bg-teal-800 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-900 disabled:opacity-50"
      >
        {loading ? 'Salvando…' : 'Salvar nova senha'}
      </button>
    </form>
  );
}
