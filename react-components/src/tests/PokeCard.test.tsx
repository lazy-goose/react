import { vi, describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import PokeCard from '../components/PokeCard/PokeCard';
import stubPokemon from './data/pokemon.json';
import App from '../App';
import names from './data/names.json';
import pokemon from './data/pokemon.json';
import pokemons from './data/pokemons.json';
import { BrowserRouter } from 'react-router-dom';

const pokemonData = {
  name: stubPokemon.name,
  imageUrl: stubPokemon.sprites.front_default,
  imageAlt: stubPokemon.name,
  types: stubPokemon.types.map(({ type: { name } }) => name),
} as const;

describe('Tests for the Card component', () => {
  const renderPokeCard = (pokemon = pokemonData) =>
    render(
      <MemoryRouter>
        <PokeCard key={pokemon.name} {...pokemonData} />
      </MemoryRouter>
    );

  const renderApp = () =>
    render(
      <MemoryRouter initialEntries={[`/`]}>
        <App />
      </MemoryRouter>
    );

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

  test('Ensure that the card component renders the relevant card data', async () => {
    renderPokeCard();
    const { name, imageUrl, types } = pokemonData;
    const Name = await screen.findByText(name);
    const Image = await screen.findByAltText(name);
    const Types = await screen.findByText(`Types: ${types.join(', ')}`);
    expect(Name).toBeInTheDocument();
    expect(Image).toHaveAttribute('src', imageUrl);
    expect(Types).toBeInTheDocument();
  });

  test('Validate that clicking on a card opens a detailed card component', async () => {
    render(<App />, { wrapper: BrowserRouter });
    const user = userEvent.setup();
    const Cards = await screen.findAllByTestId('pokemon-card-link');
    const FirstCard = Cards[0];
    await user.click(FirstCard);
    const Aside = await screen.findByTestId('aside');
    expect(Aside).toBeInTheDocument();
  });

  test('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    renderApp();
    const fn = vi.spyOn(global, 'fetch');
    const BottomSlot = screen.getByTestId('bottom-slot');
    const FirstCard = BottomSlot.firstElementChild;
    const user = userEvent.setup();
    await user.click(FirstCard!);
    expect(fn).not.toBeCalled();
  });
});
