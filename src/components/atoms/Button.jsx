import styled from 'styled-components';

const Button = styled.button.attrs({
  type: 'button'
})`
  flex: 1;

  margin: 0;

  color: white;
  font: inherit;
  font-weight: 600;

  border: 0;

  background-color: #009b6d;
`;
Button.displayName = 'Button';

export default Button;
