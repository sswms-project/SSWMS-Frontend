# Verify 2FA Screen

## Source

- Stitch HTML: `index.html`
- Assets folder: `assets/`

## Screen

- Name: Verify two-factor authentication
- Route: `/verify-2fa`
- User role: Public user after successful login step that requires 2FA
- Purpose: Allow a user to enter a 6-digit authenticator OTP and complete sign-in.

## Data

- API endpoint: `POST /api/auth/verify-2fa`
- Request body:
  - `tempToken`
  - `otp`
- Response data:
  - `accessToken`
  - `refreshToken`
  - `expiresIn`
  - `requires2FA`
  - `tempToken`

## Interactions

- Enter 6 numeric OTP digits.
- Auto-focus the next input after each digit.
- Move to previous input on backspace.
- Submit OTP.
- Display loading/submitting state while verifying.
- Display validation errors and API errors.
- Navigate into the app after successful verification.
- Provide a safe way to go back to login if the user entered the wrong account.

## Implementation Notes

- Treat the Stitch file as a visual reference only.
- Rebuild with Next.js App Router, React Hook Form or controlled state, Zod, TanStack React Query, Axios client, Tailwind CSS, and existing `src/components/ui` primitives.
- Do not use this screen for email verification. Email verification uses `GET /api/auth/verify-email?token=<token>`.
- The OTP in this flow is TOTP from Google/Microsoft Authenticator according to backend auth docs, not phone SMS OTP.
- The screen should require a `tempToken` from the login response before allowing verification.
