import { vi, describe, test, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import App from '../App';
import names from './data/names.json';
import pokemon from './data/pokemon.json';
import pokemons from './data/pokemons.json';
import { beforeEach } from 'node:test';

describe('Tests for the Detailed Card component', () => {
  const renderApp = () =>
    render(
      <MemoryRouter initialEntries={[`/pokemon/${pokemon.name}`]}>
        <App />
      </MemoryRouter>
    );

  beforeEach(() => {
    vi.mock('../API', async (importOriginal) => {
      const mod = await importOriginal<typeof import('../API')>();
      return {
        ...mod,
        fetchPokemonList: async () => names,
        fetchPokemonByName: async () => pokemon,
        searchPokemons: async () => [pokemons, pokemons.length],
      };
    });
  });

  test('Check that a loading indicator is displayed while fetching data', async () => {
    const { queryByTestId } = renderApp();
    const BottomSlotChid = queryByTestId('bottom-slot')?.firstChild;
    expect(BottomSlotChid).toHaveAttribute('data-testid', 'loader');
  });

  test('Make sure the detailed card component correctly displays the detailed card data', async () => {
    renderApp();
    const App = await screen.findByTestId('app');
    expect(App).toMatchSnapshot();
  });

  test('Ensure that clicking the close button hides the component', async () => {
    renderApp();
    const PokeDetails = await screen.findByTestId('pokemon-details');
    const CloseButton = await screen.findByTestId('close-aside');
    fireEvent.click(CloseButton);
    expect(PokeDetails).not.toBeInTheDocument();
  });
});
