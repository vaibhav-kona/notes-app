import { getIsRecycleBin } from '../../utils/getIsRecycleBin';
import { ReactComponent as FolderInlineSvg } from './folder.inline.svg';
import { ReactComponent as RecycleBinInlineSvg } from './recycleBin.inline.svg';
import styles from './folder.module.scss';
import { useContext, useMemo } from 'react';
import { GlobalContext } from '../../store/global/global.context';
import classNames from 'classnames';

export interface FolderNameProps {
  handleFolderSelect: () => void;
  folderId: string;
  folderName: string;
}

const renderFolderIcon = (folderId: string) => {
  return getIsRecycleBin(folderId) ? (
    <span role="img" aria-label="Recycle bin">
      <RecycleBinInlineSvg />
    </span>
  ) : (
    <span role="img" aria-label="Folder">
      <FolderInlineSvg />
    </span>
  );
};

const FolderName = ({
  folderName,
  folderId,
  handleFolderSelect,
}: FolderNameProps) => {
  const globalState = useContext(GlobalContext);
  const isActiveFolder = useMemo(
    () => globalState.activeFolderId === folderId,
    [folderId, globalState.activeFolderId]
  );
  return (
    <button
      className={classNames(
        styles.folderName,
        isActiveFolder && styles.folderName__selected
      )}
      onClick={handleFolderSelect}
    >
      <span className={styles.folderName__folderIcon}>
        {renderFolderIcon(folderId)}
      </span>
      {folderName}
    </button>
  );
};

export default FolderName;
