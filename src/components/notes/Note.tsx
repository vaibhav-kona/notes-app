import { useContext, useMemo, useState } from 'react';
import { NoteIntf } from '../../domains/Note';
import { GLOBAL_ACTIONS } from '../../store/global/global.reducer';
import { notesService } from '../../services/notesService';
import { FolderIntf } from '../../domains/Folder';
import { recycleBinId } from '../../constants/global.constants';
import { getIsRecycleBin } from '../../utils/getIsRecycleBin';
import {
  GlobalContext,
  GlobalDispatchContext,
} from '../../store/global/global.context';
import { NotesDispatch } from '../../store/notes/notes.reducer';
import { MoveDialog } from '../moveDialog';
import { ReactComponent as MoveInlineSvg } from './move.inline.svg';
import { ReactComponent as DeleteInlineSvg } from './delete.inline.svg';
import { ReactComponent as RestoreInlineSvg } from './restore.inline.svg';
import styles from './notesWrapper.module.scss';
import classNames from 'classnames';

const Note = ({
  folders,
  note,
  notesDispatch,
}: {
  note: NoteIntf;
  notesDispatch: NotesDispatch;
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
    if (globalDispatch && note.id) {
      globalDispatch({
        type: GLOBAL_ACTIONS.ACTIVE_NOTE,
        noteId: note.id,
      });
    }
  };

  const handleFolderSelect = (folderId: string) => {
    setSelectedFolderId(folderId);
  };

  const globalState = useContext(GlobalContext);
  const isActiveNote = useMemo(
    () => globalState.activeNoteId === note.id,
    [note, globalState.activeNoteId]
  );

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
        className={classNames(
          styles.notes__listContainer__listItem__title,
          isActiveNote && styles.notes__listContainer__listItem__title__selected
        )}
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
              aria-label="Move note"
            >
              <MoveInlineSvg />
            </button>

            <button
              className={
                styles.notes__listContainer__listItem__actionContainer__deleteBtn
              }
              onClick={handleNoteDeletion}
              title="Delete note"
              aria-label="Delete note"
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
          title="Restore note"
          aria-label="Restore note"
        >
          <RestoreInlineSvg />
        </button>
      )}
    </>
  );
};

export default Note;
