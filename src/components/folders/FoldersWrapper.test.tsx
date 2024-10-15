import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FoldersWrapper from './FoldersWrapper';
import { foldersService } from '../../services/foldersService';
import useCreateNewFolder from './useCreateNewFolder';
import Folders from './Folders';
import { FolderIntf } from '../../domains/Folder';
import { NewFolderInputProps } from '../NewEntryInput/NewEntryInput';
import { act } from 'react';

jest.mock('../../services/foldersService', () => ({
  foldersService: {
    getFolders: jest.fn(),
  },
}));
jest.mock('./useCreateNewFolder');
jest.mock('./Folders', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Folders</div>),
}));

jest.mock('../NewEntryInput', () => ({
  NewEntryInput: ({
    newEntryName,
    cancelNewEntryCreate,
    saveNewEntry,
    handleNewEntryNameChange,
  }: NewFolderInputProps) => (
    <div>
      <input
        value={newEntryName}
        onChange={handleNewEntryNameChange}
        placeholder="New folder name"
      />
      <button onClick={saveNewEntry}>Save</button>
      <button onClick={cancelNewEntryCreate}>Cancel</button>
    </div>
  ),
}));

describe('FoldersWrapper', () => {
  const dispatchMock = jest.fn();
  const foldersMock: FolderIntf[] = [
    {
      id: '1',
      name: 'Test Folder',
      folderId: null,
      folders: [],
      createdAt: '2024-04-10T00:00:00.000Z',
    },
  ];

  beforeEach(() => {
    dispatchMock.mockClear();
    (foldersService.getFolders as jest.Mock).mockClear();
    (useCreateNewFolder as jest.Mock).mockReturnValue({
      isAddingNewFolder: false,
      newFolderName: '',
      addNewFolder: jest.fn(),
      cancelNewFolderCreate: jest.fn(),
      saveNewFolder: jest.fn(),
      handleNewFolderNameChange: jest.fn(),
    });
  });

  it('should render Folders and "Add New Folder" button initially', () => {
    render(
      <FoldersWrapper foldersDispatch={dispatchMock} folders={foldersMock} />
    );

    expect(Folders).toHaveBeenCalledWith(
      expect.objectContaining({ dispatch: dispatchMock, folders: foldersMock }),
      expect.anything()
    );

    expect(screen.getByText('+ Add New Folder')).toBeInTheDocument();

    expect(
      screen.queryByPlaceholderText('New folder name')
    ).not.toBeInTheDocument();
  });

  it('should call foldersService.getFolders on mount', async () => {
    render(<FoldersWrapper foldersDispatch={dispatchMock} folders={[]} />);

    await waitFor(() => {
      expect(foldersService.getFolders).toHaveBeenCalledWith(dispatchMock);
    });
  });

  it('should show NewEntryInput when "Add New Folder" is clicked', () => {
    const addNewFolderMock = jest.fn();

    (useCreateNewFolder as jest.Mock).mockReturnValue({
      isAddingNewFolder: false,
      newFolderName: '',
      addNewFolder: addNewFolderMock,
      cancelNewFolderCreate: jest.fn(),
      saveNewFolder: jest.fn(),
      handleNewFolderNameChange: jest.fn(),
    });

    render(
      <FoldersWrapper foldersDispatch={dispatchMock} folders={foldersMock} />
    );

    const addButton = screen.getByText('+ Add New Folder');

    fireEvent.click(addButton);

    expect(addNewFolderMock).toHaveBeenCalled();
  });

  it('should render NewEntryInput when isAddingNewFolder is true', async () => {
    (useCreateNewFolder as jest.Mock).mockReturnValue({
      isAddingNewFolder: true,
      newFolderName: 'Test Folder',
      addNewFolder: jest.fn(),
      cancelNewFolderCreate: jest.fn(),
      saveNewFolder: jest.fn(),
      handleNewFolderNameChange: jest.fn(),
    });

    act(() => {
      render(
        <FoldersWrapper foldersDispatch={dispatchMock} folders={foldersMock} />
      );
    });

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('New folder name')
      ).toBeInTheDocument();
    });
  });

  it('should call saveNewFolder when "Save" is clicked in NewEntryInput', () => {
    const saveNewFolderMock = jest.fn();

    (useCreateNewFolder as jest.Mock).mockReturnValue({
      isAddingNewFolder: true,
      newFolderName: 'Test Folder',
      addNewFolder: jest.fn(),
      cancelNewFolderCreate: jest.fn(),
      saveNewFolder: saveNewFolderMock,
      handleNewFolderNameChange: jest.fn(),
    });

    render(
      <FoldersWrapper foldersDispatch={dispatchMock} folders={foldersMock} />
    );

    fireEvent.click(screen.getByText('Save'));

    expect(saveNewFolderMock).toHaveBeenCalled();
  });

  it('should call cancelNewFolderCreate when "Cancel" is clicked in NewEntryInput', () => {
    const cancelNewFolderCreateMock = jest.fn();

    (useCreateNewFolder as jest.Mock).mockReturnValue({
      isAddingNewFolder: true,
      newFolderName: 'Test Folder',
      addNewFolder: jest.fn(),
      cancelNewFolderCreate: cancelNewFolderCreateMock,
      saveNewFolder: jest.fn(),
      handleNewFolderNameChange: jest.fn(),
    });

    render(
      <FoldersWrapper foldersDispatch={dispatchMock} folders={foldersMock} />
    );

    fireEvent.click(screen.getByText('Cancel'));

    expect(cancelNewFolderCreateMock).toHaveBeenCalled();
  });
});
