# Implementation Plan: Persona-Based Learning Plan Management

## Phase 1: Backend Foundation (Persona Model & CRUD)
- [x] Task: Define Persona Database Schema and Model [b9c8a99]
    - [ ] Write tests for Persona model validation.
    - [ ] Implement SQLAlchemy model for Personas (Name, Description, Template flag).
    - [ ] Create database migration.
- [ ] Task: Implement Persona CRUD API Endpoints
    - [ ] Write failing tests for GET, POST, PUT, DELETE /api/v1/personas.
    - [ ] Implement FastAPI endpoints for persona management.
    - [ ] Verify coverage >80% for persona endpoints.
- [ ] Task: Conductor - User Manual Verification 'Backend Foundation' (Protocol in workflow.md)

## Phase 2: Plan Builder Logic (Sequencing & Metadata)
- [ ] Task: Implement Plan Metadata & Module Association
    - [ ] Write tests for Plan-Module association logic.
    - [ ] Implement models for Plan Sequences (Target Competencies, Difficulty, Duration).
    - [ ] Create endpoints to associate modules with a persona track.
- [ ] Task: Implement AI-Assisted Drafting Endpoint
    - [ ] Write tests for the AI drafting service (mocking external LLM).
    - [ ] Implement endpoint to generate a draft module sequence from a persona goal.
- [ ] Task: Conductor - User Manual Verification 'Plan Builder Logic' (Protocol in workflow.md)

## Phase 3: Frontend - Persona Dashboard
- [ ] Task: Create Persona Dashboard Components
    - [ ] Write Vitest tests for PersonaList and PersonaCard components.
    - [ ] Implement React components to browse and search personas.
- [ ] Task: Implement Persona Creation/Edit UI (Modal/Sidebar)
    - [ ] Write tests for the Persona form and validation logic.
    - [ ] Implement Modal/Sidebar interface for persona CRUD.
- [ ] Task: Conductor - User Manual Verification 'Persona Dashboard' (Protocol in workflow.md)

## Phase 4: Frontend - Drag-and-Drop Plan Builder
- [ ] Task: Implement Drag-and-Drop Sequencing Interface
    - [ ] Write tests for reordering logic and component rendering.
    - [ ] Implement visual plan builder using a drag-and-drop library.
- [ ] Task: Integrate Plan Metadata Forms
    - [ ] Write tests for Competency/Difficulty inputs.
    - [ ] Implement UI to set plan-specific attributes.
- [ ] Task: Conductor - User Manual Verification 'Plan Builder UI' (Protocol in workflow.md)

## Phase 5: User Selection & Onboarding Flow
- [ ] Task: Implement User Persona Selection UI
    - [ ] Write tests for the persona selection interaction.
    - [ ] Create a settings/onboarding component for learners to choose their persona.
- [ ] Task: Dynamic Dashboard Module Filtering
    - [ ] Write tests for dashboard content filtering based on active persona.
    - [ ] Update the learner dashboard to fetch and display the selected persona's roadmap.
- [ ] Task: Conductor - User Manual Verification 'User Selection & Integration' (Protocol in workflow.md)
