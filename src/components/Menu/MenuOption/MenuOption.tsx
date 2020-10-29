import React, { FC, memo } from 'react';
import styled from '@emotion/styled';

interface IMenuOptionProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  option: string;
}

const MenuOptionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-family: 'Courier New', Courier, monospace;
`;

const MenuOption: FC<IMenuOptionProps> = ({ onChange, option, checked }) => {
  return (
    <MenuOptionContainer>
      <label htmlFor={option}><strong>/{option}</strong></label>
      <input type="checkbox" id={option} checked={checked} name={option} onChange={onChange} />
    </MenuOptionContainer>
  );
};

export default memo(MenuOption);
