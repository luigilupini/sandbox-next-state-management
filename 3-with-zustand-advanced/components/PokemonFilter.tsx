'use client';

import { Pokemon } from '@/app/page';
import Image from 'next/image';

import { usePokemonStore } from '@/store/zustand/usePokemonStore';
import InputFilter from './InputFilter';

export default function PokemonFilter({
  initialData,
}: {
  initialData: Pokemon[];
}) {
  const { filteredPokemon } = usePokemonStore((state) => ({
    filteredPokemon: state.filteredPokemon,
  }));
  const displayData =
    filteredPokemon.length === 0 ? initialData : filteredPokemon;
  return (
    <>
      <InputFilter />
      <h1 className='px-2 text-white bg-red-500 rounded w-fit'>
        {displayData === initialData
          ? 'RSC initial data'
          : 'RCC updated filter'}
      </h1>
      {/* GRID CONTAINER */}
      <div className='grid grid-cols-4 gap-8'>
        {displayData.map((pokemon) => (
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
