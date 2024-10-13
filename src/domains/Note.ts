interface BaseNoteIntf {
  title: string;
  folderId: string;
  content: string;
}

interface NoteIntf extends BaseNoteIntf {
  id: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export type { NoteIntf, BaseNoteIntf };
