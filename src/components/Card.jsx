import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2px;
  margin: 2px;

  border: solid 1px black;

  background: lightgray;
`;
Container.displayName = 'Card_Container';

export default ({ points, hero, attrs }) => (
  <Container>
    <div>{points}</div>
    <div>{attrs}</div>
  </Container>
);
