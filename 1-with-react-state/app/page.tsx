import PokemonFilter from '@/components/PokemonFilter';

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
  const pokemon = await getData();
  return (
    <main className='flex flex-col gap-8'>
      <PokemonFilter pokemon={pokemon} />
    </main>
  );
}
