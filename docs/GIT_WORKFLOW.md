# Git Workflow

This document defines the Git workflow for SSWMS Frontend. Follow it when creating branches, committing work, merging changes, or pushing to the remote repository.

## Branching Rules

- Do not develop new features directly on `main`.
- Create a new branch for every feature, bug fix, UI screen, refactor, documentation change, or experiment.
- Start new branches from the latest `main`.
- Before creating a branch, run:

```bash
git checkout main
git pull origin main
```

## Branch Naming

Use short, descriptive branch names with a work type and ticket/task code.

```text
<type>/sswms-<number>-<short-description>
```

Examples:

```text
feat/sswms-12-register-screen
fix/sswms-18-login-validation
ui/sswms-21-inventory-table
docs/sswms-25-git-workflow
refactor/sswms-31-auth-api-hooks
chore/sswms-40-update-dependencies
```

Allowed branch types:

- `feat`: New user-facing feature or product behavior.
- `fix`: Bug fix.
- `ui`: Visual/interface-only implementation or redesign.
- `docs`: Documentation-only change.
- `refactor`: Code structure change without intended behavior change.
- `test`: Test-only change.
- `chore`: Maintenance, dependency, config, or tooling change.

## Commit Rules

- Commit only files related to the current task.
- Do not include unrelated local changes in the same commit.
- Check the working tree before committing:

```bash
git status --short --branch
```

- Use clear commit messages in this format:

```text
<type>(sswms-<number>): <short summary>
```

Examples:

```text
feat(sswms-12): add register screen
fix(sswms-18): validate tenant code on login
ui(sswms-21): build inventory table layout
docs(sswms-25): add git workflow
refactor(sswms-31): split auth API hooks
chore(sswms-40): update lint config
```

If no ticket/task number exists, use a concise scope instead:

```text
docs(project): add frontend design guidelines
chore(repo): update agent instructions
```

## Before Pushing

Before pushing a branch, verify:

- The current branch is correct.
- The remote is correct.
- Only intended files are committed.
- The app passes the relevant local checks for the change.

Recommended commands:

```bash
git status --short --branch
git remote -v
```

For code changes, run the relevant checks when dependencies are installed:

```bash
npm run lint
npm run build
```

For documentation-only changes, tests are not required, but the changed files should still be reviewed.

## Pull Request And Merge Rules

- Push feature branches to `origin`.
- Open a pull request from the feature branch into `main`.
- Do not merge directly into `main` without review unless the team explicitly allows it.
- Use a pull request title in this format:

```text
<type>(sswms-<number>): <short summary>
```

Example:

```text
feat(sswms-12): add register screen
```

- Before merge, confirm the branch is up to date with `main`.
- Prefer squash merge for feature branches when the team wants a clean history.
- Delete merged feature branches after the pull request is merged.

## Safety Rules

- Never use destructive Git commands unless explicitly requested:

```bash
git reset --hard
git checkout -- <file>
git clean -fd
git push --force
```

- Do not rewrite shared history unless the team explicitly approves it.
- Do not revert or overwrite changes you did not make.
- If the working tree contains unrelated changes, leave them alone and commit only the current task files.
- If a conflict happens, resolve it deliberately and verify the affected files before committing.

## AI Agent Rules

When an AI agent works in this repository:

- Read this file before creating branches, commits, merges, or pushes.
- Ask for confirmation before creating a branch if the user did not specify the task code.
- Use the branch format `feat/sswms-xx-short-description` for new features unless the user specifies another type.
- Use commit messages like `feat(sswms-xx): short summary`.
- Run `git status --short --branch` before and after Git operations.
- Never force push or run destructive Git commands without explicit user approval.
