import { injectGlobal } from 'styled-components';

export default () =>
  injectGlobal`
    html {
      font: 100%/1.5 "Halis GR", sans-serif;
      font-weight: 400;

      text-size-adjust: 100%;

      -webkit-tap-highlight-color: transparent;
    }

    body {
      margin: 0;
    }
  `;
