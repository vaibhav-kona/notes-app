import { useEffect, useReducer } from 'react';
import {
  foldersInitialState,
  foldersReducer,
} from '../../store/folders/folders.reducer';
import { foldersService } from '../../services/foldersService';
import styles from './folders.module.scss';
import Folders from './Folders';
import useCreateNewFolder from './useCreateNewFolder';
import { NewFolderInput } from '../NewFolderInput';

const FoldersWrapper = () => {
  const [folders, dispatch] = useReducer(foldersReducer, foldersInitialState);

  useEffect(() => {
    (async function () {
      await foldersService.getFolders(dispatch);
    })();
  }, []);

  const {
    isAddingNewFolder,
    newFolderName,
    addNewFolder,
    cancelNewFolderCreate,
    saveNewFolder,
    handleNewFolderNameChange,
  } = useCreateNewFolder({ dispatch, folderId: null });

  return (
    <div className={styles.folders}>
      <Folders dispatch={dispatch} folders={folders} />
      <div className={styles.folders__addNewFolder}>
        {!isAddingNewFolder && (
          <button onClick={addNewFolder}> + Add New Folder </button>
        )}
        {isAddingNewFolder && (
          <NewFolderInput
            newFolderName={newFolderName}
            cancelNewFolderCreate={cancelNewFolderCreate}
            saveNewFolder={saveNewFolder}
            handleNewFolderNameChange={handleNewFolderNameChange}
          />
        )}
      </div>
    </div>
  );
};

export default FoldersWrapper;
