'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Notification = {
  id: string;
  title: string;
  body: string;
  kind: string;
  read_at: string | null;
  created_at: string;
};

export function StudentNotificationsBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(0);

  async function load() {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return;
      setItems(data.notifications ?? []);
      setUnread(data.unread ?? 0);
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function markAll() {
    await fetch('/api/notifications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ markAll: true }),
    });
    setItems((prev) => prev.map((n) => ({ ...n, read_at: n.read_at ?? new Date().toISOString() })));
    setUnread(0);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          if (!open) load();
        }}
        className="relative rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        aria-label="Notificações"
      >
        Avisos
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-xl bg-white p-3 shadow-lg ring-1 ring-slate-200">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">Notificações</p>
            {unread > 0 && (
              <button type="button" onClick={markAll} className="text-xs text-emerald-700 hover:underline">
                Marcar lidas
              </button>
            )}
          </div>
          {items.length === 0 ? (
            <p className="text-xs text-slate-500">Nenhum aviso.</p>
          ) : (
            <ul className="max-h-72 space-y-2 overflow-y-auto">
              {items.map((n) => (
                <li
                  key={n.id}
                  className={`rounded-lg px-2 py-2 text-xs ${
                    n.read_at ? 'bg-slate-50 text-slate-600' : 'bg-amber-50 text-amber-950'
                  }`}
                >
                  <p className="font-semibold">{n.title}</p>
                  <p className="mt-0.5 whitespace-pre-wrap">{n.body}</p>
                  <p className="mt-1 text-[10px] text-slate-400">
                    {new Date(n.created_at).toLocaleString('pt-BR')}
                  </p>
                </li>
              ))}
            </ul>
          )}
          <Link
            href="/aluno"
            className="mt-2 block text-center text-xs text-slate-500 hover:text-slate-800"
            onClick={() => setOpen(false)}
          >
            Fechar
          </Link>
        </div>
      )}
    </div>
  );
}
