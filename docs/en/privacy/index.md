---
title: "Privacy policy"
description: "The Nomu privacy policy explains which data is processed, where it goes and what the tool never sees. No tracking or analytics; the cloud product pool, assistant conversations and the upstream content of all five AI call types are spelled out item by item."
---

# Privacy policy

> **Note: this English version is a machine translation for reference. The authoritative version is the Chinese one at [/privacy/](/privacy/).** Last updated: 2026-09-30

A tool that does your bidding shouldn't ask for blind trust. This document explains what data Nomu processes, where it goes, and what we will never see.

## One-line summary

**Store settings and batch drafts stay local by default · No tracking or analytics · Capture supports 1688 / Taobao / Tmall / JD.com · There are exactly five AI call types that reach the cloud, and the upstream content of each is spelled out · Product drafts parsed via right-click are stored server-side, but are available only to other devices under your own account.**

## The Nomu account

Translation, NomuDesign (generation / prompt optimization), the right-click "AI parse product draft" action, and the Nomu assistant all require signing in to a Nomu account. The relationship between the account and the listing flow is:

- **Sign up** happens on the website (`nomu.kanocifer.chat/register`) and needs a username, email, email verification code, and password. **Sign in** happens on the extension's account page and supports either an email verification code or an email link (click the link in the email to confirm). Neither needs a password.
- The password is submitted over HTTPS to the account service (`api.kanocifer.chat`) only by the sign-up and password-reset forms on the website. The extension itself neither collects nor stores your password.
- After sign-in, the access and refresh tokens are stored in your browser's local storage and are used only to identify you to Nomu services. Logging out clears them locally.
- The account follows a **single-session** model: signing in on a new device invalidates the old session.
- The Nomu account is fully independent of your Noon sign-in: signing into Nomu does not read or affect your Noon session.
- When not signed in, or when the session has expired, translation, generation, prompt optimization, right-click parsing, and the assistant are unavailable. Regular capture, image cleanup, and listing are not affected.

## Where data goes

### Stays local (in your browser)

The following data is only stored in your browser's local storage and is never uploaded to any server:

- Your store settings (country, PartnerCode, warehouse, quantity, warranty, brand)
- Your store records and the currently active store
- Your product batch drafts
- Nomu account sign-in tokens
- NomuDesign drafts (prompts, reference images, generation history and canvas edit state)

The white-background image processing for product images also runs locally in your browser and does not go through any server.

### Sent only to Noon (the content you submit)

When you actively submit a listing, the following data is sent to Noon via your already-signed-in Noon session:

- Product information (title, description, attributes, price, stock)
- Product images (already locally processed to white-background JPEG: width ≥ 660px, aspect ratio ≥ 0.5, ≤ 10MB each)
- Warranty and activation requests

These requests are identical to those you would generate by hand in the Noon seller backend — Nomu just executes them for you.

### Sent to the account service (on sign-in / sign-up)

On sign-in and sign-up, the following information is submitted over HTTPS to the Nomu account service (`api.kanocifer.chat`):

- Username and password (on sign-up / password reset, submitted by the `nomu.kanocifer.chat` website)
- Email and email verification code (on sign-up, code sign-in, email-link sign-in, and password reset)

### Nomu AI services (sign-in required)

The following five call types are handled by Nomu's built-in services. Requests carry your account access token, used only for authentication and credit deduction. **The upstream content of each is listed below — please pay particular attention to types 4 and 5:**

- **Translation** — uploads the product text to translate (title, description); receives the translation back.
- **Prompt optimization** — uploads the prompt text; receives the rewritten prompt back.
- **Image generation** — uploads the prompt, optional reference image base64, and generation parameters (model, size tier); receives the media address of the generated image back (`api.kanocifer.chat/v3/media/design/*`). **Reference images are only used for this generation; they are not retained on the account service side.**
- **Product parsing** (`v2/nomu/product-parse`) — triggered by the page right-click menu item "AI parse product draft". **This is by far the heaviest upstream payload.** It uploads, from the page you right-clicked: the page URL, title, description, price and currency, JSON-LD structured data (up to 5 entries), primary images (up to 20), page images (up to 40), the **full body text of the page**, and a **full screenshot of your current viewport** (raw base64 JPEG). Parsing is asynchronous: the response returns a job id first.
- **Assistant Q&A** (`v2/knowledge/ask`) — see the "Nomu assistant" section below.

For the first three types, beyond what authentication and billing require, requests do not carry your store configuration, batch drafts, or other local data. **Product parsing and assistant Q&A necessarily carry content you actively provide** — respectively the body text and viewport screenshot of the page you right-clicked, and your questions.

### AI credits & consumption history (persisted on the account side)

The account service deducts credits for the five calls above and persists them server-side:

- Credit balance (in cents, 100 cents = 1 unit, credits do not expire)
- Per-transaction consumption history (source / time / cost). Source enum: `translate` (general translation), `nomu_prompt_optimize` (prompt optimization), `design_generate` (generation), plus one independent source each for product parsing and assistant Q&A (exact enum values are whatever the account service returns)

Credits are visible on the account page and can be manually refreshed. To delete your Nomu account and the corresponding credits, contact the author by email (see end of document).

### FX service

When listing, the extension calls the FX service to convert local-currency prices. The request only carries the FX query parameters, not your product or store data.

### Cloud config sync (sign-in required, manually triggered)

The account page exposes two manual buttons: **Upload to cloud** and **Download to local**. When triggered, your store configuration (PartnerCode, store code, memo, warranty, PSKU prefix, etc.) syncs via the account service (`api.kanocifer.chat`). **Only triggered manually by you on the account page — it never runs automatically.** The last-synced time is stored locally in your browser and shown on the account page.

### Cloud product pool (sign-in required)

When the right-click "AI parse product draft" action succeeds, the resulting product draft is saved server-side via the account service (`api.kanocifer.chat`) so that **other devices under your own account** can pick it up. The behavior:

- The transport is an **account-authenticated** sync connection (`v3/nomu/sync/ws`, which carries your account token at connect time). Pool contents are therefore **visible only to you — no other Nomu account can access them**.
- On startup the extension pulls the full contents of the pool; when new items appear, the server broadcasts the delta to **the online devices under your account**.
- Each snapshot carries the **writer's device identifier `device_id` and device name**, so you can tell which device wrote it.
- When you "claim" a snapshot on one device, that item is removed from the account's other devices (exclusive claim).

Note that the product draft **leaves your machine and is stored on the publisher's server** to support your own multi-device use. Do not use right-click parsing on pages containing sensitive information. You can claim or delete pool items yourself in the extension; to purge the full history, contact the author by email (see end of document).

### Nomu assistant (sign-in required)

The Nomu assistant is a Q&A assistant backed by a server-side knowledge base. Its upstream and storage behavior:

- **Asking**: `v2/knowledge/ask`. Uploads your question text and account access token; the answer is streamed back over SSE.
- **Conversation text is stored on the server**: locally we keep only the session **id, title and last-used time** (an "address book"); **the conversation body is kept server-side**, and the extension reads it back by `session_id` to display it.
- **Knowledge base status**: `v2/knowledge/status` reads ingestion progress; `v2/knowledge/ingest` triggers an incremental ingestion run. The knowledge base is maintained by the author and is not built from your data.
- The assistant consumes credits; no request is made when signed out or out of credits.

Note that your questions leave your machine and are stored on the server. **Do not submit sensitive information to the assistant.** To delete a session, contact the author by email (see end of document).

## What we will never see

- Your Noon account password
- Any Noon-facing keys or OAuth grants
- Any tracking, analytics, or telemetry data
- Your browsing history or unrelated site cookies
- NomuDesign reference images (not retained server-side)

## Exceptions you should know about

The items below **do** leave your device and are stored on the server. They are collected here so nothing is missed:

| Data | Stored in | Who can see it |
| --- | --- | --- |
| Body text and full-viewport screenshot of the page you right-clicked | Nomu AI service (product parsing) | The parsing process |
| Product draft produced by right-click parsing, plus the writing device's `device_id` and device name | Cloud product pool | **Only other devices under your own account** |
| Your assistant questions and answers | Nomu assistant service | Persisted server-side, read back by `session_id` |
| Email, email verification code, account access token | Account service | Required for account authentication and billing |

None of the above is **shared with third parties**: the server side is the publisher's own account service, and access is isolated by account token.

## Permissions

Nomu requests the following Chrome permissions:

| Permission | Purpose |
| --- | --- |
| Storage | Save your store records, settings, batch drafts, and sign-in tokens in the browser |
| Alarms | Process your listing task queue in the background on schedule |
| Notifications | Pop a merged reminder when a parse job returns or a shared-pool task is queued (multiple events collapse into one); clicking it opens the corresponding panel |
| Context menus | Provide "AI parse product draft" in the page right-click menu, for capturing products from your own storefront / brand website. Clicking the menu item counts as an active authorization |
| `activeTab` (on-demand) | Only when you actively trigger "capture current page" or click the right-click menu item; temporarily accesses the active tab without pre-authorizing any site |
| `scripting` (script injection) | Pair with `activeTab`; inject the capture script into the active tab when you trigger capture, reading product info from the page |

We do not request sensitive permissions like `cookies` or `tabs`: the extension does not read browser cookies. Other sites are not accessed by the extension, except when you actively trigger "capture current page" or click the right-click menu item "AI parse product draft" — under `activeTab`, the active tab is only temporarily accessed (browser internal pages and the Chrome Web Store are always excluded), and authorization expires when you leave the tab.

> The right-click menu item appears on any `http` / `https` page, so that it covers your own storefront and brand website. Please note its consequences: clicking it submits the current page's body text and a full-viewport screenshot to the Nomu AI service for parsing, and the resulting draft is stored server-side for pickup by other devices under your own account (see above).

### Sites accessed

| Site | Reason |
| --- | --- |
| Noon store (noon.com) | Inject capture tool into the page; read product page info for duplicate / list |
| Noon partner backend (noon.partners) | Catalog management pages and listing requests |
| Noon image service | Image and file uploads |
| Noon hosted image storage (f.nooncdn.com) | Read source product images when duplicating |
| 1688 website and image service (1688.com / alicdn.com) | Capture product info from the page; images fetched via the alicdn CDN |
| Taobao / Tmall website (item.taobao.com / detail.tmall.com) | Capture product info from the page; images fetched via the alicdn CDN |
| JD.com website and image service (jd.com / 360buyimg.com) | Product page capture and image fetch |
| Nomu account service | Account sign-in authentication, AI credit balance and history lookup |
| Nomu translation service | Text translation |
| Nomu image generation service | Prompt optimization and product image generation |
| Nomu media storage | Storage for NomuDesign-generated images |
| Nomu product parsing service | Asynchronous parsing for the right-click "AI parse product draft" action, and writing the result to the cloud product pool |
| Nomu assistant service | Knowledge-base Q&A, session read-back and ingestion status |
| FX service | Convert local-currency prices during listing |

The extension's cross-origin access is limited to: noon.partners, alicdn.com, 360buyimg.com, f.nooncdn.com, api.kanocifer.chat. The Noon store, 1688, Taobao / Tmall, and JD.com are not in the list — their product data is read in-page by content scripts in the same origin, scoped to the current product page. Other sites are only temporarily accessed when you actively trigger "capture current page" (see Permissions).

Access to Noon APIs is gated by a URL allow-list. Anything outside is rejected.

## Changelog

- 2026-09-30 — Three previously undisclosed data flows documented, plus two corrections.
  1. **New "Cloud product pool" section**: the output of the right-click "AI parse product draft" action is saved server-side via the account service and synced across devices under your own account over an account-authenticated connection (`v3/nomu/sync/ws`). Items carry the writer's `device_id` and device name, and are removed from the account's other devices once claimed. **Not shared with other Nomu accounts.**
  2. **New "Nomu assistant" section**: assistant questions and answers are stored server-side (locally only the session id, title and last-used time), read back by `session_id`.
  3. **AI call types expanded from three to five**: added "product parsing" (uploads the page body text and a full-viewport screenshot) and "assistant Q&A"; the credit history source enum gains two corresponding entries.
  4. The permission table drops "Side panel" — the extension does not request that permission — and gains "Context menus", which was missing. Since the right-click menu appears on any http/https page, its consequences are now called out in the permissions section.
  5. The local image-processing spec was corrected from "660×900" to "width ≥ 660px, aspect ratio ≥ 0.5, ≤ 10MB".

- 2026-09-28 — Account method notes updated. Sign-up and password reset now happen on the website (`nomu.kanocifer.chat/register`, `nomu.kanocifer.chat/forgot-password`); the extension no longer ships a sign-up form or password sign-in. Sign-in is now the account page's "email verification code" and "email link" pair. The password is only submitted by the website forms; the extension neither collects nor stores it. No other data handling changed.

- 2026-09-13 — Permission tightening. Removed the `tabs` permission; removed direct-access permissions for the Noon store (noon.com), 1688, Taobao / Tmall, and JD.com. Their product data is now read in-page by content scripts in the same origin; capture scope is unchanged. Added `activeTab` (on-demand) and `scripting` (script injection) for "capture current page", effective only when you actively trigger it. Permission table and sites-accessed table updated accordingly.
- 2026-09-11 — Product capture adds Taobao / Tmall and JD.com as new sources. Read behavior is identical to 1688 — only page product info. The sites-accessed table adds the Taobao / Tmall and JD.com rows.
- 2026-09-09 — Cloud config sync added. The account page gains "Upload to cloud" and "Download to local" manual buttons; store configuration syncs via the account service. Only manually triggered; never runs automatically. Last-synced time is stored locally in the browser.
- 2026-09-07 — NomuDesign (product image generation / prompt optimization) and the AI credits system integrated. Addendum: prompts and (optional) reference images are uploaded with generation requests; reference images are not retained server-side. The account service persists credit balance and consumption history. The translation section is upgraded to the AI services section, including image generation and prompt optimization. Permission table gains Alarms. Sites-accessed table gains Nomu image generation service, Nomu media storage, FX service.
- 2026-09-05 — Nomu account system integrated — using translation requires signing in to a Nomu account (supports password and email magic-link sign-in). Added notes for account data (sign-up info, local session tokens, single-session model). Clarified that image white-background processing runs locally in the browser, correcting the previous "image processing is server-side" wording.
- 2026-08-30 — Tightened site-access scope — removed 3 wildcard-overlapping duplicate domains. The Noon image service was narrowed to the actually-used image domains. Image fetching adds a domain allow-list; anything outside is rejected. Alarms permission and Noon hosted image storage were added to the listings.
- 2026-08-28 — Removed the Chrome `cookies` permission. "Detect current store" was switched to Noon Catalog's own store list API (`/_vs/mp/mp-noon-merchant-api/noon-store/list`); the extension no longer actively reads browser cookies. Other behavior is unchanged.
- Updates to this policy will be recorded on this page.

## Contact

For questions about this policy or data handling, contact: `dethe3255@gmail.com`.