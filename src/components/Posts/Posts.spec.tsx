import React from 'react';
import Posts, { sortByScore } from './Posts';
import { render, cleanup } from '@testing-library/react';
import { mockResponse } from '../../api/mockResponse';
import { IRedditPost } from '../../models/SubredditResponse';

afterEach(cleanup);

describe('Posts', () => {
  it('should show posts', () => {
    const posts = mockResponse.data.children;
    const { getByTestId } = render(<Posts of={posts} />);
    expect(getByTestId('postList').children.length).toEqual(posts.length);
  });

  it('should not show posts', () => {
    const posts: IRedditPost[] = [];
    const { getByTestId } = render(<Posts of={posts} />);
    expect(() => {
      expect(getByTestId('postList'));
    }).toThrow();
  });

  it('first post should be highest rated', () => {
    const posts = mockResponse.data.children;
    const [first, second] = posts.sort(sortByScore);
    expect(first.data.score).toBeGreaterThanOrEqual(second.data.score);
  });
});
