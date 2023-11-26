import { describe, test, expect, beforeEach } from 'vitest';
import { screen } from '@testing-library/react';
import renderComponent, { mockPokeAPI } from './utils/renderComponent';
import Custom404 from '@/pages/404';

describe('Tests for the 404 Page component', () => {
  beforeEach(() => {
    mockPokeAPI();
  });

  test('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
    renderComponent({ children: <Custom404 />, path: '/unknown-path' });

    const SomethingWrong = await screen.findByText('Page not found');

    expect(SomethingWrong).toBeInTheDocument();
  });
});
