import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { usesDemoStore } from '@/lib/demo-data';
import { EXPECTED_LOT_TOTALS } from '@/lib/question-bank/expected-lot-totals';
import { countApprovedLotsBySpecialty } from '@/lib/question-bank/lot-pool';
import { RepairLotTagsButton } from '@/components/admin/RepairLotTagsButton';

const LOT_OR =
  'lote_importacao.like.MEDRANK_AUTORAL_2026_LOTE_%,lote_importacao.like.MEDRANK_NEFRO_NEFROPED_2026_LOTE_%,lote_importacao.like.MEDRANK_DIRETRIZES_ATUAIS_2026_LOTE_%';

/**
 * Snapshot server-side do banco — confirma se os ~800–1350 lotes estão publicados
 * e nas especialidades certas (sem depender do fetch do cliente).
 */
export async function BankReadinessPanel() {
  if (usesDemoStore()) {
    return (
      <section className="mb-6 rounded-2xl bg-slate-100 p-5 text-sm text-slate-700 ring-1 ring-slate-200">
        Modo demo — sem contagem real do Supabase.
      </section>
    );
  }

  const admin = createAdminClient() ?? (await createClient());

  const [
    lotsApproved,
    nefroLots,
    autoralLots,
    dirLots,
    draftLots,
    officialRecent,
    clinica,
    nefroEsp,
    nefroPedEsp,
    bySpecialty,
  ] = await Promise.all([
    admin.from('questions').select('*', { count: 'exact', head: true }).eq('bank_status', 'approved').or(LOT_OR),
    admin
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('bank_status', 'approved')
      .like('lote_importacao', 'MEDRANK_NEFRO_NEFROPED_2026_LOTE_%'),
    admin
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('bank_status', 'approved')
      .like('lote_importacao', 'MEDRANK_AUTORAL_2026_LOTE_%'),
    admin
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('bank_status', 'approved')
      .like('lote_importacao', 'MEDRANK_DIRETRIZES_ATUAIS_2026_LOTE_%'),
    admin
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .in('bank_status', ['draft', 'pending_review'])
      .or(LOT_OR),
    admin
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('bank_status', 'approved')
      .eq('question_origin', 'official')
      .gte('year', 2024),
    admin
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('bank_status', 'approved')
      .or(LOT_OR)
      .ilike('specialty', 'Clínica Médica'),
    admin
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('bank_status', 'approved')
      .ilike('specialty', 'Nefrologia'),
    admin
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('bank_status', 'approved')
      .ilike('specialty', 'Nefropediatria'),
    countApprovedLotsBySpecialty(admin),
  ]);

  const lots = lotsApproved.count ?? 0;
  const nefro = nefroLots.count ?? 0;
  const autoral = autoralLots.count ?? 0;
  const dir = dirLots.count ?? 0;
  const draft = draftLots.count ?? 0;
  const official = officialRecent.count ?? 0;
  const clinicaN = clinica.count ?? 0;
  const nefroN = nefroEsp.count ?? 0;
  const pedN = nefroPedEsp.count ?? 0;

  const readyLots = lots >= 800;
  const readyNefro = nefroN >= 50 && pedN >= 50;
  const readyGeral = clinicaN >= 50 || autoral + dir >= 100;
  const needsRepair = nefro >= 50 && (nefroN < 20 || pedN < 20);

  return (
    <section className="mb-6 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-slate-900">Checklist do banco</h2>
          <p className="mt-1 text-sm text-slate-600">
            Esperado nos arquivos: <strong>{EXPECTED_LOT_TOTALS.total}</strong> questões nos lotes
            01–27. Você importou ~800+ — confira se estão <strong>publicadas</strong>.
          </p>
        </div>
        <Link href="/admin/questoes" className="text-sm font-semibold text-emerald-700 hover:underline">
          Questões →
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat
          value={lots}
          label={`lotes publicados (meta ≥800 / ${EXPECTED_LOT_TOTALS.total})`}
          ok={readyLots}
        />
        <Stat value={autoral} label={`autoral (meta ${EXPECTED_LOT_TOTALS.autoral})`} ok={autoral >= 200} />
        <Stat value={nefro} label={`lotes Nefro (meta ${EXPECTED_LOT_TOTALS.nefro})`} ok={nefro >= 200} />
        <Stat value={dir} label={`diretrizes (meta ${EXPECTED_LOT_TOTALS.diretrizes})`} ok={dir >= 100} />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat value={clinicaN} label="Clínica Médica" ok={clinicaN >= 50} />
        <Stat value={nefroN} label="esp. Nefrologia" ok={nefroN >= 50} />
        <Stat value={pedN} label="esp. Nefropediatria" ok={pedN >= 50} />
        <Stat value={official} label="oficiais 2024+" ok />
      </div>

      {bySpecialty.length > 0 ? (
        <ul className="mt-4 max-h-48 space-y-1 overflow-y-auto rounded-xl bg-slate-50 p-3 text-sm ring-1 ring-slate-100">
          {bySpecialty.map((row) => (
            <li key={row.specialty} className="flex justify-between gap-2">
              <span className="text-slate-800">{row.specialty}</span>
              <span className="tabular-nums font-semibold text-teal-800">{row.count}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-4 space-y-2 text-sm">
        <Check ok={readyLots} text={readyLots ? `Lotes publicados: ${lots}` : `Só ${lots} publicadas — publique os lotes em Importar`} />
        <Check ok={readyGeral} text={readyGeral ? 'Residência Geral tem pool suficiente' : 'Falta Clínica Médica / lotes autoral publicados'} />
        <Check ok={readyNefro} text={readyNefro ? 'Nefrologia + Nefropediatria no lugar certo' : 'Nefro ainda sem especialidade suficiente'} />
        <Check ok={draft === 0} text={draft === 0 ? 'Nenhum lote em rascunho' : `${draft} questões ainda em rascunho`} />
      </div>

      {needsRepair ? (
        <div className="mt-4 rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
          <p className="text-sm font-semibold text-amber-950">
            Lotes Nefro existem, mas a especialidade não bate. Corrija as tags e regenere as provas.
          </p>
          <div className="mt-3">
            <RepairLotTagsButton />
          </div>
        </div>
      ) : null}

      {readyLots && readyGeral && readyNefro ? (
        <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900 ring-1 ring-emerald-200">
          Banco pronto. Em Provas → Avançado → Regenerar hoje, se precisar.
        </p>
      ) : null}
    </section>
  );
}

function Stat({ value, label, ok }: { value: number; label: string; ok?: boolean }) {
  return (
    <div
      className={`rounded-xl p-3 text-center ring-1 ${
        ok === false ? 'bg-amber-50 ring-amber-200' : ok ? 'bg-emerald-50 ring-emerald-200' : 'bg-slate-50 ring-slate-200'
      }`}
    >
      <p className="text-xl font-bold text-slate-900">{value}</p>
      <p className="text-[11px] leading-snug text-slate-600">{label}</p>
    </div>
  );
}

function Check({ ok, text }: { ok: boolean; text: string }) {
  return (
    <p className={ok ? 'text-emerald-800' : 'text-amber-900'}>
      {ok ? '✓' : '○'} {text}
    </p>
  );
}
