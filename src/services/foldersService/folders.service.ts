import { apiClient } from '../../utils/networkCallHandler';
import { BaseFolderIntf, FolderIntf } from '../../domains/Folder';
import { FoldersDispatch } from '../../store/folders/folders.reducer';

const foldersService = {
  createNewFolder: async (
    dispatch: FoldersDispatch,
    { name, folderId }: BaseFolderIntf
  ) => {
    try {
      const createdFolder = await folderNetworkHandler.createFolderInSystem({
        name: name,
        folderId: folderId,
        folders: [],
      });
      if (createdFolder?.id) {
        dispatch({
          type: 'added',
          folder: createdFolder,
        });
      }
    } catch (e) {
      console.error('Failed to create new folder : ', e);
    }
  },

  getFolders: async (dispatch: FoldersDispatch) => {
    try {
      const foldersList = await folderNetworkHandler.fetchFoldersFromSystem();
      if (foldersList) {
        dispatch({
          type: 'fetched',
          folders: foldersList,
        });
      }
    } catch (e) {
      console.error('Failed to get folders : ', e);
    }
  },
};

const folderNetworkHandler = {
  createFolderInSystem: async (
    folder: BaseFolderIntf
  ): Promise<FolderIntf | null> => {
    try {
      const res = await apiClient.post<FolderIntf>('/folders', folder);
      return res.data;
    } catch (e) {
      console.error('Failed to create new folder in system : ', e);
    }
    return null;
  },

  fetchFoldersFromSystem: async (): Promise<FolderIntf[] | null> => {
    try {
      const res = await apiClient.get<FolderIntf[]>('/folders');
      return res.data;
    } catch (e) {
      console.error('Failed to get folders list from system : ', e);
    }
    return null;
  },
};

export default foldersService;
