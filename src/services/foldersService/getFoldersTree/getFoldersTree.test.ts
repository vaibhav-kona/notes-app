import getFoldersTree from './getFoldersTree';
import { FolderIntf } from '../../../domains/Folder';

describe('getFoldersTree', () => {
  it('should return null if the root folder does not exist', () => {
    const folders: FolderIntf[] = [
      {
        id: '2',
        name: 'Subfolder 1',
        folderId: '1',
        createdAt: '2024-10-13',
        folders: [],
      },
      {
        id: '3',
        name: 'Subfolder 2',
        folderId: '2',
        createdAt: '2024-10-13',
        folders: [],
      },
    ];
    const result = getFoldersTree(folders);
    expect(result).toEqual([]);
  });

  it('should return the root folder with no subfolders', () => {
    const folders: FolderIntf[] = [
      {
        id: '1',
        name: 'Root',
        folderId: null,
        createdAt: '2024-10-13',
        folders: [],
      },
    ];
    const result = getFoldersTree(folders);
    expect(result).toEqual([
      {
        id: '1',
        name: 'Root',
        folderId: null,
        createdAt: '2024-10-13',
        folders: [],
      },
    ]);
  });

  it('should build a correct tree structure for root folder with subfolders', () => {
    const folders: FolderIntf[] = [
      {
        id: '1',
        name: 'Root',
        folderId: null,
        createdAt: '2024-10-13',
        folders: [],
      },
      {
        id: '2',
        name: 'Subfolder 1',
        folderId: '1',
        createdAt: '2024-10-13',
        folders: [],
      },
      {
        id: '3',
        name: 'Subfolder 2',
        folderId: '1',
        createdAt: '2024-10-13',
        folders: [],
      },
    ];
    const result = getFoldersTree(folders);
    expect(result).toEqual([
      {
        id: '1',
        name: 'Root',
        folderId: null,
        createdAt: '2024-10-13',
        folders: [
          {
            id: '2',
            name: 'Subfolder 1',
            folderId: '1',
            createdAt: '2024-10-13',
            folders: [],
          },
          {
            id: '3',
            name: 'Subfolder 2',
            folderId: '1',
            createdAt: '2024-10-13',
            folders: [],
          },
        ],
      },
    ]);
  });

  it('should build a correct tree structure with subfolders', () => {
    const folders: FolderIntf[] = [
      {
        id: '1',
        name: 'Root',
        folderId: null,
        createdAt: '2024-10-13',
        folders: [],
      },
      {
        id: '2',
        name: 'Subfolder 1',
        folderId: '1',
        createdAt: '2024-10-13',
        folders: [],
      },
      {
        id: '3',
        name: 'Subfolder 2',
        folderId: null,
        createdAt: '2024-10-13',
        folders: [],
      },
    ];
    const result = getFoldersTree(folders);
    expect(result).toEqual([
      {
        id: '1',
        name: 'Root',
        folderId: null,
        createdAt: '2024-10-13',
        folders: [
          {
            id: '2',
            name: 'Subfolder 1',
            folderId: '1',
            createdAt: '2024-10-13',
            folders: [],
          },
        ],
      },
      {
        id: '3',
        name: 'Subfolder 2',
        folderId: null,
        createdAt: '2024-10-13',
        folders: [],
      },
    ]);
  });

  it('should handle nested subfolders', () => {
    const folders: FolderIntf[] = [
      {
        id: '1',
        name: 'Root',
        folderId: null,
        createdAt: '2024-10-13',
        folders: [],
      },
      {
        id: '2',
        name: 'Subfolder 1',
        folderId: '1',
        createdAt: '2024-10-13',
        folders: [],
      },
      {
        id: '3',
        name: 'Subfolder 2',
        folderId: '2',
        createdAt: '2024-10-13',
        folders: [],
      },
      {
        id: '4',
        name: 'Subfolder 3',
        folderId: '3',
        createdAt: '2024-10-13',
        folders: [],
      },
    ];
    const result = getFoldersTree(folders);
    expect(result).toEqual([
      {
        id: '1',
        name: 'Root',
        folderId: null,
        createdAt: '2024-10-13',
        folders: [
          {
            id: '2',
            name: 'Subfolder 1',
            folderId: '1',
            createdAt: '2024-10-13',
            folders: [
              {
                id: '3',
                name: 'Subfolder 2',
                folderId: '2',
                createdAt: '2024-10-13',
                folders: [
                  {
                    id: '4',
                    name: 'Subfolder 3',
                    folderId: '3',
                    createdAt: '2024-10-13',
                    folders: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ]);
  });

  it('should return null for an empty folder list', () => {
    const folders: FolderIntf[] = [];
    const result = getFoldersTree(folders);
    expect(result).toEqual([]);
  });
});
