# Database Schema — MySQL (Mermaid Diagram Included)

This file documents the DB structure for the authentication system.

---

# Mermaid ER Diagram

```mermaid
erDiagram
    USERS {
        int id PK
        varchar name
        varchar email UNIQUE
        varchar password_hash
        varchar reset_token NULL
        datetime created_at
    }
