'use client';

import PokemonFilter from '@/components/PokemonFilter';
import { UseQueryResult, useQuery } from 'react-query';

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

const getData = async () => {
  const resp = await fetch(
    'https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json'
  );
  return await resp.json();
};

export default function Home() {
  const { data: pokemon = [] }: UseQueryResult<Pokemon[]> = useQuery(
    'pokemon',
    getData,
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <main className='flex flex-col gap-8'>
      {pokemon && <PokemonFilter pokemon={pokemon} />}
    </main>
  );
}
