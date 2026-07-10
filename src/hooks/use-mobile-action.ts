'use client';

import { useCallback, useRef } from 'react';

/** Evita duplo disparo quando pointerup e click disparam no mesmo toque */
export function useTapOnce() {
  const lastRef = useRef(0);
  return useCallback((action: () => void) => {
    const now = Date.now();
    if (now - lastRef.current < 300) return;
    lastRef.current = now;
    action();
  }, []);
}

/** Handlers de toque + clique para qualquer celular */
export function useMobileAction(action: () => void) {
  const tapOnce = useTapOnce();
  const run = useCallback(() => tapOnce(action), [tapOnce, action]);

  const onPointerUp = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (e.pointerType === 'mouse') return;
      run();
    },
    [run]
  );

  const onClick = useCallback(() => run(), [run]);

  return { onPointerUp, onClick };
}
