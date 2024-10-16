import { render, screen, waitFor } from '@testing-library/react';
import NotesWrapper from './NotesWrapper';
import { GlobalContext } from '../../store/global/global.context';
import { notesService } from '../../services/notesService';

import { NotesDispatch, NotesState } from '../../store/notes/notes.reducer';
import { FolderIntf } from '../../domains/Folder';

jest.mock('../../services/notesService', () => ({
  notesService: {
    getNotesForFolder: jest.fn(),
  },
}));
jest.mock('./Notes', () => () => <div>Mocked NotesList</div>);
jest.mock('./NewNoteInput', () => () => <div>Mocked NewNoteInput</div>);

describe('NotesWrapper Component', () => {
  const notesDispatchMock: NotesDispatch = jest.fn();

  const foldersMock: FolderIntf[] = [
    { id: '1', name: 'Folder 1', folderId: null, folders: [], createdAt: '' },
    { id: '2', name: 'Folder 2', folderId: null, folders: [], createdAt: '' },
  ];

  const notesStateMock: NotesState = {
    isFetching: false,
    notes: [
      {
        id: '1',
        title: 'Note 1',
        folderId: '1',
        content: 'Content 1',
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      },
      {
        id: '2',
        title: 'Note 2',
        folderId: '1',
        content: 'Content 2',
        createdAt: '',
        updatedAt: '',
        deletedAt: '',
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render Notes and NewNoteInput when notes are available', () => {
    const globalStateMock = { activeFolderId: '1', activeNoteId: null };

    render(
      <GlobalContext.Provider value={globalStateMock}>
        <NotesWrapper
          folders={foldersMock}
          notesState={notesStateMock}
          notesDispatch={notesDispatchMock}
        />
      </GlobalContext.Provider>
    );

    expect(screen.getByText('Mocked NotesList')).toBeInTheDocument();
    expect(screen.getByText('Mocked NewNoteInput')).toBeInTheDocument();
  });

  it('should call getNotesForFolder when activeFolderId is present', async () => {
    const globalStateMock = { activeFolderId: '1', activeNoteId: null };

    (notesService.getNotesForFolder as jest.Mock).mockResolvedValueOnce(null);

    render(
      <GlobalContext.Provider value={globalStateMock}>
        <NotesWrapper
          folders={foldersMock}
          notesState={notesStateMock}
          notesDispatch={notesDispatchMock}
        />
      </GlobalContext.Provider>
    );

    await waitFor(() => {
      expect(notesService.getNotesForFolder).toHaveBeenCalledWith(
        notesDispatchMock,
        '1'
      );
    });
  });

  it('should not call getNotesForFolder when activeFolderId is null', () => {
    const globalStateMock = { activeFolderId: null, activeNoteId: '' };

    render(
      <GlobalContext.Provider value={globalStateMock}>
        <NotesWrapper
          folders={foldersMock}
          notesState={notesStateMock}
          notesDispatch={notesDispatchMock}
        />
      </GlobalContext.Provider>
    );

    expect(notesService.getNotesForFolder).not.toHaveBeenCalled();
  });
});
