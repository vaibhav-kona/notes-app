import {
  notesReducer,
  notesInitialState,
  NOTES_ACTION_TYPES,
  NotesAction,
  NotesActionMap,
} from './notes.reducer';
import { NoteIntf } from '../../domains/Note';

describe('notesReducer', () => {
  const mockNotes: NoteIntf[] = [
    {
      id: '1',
      title: 'Note 1',
      folderId: 'folder1',
      content: 'This is note 1',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: null,
      deletedAt: null,
    },
    {
      id: '2',
      title: 'Note 2',
      folderId: 'folder1',
      content: 'This is note 2',
      createdAt: '2023-01-02T00:00:00Z',
      updatedAt: null,
      deletedAt: null,
    },
  ];

  const mockNewNote: NoteIntf = {
    id: '3',
    title: 'Note 3',
    folderId: 'folder1',
    content: 'This is note 3',
    createdAt: '2023-01-03T00:00:00Z',
    updatedAt: null,
    deletedAt: null,
  };

  const mockUpdatedNote: NoteIntf = {
    id: '1',
    title: 'Updated Note 1',
    folderId: 'folder1',
    content: 'Updated content',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-05T00:00:00Z',
    deletedAt: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should handle "fetched" action and update notes state', () => {
    const action: NotesActionMap[NOTES_ACTION_TYPES.FETCHED] = {
      type: NOTES_ACTION_TYPES.FETCHED,
      notes: mockNotes,
    };

    const result = notesReducer(notesInitialState, action);

    expect(result).toEqual({
      ...notesInitialState,
      notes: mockNotes,
      isFetching: false,
    });
  });

  test('should handle "added" action and add a new note to the state', () => {
    const action: NotesActionMap[NOTES_ACTION_TYPES.ADDED] = {
      type: NOTES_ACTION_TYPES.ADDED,
      note: mockNewNote,
    };

    const result = notesReducer(notesInitialState, action);

    expect(result.notes).toEqual([...notesInitialState.notes, mockNewNote]);
  });

  test('should handle "updated" action and update the note in the state', () => {
    const action: NotesActionMap[NOTES_ACTION_TYPES.UPDATED] = {
      type: NOTES_ACTION_TYPES.UPDATED,
      note: mockUpdatedNote,
    };

    const result = notesReducer(
      { notes: mockNotes, isFetching: false },
      action
    );

    expect(result.notes).toEqual([mockUpdatedNote, mockNotes[1]]);
  });

  test('should handle "moveNoteOut" action and remove the note from the state', () => {
    const action: NotesActionMap[NOTES_ACTION_TYPES.MOVED] = {
      type: NOTES_ACTION_TYPES.MOVED,
      note: mockNotes[0],
    };

    const result = notesReducer(
      { notes: mockNotes, isFetching: false },
      action
    );

    expect(result.notes).toEqual([mockNotes[1]]); // First note should be removed
  });

  test('should handle "fetching" action and update isFetching status', () => {
    const action: NotesActionMap[NOTES_ACTION_TYPES.FETCHING] = {
      type: NOTES_ACTION_TYPES.FETCHING,
      isFetching: true,
    };

    const result = notesReducer(notesInitialState, action);

    expect(result.isFetching).toEqual(true);
  });

  test('should throw an error for unknown action types', () => {
    const action = {
      type: 'unknownAction',
    };

    expect(() =>
      notesReducer(notesInitialState, action as NotesAction)
    ).toThrowError('Unknown action: unknownAction');
  });
});
