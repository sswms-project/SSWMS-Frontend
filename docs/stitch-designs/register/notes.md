# Register Screen

## Source

- Stitch HTML: `index.html`
- Assets folder: `assets/`

## Screen

- Name: Register tenant owner
- Route: `/register`
- User role: Public user / tenant owner
- Purpose: Allow a new tenant owner to register a company workspace and owner account.

## Data

- API endpoint: `POST /api/auth/register`
- Request body:
  - `tenantName`
  - `ownerName`
  - `phone`
  - `email`
  - `address`
  - `password`
  - `confirmPassword`
  - `acceptTerms`
- Response data: success message string.

## Interactions

- Submit register form.
- Link to login page.
- Accept terms checkbox.
- Display loading/submitting state while the request is in progress.
- Display validation errors near fields.
- Display success state after successful registration.
- Navigate to login after registration, or show a clear prompt to check email depending on the final product decision.

## Implementation Notes

- Treat the Stitch file as a visual reference only.
- Rebuild with Next.js App Router, React Hook Form, Zod, TanStack React Query, Axios client, Tailwind CSS, and existing `src/components/ui` primitives.
- Do not implement the Stitch OTP step unless backend phone OTP registration is confirmed for this flow.
- Backend auth docs currently describe email verification after registration.
- Map the visual region/province field carefully because the backend register API expects `address`.
