import styled from 'styled-components';

import northernRealmsUnit from '../../assets/ring/unit/northern-realms.png';

const IMAGE_URLS = {
  'northern-realms': northernRealmsUnit
};

const getImageUrl = ({ faction }) => IMAGE_URLS[faction];

const SpecialRing = styled.div`
  box-sizing: border-box;
  width: 120px;
  height: 120px;
  padding: 22px;

  background-image: url(${getImageUrl});
  background-size: 120px;
  background-repeat: no-repeat;
  background-position: center;

  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.5));
`;
SpecialRing.displayName = 'SpecialRing';

export default SpecialRing;
