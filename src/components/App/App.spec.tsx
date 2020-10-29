import * as React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import { mockResponse } from '../../api/mockResponse';
import { Provider } from '../../store/Provider';

const server = setupServer(
  rest.get('https://www.reddit.com/r/javascript/', (_req, res, ctx) => {
    return res(ctx.json(mockResponse));
  }),
);

beforeAll(() => {
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => {
  server.close();
});

describe('App', () => {
  it('should render app', () => {
    render(<App />);
  });

  it('should display header', () => {
    const { getByText } = render(<App />);
    expect(getByText(/Top posts by/)).not.toBeNull();
    expect(getByText(/Top posts by/).textContent).toEqual('Top posts by week');
  });

  it('should display list of posts', async () => {
    render(
      <Provider>
        <App />
      </Provider>,
    );
    const postList = await screen.findByTestId('postList');
    expect(postList.children).toHaveLength(mockResponse.data.children.length);
  });

  it('should view menu icon', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('menuIcon')).not.toBeNull();
  });

  it.skip('should open menu on click', async () => {
    const { getByTestId } = render(<App />);
    const menuIcon = getByTestId('menuIcon');
    userEvent.click(menuIcon);
    const openMenu = await screen.findByTestId('openMenu');
    expect(openMenu).not.toBeNull();
  });
});
