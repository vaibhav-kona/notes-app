import { Dispatch, useEffect } from 'react';
import { foldersService } from '../../services/foldersService';
import styles from './folders.module.scss';
import Folders from './Folders';
import useCreateNewFolder from './useCreateNewFolder';
import { NewFolderInput } from '../NewFolderInput';
import { FolderIntf } from '../../domains/Folder';

const FoldersWrapper = ({
  foldersDispatch,
  folders,
}: {
  foldersDispatch: Dispatch<any>;
  folders: FolderIntf[];
}) => {
  useEffect(() => {
    (async function () {
      await foldersService.getFolders(foldersDispatch);
    })();
  }, [foldersDispatch]);

  const {
    isAddingNewFolder,
    newFolderName,
    addNewFolder,
    cancelNewFolderCreate,
    saveNewFolder,
    handleNewFolderNameChange,
  } = useCreateNewFolder({ dispatch: foldersDispatch, folderId: null });

  return (
    <div className={styles.folders}>
      <Folders dispatch={foldersDispatch} folders={folders} />
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
