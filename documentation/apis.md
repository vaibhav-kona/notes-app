# NotesWrapper and Folders API Documentation

## Base URL

The base URL for all endpoints is `/folders`.

## Endpoints

### 1. GET `/folders`

Retrieves a list of all folders.

**Response:**

- **200 OK**
  ```json
  [
    {
      "id": "1",
      "name": "My Documents",
      "folderId": null,
      "folders": [],
      "createdAt": "2024-10-15T04:00:00Z"
    },
    {
      "id": "2",
      "name": "Work Projects",
      "folderId": "1",
      "folders": [],
      "createdAt": "2024-10-15T04:00:00Z"
    }
  ]
  ```
  - **Folder**: Array of folders containing information like `id`, `name`, `folderId`, `folders`, and `createdAt`.

---

### 2. GET `/notes?folderId={folderId}`

Retrieves the list of notes within a specific folder.

**Path Parameters:**

- **folderId**: The ID of the folder to retrieve notes for.

**Response:**

- **200 OK**
  ```json
  [
    {
      "id": "101",
      "title": "Meeting NotesWrapper",
      "content": "Important notes about today's meeting",
      "folderId": "1",
      "createdAt": "2024-10-15T04:00:00Z",
      "updatedAt": null,
      "deletedAt": null
    },
    {
      "id": "102",
      "title": "Work Task",
      "content": "Complete the feature for the project",
      "folderId": "1",
      "createdAt": "2024-10-15T04:00:00Z",
      "createdAt": "2024-10-15T05:00:00Z",
      "deletedAt": null
    }
  ]
  ```
  - **Note**: Array of notes containing details like `id`, `title`, `content`, `folderId`, `createdAt`, `updatedAt`, and `deletedAt`.

---

### 3. POST `/folders`

Creates a new folder.

**Request Body:**

```json
{
  "name": "string",
  "folderId": "string | null"
}
```

- **name** (string): The name of the folder.
- **folderId** (string | null, optional): The ID of the parent folder. Set to `null` if this is a root folder.

**Response:**

- **201 Created**
  ```json
  {
    "id": "3",
    "name": "New Folder",
    "folderId": null,
    "folders": [],
    "createdAt": "2024-10-15T04:00:00Z"
  }
  ```

---

### 4. POST `/notes`

Creates a new note within a specific folder.

**Path Parameters:**

- **folderId**: The ID of the folder where the note will be created.

**Request Body:**

```json
{
  "title": "string",
  "content": "string",
  "folderId": "string"
}
```

- **title** (string): The title of the note.
- **content** (string): The content of the note.
- **folderId** (string): The ID of the folder to which the note belongs.

**Response:**

- **201 Created**
  ```json
  {
    "id": "103",
    "title": "Shopping List",
    "content": "Milk, Bread, Eggs",
    "folderId": "2",
    "createdAt": "2024-10-15T04:00:00Z",
    "updatedAt": null,
    "deletedAt": null
  }
  ```

---

### 5. PUT `/notes/{noteId}`

Updates an existing note within a specific folder.

**Path Parameters:**

- **folderId**: The ID of the folder containing the note.
- **noteId**: The ID of the note to update.

**Request Body:**

```json
{
  "title": "string",
  "content": "string",
  "folderId": "string"
}
```

- **title** (string): The updated title of the note.
- **content** (string): The updated content of the note.
- **folderId** (string): The updated folder ID to which the note belongs.

**Response:**

- **200 OK**
  ```json
  {
    "id": "104",
    "title": "Updated Note Title",
    "content": "Updated note content",
    "folderId": "3",
    "createdAt": "2024-10-15T04:00:00Z",
    "updatedAt": "2024-10-15T05:00:00Z",
    "deletedAt": null
  }
  ```
  - **Note:** deletedAt needs to be updated when the note is moved to recycle bin.

---

## Data Schemas

### Folder Schema

- **id** (string | null): Unique identifier for the folder.
- **name** (string): The name of the folder.
- **folderId** (string | null): The ID of the parent folder. Can be null if it's a root folder. This is the value of id from the same table.
- **createdAt** (string | null): The creation timestamp of the folder, in ISO 8601 format.

### Note Schema

- **id** (string | null): Unique identifier for the note.
- **title** (string): The title of the note.
- **content** (string): The content of the note.
- **folderId** (string): The ID of the folder this note belongs to. This is the value of id from the folder table.
- **createdAt** (string | null): The creation timestamp of the note, in ISO 8601 format.
- **updatedAt** (string | null): The last update timestamp of the note.
- **deletedAt** (string | null): The deletion timestamp of the note, if applicable.
