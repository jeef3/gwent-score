import styled from 'styled-components';

const Dialog = styled.div`
  position: fixed;

  top: 20px;
  right: 20px;
  bottom: 20px;
  left: 20px;

  background: white;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;
Dialog.displayName = 'Dialog';

export default Dialog;
