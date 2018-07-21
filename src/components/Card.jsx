import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2px;
  margin: 2px;

  cursor: pointer;

  border: solid 1px black;

  background: lightgray;
`;
Container.displayName = 'Card_Container';

export default ({ points, score, attrs, onClick = () => {} }) => (
  <Container onClick={onClick}>
    <div style={{ fontSize: 18, color: 'green' }}>{score}</div>
    <div style={{ fontSize: 11, color: 'gray' }}>{points}</div>
    <div>{attrs}</div>
  </Container>
);
