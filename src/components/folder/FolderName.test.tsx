import { render, screen, fireEvent } from '@testing-library/react';
import FolderName from './FolderName';
import { getIsRecycleBin } from '../../utils/getIsRecycleBin';

jest.mock('../../utils/getIsRecycleBin');

describe('FolderName component', () => {
  const mockHandleFolderSelect = jest.fn();
  const folderName = 'Sample Folder';
  const folderId = '123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders folder name', () => {
    (getIsRecycleBin as jest.Mock).mockReturnValue(false);

    render(
      <FolderName
        folderName={folderName}
        folderId={folderId}
        handleFolderSelect={mockHandleFolderSelect}
      />
    );

    expect(screen.getByText(folderName)).toBeInTheDocument();
  });

  test('renders folder icon if not a recycle bin', () => {
    (getIsRecycleBin as jest.Mock).mockReturnValue(false);

    render(
      <FolderName
        folderName={folderName}
        folderId={folderId}
        handleFolderSelect={mockHandleFolderSelect}
      />
    );

    expect(screen.getByLabelText('Folder')).toBeInTheDocument();
  });

  test('renders recycle bin icon if it is a recycle bin', () => {
    (getIsRecycleBin as jest.Mock).mockReturnValue(true);

    render(
      <FolderName
        folderName={folderName}
        folderId={folderId}
        handleFolderSelect={mockHandleFolderSelect}
      />
    );

    expect(screen.getByLabelText('Recycle bin')).toBeInTheDocument();
  });

  test('calls handleFolderSelect when clicked', () => {
    (getIsRecycleBin as jest.Mock).mockReturnValue(false);

    render(
      <FolderName
        folderName={folderName}
        folderId={folderId}
        handleFolderSelect={mockHandleFolderSelect}
      />
    );

    const button = screen.getByText(folderName);
    fireEvent.click(button);

    expect(mockHandleFolderSelect).toHaveBeenCalledTimes(1);
  });

  test('handles different folderId inputs for icon rendering', () => {
    (getIsRecycleBin as jest.Mock).mockReturnValue(false);

    render(
      <FolderName
        folderName="Regular Folder"
        folderId="folder-regular"
        handleFolderSelect={mockHandleFolderSelect}
      />
    );

    expect(screen.getByLabelText('Folder')).toBeInTheDocument();

    (getIsRecycleBin as jest.Mock).mockReturnValue(true);

    render(
      <FolderName
        folderName="Recycle Bin"
        folderId="folder-recycle"
        handleFolderSelect={mockHandleFolderSelect}
      />
    );

    expect(screen.getByLabelText('Recycle bin')).toBeInTheDocument();
  });
});
