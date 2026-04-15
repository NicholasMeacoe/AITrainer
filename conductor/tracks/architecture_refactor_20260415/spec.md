# Specification: Refactor architecture (Service Layer & API Client)

## Objective
Refactor the codebase to address architectural flaws by introducing a backend service layer and a centralized frontend API client.

## Core Features
1. **Backend Service Layer:** Extract business logic from FastAPI routers (e.g., `personas.py`, `modules.py`) into dedicated service classes.
2. **Frontend API Client:** Create a centralized Axios or Fetch wrapper to handle API requests, base URLs, and global error handling.
