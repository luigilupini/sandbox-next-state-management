'use client';

import { Pokemon } from '@/app/layout';
import { usePokemon } from '@/store/context/usePokemonStore';
import Image from 'next/image';

export default function PokemonFilter() {
  const { filter, filteredPokemon, setFilter } = usePokemon();
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
        {filteredPokemon.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
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
