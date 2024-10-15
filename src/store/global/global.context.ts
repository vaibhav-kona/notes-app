import { createContext } from 'react';
import {
  GlobalDispatch,
  globalInitialState,
  GlobalState,
} from './global.reducer';

export const GlobalContext = createContext<GlobalState>(globalInitialState);
export const GlobalDispatchContext = createContext<GlobalDispatch | null>(null);
