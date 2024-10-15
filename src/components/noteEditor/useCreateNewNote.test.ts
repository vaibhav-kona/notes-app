import { renderHook } from '@testing-library/react';
import useCreateNewNote from './useCreateNewNote';
import { notesService } from '../../services/notesService';
import { NotesDispatch } from '../../store/notes/notes.reducer';
import { ChangeEvent, act } from 'react';

jest.mock('../../services/notesService', () => ({
  notesService: {
    createNewNote: jest.fn(),
  },
}));

describe('useCreateNewNote', () => {
  const dispatchMock: NotesDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set isAddingNewNote to true when addNewNote is called', () => {
    const { result } = renderHook(() =>
      useCreateNewNote({ dispatch: dispatchMock, folderId: '1' })
    );

    act(() => {
      result.current.addNewNote();
    });

    expect(result.current.isAddingNewNote).toBe(true);
  });

  it('should reset isAddingNewNote and newNoteName when cancelNewNoteCreate is called', () => {
    const { result } = renderHook(() =>
      useCreateNewNote({ dispatch: dispatchMock, folderId: '1' })
    );

    act(() => {
      result.current.addNewNote();
      result.current.handleNewNoteNameChange({
        target: { value: 'Test Note' },
      } as ChangeEvent<HTMLInputElement>);
      result.current.cancelNewNoteCreate();
    });

    expect(result.current.isAddingNewNote).toBe(false);
    expect(result.current.newNoteName).toBe('');
  });

  it('should update newNoteName when handleNewNoteNameChange is called', () => {
    const { result } = renderHook(() =>
      useCreateNewNote({ dispatch: dispatchMock, folderId: '1' })
    );

    act(() => {
      result.current.handleNewNoteNameChange({
        target: { value: 'New Note' },
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.newNoteName).toBe('New Note');
  });

  it('should call notesService.createNewNote and reset state when saveNewNote is called with folderId', async () => {
    (notesService.createNewNote as jest.Mock).mockResolvedValueOnce(null);

    const { result } = renderHook(() =>
      useCreateNewNote({ dispatch: dispatchMock, folderId: '1' })
    );

    act(() => {
      result.current.handleNewNoteNameChange({
        target: { value: 'Test Note' },
      } as ChangeEvent<HTMLInputElement>);
    });

    await act(async () => {
      await result.current.saveNewNote();
    });

    expect(notesService.createNewNote).toHaveBeenCalledWith(dispatchMock, {
      title: 'Test Note',
      content: '',
      folderId: '1',
    });

    expect(result.current.isAddingNewNote).toBe(false);
    expect(result.current.newNoteName).toBe('');
  });

  it('should not call notesService.createNewNote if folderId is null', async () => {
    const { result } = renderHook(() =>
      useCreateNewNote({ dispatch: dispatchMock, folderId: null })
    );

    await act(async () => {
      await result.current.saveNewNote();
    });

    expect(notesService.createNewNote).not.toHaveBeenCalled();
  });
});
