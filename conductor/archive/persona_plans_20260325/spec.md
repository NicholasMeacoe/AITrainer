# Specification: Persona-Based Learning Plan Management

## Overview
This feature introduces a comprehensive system for defining and managing educational tracks based on user personas. It empowers "AI Trainers" or administrators to construct customized module sequences, while allowing learners to select the persona that best matches their professional goals.

## Functional Requirements

### 1. Persona Management (CRUD)
- **Persona Dashboard:** A centralized view to browse, search, and manage all defined personas.
- **Creation/Editing:** Interface (Modal or Sidebar) to define persona details:
    - Name (e.g., Senior Engineer)
    - Description
    - Initial templates for common roles.
- **Deletion:** Ability to remove personas (with safety checks for active user assignments).

### 2. Plan Builder (Drag-and-Drop)
- **Module Sequencing:** A visual tool to order learning modules within a persona's track.
- **Metadata Definition:** For each plan, the ability to specify:
    - Target Competencies (skills gained).
    - Difficulty Level (Foundational, Intermediate, Advanced).
    - Estimated Time-to-Complete.

### 3. Creation Assistance
- **Template Support:** Pre-populated module roadmaps for standard industry roles.
- **AI-Assisted Drafting:** Integration with the backend AI service to generate a draft module sequence based on a persona's target goal.

### 4. Learner Persona Selection
- **User Interface:** A profile-level setting or initial onboarding flow allowing users to choose their active persona.
- **Dynamic Content:** The main application dashboard should filter and display modules based on the user's selected persona roadmap.

## Technical Requirements
- **Frontend:** React (TypeScript) components for the dashboard and drag-and-drop builder.
- **Backend:** FastAPI endpoints for Persona CRUD and plan-to-module associations.
- **Storage:** PostgreSQL for structured persona and sequence data.

## Acceptance Criteria
- [ ] An administrator can create a "Project Manager" persona from scratch or a template.
- [ ] Modules can be reordered using a drag-and-drop interaction.
- [ ] Changes to a persona's plan are persisted in the database.
- [ ] A learner can switch their active persona and see the corresponding module sequence on their dashboard.

## Out of Scope
- Creation of the actual educational content (video/text) for the modules.
- Advanced analytics for persona-wide progress (to be handled in a future track).
