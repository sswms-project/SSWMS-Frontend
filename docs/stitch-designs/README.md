# Stitch Designs

This folder stores Google Stitch HTML exports, screenshots, assets, and design notes used as references for SSWMS frontend implementation.

Stitch files are visual references only. Do not copy generated HTML/CSS directly into the app as static UI.

When implementing a Stitch design, analyze the screen as a real product feature before coding. The final implementation must be a functional Next.js feature with real state, API integration, validation, navigation, and working interactions.

## Required Workflow

1. Read `../DESIGN_SYSTEM.md` and apply the SSWMS visual system.
2. Review the Stitch HTML, screenshots, assets, and notes for the target screen.
3. Identify the business purpose of the screen.
4. Identify all user actions, including buttons, links, filters, search, forms, dialogs, tabs, pagination, and row actions.
5. Identify required data, including API endpoints, query params, request body, response fields, empty state, loading state, and error state.
6. Identify form validation rules and map them to React Hook Form + Zod.
7. Identify navigation behavior after successful actions.
8. Identify permission or role-based behavior if relevant.
9. Check existing reusable UI primitives in `src/components/ui` before creating new visual components.
10. Rebuild the UI using project patterns, not pasted static HTML.
11. Verify that interactions work and that no visible control is dead unless explicitly documented as unavailable.

## Implementation Rules

- Treat Stitch as a visual reference, not source code.
- Do not implement Stitch designs as static pages.
- Do not leave dead buttons, fake filters, static tables, or placeholder-only forms unless they are explicitly marked as mock.
- Use mock data only when the backend API is unavailable, and isolate it so it can be replaced easily.
- Reuse existing project patterns: Next.js App Router, TypeScript, TanStack React Query, Axios client, shadcn/ui primitives, Tailwind CSS, and `docs/DESIGN_SYSTEM.md`.
- Use React Hook Form + Zod for forms.
- Use TanStack React Query for server state and mutations.
- Handle loading, error, empty, success, and disabled/submitting states.
- Use existing API hooks and query keys when they exist before creating new ones.
- Reuse existing components from `src/components/ui` before creating new UI components.
- Do not duplicate button, input, card, dialog, table, select, badge, dropdown, tooltip, or form primitives unless the existing component cannot support the required behavior.
- Put screen-specific UI in `src/features/<feature>/components/` only when it represents feature behavior or composition, not a duplicated primitive.
- Keep business logic out of visual-only components when a feature-level hook or service layer is more appropriate.
- Prefer accessible, semantic controls over div-only interactions.

## Suggested Folder Structure

```text
docs/
  stitch-designs/
    README.md
    dashboard/
      index.html
      notes.md
      assets/
    login/
      index.html
      notes.md
      assets/
    inventory/
      index.html
      notes.md
      assets/
```

## Screen Implementation Brief

Before coding any screen from Stitch, create or infer this brief.

```md
# Screen Implementation Brief

## Screen

- Name:
- Route:
- User role:
- Purpose:

## Data

- API endpoint:
- Query params:
- Request body:
- Response fields:
- Mutations/actions:

## Interactions

- Primary actions:
- Secondary actions:
- Filters/search:
- Table row actions:
- Dialogs/drawers:
- Navigation after success:

## States

- Loading:
- Error:
- Empty:
- Success:
- Disabled/submitting:

## Validation

- Form schema:
- Required fields:
- Error messages:

## Implementation Notes

- Components to create/reuse:
- Hooks to create/reuse:
- Files to update:
- Known backend gaps or mock data:
```

## Conversion Checklist

- The screen follows `docs/DESIGN_SYSTEM.md`.
- The implementation uses Next.js App Router conventions.
- UI components are React/TypeScript components, not pasted HTML.
- Existing primitives from `src/components/ui` are reused where possible.
- Forms use React Hook Form + Zod.
- API reads use TanStack React Query.
- API writes use TanStack React Query mutations.
- Buttons, links, filters, and row actions have working handlers.
- Tables are wired to data, loading, error, and empty states.
- Form submit states disable duplicate submissions.
- Errors are visible to the user and logged when appropriate.
- Mock data, if any, is clearly isolated and documented.
