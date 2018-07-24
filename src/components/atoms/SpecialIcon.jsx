import React from 'react';

import SpecialBitingFrost from './icons/SpecialBitingFrost';
import SpecialImpeneterableFog from './icons/SpecialImpenetrableFog';
import SpecialTorrentialRain from './icons/SpecialTorrentialRain';
import SpecialClearWeather from './icons/SpecialClearWeather';

const getWeather = name => {
  console.log('getting for', name);
  switch (name) {
    case 'biting-frost':
      return <SpecialBitingFrost />;
    case 'impeneterable-fog':
      return <SpecialImpeneterableFog />;
    case 'torrential-rain':
      return <SpecialTorrentialRain />;
    case 'clear-weather':
    default:
      return <SpecialClearWeather />;
  }
};

export default ({ name }) => getWeather(name);
