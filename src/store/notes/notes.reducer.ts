import { NoteIntf } from '../../domains/Note';

export function notesReducer(state: NotesState, action: any) {
  switch (action.type) {
    case 'fetched': {
      return { ...state, notes: action.notes as NoteIntf[], isFetching: false };
    }
    case 'added': {
      return {
        ...state,
        notes: [...state.notes, action.note as NoteIntf],
      };
    }
    case 'updated': {
      const noteIdx = state.notes.findIndex(
        (note) => note.id === action.note.id
      );
      const updatedNotes = [...state.notes];
      updatedNotes[noteIdx] = action.note;
      return {
        ...state,
        notes: updatedNotes,
        isFetching: false,
      };
    }

    case 'moveNoteOut': {
      const updatedNotes = [...state.notes].filter(
        (note) => note.id !== action.note.id
      );
      return {
        ...state,
        notes: updatedNotes,
        isFetching: false,
      };
    }

    case 'fetching': {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export interface NotesState {
  notes: NoteIntf[];
  isFetching: false;
}

export const notesInitialState: NotesState = {
  notes: [],
  isFetching: false,
};
