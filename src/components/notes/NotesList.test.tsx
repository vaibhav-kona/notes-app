import { render, screen } from '@testing-library/react';
import NotesList from './NotesList';
import { NotesDispatch } from '../../store/notes/notes.reducer';
import { FolderIntf } from '../../domains/Folder';
import { NoteIntf } from '../../domains/Note';

jest.mock('./Note', () => () => <div>Mocked Note</div>);

describe('NotesList Component', () => {
  const notesDispatchMock: NotesDispatch = jest.fn();

  const foldersMock: FolderIntf[] = [
    { id: '1', name: 'Folder 1', folderId: null, folders: [], createdAt: '' },
    { id: '2', name: 'Folder 2', folderId: null, folders: [], createdAt: '' },
  ];

  const notesMock: NoteIntf[] = [
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
      folderId: '2',
      content: 'Content 2',
      createdAt: '',
      updatedAt: '',
      deletedAt: '',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the list of notes', () => {
    render(
      <NotesList
        folders={foldersMock}
        notes={notesMock}
        notesDispatch={notesDispatchMock}
      />
    );

    expect(screen.getAllByText('Mocked Note')).toHaveLength(2);
  });

  it('should render nothing when notes array is empty', () => {
    render(
      <NotesList
        folders={foldersMock}
        notes={[]}
        notesDispatch={notesDispatchMock}
      />
    );

    expect(screen.queryByRole('list')).toBeInTheDocument();
    expect(screen.queryByText('Mocked Note')).not.toBeInTheDocument();
  });
});
