import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPokemon } from 'pokeapi-typescript';
import { pokemonsApi } from './pokemonsApi';

interface State {
  pokemons: IPokemon[];
  search: string;
  page: number;
  pageSize: number;
  total: number;
  isFetchingDescription: boolean;
  isFetchingPokemons: boolean;
}

const initialState = {
  pokemons: [],
  search: '',
  page: 1,
  pageSize: 100,
  total: 0,
  isFetchingDescription: true,
  isFetchingPokemons: true,
} as State;

const searchPokemonsSlice = createSlice({
  name: 'pokemonSlice',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    setPokemons: (state, action: PayloadAction<IPokemon[]>) => {
      state.pokemons = action.payload;
    },
  },
  extraReducers: (builder) => {
    const api = pokemonsApi;
    builder
      .addMatcher(api.endpoints.getPokemonByName.matchPending, (state) => {
        state.isFetchingDescription = true;
      })
      .addMatcher(api.endpoints.getPokemonByName.matchRejected, (state) => {
        state.isFetchingDescription = false;
      })
      .addMatcher(api.endpoints.getPokemonByName.matchFulfilled, (state) => {
        state.isFetchingDescription = false;
      })
      .addMatcher(api.endpoints.getPokemons.matchPending, (state) => {
        state.isFetchingPokemons = true;
      })
      .addMatcher(api.endpoints.getPokemons.matchRejected, (state) => {
        state.isFetchingPokemons = false;
      })
      .addMatcher(
        api.endpoints.getPokemons.matchFulfilled,
        (state, { payload }) => {
          state.total = payload[1];
          state.isFetchingPokemons = false;
        }
      );
  },
});

export const { setSearch, setPage, setPageSize, setPokemons } =
  searchPokemonsSlice.actions;
export default searchPokemonsSlice.reducer;
