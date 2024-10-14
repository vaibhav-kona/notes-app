import { recycleBinId } from '../constants/global.constants';

export const getIsRecycleBin = (folderId: string | null) => {
  return folderId === recycleBinId;
};
