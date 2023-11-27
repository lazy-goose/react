import { describe, test, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { IPokemon } from 'pokeapi-typescript';
import renderComponent from './utils/renderComponent';
import stubPokemons from './data/pokemons.json';
import PokeList from '@/components/PokeList/PokeList';

describe('Tests for the Card List component', () => {
  test('Verify that the component renders the specified number of cards', async () => {
    const pokemons = stubPokemons as IPokemon[];
    renderComponent({ children: <PokeList pokemons={pokemons} /> });
    const PokemonsContainer = await screen.findByTestId('pokemons-container');
    expect(PokemonsContainer.children).toHaveLength(stubPokemons.length);
  });

  test('Check that an appropriate message is displayed if no cards are present', () => {
    renderComponent({ children: <PokeList pokemons={[]} /> });
    const NotFound = screen.getByText('No pokemon found');
    expect(NotFound).toBeInTheDocument();
  });
});
