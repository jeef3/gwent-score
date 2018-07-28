import React from 'react';

import AttrMuster from './icons/AttrMuster';
import AttrMoraleBoost from './icons/AttrMoraleBoost';
import AttrCommanderHorn from './icons/SpecialCommanderHorn';
import AttrMedic from './icons/AttrMedic';
import AttrSpy from './icons/AttrSpy';
import AttrTightBond from './icons/AttrTightBond';
import AttrScorch from './icons/SpecialScorch';

const getWeather = name => {
  switch (name) {
    case 'muster':
      return <AttrMuster />;
    case 'morale-boost':
      return <AttrMoraleBoost />;
    case 'commander-horn':
      return <AttrCommanderHorn />;
    case 'medic':
      return <AttrMedic />;
    case 'spy':
      return <AttrSpy />;
    case 'tight-bond':
      return <AttrTightBond />;
    case 'scorch':
      return <AttrScorch />;
    default:
      return null;
  }
};

export default ({ name }) => getWeather(name);
