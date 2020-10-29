import { SubredditResponse, IRedditPost } from '../models/SubredditResponse';

export const API_URL = `https://www.reddit.com/r`;

export async function oneSubreddit(
  subreddit: string = 'javascript',
  sortBy: string = 'week',
): Promise<IRedditPost[]> {
  const response = await fetch(`${API_URL}/${subreddit}/top.json?sort=top&t=${sortBy}`);
  const subredditData: SubredditResponse = await response.json();
  const listOfPosts = subredditData.data.children;
  return listOfPosts;
}

export async function allSubreddits(
  subreddits: string[] = [],
  sortBy: string = 'week',
): Promise<IRedditPost[]> {
  const toFetch = subreddits.length > 0 ? subreddits : ['javascript'];
  const subs = await Promise.all(toFetch.map((s) => oneSubreddit(s, sortBy)));
  return subs.reduce((a, b) => [...a, ...b]);
}
