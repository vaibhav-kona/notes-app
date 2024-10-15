import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Note from './Note';
import { notesService } from '../../services/notesService';
import { recycleBinId } from '../../constants/global.constants';
import {
  GLOBAL_ACTIONS,
  GlobalDispatch,
} from '../../store/global/global.reducer';
import { NoteIntf } from '../../domains/Note';
import { FolderIntf } from '../../domains/Folder';
import { NotesDispatch } from '../../store/notes/notes.reducer';
import { GlobalDispatchContext } from '../../store/global/global.context';
import { MoveDialogProps } from '../moveDialog/MoveDialog';

jest.mock('../../services/notesService', () => ({
  notesService: {
    moveNote: jest.fn(),
  },
}));

jest.mock('../moveDialog', () => ({
  MoveDialog: ({
    handleNoteMove,
    cancelNoteMove,
    folders,
    currentFolderId,
    handleFolderSelect,
  }: MoveDialogProps) => (
    <div>
      <h1>Mocked Move Dialog</h1>
      <button onClick={handleNoteMove}>Mocked Move</button>
      <button onClick={cancelNoteMove}>Mocked Cancel</button>
      {folders.map((folder) => (
        <button
          key={folder.id}
          onClick={() => handleFolderSelect(folder.id!!)}
          disabled={folder.id === currentFolderId}
        >
          {folder.name}
        </button>
      ))}
    </div>
  ),
}));

describe('Note Component', () => {
  const notesDispatchMock: NotesDispatch = jest.fn();
  const globalDispatchMock: GlobalDispatch = jest.fn();

  const noteMock: NoteIntf = {
    id: '1',
    title: 'Test Note',
    folderId: '123',
    createdAt: null,
    content: '',
    deletedAt: null,
    updatedAt: null,
  };

  const foldersMock: FolderIntf[] = [
    { id: '1', name: 'Folder 1', folderId: null, folders: [], createdAt: '' },
    { id: '2', name: 'Folder 2', folderId: null, folders: [], createdAt: '' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the note title', () => {
    render(
      <GlobalDispatchContext.Provider value={globalDispatchMock}>
        <Note
          note={noteMock}
          notesDispatch={notesDispatchMock}
          folders={foldersMock}
        />
      </GlobalDispatchContext.Provider>
    );

    expect(screen.getByText('Test Note')).toBeInTheDocument();
  });

  it('should render move and delete buttons when the note is not in the recycle bin', () => {
    render(
      <GlobalDispatchContext.Provider value={globalDispatchMock}>
        <Note
          note={noteMock}
          notesDispatch={notesDispatchMock}
          folders={foldersMock}
        />
      </GlobalDispatchContext.Provider>
    );

    expect(screen.getByTitle('Move note')).toBeInTheDocument();
    expect(screen.getByTitle('Delete note')).toBeInTheDocument();
  });

  it('should render the restore button when the note is in the recycle bin', () => {
    const recycleBinNote = { ...noteMock, folderId: recycleBinId };

    render(
      <GlobalDispatchContext.Provider value={globalDispatchMock}>
        <Note
          note={recycleBinNote}
          notesDispatch={notesDispatchMock}
          folders={foldersMock}
        />
      </GlobalDispatchContext.Provider>
    );

    expect(screen.getByTitle('Restore note')).toBeInTheDocument();
  });

  it('should call globalDispatch with the correct action when the note is clicked', () => {
    render(
      <GlobalDispatchContext.Provider value={globalDispatchMock}>
        <Note
          note={noteMock}
          notesDispatch={notesDispatchMock}
          folders={foldersMock}
        />
      </GlobalDispatchContext.Provider>
    );

    fireEvent.click(screen.getByText('Test Note'));

    expect(globalDispatchMock).toHaveBeenCalledWith({
      type: GLOBAL_ACTIONS.ACTIVE_NOTE,
      noteId: '1',
    });
  });

  it('should not call globalDispatch when the note is in the recycle bin and clicked', () => {
    const recycleBinNote = { ...noteMock, folderId: recycleBinId };

    render(
      <GlobalDispatchContext.Provider value={globalDispatchMock}>
        <Note
          note={recycleBinNote}
          notesDispatch={notesDispatchMock}
          folders={foldersMock}
        />
      </GlobalDispatchContext.Provider>
    );

    fireEvent.click(screen.getByText('Test Note'));

    expect(globalDispatchMock).not.toHaveBeenCalled();
  });

  it('should call notesService.moveNote and open the MoveDialog when Move button is clicked', async () => {
    (notesService.moveNote as jest.Mock).mockResolvedValueOnce(null);

    render(
      <GlobalDispatchContext.Provider value={globalDispatchMock}>
        <Note
          note={noteMock}
          notesDispatch={notesDispatchMock}
          folders={foldersMock}
        />
      </GlobalDispatchContext.Provider>
    );

    fireEvent.click(screen.getByTitle('Move note'));

    fireEvent.click(screen.getByText(foldersMock[0].name));

    fireEvent.click(screen.getByText('Mocked Move'));

    await waitFor(() => {
      expect(notesService.moveNote).toHaveBeenCalledWith(notesDispatchMock, {
        ...noteMock,
        folderId: '1',
      });
    });
  });

  it('should call notesService.moveNote when Delete button is clicked', async () => {
    (notesService.moveNote as jest.Mock).mockResolvedValueOnce(null);

    render(
      <GlobalDispatchContext.Provider value={globalDispatchMock}>
        <Note
          note={noteMock}
          notesDispatch={notesDispatchMock}
          folders={foldersMock}
        />
      </GlobalDispatchContext.Provider>
    );

    fireEvent.click(screen.getByTitle('Delete note'));

    await waitFor(() => {
      expect(notesService.moveNote).toHaveBeenCalledWith(notesDispatchMock, {
        ...noteMock,
        folderId: recycleBinId,
      });
    });
  });

  it('should cancel the note move when cancelNoteMove is called', async () => {
    render(
      <GlobalDispatchContext.Provider value={globalDispatchMock}>
        <Note
          note={noteMock}
          notesDispatch={notesDispatchMock}
          folders={foldersMock}
        />
      </GlobalDispatchContext.Provider>
    );

    fireEvent.click(screen.getByTitle('Move note'));

    fireEvent.click(screen.getByText('Mocked Cancel'));

    expect(screen.queryByText('Restore')).not.toBeInTheDocument();
  });
});
