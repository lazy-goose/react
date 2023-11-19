import { describe, test, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import renderApp, { mockPokeAPI } from './utils/renderApp';
import userEvent  from '@testing-library/user-event';
import pokemon from './data/pikachu.json';

describe('Tests for the Detailed Card component', () => {
  const renderPokemonPage = () =>
    renderApp({ path: `/pokemon/${pokemon.name}` });

  beforeEach(() => {
    mockPokeAPI();
  });

  test('Check that a loading indicator is displayed while fetching data', async () => {
    renderPokemonPage();
    const Loader = screen.queryByTestId('details-loader');
    expect(Loader).toBeInTheDocument();
    const Description = await screen.findByTestId(
      'pokemon-details-description'
    );
    expect(Description).toBeInTheDocument();
  });

  test('Make sure the detailed card component correctly displays the detailed card data', async () => {
    renderPokemonPage();
    const Details = await screen.findByTestId('pokemon-details');
    await screen.findByTestId('pokemon-details-description');
    expect(Details).toMatchSnapshot();
  });

  test('Ensure that clicking the close button hides the component', async () => {
    const user = userEvent.setup();
    renderPokemonPage();
    const PokeDetails = await screen.findByTestId('pokemon-details');
    const CloseButton = await screen.findByTestId('close-aside');
    await user.click(CloseButton);
    expect(PokeDetails).not.toBeInTheDocument();
  });
});
