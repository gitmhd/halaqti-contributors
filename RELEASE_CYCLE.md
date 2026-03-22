# Halaqti Release Cycle

This document outlines the release cycle for Halaqti. It defines the steps code must follow from assignment to production deployment, ensuring quality, traceability, and team alignment.

---

## Branching Strategy

- **main** → Integration-ready branch. Only tested, approved code goes here.
- **dev** → Active development branch. Push point for all features and fixes.
- **feature/\*** → Temporary branches created for each task or bug fix (e.g. GitHub Issue).

---

## Release Workflow

### **1. Task Assignment**

- A new feature branch (e.g. Github Issue) is created from `dev`.
- Naming convention:

  ```
  <ticket_type>/<business_group>-<ticket_number>_purpose
  ```

  #### Explanation of the convention:

  - **`<ticket_type>`** → Describes what kind of work the branch is for.
    - Examples: `feature/`, `fix/`, `hotfix/`, `chore/`, `utils`.
  - **`<business_group>`** → Refers to the product area or team domain (e.g., `claims`, `student-board`, `instructor-board`, 'mushaf-halaqti').
  - **`<ticket_number>`** → Links the branch to a specific ticket in the issue tracker (e.g., Jira, Trello, GitHub Issues).
  - **`_purpose`** → Short description of the change (e.g., `add-policy-comparison`, `fix-login-redirect`).

  #### Example:

  ```
  feature/claims-45_add-policy-comparison
  ```

  - `feature/` → This branch adds a new feature.
  - `claims` → Belongs to the claims module.
  - `45` → Connected to ticket #45.
  - `_add-policy-comparison` → Purpose is to add a policy comparison feature.

---

### **2. Development**

- Developer implements changes on the feature branch.
- Code is regularly committed with meaningful commit messages (see **Commit Message Guidelines**).
- When the task is complete, a Pull Request (PR) is opened against `dev`.

---

### **3. Code Review**

- Peer review is required before merging into `dev`.
- Reviewer checks for:
  - Code quality and readability
  - Adherence to standards
  - Potential bugs or performance issues
- Once approved, feature branch is merged into `dev` and deleted.

---


### **4. Production Release**

- Once `dev` is approved, `dev` is merged into `main`.

---

### **6. Post-Release**

- Monitor logs and errors after release.
- Hotfixes (if needed) follow the same process:
  - Create `fix/` branch → merge into `dev` → `main`.

---

## Commit Message Guidelines

To maintain clarity in version control history, Halaqti follows a lightweight convention:

```
<type>(<scope>): <short summary>
```

- **Types**:

  - `utils` → utility functions for indexedDB
  - `fix` → Bug fix
  - `docs` → Documentation changes
  - `style` → Code style (formatting, missing semi-colons, etc.)
  - `refactor` → Code changes that don’t fix bugs or add features
  - `test` → Adding or modifying tests
  - `chore` → Maintenance tasks (e.g., build, dependencies)


- **Scope**: Optional, module or area affected (e.g., `auth`, `jobs`, `dashboard`).
- **Summary**: A concise description in imperative tone.

#### Examples:

```
feat(utills): add getSurah function
docs: update release cycle documentation
```

This ensures branch names, commits, and PR titles align for better traceability.

---

