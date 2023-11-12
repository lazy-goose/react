import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IPokemon } from 'pokeapi-typescript';
import { MemoryRouter } from 'react-router';
import PokeList from '../components/PokeList/PokeList';
import stubPokemons from './data/pokemons.json';

describe('Tests for the Card List component', () => {
  const renderPokeList = (pokemons: IPokemon[]) =>
    render(
      <MemoryRouter>
        <PokeList pokemons={pokemons} />
      </MemoryRouter>
    );

  test('Verify that the component renders the specified number of cards', async () => {
    renderPokeList(stubPokemons as IPokemon[]);
    const PokemonsContainer = await screen.findByTestId('pokemons-container');
    expect(PokemonsContainer.children).toHaveLength(stubPokemons.length);
  });

  test('Check that an appropriate message is displayed if no cards are present', () => {
    renderPokeList([]);
    const NotFound = screen.getByText('No pokemon found');
    expect(NotFound).toBeInTheDocument();
  });
});
