import PokemonFilter from '@/components/PokemonFilter';
import HydrateClient from '@/utils/HydrateClient';
import { getQueryClient } from '@/utils/getQueryClient';
import { Hydrate, dehydrate } from '@tanstack/react-query';

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export const getData = async () => {
  const resp = await fetch(
    'https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json'
  );
  const pokemon: Pokemon[] = await resp.json();
  return pokemon;
};

export default async function Home() {
  const initialData = await getData(); // initial server-side data
  // Prefetch for the client-side data
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['prefetched-hydrated-list'], getData);
  const dehydratedState = dehydrate(queryClient);
  return (
    <main className='flex flex-col gap-8'>
      <HydrateClient state={dehydratedState}>
        <PokemonFilter pokemon={initialData} />
      </HydrateClient>
    </main>
  );
}
