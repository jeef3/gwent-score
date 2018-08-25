import React from 'react';
// import { connect } from 'react-redux';
import { inject, observer } from 'mobx-react';

import UnitDialog from './UnitDialog';
import WeatherDialog from './WeatherDialog';

const renderDialog = (dialog, dialogData) => {
  switch (dialog) {
    case 'unit':
      return <UnitDialog card={dialogData} />;
    case 'weather':
      return <WeatherDialog card={dialogData} />;
    default:
      return <div />;
  }
};

const DialogManager = inject('app')(
  observer(
    ({ app }) => app.dialogVisible && renderDialog(app.dialog, app.dialogData)
  )
);

// const mapStateToProps = ({ showModal, dialog, dialogData }) => ({
//   showModal,
//   dialog,
//   dialogData
// });

const DialogManagerContainer = inject('app')(DialogManager);

export { DialogManager as Component };
export default DialogManagerContainer;
