import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { Provider } from './Provider';
import { IContextState, AppState } from './store';

afterEach(cleanup);

describe('Provider', () => {
  it('should pass initialState to context consumer', () => {
    const tree = (
      <Provider>
        <AppState.Consumer>
          {({ state }: IContextState) => {
            const [firstSelected] = state.selectedSubreddits;
            return (
              <>
                <p>{firstSelected}</p>
                <p>{state.sortBy}</p>
              </>
            );
          }}
        </AppState.Consumer>
      </Provider>
    );
    const { getByText } = render(tree);
    expect(getByText(/javascript/).textContent).toBe('javascript');
    expect(getByText(/week/).textContent).toBe('week');
  });
});
