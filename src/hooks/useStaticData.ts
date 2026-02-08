import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  updatedAt: string | null;
}

/**
 * Hook para buscar dados dos JSONs estáticos em /data/
 * Se o JSON não existir (dev local sem dados), usa o fallback mock.
 */
export function useStaticData<T>(filename: string, fallback: T): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
    updatedAt: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/data/${filename}`);

        if (!res.ok) throw new Error(`${res.status}`);

        const json = await res.json();

        if (!cancelled) {
          setState({
            data: json.data ?? json,
            loading: false,
            error: null,
            updatedAt: json.updated_at ?? null,
          });
        }
      } catch {
        // Fallback para dados mock (útil em dev ou se o JSON não existir)
        if (!cancelled) {
          setState({
            data: fallback,
            loading: false,
            error: null,
            updatedAt: null,
          });
        }
      }
    }

    load();
    return () => { cancelled = true; };
  }, [filename]);

  return state;
}
