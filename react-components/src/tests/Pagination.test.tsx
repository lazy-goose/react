import { vi, describe, test, expect, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import names from './data/names.json';
import pokemon from './data/pokemon.json';
import pokemons from './data/pokemons.json';

describe('Tests for the Pagination component', () => {
  const renderApp = () => {
    render(
      <MemoryRouter initialEntries={['/?page=1&pageSize=2']}>
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

  test('Make sure the component updates URL query parameter when page changes', async () => {
    renderApp();
    await screen.findByTestId('loader');
    const SecondButton = screen.getAllByTestId('page-button').at(1)!;
    const setParam = vi.spyOn(URLSearchParams.prototype, 'set');
    fireEvent.click(SecondButton);
    expect(setParam).toBeCalledWith('page', '2');
  });
});
