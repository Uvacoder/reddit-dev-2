import { createContext, Dispatch } from 'react';
import { IRedditPost } from '../models/SubredditResponse';

export interface IAppState {
  subreddits: IRedditPost[];
  loading: boolean;
  error: string;
  selectedSubreddits: string[];
  sortBy: string;
  menu: boolean;
}

/**
 * We are adding a dispatch to the AppState.Provider in Provider.tsx which
 * means that we must keep typescript happy and tell it that we may add a
 * dispatcher later on, thats why we have the two interfaces, on for raw data
 * and one for mer architecture needs
 */
export interface IContextState {
  state: IAppState;
  dispatch: Dispatch<any>;
}

export const initialState: IAppState = {
  subreddits: [],
  loading: false,
  error: '',
  selectedSubreddits: ['javascript'],
  sortBy: 'week',
  menu: false,
};

export enum ActionTypes {
  Success = '[@subs]/success',
  Failed = '[@subs]/failed',
  Loading = '[@subs]/loading',
  Select = '[@subs]/select',
  Deselect = '[@subs]/deselect',
  Sort = '[@subs]/sort',
  ToggleMenu = '[@menu]/toggle',
}

/**
 * Specify that we will use the IContextState but only supply the initialState
 * because we do not yet have the dispatch call. Be sure to export this state
 * as we will use it in multiple places, basically whenever we want to access
 * the global app state we will need it.
 */
export const AppState = createContext<IContextState>({
  state: initialState,
  dispatch: () => { }
});

export const reducer = (state: IAppState = initialState, action: any): IAppState => {
  logger(state, action);
  switch (action.type) {
    case ActionTypes.Loading:
      return { ...state, loading: true };
    case ActionTypes.Failed:
      return { ...state, error: action.payload, loading: false };
    case ActionTypes.Success:
      return { ...state, error: '', subreddits: action.payload, loading: false };
    case ActionTypes.Select:
      return { ...state, selectedSubreddits: [...state.selectedSubreddits, ...action.payload] };
    case ActionTypes.Deselect:
      return {
        ...state,
        selectedSubreddits: state.selectedSubreddits.filter((s) => s !== action.payload),
      };
    case ActionTypes.Sort:
      return { ...state, sortBy: action.payload };
    case ActionTypes.ToggleMenu:
      return { ...state, menu: action.payload };
    default:
      return state;
  }
};

// Ghetto Redux DevTools in development
function logger(state: IAppState, action: any) {
  if (process.env.NODE_ENV === 'development') {
    console.group(action.type);
    console.log('current state: ', state);
    console.log('payload: ', action.payload);
    console.groupEnd();
  }
}
