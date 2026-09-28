---
title: Account & AI credits
---

# Account & AI credits

The Nomu account is the identity in the Kanocifer user system v3. The Nomu tool itself (capture, image cleanup, listing, catalog browse) **does not require sign-in** — only AI features (translation, NomuDesign generation, prompt optimization) use the Nomu account.

The Nomu account is fully independent of your Noon seller account: signing into Nomu does not read or affect your Noon session.

## Which features need sign-in

| Feature | Nomu sign-in required | Billing |
| --- | --- | --- |
| Capture from 1688 / Taobao / Tmall / JD / noon source | No | Free |
| Local image compliance processing | No | Free |
| Listing pipeline (product/create → activate) | No | Free |
| Duplicate product | No | Free |
| Catalog browse / quick search | No | Free |
| Live FX rates | No | Free |
| AI translation (Chinese → English / Arabic) | Yes | Consumes credits |
| NomuDesign generation | Yes | Consumes credits |
| AI prompt optimization | Yes | Consumes credits |

When not signed in or the session has expired, translation, generation, and prompt optimization are unavailable. Capture, image cleanup, and listing are **not** affected.

## Sign-in methods

Open the **Account** extension page (standalone `account.html`, entry points: toolbar popup / action sheet / online status modal). When signed out there are two tabs:

- **Email link** — enter your email → the backend sends a one-time sign-in link → click the link in your browser to confirm. The link is valid for 10 minutes, and the page shows a countdown of the remaining time
- **Verification code** — enter your email, receive a 6-digit code (valid for 5 minutes), type it in to sign in

Neither tab needs a password. The email link carries a `device_id`; once the extension's polling confirms the click, a session is issued automatically. The poll is guarded by an AbortController — closing the page stops it.

Two outbound links sit at the bottom of the account page, both pointing to the website:

- "No account yet? Sign up at nomu.kanocifer.chat" → <https://nomu.kanocifer.chat/register>
- "Forgot your password? Reset it at kanocifer.chat" → <https://nomu.kanocifer.chat/forgot-password>

**There is no sign-up form and no password sign-in inside the extension** — both happen on the website.

## Signing up for a Nomu account

Sign-up page: <https://nomu.kanocifer.chat/register>

Capture, listing, and the rest of the main flow work without signing in. An account only unlocks AI translation, NomuDesign generation, and prompt optimization.

1. Fill in a username (3–50 characters), email, password (at least 6 characters), and the password confirmation
2. Hit **Send code** next to the verification field, copy the 6 digits from the email, and paste them in. The button then runs a 60-second countdown before it can send again
3. Click **Sign up**
4. On the success card, **Install Nomu** jumps straight to the Chrome Web Store; **Back home** returns to the landing page

A successful sign-up **does not create a session**. To start using the AI features, go back to the extension's account page and sign in once with the email you just registered (email link or verification code, your pick).

The code is 6 digits and may start with a 0 — don't drop the leading digit.

## Forgot your password

Reset page: <https://nomu.kanocifer.chat/forgot-password> (the account page footer links straight to it). The whole flow is two steps.

**Step 1 · Request the reset email**: enter the email you registered with and click **Send reset email**. The page always shows "If that email is registered, a reset email has been sent." — whether or not the email is registered, and even if the request fails, it moves on to step 2. That's deliberate: it stops anyone using this page to probe which emails have accounts.

**Step 2 · Verify and set a new password**: copy the 6-digit code from the email (valid for 5 minutes), enter a new password (at least 6 characters, and not the same as the old one) plus its confirmation, then click **Reset password**. On success you get a confirmation card with a link to install Nomu.

- Wrong email? Step 2 shows the address it was sent to with a **Change email** link that takes you back to step 1
- "Invalid code or email not registered": the code is wrong or expired, or that email never registered — the page gives the same sentence for all three
- "Session expired, request the code again": you refreshed the page between the two steps. Step 2 depends on a one-time session token handed back by step 1, and refreshing kills it — go back to step 1
- "Please choose a password you have not used before": the new password matches the old one

## Session & multi-device

- The session is stored under `chrome.storage.local` in the `noonTool.authSession` key. Both access and refresh tokens live locally.
- **Single-session model**: signing in on a new device invalidates the old session (the backend uses a fixed `refresh:<uid>` key, so multiple ends push each other off).
- Logout clears local tokens immediately; the extension, account page, and task panel all log out together.

## AI credits card

The second card on the account page is **AI credits** — balance + latest 10 transactions. Transaction sources:

| Source | Meaning |
| --- | --- |
| `translate` | General translation |
| `nomu_prompt_optimize` | Prompt optimization |
| `design_generate` | NomuDesign generation |

- The page automatically pulls balance and transactions on open
- Concurrent consumption is judged by the server-side `402`; the client doesn't pre-check
- The **Refresh** button manually re-pulls
- Errors like insufficient balance / rate limit / service unavailable are shown explicitly

> Detailed data collection and credit rules are in the [Privacy policy](/en/privacy/).

## Error codes

AI requests may throw these error codes (from the user's perspective):

| Error | Meaning | Suggested action |
| --- | --- | --- |
| `auth_required` | Not signed in | Jump to account page to sign in |
| `auth_expired` | Sign-in expired | Sign in again |
| `insufficient_credits` | Insufficient credits | Contact the admin to top up |

The backend's error message is shown verbatim in the toast for easier diagnosis.

## Idempotency & retry billing

AI requests carry idempotency keys — timeout retries do not double-charge; the backend dedupes on the idempotency key. So feel free to hit **Retry** — failed tasks retried in the [Task panel](./tasks) do not double-charge.

## FAQ

### Signed in but still seeing `auth_required`?

- Check `chrome.storage.local`'s `noonTool.authSession` — it may have been cleared by another extension or a cleanup tool
- Signing in on another device kicks the old session off — make sure no other device is logged in

### Credits went negative?

Concurrent consumption is judged server-side; the client does not pre-check. Negative usually means a task is still running and hasn't settled. Refresh the credits card.

### How do I delete my Nomu account?

Logout only clears local tokens. To fully delete the account, email the admin.

### Do I still need to sign in after signing up?

Yes. Sign-up only creates the account on the website and creates no session; the AI features need one sign-in from the extension's account page.

### The verification email never arrived

Check spam first. The code is one-time and valid for 5 minutes — resend once it expires. Login codes are rate-limited on the server too, so wait a minute before resending.