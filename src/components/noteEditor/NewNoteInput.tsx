import styles from '../notes/notes.module.scss';
import useCreateNewNote from './useCreateNewNote';
import { Dispatch } from 'react';

const NewNoteInput = ({
  notesDispatch,
  folderId,
}: {
  notesDispatch: Dispatch<any>;
  folderId: string | null;
}) => {
  const {
    isAddingNewNote,
    newNoteName,
    addNewNote,
    cancelNewNoteCreate,
    saveNewNote,
    handleNewNoteNameChange,
  } = useCreateNewNote({
    dispatch: notesDispatch,
    folderId: folderId,
  });

  return (
    <>
      {isAddingNewNote && (
        <>
          <input
            onChange={handleNewNoteNameChange}
            value={newNoteName}
            type="type"
            placeholder="Enter folder name"
            required
          />
          <button onClick={cancelNewNoteCreate}>Cancel</button>
          <button onClick={saveNewNote}>Save</button>
        </>
      )}
      {!isAddingNewNote && folderId && (
        <button className={styles.notes__addNewNoteBtn} onClick={addNewNote}>
          + Add new note
        </button>
      )}
    </>
  );
};

export default NewNoteInput;
