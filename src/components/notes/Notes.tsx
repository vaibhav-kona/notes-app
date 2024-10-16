import { NoteIntf } from '../../domains/Note';
import Note from './Note';
import styles from './notesWrapper.module.scss';
import { FolderIntf } from '../../domains/Folder';
import { NotesDispatch } from '../../store/notes/notes.reducer';

const Notes = ({
  folders,
  notes,
  notesDispatch,
}: {
  notes: NoteIntf[];
  notesDispatch: NotesDispatch;
  folders: FolderIntf[];
}) => {
  return (
    <>
      <ul className={styles.notes__listContainer}>
        {notes.map((note) => (
          <li className={styles.notes__listContainer__listItem} key={note.id}>
            <Note note={note} notesDispatch={notesDispatch} folders={folders} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Notes;
