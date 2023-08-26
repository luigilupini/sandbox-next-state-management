'use client';

import { Pokemon, getData } from '@/app/page';
import Image from 'next/image';
import { useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

export default function PokemonFilter(props: { pokemon?: Pokemon[] }) {
  // Prefetched Data: Using the initialData prop, the useQuery hook can start
  // with data that was fetched server-side and passed down to the client. This
  // is a useful pattern for speeding up perceived load times because the client
  // has data to display immediately while it verifies the freshness of that
  // data in the background and fetches any update changes.
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['prefetched-hydrated-list'],
    queryFn: getData,
    initialData: props.pokemon,
  });

  // Client-only Fetch: The second useQuery doesn't prefetch the data and will
  // start fetching it only when the component mounts on the client. This is
  // typical for data that isn't as crucial for the initial render or for when
  // SSR (Server-Side Rendering) isn't being used.
  const { data: otherData } = useQuery({
    queryKey: ['client-only-hydrated-list'],
    queryFn: getData,
    initialData: props.pokemon,
  });

  const [filter, setFilter] = useState('');
  const filteredPokemon = useMemo(
    () => data?.filter((p) => p.name.toLowerCase().includes(filter)),
    [filter, data]
  );
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
        {filteredPokemon?.map((p) => (
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
