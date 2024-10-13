interface GlobalState {
  activeFolderId: string | null;
  activeNoteId: string | null;
}

export function globalReducer(globalState: GlobalState, action: any) {
  switch (action.type) {
    case 'activeFolder': {
      return { ...globalState, activeFolderId: action.folderId };
    }
    case 'activeNote': {
      return { ...globalState, activeNoteId: action.noteId };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export const globalInitialState: GlobalState = {
  activeFolderId: null,
  activeNoteId: null,
};
