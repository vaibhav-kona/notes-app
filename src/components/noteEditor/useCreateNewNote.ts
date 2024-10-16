import { ChangeEvent, useState } from 'react';
import { notesService } from '../../services/notesService';
import { NotesDispatch } from '../../store/notes/notes.reducer';

const useCreateNewNote = ({
  dispatch,
  folderId,
}: {
  dispatch: NotesDispatch;
  folderId: string | null;
}) => {
  const [isAddingNewNote, setIsAddingNewNote] = useState(false);
  const [newNoteName, setNewNoteName] = useState('');

  const addNewNote = () => {
    setIsAddingNewNote(true);
  };
  const handleNewNoteNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNoteName(e.target.value);
  };
  const cancelNewNoteCreate = () => {
    setIsAddingNewNote(false);
    setNewNoteName('');
  };
  const saveNewNote = async () => {
    if (folderId) {
      await notesService.createNewNote(dispatch, {
        title: newNoteName,
        content: '',
        folderId: folderId,
      });
      cancelNewNoteCreate();
    }
  };

  return {
    isAddingNewNote,
    newNoteName,
    addNewNote,
    cancelNewNoteCreate,
    saveNewNote,
    handleNewNoteNameChange,
  };
};

export default useCreateNewNote;
