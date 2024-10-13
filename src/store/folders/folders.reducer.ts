import { FolderIntf } from '../../domains/Folder';
import { getFoldersTree } from '../../services/foldersService/getFoldersTree';

export function foldersReducer(folders: FolderIntf[], action: any) {
  switch (action.type) {
    case 'fetched': {
      return getFoldersTree(action.folders);
    }
    case 'added': {
      return getFoldersTree([...folders, action.folder]);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export const foldersInitialState = [];
