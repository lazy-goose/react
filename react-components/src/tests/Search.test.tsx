import { vi, describe, expect, test, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from '../App';
import names from './data/names.json';
import pokemon from './data/pokemon.json';
import pokemons from './data/pokemons.json';
import userEvent from '@testing-library/user-event';

describe('Tests for the Search component', () => {
  const renderApp = () => {
    render(
      <MemoryRouter initialEntries={['/?search=text&page=1&pageSize=2']}>
        <App />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.mock('../API', async (importOriginal) => {
      const mod = await importOriginal<typeof import('../API')>();
      return {
        ...mod,
        fetchPokemonList: () => names,
        fetchPokemonByName: () => pokemon,
        searchPokemons: () => [pokemons, pokemons.length],
      };
    });
  });

  test('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    renderApp();
    const fn = vi.spyOn(Object.getPrototypeOf(localStorage), 'setItem');
    const Search = await screen.findByText('Search');
    const user = userEvent.setup();
    await user.click(Search);
    expect(fn).toBeCalled();
  });

  test('Check that the component retrieves the value from the local storage upon mounting', () => {
    const fn = vi.spyOn(Object.getPrototypeOf(localStorage), 'getItem');
    renderApp();
    expect(fn).toBeCalled();
  });
});
