import { setupServer } from 'msw/node';
import { rest } from 'msw';

import * as api from './api';
import { mockResponse } from './mockResponse';

const server = setupServer(
  rest.get('https://www.reddit.com/r/javascript/', (_req, res, ctx) => {
    return res(ctx.json(mockResponse.data.children));
  }),
);

beforeAll(() => {
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => {
  server.close();
});

describe.skip('api', () => {
  it('should get single subreddit by top week', async () => {
    const response = await api.oneSubreddit('javascript');
    expect(response).toEqual(mockResponse.data.children);
  });

  it('should get all subreddits by top week', async () => {
    const response = await api.allSubreddits(['javascript']);
    expect(response).toEqual(mockResponse.data.children);
  });

  it('should get default response', async () => {
    const response = await api.oneSubreddit();
    expect(response).toEqual(mockResponse.data.children);
  });
});
