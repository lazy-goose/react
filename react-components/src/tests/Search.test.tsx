import { vi, describe, expect, test, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import renderApp, { mockPokeAPI } from './renderApp';

describe('Tests for the Search component', () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
    mockPokeAPI();
  });

  test('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    renderApp();
    const set = vi.spyOn(Object.getPrototypeOf(localStorage), 'setItem');
    const Search = await screen.findByText('Search');
    await user.click(Search);
    expect(set).toBeCalled();
  });

  test('Check that the component retrieves the value from the local storage upon mounting', async () => {
    const mocked = 'text';
    vi.spyOn(Object.getPrototypeOf(localStorage), 'getItem').mockReturnValue(
      mocked
    );
    renderApp();
    const Search = await screen.findByTestId('search');
    expect(Search).toHaveAttribute('value', mocked);
  });
});
