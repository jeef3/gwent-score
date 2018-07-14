import createReducerAction from './createReducerAction';
import initialState from './state';

export const StateActions = {
  sceneSelected: createReducerAction('→ SCENE_SELECTED', (state, action) => ({
    currentScene: action.payload.id
  })),
  screenSelected: createReducerAction('→ SCREEN_SELECTED', (state, action) => ({
    currentScreen: action.payload.id,
    currentScreenFrom: action.payload.fromBounds
  })),
  contentFrameResized: createReducerAction(
    '→ CONTENT_FRAME_RESIZED',
    (state, action) => ({
      contentFrameSize: action.payload.size
    })
  ),
  editorBoundsUpdated: createReducerAction(
    '→ EDITOR_BOUNDS_UPDATED',
    (state, action) => ({
      editorBounds: action.payload
    })
  ),
  zoomStarted: createReducerAction('→ ZOOM_STARTED', () => ({ zooming: true })),
  zoomEnded: createReducerAction('→ ZOOM_ENDED', () => ({ zooming: false })),
  overviewShown: createReducerAction('→ OVERVIEW_SHOWN', () => ({
    overview: true
  })),
  overviewHidden: createReducerAction('→ OVERVIEW_HIDDEN', () => ({
    overview: false
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
