import { APP_TRACKS } from '@/lib/tracks/config';

interface Props {
  initialError?: string;
  initialSuccess?: { name: string; email: string };
}

export function CreateStudentForm({ initialError, initialSuccess }: Props) {
  return (
    <div className="rounded-xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
      <h2 className="font-semibold text-slate-900">Criar login do aluno</h2>
      <p className="mt-1 text-sm text-slate-600">
        Você define o e-mail, a senha e quais módulos ficam ligados. Depois pode ligar/desligar
        na lista de alunos.
      </p>

      {initialSuccess && (
        <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800 ring-1 ring-emerald-200">
          ✓ Login criado para <strong>{initialSuccess.name}</strong> ({initialSuccess.email})
        </div>
      )}

      <form action="/api/admin/students" method="POST" className="mt-4 space-y-4">
        <div>
          <label htmlFor="student-name" className="block text-sm font-medium text-slate-700">
            Nome do aluno
          </label>
          <input
            id="student-name"
            name="name"
            type="text"
            required
            placeholder="Maria Silva"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 text-base focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label htmlFor="student-email" className="block text-sm font-medium text-slate-700">
            E-mail (login)
          </label>
          <input
            id="student-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="aluno@email.com"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 text-base focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label htmlFor="student-password" className="block text-sm font-medium text-slate-700">
            Senha
          </label>
          <input
            id="student-password"
            name="password"
            type="password"
            required
            minLength={4}
            autoComplete="new-password"
            placeholder="Mínimo 4 caracteres"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 text-base focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <div>
          <label htmlFor="student-confirm" className="block text-sm font-medium text-slate-700">
            Confirmar senha
          </label>
          <input
            id="student-confirm"
            name="confirm"
            type="password"
            required
            minLength={4}
            autoComplete="new-password"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 text-base focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
        </div>

        <fieldset className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <legend className="px-1 text-sm font-semibold text-slate-900">
            Módulos liberados
          </legend>
          <p className="mt-1 text-xs text-slate-600">
            Residência Geral já vem ligada. Marque Nefrologia só se o aluno estiver autorizado.
          </p>
          <div className="mt-3 space-y-3">
            {APP_TRACKS.map((t) => (
              <label
                key={t.id}
                className={`flex cursor-pointer items-start gap-3 rounded-lg bg-white p-3 ring-1 ring-slate-200 ${
                  t.comingSoon || t.id === 'general' ? 'opacity-90' : ''
                }`}
              >
                <input
                  type="checkbox"
                  name={`track_${t.id}`}
                  value="on"
                  defaultChecked={t.id === 'general'}
                  disabled={t.comingSoon || t.id === 'general'}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-700"
                />
                {/* hidden garante que Residência Geral sempre é enviada no POST */}
                {t.id === 'general' ? (
                  <input type="hidden" name="track_general" value="on" />
                ) : null}
                <span>
                  <span className="block text-sm font-medium text-slate-900">
                    {t.label}
                    {t.id === 'general' ? ' · obrigatório' : ''}
                    {t.comingSoon ? ' · em breve' : ''}
                  </span>
                  <span className="mt-0.5 block text-xs text-slate-600">{t.description}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          className="exam-tap w-full rounded-lg bg-emerald-600 px-4 py-3 text-base font-semibold text-white hover:bg-emerald-700 active:bg-emerald-800 sm:w-auto"
        >
          Criar login
        </button>
      </form>

      {initialError && <p className="mt-3 text-sm text-red-600">{initialError}</p>}
    </div>
  );
}
