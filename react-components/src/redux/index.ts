import { configureStore, combineReducers } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { pokemonsApi } from './pokemonsApi';
import searchPokemonsSlice from './searchPokemonsSlice';

const rootReducer = combineReducers({
  [pokemonsApi.reducerPath]: pokemonsApi.reducer,
  search: searchPokemonsSlice,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(pokemonsApi.middleware),
    preloadedState,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export * from './pokemonsApi';
export * from './searchPokemonsSlice';
