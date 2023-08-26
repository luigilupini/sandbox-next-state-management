import { Pokemon } from '@/app/page';
import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { produce } from 'immer';

interface PokemonStore {
  pokemon: Pokemon[];
  filteredPokemon: Pokemon[];
  filter: string;
  setPokemon: (pokemon: Pokemon[]) => void;
  setFilter: (filter: string) => void;
}

const filterPokemon = (pokemonList: Pokemon[], filter: string) => {
  const lowercasedFilter = filter.toLowerCase();
  return pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(lowercasedFilter)
  );
};

export const usePokemonStore = create<PokemonStore>((set) => ({
  pokemon: [],
  filteredPokemon: [],
  filter: '',

  setPokemon: (pokemon: Pokemon[]) =>
    set(
      produce((draft) => {
        draft.pokemon = pokemon;
        draft.filteredPokemon = pokemon;
      })
    ),

  setFilter: (filter: string) =>
    set(
      produce((draft) => {
        draft.filter = filter;
        draft.filteredPokemon = filterPokemon(draft.pokemon, filter);
      })
    ),
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('usePokemonStore', usePokemonStore);
}
