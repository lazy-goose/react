import { describe, test, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import renderComponent from './utils/renderComponent';
import userEvent from '@testing-library/user-event';
import pokemon from './data/pikachu.json';
import { MockPokemonRender } from './utils/mockComponents';
import mockRouter from 'next-router-mock';

describe('Tests for the Detailed Card component', () => {
  const renderPokemonPage = () =>
    renderComponent({
      children: <MockPokemonRender />,
      path: `/pokemon/${pokemon.name}`,
    });

  test('Check that a loading indicator is NOT displayed while fetching data', async () => {
    renderPokemonPage();
    const Loader = screen.queryByTestId('details-loader');
    expect(Loader).not.toBeInTheDocument();
  });

  test('Make sure the detailed card component correctly displays the detailed card data', async () => {
    renderPokemonPage();
    const Details = await screen.findByTestId('pokemon-details');
    await screen.findByTestId('pokemon-details-description');
    expect(Details).toMatchSnapshot();
  });

  test('Ensure that clicking the close button hides the component', async () => {
    const user = userEvent.setup();
    const { push } = mockRouter;
    mockRouter.push = vi.fn();
    renderPokemonPage();
    const CloseButton = await screen.findByTestId('close-aside');
    await user.click(CloseButton);
    expect(mockRouter.push).toBeCalled();
    mockRouter.push = push;
  });
});
