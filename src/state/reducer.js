import createReducerAction from './createReducerAction';
import initialState from './state';

export const StateActions = {
  modalShown: createReducerAction('→ MODAL_SHOWN', () => ({
    showModal: true
  })),
  modalHidden: createReducerAction('→ MODAL_HIDDEN', () => ({
    showModal: false
  })),

  cardAdded: createReducerAction('→ CARD_ADDED', (state, action) => ({
    cards: [...state.cards, action.payload.card]
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
