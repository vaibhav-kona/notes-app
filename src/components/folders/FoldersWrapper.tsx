import { useEffect, useMemo } from 'react';
import { foldersService } from '../../services/foldersService';
import styles from './folders.module.scss';
import Folders from './Folders';
import useCreateNewFolder from './useCreateNewFolder';
import { NewEntryInput } from '../NewEntryInput';
import { FolderIntf } from '../../domains/Folder';
import { FoldersDispatch } from '../../store/folders/folders.reducer';
import { Folder } from '../folder';
import { getIsRecycleBin } from '../../utils/getIsRecycleBin';

const FoldersWrapper = ({
  foldersDispatch,
  folders,
}: {
  foldersDispatch: FoldersDispatch;
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

  const recycleBinFolder = useMemo(
    () => folders.find((folder) => getIsRecycleBin(folder.id)),
    [folders]
  );

  return (
    <div className={styles.foldersWrapper}>
      <Folders dispatch={foldersDispatch} folders={folders} />
      <section className={styles.foldersWrapper__recycleBin}>
        {recycleBinFolder && (
          <Folder
            folder={recycleBinFolder}
            dispatch={foldersDispatch}
            level={1}
          />
        )}
      </section>
      <div className={styles.folders__addNewFolder}>
        {!isAddingNewFolder && (
          <button onClick={addNewFolder} aria-label="Add new folder">
            + Add New Folder{' '}
          </button>
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
