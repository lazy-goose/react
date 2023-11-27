import { ReactNode } from 'react';
import mockRouter from 'next-router-mock';
import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RootState, setupStore } from '../../redux';
import names from '../data/names.json';
import pokemons from '../data/pokemons.json';
import pokemon from '../data/pikachu.json';

type RenderComponentProps = {
  path?: string;
  preloadedState?: RootState;
  children: ReactNode;
};

const renderComponent = ({
  children,
  path = '/',
  preloadedState,
}: RenderComponentProps) => {
  const store = setupStore(preloadedState);
  mockRouter.push(path);
  return render(<Provider store={store}>{children}</Provider>);
};

const mockPokeAPI = () => {
  vi.mock('../../API', async (importOriginal) => {
    const mod = await importOriginal<typeof import('../../API')>();
    return {
      ...mod,
      fetchPokemonList: async () => names,
      fetchPokemonByName: async () => pokemon,
      searchPokemons: async () => [pokemons, pokemons.length],
    };
  });
};

export { mockPokeAPI };
export default renderComponent;
