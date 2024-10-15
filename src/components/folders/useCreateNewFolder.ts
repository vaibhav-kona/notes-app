import { ChangeEvent, useCallback, useState } from 'react';
import { foldersService } from '../../services/foldersService';
import { FoldersDispatch } from '../../store/folders/folders.reducer';

const useCreateNewFolder = ({
  dispatch,
  folderId,
}: {
  dispatch: FoldersDispatch;
  folderId: string | null;
}) => {
  const [isAddingNewFolder, setIsAddingNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const addNewFolder = useCallback(() => {
    setIsAddingNewFolder(true);
  }, []);
  const handleNewFolderNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (isAddingNewFolder) {
        setNewFolderName(e.target.value);
      } else {
        throw new Error(
          'Cannot change input value - adding new folder is not initialized'
        );
      }
    },
    [isAddingNewFolder]
  );
  const cancelNewFolderCreate = useCallback(() => {
    if (isAddingNewFolder) {
      setIsAddingNewFolder(false);
      setNewFolderName('');
    } else {
      throw new Error(
        'Cannot call cancel method - adding new folder is not initialized'
      );
    }
  }, [isAddingNewFolder]);
  const saveNewFolder = useCallback(async () => {
    if (isAddingNewFolder) {
      if (!newFolderName.trim()) {
        console.warn('Folder name cannot be empty');
        return;
      }
      try {
        await foldersService.createNewFolder(dispatch, {
          name: newFolderName,
          folderId: folderId,
          folders: [],
        });
        cancelNewFolderCreate();
      } catch (e) {
        console.error('Failed to save new folder: ', (e as Error).message);
      }
    } else {
      throw new Error(
        'Cannot save new folder - adding new folder is not initialized'
      );
    }
  }, [
    cancelNewFolderCreate,
    dispatch,
    folderId,
    isAddingNewFolder,
    newFolderName,
  ]);

  console.log({ isAddingNewFolder });

  return {
    isAddingNewFolder,
    newFolderName,
    addNewFolder,
    cancelNewFolderCreate,
    saveNewFolder,
    handleNewFolderNameChange,
  };
};

export default useCreateNewFolder;
