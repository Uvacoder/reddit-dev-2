import * as actions from './actions';
import { mockResponse } from '../api/mockResponse';
import { ActionTypes } from '../store/store';

describe('actions', () => {
  it('should fetch and dispatch', async () => {
    const mockDispatch = jest.fn();
    const result = await actions.fetchAndDispatch(['javascript'], 'week', mockDispatch);
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(result.length).toEqual(mockResponse.data.children.length);
  });

  it('should success', () => {
    const redditPosts = mockResponse.data.children;
    const expectedAction = { type: ActionTypes.Success, payload: redditPosts };
    expect(actions.success(redditPosts)).toEqual(expectedAction);
  });

  it('should fail', () => {
    const message = 'NetworkError';
    const expectedAction = { type: ActionTypes.Failed, payload: message };
    expect(actions.failed(message)).toEqual(expectedAction);
  });

  it('should start loading state', () => {
    const expectedAction = { type: ActionTypes.Loading, payload: true };
    expect(actions.loading()).toEqual(expectedAction);
  });

  it('should select subreddit', () => {
    const subreddit = 'node';
    const expectedAction = { type: ActionTypes.Select, payload: [subreddit] };
    expect(actions.select(subreddit)).toEqual(expectedAction);
    expect(actions.select(subreddit).payload).toBeInstanceOf(Array);
  });

  it('should select all subreddits', () => {
    const subreddits = ['node', 'reactjs'];
    const expectedAction = { type: ActionTypes.Select, payload: subreddits };
    expect(actions.select(subreddits)).toEqual(expectedAction);
    expect(actions.select(subreddits).payload).toBeInstanceOf(Array);
  });

  it('should deselect subreddit', () => {
    const subreddit = 'javascript';
    const expectedAction = { type: ActionTypes.Deselect, payload: subreddit };
    expect(actions.deselect(subreddit)).toEqual(expectedAction);
  });

  it('should change sort', () => {
    const expectedAction = { type: ActionTypes.Sort, payload: 'month' };
    expect(actions.sort('month')).toEqual(expectedAction);
  });

  it('should toggle menu', () => {
    const expectedAction = { type: ActionTypes.ToggleMenu, payload: true };
    expect(actions.toggleMenu(true)).toEqual(expectedAction);
  });
});
