# React Projects Collection

## Project Overview

This repository contains a collection of React mini-projects and experiments, organized within a single React environment using **Vite**. It serves as a portfolio or playground for various React functionalities.

**Key Technologies:**
*   **Core:** React 18, React DOM
*   **Routing:** React Router DOM (v6)
*   **State/Data Fetching:** SWR
*   **UI/UX:** React Icons, SweetAlert2
*   **Build Tool:** Vite
*   **Testing:** Vitest, React Testing Library

## Architecture

The application is structured as a multi-page app using client-side routing.

*   **Entry Point:** `src/main.jsx` (bootstraps React and wraps App in `BrowserRouter`).
*   **Route Definitions:** `src/App.jsx` defines the routes for the individual projects:
    *   `/` - Home (Dashboard/Menu)
    *   `/Todo` - To-Do List Application
    *   `/Quiz` - Quiz Application
    *   `/SpaceNews` - Space News Viewer
    *   `/VideoGame` - Video Game Component

## Directory Structure

```text
src/
├── components/         # Shared UI components
│   ├── BgChanger/      # Background changer utility
│   └── Hero.jsx        # Hero component
├── pages/              # Top-level page components (projects)
│   ├── Home.jsx        # Landing page
│   ├── Quiz/           # Quiz game
│   ├── Space News/     # Space news viewer
│   ├── Todo/           # To-Do app
│   └── Video Game/     # Video game component
├── App.jsx             # Route configuration
└── main.jsx            # Application entry point
```

## Building and Running

This project uses standard `npm` scripts:

*   **Start Development Server:**
    ```bash
    npm run dev
    ```
    Runs the app in development mode (usually at `http://localhost:5173`).

*   **Run Tests:**
    ```bash
    npm test
    ```
    Launches the test runner (Vitest).

*   **Build for Production:**
    ```bash
    npm run build
    ```
    Builds the app for production to the `build` folder.

## Development Conventions

*   **Component Style:** Functional components using React Hooks.
*   **File Naming:** PascalCase for component files (e.g., `Home.jsx`, `SpaceNews.jsx`).
*   **Styling:** Component-specific CSS files (e.g., `Home.css`, `Todo.css`).
*   **Routing:** defined centrally in `App.jsx`.
*   **Linting/Formatting:** ESLint and Prettier are configured with pre-commit hooks (Husky).