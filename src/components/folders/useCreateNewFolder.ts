import { ChangeEvent, Dispatch, useState } from 'react';
import { foldersService } from '../../services/foldersService';

const useCreateNewFolder = ({
  dispatch,
  folderId,
}: {
  dispatch: Dispatch<any>;
  folderId: string | null;
}) => {
  const [isAddingNewFolder, setIsAddingNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const addNewFolder = () => {
    setIsAddingNewFolder(true);
  };
  const handleNewFolderNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewFolderName(e.target.value);
  };
  const cancelNewFolderCreate = () => {
    setIsAddingNewFolder(false);
    setNewFolderName('');
  };
  const saveNewFolder = async () => {
    await foldersService.createNewFolder(dispatch, {
      name: newFolderName,
      folderId: folderId,
    });
    setIsAddingNewFolder(false);
  };

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
