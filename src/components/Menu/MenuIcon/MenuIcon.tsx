import styled from '@emotion/styled';

interface IMenuIconProps {
  onClick: () => void;
  open: boolean;
}

const MenuIconStyled = styled.div<IMenuIconProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  cursor: pointer;
  transform: ${(props) => (props.open ? 'translateX(16rem)' : null)};
  &::after {
    display: block;
    content: '⇋';
    margin: 0.5rem;
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export default MenuIconStyled;
