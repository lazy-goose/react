import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from '../App';
import * as API from '../API';
import names from './data/names.json';
import pokemons from './data/pokemons.json';
import pokemon from './data/pokemon.json';
import { IPokemon } from 'pokeapi-typescript';

type RenderAppParams = {
  path?: string;
};

const renderApp = ({ path = '/' }: RenderAppParams = {}) => {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
};

const mockPokeAPI = async () => {
  vi.spyOn(API, 'fetchPokemonList').mockImplementation(async () => names);
  vi.spyOn(API, 'searchPokemons').mockImplementation(
    async () => [pokemons, pokemons.length] as [IPokemon[], number]
  );
  vi.spyOn(API, 'fetchPokemonByName').mockImplementation(
    async () => pokemon as unknown as ReturnType<typeof API.fetchPokemonByName>
  );
};

export { mockPokeAPI };
export default renderApp;
