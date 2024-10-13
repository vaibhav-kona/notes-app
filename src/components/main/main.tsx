import { FoldersWrapper } from '../folders';
import styles from './main.module.scss';
import { Notes } from '../notes';
import { NoteEditor } from '../noteEditor';
import { useReducer } from 'react';
import {
  foldersInitialState,
  foldersReducer,
} from '../../store/folders/folders.reducer';

const Main = () => {
  const [folders, dispatch] = useReducer(foldersReducer, foldersInitialState);
  return (
    <article>
      <h1>My Notes</h1>
      {/* TODO: Title, header components are needed */}
      <div className={styles.main}>
        <FoldersWrapper folders={folders} foldersDispatch={dispatch} />
        <Notes folders={folders} />
        <NoteEditor />
      </div>
    </article>
  );
};

export default Main;
