import styled from '@emotion/styled';

interface IButtonProps {
  onClick: () => void;
}

const Button = styled.button<IButtonProps>`
  background: #fff;
  border: 1px solid #2d2d2d;
  margin: 1rem;
  padding: 1rem;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 4px;
  font-family: 'Courier New', Courier, monospace;
  &:hover {
    background-color: #f1f1f1;
  }
`;

export default Button;
