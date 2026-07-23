'use client';

type Props = {
  status?: string | null;
  summary?: string | null;
  blocking?: boolean;
};

export function PreExamQualityBanner({ status, summary, blocking }: Props) {
  if (!status || status === 'passed' || status === 'approved_override') {
    if (status === 'approved_override') {
      return (
        <div className="border-b border-sky-200 bg-sky-50 px-4 py-2 text-center text-sm text-sky-950">
          Prova revisada e liberada pelo professor.
        </div>
      );
    }
    return null;
  }

  if (blocking || status === 'blocked' || status === 'pending') {
    return (
      <div className="border-b border-red-300 bg-red-50 px-4 py-3 text-center text-sm text-red-950">
        <p className="font-semibold">
          {status === 'pending'
            ? 'Disputa ainda em revisão automática pela IA'
            : 'Disputa pausada — revisão IA não aprovou o lote'}
        </p>
        <p className="mt-1">
          {summary ||
            'A disputa só fica disponível depois que as 20 questões forem aprovadas (gerar → revisar → trocar → publicar).'}
        </p>
      </div>
    );
  }

  if (status === 'warning') {
    return (
      <div className="border-b border-amber-300 bg-amber-50 px-4 py-2 text-center text-sm text-amber-950">
        <strong>Aviso da revisão automática:</strong>{' '}
        {summary || 'Há alertas menores nesta disputa. Você pode iniciar normalmente.'}
      </div>
    );
  }

  return null;
}
