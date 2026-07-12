import { Suspense } from 'react';
import { LoginForm } from '@/components/login/LoginForm';
import { isDemoMode } from '@/lib/demo-mode';

export default function LoginPage() {
  const demoMode = isDemoMode();

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 text-slate-900 shadow-xl ring-1 ring-slate-200 sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-2xl font-bold text-white shadow-lg shadow-emerald-600/30">
            M
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">MedRank</h1>
          <p className="mt-2 text-base text-slate-600">
            Disputa diária e ranking — entre com sua conta
          </p>
        </div>

        <Suspense
          fallback={
            <div className="space-y-4">
              <div className="h-14 animate-pulse rounded-xl bg-slate-100" />
              <div className="h-14 animate-pulse rounded-xl bg-slate-100" />
              <div className="h-12 animate-pulse rounded-xl bg-slate-100" />
            </div>
          }
        >
          <LoginForm demoMode={demoMode} />
        </Suspense>

        <p className="mt-6 text-center text-sm text-slate-500">
          Novo aluno? O professor cria seu login em <strong className="text-slate-700">Alunos</strong>.
        </p>
      </div>
    </div>
  );
}
