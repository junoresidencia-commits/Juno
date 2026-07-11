'use client';

import { useCallback, useRef } from 'react';

/** Evita duplo disparo no mesmo toque */
export function useTapOnce() {
  const lastRef = useRef(0);
  return useCallback((action: () => void) => {
    const now = Date.now();
    if (now - lastRef.current < 250) return;
    lastRef.current = now;
    action();
  }, []);
}

/** Clique/toque unificado — confiável em iPhone, Android e desktop */
export function useMobileAction(action: () => void) {
  const tapOnce = useTapOnce();
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      tapOnce(action);
    },
    [tapOnce, action]
  );

  return { onClick };
}
