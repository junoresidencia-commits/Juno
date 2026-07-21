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
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Treinos</h1>
      <p className="mt-2 text-slate-600">
        Escolha a especialidade, gere a prova e treine. Todo dia você pode montar um simulado novo.
      </p>

      <div className="mt-8 grid gap-4">
        <Link
          href={TRACK_CONFIG['nefrologia-avancada'].href}
          className="rounded-2xl bg-teal-700 p-6 text-white shadow-sm transition hover:bg-teal-800"
        >
          <p className="text-sm font-medium text-teal-100">Adulto · Título SBN</p>
          <h2 className="mt-1 text-xl font-bold">Nefrologia</h2>
          <p className="mt-2 text-sm text-teal-100">
            Clínica Médica aplicada ao rim · ligas · simulados até 100 questões
          </p>
          <p className="mt-4 text-sm font-semibold">
            {adv.toLocaleString('pt-BR')} questões · Entrar e gerar prova →
          </p>
        </Link>

        <Link
          href={TRACK_CONFIG.nefropediatria.href}
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:ring-teal-300"
        >
          <p className="text-sm font-medium text-teal-800">Pediátrica · SBN/SBP</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">Nefrologia Pediátrica</h2>
          <p className="mt-2 text-sm text-slate-600">
            Certificado de área · casos pediátricos · simulado 60 questões
          </p>
          <p className="mt-4 text-sm font-semibold text-teal-800">
            {ped.toLocaleString('pt-BR')} questões · Entrar e gerar prova →
          </p>
        </Link>
      </div>
    </div>
  );
}
