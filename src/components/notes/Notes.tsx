import styles from './notes.module.scss';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../store/global/global.context';
import { notesService } from '../../services/notesService';
import NotesList from './NotesList';
import NewNoteInput from './NewNoteInput';
import { FolderIntf } from '../../domains/Folder';
import { NotesDispatch, NotesState } from '../../store/notes/notes.reducer';
import { getIsRecycleBin } from '../../utils/getIsRecycleBin';

const Notes = ({
  folders,
  notesState,
  notesDispatch,
}: {
  folders: FolderIntf[];
  notesDispatch: NotesDispatch;
  notesState: NotesState;
}) => {
  const globalState = useContext(GlobalContext);

  useEffect(() => {
    (async function () {
      if (globalState.activeFolderId) {
        await notesService.getNotesForFolder(
          notesDispatch,
          globalState.activeFolderId
        );
      }
    })();
  }, [globalState.activeFolderId, notesDispatch]);

  return (
    <div className={styles.notes}>
      {notesState.notes && (
        <>
          <NotesList
            notesDispatch={notesDispatch}
            notes={notesState.notes}
            folders={folders}
          />
          {!getIsRecycleBin(globalState.activeFolderId) && (
            <NewNoteInput
              notesDispatch={notesDispatch}
              folderId={globalState.activeFolderId}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Notes;
