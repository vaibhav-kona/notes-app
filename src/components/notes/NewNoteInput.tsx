import styles from './notesWrapper.module.scss';
import { NewEntryInput } from '../NewEntryInput';
import useCreateNewNote from '../noteEditor/useCreateNewNote';
import { NotesDispatch } from '../../store/notes/notes.reducer';

const NewNoteInput = ({
  notesDispatch,
  folderId,
}: {
  notesDispatch: NotesDispatch;
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
        <button
          className={styles.notes__addNewNoteBtn}
          onClick={addNewNote}
          aria-label="Add a new note"
        >
          + Add new note
        </button>
      )}
    </>
  );
};

export default NewNoteInput;
