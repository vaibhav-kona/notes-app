import styles from '../notes/notes.module.scss';

import { Dispatch } from 'react';
import { NewEntryInput } from '../NewEntryInput';
import useCreateNewNote from '../noteEditor/useCreateNewNote';

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
        <NewEntryInput
          newEntryName={newNoteName}
          cancelNewEntryCreate={cancelNewNoteCreate}
          saveNewEntry={saveNewNote}
          handleNewEntryNameChange={handleNewNoteNameChange}
        />
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
