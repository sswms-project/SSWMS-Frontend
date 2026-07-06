# AI Workflow

This document explains how AI agents should choose design skills and implementation rules for SSWMS Frontend.

## Skill Selection

Use `stitch-design-taste` when creating or improving Google Stitch design prompts, Stitch-facing design rules, or a Stitch-oriented `DESIGN.md`.

Use `design-taste-frontend` selectively when implementing public or auth screens such as:

- Login
- Register
- Forgot password
- Reset password
- Verify email

Apply only the relevant quality checks from `design-taste-frontend`, such as contrast, responsive layout, form states, loading states, error states, and avoiding generic AI-looking UI. Do not apply its landing-page guidance blindly to product screens.

Do not use `design-taste-frontend-v1` unless the user explicitly requests it. It is kept for backward compatibility and may conflict with this project's design system.

## Project Priority Order

For dashboard, inventory, warehouse, admin, data table, and operational product UI, prioritize the project rules in this order:

1. `AGENTS.md`
2. `.rules`
3. `docs/DESIGN_SYSTEM.md`
4. `docs/stitch-designs/README.md`
5. Existing `src/components/ui` primitives
6. Existing feature patterns under `src/features`

External design skills are advisory. They should not override this project's functional requirements, code rules, component system, or API integration patterns.

## Stitch Implementation Workflow

When implementing a screen from Stitch HTML:

- Treat Stitch as a visual reference only.
- Do not copy generated HTML/CSS directly into the app as static UI.
- Read the screen folder under `docs/stitch-designs/<screen>/`.
- Read `notes.md` if it exists.
- Infer missing product behavior before coding.
- Rebuild the screen as a functional Next.js feature.
- Connect API, state, validation, navigation, and loading/error/success states.
- Use React Hook Form + Zod for forms.
- Use TanStack React Query for API reads and mutations.
- Use the shared Axios client from `src/lib/axios.ts`.
- Reuse `src/components/ui` before creating new primitives.
- Put feature-specific composition in `src/features/<feature>/components/`.
- Do not leave dead buttons, fake filters, static tables, or placeholder-only forms unless explicitly marked as mock.

## Register Screen Notes

For the register flow, backend currently exposes:

```text
POST /api/auth/register
```

Expected request fields:

```text
tenantName
ownerName
phone
email
address
password
confirmPassword
acceptTerms
```

The backend registration flow sends an email verification link after successful registration. Do not implement a phone OTP registration step unless the backend contract is updated or the user explicitly asks for a mock/prototype.

## Final Check Before Delivery

Before presenting an implemented screen, verify:

- The UI follows `docs/DESIGN_SYSTEM.md`.
- Existing `src/components/ui` primitives are reused where possible.
- The screen works on desktop and mobile.
- Buttons, links, and form submissions have real handlers.
- Loading, error, empty, success, and disabled/submitting states are handled.
- Form validation messages appear near the relevant fields.
- API payload names match the backend contract.
- The implementation does not silently introduce unrelated refactors.
