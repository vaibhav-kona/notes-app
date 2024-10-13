import { Dispatch, useCallback, useContext } from 'react';
import { FolderIntf } from '../../domains/Folder';
import { Folders } from '../folders';
import { NewFolderInput } from '../NewFolderInput';
import styles from './folder.module.scss';
import useCreateNewFolder from '../folders/useCreateNewFolder';
import { GlobalDispatchContext } from '../../store/global/global.context';
import canAddNestedFolder from './canAddNestedFolder';

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
      <button className={styles.folderName} onClick={handelFolderSelect}>
        {level !== 1 && <> - </>}
        {folder.name}
      </button>
      {!isAddingNewFolder &&
        canAddNestedFolder({ level, folderId: folder.id }) && (
          <button onClick={addNewFolder}> + </button>
        )}
      <Folders
        dispatch={folderReducerDispatch}
        folders={folder.folders}
        level={level + 1}
      />
      {isAddingNewFolder && (
        <NewFolderInput
          newFolderName={newFolderName}
          cancelNewFolderCreate={cancelNewFolderCreate}
          saveNewFolder={saveNewFolder}
          handleNewFolderNameChange={handleNewFolderNameChange}
        />
      )}
    </div>
  );
};

export default Folder;
