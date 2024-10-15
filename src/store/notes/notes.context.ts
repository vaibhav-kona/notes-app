import { createContext } from 'react';
import { NoteIntf } from '../../domains/Note';
import { NotesDispatch } from './notes.reducer';

export const NotesContext = createContext<NoteIntf[]>([]);
export const NotesDispatchContext = createContext<NotesDispatch | null>(null);
