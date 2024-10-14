import styles from './notes.module.scss';
import { NoteIntf } from '../../domains/Note';
import { Dispatch, useContext, useState } from 'react';
import { notesService } from '../../services/notesService';
import { FolderIntf } from '../../domains/Folder';
import { recycleBinId } from '../../constants/global.constants';
import { getIsRecycleBin } from '../../utils/getIsRecycleBin';
import { GlobalDispatchContext } from '../../store/global/global.context';
import { ReactComponent as MoveInlineSvg } from './move.inline.svg';
import { ReactComponent as DeleteInlineSvg } from './delete.inline.svg';
import { ReactComponent as RestoreInlineSvg } from './restore.inline.svg';
import { MoveDialog } from '../moveDialog';

const Note = ({
  folders,
  note,
  notesDispatch,
}: {
  note: NoteIntf;
  notesDispatch: Dispatch<any>;
  folders: FolderIntf[];
}) => {
  const [showNoteMoveDialog, setShowNoteMoveDialog] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const globalDispatch = useContext(GlobalDispatchContext);

  const initiateNoteMove = () => {
    setShowNoteMoveDialog(true);
  };

  const handleNoteMove = async () => {
    if (selectedFolderId) {
      await notesService.moveNote(notesDispatch, {
        ...note,
        folderId: selectedFolderId,
      });
    }
    cancelNoteMove();
  };

  const cancelNoteMove = () => {
    setShowNoteMoveDialog(false);
    setSelectedFolderId(null);
  };

  const handleNoteDeletion = async () => {
    await notesService.moveNote(notesDispatch, {
      ...note,
      folderId: recycleBinId,
    });
  };

  const handleNoteSelect = () => {
    if (globalDispatch) {
      globalDispatch({
        type: 'activeNote',
        noteId: note.id,
      });
    }
  };

  const handleFolderSelect = (folderId: string) => {
    setSelectedFolderId(folderId);
  };

  return (
    <>
      {showNoteMoveDialog && (
        <MoveDialog
          handleNoteMove={handleNoteMove}
          cancelNoteMove={cancelNoteMove}
          handleFolderSelect={handleFolderSelect}
          folders={folders}
          selectedFolderId={selectedFolderId}
          currentFolderId={note.folderId}
        />
      )}
      <button
        className={styles.notes__listContainer__listItem__title}
        onClick={getIsRecycleBin(note.folderId) ? undefined : handleNoteSelect}
      >
        {note.title}
      </button>

      {!getIsRecycleBin(note.folderId) && (
        <>
          <span
            className={styles.notes__listContainer__listItem__actionContainer}
          >
            <button
              className={
                styles.notes__listContainer__listItem__actionContainer__moveBtn
              }
              onClick={() => initiateNoteMove()}
              title="Move note"
            >
              <MoveInlineSvg />
            </button>

            <button
              className={
                styles.notes__listContainer__listItem__actionContainer__deleteBtn
              }
              onClick={handleNoteDeletion}
              title="Delete note"
            >
              <DeleteInlineSvg />
            </button>
          </span>
        </>
      )}

      {getIsRecycleBin(note.folderId) && (
        <button
          className={
            styles.notes__listContainer__listItem__actionContainer__moveBtn
          }
          onClick={() => initiateNoteMove()}
        >
          <RestoreInlineSvg />
        </button>
      )}
    </>
  );
};

export default Note;
