import React, { useReducer, FC } from 'react';
import { AppState, reducer, initialState, IAppState, IContextState } from './store';

export type IProviderProps = {
  children: any;
  optionalInitialState?: IAppState;
  store?: IContextState;
}

/**
 * The Provider is in charge of creating a reducer and setting up the
 * initial state of the application. The useReducer hook gives us access
 * to the current state and a function to dispatch an action which will
 * change the state. We then construct the context state from this app state
 * and dispatch and send it down to the whole application with <Context.Provider />
 * probably should be able to pass down a mock store for testing in the future
 */
export const Provider: FC<IProviderProps> = ({ children, optionalInitialState = initialState, store }) => {
  const [state, dispatch] = useReducer(reducer, optionalInitialState);
  const reducerState = {
    state,
    dispatch,
  };
  const contextState = store || reducerState;
  return <AppState.Provider value={contextState}>{children}</AppState.Provider>;
};
