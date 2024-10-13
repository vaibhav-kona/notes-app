import { NoteIntf } from '../../domains/Note';

export function notesReducer(
  notesInitialState: NotesInitialState,
  action: any
) {
  switch (action.type) {
    case 'fetched': {
      debugger;
      return { ...notesInitialState, notes: action.notes, isFetching: false };
    }
    case 'added': {
      return {
        ...notesInitialState,
        notes: [...notesInitialState.notes, action.note],
      };
    }
    case 'fetching': {
      return {
        ...notesInitialState,
        isFetching: action.isFetching,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export interface NotesInitialState {
  notes: NoteIntf[];
  isFetching: false;
}

export const notesInitialState = {
  notes: [],
  isFetching: false,
};
