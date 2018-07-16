import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withFormik } from 'formik';

import { Actions } from '../state';
import Dialog from './Dialog';
import Overlay from './Overaly';

const DialogLayout = styled.div`
  height: 100%;

  display: grid;
  grid-template-rows: 40px auto auto auto 40px;
`;
DialogLayout.displayName = 'DialogLayout';

const InnerForm = ({ values, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <DialogLayout>
      <div>Add Card</div>

      <div>
        Select player
        <select name="player" value={values.player} onChange={handleChange}>
          <option />
          <option value="a">Player A</option>
          <option value="b">Player B</option>
        </select>
      </div>

      <div>
        Select points
        <input
          type="number"
          name="points"
          value={values.points}
          onChange={handleChange}
        />
      </div>

      <div>
        Hero?
        <input
          type="checkbox"
          name="hero"
          checked={values.hero}
          onChange={handleChange}
        />
      </div>

      <div>
        Select combat
        <select name="combat" value={values.combat} onChange={handleChange}>
          <option />
          <option value="close">Close</option>
          <option value="ranged">Ranged</option>
          <option value="siege">Siege</option>
          <option value="special">Special</option>
        </select>
      </div>
      <div>
        Select Attr
        <select name="attr" value={values.attr} onChange={handleChange}>
          <option />
          <option value="muster">Muster</option>
          <option value="morale-boost">Morale Boost</option>
          <option value="commander-horn">Commander Horn</option>
          <option value="medic">Medic</option>
        </select>
      </div>

      <div
        style={{
          backgroundColor: 'lightgray',
          display: 'flex',
          flexDirection: 'row-reverse',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}
      >
        <button type="submit">Add Card</button>
        <button type="button" onClick={values.onCancel}>
          Cancel
        </button>
      </div>
    </DialogLayout>
  </form>
);

const TheForm = withFormik({
  mapPropsToValues: ({ player, points, combat, attr, onCancel }) => ({
    player,
    hero: false,
    points: points || 0,
    combat,
    attr,
    onCancel
  }),
  validate: () => true,
  handleSubmit: (values, { props: { onAddCard } }) => {
    onAddCard(values);
  }
})(InnerForm);

export default connect(
  state => ({ showModal: state.showModal }),
  dispatch => ({
    onCancel: () => dispatch(Actions.closeModal()),
    onAddCard: card => dispatch(Actions.addCard({ card }))
  })
)(
  ({ showModal, onCancel, onAddCard }) =>
    showModal ? (
      <div>
        <Overlay />
        <Dialog>
          <TheForm onCancel={onCancel} onAddCard={onAddCard} />
        </Dialog>
      </div>
    ) : null
);
