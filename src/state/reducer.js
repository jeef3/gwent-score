import createReducerAction from './createReducerAction';
import initialState from './state';

import scorch from '../scorch';

export const StateActions = {
  modalShown: createReducerAction('→ MODAL_SHOWN', (state, action) => ({
    showModal: true,
    dialog: action.payload.dialog,
    dialogData: action.payload.data
  })),
  modalHidden: createReducerAction('→ MODAL_HIDDEN', () => ({
    showModal: false,
    dialog: null,
    dialogData: null
  })),

  cardAdded: createReducerAction('→ CARD_ADDED', (state, action) => ({
    cards: [...state.cards, action.payload.card]
  })),

  cardEdited: createReducerAction('→ CARD_EDITED', (state, action) => {
    const indexToEdit = state.cards.findIndex(
      card => card.id === action.payload.card.id
    );

    const newCards = [...state.cards];
    newCards[indexToEdit] = action.payload.card;

    return {
      cards: newCards
    };
  }),

  cardRemoved: createReducerAction('→ CARD_REMOVED', (state, action) => ({
    cards: state.cards.filter(card => card.id !== action.payload.card.id)
  })),

  clearWeather: createReducerAction('→ CLEAR_WEATHER', state => ({
    cards: state.cards.filter(card => card.special !== 'weather')
  })),

  restart: createReducerAction('→ RESTART', () => ({
    cards: []
  })),

  scorch: createReducerAction('→ SCORCH', (state, action) => ({
    cards: scorch(state.cards, action.payload)
  })),

  sidesSwapped: createReducerAction('→ SIDES_SWAPPED', state => ({
    currentPlayer: state.currentPlayer === 'a' ? 'b' : 'a'
  }))
};

export default (state = initialState, action) => {
  const actionKeys = Object.keys(StateActions);

  const reducerKey = actionKeys.find(actionKey =>
    StateActions[actionKey].matchAction(action)
  );

  if (!reducerKey) {
    return state;
  }

  const { reducer } = StateActions[reducerKey];

  return reducer ? { ...state, ...reducer(state, action) } : state;
};
