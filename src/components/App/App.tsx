import React, { FC, memo, useEffect, useContext } from 'react';
import styled from '@emotion/styled';
import { useSelectedSubreddits } from '../../hooks/hooks';
import Posts from '../Posts/Posts';
import Menu from '../Menu/Menu';
import { select, fetchAndDispatch } from '../../actions/actions';
import { AppState } from '../../store/store';
import Header from '../Header/Header';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
`;

const App: FC = () => {
  const {
    state: { subreddits, loading, sortBy },
    dispatch,
  } = useContext(AppState);
  const [storedSelectedSubreddits] = useSelectedSubreddits();
  /**
   * useEffect is used for actions with side effects that are not pure as
   * manipulating the dom or like in this case doing an AJAX-request and dispatching
   * and action efter that is done. In this case we are dispatching all checked
   * subreddits to the state, fetching all data and then setting the date when
   * we did this update in localstorage
   */
  useEffect(() => {
    if (subreddits && !subreddits.length) {
      dispatch(select(storedSelectedSubreddits));
      fetchAndDispatch(storedSelectedSubreddits, sortBy, dispatch);
    }
  }, [dispatch, sortBy, storedSelectedSubreddits, subreddits]);
  return (
    <AppContainer>
      <Header>
        Top posts by <strong>{sortBy}</strong>
      </Header>
      <Menu />
      {loading ? <p>loading</p> : <Posts of={subreddits} />}
    </AppContainer>
  );
};

export default memo(App);
