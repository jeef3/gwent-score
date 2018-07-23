import styled from 'styled-components';

import northernRealmsUnit from '../../assets/ring/unit/northern-realms.png';

const IMAGE_URLS = {
  'northern-realms': northernRealmsUnit
};

const getImageUrl = ({ faction }) => IMAGE_URLS[faction];

const SpecialButton = styled.div.attrs({
  role: 'button',
  tabIndex: -1
})`
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  padding: 14px;

  cursor: pointer;

  background-image: url(${getImageUrl});
  background-size: 120px;
  background-repeat: no-repeat;
  background-position: center;

  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.5));
`;
SpecialButton.displayName = 'SpecialButton';

export default SpecialButton;
