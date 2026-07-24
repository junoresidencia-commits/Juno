import { redirect } from 'next/navigation';

/** Alias antigo — fluxo pago agora em /admin/pagamentos */
export default function ConvitesPage() {
  redirect('/admin/pagamentos');
}
