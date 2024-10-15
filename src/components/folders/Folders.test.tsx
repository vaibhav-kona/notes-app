import { render, screen, waitFor } from '@testing-library/react';
import Folders from './Folders';
import { FolderIntf } from '../../domains/Folder';
import { FoldersDispatch } from '../../store/folders/folders.reducer';
import { FolderProps } from '../folder/Folder';
import { act } from 'react';

jest.mock('../folder', () => ({
  Folder: ({ folder, level }: FolderProps) => (
    <div>
      Folder: {folder.name}, Level: {level}
    </div>
  ),
}));

describe('Folders Component', () => {
  const dispatchMock: FoldersDispatch = jest.fn();

  const foldersMock: FolderIntf[] = [
    {
      id: '1',
      name: 'Folder 1',
      folderId: null,
      folders: [],
      createdAt: '2024-04-10T00:00:00.000Z',
    },
    {
      id: '2',
      name: 'Folder 2',
      folderId: null,
      folders: [],
      createdAt: '2024-04-10T00:00:00.000Z',
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the list of folders', async () => {
    act(() => {
      render(<Folders dispatch={dispatchMock} folders={foldersMock} />);
    });

    await waitFor(() => {
      expect(
        screen.getByText('Folder: Folder 1, Level: 1')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Folder: Folder 2, Level: 1')
      ).toBeInTheDocument();
    });
  });

  it('should pass the correct level prop when rendering nested folders', () => {
    const nestedFolderMock: FolderIntf = {
      id: '3',
      name: 'Nested Folder',
      folderId: '1',
      folders: [],
      createdAt: '2024-04-10T00:00:00.000Z',
    };

    const updatedFoldersMock = [...foldersMock, nestedFolderMock];

    render(
      <Folders dispatch={dispatchMock} folders={updatedFoldersMock} level={2} />
    );

    expect(
      screen.getByText('Folder: Nested Folder, Level: 2')
    ).toBeInTheDocument();
  });

  it('should render an empty list when no folders are passed', () => {
    render(<Folders dispatch={dispatchMock} folders={[]} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
