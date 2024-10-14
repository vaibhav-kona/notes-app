import { FolderIntf } from '../../domains/Folder';
import { getFoldersTree } from '../../services/foldersService/getFoldersTree';
import { addFolderToFolderTree } from '../../services/foldersService/addFolderToFolderTree';

export function foldersReducer(folders: FolderIntf[], action: any) {
  switch (action.type) {
    case 'fetched': {
      return getFoldersTree(action.folders);
    }
    case 'added': {
      console.log({ foldersInReducer: [...folders, action.folder] });
      return addFolderToFolderTree(action.folder, folders);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export const foldersInitialState = [];
