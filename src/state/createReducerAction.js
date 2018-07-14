import { createAction } from 'redux-helper';

export default (action, reducer) => {
  const a = createAction(action);
  a.reducer = reducer;

  return a;
};
