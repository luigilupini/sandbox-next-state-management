'use client';

import { Pokemon } from '@/app/page';
import Image from 'next/image';

import { usePokemonStore } from '@/store/zustand/usePokemonStore';
import { useEffect } from 'react';

export default function PokemonFilter({
  initialData,
}: {
  initialData: Pokemon[];
}) {
  const { filter, filteredPokemon, setFilter, setPokemon } = usePokemonStore(
    (state) => ({
      filter: state.filter,
      filteredPokemon: state.filteredPokemon,
      setFilter: state.setFilter,
      setPokemon: state.setPokemon,
    })
  );
  useEffect(() => {
    setPokemon(initialData);
  }, []);

  return (
    <>
      <input
        type='text'
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className='p-2 rounded-lg shadow-md placeholder:text-sm'
        placeholder='Filter pokemon by name'
      />
      {/* GRID CONTAINER */}
      <div className='grid grid-cols-4 gap-8'>
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
}

function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div
      key={pokemon.id}
      className='relative flex items-center justify-between px-4 py-2 overflow-hidden bg-white rounded-lg shadow-md max-h-48'
    >
      <Image
        width={200}
        height={200}
        alt={pokemon.name}
        src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
        className='object-contain w-full h-full'
        priority
      />
      <h2 className='absolute px-2 text-sm rounded-full top-1 right-1 bg-slate-600/80 text-slate-100'>
        {pokemon.name}
      </h2>
    </div>
  );
}
