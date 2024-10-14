import { Dispatch, useEffect } from 'react';
import { foldersService } from '../../services/foldersService';
import styles from './folders.module.scss';
import Folders from './Folders';
import useCreateNewFolder from './useCreateNewFolder';
import { NewEntryInput } from '../NewEntryInput';
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

  console.log({ folders });

  return (
    <div className={styles.foldersWrapper}>
      <Folders dispatch={foldersDispatch} folders={folders} />
      <div className={styles.folders__addNewFolder}>
        {!isAddingNewFolder && (
          <button onClick={addNewFolder}> + Add New Folder </button>
        )}
        {isAddingNewFolder && (
          <NewEntryInput
            newEntryName={newFolderName}
            cancelNewEntryCreate={cancelNewFolderCreate}
            saveNewEntry={saveNewFolder}
            handleNewEntryNameChange={handleNewFolderNameChange}
          />
        )}
      </div>
    </div>
  );
};

export default FoldersWrapper;
