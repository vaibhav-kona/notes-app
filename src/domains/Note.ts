interface BaseNoteIntf {
  title: string;
  folderId: string;
  content: string;
}

interface NoteIntf extends BaseNoteIntf {
  id: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
}

export type { NoteIntf, BaseNoteIntf };
