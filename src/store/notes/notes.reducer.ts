import { NoteIntf } from '../../domains/Note';
import { Dispatch } from 'react';
import { BaseAction } from '../reducer.domain';

export interface NotesState {
  notes: NoteIntf[];
  isFetching: boolean;
}

export enum NOTES_ACTION_TYPES {
  FETCHED = 'fetched',
  ADDED = 'added',
  UPDATED = 'updated',
  MOVED = 'moveNoteOut',
  FETCHING = 'fetching',
}

export const notesInitialState: NotesState = {
  notes: [],
  isFetching: false,
};

export type NotesActionMap = {
  [NOTES_ACTION_TYPES.FETCHED]: {
    type: NOTES_ACTION_TYPES.FETCHED;
    notes: NoteIntf[];
  };
  [NOTES_ACTION_TYPES.ADDED]: {
    type: NOTES_ACTION_TYPES.ADDED;
    note: NoteIntf;
  };
  [NOTES_ACTION_TYPES.UPDATED]: {
    type: NOTES_ACTION_TYPES.UPDATED;
    note: NoteIntf;
  };
  [NOTES_ACTION_TYPES.MOVED]: {
    type: NOTES_ACTION_TYPES.MOVED;
    note: NoteIntf;
  };
  [NOTES_ACTION_TYPES.FETCHING]: {
    type: NOTES_ACTION_TYPES.FETCHING;
    isFetching: boolean;
  };
};

export type NotesAction = NotesActionMap[keyof NotesActionMap];

export type NotesDispatch = Dispatch<NotesAction>;

export function notesReducer(state: NotesState, action: NotesAction) {
  switch (action.type) {
    case NOTES_ACTION_TYPES.FETCHED: {
      return {
        ...state,
        notes: action.notes as NoteIntf[],
        isFetching: false,
      };
    }
    case NOTES_ACTION_TYPES.ADDED: {
      return {
        ...state,
        notes: [...state.notes, action.note as NoteIntf],
        isFetching: false,
      };
    }
    case NOTES_ACTION_TYPES.UPDATED: {
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

    case NOTES_ACTION_TYPES.MOVED: {
      const updatedNotes = [...state.notes].filter(
        (note) => note.id !== action.note.id
      );
      return {
        ...state,
        notes: updatedNotes,
        isFetching: false,
      };
    }

    case NOTES_ACTION_TYPES.FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    default: {
      throw Error('Unknown action: ' + (action as BaseAction).type);
    }
  }
}
