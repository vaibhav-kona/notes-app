export function globalReducer(state: GlobalState, action: any) {
  switch (action.type) {
    case 'activeFolder': {
      return { ...state, activeFolderId: action.folderId };
    }
    case 'activeNote': {
      return { ...state, activeNoteId: action.noteId };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export interface GlobalState {
  activeFolderId: string | null;
  activeNoteId: string | null;
}

export const globalInitialState: GlobalState = {
  activeFolderId: null,
  activeNoteId: null,
};
