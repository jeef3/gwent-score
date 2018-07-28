import React from 'react';
import styled from 'styled-components';

import chevronLeft from '../../assets/icons/chevron-left.svg';
import chevronRight from '../../assets/icons/chevron-right.svg';

const PointChangeButton = styled.button`
  width: 70px;
  height: 70px;

  cursor: pointer;

  border: 0;

  border-radius: 10px;

  background: transparent;

  appearance: none;
`;
PointChangeButton.displayName = 'PointChangeButton';

const up = (items, value) => {
  const idx = items.findIndex(v => v === value);

  return items[idx === items.length - 1 ? 0 : idx + 1];
};

const down = (items, value) => {
  const idx = items.findIndex(v => v === value);

  return items[idx === 0 ? items.length - 1 : idx - 1];
};

const ItemSelect = ({
  downButton = chevronLeft,
  upButton = chevronRight,
  value,
  items,
  renderValue,
  onChange
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      justifyItems: 'center',
      alignItems: 'center'
    }}
  >
    <PointChangeButton
      type="button"
      onClick={() => onChange(down(items, value))}
    >
      <img width="30" src={downButton} alt="left" />
    </PointChangeButton>

    {renderValue()}

    <PointChangeButton type="button" onClick={() => onChange(up(items, value))}>
      <img width="30" src={upButton} alt="right" />
    </PointChangeButton>
  </div>
);

export default ItemSelect;
