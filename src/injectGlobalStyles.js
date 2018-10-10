import { injectGlobal } from 'styled-components';

import gwent from './assets/font/hinted-GWENT-ExtraBold.ttf';
import halisLight from './assets/font/hinted-HalisGR-Light.ttf';
import halisBook from './assets/font/hinted-HalisGR-Book.ttf';
import halisRegular from './assets/font/hinted-HalisGR-Regular.ttf';
import halisMedium from './assets/font/hinted-HalisGR-Medium.ttf';
import halisBold from './assets/font/hinted-HalisGR-Bold.ttf';

export default () =>
  injectGlobal`
    @font-face {
      font-family: GWENT;
      src: url(${gwent}) format("truetype");
    }

    @font-face {
      font-family: "Halis GR";
      font-weight: 100;
      src: url(${halisLight}) format("truetype");
    }

    @font-face {
      font-family: "Halis GR";
      font-weight: 300;
      src: url(${halisBook}) format("truetype");
    }

    @font-face {
      font-family: "Halis GR";
      font-weight: 400;
      src: url(${halisRegular}) format("truetype");
    }

    @font-face {
      font-family: "Halis GR";
      font-weight: 600;
      src: url(${halisMedium}) format("truetype");
    }

    @font-face {
      font-family: "Halis GR";
      font-weight: 900;
      src: url(${halisBold}) format("truetype");
    }

    html {
      overflow: hidden;
      position: fixed;
      height: 100%;

      font: 100%/1.5 "Halis GR", sans-serif;
      font-weight: 400;

      text-size-adjust: 100%;

      -webkit-tap-highlight-color: transparent;
    }

    body {
      width: 100vw;
      height: 100vh;

      overflow-y: scroll;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;

      margin: 0;
    }
  `;
