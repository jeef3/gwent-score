import createReducerAction from './createReducerAction';
import initialState from './state';

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
