import createReducerAction from './createReducerAction';
import initialState from './state';

export const StateActions = {
  showModal: createReducerAction('→ SHOW_MODAL', () => ({
    showModal: true
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
