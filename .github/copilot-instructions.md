# Copilot Instructions for Mood Tracker MVP

This document provides guidance for using GitHub Copilot to build the **Mood Tracker MVP**, a local-first web app for logging and viewing daily moods. It includes best practices, project structure, and naming conventions to ensure efficient development and consistent code.

## Project Overview
The Mood Tracker MVP allows users to:
- Log a mood (e.g., Happy, Sad) with an optional note.
- View a list of all logged moods.
- Store data locally in a JSON file.

## Tech Stack
- **Frontend**: React.js with TypeScript (Vite)
- **Backend**: Node.js with Express (TypeScript)
- **Storage**: Local JSON file (`moods.json`)

## Best Practices for GitHub Copilot

### 1. Write Precise Prompts
- **Why**: Clear prompts yield better Copilot suggestions.
- **How**: Specify language, context, and intent in comments or prompts.
- **General Example**:
  - Good: `// TypeScript: Fetch moods from API and update React state`
  - Bad: `// Get data`

### 2. Use Copilot for Small, Focused Tasks
- **Why**: Copilot shines with modular code like components or endpoints.
- **How**: Request one function/component at a time (e.g., "Create a React form component").
- **General Example**:
  - Good: `// TypeScript: POST endpoint to save a mood`
  - Bad: `// Build the whole backend`

### 3. Always Review Suggestions
- **Why**: Copilot may suggest incorrect types or logic.
- **How**: Verify types, test locally, and check for errors (e.g., `npm run dev`, `npx ts-node server/index.ts`).
- **General Example**:
  - Good: Replace `any` with `Mood[]` in TypeScript.
  - Bad: Accepting untested API routes.

### 4. Language-Specific Practices
#### TypeScript (React Frontend)
- **Good Practice**:
  - Define interfaces for props and state.
  - Use descriptive component names (e.g., `MoodForm`).
  - Example:
    ```tsx
    interface Mood {
      id: string;
      mood: string;
      note: string;
      date: string;
    }

    const MoodList: React.FC<{ moods: Mood[] }> = ({ moods }) => {
      return <ul>{moods.map(m => <li key={m.id}>{m.mood}</li>)}</ul>;
    };
    ```
- **Bad Practice**:
  - Using `any` or skipping key props.
  - Example:
    ```tsx
    // Avoid: No type safety, missing key
    const MoodList = (props: any) => {
      return <ul>{props.data.map(m => <li>{m.mood}</li>)}</ul>;
    };
    ```

#### TypeScript (Node.js/Express Backend)
- **Good Practice**:
  - Type request/response bodies.
  - Handle errors explicitly.
  - Example:
    ```ts
    import express, { Request, Response } from "express";
    const router = express.Router();

    interface Mood {
      id: string;
      mood: string;
      note: string;
      date: string;
    }

    router.get("/moods", async (req: Request, res: Response<Mood[]>) => {
      try {
        const moods = await readMoodsFromFile();
        res.json(moods);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch moods" });
      }
    });
    ```
- **Bad Practice**:
  - No error handling or untyped responses.
  - Example:
    ```ts
    // Avoid: No types, no error handling
    router.get("/moods", (req, res) => {
      res.json(getMoods()); // Could throw uncaught error
    });
    ```

### 5. Test Suggestions
- **Why**: Ensures Copilot’s code works as expected.
- **How**: Run `npm test` (frontend) or manually test endpoints (backend).
- **Example**:
  - Good: `// Prompt: Write a Jest test for MoodForm submission`
  - Bad: Skipping tests and assuming code works.

## Project Structure
A flat, predictable structure for the MVP:

mood-tracker/
├── client/                 # Frontend (React + TypeScript)
│   ├── src/
│   │   ├── components/   # UI components
│   │   │   ├── MoodForm.tsx
│   │   │   └── MoodList.tsx
│   │   ├── App.tsx       # Main app component
│   │   ├── main.tsx      # Entry point
│   │   ├── types.ts      # Shared TypeScript types
│   │   └── styles.css    # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── server/                 # Backend (Node.js + Express)
│   ├── src/
│   │   ├── routes.ts     # API routes
│   │   ├── storage.ts    # JSON file operations
│   │   ├── types.ts      # Shared TypeScript types
│   │   └── index.ts      # Server entry point
│   ├── moods.json        # Local storage
│   ├── package.json
│   └── tsconfig.json
├── README.md
└── copilot-instructions.md




- **Why Flat**: Simplifies navigation and reduces nesting for Copilot’s context.
- **Key Files**:
  - `client/src/types.ts`: Single file for shared types (e.g., `Mood` interface).
  - `server/src/storage.ts`: Isolates JSON file read/write logic.

## Naming Conventions
- **Files**:
  - Components: PascalCase (e.g., `MoodForm.tsx`).
  - Other files: camelCase (e.g., `routes.ts`, `types.ts`).
- **Variables/Functions**:
  - camelCase (e.g., `fetchMoods`, `moodList`).
- **Interfaces**:
  - PascalCase (e.g., `Mood`, `MoodProps`).
- **Constants**:
  - UPPER_SNAKE_CASE (e.g., `API_URL`).
- **Why**: Consistency helps Copilot suggest relevant names and reduces refactoring.

## Example Copilot Prompts
- `// TypeScript: Create a React component for mood input form`
- `// TypeScript: Write an Express GET endpoint to read moods from JSON`
- `// TypeScript: Define a Mood interface with id, mood, note, date`

## Notes
- **Setup**:
  - Frontend: `npm create vite@latest client -- --template react-ts`
  - Backend: `npm init -y`, install `express`, `typescript`, `ts-node`, `cors`.
- **Run**:
  - Frontend: `cd client && npm run dev`
  - Backend: `cd server && npx ts-node src/index.ts`
- **Copilot Tips**:
  - Use `Ctrl+Enter` in VS Code to trigger suggestions.
  - Keep `types.ts` updated for better type inference.
  - Break large tasks into smaller prompts for accuracy.