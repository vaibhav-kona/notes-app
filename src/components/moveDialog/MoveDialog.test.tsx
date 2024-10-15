import { render, screen, fireEvent } from '@testing-library/react';
import MoveDialog from './MoveDialog';
import { FolderIntf } from '../../domains/Folder';
import { getIsRecycleBin } from '../../utils/getIsRecycleBin';

jest.mock('../../utils/getIsRecycleBin');

describe('MoveDialog Component', () => {
  const mockHandleNoteMove = jest.fn();
  const mockCancelNoteMove = jest.fn();
  const mockHandleFolderSelect = jest.fn();

  const folders: FolderIntf[] = [
    {
      id: '1',
      name: 'Folder 1',
      folderId: null,
      folders: [
        {
          id: '2',
          name: 'Folder 1.1',
          folderId: '1',
          folders: [],
          createdAt: null,
        },
      ],
      createdAt: null,
    },
    {
      id: '3',
      name: 'Recycle Bin',
      folderId: null,
      folders: [],
      createdAt: null,
    },
  ];

  const setup = (
    selectedFolderId: string | null = null,
    currentFolderId: string = '1'
  ) => {
    (getIsRecycleBin as jest.Mock).mockImplementation(
      (id: string) => id === '3'
    );

    render(
      <MoveDialog
        handleNoteMove={mockHandleNoteMove}
        cancelNoteMove={mockCancelNoteMove}
        handleFolderSelect={mockHandleFolderSelect}
        folders={folders}
        selectedFolderId={selectedFolderId}
        currentFolderId={currentFolderId}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the dialog with header and action buttons correctly', () => {
    setup();

    expect(screen.getByText('Move Note')).toBeInTheDocument();
    expect(
      screen.getByText('Select the folder below to move the note into')
    ).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Move')).toBeInTheDocument();
  });

  test('renders the folder list correctly, excluding the Recycle Bin', () => {
    setup();

    expect(screen.getByText('Folder 1')).toBeInTheDocument();
    expect(screen.queryByText('Recycle Bin')).not.toBeInTheDocument();
  });

  test('calls cancelNoteMove when the Cancel button is clicked', () => {
    setup();

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockCancelNoteMove).toHaveBeenCalledTimes(1);
  });

  test('calls handleNoteMove when the Move button is clicked', () => {
    setup();

    const moveButton = screen.getByText('Move');
    fireEvent.click(moveButton);

    expect(mockHandleNoteMove).toHaveBeenCalledTimes(1);
  });

  test('disables the current folder from being selected', () => {
    setup(null, '1');

    const currentFolderButton = screen.getByText('Folder 1');
    expect(currentFolderButton).toBeDisabled();
  });

  test('calls handleFolderSelect when a folder is clicked, except for the current folder', () => {
    setup(null, '1');

    const subFolderButton = screen.getByText('Folder 1.1');
    fireEvent.click(subFolderButton);

    expect(mockHandleFolderSelect).toHaveBeenCalledWith('2');
  });

  test('renders nested folders correctly', () => {
    setup();

    expect(screen.getByText('Folder 1.1')).toBeInTheDocument();
  });
});
