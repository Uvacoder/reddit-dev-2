import React, { FC, useContext, memo, ChangeEvent } from 'react';
import { select, deselect, sort, fetchAndDispatch, toggleMenu } from '../../../actions/actions';
import { AppState } from '../../../store/store';
import MenuContainer from '../MenuContainer/MenuContainer';
import MenuOption from '../MenuOption/MenuOption';
import { menuOptions } from '../../../models/MenuOption';
import { useLastUpdated, useSelectedSubreddits } from '../../../hooks/hooks';
import Button from '../Button/Button';
import Select from '../../Select/Select';

const OpenMenu: FC = () => {
  const {
    state: { selectedSubreddits, sortBy, menu },
    dispatch,
  } = useContext(AppState);
  // We are not using the values from the hooks so destructuring can skip em,
  // only grab the setValue-functions
  const [, setStoredSelectedSubreddits] = useSelectedSubreddits();
  const [, setLastUpdated] = useLastUpdated();

  // Dispatch to state management and wait for "save"-event onclick
  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = target;
    if (checked) dispatch(select(name));
    else dispatch(deselect(name));
  };

  const selectOnChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    dispatch(sort(target.value));
  };

  // Basically doing what we do in App.tsx inside of useEffect
  const onSave = () => {
    const subreddits = Array.from(new Set(selectedSubreddits));
    fetchAndDispatch(subreddits, sortBy, dispatch);
    setLastUpdated(new Date().getTime());
    setStoredSelectedSubreddits(subreddits);
    dispatch(toggleMenu(!menu));
  };

  const formattedOptions = formatMenuOptions(onChange, selectedSubreddits);
  return (
    <MenuContainer data-testid="openMenu">
      {formattedOptions}
      <Select onChange={selectOnChange} value={sortBy} options={['week', 'month', 'year']} />
      <Button onClick={onSave}> Save </Button>
    </MenuContainer>
  );
};

function formatMenuOptions(
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  selectedSubreddits: string[],
) {
  return menuOptions
    .map((mo) => mo.options)
    .reduce((a, b) => [...a, ...b])
    .map((o) => (
      <MenuOption key={o} checked={selectedSubreddits.includes(o)} option={o} onChange={onChange} />
    ));
}

export default memo(OpenMenu);
