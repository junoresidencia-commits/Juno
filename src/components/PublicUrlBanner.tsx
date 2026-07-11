import { getServerOrigin } from '@/lib/app-url';
import { isDemoMode } from '@/lib/demo-mode';

export async function PublicUrlBanner() {
  if (!isDemoMode()) return null;

  const origin = await getServerOrigin();

  return (
    <div className="border-b border-emerald-200 bg-emerald-50 px-4 py-2 text-center text-xs text-emerald-900">
      <span className="font-medium">Link desta sessão:</span>{' '}
      <a href={`${origin}/login`} className="break-all underline">
        {origin}/login
      </a>
    </div>
  );
}
