import { foldersReducer, foldersInitialState } from './folders.reducer';
import { getFoldersTree } from '../../services/foldersService/getFoldersTree';
import { addFolderToFolderTree } from '../../services/foldersService/addFolderToFolderTree';
import { FolderIntf } from '../../domains/Folder';

jest.mock('../../services/foldersService/getFoldersTree');
jest.mock('../../services/foldersService/addFolderToFolderTree');

describe('foldersReducer', () => {
  const mockFolders: FolderIntf[] = [
    {
      id: 'folder1',
      folderId: null,
      name: 'Folder 1',
      createdAt: '2023-01-01T00:00:00Z',
      folders: [],
    },
    {
      id: 'folder2',
      folderId: null,
      name: 'Folder 2',
      createdAt: '2023-01-02T00:00:00Z',
      folders: [],
    },
  ];

  const mockNewFolder: FolderIntf = {
    id: 'folder3',
    folderId: 'folder1',
    name: 'Folder 3',
    createdAt: '2023-01-03T00:00:00Z',
    folders: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should handle "fetched" action and call getFoldersTree', () => {
    (getFoldersTree as jest.Mock).mockReturnValue(mockFolders);

    const action = {
      type: 'fetched',
      folders: mockFolders,
    };

    const result = foldersReducer(foldersInitialState, action);

    expect(getFoldersTree).toHaveBeenCalledWith(mockFolders);
    expect(result).toEqual(mockFolders);
  });

  test('should handle "added" action and call addFolderToFolderTree', () => {
    (addFolderToFolderTree as jest.Mock).mockReturnValue([
      ...mockFolders,
      mockNewFolder,
    ]);

    const action = {
      type: 'added',
      folder: mockNewFolder,
    };

    const result = foldersReducer(mockFolders, action);

    expect(addFolderToFolderTree).toHaveBeenCalledWith(
      mockNewFolder,
      mockFolders
    );
    expect(result).toEqual([...mockFolders, mockNewFolder]);
  });

  test('should throw an error for unknown action types', () => {
    const action = {
      type: 'unknown',
    };

    expect(() => foldersReducer(mockFolders, action)).toThrowError(
      'Unknown action: unknown'
    );
  });
});
