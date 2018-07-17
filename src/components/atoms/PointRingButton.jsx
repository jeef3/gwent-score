import styled from 'styled-components';

import northernRealmsUnit from '../../assets/ring/unit/northern-realms.png';
import northernRealmsHero from '../../assets/ring/hero/northern-realms.png';

const IMAGE_URLS = {
  'northern-realms': {
    unit: northernRealmsUnit,
    hero: northernRealmsHero
  },
  monster: {
    unit: '',
    hero: ''
  }
};

const getImageUrl = ({ hero, faction }) =>
  IMAGE_URLS[faction][hero ? 'hero' : 'unit'];

const PointRingButton = styled.div.attrs({
  role: 'button',
  tabIndex: -1
})`
  width: 100px;
  height: 100px;

  font-family: Gwent;
  font-size: 45px;

  cursor: pointer;
  user-select: none;

  color: ${({ hero }) => (hero ? 'white' : 'black')};

  background-image: url(${getImageUrl});
  background-size: 100px;
  background-repeat: no-repeat;
  background-position: center;

  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.5));

  display: flex
  align-items: center;
  justify-content: center;
`;
PointRingButton.displayName = 'PointRingButton';

export default PointRingButton;
