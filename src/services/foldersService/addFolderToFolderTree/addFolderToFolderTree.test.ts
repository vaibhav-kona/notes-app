import addFolderToFolderTree from './addFolderToFolderTree';
import { FolderIntf } from '../../../domains/Folder';

describe('addFolderToFolderTree', () => {
  const mockFolders: FolderIntf[] = [
    {
      id: '1',
      name: 'Root Folder 1',
      folderId: null,
      createdAt: '2023-01-01T00:00:00Z',
      folders: [
        {
          id: '1-1',
          name: 'Sub Folder 1-1',
          folderId: '1',
          createdAt: '2023-01-01T00:00:00Z',
          folders: [],
        },
      ],
    },
    {
      id: '2',
      name: 'Root Folder 2',
      folderId: null,
      createdAt: '2023-01-01T00:00:00Z',
      folders: [],
    },
  ];

  const newRootFolder: FolderIntf = {
    id: '3',
    name: 'New Root Folder',
    folderId: null,
    createdAt: '2023-01-01T00:00:00Z',
    folders: [],
  };

  const newSubFolder: FolderIntf = {
    id: '1-2',
    name: 'New Sub Folder',
    folderId: '1',
    createdAt: '2023-01-01T00:00:00Z',
    folders: [],
  };

  const nestedSubFolder: FolderIntf = {
    id: '1-1-1',
    name: 'Nested Sub Folder',
    folderId: '1-1',
    createdAt: '2023-01-01T00:00:00Z',
    folders: [],
  };

  test('should add folder at the root level if folderId is null', () => {
    const result = addFolderToFolderTree(newRootFolder, mockFolders);

    expect(result.length).toBe(3);
    expect(result[2]).toEqual(newRootFolder);
  });

  test('should add a new folder to an existing folder by folderId', () => {
    const result = addFolderToFolderTree(newSubFolder, mockFolders);

    expect(result[0].folders.length).toBe(2);
    expect(result[0].folders[1]).toEqual(newSubFolder);
  });

  test('should add a nested folder to a sub-folder', () => {
    const result = addFolderToFolderTree(nestedSubFolder, mockFolders);

    expect(result[0].folders[0].folders.length).toBe(1);
    expect(result[0].folders[0].folders[0]).toEqual(nestedSubFolder);
  });

  test('should return original folder list if folderId is not found', () => {
    const nonExistentParentFolder: FolderIntf = {
      id: '4',
      name: 'Non-Existent Parent Folder',
      folderId: 'non-existent',
      createdAt: '2023-01-01T00:00:00Z',
      folders: [],
    };

    const result = addFolderToFolderTree(nonExistentParentFolder, mockFolders);

    expect(result).toEqual(mockFolders);
  });

  test('should add to an empty folder list', () => {
    const result = addFolderToFolderTree(newRootFolder, []);

    expect(result.length).toBe(1);
    expect(result[0]).toEqual(newRootFolder);
  });
});
