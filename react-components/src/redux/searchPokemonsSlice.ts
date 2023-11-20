import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IPokemon } from 'pokeapi-typescript';
import { pokemonsApi } from './pokemonsApi';

interface PokemonsState {
  pokemons: IPokemon[];
  search: string;
  page: number;
  pageSize: number;
  total: number;
  isFetchingDescription: boolean;
  isFetchingPokemons: boolean;
}

export const STORAGE_SEARCH = 'pokeSearchString';

const initialState = {
  pokemons: [],
  search: localStorage.getItem(STORAGE_SEARCH) || '',
  page: 1,
  pageSize: 100,
  total: 0,
  isFetchingDescription: true,
  isFetchingPokemons: true,
} as PokemonsState;

const searchPokemonsSlice = createSlice({
  name: 'searchPokemons',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      localStorage.setItem(STORAGE_SEARCH, action.payload);
      state.search = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
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

export const { setSearch, setPage, setPageSize, setTotal } =
  searchPokemonsSlice.actions;
export default searchPokemonsSlice.reducer;
