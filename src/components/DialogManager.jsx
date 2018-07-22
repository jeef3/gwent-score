import React from 'react';
import { connect } from 'react-redux';

import UnitDialog from './UnitDialog';
import WeatherDialog from './WeatherDialog';

const renderDialog = (dialog, dialogData) => {
  switch (dialog) {
    case 'unit':
      return <UnitDialog card={dialogData} />;
    case 'weather':
      return <WeatherDialog />;
    default:
      return <div />;
  }
};

const DialogManager = ({ showModal, dialog, dialogData }) =>
  showModal && renderDialog(dialog, dialogData);

const mapStateToProps = ({ showModal, dialog, dialogData }) => ({
  showModal,
  dialog,
  dialogData
});

const DialogManagerContainer = connect(mapStateToProps)(DialogManager);

export { DialogManager as Component };
export default DialogManagerContainer;
