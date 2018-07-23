import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withFormik } from 'formik';

import { Actions } from '../state';
import plus from '../assets/icons/plus.svg';
import minus from '../assets/icons/minus.svg';
import SpecialBitingFrost from './atoms/icons/SpecialBitingFrost';
import SpecialImpeneterableFog from './atoms/icons/SpecialImpenetrableFog';
import SpecialTorrentialRain from './atoms/icons/SpecialTorrentialRain';
import SpecialButton from './atoms/SpecialButton';
import Button from './atoms/Button';
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

  border: 0;

  border-radius: 10px;

  background: transparent;

  appearance: none;
`;
PointChangeButton.displayName = 'PointChangeButton';

const renderWeather = combat => {
  switch (combat) {
    case 'close':
      return <SpecialBitingFrost />;
    case 'ranged':
      return <SpecialImpeneterableFog />;
    case 'siege':
    default:
      return <SpecialTorrentialRain />;
  }
};

const InnerForm = ({ values, handleChange, handleSubmit, setFieldValue }) => (
  <form style={{ display: 'contents' }} onSubmit={handleSubmit}>
    <DialogLayout>
      <h2 style={{ margin: 0, alignSelf: 'center', textAlign: 'center' }}>
        Play Weather
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <label>
          Select Special
          <select name="combat" value={values.combat} onChange={handleChange}>
            <option value="close">Biting Frost</option>
            <option value="ranged">Impenetrable Frost</option>
            <option value="siege">Torrential Rain</option>
            <option value="clear">Clear Weather</option>
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
          <SpecialButton
            hero={values.hero}
            faction="northern-realms"
            onClick={() => setFieldValue('hero', !values.hero)}
          >
            {renderWeather(values.combat)}
          </SpecialButton>
          <PointChangeButton
            type="button"
            onClick={() =>
              setFieldValue('points', Math.min(values.points + 1, 15))
            }
          >
            <img width="30" src={plus} alt="plus" />
          </PointChangeButton>
        </div>
      </div>

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
    </DialogLayout>
  </form>
);

const TheForm = withFormik({
  mapPropsToValues: ({ id, combat, onCancel, onAddCard }) => ({
    id,
    combat,
    special: 'weather',
    onCancel,
    onAddCard
  }),
  validate: () => true,
  handleSubmit: (values, { props: { onAddCard } }) => {
    onAddCard(values);
  }
})(InnerForm);

export default connect(
  null,
  dispatch => ({
    onCancel: () => dispatch(Actions.closeModal()),
    onAddCard: card => dispatch(Actions.addCard({ card }))
  })
)(({ card, onCancel, onAddCard }) => (
  <React.Fragment>
    <Overlay />
    <Dialog>
      <TheForm {...card} onCancel={onCancel} onAddCard={onAddCard} />
    </Dialog>
  </React.Fragment>
));
