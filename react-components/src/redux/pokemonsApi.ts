import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  PokemonList,
  fetchPokemonByName,
  fetchPokemonList,
  searchPokemons,
} from '../API';

type CustomError = unknown;

export const pokemonsApi = createApi({
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
  const { search, page, limit } = params;
  const { data: list = [], isSuccess } =
    pokemonsApi.useGetPokemonsListQuery(undefined);
  const { data = [[], 1], ...pass } = pokemonsApi.useGetPokemonsQuery(
    { search, list, page, limit },
    { skip: !isSuccess }
  );
  return { data, ...pass };
};

export const { useGetPokemonByNameQuery } = pokemonsApi;
export { useGetPokemons };
