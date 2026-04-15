# Implementation Plan: Interactive Lessons & Content Modules

## Phase 1: Backend Foundation (Lessons & Migration) [checkpoint: 3737095]
- [x] Task: Define Lesson Model and Schema [283002b]
    - [x] Create `backend/app/models/lesson.py`.
    - [x] Add `Lesson` with fields: `id`, `module_id`, `title`, `content` (Markdown string), `type` (enum), `order`.
    - [x] Create `backend/app/schemas/lesson.py` (Pydantic models).
- [x] Task: Database Migration for Lessons [3737095]
    - [x] Generate an Alembic migration for the `lessons` table.
    - [x] Apply the migration.
- [x] Task: Conductor - User Manual Verification 'Backend Foundation' [3737095] (Protocol in workflow.md)

## Phase 2: Lesson API Endpoints [checkpoint: 125ffbe]
- [x] Task: Implement Lesson CRUD Endpoints [125ffbe]
    - [x] Add failing tests for `/api/v1/modules/{module_id}/lessons`.
    - [x] Implement CRUD for lessons within modules.
    - [x] Add tests to verify `/api/v1/modules/{module_id}/lessons` correctly returns the module's lessons in order.
- [x] Task: Conductor - User Manual Verification 'Lesson API' [125ffbe] (Protocol in workflow.md)

## Phase 3: Frontend Content Rendering [checkpoint: 55c858c]
- [x] Task: Implement LessonViewer Component [55c858c]
    - [x] Install `react-markdown`.
    - [x] Create `frontend/src/components/lesson/LessonViewer.tsx`.
    - [x] Implement rendering logic for Markdown content.
- [x] Task: Implement Quiz Component [55c858c]
    - [x] Create `frontend/src/components/lesson/Quiz.tsx` for multiple-choice questions.
    - [x] Add interactivity (select answer, check result).
- [x] Task: Navigation & Module Integration [55c858c]
    - [x] Add "Next" and "Previous" buttons to the `LessonViewer`.
    - [x] Integrate the `LessonViewer` into the module/persona learning path flow.
- [x] Task: Conductor - User Manual Verification 'Frontend Rendering' [55c858c] (Protocol in workflow.md)

## Phase 4: Integration and Polish [checkpoint: 53d1790]
- [x] Task: Module Lesson Order Management [53d1790]
    - [x] Ensure that lessons are consistently retrieved and navigated according to the `order` field.
- [x] Task: Final Review & Polish [53d1790]
    - [x] Refine styling (CSS).
    - [x] Ensure consistent tone/voice according to product guidelines.
- [x] Task: Conductor - User Manual Verification 'Interactive Lessons Integration' [53d1790] (Protocol in workflow.md)

## Phase: Review Fixes
- [x] Task: Apply review suggestions [388e518]
