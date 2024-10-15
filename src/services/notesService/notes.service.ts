import { apiClient, AxiosErrorCp } from '../../utils/networkCallHandler';
import { BaseNoteIntf, NoteIntf } from '../../domains/Note';
import {
  NOTES_ACTION_TYPES,
  NotesDispatch,
} from '../../store/notes/notes.reducer';

const handleNotesServiceNetworkOperation = async ({
  dispatch,
  operation,
  failCb,
  finallyCb,
}: {
  dispatch: NotesDispatch;
  operation: () => Promise<void>;
  failCb?: (e: unknown) => Promise<void> | void;
  finallyCb?: () => Promise<void> | void;
}) => {
  try {
    dispatch({ type: NOTES_ACTION_TYPES.FETCHING, isFetching: true });
    await operation();
  } catch (e) {
    if (failCb) {
      await failCb(e);
    }
  } finally {
    dispatch({ type: NOTES_ACTION_TYPES.FETCHING, isFetching: false });
    if (finallyCb) {
      await finallyCb();
    }
  }
};

const getErrorMessage = (e: unknown) =>
  e instanceof AxiosErrorCp
    ? e.response?.data || e.message
    : (e as Error).message;

const notesService = {
  getNotesForFolder: async (dispatch: NotesDispatch, folderId: string) => {
    await handleNotesServiceNetworkOperation({
      dispatch,
      operation: async () => {
        const notesList = await notesNetworkHandler.getNotesForFolder(folderId);
        if (notesList) {
          dispatch({ type: NOTES_ACTION_TYPES.FETCHED, notes: notesList });
        }
      },
      failCb: (e: unknown) => {
        console.error(
          `Failed to get notes for folderId ${folderId}: `,
          getErrorMessage(e)
        );
      },
    });
  },
  createNewNote: async (dispatch: NotesDispatch, note: BaseNoteIntf) => {
    await handleNotesServiceNetworkOperation({
      dispatch,
      operation: async () => {
        const createdNote = await notesNetworkHandler.createNote(note);
        if (createdNote) {
          dispatch({ type: NOTES_ACTION_TYPES.ADDED, note: createdNote });
        }
      },
      failCb: (e: unknown) => {
        console.error('Failed to create new note: ', getErrorMessage(e));
      },
    });
  },
  moveNote: async (dispatch: NotesDispatch, note: NoteIntf) => {
    await handleNotesServiceNetworkOperation({
      dispatch,
      operation: async () => {
        const updatedNote = await notesNetworkHandler.updateNote(note);
        if (updatedNote) {
          dispatch({
            type: NOTES_ACTION_TYPES.MOVED,
            note: updatedNote,
          });
        }
      },
      failCb: (e: unknown) => {
        console.error(
          `Failed to move note for id ${note.id} to folderId ${note.folderId}: `,
          getErrorMessage(e)
        );
      },
    });
  },

  saveNote: async (dispatch: NotesDispatch, note: NoteIntf) => {
    await handleNotesServiceNetworkOperation({
      dispatch,
      operation: async () => {
        const updatedNote = await notesNetworkHandler.updateNote(note);
        if (updatedNote) {
          dispatch({
            type: NOTES_ACTION_TYPES.UPDATED,
            note: updatedNote,
          });
        }
      },
      failCb: (e: unknown) => {
        console.error(
          `Failed to update note for id ${note.id}: `,
          getErrorMessage(e)
        );
      },
    });
  },
};

const notesNetworkHandler = {
  createNote: async (note: BaseNoteIntf): Promise<NoteIntf | null> => {
    try {
      const res = await apiClient.post<NoteIntf>('/notes', note);
      return res.data;
    } catch (e) {
      console.error(
        'Failed to create new note in system: ',
        getErrorMessage(e)
      );
    }
    return null;
  },

  updateNote: async (note: NoteIntf): Promise<NoteIntf | null> => {
    try {
      const res = await apiClient.put<NoteIntf>(`/notes/${note.id}`, note);
      return res.data;
    } catch (e) {
      console.error(
        `Failed to update note for id ${note.id} in system:`,
        getErrorMessage(e)
      );
    }
    return null;
  },

  getNotesForFolder: async (folderId: string): Promise<NoteIntf[] | null> => {
    try {
      const res = await apiClient.get<NoteIntf[]>(
        `/notes?folderId=${folderId}`
      );
      return res.data;
    } catch (e) {
      console.error(
        `Failed to get notes list for folderId ${folderId} in system: `,
        getErrorMessage(e)
      );
    }
    return null;
  },
};

export default notesService;
