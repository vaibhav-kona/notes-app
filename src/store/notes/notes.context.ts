import { createContext, Dispatch } from 'react';
import { NoteIntf } from '../../domains/Note';

export const NotesContext = createContext<NoteIntf[]>([]);
export const NotesDispatchContext = createContext<Dispatch<any> | null>(null);
