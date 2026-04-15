# Specification: Interactive Lessons & Content Modules

## Objective
The objective of this track is to implement the core educational content delivery system for AITrainer. This includes creating a backend for lessons within modules and a frontend for learners to interact with those lessons.

## Core Features
1. **Lesson Management (Backend):**
    - A `Lesson` entity related to a `Module`.
    - Lessons should have a title, content (Markdown), type (`markdown`, `quiz`), and an order within the module.
    - Support for multiple-choice quiz questions within a `Lesson` (potentially as a JSON structure in the `content` field or a separate related model).
    - API endpoints for Lesson CRUD operations.

2. **Lesson Rendering (Frontend):**
    - A `LessonViewer` component to display the content of a module.
    - Integration of a Markdown rendering library (e.g., `react-markdown`).
    - An interactive `Quiz` component for `quiz` type lessons.
    - Navigation controls to move to the next/previous lesson in the module.

3. **Progress Tracking (Initial):**
    - Keep track of which lesson the user is currently on in a given module.

## Technical Details
- **Backend:**
    - Python/FastAPI with SQLAlchemy.
    - Database migrations for the new `Lesson` table.
- **Frontend:**
    - React/TypeScript.
    - `react-markdown` for content rendering.
    - Vanilla CSS for styling.

## Out of Scope
- **AI Sandbox:** This will be a separate track.
- **User Authentication:** Assuming a simple local/prototype environment for now.
- **Complex Analytics:** Simple completion tracking only.
