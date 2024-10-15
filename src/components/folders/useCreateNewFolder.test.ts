import { renderHook, waitFor } from '@testing-library/react';
import { foldersService } from '../../services/foldersService';
import useCreateNewFolder from './useCreateNewFolder';
import { ChangeEvent } from 'react';

jest.mock('../../services/foldersService', () => ({
  foldersService: {
    createNewFolder: jest.fn(),
  },
}));

describe('useCreateNewFolder', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    dispatchMock.mockClear();
    (foldersService.createNewFolder as jest.Mock).mockClear();
  });

  it('should initialize with default states', () => {
    const { result } = renderHook(() =>
      useCreateNewFolder({ dispatch: dispatchMock, folderId: '1' })
    );

    expect(result.current.isAddingNewFolder).toBe(false);
    expect(result.current.newFolderName).toBe('');
  });

  it('should set isAddingNewFolder to true when addNewFolder is called', async () => {
    const { result } = renderHook(() =>
      useCreateNewFolder({ dispatch: dispatchMock, folderId: '1' })
    );

    result.current.addNewFolder();
    await waitFor(() => {
      expect(result.current.isAddingNewFolder).toBe(true);
    });
  });

  it('should update newFolderName when handleNewFolderNameChange is called', async () => {
    const { result } = renderHook(() =>
      useCreateNewFolder({ dispatch: dispatchMock, folderId: '1' })
    );

    const event = {
      target: { value: 'New Folder' },
    } as ChangeEvent<HTMLInputElement>;

    result.current.addNewFolder();
    await waitFor(() => {
      result.current.handleNewFolderNameChange(event);
      expect(result.current.newFolderName).toBe('New Folder');
    });
  });

  it('should reset states when cancelNewFolderCreate is called', async () => {
    const { result } = renderHook(() =>
      useCreateNewFolder({ dispatch: dispatchMock, folderId: '1' })
    );

    await waitFor(() => {
      result.current.addNewFolder();
      result.current.handleNewFolderNameChange({
        target: { value: 'Test Folder' },
      } as ChangeEvent<HTMLInputElement>);
      result.current.cancelNewFolderCreate();
    });

    await waitFor(() => {
      expect(result.current.isAddingNewFolder).toBe(false);
      expect(result.current.newFolderName).toBe('');
    });
  });

  it('should call createNewFolder and reset state on successful saveNewFolder', async () => {
    (foldersService.createNewFolder as jest.Mock).mockResolvedValueOnce({});

    const { result } = renderHook(() =>
      useCreateNewFolder({ dispatch: dispatchMock, folderId: '1' })
    );

    await waitFor(async () => {
      result.current.addNewFolder();
      result.current.handleNewFolderNameChange({
        target: { value: 'Test Folder' },
      } as ChangeEvent<HTMLInputElement>);
    });

    await waitFor(async () => {
      await result.current.saveNewFolder();
      expect(foldersService.createNewFolder).toHaveBeenCalledWith(
        dispatchMock,
        {
          name: 'Test Folder',
          folderId: '1',
          folders: [],
        }
      );
    });
  });

  it('should warn if saveNewFolder is called with an empty folder name', async () => {
    const consoleWarnMock = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => {});

    const { result } = renderHook(() =>
      useCreateNewFolder({ dispatch: dispatchMock, folderId: '1' })
    );

    result.current.addNewFolder();
    await waitFor(async () => {
      await result.current.saveNewFolder();
    });

    expect(consoleWarnMock).toHaveBeenCalledWith('Folder name cannot be empty');
    expect(foldersService.createNewFolder).not.toHaveBeenCalled();

    consoleWarnMock.mockRestore();
  });

  it('should log an error if saveNewFolder fails', async () => {
    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    (foldersService.createNewFolder as jest.Mock).mockRejectedValueOnce(
      new Error('API error')
    );

    const { result } = renderHook(() =>
      useCreateNewFolder({ dispatch: dispatchMock, folderId: '1' })
    );

    await waitFor(async () => {
      result.current.addNewFolder();
      result.current.handleNewFolderNameChange({
        target: { value: 'Test Folder' },
      } as ChangeEvent<HTMLInputElement>);
      await result.current.saveNewFolder();
      expect(consoleErrorMock).toHaveBeenCalledWith(
        'Failed to save new folder: ',
        'API error'
      );
      expect(result.current.isAddingNewFolder).toBe(true);
    });

    consoleErrorMock.mockRestore();
  });
});
