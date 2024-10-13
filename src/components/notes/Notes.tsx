import styles from './notes.module.scss';
import { useContext, useEffect, useReducer } from 'react';
import {
  notesInitialState,
  notesReducer,
} from '../../store/notes/notes.reducer';
import { GlobalContext } from '../../store/global/global.context';
import { notesService } from '../../services/notesService';
import NotesList from './NotesList';
import NewNoteInput from '../noteEditor/NewNoteInput';
import { FolderIntf } from '../../domains/Folder';

const Notes = ({ folders }: { folders: FolderIntf[] }) => {
  const [notesState, dispatch] = useReducer(notesReducer, notesInitialState);
  const globalState = useContext(GlobalContext);

  useEffect(() => {
    (async function () {
      if (globalState.activeFolderId) {
        await notesService.getNotesForFolder(
          dispatch,
          globalState.activeFolderId
        );
      }
    })();
  }, [globalState.activeFolderId]);

  console.log({ notesState });

  return (
    <div className={styles.notes}>
      {notesState.isFetching && <span>Loading</span>}
      {notesState.notes && (
        <>
          <NotesList
            notesDispatch={dispatch}
            notes={notesState.notes}
            folders={folders}
          />
          <NewNoteInput
            notesDispatch={dispatch}
            folderId={globalState.activeFolderId}
          />
        </>
      )}
    </div>
  );
};

export default Notes;
