import { FolderIntf } from '../../../domains/Folder';

const getFoldersTree = (folders: FolderIntf[]): FolderIntf[] => {
  // Create a map of folders by id
  const folderMap: Record<string, FolderIntf> = {};
  folders.forEach((folder) => {
    if (folder.id) {
      folderMap[folder.id] = { ...folder, folders: [] };
    }
  });

  // Loop through each folder and assign it to the right parent
  folders.forEach((folder) => {
    if (folder.id && folder.folderId) {
      folderMap[folder.folderId]?.folders.push(folderMap[folder.id]);
    }
  });

  // Making nested folders
  const foldersTree: FolderIntf[] = [];
  folders
    .filter((folder) => !folder.folderId)
    .forEach((folder) => {
      if (folder.id) {
        foldersTree.push(folderMap[folder.id]);
      }
    });

  return foldersTree;
};

export default getFoldersTree;
