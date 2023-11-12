import { describe, test, expect } from 'vitest';
import { screen } from '@testing-library/react';
import renderApp from './renderApp';

describe('Tests for the 404 Page component', () => {
  test('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
    renderApp({ path: '/unknown-page' });
    expect(
      screen.getByText('Oops... Something went wrong')
    ).toBeInTheDocument();
  });
});
