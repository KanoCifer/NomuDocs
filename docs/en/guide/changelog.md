# Changelog

Every noteworthy version change is recorded here.

## 0.86.0 _2026-09-26_

- **Barcode label printing** — a dedicated barcode label page is now available straight from the toolbar. Pick an encoding format and label size, fill in the SKU, brand, and origin, and the label is generated. Single and batch modes are both supported: print straight from the browser, or export SVG / PNG / ZPL for your label printer.
- **Size variants folded into single-product listing** — size variants no longer need a separate task. They now live as a "Size variants" section in the single-product listing form. Enter one parent size, then add child rows (size / SKU / barcode, with SKUs generated for you) and submit them together with the product — replacing the old two-step flow of publishing the parent first and children second.
- **Child barcodes submit with the variant** — each variant row accepts its own barcode, submitted in the same batch as size and SKU, so there's no second pass to add them later.
- **Email code sign-in** — the account page now leads with email code sign-in, with password sign-in kept as an alternative and a separate entry point for forgotten passwords.
- **Warranty write fix** — fixes warranty settings failing to save in some cases.
- **Product list and drawer polish** — refined interaction feedback in the product list and single-product drawer, and category selection now tracks the form more responsively.

## 0.84.0 _2026-09-19_

- **Multi-locale UI copy** — every extension page's copy has moved to `react-i18next`, with Chinese and English built in. Switching language takes effect instantly. The HTML `lang` attribute and extension page titles follow the language switch.
- **Language setting moved to global settings** — the toolbar language button (zh ↔ en toggle) is replaced by a three-option menu: "Follow system / 中文 / English". It defaults to following the browser language.

## 0.83.1 _2026-09-16_

- **Sync connection is more stable** — reconnects spread their retries out so multiple devices don't pile in together. They reconnect faster once the network is back.
- **Sync failures are inspectable** — connection failures now leave a record in the background, so debugging sync no longer stops at "disconnected".
- **Background restart doesn't lose sync** — when the browser garbage-collects the extension's background and wakes it back up, queued sync actions during the gap are replayed automatically. Nothing gets lost.

## 0.83.0 _2026-09-15_

- **Task engine settings** — the settings page gains a "Task engine" section. Listing and duplicate tasks can each configure their concurrency and max retry count. Saved changes take effect immediately, no extension reload.
- **Global settings slimmed down** — removed useless config items like image-capture timeout, draft auto-save interval, and image upload size cap. They are now hardcoded to Noon's official spec.

## 0.82.1 _2026-09-15_

- **Stock config fix** — default warehouse and publication scans now use per-product config. Once stock sinks down, the old default no longer false-matches; the scan no longer picks up disabled warehouses.
- **Children support barcodes** — sizes step input now accepts child barcodes; importing seeds merges them into Product barcodes. On listing, matching is by productId, so barcode changes take effect immediately.

## 0.82.0 _2026-09-15_

- **Stock sinks to each product** — Product detail now has a StockSection where you can independently configure the FBP warehouse and quantity. No more global default.
- **Promo price still saved with no value** — auto-fill still writes promo start/end dates even when there's no price info, so later backfills don't miss them.

## 0.81.3 _2026-09-14_

- **Image capture split by host** — non-allow-listed image sources (anything outside 1688 / JD / noon / nooncdn) skip the direct retry and go straight to the backend proxy for bytes. Saves the doomed CORS probes.

## 0.81.2 _2026-09-14_

- **Relay station list animations** — cloud relay station list items enter and leave with a staggered rhythm; cards in the middle of "claim" give a pending feedback; the overall reorder has transitions.
- **One-click claim** — a new "claim all" button in the relay station header. It reserves every SKU in one go, then consumes them in order, avoiding numbered gaps. Per-row results are aggregated and reported.
- **Larger candidate pool for image capture** — the per-page visible-image cap on parsing is raised to 20, leaving more candidates for the parser.
- **Image capture fallback** — direct capture failure now automatically routes through `v3/nomu/proxy`. CORS / hotlink-protected scenes no longer drop images.
- **Right-click AI parse** — context menu gains "AI parse product draft", which submits a capture snapshot plus viewport screenshot to the backend asynchronously.
- **Source page snapshot generalized** — `AlibabaPageSnapshot` is renamed `SourcePageSnapshot`. All four platform adapters share the same shape.

## 0.81.1 _2026-09-14_

- **Image capture fallback** — direct capture failure now automatically routes through `v3/nomu/proxy`. CORS / hotlink-protected scenes no longer drop images.
- **Larger candidate pool for image capture** — the per-page visible-image cap on parsing is raised to 20, leaving more candidates for the parser.

## 0.81.0 _2026-09-14_

- **Capture snapshot trimmed** — bodyText is capped at 8k, pageImages is capped at 3 in DOM order. Keeps parse snapshots manageable.
- **Right-click AI parse** — context menu gains "AI parse product draft", which submits a capture snapshot plus viewport screenshot to the backend asynchronously.
- **Source page snapshot generalized** — `AlibabaPageSnapshot` is renamed `SourcePageSnapshot`. All four platform adapters share the same shape.

## 0.80.0 _2026-09-13_

- **Receipt preview with paper-feed motion** — the receipt preview is redone as a thermal-printer out-of-paper effect. The whole receipt is pre-printed inside the feed slot and feeds out segment-by-segment with a moving-pause cadence.
- **Single-product preview entry** — the single-product drawer toolbar gains a Preview button. You can preview the full listing receipt right inline.

## 0.79.0 _2026-09-13_

- **Settings page rebuilt as a preferences window** — settings now live in a centered floating window. An icon toolbar switches sections; a frosted-glass save bar sits at the bottom. Store management collapses into the preferences window, and the active store is absorbed into the store-card grid.
- **Capture from any site on demand** — any web page can be captured on demand into your library, no longer dependent on preset sites.
- **Account page Mac-style redo** — back to a standalone extension page with refreshed visuals. Fixed the infinite request loop after login and the giant blank space in the window.
- **Permission tightening** — removed host permissions that are no longer used (e.g. 1688).

## 0.78.0 _2026-09-13_

- **Slimmer install package** — redundant size icons removed; smaller extension bundle.
- **Permission tightening** — removed redundant `tabs` permission.

## 0.77.1 _2026-09-12_

- **Sync stability fix** — devices that have been idle a long time auto-degrade to offline. No more stale "online" status.
- **Upload button animation** — animation feedback added to the upload button.

## 0.77.0 _2026-09-12_

- **Cloud-shared pool relay station** — the capture drawer gains "Push to relay station". Push locally-captured products to the account's cloud pool without writing them to the local store.
- **Dynamic island** — a persistent floating island at the bottom of the page shows the relay station's online status and product count. Expand it to see products pushed from other devices on the same account and one-click claim them locally.
- **Hide the dynamic island** — the shortcut menu's "More" lets you toggle the island's visibility. The setting persists across sessions.

## 0.76.1 _2026-09-12_

- **Capture source fix** — fixed newly-added capture sources failing allow-list validation and not being able to land in the store.

## 0.76.0 _2026-09-12_

- **Background scheduling optimized** — duplicate task scan switched to a self-looping pattern with random jitter. Fewer pointless wake-ups and request hotspots.
- **App icon updated** — new app icon.

## 0.75.1 _2026-09-12_

- **Toast motion upgraded** — toasts are now translucent frosted-glass cards that bounce in with a progress bar.
- **Faster duplicate tasks** — batch counts are cached, cutting storage reads per row during queueing.

## 0.75.0 _2026-09-12_

- **Form fields only commit on blur** — form areas only save when the input loses focus. No more frequent writes during typing; long forms feel snappier.
- **Brand clear fix** — clearing a product's brand now actually saves as empty; the old brand no longer sticks around.
- **Background scheduling optimized** — periodic wake-ups merged into a single alarm. Duplicate tasks advance continuously with random jitter; fewer pointless wake-ups and request hotspots.

## 0.74.0 _2026-09-12_

- **Minor UI polish** — visual tweaks in the task panel and drawer.

## 0.73.0 _2026-09-11_

- **Export captured products to Excel** — one-click export list products to xlsx.
- **Duplicate delivery notifications** — system notification when a duplicate snapshot pushed from another device lands in your store.
- **Capture drawer style rebuild** — the product capture drawer is fully visually refreshed.
- **Brand picker optimized** — letter grouping removed; fixed the rendering stutter when the brand list is large.
- **Group task creation fix** — fixed the first task-step status not being correctly persisted for group products.

## 0.72.0 _2026-09-11_

- **Taobao product capture added** — supports `item.taobao.com` main site and Tmall `detail.tmall.com`, capturing title, main image, price, and all SKUs in one click.
- **JD.com product capture added** — supports `*.jd.com` product pages; multi-dimensional specs are flattened into independent variants; out-of-stock specs are kept.
- **Multi-dimensional spec flattening** — Taobao / JD's multi-spec axes are each flattened into selectable variants; the price page is shared.
- **New "append main image to variant" toggle** — can be turned off so each variant keeps only its own image.
- **Account page redone** — account and store info display is clearer.
- **NomuDesign gains the GPT Image model**, plus two built-in presets: "subject separation cutout" and "canvas expansion completion".

## 0.70.2 _2026-09-11_

- **Refined logout / disconnect states** — UI state is reflected promptly when the sync connection drops or you log out.

## 0.70.0 _2026-09-11_

- **Sync connection status dashboard added** — view the sync bus connection status in real time.
- **Device online status refreshes live** — heartbeats carry device lists; the device online state in the duplicate dialog updates instantly.
- **Manual refresh button added to the duplicate-to-device bar**.

## 0.69.0beta _2026-09-11_

- **NomuDesign product picker upgraded to a search-style dialog** — the top search box filters product names / SKUs / brands in real time, matched segments highlight inline. Even with many candidates you can locate in seconds.
- **Clearer selection feedback** — gold border + light yellow background + spring checkmark at the row end; arrow keys switch results, Enter confirms, Esc closes.
- **Picker dialog extracted into a generic component** — new `SearchPickerModal`. Group / sizes variant pickers reuse the same shape (pending action sheet integration).

## 0.68.0 _2026-09-10_

- Nomu's main entry switched to a fan-style shortcut menu. Product list, duplicate product, task panel, and "More" — the four high-frequency actions expand in one go. One less tap.
- The entry button is draggable to any screen position; it auto-clamps inside the viewport and stops where you release, no bounce-back.
- Expand animation switched to a spring, with each item staggered. Collapse is faster, and operation feedback feels snappier.
- Drag and click are decided separately; releasing after drag doesn't accidentally trigger the button.

## 0.67.0 _2026-09-10_

- WebSocket requests now use `requestId` to correlate server responses. Result matching is more reliable.
- When the sync connection drops, in-flight requests fail immediately instead of waiting for timeout.

## 0.66.1 _2026-09-10_

- Image decoding and re-encoding moved into a Web Worker. The UI freezes less while processing large images before listing.

## 0.66.0 _2026-09-10_

- The duplicate dialog switched to a device-card selector. Target devices are clear at a glance.
- The sync subscription runs as a long-lived background job, with auto-redial on disconnect. Device online state is more accurate.
- Duplicate tasks now support parallelism; the source snapshot cache is reused; batch duplication is faster.

## 0.63.0 _2026-09-10_

- Multi-device sync adds device identity. When duplicating, you can pick the target device from a dropdown.
- New SegmentedControl component.

## 0.61.0 _2026-09-10_

- Product form gains new input controls. Brand cache fixes. Long forms feel smoother.
- Group-related UI tweaks.

## 0.60.2 _2026-09-09_

- Fixed Noon session detection: `isNoonSessionLive` now explicitly follows redirects and judges via `res.redirected`, avoiding false "not signed in".
- Fixed Noon login banner being covered by the first TaskList item (added z-index).
- Fixed the Noon login banner refresh button's style and layout misalignment.
- Fixed the task panel main container spacing so the banner and task list are visually separated.
- 1688 capture main-image cap raised from 7 to 9.

## 0.60.1 _2026-09-09_

- Fixed image persistence failure and FBN being wrongly blocked from listing.
- Fixed the asset short-reference `source` field marker in `listing-shape`, aligning with `data:`.
- Fixed the image-asset Blob-to-base64 bridge — the assets table and `images[]` no longer lose data.
- Fixed the listing flow's `quantity`/`warehouseId` becoming optional, so FBN is no longer wrongly blocked.

## 0.57.1 _2026-09-08_

- Fixed ImageSection's resolution of asset short references into blob URLs. Single-product main images no longer break.

## 0.57.0 _2026-09-08_

- Added cloud config sync with `version` optimistic concurrency.

## 0.56.0 _2026-09-08_

- Product group adds a brand gate. The group-creation anchor is wired up; single-list judgement converges; sizes submission creates rows on the spot.

## 0.55.0 _2026-09-08_

- 1688 detail-page SKU switched to the mtop API pre-fetch, with DOM parsing as a fallback. Capture is more stable.
- Added listing preferences settings page.
- Added auto-fill for price.
- Added intelligent Q&A (NomuDocs RAG streaming Q&A integrated).
- Added archived-products drawer with restore / permanent delete.
- Added empty-state placeholders.
- Account page uses AuthShell to replace AuthCard. New "not signed in" usage empty state.
- Performance optimization: `useDeferredValue` defers candidate / task list rendering; stabilize xyflow nodeTypes references.

## 0.54.0 _2026-09-07_

- NomuDesign product image gains ClickMenu; entry merged into CreateNodeToolbar. Source deletion changed to ModalCard.
- Added AI usage display.

## 0.53.1 _2026-09-07_

- Privacy policy and in-app privacy modal copy synced: added data-collection notes for NomuDesign generation, prompt optimization, and AI credits.

## 0.53.0 _2026-09-07_

- The account page (login / profile) was migrated out of the settings page into a standalone **Account** extension page.
- Added the AI credits card: shows credit balance and recent consumption, with manual refresh.
- AI translation / generation / prompt optimization tied into credit billing; added explicit errors for insufficient balance, rate limit, and service unavailable.
- Global toast switched to content-adaptive width; long text reads more easily.
- AI requests gained idempotency keys, avoiding double-charges on timeout retries.

## 0.52.2 _2026-09-07_

- Fixed single-product edit: filling in fields like brand no longer wipes the optimistically-filled price / department / category on save.

## 0.52.1 _2026-09-07_

- Fixed category parsing: when AI candidates can't match a specific category, the main subject no longer disappears. Instead, an "Unrecognized" candidate list shows, with tap-to-pick or switch-to-manual.
- Fixed background GET requests carrying empty bodies, which violated the spec.

## 0.52.0 _2026-09-07_

- Action sheet (ActionSheet) gains the NomuDesign entry: pops a product picker; pick an unlisted single product to open the NomuDesign canvas.

## 0.51.0 _2026-09-07_

- Generation node gains "history image retention": past generation results within a session are kept, scrub-able as thumbnails and roll-back-able to old versions.
- Prompt input box enlarged (4 rows → 10 rows), easier for long prompts.
- UI detail tweaks for the canvas, generation node, and apply-result modal.

## 0.50.0 _2026-09-07_

- NomuDesign gains prompt templates and a preset system: built-in presets, template list, template dropdown — one-click insert into the canvas.
- Save the current prompt as your own template (with category) for later reuse.
- Prompt node gains an **AI optimize** button — one-click AI rewrite / strengthen (sign-in required).
- Polished NomuDesign's built-in prompt presets.

## 0.48.0 _2026-09-07_

- Extension popup rebuilt with a Liquid Glass visual (translucent frosted-glass cards, hover motion).
- Bottom-right entry redesign: dropped the always-on secondary button; the main floating button directly opens the action sheet.
- Fixed database open / migration failure that caused the drawer to white-screen; switched to error-state fallback page.

## 0.45.0 _2026-09-07_

- Added NomuDesign product image generation: canvas generation nodes can run, supporting model (Seedream lite / pro) and tier (1K–4K) selection.
- Generation / reference image nodes support hover preview and single-image download. Canvas-level lightbox lets you flip through images.
- Product main-image upload rebuilt as a carousel stage. Main-image cap raised from 7 to 9.
- Generation can "apply to product gallery": one-click write to current product and same-group / same-parent siblings' main images (with a hint when the cap is reached).
- Product form / group page gains NomuDesign canvas entry. After generation, the canvas opens automatically; fixed the Chrome popup blocking redirects in content scripts.
- Image upload passes through compliant jpg / jpeg bytes as-is, no re-encoding. Non-jpg auto-normalized to Noon's spec.
- NomuDesign data flow refactored into standalone asset entities, persisted. Draft / generation persistence is stronger (survives refresh).
- Polished the NomuDesign canvas and node styles.

## 0.40.0 _2026-09-05_

- Added inline product info edit
- Strengthened task runtime stability

## 0.37.0 _2026-09-05_

- **Task panel redesigned** — publish tasks now show progress per listing step; failure reasons are clearer; duplicate tasks are split into their own view, with one-click clear of finished duplicates.
- **Noon not-signed-in reminder** — if Noon backend isn't signed in, you get prompted to sign in first, so tasks don't silently fail.
- Fixed `department` attribute being lost when duplicating Noon products.

## 0.35.0 _2026-09-04_

- **Single-product drawer gains "List all"** — one-click queues all current product sizes for listing; the drawer auto-closes after queueing.
- Task panel supports deleting failed tasks; failure records no longer pile up.
- Fixed image failures when duplicating some products.
- Underlying flow rebuilt — duplication and listing run more stably.

## 0.31.0 _2026-09-02_

- Added user sign-up / sign-in
- **Bug fixes**
- Optimized duplicate task performance

## 0.24.1 _2026-09-01_

- **Bug fixes** — no user-visible changes in this version.

## 0.24.0 _2026-09-01_

- Category parsing panel redesigned

## 0.23.0 _2026-09-01_

- Duplicate product supports custom brand.
- BrandPicker refactored

## 0.22.0 _2026-08-31_

- **Action sheet visual redesign** — moved from a center-floating shallow menu to a bottom-rising drawer with a grab handle on top. The content area supports scroll, the blurred scrim separates the panel from the original page.
- **Primary actions more prominent in the action sheet** — "Create group" and similar primary actions in each group always show the highlight color on the icon block, easy to spot among mixed groups.
- **Action sheet supports keyboard** — ↑↓ cycles between items, Home / End jumps to the ends, Enter triggers directly. No mouse needed.
- **Edit dialog visual alignment** — center modals like product tag and confirmation dialogs are unified with large radius, floating shadow, and wide padding. The close button floats top-right. The whole family is visually consistent.

## 0.21.0 _2026-08-31_

- **Duplicate product supports table paste** — in batch mode you can paste Excel / CSV cells directly. The three columns (source PSKU, target Partner SKU, Barcode) are auto-recognized; you see exactly how many rows were recognized.
- **Product templates** — the category component lets you save and reuse "category + brand" bundles; no need to re-select for repeated listings of the same category.

## 0.20.0 _2026-08-31_

- Duplicate product tasks can now be cancelled.

## 0.19.1 _2026-08-31_

- **Fixed live FX dialog error** — opening "Live FX" no longer shows a fetch failure; rates display correctly even just after browser start.
- **Fixed image upload size validation** — images over the size cap are now properly rejected with a hint; the validation wasn't actually firing before.

## 0.19.0beta _2026-08-31_

### Features

- **Welcome onboarding refreshed** — the top progress bar is now a sliding capsule that smoothly transitions with the current step. Step transitions are direction-aware; forward / back animations go opposite ways. The global glass panel and background ambient color blobs drift slowly, setting an immersive base.
- **Action sheet gains "Live FX" entry** — from the action sheet open the CurrencyModal with one click to view SAR / AED and other Gulf currencies against a CNY base.

## 0.18.0beta _2026-08-30_

### Features

- Added Welcome onboarding — first install walks you through store setup, permissions, and a trial capture.
- Added global settings page — unified management of stores / Kanocifer / cache. Extracted the shared `cache/kanocifer` factory.
- Added FBN stock settings
- Duplicate product panel supports batch mode, per-row Barcode generation, Barcode input, submit-and-close, and a generic toast.
- Duplicate form drops per-row stock input, unified from store settings

### Fixes

- Tightened `host_permissions`. Added a domain allow-list for service-worker image capture (security).

### Refactor

- Removed `cookies` permission. Store detection now goes through the merchant API.

## 0.17.0beta _2026-08-28_

- **Duplicate product** — added PartnerSku-based product duplication, supporting single and batch.

## 0.16.0beta _2026-08-28_

- **Tightened permissions** — no longer requests the `cookies` permission, tightening privacy.

## 0.15.0beta _2026-08-27_

- **Quick search overlay** — on any page press `Command/Ctrl + Shift + S` to summon a focused search; locate active / hidden Noon items in place and toggle seller status with one key. No need to enter the backend list.
- **Action sheet entries expanded** — the action sheet gains two entries: **Quick search product** and **Documentation**. From a product page you can jump straight to search or read the docs.
- **Size variant group deletion fix** — deleting a variant group now really removes the parent and children, with no archive residue left.
- **Seller status toggle more stable** — inline active / hidden switch feedback stays consistent with the backend list, avoiding occasional out-of-sync state.

## 0.14.0beta _2026-08-27_

- **Keyboard shortcuts** — press the shortcut on any Chrome page to summon the action panel without clicking the toolbar icon first.
  - `Ctrl + Shift + Y` (mac: `Command + Shift + Y`) — one-click open Nomu side panel.
  - `Ctrl + Shift + A` (mac: `Command + Shift + A`) — toggle the group-entry action sheet on the noon-catalog seller backend; quickly create a group or switch a size variant.

## 0.13.0beta _2026-08-26_

- **Action sheet** — adds a delete entry, supporting deletion of Group and Sizes variant groups.

## 0.12.0beta _2026-08-26_

- Initial public beta

The first public release of Nomu, fully covering the core pipeline from 1688 capture to Noon listing.

### Core features

- **1688 / Noon product capture** — on a 1688 or noon.com source product page, one-click capture of title, image gallery, variant specs, and price, parsed into a structured list ready to list.
- **Listing pipeline** — a declarative step engine drives a single product through create, attributes, images, price, stock, barcode, activate, and warranty. First failure stops the batch; retries automatically skip already-succeeded steps.
- **Multi-language translation** — Chinese → English / Arabic. Title and selling points are auto-translated. UAE and Saudi stores both covered.
- **Compliant image processing** — product images auto-converted to 660×900 white-background JPEG. No rejections due to image spec.
- **Sizes variant group** — same-brand same-category items merged along the size axis. The parent is auto-published if not yet live.
- **Multi-store management** — maintain multiple store configurations in the side panel; save / switch login sessions by tab; store codes auto-recognizable from the current page.
- **Task panel** — full-history view of all publish tasks with filtering by status / type / time window. Failed items can be retried or cancelled individually.
- **Category recommendation** — source data auto-recommends Noon category (AI prediction + official category table), with manual override.
- **FX conversion** — built-in CNY rate lookup; convert to AED / SAR directly when pricing.

### Notes

- Free to use during public beta. Settings and data all live in your local browser.
- See [Install Nomu](/en/guide/install) for installation.