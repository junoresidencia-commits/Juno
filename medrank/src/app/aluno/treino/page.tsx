import Link from 'next/link';
import { requireAuth } from '@/lib/auth';
import { getTrackBankCount } from '@/lib/treino/runtime';
import { TRACK_CONFIG } from '@/lib/treino/config';

export default async function TreinoHubPage() {
  await requireAuth();
  const ped = getTrackBankCount('nefropediatria');
  const adv = getTrackBankCount('nefrologia-avancada');

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/aluno" className="text-sm text-teal-700 hover:underline">
        ← Início
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Treinos de Nefrologia</h1>
      <p className="mt-2 text-slate-600">
        Bancos vivos inéditos — estilo título SBN, sem copiar provas oficiais.
      </p>

      <div className="mt-8 grid gap-4">
        <Link
          href={TRACK_CONFIG['nefrologia-avancada'].href}
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:ring-teal-300"
        >
          <p className="text-sm font-medium text-teal-800">Adulto · Título SBN</p>
          <h2 className="mt-1 text-xl font-bold">Nefrologia Avançada</h2>
          <p className="mt-2 text-sm text-slate-600">
            Clínica Médica aplicada ao rim · ligas · simulados até 100 Q
          </p>
          <p className="mt-3 text-sm font-semibold text-teal-800">
            {adv.toLocaleString('pt-BR')} questões no banco
          </p>
        </Link>

        <Link
          href={TRACK_CONFIG.nefropediatria.href}
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:ring-teal-300"
        >
          <p className="text-sm font-medium text-teal-800">Pediátrica · SBN/SBP</p>
          <h2 className="mt-1 text-xl font-bold">Nefrologia Pediátrica</h2>
          <p className="mt-2 text-sm text-slate-600">
            Certificado de área · casos pediátricos · simulado 60 Q
          </p>
          <p className="mt-3 text-sm font-semibold text-teal-800">
            {ped.toLocaleString('pt-BR')} questões no banco
          </p>
        </Link>
      </div>
    </div>
  );
}
