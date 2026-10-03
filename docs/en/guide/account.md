---
title: Account & AI credits
description: "Nomu account and AI credits: using Nomu requires signing in, capture, image work, listing and catalog browse included. AI translation, NomuDesign generation and prompt optimization are additionally billed by credits."
---

# Account & AI credits

Every Nomu feature needs a signed-in Nomu account. AI translation, NomuDesign generation and AI prompt optimization cost credits on top of that.

Your Nomu account and your Noon seller account are separate. Signing in to Nomu neither reads nor touches your Noon session.

## Which features need sign-in

Apart from the rows the Billing column marks as consuming credits, every other feature needs a signed-in Nomu account too, it just isn't billed.

| Feature | Nomu sign-in required | Billing |
| --- | --- | --- |
| Capture from 1688 / Taobao / Tmall / JD / noon source | Yes | Free |
| Local image compliance processing | Yes | Free |
| Listing pipeline | Yes | Free |
| Duplicate product | Yes | Free |
| Catalog browse / quick search | Yes | Free |
| Live FX rates | Yes | Free |
| AI translation (Chinese to English / Arabic) | Yes | Consumes credits |
| NomuDesign generation | Yes | Consumes credits |
| AI prompt optimization | Yes | Consumes credits |

For what each AI call actually costs, open the **Credit prices** tab on the account page. Those numbers come from the server price table, so a price change shows up there without waiting for the docs to catch up.

Signed out, the extension's pages are replaced by a sign-in wall, and the capture drawer's form and action buttons are replaced by a sign-in card. The host product pages themselves (1688 / Taobao / Tmall / JD / noon.com) are unaffected and still browse normally.

## Sign-in methods

Open the **Account** extension page (reachable from the toolbar popup, the action menu and the online status modal). Signed out, there are two tabs and neither one needs a password:

- **Email link**: enter your email, the backend sends a one-time sign-in link to your inbox, click the link in your browser to confirm. The link is valid for 10 minutes, and the page counts down the time you have left
- **Verification code**: enter your email, receive a 6-digit code (valid for 5 minutes), type it in to sign in

The email link needs the account page to stay open. Click the button in the email and the sign-in state syncs over on its own. Close the page and it stops syncing.

Two outbound links sit at the bottom of the account page, both pointing to the website:

- "No account yet? Sign up at nomu.kanocifer.chat" → <https://nomu.kanocifer.chat/register>
- "Forgot your password? Reset it at kanocifer.chat" → <https://nomu.kanocifer.chat/forgot-password>

**There is no sign-up form and no password sign-in inside the extension.** Both happen on the website.

## Signing up for a Nomu account

Sign-up page: <https://nomu.kanocifer.chat/register>

An account is required before you can use any part of Nomu. AI translation, NomuDesign generation and prompt optimization additionally consume credits.

1. Fill in a username (3 to 50 characters), email, password (at least 6 characters), and the password confirmation
2. Hit **Send code** next to the verification field, copy the 6 digits from the email, and paste them in. The button then runs a 60-second countdown before it can send again
3. Click **Sign up**
4. On the success card, **Install Nomu** jumps straight to the Chrome Web Store, and **Back home** returns to the landing page

A successful sign-up **does not create a session**. To start using Nomu, go back to the extension's account page and sign in once with the email you just registered (email link or verification code, your pick).

The code is 6 digits and may start with a 0. Don't drop the leading digit.

## Forgot your password

Reset page: <https://nomu.kanocifer.chat/forgot-password> (the account page footer links straight to it). The whole flow is two steps.

**Step 1, request the reset email**: enter the email you registered with and click **Send reset email**. The page always says "If that email is registered, a reset email has been sent", and it moves on to step 2 even when that email never registered.

**Step 2, verify and set a new password**: copy the 6-digit code from the email (valid for 5 minutes), enter a new password (at least 6 characters, and not the same as the old one) plus its confirmation, then click **Reset password**. On success you get a confirmation card with a link to install Nomu.

- Wrong email? Step 2 shows a **Change email** link that takes you back to step 1
- "Invalid code or email not registered": the code is wrong or expired, or that email never registered. The page gives the same sentence for all three cases
- "Session expired, request the code again": you refreshed the page between the two steps. Go back to step 1
- "Please choose a password you have not used before": the new password matches the old one

## Session & multi-device

- **Multi-device model**: one account can stay signed in on up to 5 devices. Signing in on a new device does not invalidate existing sessions, and signing out on a device clears only that device's session
- After you sign out, the extension, the account page and the task panel all sign out together

## AI credits card

The second card on the account page is **AI credits**: the balance plus the latest 10 transactions. A transaction comes from one of three sources:

| Source | What it was |
| --- | --- |
| General translation | An AI translation call |
| Prompt optimization | An AI prompt optimization call |
| NomuDesign generation | An image generation, billed per image |

- The page pulls the balance and transactions on open
- The **Refresh** button pulls them again by hand
- Errors like insufficient balance, rate limit and service unavailable are shown explicitly

Check the recent transactions when the balance is running low or a number does not add up. A timeout retry of the same operation never charges twice, and retrying a failed task in the task panel does not charge again either.

> Detailed data collection and credit rules are in the [Privacy policy](/en/privacy/).

## Error codes

When an AI request fails, the popup shows the error message as it comes back, which makes it easier to pin down:

| Error | Meaning | Suggested action |
| --- | --- | --- |
| `auth_required` | Not signed in | Sign in from the account page |
| `auth_expired` | Sign-in expired | Sign in again |
| `insufficient_credits` | Insufficient credits | Contact the admin to top up |

## FAQ

### Signed in but still seeing `auth_required`?

Sign out and back in from the account page first. A cleanup extension or a browser data wipe clears the signed-in state the same way, and signing in again fixes it.

### Credits went negative?

The balance is settled server-side. A negative number usually means a task is still running and hasn't settled yet. Refresh the credits card.

### How do I delete my Nomu account?

Signing out only ends the session on that device. To delete the account for good, email the admin.

### Do I still need to sign in after signing up?

Yes. Sign-up only creates the account. You sign in once on the extension's account page, and every feature unlocks after that.

### The verification email never arrived

Check spam first. The code is one-time and valid for 5 minutes, so resend once it expires. Login codes are rate-limited too, so wait a minute before resending.
