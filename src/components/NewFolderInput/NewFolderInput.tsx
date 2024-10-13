import { ChangeEvent } from 'react';

interface NewFolderInputProps {
  newFolderName: string;
  cancelNewFolderCreate: () => void;
  saveNewFolder: () => void;
  handleNewFolderNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const NewFolderInput = ({
  newFolderName,
  cancelNewFolderCreate,
  saveNewFolder,
  handleNewFolderNameChange,
}: NewFolderInputProps) => {
  return (
    <>
      <input
        onChange={handleNewFolderNameChange}
        value={newFolderName}
        type="type"
        placeholder="Enter folder name"
        required
      />
      <button onClick={cancelNewFolderCreate}>Cancel</button>
      <button onClick={saveNewFolder}>Save</button>
    </>
  );
};

export default NewFolderInput;
