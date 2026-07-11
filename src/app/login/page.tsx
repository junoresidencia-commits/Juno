import { Suspense } from 'react';
import { LoginForm } from '@/components/login/LoginForm';
import { isDemoMode } from '@/lib/demo-mode';

export default function LoginPage() {
  const demoMode = isDemoMode();

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-slate-900 shadow-lg ring-1 ring-slate-200">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-emerald-700">MedRank</h1>
          <p className="mt-2 text-sm text-slate-600">
            Prova diária e ranking — entre com sua conta
          </p>
        </div>

        <Suspense fallback={<div className="h-40 animate-pulse rounded-lg bg-slate-100" />}>
          <LoginForm demoMode={demoMode} />
        </Suspense>

        <p className="mt-6 text-center text-xs text-slate-600">
          Novo aluno? O professor cria seu login em <strong>Alunos</strong>.
        </p>
      </div>
    </div>
  );
}
