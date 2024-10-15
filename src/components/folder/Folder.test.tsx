import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Folder from './Folder';
import { GlobalDispatchContext } from '../../store/global/global.context';
import { FolderIntf } from '../../domains/Folder';
import useCreateNewFolder from '../folders/useCreateNewFolder';
import canAddNestedFolder from './canAddNestedFolder';
import { Folders } from '../folders';
import { act } from 'react';
import { FolderNameProps } from './FolderName';

jest.mock('../folders/useCreateNewFolder', () => jest.fn());
jest.mock('./canAddNestedFolder', () => jest.fn());
jest.mock('../folders', () => ({
  Folders: jest.fn(() => null),
}));
jest.mock('./FolderName', () => ({ handleFolderSelect }: FolderNameProps) => (
  <div onClick={handleFolderSelect}>Mocked FolderName</div>
));
jest.mock('../NewEntryInput', () => ({
  NewEntryInput: () => <div>Mocked NewEntryInput</div>,
}));

describe('Folder component', () => {
  const mockFolderReducerDispatch = jest.fn();
  const mockGlobalDispatch = jest.fn();
  const mockFolder: FolderIntf = {
    id: 'folder-1',
    name: 'Test Folder',
    folders: [],
    folderId: null,
    createdAt: '2024-04-10T00:00:00.000Z',
  };

  const useCreateNewFolderMock = useCreateNewFolder as jest.Mock;
  const canAddNestedFolderMock = canAddNestedFolder as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    useCreateNewFolderMock.mockReturnValue({
      isAddingNewFolder: false,
      newFolderName: '',
      addNewFolder: jest.fn(),
      cancelNewFolderCreate: jest.fn(),
      saveNewFolder: jest.fn(),
      handleNewFolderNameChange: jest.fn(),
    });
  });

  test('renders the folder name and expand button when nested folders can be added', () => {
    canAddNestedFolderMock.mockReturnValue(true);

    render(
      <GlobalDispatchContext.Provider value={mockGlobalDispatch}>
        <Folder
          folder={mockFolder}
          dispatch={mockFolderReducerDispatch}
          level={1}
        />
      </GlobalDispatchContext.Provider>
    );

    expect(screen.getByText('Mocked FolderName')).toBeInTheDocument();

    const expandButton = screen.getByLabelText('Expand');
    expect(expandButton).toBeInTheDocument();
  });

  test('expands and collapses the folder when expand button is clicked', () => {
    canAddNestedFolderMock.mockReturnValue(true);

    render(
      <GlobalDispatchContext.Provider value={mockGlobalDispatch}>
        <Folder
          folder={mockFolder}
          dispatch={mockFolderReducerDispatch}
          level={1}
        />
      </GlobalDispatchContext.Provider>
    );

    const expandButton = screen.getByLabelText('Expand');

    expect(screen.queryByText('Mocked Folders')).not.toBeInTheDocument();

    fireEvent.click(expandButton);
    const collapseButton = screen.getByLabelText('Collapse');
    expect(collapseButton).toBeInTheDocument();

    fireEvent.click(collapseButton);
    expect(screen.getByLabelText('Expand')).toBeInTheDocument();
  });

  test('calls addNewFolder when the add folder button is clicked', () => {
    const addNewFolderMock = jest.fn();
    useCreateNewFolderMock.mockReturnValueOnce({
      isAddingNewFolder: false,
      newFolderName: '',
      addNewFolder: addNewFolderMock,
      cancelNewFolderCreate: jest.fn(),
      saveNewFolder: jest.fn(),
      handleNewFolderNameChange: jest.fn(),
    });

    canAddNestedFolderMock.mockReturnValue(true);

    render(
      <GlobalDispatchContext.Provider value={mockGlobalDispatch}>
        <Folder
          folder={mockFolder}
          dispatch={mockFolderReducerDispatch}
          level={1}
        />
      </GlobalDispatchContext.Provider>
    );

    const addButton = screen.getByLabelText('Add new folder');
    fireEvent.click(addButton);

    expect(addNewFolderMock).toHaveBeenCalledTimes(1);
  });

  test('renders NewEntryInput when adding a new folder', async () => {
    useCreateNewFolderMock.mockReturnValueOnce({
      isAddingNewFolder: true,
      newFolderName: 'New Folder',
      addNewFolder: jest.fn(),
      cancelNewFolderCreate: jest.fn(),
      saveNewFolder: jest.fn(),
      handleNewFolderNameChange: jest.fn(),
    });

    act(() => {
      render(
        <GlobalDispatchContext.Provider value={mockGlobalDispatch}>
          <Folder
            folder={mockFolder}
            dispatch={mockFolderReducerDispatch}
            level={1}
          />
        </GlobalDispatchContext.Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Mocked NewEntryInput')).toBeInTheDocument();
    });
  });

  test('calls globalDispatch when folder is selected', () => {
    render(
      <GlobalDispatchContext.Provider value={mockGlobalDispatch}>
        <Folder
          folder={mockFolder}
          dispatch={mockFolderReducerDispatch}
          level={1}
        />
      </GlobalDispatchContext.Provider>
    );

    fireEvent.click(screen.getByText('Mocked FolderName'));

    expect(mockGlobalDispatch).toHaveBeenCalledWith({
      type: 'activeFolder',
      folderId: 'folder-1',
    });
  });

  test('does not render anything if folder id is missing', () => {
    const mockFolderWithoutId = { ...mockFolder, id: null };

    const { container } = render(
      <GlobalDispatchContext.Provider value={mockGlobalDispatch}>
        <Folder
          folder={mockFolderWithoutId}
          dispatch={mockFolderReducerDispatch}
          level={1}
        />
      </GlobalDispatchContext.Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  test('renders nested folders with correct level increment', () => {
    const nestedFoldersMock: FolderIntf[] = [
      {
        id: 'folder-2',
        name: 'Nested Folder',
        folders: [],
        folderId: null,
        createdAt: '2024-04-10T00:00:00.000Z',
      },
    ];
    const mockFolderWithNested = { ...mockFolder, folders: nestedFoldersMock };

    render(
      <GlobalDispatchContext.Provider value={mockGlobalDispatch}>
        <Folder
          folder={mockFolderWithNested}
          dispatch={mockFolderReducerDispatch}
          level={1}
        />
      </GlobalDispatchContext.Provider>
    );

    expect(Folders).toHaveBeenCalledWith(
      expect.objectContaining({
        folders: nestedFoldersMock,
        level: 2,
        dispatch: mockFolderReducerDispatch,
      }),
      {}
    );
  });
});
