import React from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';

import { Actions } from '../state';
import Button from './atoms/Button';
import Dialog from './Dialog';
import Overlay from './Overaly';

const InnerForm = ({ values, handleChange, handleSubmit }) => (
  <form style={{ display: 'contents' }} onSubmit={handleSubmit}>
    <h2>Play Weather</h2>

    {JSON.stringify(values)}
    <label>
      Select Special
      <select name="special" value={values.special} onChange={handleChange}>
        <option />
        <option value="weather">Biting Frost</option>
        <option value="weather">Impenetrable Frost</option>
        <option value="weather">Torrential Rain</option>
        <option value="clear-weather">Clear Weather</option>
      </select>
    </label>

    <div
      style={{
        backgroundColor: 'lightgray',
        display: 'flex',
        flexDirection: 'row-reverse'
      }}
    >
      <Button type="submit">Play Weather</Button>
      <Button style={{ background: '#BD1D1D' }} onClick={values.onCancel}>
        Cancel
      </Button>
    </div>
  </form>
);

const TheForm = withFormik({
  mapPropsToValues: ({ id, combat, special }) => ({ id, combat, special }),
  validate: () => true,
  handleSubmit: (values, { onAddCard }) => {
    onAddCard(values);
  }
})(InnerForm);

export default connect(
  null,
  dispatch => ({
    onCancel: () => dispatch(Actions.closeModal())
  })
)(({ onCancel }) => (
  <React.Fragment>
    <Overlay />
    <Dialog>
      <TheForm onCancel={onCancel} />
    </Dialog>
  </React.Fragment>
));
