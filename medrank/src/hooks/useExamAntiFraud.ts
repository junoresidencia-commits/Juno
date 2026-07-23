'use client';

import { useCallback, useEffect, useRef, type MutableRefObject } from 'react';
import {
  getClientDeviceInfo,
  type ViolationType,
} from '@/lib/exams/anti-fraud';

type Options = {
  enabled: boolean;
  attemptId: string;
  apiBase?: string;
  questionId: string | null;
  startedAt: string;
  /** Quando true, não dispara nova infração (submit legítimo / já encerrado). */
  lockedRef: MutableRefObject<boolean>;
  onTerminated: (violationType: ViolationType) => void;
};

const GRACE_MS = 4500; // iPhone/Safari: barra de URL e foco inicial não podem zerar a prova
const VISIBILITY_DEBOUNCE_MS = 800;

export function useExamAntiFraud({
  enabled,
  attemptId,
  apiBase = '/api/attempts',
  questionId,
  startedAt,
  lockedRef,
  onTerminated,
}: Options) {
  const firedRef = useRef(false);
  const questionIdRef = useRef(questionId);
  const onTerminatedRef = useRef(onTerminated);
  questionIdRef.current = questionId;
  onTerminatedRef.current = onTerminated;

  const trigger = useCallback(
    (violationType: ViolationType, extra?: Record<string, unknown>) => {
      if (!enabled || firedRef.current || lockedRef.current) return;
      firedRef.current = true;
      lockedRef.current = true;

      const elapsedSeconds = Math.max(
        0,
        Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000)
      );
      const deviceInfo = getClientDeviceInfo();
      const payload = {
        violationType,
        questionId: questionIdRef.current,
        elapsedSeconds,
        ...deviceInfo,
        metadata: {
          href: typeof location !== 'undefined' ? location.href : null,
          visibility:
            typeof document !== 'undefined' ? document.visibilityState : null,
          ...extra,
        },
      };

      const url = `${apiBase}/${attemptId}/forfeit`;
      const body = JSON.stringify(payload);

      try {
        void fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
          keepalive: true,
          credentials: 'include',
        });
      } catch {
        try {
          const blob = new Blob([body], { type: 'application/json' });
          navigator.sendBeacon?.(url, blob);
        } catch {
          // ignore
        }
      }

      onTerminatedRef.current(violationType);
    },
    [apiBase, attemptId, enabled, lockedRef, startedAt]
  );

  useEffect(() => {
    if (!enabled) return;

    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, GRACE_MS);

    const safeTrigger = (type: ViolationType, extra?: Record<string, unknown>) => {
      if (!armed || firedRef.current || lockedRef.current) return;
      trigger(type, extra);
    };

    let visibilityTimer: number | null = null;
    const onVisibility = () => {
      if (document.visibilityState !== 'hidden') {
        if (visibilityTimer != null) {
          window.clearTimeout(visibilityTimer);
          visibilityTimer = null;
        }
        return;
      }
      // Debounce: notificações / gestos no iOS escondem a aba por milissegundos
      visibilityTimer = window.setTimeout(() => {
        if (document.visibilityState === 'hidden') {
          safeTrigger('visibility_hidden');
        }
      }, VISIBILITY_DEBOUNCE_MS);
    };

    const onContextMenu = (e: Event) => {
      e.preventDefault();
      // Long-press no celular ≠ cola; só bloqueia o menu
      const coarse =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(pointer: coarse)').matches;
      if (!coarse) safeTrigger('context_menu');
    };

    const onCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      safeTrigger('copy');
    };

    const onCut = (e: ClipboardEvent) => {
      e.preventDefault();
      safeTrigger('cut');
    };

    const onSelectStart = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.('[data-exam-allow-select]')) return;
      e.preventDefault();
      // Não encerra a prova só por selecionar — evita falso positivo no mobile
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const ctrl = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;

      if (
        key === 'F12' ||
        (ctrl && shift && ['I', 'J', 'C'].includes(key.toUpperCase())) ||
        (ctrl && key.toUpperCase() === 'U')
      ) {
        e.preventDefault();
        safeTrigger('devtools', { key });
        return;
      }

      if (ctrl && ['C', 'X', 'A'].includes(key.toUpperCase())) {
        e.preventDefault();
        safeTrigger(key.toUpperCase() === 'X' ? 'cut' : 'copy', { key });
        return;
      }

      if (key === 'PrintScreen') {
        e.preventDefault();
        safeTrigger('screenshot_shortcut');
      }
    };

    const checkDevtools = () => {
      if (firedRef.current || !armed) return;
      const widthGap = window.outerWidth - window.innerWidth;
      const heightGap = window.outerHeight - window.innerHeight;
      // Limiar alto para reduzir falso positivo com barras do SO / zoom
      if (widthGap > 180 || heightGap > 180) {
        safeTrigger('devtools', { widthGap, heightGap });
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    // Não usar window.blur / pagehide: no iPhone/Safari disparam ao abrir a prova
    // (barra de URL, teclado, gesto) e zeravam a disputa com tela estranha.
    document.addEventListener('contextmenu', onContextMenu, true);
    document.addEventListener('copy', onCopy, true);
    document.addEventListener('cut', onCut, true);
    document.addEventListener('selectstart', onSelectStart, true);
    window.addEventListener('keydown', onKeyDown, true);
    const interval = window.setInterval(checkDevtools, 1500);

    return () => {
      window.clearTimeout(armTimer);
      if (visibilityTimer != null) window.clearTimeout(visibilityTimer);
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('contextmenu', onContextMenu, true);
      document.removeEventListener('copy', onCopy, true);
      document.removeEventListener('cut', onCut, true);
      document.removeEventListener('selectstart', onSelectStart, true);
      window.removeEventListener('keydown', onKeyDown, true);
    };
  }, [enabled, trigger]);

  return { triggerViolation: trigger };
}
