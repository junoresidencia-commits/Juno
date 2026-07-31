import Link from 'next/link';
import { CadastroForm } from '@/components/cadastro/CadastroForm';
import {
  formatPriceBrl,
  formatWhatsAppDisplay,
  FULL_MONTHLY_CENTS,
  QUARTER_PRICE_CENTS,
} from '@/lib/billing/pix';

/** Cadastro público — sem convite. Aluno cria login → PIX → WhatsApp comprovante → admin libera. */
export default async function PublicCadastroPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string; email?: string }>;
}) {
  const query = await searchParams;
  const success = query.ok === '1';
  const quarter = formatPriceBrl(QUARTER_PRICE_CENTS);
  const fullMonth = formatPriceBrl(FULL_MONTHLY_CENTS);

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-slate-900 shadow-lg ring-1 ring-slate-200">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-teal-900">MedRank</h1>
          <p className="mt-2 text-sm text-slate-600">
            Promo {formatPriceBrl()}/mês por 3 meses
          </p>
          <p className="mt-1 text-xs text-slate-600">
            Só 1 mês: {fullMonth} · 3 meses à vista: {quarter} (−R$ 10)
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Após o PIX, WhatsApp {formatWhatsAppDisplay()} com o comprovante.
          </p>
        </div>
        <CadastroForm
          valid
          error={success ? undefined : query.error}
          success={success}
          successEmail={query.email}
        />
        <p className="mt-6 text-center text-sm text-slate-600">
          Já tem conta?{' '}
          <Link href="/login" className="text-emerald-700 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
