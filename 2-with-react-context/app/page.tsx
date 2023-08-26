import PokemonFilter from '@/components/PokemonFilter';

export default async function Home() {
  return (
    <main className='flex flex-col gap-8'>
      <PokemonFilter />
    </main>
  );
}
