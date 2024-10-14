import { FolderIntf } from '../../../domains/Folder';

const addFolderToFolderTree = (
  newFolder: FolderIntf,
  folders: FolderIntf[]
): FolderIntf[] => {
  const { folderId: newFolderParentFolderId } = newFolder;

  if (!newFolderParentFolderId) {
    return [...folders, newFolder];
  }

  return folders.map((folder) => {
    const { id, folders: subFolders } = folder;

    if (id === newFolderParentFolderId) {
      return {
        ...folder,
        folders: [...subFolders, newFolder],
      };
    }

    return {
      ...folder,
      folders: addFolderToFolderTree(newFolder, subFolders),
    };
  });
};

export default addFolderToFolderTree;
