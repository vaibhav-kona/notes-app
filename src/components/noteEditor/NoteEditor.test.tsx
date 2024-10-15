import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NoteEditor from './NoteEditor';
import { GlobalContext } from '../../store/global/global.context';
import { notesService } from '../../services/notesService';
import { NotesState, NotesDispatch } from '../../store/notes/notes.reducer';

jest.mock('../../services/notesService', () => ({
  notesService: {
    saveNote: jest.fn(),
  },
}));

describe('NoteEditor Component', () => {
  const notesDispatchMock: NotesDispatch = jest.fn();

  const notesStateMock: NotesState = {
    isFetching: false,
    notes: [
      {
        id: '1',
        title: 'Note 1',
        content: 'Content 1',
        folderId: '1',
        updatedAt: null,
        createdAt: '',
        deletedAt: '',
      },
      {
        id: '2',
        title: 'Note 2',
        content: 'Content 2',
        folderId: '2',
        createdAt: '',
        updatedAt: '',
        deletedAt: null,
      },
    ],
  };

  const globalStateMock = { activeNoteId: '1', activeFolderId: '1' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render nothing if no active note is selected', () => {
    const globalStateMockWithNoActiveNote = {
      activeNoteId: null,
      activeFolderId: null,
    };

    render(
      <GlobalContext.Provider value={globalStateMockWithNoActiveNote}>
        <NoteEditor
          notesState={notesStateMock}
          notesDispatch={notesDispatchMock}
        />
      </GlobalContext.Provider>
    );

    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  it('should render note in read mode when active note is present', () => {
    render(
      <GlobalContext.Provider value={globalStateMock}>
        <NoteEditor
          notesState={notesStateMock}
          notesDispatch={notesDispatchMock}
        />
      </GlobalContext.Provider>
    );

    expect(screen.getByText('Note 1')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();

    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('should switch to edit mode when Edit button is clicked', () => {
    render(
      <GlobalContext.Provider value={globalStateMock}>
        <NoteEditor
          notesState={notesStateMock}
          notesDispatch={notesDispatchMock}
        />
      </GlobalContext.Provider>
    );

    fireEvent.click(screen.getByText('Edit'));

    expect(screen.getByLabelText('Note Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Note Content')).toBeInTheDocument();

    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('should discard changes and switch back to read mode when Cancel button is clicked', () => {
    render(
      <GlobalContext.Provider value={globalStateMock}>
        <NoteEditor
          notesState={notesStateMock}
          notesDispatch={notesDispatchMock}
        />
      </GlobalContext.Provider>
    );

    fireEvent.click(screen.getByText('Edit'));

    fireEvent.change(screen.getByLabelText('Note Title'), {
      target: { value: 'Updated Title' },
    });
    fireEvent.change(screen.getByLabelText('Note Content'), {
      target: { value: 'Updated Content' },
    });

    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.getByText('Note 1')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('should save changes and switch back to read mode when Save button is clicked', async () => {
    (notesService.saveNote as jest.Mock).mockResolvedValueOnce(null);

    render(
      <GlobalContext.Provider value={globalStateMock}>
        <NoteEditor
          notesState={notesStateMock}
          notesDispatch={notesDispatchMock}
        />
      </GlobalContext.Provider>
    );

    screen.debug();

    fireEvent.click(screen.getByText('Edit'));

    fireEvent.change(screen.getByLabelText('Note Title'), {
      target: { value: 'Updated Title' },
    });
    fireEvent.change(screen.getByLabelText('Note Content'), {
      target: { value: 'Updated Content' },
    });

    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(notesService.saveNote).toHaveBeenCalledWith(notesDispatchMock, {
        id: '1',
        title: 'Updated Title',
        content: 'Updated Content',
        folderId: '1',
        createdAt: '',
        deletedAt: '',
        updatedAt: null,
      });
    });

    await waitFor(() => {
      expect(screen.getByText('Edit')).toBeInTheDocument();
    });
  });

  it('should update the editor when activeNote changes', () => {
    const updatedGlobalStateMock = { activeNoteId: '2', activeFolderId: '2' };

    render(
      <GlobalContext.Provider value={updatedGlobalStateMock}>
        <NoteEditor
          notesState={notesStateMock}
          notesDispatch={notesDispatchMock}
        />
      </GlobalContext.Provider>
    );

    expect(screen.getByText('Note 2')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('should set edit mode to false when the active note changes', () => {
    const { rerender } = render(
      <GlobalContext.Provider value={globalStateMock}>
        <NoteEditor
          notesState={notesStateMock}
          notesDispatch={notesDispatchMock}
        />
      </GlobalContext.Provider>
    );

    fireEvent.click(screen.getByText('Edit'));

    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();

    const updatedGlobalStateMock = { activeNoteId: '2', activeFolderId: '2' };
    rerender(
      <GlobalContext.Provider value={updatedGlobalStateMock}>
        <NoteEditor
          notesState={notesStateMock}
          notesDispatch={notesDispatchMock}
        />
      </GlobalContext.Provider>
    );

    expect(screen.queryByText('Save')).not.toBeInTheDocument();
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });
});
