import React, { FC, memo } from 'react';
import { IRedditPost } from '../../models/SubredditResponse';
import RedditPost from '../RedditPost/RedditPost';

interface IPostsProps {
  of: IRedditPost[];
}

export function sortByScore(a: IRedditPost, b: IRedditPost): number {
  return b.data.score - a.data.score;
}

const Posts: FC<IPostsProps> = (props) => {
  return props.of.length ? (
    <div data-testid="postList">
      {props.of.sort(sortByScore).map((s) => (
        <RedditPost
          title={s.data.title}
          key={s.data.id}
          score={s.data.score}
          link={s.data.permalink}
          subreddit={s.data.subreddit}
        />
      ))}
    </div>
  ) : null;
};

export default memo(Posts);
