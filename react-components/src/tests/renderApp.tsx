import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from '../App';
import names from './data/names.json';
import pokemons from './data/pokemons.json';
import pokemon from './data/pokemon.json';

type RenderAppParams = {
  path?: string;
};

const renderApp = ({ path = '/' }: RenderAppParams = {}) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );

const mockPokeAPI = () => {
  vi.mock('../API', async (importOriginal) => {
    const mod = await importOriginal<typeof import('../API')>();
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
