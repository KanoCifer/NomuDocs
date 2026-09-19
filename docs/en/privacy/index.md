# Privacy policy

> **Note: this English version is a machine translation for reference. The authoritative version is the Chinese one at [/privacy/](/privacy/).** Last updated: 2026-09-13

A tool that does your bidding shouldn't ask for blind trust. This document explains what data Nomu processes, where it goes, and what we will never see.

## One-line summary

**Product and store data all stays on your device · No tracking or analytics · Capture supports 1688 / Taobao / JD.com · The Nomu account is only used for translation, NomuDesign generation, and AI credits.**

## The Nomu account

Translation, NomuDesign (generation / prompt optimization) and AI credits all require signing in to a Nomu account. The relationship between the account and the listing flow is:

- **Sign up** requires a username, email, and email verification code. **Sign in** supports either username + password or email magic link (click the link in the email to confirm).
- The password is sent over HTTPS to the account service (`api.kanocifer.chat`) for verification only. The extension itself never stores your password.
- After sign-in, the access and refresh tokens are stored in your browser's local storage and are used only to identify you to Nomu services. Logging out clears them locally.
- The account follows a **single-session** model: signing in on a new device invalidates the old session.
- The Nomu account is fully independent of your Noon sign-in: signing into Nomu does not read or affect your Noon session.
- When not signed in, or when the session has expired, translation, generation, and prompt optimization are unavailable. Capture, image cleanup, and listing are not affected.

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
- Product images (already locally processed to 660×900 white-background JPEG)
- Warranty and activation requests

These requests are identical to those you would generate by hand in the Noon seller backend — Nomu just executes them for you.

### Sent to the account service (on sign-in / sign-up)

On sign-in and sign-up, the following information is submitted over HTTPS to the Nomu account service (`api.kanocifer.chat`):

- Username and password (on username/password sign-in or sign-up)
- Email and email verification code (on sign-up or magic-link sign-in)

### Nomu AI services (sign-in required)

Translation, prompt optimization, and image generation are handled by Nomu's built-in services. Requests carry your account access token, used only for authentication and credit deduction:

- **Translation** — uploads the product text to translate (title, description); receives the translation back.
- **Prompt optimization** — uploads the prompt text; receives the rewritten prompt back.
- **Image generation** — uploads the prompt, optional reference image base64, and generation parameters (model, size tier); receives the media address of the generated image back (`api.kanocifer.chat/v3/media/design/*`). **Reference images are only used for this generation; they are not retained on the account service side.**

Beyond what authentication and billing require, requests do not carry your store, batch, or other local data.

### AI credits & consumption history (persisted on the account side)

The account service deducts credits for the three calls above and persists them server-side:

- Credit balance (in cents, 100 cents = 1 unit, credits do not expire)
- Per-transaction consumption history (source / time / cost). Source enum: `translate` (general translation), `nomu_prompt_optimize` (prompt optimization), `design_generate` (generation)

Credits are visible on the account page and can be manually refreshed. To delete your Nomu account and the corresponding credits, contact the author by email (see end of document).

### FX service

When listing, the extension calls the FX service to convert local-currency prices. The request only carries the FX query parameters, not your product or store data.

### Cloud config sync (sign-in required, manually triggered)

The account page exposes two manual buttons: **Upload to cloud** and **Download to local**. When triggered, your store configuration (PartnerCode, store code, memo, warranty, PSKU prefix, etc.) syncs via the account service (`api.kanocifer.chat`). **Only triggered manually by you on the account page — it never runs automatically.** The last-synced time is stored locally in your browser and shown on the account page.

## What we will never see

- Your Noon account password
- Any Noon-facing keys or OAuth grants
- Any tracking, analytics, or telemetry data
- Your browsing history or unrelated site cookies
- NomuDesign reference images (not retained server-side)

## Permissions

Nomu requests the following Chrome permissions:

| Permission | Purpose |
| --- | --- |
| Storage | Save your store records, settings, batch drafts, and sign-in tokens in the browser |
| Side panel | Display the store management panel in the Chrome side panel |
| Alarms | Process your listing task queue in the background on schedule |
| Notifications | Pop a merged reminder when duplicate tasks are queued (multiple events collapse into one) |
| `activeTab` (on-demand) | Only when you actively trigger "capture current page"; temporarily accesses the active tab without pre-authorizing any site |
| `scripting` (script injection) | Pair with `activeTab`; inject the capture script into the active tab when you trigger capture, reading product info from the page |

We do not request sensitive permissions like `cookies` or `tabs`: the extension does not read browser cookies. Other sites are not accessed by the extension, except when you actively trigger "capture current page" — under `activeTab`, the active tab is only temporarily accessed (browser internal pages and the Chrome Web Store are always excluded), and authorization expires when you leave the tab.

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
| FX service | Convert local-currency prices during listing |

The extension's cross-origin access is limited to: noon.partners, alicdn.com, 360buyimg.com, f.nooncdn.com, api.kanocifer.chat. The Noon store, 1688, Taobao / Tmall, and JD.com are not in the list — their product data is read in-page by content scripts in the same origin, scoped to the current product page. Other sites are only temporarily accessed when you actively trigger "capture current page" (see Permissions).

Access to Noon APIs is gated by a URL allow-list. Anything outside is rejected.

## Changelog

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