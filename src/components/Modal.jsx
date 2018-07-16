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
  grid-template-rows: 40px 1fr 40px;
`;
DialogLayout.displayName = 'DialogLayout';

const Button = styled.button`
  flex: 1;

  margin: 0;

  color: white;
  font-size: inherit;

  border: 0;

  background: transparent;
`;
Button.displayName = 'Button';

const InnerForm = ({ values, handleChange, handleSubmit }) => (
  <form style={{ display: 'contents' }} onSubmit={handleSubmit}>
    <DialogLayout>
      <h2 style={{ margin: 0, alignSelf: 'center', textAlign: 'center' }}>
        Add Card
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <label htmlFor="player">
          Select player
          <select name="player" value={values.player} onChange={handleChange}>
            <option />
            <option value="a">Player A</option>
            <option value="b">Player B</option>
          </select>
        </label>

        <label htmlFor="points">
          Select points
          <input
            type="number"
            name="points"
            value={values.points}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="hero">
          Hero?
          <input
            type="checkbox"
            name="hero"
            checked={values.hero}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="combat">
          Select combat
          <select name="combat" value={values.combat} onChange={handleChange}>
            <option />
            <option value="close">Close</option>
            <option value="ranged">Ranged</option>
            <option value="siege">Siege</option>
            <option value="special">Special</option>
          </select>
        </label>

        <label htmlFor="attr">
          Select Attr
          <select name="attr" value={values.attr} onChange={handleChange}>
            <option />
            <option value="muster">Muster</option>
            <option value="morale-boost">Morale Boost</option>
            <option value="commander-horn">Commander Horn</option>
            <option value="medic">Medic</option>
            <option value="spy">Spy</option>
          </select>
        </label>
      </div>

      <div
        style={{
          backgroundColor: 'lightgray',
          display: 'flex',
          flexDirection: 'row-reverse'
        }}
      >
        <Button style={{ background: 'green' }} type="submit">
          Add Card
        </Button>
        <Button
          style={{ background: 'red' }}
          type="button"
          onClick={values.onCancel}
        >
          Cancel
        </Button>
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
