import styles from './moveDialog.module.scss';
import { FolderIntf } from '../../domains/Folder';
import classNames from 'classnames';
import { getIsRecycleBin } from '../../utils/getIsRecycleBin';

interface MoveDialogProps {
  handleNoteMove: () => void;
  cancelNoteMove: () => void;
  handleFolderSelect: (folderId: string) => void;
  folders: FolderIntf[];
  selectedFolderId: string | null;
  currentFolderId: string;
}

const MoveDialog = ({
  handleNoteMove,
  cancelNoteMove,
  handleFolderSelect,
  folders,
  selectedFolderId,
  currentFolderId,
}: MoveDialogProps) => {
  const folderRender = (folder: FolderIntf) => (
    <>
      <button
        key={folder.id}
        onClick={() =>
          folder.id && folder.id !== currentFolderId
            ? handleFolderSelect(folder.id)
            : undefined
        }
        className={classNames(
          styles.moveDialog__folderList__folderItem,
          folder.id === selectedFolderId &&
            styles.moveDialog__folderList__folderItem__selected,
          folder.id === currentFolderId &&
            styles.moveDialog__folderList__folderItem__currentFolder
        )}
        disabled={folder.id === currentFolderId}
      >
        {folder.name}
      </button>
      <ul className={styles.moveDialog__folderList}>
        {folder.folders &&
          folder.folders.map((nestedFolder) => (
            <li key={nestedFolder.id}>{folderRender(nestedFolder)}</li>
          ))}
      </ul>
    </>
  );

  return (
    <dialog open className={styles.moveDialog}>
      <header className={styles.moveDialog__header}>
        <h1 className={styles.moveDialog__title}>Move Note</h1>
        <p className={styles.moveDialog__details}>
          Select the folder below to move the note into
        </p>

        <section className={styles.moveDialog__actionBtnContainer}>
          <button
            className={styles.moveDialog__actionBtnContainer__cancelBtn}
            onClick={cancelNoteMove}
          >
            Cancel
          </button>

          <button
            className={styles.moveDialog__actionBtnContainer__moveBtn}
            onClick={handleNoteMove}
          >
            Move
          </button>
        </section>
      </header>

      <ul className={styles.moveDialog__folderList}>
        {folders.map(
          (folder: FolderIntf) =>
            !getIsRecycleBin(folder.id) && (
              <li key={folder.id}>{folderRender(folder)}</li>
            )
        )}
      </ul>
    </dialog>
  );
};

export default MoveDialog;
