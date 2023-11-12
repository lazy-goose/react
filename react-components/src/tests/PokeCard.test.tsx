import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import PokeCard from '../components/PokeCard/PokeCard';
import stubPokemon from './data/pokemon.json';

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

  test.todo(
    'Validate that clicking on a card opens a detailed card component',
    async () => {}
  );

  test.todo(
    'Check that clicking triggers an additional API call to fetch detailed information',
    async () => {}
  );
});
