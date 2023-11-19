import { vi, describe, test, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import renderApp, { mockPokeAPI } from './utils/renderApp';
import userEvent from '@testing-library/user-event';

describe('Tests for the Pagination component', () => {
  beforeEach(() => {
    mockPokeAPI();
  });

  test('Make sure the component updates URL query parameter when page changes', async () => {
    const user = userEvent.setup();
    renderApp({ path: '/?page=1&pageSize=2' });
    const setParam = vi.spyOn(URLSearchParams.prototype, 'set');
    const Buttons = await screen.findAllByTestId('page-button');
    await user.click(Buttons[1]);
    expect(setParam).toBeCalledWith('page', '2');
  });
});
