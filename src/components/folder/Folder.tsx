import { useCallback, useContext, useState } from 'react';
import { FolderIntf } from '../../domains/Folder';
import { GlobalDispatchContext } from '../../store/global/global.context';
import useCreateNewFolder from '../folders/useCreateNewFolder';
import canAddNestedFolder from './canAddNestedFolder';
import { NewEntryInput } from '../NewEntryInput';
import { Folders } from '../folders';
import FolderName from './FolderName';
import styles from './folder.module.scss';
import { FoldersDispatch } from '../../store/folders/folders.reducer';
import { GLOBAL_ACTIONS } from '../../store/global/global.reducer';

export interface FolderProps {
  folder: FolderIntf;
  dispatch: FoldersDispatch;
  level: number;
}

const Folder = ({
  folder,
  dispatch: folderReducerDispatch,
  level = 1,
}: FolderProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const {
    isAddingNewFolder,
    newFolderName,
    addNewFolder,
    cancelNewFolderCreate,
    saveNewFolder,
    handleNewFolderNameChange,
  } = useCreateNewFolder({
    dispatch: folderReducerDispatch,
    folderId: folder.id,
  });

  const globalDispatch = useContext(GlobalDispatchContext);

  const handleFolderSelect = useCallback(() => {
    if (folder.id && globalDispatch) {
      globalDispatch({
        type: GLOBAL_ACTIONS.ACTIVE_FOLDER,
        folderId: folder.id,
      });
    }
  }, [folder.id, globalDispatch]);

  if (!folder.id) {
    return null;
  }

  return (
    <div key={folder.id}>
      <div className={styles.folderNameWrapper}>
        {canAddNestedFolder({ level, folderId: folder.id }) && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Expand' : 'Collapse'}
            className={styles.folderNameWrapper__stateBtn}
          >
            {isExpanded ? <span>&#9660;</span> : <span>&#9654;</span>}
          </button>
        )}

        <FolderName
          folderId={folder.id}
          folderName={folder.name}
          handleFolderSelect={handleFolderSelect}
        />

        {!isAddingNewFolder &&
          canAddNestedFolder({ level, folderId: folder.id }) && (
            <button
              className={styles.newFolderButton}
              onClick={addNewFolder}
              aria-label="Add new folder"
            >
              +
            </button>
          )}
      </div>

      {isExpanded && (
        <Folders
          dispatch={folderReducerDispatch}
          folders={folder.folders}
          level={level + 1}
        />
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
  );
};

export default Folder;
