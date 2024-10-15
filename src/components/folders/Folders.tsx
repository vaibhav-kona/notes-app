import { Folder } from '../folder';
import { FolderIntf } from '../../domains/Folder';
import styles from './folders.module.scss';
import { FoldersDispatch } from '../../store/folders/folders.reducer';

const Folders = ({
  dispatch,
  folders,
  level = 1,
}: {
  folders: FolderIntf[];
  dispatch: FoldersDispatch;
  level?: number;
}) => {
  return (
    <div className={styles.folders}>
      <ul className={styles.folders__listContainer}>
        {folders.map((folder) => (
          <li
            key={folder.id}
            className={styles.folders__listContainer__listItem}
          >
            <Folder folder={folder} dispatch={dispatch} level={level} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Folders;
