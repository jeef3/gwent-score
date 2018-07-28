import React from 'react';

import CombatClose from './icons/CombatClose';
import CombatRanged from './icons/CombatRanged';
import CombatSiege from './icons/CombatSiege';

const getCombat = name => {
  switch (name) {
    case 'close':
      return <CombatClose />;
    case 'ranged':
      return <CombatRanged />;
    case 'siege':
    default:
      return <CombatSiege />;
  }
};

export default ({ name }) => getCombat(name);
