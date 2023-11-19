import { vi, describe, test, expect, beforeEach, SpyInstance } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import PokeCard from '../components/PokeCard/PokeCard';
import pokemon from './data/pikachu.json';
import renderApp, { mockPokeAPI } from './utils/renderApp';
import * as API from '../API';

const pokemonData = {
  name: pokemon.name,
  imageUrl: pokemon.sprites.front_default,
  imageAlt: pokemon.name,
  types: pokemon.types.map(({ type: { name } }) => name),
} as const;

describe('Tests for the Card component', () => {
  const renderPokeCard = (pokemon = pokemonData) =>
    render(
      <MemoryRouter>
        <PokeCard key={pokemon.name} {...pokemonData} />
      </MemoryRouter>
    );

  let fetchPokemonByName: SpyInstance;
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
    mockPokeAPI();
    fetchPokemonByName = vi.spyOn(API, 'fetchPokemonByName');
  });

  test('Ensure that the card component renders the relevant card data', async () => {
    renderPokeCard();
    const Card = await screen.findByTestId('pokemon-card');
    expect(Card).toMatchSnapshot();
  });

  test('Validate that clicking on a card opens a detailed card component', async () => {
    renderApp();
    const Cards = await screen.findAllByTestId('pokemon-card-link');
    await user.click(Cards[0]);
    const Aside = await screen.findByTestId('aside');
    expect(Aside).toBeInTheDocument();
  });

  test('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    renderApp();
    const Cards = await screen.findAllByTestId('pokemon-card-link');
    await user.click(Cards[1]);
    expect(fetchPokemonByName).toBeCalled();
    await screen.findByTestId('pokemon-details-description');
  });
});
