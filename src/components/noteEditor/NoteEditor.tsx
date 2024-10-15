import styles from './noteEditor.module.scss';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../store/global/global.context';
import { notesService } from '../../services/notesService';
import { NotesDispatch, NotesState } from '../../store/notes/notes.reducer';

const NoteEditor = ({
  notesState,
  notesDispatch,
}: {
  notesState: NotesState;
  notesDispatch: NotesDispatch;
}) => {
  const globalState = useContext(GlobalContext);
  const activeNote = notesState.notes.find(
    (note) => note.id === globalState.activeNoteId
  );

  const [isEditMode, setEditMode] = useState(false);
  const [title, setTitle] = useState<string>(activeNote?.title || '');
  const [content, setContent] = useState<string>(activeNote?.content || '');

  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote?.title || '');
      setContent(activeNote?.content || '');
      setEditMode(false);
    }
  }, [activeNote]);

  const selectEditMode = () => {
    setEditMode(true);
    setTitle(activeNote?.title || '');
    setContent(activeNote?.content || '');
  };

  const cancelEditMode = () => {
    setEditMode(false);

    setTitle(activeNote?.title || '');
    setContent(activeNote?.content || '');
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const saveNote = async () => {
    if (activeNote) {
      await notesService.saveNote(notesDispatch, {
        ...activeNote,
        title: title || '',
        content: content || '',
      });
      cancelEditMode();
    }
  };

  return (
    <div className={styles.note}>
      {activeNote && (
        <>
          {!isEditMode && (
            <article className={styles.note__readModeContainer}>
              <button onClick={selectEditMode}>Edit</button>
              <h1 className={styles.note__readModeContainer__title}>
                {activeNote?.title}
              </h1>
              <p className={styles.note__readModeContainer__content}>
                {activeNote?.content}
              </p>
            </article>
          )}

          {isEditMode && (
            <article className={styles.note__editModeContainer}>
              <div className={styles.note__editModeContainer__actionsContainer}>
                <button onClick={cancelEditMode}>Cancel</button>
                <button onClick={saveNote}>Save</button>
              </div>
              <div className={styles.note__editModeContainer__formContainer}>
                <input
                  value={title}
                  type="text"
                  onChange={handleTitleChange}
                  aria-label="Note Title"
                />
                <textarea
                  onChange={handleContentChange}
                  value={content}
                  aria-label="Note Content"
                />
              </div>
            </article>
          )}
        </>
      )}
    </div>
  );
};

export default NoteEditor;
