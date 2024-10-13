import styles from './notes.module.scss';
import { useReducer } from 'react';
import {
  NotesInitialState,
  notesInitialState,
  notesReducer,
} from '../../store/notes/notes.reducer';

const Notes = () => {
  const [notesState] = useReducer<any>(notesReducer, notesInitialState);

  return (
    <div className={styles.notes}>
      {(notesState as NotesInitialState).isFetching && <span>Loading</span>}
      {(notesState as NotesInitialState).notes && (
        <ul>
          {(notesState as NotesInitialState).notes.map((note, i) => (
            <li>{note.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notes;
