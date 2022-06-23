# Todo

## E2E Tests for Login

These require a database object and a Stytch for the test end-user KJM with filled in phone-number and email.

[x] E2e test of login-by-email
[x] E2E test of login-by-phone

The following results were handled:

[x] Protect guarded route `/app` by requring a session object using Begin.com simple session support.
[x] Protect guard route `/logout` by requiring a session.
[x] Remove Stytch for session management in favor of built-in Begin.com sessions.
[x] Refactored AccountLogin.fql to not care about Stytch sessions


## Refactor Access/Auth Model for Signup

## E2E Tests for Signup

## Use Svelte components for PhoneNumber and Email
See POC app for reminders

## Other

[ ] Copy in all other FQL function source code