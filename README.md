# Kanban Board

### Overview

This is a full-stack Kanban board application designed to manage columns and cards with a visually organized interface. The application is built with a TypeScript backend utilizing Clean Architecture principles, and a React frontend leveraging RTK Query and the dnd kit for drag-and-drop functionality.

### Application Website

> [Kanban Board](https://kanban-board-ycsg.onrender.com) (loading may take few minutes)

### Features

- **Columns and Cards Management**: Create, update, and delete cards and columns within boards.
- **Drag-and-Drop**: Easily rearrange cards and columns using drag-and-drop functionality.
- **Real-time Updates**: Instant updates across the board without page reloads.
- **Error Handling**: Robust error handling for better user experience and debugging.

### API Endpoints

##### Boards:

- POST /api/boards: Create a new board.
- GET /api/boards/:boardID: Get a specific board.
- PATCH /api/boards/:boardID: Update a board.
- DELETE /api/boards/:boardID: Delete a board.

##### Columns:

- POST /api/boards/:boardID/columns: Create a new column in a board.
- PATCH /api/boards/:boardID/columns/:columnID: Update a column.
- DELETE /api/boards/:boardID/columns/:columnID: Delete a column.

##### Cards:

- POST /api/boards/:boardID/columns/:columnID/cards: Create a new card in a column.
- PATCH /api/boards/:boardID/columns/:columnID/cards/:cardID: Update a card.
- DELETE /api/boards/:boardID/columns/:columnID/cards/:cardID: Delete a card.

### Technologies Used

##### Frontend:

- React, TypeScript, Redux Toolkit, RTK Query, dnd kit, Chakra UI

##### Backend:

- Node.js, Express, TypeScript, MongoDB, Mongoose

### Project Structure

```
client/
  src/
    components/
    hooks/
    interfaces/
    pages/
    store/
      api/
      slices/
    styles
    App.tsx
    main.tsx
    router.tsx
server/
  src/
    core/
      entities/
      repositories/
      services/
      types/
    infrastructure/
      controllers/
        decorators/
      db/
        mongo/
```
