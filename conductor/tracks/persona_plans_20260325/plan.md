# Implementation Plan: Persona-Based Learning Plan Management

## Phase 1: Backend Foundation (Persona Model & CRUD) [checkpoint: 07559fc]
- [x] Task: Define Persona Database Schema and Model [b9c8a99]
    - [ ] Write tests for Persona model validation.
    - [ ] Implement SQLAlchemy model for Personas (Name, Description, Template flag).
    - [ ] Create database migration.
- [x] Task: Implement Persona CRUD API Endpoints [aa26228]
    - [ ] Write failing tests for GET, POST, PUT, DELETE /api/v1/personas.
    - [ ] Implement FastAPI endpoints for persona management.
    - [ ] Verify coverage >80% for persona endpoints.
- [x] Task: Conductor - User Manual Verification 'Backend Foundation' [07559fc] (Protocol in workflow.md)

## Phase 2: Plan Builder Logic (Sequencing & Metadata) [checkpoint: 3704665]
- [x] Task: Implement Plan Metadata & Module Association [ceffbec]
    - [ ] Write tests for Plan-Module association logic.
    - [ ] Implement models for Plan Sequences (Target Competencies, Difficulty, Duration).
    - [ ] Create endpoints to associate modules with a persona track.
- [x] Task: Implement AI-Assisted Drafting Endpoint [2f43ce3]
    - [ ] Write tests for the AI drafting service (mocking external LLM).
    - [ ] Implement endpoint to generate a draft module sequence from a persona goal.
- [x] Task: Conductor - User Manual Verification 'Plan Builder Logic' [3704665] (Protocol in workflow.md)

## Phase 3: Frontend - Persona Dashboard [checkpoint: d01ebff]
- [x] Task: Create Persona Dashboard Components [5aa9426]
    - [ ] Write Vitest tests for PersonaList and PersonaCard components.
    - [ ] Implement React components to browse and search personas.
- [x] Task: Implement Persona Creation/Edit UI [b01f8f9] (Modal/Sidebar)
    - [ ] Write tests for the Persona form and validation logic.
    - [ ] Implement Modal/Sidebar interface for persona CRUD.
- [x] Task: Conductor - User Manual Verification 'Persona Dashboard' [d01ebff] (Protocol in workflow.md)

## Phase 4: Frontend - Drag-and-Drop Plan Builder [checkpoint: 24abb74]
- [x] Task: Implement Drag-and-Drop Sequencing Interface [15fbfbc]
    - [ ] Write tests for reordering logic and component rendering.
    - [ ] Implement visual plan builder using a drag-and-drop library.
- [x] Task: Integrate Plan Metadata Forms [6f90732]
    - [ ] Write tests for Competency/Difficulty inputs.
    - [ ] Implement UI to set plan-specific attributes.
- [x] Task: Conductor - User Manual Verification 'Plan Builder UI' [24abb74] (Protocol in workflow.md)

## Phase 5: User Selection & Onboarding Flow
- [x] Task: Implement User Persona Selection UI [9f301a0]
    - [ ] Write tests for the persona selection interaction.
    - [ ] Create a settings/onboarding component for learners to choose their persona.
- [x] Task: Dynamic Dashboard Module Filtering [c901614]
    - [ ] Write tests for dashboard content filtering based on active persona.
    - [ ] Update the learner dashboard to fetch and display the selected persona's roadmap.
- [ ] Task: Conductor - User Manual Verification 'User Selection & Integration' (Protocol in workflow.md)
