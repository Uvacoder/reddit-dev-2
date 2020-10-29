import React, { FC, memo, useContext } from 'react';
import MenuIcon from './MenuIcon/MenuIcon';
import OpenMenu from './OpenMenu/OpenMenu';
import { AppState } from '../../store/store';
import { toggleMenu } from '../../actions/actions';

const Menu: FC = () => {
  const {
    state: { menu },
    dispatch,
  } = useContext(AppState);
  const onClick = () => dispatch(toggleMenu(!menu));
  const sidebarMenu = menu ? <OpenMenu /> : null;
  return (
    <>
      <MenuIcon onClick={onClick} open={menu} data-testid="menuIcon" />
      {sidebarMenu}
    </>
  );
};

export default memo(Menu);
