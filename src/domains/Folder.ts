interface BaseFolderIntf {
  name: string;
  folderId: string | null;
}

interface FolderIntf extends BaseFolderIntf {
  id: string | null;
  createdAt: string | null;
  folders: FolderIntf[];
}

export type { BaseFolderIntf, FolderIntf };
