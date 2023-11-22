import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  PokemonList,
  fetchPokemonByName,
  fetchPokemonList,
  searchPokemons,
} from '../API';
import { useEffect } from 'react';

type CustomError = unknown;

export const pokemonsApi = createApi({
  tagTypes: ['PokemonsPage'],
  reducerPath: 'pokemonsApi',
  baseQuery: fakeBaseQuery<CustomError>(),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<
      Awaited<ReturnType<typeof fetchPokemonByName>>,
      string
    >({
      queryFn: async (name: string) => {
        try {
          const data = await fetchPokemonByName(name);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
    getPokemonsList: builder.query<
      Awaited<ReturnType<typeof fetchPokemonList>>,
      void
    >({
      queryFn: async () => {
        try {
          const data = await fetchPokemonList();
          return { data };
        } catch (error) {
          return { error };
        }
      },
      keepUnusedDataFor: Infinity,
    }),
    getPokemons: builder.query<
      Awaited<ReturnType<typeof searchPokemons>>,
      { search: string; list: PokemonList; page?: number; limit?: number }
    >({
      queryFn: async (args) => {
        try {
          const { search, list, page, limit } = args;
          if (!list.length) {
            return { data: [[], 0] };
          }
          const data = await searchPokemons(search, list, page, limit);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

const useGetPokemons = (params: {
  search: string;
  page?: number;
  limit?: number;
}) => {
  const { useGetPokemonsListQuery, useLazyGetPokemonsQuery } = pokemonsApi;
  const { data: list = [], isSuccess } = useGetPokemonsListQuery();
  const [triggerGetPokemons, { data = [], ...pass }] =
    useLazyGetPokemonsQuery();
  const lazyGetPokemons = (arg: typeof params) => {
    if (isSuccess) {
      triggerGetPokemons({ list, ...arg });
    }
  };
  useEffect(() => lazyGetPokemons(params), [isSuccess]);
  return [lazyGetPokemons, { data, ...pass }] as const;
};

export const { useGetPokemonByNameQuery } = pokemonsApi;
export { useGetPokemons };
