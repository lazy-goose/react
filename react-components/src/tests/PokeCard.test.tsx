import { vi, describe, test, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderComponent from './utils/renderComponent';
import { MockPokeCard, MockRootComponent } from './utils/mockComponents';
import mockRouter from 'next-router-mock';

describe('Tests for the Card component', () => {
  test('Ensure that the card component renders the relevant card data', async () => {
    renderComponent({ children: <MockPokeCard /> });
    const Card = await screen.findByTestId('pokemon-card');
    expect(Card).toMatchSnapshot();
  });

  test('Validate that clicking on a card opens a detailed card component', async () => {
    const user = userEvent.setup();
    renderComponent({ children: <MockRootComponent /> });
    const Cards = await screen.findAllByTestId('pokemon-card-link');
    await user.click(Cards[0]);
    waitFor(() => {
      expect(mockRouter.asPath).to.equal('/pokemon');
    });
  });

  test('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    const user = userEvent.setup();
    const { push } = mockRouter;
    mockRouter.push = vi.fn();
    renderComponent({ children: <MockRootComponent /> });
    const Cards = await screen.findAllByTestId('pokemon-card-link');
    await user.click(Cards[1]);
    expect(mockRouter.push).toBeCalled();
    mockRouter.push = push;
  });
});
