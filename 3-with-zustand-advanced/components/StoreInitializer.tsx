'use client';

import { useEffect, useRef } from 'react';
import { usePokemonStore } from '@/store/zustand/usePokemonStore';

const STORE_MAP = {
  pokemon: usePokemonStore,
  // ... add other stores as needed
};

interface Props {
  storeName: keyof typeof STORE_MAP;
  data: Record<string, any>;
}

export default function StoreInitializer({ storeName, data }: Props) {
  const initialized = useRef(false);
  const store = STORE_MAP[storeName];
  useEffect(() => {
    // only initialize the store once with the initial data :)
    if (!initialized.current && store) {
      store.setState({ ...data });
      initialized.current = true;
    }
  }, [store, data]);

  return null;
}
