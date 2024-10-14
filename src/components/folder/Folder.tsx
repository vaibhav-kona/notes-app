import { Dispatch, useCallback, useContext } from 'react';
import { FolderIntf } from '../../domains/Folder';
import { Folders } from '../folders';
import { NewEntryInput } from '../NewEntryInput';
import styles from './folder.module.scss';
import useCreateNewFolder from '../folders/useCreateNewFolder';
import { GlobalDispatchContext } from '../../store/global/global.context';
import canAddNestedFolder from './canAddNestedFolder';
import { ReactComponent as FolderInlineSvg } from './folder.inline.svg';
import { ReactComponent as RecycleBinInlineSvg } from './recycleBin.inline.svg';
import { getIsRecycleBin } from '../../utils/getIsRecycleBin';

const Folder = ({
  folder,
  dispatch: folderReducerDispatch,
  level = 1,
}: {
  folder: FolderIntf;
  dispatch: Dispatch<any>;
  level: number;
}) => {
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

  const handelFolderSelect = useCallback(() => {
    (async function () {
      if (folder.id && globalDispatch) {
        globalDispatch({
          type: 'activeFolder',
          folderId: folder.id,
        });
      }
    })();
  }, [folder.id, globalDispatch]);

  return (
    <div key={folder.id}>
      <div className={styles.folderNameWrapper}>
        <button className={styles.folderName} onClick={handelFolderSelect}>
          <span className={styles.folderName__folderIcon}>
            {getIsRecycleBin(folder.id) ? (
              <RecycleBinInlineSvg />
            ) : (
              <FolderInlineSvg />
            )}
          </span>
          {folder.name}
        </button>
        {!isAddingNewFolder &&
          canAddNestedFolder({ level, folderId: folder.id }) && (
            <button className={styles.newFolderButton} onClick={addNewFolder}>
              +
            </button>
          )}
      </div>
      <Folders
        dispatch={folderReducerDispatch}
        folders={folder.folders}
        level={level + 1}
      />
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
