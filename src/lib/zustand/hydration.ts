import { useEffect, useState } from "react";

export function useHydration<T>(store: T, selector: (store: T) => any) {
  const [hydrated, setHydrated] = useState(false);
  const selected = selector(store);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated ? selected : null;
}
