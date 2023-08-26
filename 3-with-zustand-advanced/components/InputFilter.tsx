'use client';

import { usePokemonStore } from '@/store/zustand/usePokemonStore';

export default function InputFilter() {
  const { filter, setFilter } = usePokemonStore((state) => ({
    filter: state.filter,
    setFilter: state.setFilter,
  }));
  return (
    <input
      type='text'
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className='p-2 rounded-lg shadow-md placeholder:text-sm'
      placeholder='Filter pokemon by name'
    />
  );
}
