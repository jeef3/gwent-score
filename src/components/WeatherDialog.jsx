import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withFormik } from 'formik';

import { Actions } from '../state';
import chevronLeft from '../assets/icons/chevron-left.svg';
import chevronRight from '../assets/icons/chevron-right.svg';
import WEATHER_CARDS from '../weatherCards';
import SpecialIcon from './atoms/SpecialIcon';
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

  cursor: pointer;

  border: 0;

  border-radius: 10px;

  background: transparent;

  appearance: none;
`;
PointChangeButton.displayName = 'PointChangeButton';

const getNextWeather = current => {
  const idx = WEATHER_CARDS.findIndex(card => card.combat === current.combat);

  return WEATHER_CARDS[idx === WEATHER_CARDS.length - 1 ? 0 : idx + 1];
};

const getPreviousWeather = current => {
  const idx = WEATHER_CARDS.findIndex(card => card.combat === current.combat);

  return WEATHER_CARDS[idx === 0 ? WEATHER_CARDS.length - 1 : idx - 1];
};

const InnerForm = ({ values, handleSubmit, setFieldValue }) => (
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
              setFieldValue('card', getPreviousWeather(values.card))
            }
          >
            <img width="30" src={chevronLeft} alt="left" />
          </PointChangeButton>
          <SpecialButton
            hero={values.hero}
            faction="northern-realms"
            onClick={() => setFieldValue('hero', !values.hero)}
          >
            <SpecialIcon name={values.card.name} />
          </SpecialButton>
          <PointChangeButton
            type="button"
            onClick={() => setFieldValue('card', getNextWeather(values.card))}
          >
            <img width="30" src={chevronRight} alt="right" />
          </PointChangeButton>
        </div>
        <span
          style={{
            fontFamily: 'Gwent',
            fontSize: 18
          }}
        >
          {values.card.title}
        </span>
        <em>{values.card.quote}</em>
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
  mapPropsToValues: ({ id, onCancel, onAddCard, onClearWeather }) => ({
    id,
    card: WEATHER_CARDS[0],
    onCancel,
    onAddCard,
    onClearWeather
  }),
  validate: () => true,
  handleSubmit: (values, { props: { onAddCard, onClearWeather } }) => {
    if (values.card.name === 'clear-weather') {
      onClearWeather();
    } else {
      onAddCard({
        combat: values.card.combat,
        special: 'weather'
      });
    }
  }
})(InnerForm);

export default connect(
  null,
  dispatch => ({
    onCancel: () => dispatch(Actions.closeModal()),
    onAddCard: card => dispatch(Actions.addCard({ card })),
    onClearWeather: () => dispatch(Actions.clearWeather())
  })
)(({ card, onCancel, onAddCard, onClearWeather }) => (
  <React.Fragment>
    <Overlay />
    <Dialog>
      <TheForm
        {...card}
        onCancel={onCancel}
        onAddCard={onAddCard}
        onClearWeather={onClearWeather}
      />
    </Dialog>
  </React.Fragment>
));
