import { vi, describe, test, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import renderComponent from './utils/renderComponent';
import userEvent from '@testing-library/user-event';
import { MockRootComponent } from './utils/mockComponents';

describe('Tests for the Pagination component', () => {
  test('Make sure the component updates URL query parameter when page changes', async () => {
    const user = userEvent.setup();
    renderComponent({
      children: <MockRootComponent />,
      path: '/?page=1&pageSize=2',
    });

    const setParam = vi.spyOn(URLSearchParams.prototype, 'set');
    const Buttons = await screen.findAllByTestId('page-button');
    await user.click(Buttons[1]);
    waitFor(() => expect(setParam).toBeCalledWith('page', '2'));
  });
});
