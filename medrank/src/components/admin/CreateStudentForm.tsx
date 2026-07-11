interface Props {
  initialError?: string;
  initialSuccess?: { name: string; email: string };
}

export function CreateStudentForm({ initialError, initialSuccess }: Props) {
  return (
    <div className="rounded-xl bg-white p-5 text-slate-900 shadow-sm ring-1 ring-slate-200">
      <h2 className="font-semibold text-slate-900">Criar login do aluno</h2>
      <p className="mt-1 text-sm text-slate-600">
        Você define o e-mail e a senha. O aluno entra em <strong>/login</strong> com esses dados.
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
