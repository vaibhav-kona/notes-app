import {
  globalReducer,
  GlobalState,
  globalInitialState,
  GLOBAL_ACTIONS,
  GlobalActionsMap,
  GlobalAction,
} from './global.reducer';

describe('globalReducer', () => {
  const initialState: GlobalState = globalInitialState;

  test('should handle "activeFolder" action and update activeFolderId', () => {
    const action: GlobalActionsMap[GLOBAL_ACTIONS.ACTIVE_FOLDER] = {
      type: GLOBAL_ACTIONS.ACTIVE_FOLDER,
      folderId: 'folder123',
    };

    const result = globalReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      activeFolderId: 'folder123',
    });
  });

  test('should handle "activeNote" action and update activeNoteId', () => {
    const action: GlobalActionsMap[GLOBAL_ACTIONS.ACTIVE_NOTE] = {
      type: GLOBAL_ACTIONS.ACTIVE_NOTE,
      noteId: 'note456',
    };

    const result = globalReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      activeNoteId: 'note456',
    });
  });

  test('should throw an error for unknown action types', () => {
    const action = {
      type: 'unknownAction',
    };

    expect(() =>
      globalReducer(initialState, action as GlobalAction)
    ).toThrowError('Unknown action: unknownAction');
  });
});
