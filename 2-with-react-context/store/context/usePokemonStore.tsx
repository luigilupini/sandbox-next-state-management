'use client';

import { useMemo, useState, createContext, useContext, ReactNode } from 'react';

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

// STEP 1: CREATE A CONTEXT
interface ContextProps {
  filter: string;
  setFilter: (filter: string) => void;
  filteredPokemon: Pokemon[];
}

const PokemonContext = createContext<ContextProps | undefined>({
  filter: '',
  setFilter: () => {},
  filteredPokemon: [],
});

// STEP 2: CREATE A PROVIDER
interface ProviderProps {
  pokemon: Pokemon[];
  children: ReactNode;
}

export const PokemonProvider = ({ pokemon, children }: ProviderProps) => {
  const [filter, setFilter] = useState('');
  const filteredPokemon = useMemo(
    () => pokemon.filter((p) => p.name.toLowerCase().includes(filter)),
    [filter, pokemon]
  );

  return (
    <PokemonContext.Provider value={{ filter, setFilter, filteredPokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};

// Create a custom hook that uses the context
export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
};

/* The PokemonProvider is responsible for managing the state and filtering the
Pokemon list based on the filter. It then provides these states and functions
via the PokemonContext to the child components.

A usePokemon custom hook is used to access the context in the child components.
This simplifies the original version by removing the usePokemonController hook
and consolidating its functionality into the PokemonProvider. */
