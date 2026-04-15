# Specification: Implement environment-based configuration

## Objective
Ensure the application can be deployed to multiple environments by removing hardcoded configurations.

## Core Features
1. **Backend Config:** Use `pydantic-settings` to manage CORS origins and database URLs.
2. **Frontend Config:** Use Vite environment variables for the API base URL.
