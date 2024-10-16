import './App.css';
import Main from './components/main/main';
import {
  GlobalContext,
  GlobalDispatchContext,
} from './store/global/global.context';
import { useReducer } from 'react';
import {
  globalInitialState,
  globalReducer,
} from './store/global/global.reducer';

function App() {
  const [globalState, dispatch] = useReducer(globalReducer, globalInitialState);
  return (
    <div className="App">
      <GlobalContext.Provider value={globalState}>
        <GlobalDispatchContext.Provider value={dispatch}>
          <Main />
        </GlobalDispatchContext.Provider>
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
