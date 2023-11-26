import { vi, describe, expect, test, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderComponent, { mockPokeAPI } from './utils/renderComponent';
import { MockRootComponent } from './utils/mockComponents';

describe('Tests for the Search component', () => {
  beforeEach(() => {
    mockPokeAPI();
  });

  test('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    const user = userEvent.setup();
    renderComponent({ children: <MockRootComponent /> });
    const set = vi.spyOn(Object.getPrototypeOf(localStorage), 'setItem');
    const Search = await screen.findByText('Search');
    await user.click(Search);
    expect(set).toBeCalled();
  });

  test('Check that the component retrieves the value from the local storage upon mounting', async () => {
    const get = vi.spyOn(Object.getPrototypeOf(localStorage), 'getItem');
    renderComponent({ children: <MockRootComponent /> });
    await screen.findByTestId('search');
    expect(get).toBeCalled();
  });
});
