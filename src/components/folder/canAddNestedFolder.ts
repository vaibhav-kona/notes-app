import { getIsRecycleBin } from '../../utils/getIsRecycleBin';

const canAddNestedFolder = ({
  level,
  folderId,
}: {
  level: number;
  folderId: string | null;
}) => {
  return level < 3 && !getIsRecycleBin(folderId);
};

export default canAddNestedFolder;
