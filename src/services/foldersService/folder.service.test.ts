import foldersService from './folders.service';
import apiClient from '../../utils/networkCallHandler/networkCallHandler';
import { BaseFolderIntf, FolderIntf } from '../../domains/Folder';

jest.mock('../../utils/networkCallHandler/networkCallHandler', () => ({
  post: jest.fn(),
  get: jest.fn(),
}));

describe('foldersService', () => {
  const mockDispatch = jest.fn();

  const mockBaseFolder: BaseFolderIntf = {
    name: 'New Folder',
    folderId: null,
    folders: [],
  };

  const mockCreatedFolder: FolderIntf = {
    ...mockBaseFolder,
    id: '1',
    createdAt: '2023-01-01T00:00:00Z',
  };

  const mockFolders: FolderIntf[] = [
    {
      id: '1',
      name: 'Folder 1',
      folderId: null,
      createdAt: '2023-01-01T00:00:00Z',
      folders: [],
    },
    {
      id: '2',
      name: 'Folder 2',
      folderId: null,
      createdAt: '2023-01-02T00:00:00Z',
      folders: [],
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createNewFolder', () => {
    it('should dispatch "added" action when folder is successfully created', async () => {
      (apiClient.post as jest.Mock).mockResolvedValue({
        data: mockCreatedFolder,
      });

      await foldersService.createNewFolder(mockDispatch, mockBaseFolder);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'added',
        folder: mockCreatedFolder,
      });
    });

    it('should handle API failure and not dispatch any action', async () => {
      (apiClient.post as jest.Mock).mockRejectedValue(new Error('API Error'));

      await foldersService.createNewFolder(mockDispatch, mockBaseFolder);

      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should log an error if folder creation fails', async () => {
      console.error = jest.fn();
      (apiClient.post as jest.Mock).mockRejectedValue(new Error('API Error'));

      await foldersService.createNewFolder(mockDispatch, mockBaseFolder);

      expect(console.error).toHaveBeenCalledWith(
        'Failed to create new folder in system : ',
        expect.any(Error)
      );
    });
  });

  describe('getFolders', () => {
    it('should dispatch "fetched" action when folders are successfully fetched', async () => {
      (apiClient.get as jest.Mock).mockResolvedValue({ data: mockFolders });

      await foldersService.getFolders(mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'fetched',
        folders: mockFolders,
      });
    });

    it('should handle API failure and not dispatch any action', async () => {
      (apiClient.get as jest.Mock).mockRejectedValue(new Error('API Error'));

      await foldersService.getFolders(mockDispatch);

      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should log an error if fetching folders fails', async () => {
      console.error = jest.fn();
      (apiClient.get as jest.Mock).mockRejectedValue(new Error('API Error'));

      await foldersService.getFolders(mockDispatch);

      expect(console.error).toHaveBeenCalledWith(
        'Failed to get folders list from system : ',
        new Error('API Error')
      );
    });
  });
});
