import React, { FC, memo } from 'react';
import styled from '@emotion/styled';

interface IRedditPostProps {
  title: string;
  score: number;
  link: string;
  subreddit: string;
}

const PostContainer = styled.div`
  margin: 0 2rem;
  a {
    text-decoration: none;
    border-bottom: 2px solid hsla(145, 20%, 20%, 1);
    padding-bottom: 2px;
    line-height: 2;
    color: hsla(250, 50%, 30%, 1);
  }
  @media (min-width: 756px) {
    width: 60%;
  }
`;

const RedditPost: FC<IRedditPostProps> = ({ title, score, link, subreddit }) => {
  return (
    <PostContainer>
      <p>
        <strong>
          <a href={link}>{title}</a>
        </strong>
      </p>
      <p>
        <strong>⬆︎ {score} </strong> - <strong><em>{subreddit}</em></strong>
      </p>
    </PostContainer>
  );
};

export default memo(RedditPost);
