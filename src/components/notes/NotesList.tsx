import { Dispatch } from 'react';
import { NoteIntf } from '../../domains/Note';
import Note from './Note';
import styles from './notes.module.scss';
import { FolderIntf } from '../../domains/Folder';

const NotesList = ({
  folders,
  notes,
  notesDispatch,
}: {
  notes: NoteIntf[];
  notesDispatch: Dispatch<any>;
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

export default NotesList;
