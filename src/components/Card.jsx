import React from 'react';
import styled from 'styled-components';

import AttrIcon from './atoms/AttrIcon';

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

  background: ${({ scorched }) => (scorched ? 'red' : 'lightgray')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

  display: grid;
  grid-template-areas: 'score score' 'attr point';

  ${AttrIcon} svg {
    display: block;
  }
`;
Container.displayName = 'Card_Container';

export default ({
  hero,
  points,
  score,
  attr,
  scorched,
  onClick = () => {}
}) => (
  <Container hero={hero} scorched={scorched} onClick={onClick}>
    {score === points ? (
      <div style={{ fontSize: 18, color: 'black', gridArea: 'score' }}>
        {score}
      </div>
    ) : (
      <React.Fragment>
        <div style={{ fontSize: 18, color: 'green', gridArea: 'score' }}>
          {score}
        </div>
        <div style={{ fontSize: 11, color: 'gray', gridArea: 'point' }}>
          {points}
        </div>
      </React.Fragment>
    )}

    <div
      style={{
        width: 20,
        height: 20,
        gridArea:
          score === points
            ? 'attr / point / attr / attr'
            : 'attr / attr / attr / attr'
      }}
    >
      <AttrIcon name={attr} />
    </div>
  </Container>
);
