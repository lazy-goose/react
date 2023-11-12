import { ReactNode, createContext, useContext, useState } from 'react';
import { IPokemon } from 'pokeapi-typescript';

type CtxValue = IPokemon[];

const Context = createContext<[CtxValue, (v: CtxValue) => void] | null>(null);

const usePokemons = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error(`Provide context first ${Context.displayName}`);
  }
  return context;
};

const PokemonsProvider = (props: { children: ReactNode }) => {
  const stateControl = useState<CtxValue>([]);
  return <Context.Provider value={stateControl} {...props} />;
};

export { usePokemons, PokemonsProvider };
