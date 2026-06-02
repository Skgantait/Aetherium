import { useEffect, useState } from 'react';

/**
 * Hook that returns true only after client-side hydration is complete.
 * Use this to defer rendering of client-only state (Zustand stores, localStorage, etc.)
 */
export function useHydrated() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
