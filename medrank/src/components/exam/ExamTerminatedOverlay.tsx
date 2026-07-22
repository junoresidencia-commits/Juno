'use client';

import Link from 'next/link';
import { EXAM_TERMINATED_BODY, EXAM_TERMINATED_TITLE } from '@/lib/exams/anti-fraud';

export function ExamTerminatedOverlay({ attemptId }: { attemptId: string }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 text-center shadow-2xl ring-1 ring-red-200">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-700">Segurança</p>
        <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">{EXAM_TERMINATED_TITLE}</h1>
        <div className="mt-4 space-y-3 text-left text-sm leading-relaxed text-slate-700">
          {EXAM_TERMINATED_BODY.split('\n\n').map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link
            href={`/aluno/resultado/${attemptId}`}
            className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
          >
            Ver registro
          </Link>
          <Link
            href="/aluno"
            className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-800"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}
