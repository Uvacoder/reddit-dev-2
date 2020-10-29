import { ActionTypes } from '../store/store';
import { Dispatch } from 'react';
import { allSubreddits } from '../api/api';
import { IRedditPost } from '../models/SubredditResponse';

export async function fetchAndDispatch(
  selectedSubreddits: string[],
  sortBy: string,
  dispatch: Dispatch<any>,
): Promise<IRedditPost[]> {
  try {
    dispatch(loading());
    const subreddits = await allSubreddits(selectedSubreddits, sortBy);
    dispatch(success(subreddits));
    return subreddits;
  } catch ({ message }) {
    dispatch(failed(message));
    return [];
  }
}

export function success(payload: any[]) {
  return {
    type: ActionTypes.Success,
    payload,
  };
}

export function failed(payload: string) {
  return {
    type: ActionTypes.Failed,
    payload,
  };
}

export function loading() {
  return {
    type: ActionTypes.Loading,
    payload: true,
  };
}

export function select(payload: string | string[]) {
  return {
    type: ActionTypes.Select,
    payload: typeof payload === 'string' ? [payload] : payload,
  };
}

export function deselect(payload: string) {
  return {
    type: ActionTypes.Deselect,
    payload,
  };
}

export function sort(payload: string) {
  return {
    type: ActionTypes.Sort,
    payload,
  };
}

export function toggleMenu(payload: boolean) {
  return {
    type: ActionTypes.ToggleMenu,
    payload,
  };
}
