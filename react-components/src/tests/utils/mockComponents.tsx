import RootComponentInitial from '@/pages/index';
import PokeDetailsInitial from '@/pages/pokemon/[name]';
import { ComponentProps } from 'react';
import PokeCard from '@/components/PokeCard/PokeCard';
import pokemon from '../data/pikachu.json';
import pokemonList from '../data/pokemons.json';
import { IPokemon } from 'pokeapi-typescript';

const searchProps = {
  searchTerm: '',
  total: 100,
  pageSize: 5,
  page: 1,
  pokemonList: pokemonList as IPokemon[],
  pokemonName: '',
};

const detailProps = {
  pokemon: pokemon as IPokemon,
  isError: false,
};

export const MockRootComponent = (
  props: Partial<ComponentProps<typeof RootComponentInitial>> = {}
) => (
  <RootComponentInitial
    searchProps={{
      ...searchProps,
      ...props,
    }}
  />
);

export const MockPokeCard = () => (
  <PokeCard
    key={pokemon.name}
    name={pokemon.name}
    imageUrl={pokemon.sprites.front_default}
    imageAlt={pokemon.name}
    types={pokemon.types.map(({ type: { name } }) => name)}
  />
);

export const MockPokemonRender = () => (
  <PokeDetailsInitial searchProps={searchProps} detailProps={detailProps} />
);
