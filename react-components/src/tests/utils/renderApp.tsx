import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { RootState, setupStore } from '../../redux';
import App from '../../App';
import names from '../data/names.json';
import pokemons from '../data/pokemons.json';
import pokemon from '../data/pikachu.json';

type RenderAppParams = {
  path?: string;
  preloadedState?: RootState;
};

const renderApp = ({ path = '/', preloadedState }: RenderAppParams = {}) => {
  const store = setupStore(preloadedState);
  render(
    <MemoryRouter initialEntries={[path]}>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  );
};

const mockPokeAPI = () => {
  vi.mock('../API', async (importOriginal) => {
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
export default renderApp;
