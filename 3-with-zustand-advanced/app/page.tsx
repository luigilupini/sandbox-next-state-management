import PokemonFilter from '@/components/PokemonFilter';
import StoreInitializer from '@/components/StoreInitializer';
import { usePokemonStore } from '@/store/zustand/usePokemonStore';

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

const getData = async () => {
  const resp = await fetch(
    'https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json'
  );
  const pokemon: Pokemon[] = await resp.json();
  return pokemon;
};

export default async function Home() {
  const initialData = await getData();
  // Server zustand store
  usePokemonStore.setState({
    pokemon: initialData,
    filteredPokemon: initialData,
  });
  return (
    <main className='flex flex-col gap-8'>
      <StoreInitializer
        // Client zustand store
        storeName='pokemon'
        data={{ pokemon: initialData, filteredPokemon: initialData }}
      />
      <PokemonFilter initialData={initialData} />
    </main>
  );
}
