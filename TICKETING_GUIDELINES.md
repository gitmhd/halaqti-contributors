# Halaqti-Contributors Ticketing Guidelines

This document defines standards for creating and managing tickets in the halaqti-contributors repository. Following these guidelines ensures clarity, traceability, and consistent workflow for all contributors.

---

## 1. Ticket Title

- **Use imperative mood**: start with verbs like `Implement`, `Fix`, `Add`, `Refactor`, `Document`.
- **Be concise and descriptive** (5–10 words ideally).
- Avoid filler words and unnecessary phrases.

**Examples:**

```
Implement IndexedDB utility for Quranic data
Add tests for surah fetch logic
Refactor data structure interfaces
Document usage of saveQuranData function
Fix error handling in getAyah
```

---

## 2. Ticket Description

Include the following sections:

### a) **Summary**

- Short description of the utility, feature, or fix.

### b) **Steps to Reproduce** (for bug reports)

- Numbered steps to reproduce the bug (if applicable).

### c) **Expected Behavior**

- Describes what the utility or function should do once the issue is fixed or the feature works correctly.
- Written from a **functional perspective** (what the user or consuming project should experience).

### d) **Acceptance Criteria**

- Defines the **specific, measurable conditions** that must be met for the ticket to be considered complete.
- Serves as a checklist for review and final sign-off.

### e) **Actual Behavior** (for bugs)

- What currently happens.

### f) **Additional Information**

- Screenshots, links, or references to related tickets or documentation.

**Example:**

```
Summary:
Implement a function to fetch and store a surah from a given API URL.

Expected Behavior:
- Function fetches surah data from the provided URL and stores it in IndexedDB.
- Returns the surah data as a typed object.

Acceptance Criteria:
- Function is abstract and promise-based.
- Includes JSDoc comments.
- Handles errors gracefully.

Labels:
feature, utility
```

---

## 3. Labels

Use labels to categorize tickets for easier filtering:

- `feature` → New utility, function, or enhancement
- `bug` → Issue that breaks or limits functionality
- `documentation` → Docs or guides
- `chore` → Maintenance tasks
- `urgent` → Needs immediate attention
- `test` → Testing or test coverage

---

## 4. Scope / Module

Assign tickets to the relevant module or utility area:

- `indexeddb` → IndexedDB utilities
- `quran` → Quranic data structures or logic
- `tests` → Testing utilities or coverage
- `docs` → Documentation

This will also be reflected in the **branch name**.

---

## 5. Branch Naming

Follow the branch naming convention:

```
<ticket_type>/<module>-<ticket_number>_<purpose>
```

- **ticket_type** → `feature`, `fix`, `chore`, `docs`, `test`
- **module** → Utility or logic area (e.g., `indexeddb`, `quran`, `tests`)
- **ticket_number** → GitHub issue number
- **purpose** → Short description

**Example:**

```
feature/indexeddb-12_add-get-surah-function
fix/quran-7_handle-empty-surah
docs/indexeddb-15_document-initializeDB
```

---

## 6. Workflow

1. **Create ticket** → Fill title, description, labels, and module.
2. **Assign ticket** → Contributor picks up or is assigned the task.
3. **Branch creation** → Create a feature/fix branch following the naming convention.
4. **Development** → Implement changes on the branch.
5. **PR & Code Review** → Open a Pull Request, get approval, and merge into `dev` or `main` as appropriate.
6. **Close Ticket** → Mark the ticket as resolved/closed after merge.

---

## 7. Additional Tips

- Link the ticket in commits and PRs for traceability.
- Keep descriptions clear and actionable.
- Include references to related tickets or documentation if applicable.
- Always update the ticket status according to workflow progress.
- Ensure all code is abstract, reusable, and does not include project-specific logic.

---
