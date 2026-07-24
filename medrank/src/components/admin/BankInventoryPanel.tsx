'use client';

import { useCallback, useEffect, useState } from 'react';

type SpecialtyCount = { specialty: string; count: number };

type Inventory = {
  totalApproved: number;
  lotsApproved: number;
  nefroLots: number;
  nefroAdultTagged: number;
  nefroPedTagged: number;
  nefroBySpecialty?: number;
  clinicaMedica?: number;
  residenciaTagged: number;
  official2024plus: number;
  draftLots: number;
  bySpecialty?: SpecialtyCount[];
  canBuildNefro?: boolean;
  canBuildGeneral?: boolean;
  hint?: string | null;
};

export function BankInventoryPanel() {
  const [data, setData] = useState<Inventory | null>(null);
  const [loading, setLoading] = useState(true);
  const [repairing, setRepairing] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/questions/bank-inventory');
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? 'Falha ao contar questões');
        setData(null);
      } else {
        setData(json);
      }
    } catch {
      setError('Erro de conexão ao contar questões');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function repairTags() {
    setRepairing(true);
    setMessage('');
    setError('');
    try {
      const res = await fetch('/api/admin/questions/bank-inventory', { method: 'POST' });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? 'Falha ao corrigir tags');
      } else {
        setMessage(json.message ?? `Corrigidas ${json.updated} questões`);
        await load();
      }
    } catch {
      setError('Erro de conexão ao corrigir tags');
    }
    setRepairing(false);
  }

  return (
    <section className="mb-6 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-slate-900">Quantas questões tem no banco</h2>
          <p className="mt-1 text-sm text-slate-600">
            Contagem pelos lotes que você importou, por especialidade (Clínica Médica, Nefrologia…).
          </p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          disabled={loading}
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          {loading ? 'Contando…' : 'Atualizar'}
        </button>
      </div>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      {message ? <p className="mt-3 text-sm text-emerald-700">{message}</p> : null}

      {data ? (
        <>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat value={data.totalApproved} label="aprovadas (total)" />
            <Stat value={data.lotsApproved} label="nos lotes MedRank" />
            <Stat value={data.official2024plus} label="oficiais 2024+" />
            <Stat value={data.draftLots} label="ainda em rascunho" />
          </div>

          <h3 className="mt-5 text-sm font-semibold text-slate-800">Por especialidade (lotes)</h3>
          {(data.bySpecialty?.length ?? 0) > 0 ? (
            <ul className="mt-2 divide-y divide-slate-100 rounded-xl ring-1 ring-slate-200">
              {data.bySpecialty!.map((row) => (
                <li
                  key={row.specialty}
                  className="flex items-center justify-between gap-3 bg-white px-4 py-2.5 text-sm first:rounded-t-xl last:rounded-b-xl"
                >
                  <span className="font-medium text-slate-900">{row.specialty}</span>
                  <span className="tabular-nums font-bold text-teal-800">{row.count}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-amber-800">
              Nenhuma questão aprovada com especialidade nos lotes. Publique os lotes em Questões →
              Importar lote.
            </p>
          )}

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat value={data.clinicaMedica ?? 0} label="Clínica Médica" highlight />
            <Stat value={data.nefroBySpecialty ?? 0} label="Nefro + Nefroped" highlight />
            <Stat value={data.nefroLots} label="lotes Nefro" />
            <Stat value={data.residenciaTagged} label="tag residência" />
          </div>

          {data.hint ? (
            <div className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-950 ring-1 ring-amber-200">
              <p className="font-semibold">Atenção</p>
              <p className="mt-1">{data.hint}</p>
            </div>
          ) : null}

          {(data.nefroAdultTagged === 0 || data.nefroPedTagged === 0) && data.nefroLots > 0 ? (
            <button
              type="button"
              onClick={() => void repairTags()}
              disabled={repairing}
              className="mt-4 w-full rounded-xl bg-teal-800 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-900 disabled:opacity-50 sm:w-auto"
            >
              {repairing ? 'Corrigindo tags…' : 'Corrigir tags dos lotes Nefro'}
            </button>
          ) : null}
        </>
      ) : loading ? (
        <p className="mt-4 text-sm text-slate-500">Contando questões…</p>
      ) : null}
    </section>
  );
}

function Stat({
  value,
  label,
  highlight,
}: {
  value: number;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-3 text-center ring-1 ${
        highlight ? 'bg-teal-50 ring-teal-200' : 'bg-slate-50 ring-slate-200'
      }`}
    >
      <p className="text-xl font-bold text-slate-900">{value}</p>
      <p className="text-xs text-slate-600">{label}</p>
    </div>
  );
}
