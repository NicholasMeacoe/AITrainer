# Technology Stack: AITrainer

## Backend
- **Framework:** **Python (FastAPI)** for a modern, high-performance, and asynchronous backend that's ideal for AI/ML integrations and rapid API development.
- **Runtime:** **Python 3.11+** to leverage the latest language features and performance improvements.
- **ORM:** **SQLAlchemy** for powerful and flexible relational database mapping.
- **Migrations:** **Alembic** for robust database schema versioning and migrations.

## Frontend
- **Framework:** **React (TypeScript)** for building a robust, interactive, and type-safe user interface.
- **Styling:** **Vanilla CSS** for maximum flexibility and control over the platform's vibrant and engaging visual aesthetic.
- **State Management:** **React Context** or **Zustand** for managing complex application state (e.g., active persona, progress, sandbox state).
- **Drag-and-Drop:** **@hello-pangea/dnd** for providing a seamless visual interface for reordering learning modules.

## Database & Storage
- **Relational Database:** **SQLite** (Initial/Development) or **PostgreSQL** for storing user profiles, persona configurations, structured educational content, and progress tracking data.
- **Vector Database:** A specialized vector database (e.g., **Pinecone** or **PGVector**) for efficient semantic search and Retrieval-Augmented Generation (RAG) across the platform's learning material.

## AI & Machine Learning
- **Model Integration:** **AI Platform APIs** (e.g., OpenAI, Anthropic, Gemini) to power the interactive lessons and the AI sandbox.
- **Search & Retrieval:** **Vector Search/RAG** for providing context-aware answers and navigating the "End-to-End Curriculum."

## Infrastructure & DevOps
- **Deployment:** **Docker** for containerization, ensuring consistency across development and production environments.
- **CI/CD:** **GitHub Actions** for automated testing and deployment.
