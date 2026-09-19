---
title: Account & AI credits
---

# Account & AI credits

The Nomu account is the identity in the Kanocifer user system v3. The Nomu tool itself (capture, image cleanup, listing, catalog browse) **does not require sign-in** — only AI features (translation, NomuDesign generation, prompt optimization) use the Nomu account.

The Nomu account is fully independent of your Noon seller account: signing into Nomu does not read or affect your Noon session.

## Which features need sign-in

| Feature | Nomu sign-in required | Billing |
| --- | --- | --- |
| Capture from 1688 / noon source | No | Free |
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

Open the **Account** extension page (standalone `account.html`, entry points: popup / action sheet / Welcome onboarding). Three tabs:

- **Password sign-in** — username + password
- **Sign up** — username + email + email verification code
- **Email magic link** — enter email → backend sends a sign-in link → click the link in your browser to confirm

The magic link is the preferred passwordless option: the link carries a `device_id`, and once the browser's polling confirms the click, a session is issued automatically. The poll is guarded by an AbortController — closing the page stops it.

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