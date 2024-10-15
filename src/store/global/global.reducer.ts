import { BaseAction } from '../reducer.domain';
import { Dispatch } from 'react';

export interface GlobalState {
  activeFolderId: string | null;
  activeNoteId: string | null;
}

export const globalInitialState: GlobalState = {
  activeFolderId: null,
  activeNoteId: null,
};

export enum GLOBAL_ACTIONS {
  ACTIVE_FOLDER = 'activeFolder',
  ACTIVE_NOTE = 'activeNote',
}

export type GlobalActionsMap = {
  [GLOBAL_ACTIONS.ACTIVE_FOLDER]: {
    type: GLOBAL_ACTIONS.ACTIVE_FOLDER;
    folderId: string | null;
  };
  [GLOBAL_ACTIONS.ACTIVE_NOTE]: {
    type: GLOBAL_ACTIONS.ACTIVE_NOTE;
    noteId: string | null;
  };
};

export type GlobalAction = GlobalActionsMap[keyof GlobalActionsMap];

export type GlobalDispatch = Dispatch<GlobalAction>;

export function globalReducer(state: GlobalState, action: GlobalAction) {
  switch (action.type) {
    case GLOBAL_ACTIONS.ACTIVE_FOLDER: {
      return { ...state, activeFolderId: action.folderId };
    }
    case GLOBAL_ACTIONS.ACTIVE_NOTE: {
      return { ...state, activeNoteId: action.noteId };
    }
    default: {
      throw Error('Unknown action: ' + (action as BaseAction).type);
    }
  }
}
