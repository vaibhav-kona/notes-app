interface BaseFolderIntf {
  name: string;
  folderId: string | null;
  folders: FolderIntf[];
}

interface FolderIntf extends BaseFolderIntf {
  id: string | null;
  createdAt: string | null;
}

export type { BaseFolderIntf, FolderIntf };
