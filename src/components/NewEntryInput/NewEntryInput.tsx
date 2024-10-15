import { ChangeEvent } from 'react';
import styles from './newEntryInput.module.scss';
import { ReactComponent as CancelInlineSvg } from './cancel.inline.svg';
import { ReactComponent as CheckInlineSvg } from './check.inline.svg';

export interface NewFolderInputProps {
  newEntryName: string;
  cancelNewEntryCreate: () => void;
  saveNewEntry: () => void;
  handleNewEntryNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const NewEntryInput = ({
  newEntryName,
  cancelNewEntryCreate,
  saveNewEntry,
  handleNewEntryNameChange,
}: NewFolderInputProps) => {
  return (
    <div className={styles.newFolderInputContainer}>
      <input
        onChange={handleNewEntryNameChange}
        value={newEntryName}
        type="text"
        placeholder="Enter folder name"
        className={styles.folderNameInput}
      />
      <button className={styles.actionBtn} onClick={cancelNewEntryCreate}>
        <CancelInlineSvg />
      </button>
      <button className={styles.actionBtn} onClick={saveNewEntry}>
        <CheckInlineSvg />
      </button>
    </div>
  );
};

export default NewEntryInput;
