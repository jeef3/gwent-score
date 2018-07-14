import styled from 'styled-components';

const PageLayout = styled.div`
  height: 100vh;

  display: grid;
  grid-template-rows: 40px 1fr 40px;
`;
PageLayout.displayName = 'PageLayout';

export default PageLayout;
