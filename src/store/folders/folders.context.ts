import { createContext } from 'react';
import { FolderIntf } from '../../domains/Folder';
import { FoldersDispatch } from './folders.reducer';

export const FoldersContext = createContext<FolderIntf[]>([]);
export const FoldersDispatchContext = createContext<FoldersDispatch | null>(
  null
);
