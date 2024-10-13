import { Dispatch, useReducer } from 'react';
import { FolderIntf } from '../../domains/Folder';
import { Folders } from '../folders';
import { NewFolderInput } from '../NewFolderInput';
import styles from './folder.module.scss';
import useCreateNewFolder from '../folders/useCreateNewFolder';
import {
  notesInitialState,
  notesReducer,
} from '../../store/notes/notes.reducer';
import { notesService } from '../../services/notesService';

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

  const [, dispatch] = useReducer<any>(notesReducer, notesInitialState);

  const handelFolderSelect = () => {
    (async function () {
      if (folder.id) {
        await notesService.getNotesForFolder(dispatch, folder.id);
      }
    })();
  };

  return (
    <div key={folder.id}>
      <button className={styles.folderName} onClick={handelFolderSelect}>
        {level !== 1 && <> - </>}
        {folder.name}
      </button>
      {!isAddingNewFolder && level < 3 && (
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
