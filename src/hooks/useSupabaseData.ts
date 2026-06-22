import { useEffect, useState } from 'react';

interface State<T> { data: T[]; loading: boolean; usedFallback: boolean; }

export function useSupabaseData<T>(fetcher: () => Promise<T[]>, fallback: T[]): State<T> {
  const [state, setState] = useState<State<T>>({ data: fallback, loading: true, usedFallback: false });

  useEffect(() => {
    let active = true;
    fetcher()
      .then((data) => {
        if (!active) return;
        if (Array.isArray(data) && data.length > 0) setState({ data, loading: false, usedFallback: false });
        else setState({ data: fallback, loading: false, usedFallback: true });
      })
      .catch((err) => {
        console.warn('useSupabaseData fallback:', err);
        if (active) setState({ data: fallback, loading: false, usedFallback: true });
      });
    return () => { active = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
