'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMobileAction } from '@/hooks/use-mobile-action';
import { APP_TRACKS, type AppTrackId } from '@/lib/tracks/config';

interface Props {
  studentId: string;
  name: string;
  active: boolean;
  pending: boolean;
  leagueAdmin?: boolean;
  enabledTracks?: AppTrackId[];
  subscriptionExpiresAt?: string | null;
}

export function StudentActions({
  studentId,
  name,
  active,
  pending,
  leagueAdmin = false,
  enabledTracks = [],
  subscriptionExpiresAt = null,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [tracks, setTracks] = useState<AppTrackId[]>(
    enabledTracks.includes('general')
      ? enabledTracks
      : (['general', ...enabledTracks] as AppTrackId[])
  );

  async function apiCall(method: string, body?: object) {
    try {
      const res = await fetch(`/api/admin/students/${studentId}`, {
        method,
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error ?? 'Erro');
        return false;
      }
      router.refresh();
      return true;
    } catch {
      alert('Erro de conexão. Tente de novo.');
      return false;
    }
  }

  async function approve() {
    if (!confirm(`Confirmar PIX de R$ 10 e liberar ${name} por 30 dias?`)) return;
    setLoading('approve');
    await apiCall('PATCH', { action: 'approve' });
    setLoading(null);
  }

  async function renew() {
    if (!confirm(`Confirmar novo PIX e renovar ${name} por +30 dias?`)) return;
    setLoading('renew');
    await apiCall('PATCH', { action: 'renew' });
    setLoading(null);
  }

  async function toggleBlock() {
    if (!confirm(`${active ? 'Bloquear' : 'Desbloquear'} ${name}?`)) return;
    setLoading('block');
    await apiCall('PATCH', { action: active ? 'block' : 'unblock' });
    setLoading(null);
  }

  async function toggleLeagueAdmin() {
    if (
      !confirm(
        leagueAdmin
          ? `Remover ${name} como administrador de liga? Ele não poderá mais criar ligas.`
          : `Tornar ${name} administrador de liga?\n\nEle poderá criar ligas (grupos) e apagar as que criar.`
      )
    ) {
      return;
    }
    setLoading('league');
    await apiCall('PATCH', {
      action: leagueAdmin ? 'revoke_league_admin' : 'make_league_admin',
    });
    setLoading(null);
  }

  async function toggleTrack(id: AppTrackId, comingSoon?: boolean) {
    if (comingSoon) {
      alert('Este módulo ainda não está disponível. Quando estiver pronto, você liga aqui.');
      return;
    }
    // Residência Geral é acesso padrão — não pode desligar.
    if (id === 'general' && tracks.includes('general')) {
      alert('Residência Geral é o acesso padrão de todo aluno e não pode ser desligada.');
      return;
    }
    const next = tracks.includes(id) ? tracks.filter((t) => t !== id) : [...tracks, id];
    const withGeneral = next.includes('general') ? next : (['general', ...next] as AppTrackId[]);
    setTracks(withGeneral);
    setLoading(`track-${id}`);
    const ok = await apiCall('PATCH', { action: 'set_tracks', tracks: withGeneral });
    if (!ok) setTracks(tracks);
    setLoading(null);
  }

  async function deleteStudent() {
    if (!confirm(`Excluir permanentemente ${name}?`)) return;
    setLoading('delete');
    await apiCall('DELETE');
    setLoading(null);
  }

  const approveHandlers = useMobileAction(approve);
  const renewHandlers = useMobileAction(renew);
  const blockHandlers = useMobileAction(toggleBlock);
  const leagueHandlers = useMobileAction(toggleLeagueAdmin);
  const deleteHandlers = useMobileAction(deleteStudent);

  const expiresLabel = subscriptionExpiresAt
    ? new Date(subscriptionExpiresAt).toLocaleDateString('pt-BR')
    : null;

  return (
    <div className="space-y-3">
      {expiresLabel ? (
        <p className="text-xs text-slate-500">
          Assinatura até <strong className="text-slate-800">{expiresLabel}</strong>
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        {pending && (
          <button
            type="button"
            disabled={loading !== null}
            {...approveHandlers}
            className="exam-tap rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading === 'approve' ? '...' : 'Liberar após PIX'}
          </button>
        )}
        {!pending && (
          <button
            type="button"
            disabled={loading !== null}
            {...renewHandlers}
            className="exam-tap rounded-lg bg-teal-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-900 disabled:opacity-50"
          >
            {loading === 'renew' ? '...' : 'Renovar mês (+30d)'}
          </button>
        )}
        {!pending && (
          <button
            type="button"
            disabled={loading !== null}
            {...blockHandlers}
            className="exam-tap rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium hover:bg-slate-50 disabled:opacity-50"
          >
            {loading === 'block' ? '...' : active ? 'Bloquear' : 'Desbloquear'}
          </button>
        )}
        {!pending && active && (
          <button
            type="button"
            disabled={loading !== null}
            {...leagueHandlers}
            className={`exam-tap rounded-lg border px-4 py-2.5 text-sm font-medium disabled:opacity-50 ${
              leagueAdmin
                ? 'border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100'
                : 'border-slate-300 hover:bg-slate-50'
            }`}
          >
            {loading === 'league'
              ? '...'
              : leagueAdmin
                ? 'Remover admin de liga'
                : 'Tornar admin de liga'}
          </button>
        )}
        <button
          type="button"
          disabled={loading !== null}
          {...deleteHandlers}
          className="exam-tap rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
        >
          {loading === 'delete' ? '...' : 'Excluir'}
        </button>
      </div>

      {!pending && (
        <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Módulos (liga / desliga)
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {APP_TRACKS.map((t) => {
              const on = tracks.includes(t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  disabled={loading !== null || Boolean(t.comingSoon)}
                  title={t.description}
                  onClick={() => void toggleTrack(t.id, t.comingSoon)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold ring-1 disabled:opacity-50 ${
                    on
                      ? 'bg-emerald-700 text-white ring-emerald-800'
                      : 'bg-white text-slate-700 ring-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {loading === `track-${t.id}` ? '...' : on ? `✓ ${t.shortLabel}` : t.shortLabel}
                  {t.comingSoon ? ' (em breve)' : ''}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
