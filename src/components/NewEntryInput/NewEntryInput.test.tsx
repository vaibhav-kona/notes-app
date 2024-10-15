import { render, screen, fireEvent } from '@testing-library/react';
import NewEntryInput from './NewEntryInput';

describe('NewEntryInput Component', () => {
  const mockCancelNewEntryCreate = jest.fn();
  const mockSaveNewEntry = jest.fn();
  const mockHandleNewEntryNameChange = jest.fn();

  const setup = (newEntryName = 'New Folder') => {
    render(
      <NewEntryInput
        newEntryName={newEntryName}
        cancelNewEntryCreate={mockCancelNewEntryCreate}
        saveNewEntry={mockSaveNewEntry}
        handleNewEntryNameChange={mockHandleNewEntryNameChange}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the input field and buttons correctly', () => {
    setup();

    const inputElement = screen.getByPlaceholderText('Enter folder name');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('New Folder');

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    const saveButton = screen.getByRole('button', { name: /check/i });

    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  test('calls handleNewEntryNameChange when the input value changes', () => {
    setup();
    const inputElement = screen.getByPlaceholderText('Enter folder name');

    fireEvent.change(inputElement, {
      target: { value: 'Updated Folder Name' },
    });

    expect(mockHandleNewEntryNameChange).toHaveBeenCalledTimes(1);
    expect(mockHandleNewEntryNameChange).toHaveBeenCalledWith(
      expect.any(Object)
    );
  });

  test('calls cancelNewEntryCreate when the cancel button is clicked', () => {
    setup();

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockCancelNewEntryCreate).toHaveBeenCalledTimes(1);
  });

  test('calls saveNewEntry when the save button is clicked', () => {
    setup();

    const saveButton = screen.getByRole('button', { name: /check/i });
    fireEvent.click(saveButton);

    expect(mockSaveNewEntry).toHaveBeenCalledTimes(1);
  });
});
