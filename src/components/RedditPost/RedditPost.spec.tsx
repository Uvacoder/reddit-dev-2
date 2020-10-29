import React from 'react';
import { render, cleanup } from '@testing-library/react';
import RedditPost from './RedditPost';
import { mockResponse } from '../../api/mockResponse';

afterEach(cleanup);

describe('RedditPost', () => {
  it('should view single post', () => {
    const [singlePost] = mockResponse.data.children;
    const { container } = render(
      <RedditPost
        title={singlePost.data.title}
        subreddit={singlePost.data.subreddit}
        score={singlePost.data.score}
        link={singlePost.data.permalink}
      />,
    );
  });
});
