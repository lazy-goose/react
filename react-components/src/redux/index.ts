import { configureStore } from '@reduxjs/toolkit';
import { pokemonsApi } from './pokemonsApi';
import searchPokemonsSlice from './searchPokemonsSlice';

export const store = configureStore({
  reducer: {
    [pokemonsApi.reducerPath]: pokemonsApi.reducer,
    search: searchPokemonsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export * from './pokemonsApi';
export * from './searchPokemonsSlice';
