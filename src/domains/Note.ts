interface NoteIntf {
  id: number | null;
  title: string;
  content: string;
  parentFolderId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export type { NoteIntf };
