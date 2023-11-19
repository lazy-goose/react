import { describe, test, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import renderApp, { mockPokeAPI } from './utils/renderApp';

describe('Tests for the 404 Page component', () => {
  beforeEach(() => {
    mockPokeAPI();
  });

  test('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
    renderApp({ path: '/unknown-page' });

    const SomethingWrong = await screen.findByText(
      'Oops... Something went wrong'
    );

    expect(SomethingWrong).toBeInTheDocument();
  });
});
