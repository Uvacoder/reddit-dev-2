import { reducer, initialState, ActionTypes, IAppState } from './store';
import { mockResponse } from '../api/mockResponse';

const getInitialState = (optionalIntitialState?: IAppState) => {
  return reducer(optionalIntitialState, {});
};

describe('store', () => {
  it('should return initialstate', () => {
    expect(getInitialState()).toEqual(initialState);
  });

  it('should return custom initialstate ', () => {
    const customInitialState = Object.assign({}, initialState, {
      selectedSubreddits: ['javascript', 'csharp'],
    });
    const result = getInitialState(customInitialState);
    expect(result.selectedSubreddits).toEqual(customInitialState.selectedSubreddits);
  });

  it('should select a subreddit', () => {
    const action = { type: ActionTypes.Select, payload: ['node'] };
    const resultBeforeAction = getInitialState();
    expect(resultBeforeAction.selectedSubreddits).toHaveLength(1);
    const result = reducer(initialState, action);
    expect(result.selectedSubreddits).toHaveLength(2);
  });

  it('should deselect a subreddit', () => {
    const action = { type: ActionTypes.Deselect, payload: 'javascript' };
    const resultBeforeAction = getInitialState();
    expect(resultBeforeAction.selectedSubreddits).toHaveLength(1);
    const result = reducer(initialState, action);
    expect(result.selectedSubreddits).toHaveLength(0);
  });

  it('should set loading state', () => {
    const action = { type: ActionTypes.Loading, payload: true };
    const resultBeforeAction = getInitialState();
    expect(resultBeforeAction.loading).toBeFalsy();
    const result = reducer(initialState, action);
    expect(result.loading).toBeTruthy();
  });

  it('should set error state', () => {
    const action = { type: ActionTypes.Failed, payload: 'NetworkError' };
    const resultBeforeAction = getInitialState();
    expect(resultBeforeAction.loading).toBeFalsy();
    expect(resultBeforeAction.error).toBeFalsy();
    const result = reducer(initialState, action);
    expect(result.error).toBeTruthy();
  });

  it('should set subreddits', () => {
    const resultBeforeAction = getInitialState();
    expect(resultBeforeAction.loading).toBeFalsy();
    expect(resultBeforeAction.error).toBeFalsy();
    expect(resultBeforeAction.subreddits).toHaveLength(0);
    const redditPosts = mockResponse.data.children;
    const action = { type: ActionTypes.Success, payload: redditPosts };
    const result = reducer(initialState, action);
    expect(result.subreddits).toHaveLength(redditPosts.length);
  });

  it('should set sortBy state', () => {
    const action = { type: ActionTypes.Sort, payload: 'month' };
    const resultBeforeAction = getInitialState();
    expect(resultBeforeAction.sortBy).toEqual('week');
    const result = reducer(initialState, action);
    expect(result.sortBy).toEqual('month');
  });

  it('should toggle menu', () => {
    const action = { type: ActionTypes.ToggleMenu, payload: true };
    const resultBeforeAction = getInitialState();
    expect(resultBeforeAction.menu).toBeFalsy();
    const result = reducer(initialState, action);
    expect(result.menu).toBeTruthy();
  });
});
