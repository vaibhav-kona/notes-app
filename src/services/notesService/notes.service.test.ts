import notesService from './notes.service';
import { apiClient } from '../../utils/networkCallHandler';
import { BaseNoteIntf, NoteIntf } from '../../domains/Note';
import {
  NOTES_ACTION_TYPES,
  NotesDispatch,
} from '../../store/notes/notes.reducer';

jest.mock('../../utils/networkCallHandler', () => ({
  apiClient: {
    post: jest.fn(),
    put: jest.fn(),
    get: jest.fn(),
  },
  AxiosErrorCp: jest.fn(),
}));

describe('notesService', () => {
  const dispatchMock: NotesDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getNotesForFolder', () => {
    const folderId = '123';

    it('should dispatch FETCHED action on success', async () => {
      const mockNotes = [{ id: '1', title: 'Note 1', content: 'Test' }];
      (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockNotes });

      await notesService.getNotesForFolder(dispatchMock, folderId);

      expect(dispatchMock).toHaveBeenCalledWith({
        type: NOTES_ACTION_TYPES.FETCHING,
        isFetching: true,
      });
      expect(apiClient.get).toHaveBeenCalledWith(`/notes?folderId=${folderId}`);
      expect(dispatchMock).toHaveBeenCalledWith({
        type: NOTES_ACTION_TYPES.FETCHED,
        notes: mockNotes,
      });
      expect(dispatchMock).toHaveBeenCalledWith({
        type: NOTES_ACTION_TYPES.FETCHING,
        isFetching: false,
      });
    });

    it('should handle errors and log them', async () => {
      const error = new Error('API error');
      (apiClient.get as jest.Mock).mockRejectedValueOnce(error);

      console.error = jest.fn();

      await notesService.getNotesForFolder(dispatchMock, folderId);

      expect(apiClient.get).toHaveBeenCalledWith(`/notes?folderId=${folderId}`);
      expect(console.error).toHaveBeenCalledWith(
        `Failed to get notes list for folderId ${folderId} in system: `,
        'API error'
      );
      expect(dispatchMock).toHaveBeenCalledWith({
        type: NOTES_ACTION_TYPES.FETCHING,
        isFetching: false,
      });
    });
  });

  describe('createNewNote', () => {
    const newNote: BaseNoteIntf = {
      title: 'New Note',
      content: '',
      folderId: '123',
    };

    it('should dispatch ADDED action on success', async () => {
      const createdNote = { ...newNote, id: '1' };
      (apiClient.post as jest.Mock).mockResolvedValueOnce({
        data: createdNote,
      });

      await notesService.createNewNote(dispatchMock, newNote);

      expect(dispatchMock).toHaveBeenCalledWith({
        type: NOTES_ACTION_TYPES.FETCHING,
        isFetching: true,
      });
      expect(apiClient.post).toHaveBeenCalledWith('/notes', newNote);
      expect(dispatchMock).toHaveBeenCalledWith({
        type: NOTES_ACTION_TYPES.ADDED,
        note: createdNote,
      });
      expect(dispatchMock).toHaveBeenCalledWith({
        type: NOTES_ACTION_TYPES.FETCHING,
        isFetching: false,
      });
    });

    it('should handle errors and log them', async () => {
      const error = new Error('API error');
      (apiClient.post as jest.Mock).mockRejectedValueOnce(error);

      console.error = jest.fn();

      await notesService.createNewNote(dispatchMock, newNote);

      expect(apiClient.post).toHaveBeenCalledWith('/notes', newNote);
      expect(console.error).toHaveBeenCalledWith(
        'Failed to create new note in system: ',
        'API error'
      );
      expect(dispatchMock).toHaveBeenCalledWith({
        type: NOTES_ACTION_TYPES.FETCHING,
        isFetching: false,
      });
    });
  });

  describe('moveNote', () => {
    const note: NoteIntf = {
      id: '1',
      title: 'Note 1',
      content: 'Test',
      folderId: '123',
      deletedAt: null,
      updatedAt: null,
      createdAt: '2023-01-01T00:00:00Z',
    };

    it('should dispatch MOVED action on success', async () => {
      const updatedNote = { ...note, folderId: '456' };
      (apiClient.put as jest.Mock).mockResolvedValueOnce({ data: updatedNote });

      await notesService.moveNote(dispatchMock, note);

      expect(dispatchMock).toHaveBeenCalledWith({
        type: NOTES_ACTION_TYPES.FETCHING,
        isFetching: true,
      });
      expect(apiClient.put).toHaveBeenCalledWith(`/notes/${note.id}`, note);
      expect(dispatchMock).toHaveBeenCalledWith({
        type: NOTES_ACTION_TYPES.MOVED,
        note: updatedNote,
      });
      expect(dispatchMock).toHaveBeenCalledWith({
        type: NOTES_ACTION_TYPES.FETCHING,
        isFetching: false,
      });
    });

    it('should handle errors and log them', async () => {
      const error = new Error('API error');
      (apiClient.put as jest.Mock).mockRejectedValueOnce(error);

      console.error = jest.fn();

      await notesService.moveNote(dispatchMock, note);

      expect(apiClient.put).toHaveBeenCalledWith(`/notes/${note.id}`, note);
      expect(console.error).toHaveBeenCalledWith(
        `Failed to update note for id ${note.id} in system:`,
        'API error'
      );
      expect(dispatchMock).toHaveBeenCalledWith({
        type: NOTES_ACTION_TYPES.FETCHING,
        isFetching: false,
      });
    });
  });

  describe('saveNote', () => {
    const note: NoteIntf = {
      id: '1',
      title: 'Note 1',
      content: 'Test',
      folderId: '123',
      deletedAt: null,
      updatedAt: null,
      createdAt: '2023-01-01T00:00:00Z',
    };

    it('should dispatch UPDATED action on success', async () => {
      const updatedNote = { ...note, content: 'Updated Content' };
      (apiClient.put as jest.Mock).mockResolvedValueOnce({ data: updatedNote });

      await notesService.saveNote(dispatchMock, note);

      expect(dispatchMock).toHaveBeenCalledWith({
        type: NOTES_ACTION_TYPES.FETCHING,
        isFetching: true,
      });
      expect(apiClient.put).toHaveBeenCalledWith(`/notes/${note.id}`, note);
      expect(dispatchMock).toHaveBeenCalledWith({
        type: NOTES_ACTION_TYPES.UPDATED,
        note: updatedNote,
      });
      expect(dispatchMock).toHaveBeenCalledWith({
        type: NOTES_ACTION_TYPES.FETCHING,
        isFetching: false,
      });
    });

    it('should handle errors and log them', async () => {
      const error = new Error('API error');
      (apiClient.put as jest.Mock).mockRejectedValueOnce(error);

      console.error = jest.fn();

      await notesService.saveNote(dispatchMock, note);

      expect(apiClient.put).toHaveBeenCalledWith(`/notes/${note.id}`, note);
      expect(console.error).toHaveBeenCalledWith(
        `Failed to update note for id ${note.id} in system:`,
        'API error'
      );
      expect(dispatchMock).toHaveBeenCalledWith({
        type: NOTES_ACTION_TYPES.FETCHING,
        isFetching: false,
      });
    });
  });
});
