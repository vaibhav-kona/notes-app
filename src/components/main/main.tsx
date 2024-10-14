import { FoldersWrapper } from '../folders';
import styles from './main.module.scss';
import { Notes } from '../notes';
import { NoteEditor } from '../noteEditor';
import { useReducer } from 'react';
import {
  foldersInitialState,
  foldersReducer,
} from '../../store/folders/folders.reducer';
import {
  notesInitialState,
  notesReducer,
} from '../../store/notes/notes.reducer';

const Main = () => {
  const foldersStateAndDispatch = useReducer(
    foldersReducer,
    foldersInitialState
  );
  const notesStateAndDispatch = useReducer(notesReducer, notesInitialState);
  return (
    <article className={styles.mainContainer}>
      <h1 className={styles.title}>My Notes</h1>
      {/* TODO: Title, header components are needed */}
      <div className={styles.main}>
        <FoldersWrapper
          folders={foldersStateAndDispatch[0]}
          foldersDispatch={foldersStateAndDispatch[1]}
        />
        <Notes
          folders={foldersStateAndDispatch[0]}
          notesDispatch={notesStateAndDispatch[1]}
          notesState={notesStateAndDispatch[0]}
        />
        <NoteEditor
          notesState={notesStateAndDispatch[0]}
          notesDispatch={notesStateAndDispatch[1]}
        />
      </div>
    </article>
  );
};

export default Main;
