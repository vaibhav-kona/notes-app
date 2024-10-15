import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewNoteInput from './NewNoteInput';
import { NotesDispatch } from '../../store/notes/notes.reducer';
import useCreateNewNote from '../noteEditor/useCreateNewNote';

jest.mock('../noteEditor/useCreateNewNote', () => jest.fn());
jest.mock('../NewEntryInput', () => ({
  NewEntryInput: () => <div>Mocked NewEntryInput</div>,
}));

describe('NewNoteInput component', () => {
  const mockDispatch = jest.fn() as unknown as NotesDispatch;
  const mockAddNewNote = jest.fn();
  const mockCancelNewNoteCreate = jest.fn();
  const mockSaveNewNote = jest.fn();
  const mockHandleNewNoteNameChange = jest.fn();

  beforeEach(() => {
    (useCreateNewNote as jest.Mock).mockReturnValue({
      isAddingNewNote: false,
      newNoteName: '',
      addNewNote: mockAddNewNote,
      cancelNewNoteCreate: mockCancelNewNoteCreate,
      saveNewNote: mockSaveNewNote,
      handleNewNoteNameChange: mockHandleNewNoteNameChange,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the "Add new note" button if not adding a new note and folderId exists', () => {
    render(<NewNoteInput notesDispatch={mockDispatch} folderId="123" />);

    const addNewNoteButton = screen.getByText('+ Add new note');
    expect(addNewNoteButton).toBeInTheDocument();
  });

  test('should call addNewNote when "Add new note" button is clicked', () => {
    render(<NewNoteInput notesDispatch={mockDispatch} folderId="123" />);

    const addNewNoteButton = screen.getByText('+ Add new note');
    fireEvent.click(addNewNoteButton);

    expect(mockAddNewNote).toHaveBeenCalledTimes(1);
  });

  test('should render NewEntryInput component when adding a new note', async () => {
    (useCreateNewNote as jest.Mock).mockReturnValueOnce({
      isAddingNewNote: true,
      newNoteName: 'New Note',
      addNewNote: mockAddNewNote,
      cancelNewNoteCreate: mockCancelNewNoteCreate,
      saveNewNote: mockSaveNewNote,
      handleNewNoteNameChange: mockHandleNewNoteNameChange,
    });

    render(<NewNoteInput notesDispatch={mockDispatch} folderId="123" />);

    expect(screen.getByText('Mocked NewEntryInput')).toBeInTheDocument();
  });

  test('should not render the "Add new note" button when folderId is null', () => {
    render(<NewNoteInput notesDispatch={mockDispatch} folderId={null} />);

    expect(screen.queryByText('+ Add new note')).toBeNull();
  });
});
