import React from 'react';
import styled from 'styled-components';

import CombatClose from '../atoms/icons/CombatClose';
import CombatRanged from '../atoms/icons/CombatRanged';
import CombatSiege from '../atoms/icons/CombatSiege';

const Container = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;

  top: 50%;
  left: 50%;

  color: rgba(0, 0, 0, 0.5);

  border-radius: 25px;

  background: rgba(255, 255, 255, 0.1);

  transform: translate3d(-50%, -50%, 0);
`;
Container.displayName = 'CombatRowBackground_Container';

const renderCombatIcon = combat => {
  switch (combat) {
    case 'close':
      return <CombatClose />;
    case 'ranged':
      return <CombatRanged />;
    case 'siege':
    default:
      return <CombatSiege />;
  }
};

export default ({ combat }) => (
  <Container>{renderCombatIcon(combat)}</Container>
);
