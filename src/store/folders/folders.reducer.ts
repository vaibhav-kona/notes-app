import { FolderIntf } from '../../domains/Folder';
import { getFoldersTree } from '../../services/foldersService/getFoldersTree';
import { addFolderToFolderTree } from '../../services/foldersService/addFolderToFolderTree';
import { Dispatch } from 'react';
import { BaseAction } from '../reducer.domain';

interface FetchedFoldersAction {
  type: 'fetched';
  folders: FolderIntf[];
}

interface AddedFolderAction {
  type: 'added';
  folder: FolderIntf;
}

type FoldersAction = BaseAction | FetchedFoldersAction | AddedFolderAction;

export type FoldersDispatch = Dispatch<FoldersAction>;

export function foldersReducer(folders: FolderIntf[], action: FoldersAction) {
  switch (action.type) {
    case 'fetched': {
      const fetchedFoldersAction = action as FetchedFoldersAction;
      return getFoldersTree(fetchedFoldersAction.folders);
    }
    case 'added': {
      const addedFoldersAction = action as AddedFolderAction;
      return addFolderToFolderTree(addedFoldersAction.folder, folders);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export const foldersInitialState = [];
