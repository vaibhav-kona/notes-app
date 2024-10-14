import styles from './notes.module.scss';
import { NoteIntf } from '../../domains/Note';
import { Dispatch, useContext, useState } from 'react';
import { notesService } from '../../services/notesService';
import { FolderIntf } from '../../domains/Folder';
import { recycleBinId } from '../../constants/global.constants';
import { getIsRecycleBin } from '../../utils/getIsRecycleBin';
import { GlobalDispatchContext } from '../../store/global/global.context';

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

  const initiateNoteMove = (note: NoteIntf) => {
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

  const folderRender = (folder: FolderIntf) => (
    <>
      <button
        key={folder.id}
        onClick={() => setSelectedFolderId(folder.id)}
        style={{
          background:
            folder.id === selectedFolderId ? 'lightblue' : 'lightgrey',
          cursor: 'pointer',
        }}
      >
        {folder.name}
      </button>
      <ul>
        {folder.folders &&
          folder.folders.map((nestedFolder) => (
            <li key={nestedFolder.id}>{folderRender(nestedFolder)}</li>
          ))}
      </ul>
    </>
  );

  return (
    <>
      {showNoteMoveDialog && (
        <div className={styles.moveDialog}>
          <h1>Note Move Dialog</h1>
          <p>Select the folder below to move the note into</p>
          <button onClick={handleNoteMove}>Move</button>
          <button onClick={cancelNoteMove}>Cancel</button>
          <ul>
            {folders.map((folder: FolderIntf) => (
              <li key={folder.id}>{folderRender(folder)}</li>
            ))}
          </ul>
        </div>
      )}
      <button
        className={styles.notes__listContainer__listItem__title}
        onClick={handleNoteSelect}
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
              onClick={() => initiateNoteMove(note)}
            >
              Move
            </button>

            <button
              className={
                styles.notes__listContainer__listItem__actionContainer__deleteBtn
              }
              onClick={handleNoteDeletion}
            >
              Delete
            </button>
          </span>
        </>
      )}

      {getIsRecycleBin(note.folderId) && (
        <button
          className={
            styles.notes__listContainer__listItem__actionContainer__moveBtn
          }
          onClick={() => initiateNoteMove(note)}
        >
          Restore
        </button>
      )}
    </>
  );
};

export default Note;
