import styled from 'styled-components';

import monster from '../../assets/ring/combat/monster.png';
import nilfgaard from '../../assets/ring/combat/nilfgaard.png';
import northernRealms from '../../assets/ring/combat/northern-realms.png';
import scoiatael from '../../assets/ring/combat/scoiatael.png';

const IMAGE_URLS = {
  monster,
  nilfgaard,
  'northern-realms': northernRealms,
  scoiatael
};

const getImageUrl = ({ faction }) => IMAGE_URLS[faction];

const PointRing = styled.div`
  box-sizing: border-box;
  width: 80px;
  height: 80px;
  padding: 4px;

  color: black;

  background-image: url(${getImageUrl});
  background-size: 80px;
  background-repeat: no-repeat;
  background-position: center;

  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.5));

  display: flex;
  align-items: center;
  justify-content: center;
`;
PointRing.displayName = 'PointRing';

export default PointRing;
