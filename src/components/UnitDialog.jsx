import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withFormik } from 'formik';

import { Actions } from '../state';
import plus from '../assets/icons/plus.svg';
import minus from '../assets/icons/minus.svg';
import Button from './atoms/Button';
import PointRingButton from './atoms/PointRingButton';
import SpecialButton from './atoms/SpecialButton';
import AttrIcon from './atoms/AttrIcon';
import CombatIcon from './atoms/CombatIcon';
import ItemSelect from './molecules/ItemSelect';
import Dialog from './Dialog';
import Overlay from './Overaly';

const DialogLayout = styled.div`
  height: 100%;

  display: grid;
  grid-template-rows: 40px 1fr 40px;
`;
DialogLayout.displayName = 'DialogLayout';

const PointChangeButton = styled.button`
  width: 70px;
  height: 70px;

  user-select: none;

  border: 0;

  border-radius: 10px;

  background: transparent;

  appearance: none;
`;
PointChangeButton.displayName = 'PointChangeButton';

const InnerForm = ({ values, handleChange, handleSubmit, setFieldValue }) => (
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
        <label>
          Select player
          <select name="player" value={values.player} onChange={handleChange}>
            <option />
            <option value="a">Player A</option>
            <option value="b">Player B</option>
          </select>
        </label>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            justifyItems: 'center',
            alignItems: 'center'
          }}
        >
          <PointChangeButton
            type="button"
            onClick={() =>
              setFieldValue('points', Math.max(values.points - 1, 0))
            }
          >
            <img width="30" src={minus} alt="minus" />
          </PointChangeButton>
          <PointRingButton
            hero={values.hero}
            faction="northern-realms"
            onClick={() => setFieldValue('hero', !values.hero)}
          >
            {values.points}
          </PointRingButton>
          <PointChangeButton
            type="button"
            onClick={() =>
              setFieldValue('points', Math.min(values.points + 1, 15))
            }
          >
            <img width="30" src={plus} alt="plus" />
          </PointChangeButton>
        </div>

        <ItemSelect
          items={['close', 'ranged', 'siege']}
          value={values.combat}
          renderValue={() => (
            <SpecialButton hero={false} faction="northern-realms">
              <CombatIcon name={values.combat} />
            </SpecialButton>
          )}
          onChange={value => {
            setFieldValue('combat', value);
          }}
        />

        <ItemSelect
          items={[
            '',
            'muster',
            'morale-boost',
            'commander-horn',
            'medic',
            'spy',
            'tight-bond',
            'scorch'
          ]}
          value={values.attr}
          renderValue={() => (
            <SpecialButton hero={false} faction="northern-realms">
              <AttrIcon name={values.attr} />
            </SpecialButton>
          )}
          onChange={value => {
            setFieldValue('attr', value);
          }}
        />

        {values.id && (
          <button type="button" onClick={() => values.onRemoveCard(values)}>
            Remove Card
          </button>
        )}
      </div>

      <div
        style={{
          backgroundColor: 'lightgray',
          display: 'flex',
          flexDirection: 'row-reverse'
        }}
      >
        <Button type="submit">Add Card</Button>
        <Button style={{ background: '#BD1D1D' }} onClick={values.onCancel}>
          Cancel
        </Button>
      </div>
    </DialogLayout>
  </form>
);

const TheForm = withFormik({
  mapPropsToValues: ({
    id,
    player,
    hero,
    points,
    combat,
    attr,
    onRemoveCard,
    onCancel
  }) => ({
    id,
    player,
    hero,
    points: points || 5,
    combat,
    attr,
    onRemoveCard,
    onCancel
  }),
  validate: () => true,
  handleSubmit: (values, { props: { onAddCard, onEditCard } }) => {
    if (values.id) {
      onEditCard(values);
    } else {
      onAddCard(values);
    }
  }
})(InnerForm);

export default connect(
  null,
  dispatch => ({
    onRemoveCard: card => dispatch(Actions.removeCard({ card })),
    onCancel: () => dispatch(Actions.closeModal()),
    onAddCard: card => dispatch(Actions.addCard({ card })),
    onEditCard: card => dispatch(Actions.editCard({ card }))
  })
)(({ card, onRemoveCard, onCancel, onAddCard, onEditCard }) => (
  <React.Fragment>
    <Overlay />
    <Dialog>
      <TheForm
        {...card}
        onRemoveCard={onRemoveCard}
        onCancel={onCancel}
        onAddCard={onAddCard}
        onEditCard={onEditCard}
      />
    </Dialog>
  </React.Fragment>
));
