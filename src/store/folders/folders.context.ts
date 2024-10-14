import { createContext, Dispatch } from 'react';
import { FolderIntf } from '../../domains/Folder';

export const FoldersContext = createContext<FolderIntf[]>([]);
export const FoldersDispatchContext = createContext<Dispatch<any> | null>(null);
