import { createContext, Dispatch } from 'react';
import { globalInitialState, GlobalState } from './global.reducer';

export const GlobalContext = createContext<GlobalState>(globalInitialState);
export const GlobalDispatchContext = createContext<Dispatch<any> | null>(null);
