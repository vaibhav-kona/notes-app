import apiClient from '../../utils/networkCallHandler/networkCallHandler';
import { NoteIntf } from '../../domains/Note';
import { Dispatch } from 'react';

const notesService = {
  getNotesForFolder: async (dispatch: Dispatch<any>, folderId: string) => {
    dispatch({
      type: 'fetching',
      isFetching: true,
    });
    const notesList = await notesNetworkHandler.getNotesForFolder(folderId);
    if (notesList) {
      dispatch({
        type: 'fetched',
        notes: notesList,
      });
    }
  },
};

const notesNetworkHandler = {
  createNote: async (note: NoteIntf) => {
    try {
      const res = await apiClient.post('/notes', note);
      console.log({ res });
      // TODO: Push the noteEditor to noteEditor context
    } catch (e) {
      console.error('Failed to create new noteEditor : ', e);
      // TODO: Handle the error
    }
  },

  updateNote: async (note: NoteIntf) => {
    try {
      const res = await apiClient.put(`/notes${note.id}`, note);
      console.log({ res });
      // TODO: Push the noteEditor to noteEditor context
    } catch (e) {
      console.error(`Failed to update note for id : ${note.id}`, e);
      // TODO: Handle the error
    }
  },

  deleteNote: async (noteId: number) => {
    try {
      const res = await apiClient.delete(`/notes/${noteId}`);
      console.log({ res });
      // TODO: Push the noteEditor to noteEditor context
    } catch (e) {
      console.error(`Failed to delete note for id ${noteId} : `, e);
      // TODO: Handle the error
    }
  },

  getNotesForFolder: async (folderId: string): Promise<NoteIntf[] | null> => {
    try {
      const res = await apiClient.get(`/notes?folderId=${folderId}`);
      console.log({ res });
      return res.data;
      // TODO: Push the noteEditor to noteEditor context
    } catch (e) {
      console.error(`Failed to get notes list for folderId ${folderId} : `, e);
      // TODO: Handle the error
    }
    return null;
  },
};

export default notesService;
