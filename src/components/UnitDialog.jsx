import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withFormik } from 'formik';

import { Actions } from '../state';
import plus from '../assets/icons/plus.svg';
import minus from '../assets/icons/minus.svg';
import AttrIcon from './atoms/AttrIcon';
import AttrRing from './atoms/AttrRing';
import Button from './atoms/Button';
import CombatIcon from './atoms/CombatIcon';
import CombatRing from './atoms/CombatRing';
import PointRing from './atoms/PointRing';
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

        <ItemSelect
          downButton={minus}
          upButton={plus}
          items={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15]}
          value={values.points}
          renderValue={() => (
            <PointRing
              role="button"
              tabIndex={-1}
              hero={values.hero}
              faction="northern-realms"
              onClick={() => setFieldValue('hero', !values.hero)}
            >
              {values.points}
            </PointRing>
          )}
          onChange={value => {
            setFieldValue('points', value);
          }}
        />

        <ItemSelect
          items={['close', 'ranged', 'siege']}
          value={values.combat}
          renderValue={() => (
            <CombatRing
              hero={false}
              faction={values.players[values.player].faction}
            >
              <CombatIcon name={values.combat} />
            </CombatRing>
          )}
          onChange={value => {
            setFieldValue('combat', value);
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateRows: 'auto auto auto',
            gridTemplateColumns: 'auto auto auto',
            justifyContent: 'center'
          }}
        >
          {[
            '',
            'muster',
            'morale-boost',
            'commander-horn',
            'medic',
            'spy',
            'tight-bond',
            'scorch'
          ].map(attr => (
            <div key={attr}>
              <button
                type="button"
                style={{
                  margin: 5,
                  padding: 5,
                  cursor: 'pointer',
                  background:
                    values.attr === attr || (!values.attr && attr === '')
                      ? 'red'
                      : 'transparent',
                  border: 0,
                  borderRadius: 50
                }}
                onClick={() => setFieldValue('attr', attr)}
              >
                <AttrRing faction="northern-realms">
                  <AttrIcon name={attr} />
                </AttrRing>
              </button>
            </div>
          ))}
        </div>

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
        <Button type="submit">{values.id ? 'Update Card' : 'Add Card'}</Button>
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
    players,
    hero,
    points,
    combat,
    attr,
    onRemoveCard,
    onCancel
  }) => ({
    id,
    player,
    players,
    hero,
    points: points === null || points === undefined ? 5 : points,
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
  state => ({
    players: state.players
  }),
  dispatch => ({
    onRemoveCard: card => dispatch(Actions.removeCard({ card })),
    onCancel: () => dispatch(Actions.closeModal()),
    onAddCard: card => dispatch(Actions.addCard({ card })),
    onEditCard: card => dispatch(Actions.editCard({ card }))
  })
)(({ players, card, onRemoveCard, onCancel, onAddCard, onEditCard }) => (
  <React.Fragment>
    <Overlay />
    <Dialog>
      <TheForm
        {...card}
        players={{
          a: players.playerA,
          b: players.playerB
        }}
        onRemoveCard={onRemoveCard}
        onCancel={onCancel}
        onAddCard={onAddCard}
        onEditCard={onEditCard}
      />
    </Dialog>
  </React.Fragment>
));
