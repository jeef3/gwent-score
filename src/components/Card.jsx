import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  width: 40px;
  height: 60px;
  padding: 2px;
  margin: 5px;

  cursor: pointer;

  text-align: center;

  border: solid 2px ${({ hero }) => (hero ? '#CA863A' : 'transparent')};
  border-radius: 5px;

  background: lightgray;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;
Container.displayName = 'Card_Container';

export default ({ hero, points, score, attrs, onClick = () => {} }) => (
  <Container hero={hero} onClick={onClick}>
    {score === points ? (
      <div style={{ fontSize: 18, color: 'black' }}>{score}</div>
    ) : (
      <React.Fragment>
        <div style={{ fontSize: 18, color: 'green' }}>{score}</div>
        <div style={{ fontSize: 11, color: 'gray' }}>{points}</div>
      </React.Fragment>
    )}

    <div>{attrs}</div>
  </Container>
);
