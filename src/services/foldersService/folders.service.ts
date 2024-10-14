import apiClient from '../../utils/networkCallHandler/networkCallHandler';
import { BaseFolderIntf, FolderIntf } from '../../domains/Folder';
import { Dispatch } from 'react';

const foldersService = {
  createNewFolder: async (
    dispatch: Dispatch<any>,
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
      // TODO: Push the folder to folder context
    } catch (error) {
      console.error('Failed to create new folder : ', error);
    }
  },

  getFolders: async (dispatch: Dispatch<any>) => {
    try {
      const foldersList = await folderNetworkHandler.fetchFoldersFromSystem();
      if (foldersList) {
        dispatch({
          type: 'fetched',
          folders: foldersList,
        });
      }
      // TODO: Push the folder to folder context
    } catch (error) {
      console.error('Failed to create new folder : ', error);
    }
  },
};

const folderNetworkHandler = {
  createFolderInSystem: async (
    folder: BaseFolderIntf
  ): Promise<FolderIntf | null> => {
    try {
      const res = await apiClient.post('/folders', folder);
      return res.data;
    } catch (e) {
      console.error('Failed to create new folder : ', e);
      // TODO: Handle the error
    }
    return null;
  },

  fetchFoldersFromSystem: async (): Promise<FolderIntf[] | null> => {
    try {
      const res = await apiClient.get('/folders');
      return res.data;
    } catch (e) {
      console.error('Failed to get folders list : ', e);
      // TODO: Handle the error
    }
    return null;
  },
};

export default foldersService;
