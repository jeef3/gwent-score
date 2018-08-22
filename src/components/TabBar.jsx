import React from 'react';
// import { connect } from 'react-redux';
import { inject } from 'mobx-react';

// import { Actions } from '../state';

// export default connect(
//   null,
//   dispatch => ({
//     onPlayLeader: () => dispatch(Actions.playLeader()),
//     onRestart: () => dispatch(Actions.restart()),
//     onPlayWeather: () => dispatch(Actions.playWeather()),
//     onScorch: () => dispatch(Actions.scorch())
//   })
// )(({ onPlayLeader, onRestart, onPlayWeather, onScorch }) => (
const TabBar = inject('app', 'board')(({ app, board }) => (
  <div
    style={{
      display: 'flex',
      backgroundColor: 'lightgray',
      justifyContent: 'space-around',
      alignItems: 'center'
    }}
  >
    <button type="button" onClick={board.playLeader}>
      Play Leader
    </button>
    <button type="button" onClick={board.restart}>
      Restart
    </button>
    <button type="button" onClick={board.scorch}>
      Scorch
    </button>
    <button type="button" onClick={app.showWeatherDialog}>
      Play Weather
    </button>
  </div>
));

export default TabBar;
