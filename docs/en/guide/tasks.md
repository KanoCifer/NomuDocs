---
title: Task panel
---

# Task panel

The task panel is Nomu's "all-history task observer": which site you published to, whether it succeeded, which step failed, and whether it can be retried — all in one standalone extension page. It is not "the progress bar next to the publish button"; it is the unified view across pages, sessions, and stores.

## How to open

The task panel lives on a standalone extension page `tasks.html`:

- "View all tasks →" button at the bottom of the popup
- The ListChecks icon in the header of the single-product drawer (`SingleProductBody`)
- Direct URL `chrome-extension://<id>/tasks.html`

It opens in a new tab with no "back" button — closing it exits.

## Two task kinds, two views

The top-level `TaskViewSwitch` toggles between two views. Status and filter are independent:

- **Publish tasks** (`publish`) — single-item, group, and sizes-variant listing pipelines
- **Duplicate tasks** (`duplicate`) — cloning already-listed Noon products by PartnerSku

Switching views preserves the search box and filters — both filters live independently.

### Publish task state machine

| Status | Meaning |
| --- | --- |
| `pending` | Queued, waiting for the service worker to claim |
| `running` | Step table is in progress |
| `success` | All steps are `ok`; final state is committed |
| `failed` | A step failed; see the failing step and error code, retry or cancel |
| `cancelled` | Manually cancelled |

### Duplicate task state machine

`pending → enqueued / cancelled / failed`: `enqueued` is terminal and means the corresponding publishTask has been queued. Intermediate `fetching` / `building` states are not recorded.

## What each row shows

Every row (about 56px tall) shows:

- Thumbnail + product title
- Status dot
- Country chip (`sa` / `ae`)
- taskKind chip (`single` / `group` / `sizes`)
- Current step name
- Inline expansion on failure: error.message + error.code + failing step.type + retryCount + **Retry** / **Cancel**

Clicking outside the button area toggles expand / collapse; failed rows expand by default.

> Cancelling a `running` task: the button is currently disabled with a tooltip that says "Cancelling a running task requires the service worker to release the lease (30s TTL), which is not auto-handled in this round". `pending` / `failed` rows can be cancelled normally.

Dates show as relative time ("a few minutes ago" / "a few hours ago") with the absolute time on hover.

## Filters

The left-side `TaskFilterPanel` in the panel gives three filter groups:

- **Status** multi-select (default "running + failed")
- **Task type** multi-select (`single` / `group` / `sizes`; the duplicate view has its own set)
- **Time window**: `updatedAfter` / `updatedBefore` (default "last 7 days")
- **Search string**: substring match on `partnerSku` / `product.title`

The search runs as an in-UI filter join. It is **not** pushed down to RPC.

## Loading & resume

- Default limit is 200 tasks, sorted by `updatedAt` descending.
- When the limit is hit, a **Load older** button appears at the bottom. It drops the `updatedAfter` filter and doubles the limit to 400. When there is no more, the button disappears.
- The data source subscribes to `db.changed` for live updates: writes trigger a debounced re-fetch within 100ms.
- The search box has a 300ms debounce before firing the query.

## Retry & clear

- **Retry** — re-enqueue the failed row. Steps that already succeeded are skipped automatically (resume semantics). AI requests carry idempotency keys, so retries do not double-charge.
- **Clear finished** — publish view exposes a confirmation dialog.
- **Clear failed** — publish view exposes a confirmation dialog.
- **Clear finished duplicates** — duplicate view exposes a confirmation dialog (one click, no accumulation).

## Failure diagnosis

Expanding a failed row gives you, in the UI:

- **Error code** (`error.code`) — useful for backend lookup or scripting
- **Error message** (`error.message`) — human-readable
- **Failing step.type** — which step it stalled at (`product/create` / `zsku/upsert` / `stock/upsert/stock-v2` …)
- **retryCount** — how many retries already happened

Send those four pieces plus the task ID back to the author and you'll get the fastest turnaround.

## Noon session state

A persistent `NoonLoginBanner` sits at the top of the task panel:

- **Not signed in to Noon** → red banner with a "Sign in now" CTA
- **Signed in** → banner disappears automatically
- Pick **Remind later** to hide it for this session; it comes back the next time it goes stale

This prevents tasks from silently failing — every publishTask stalls on 401 / 403 once the Noon session expires.

## Relationship with past listings

- Task records are saved independently by `taskId` and survive browser close / store switch.
- Editing a store does not rewrite history — historical tasks keep the store snapshot view (`ListingStoreTarget`) from the moment they ran.
- After a task finishes, the product's `pskuCode` (the real Noon PSKU) is written back to the Product row. Find it in [Store management](./stores) or the store's task list.

## FAQ

### Does retry double-charge?

No. AI translation / generation / prompt optimization all carry idempotency keys — the server dedupes on timeout retries. The publishing step table's resume semantics also skip steps that already passed.

### Task disappeared?

It may have been filtered out — clear the filter back to the default "running + failed / last 7 days" and try again. It may also have been wiped by **Clear finished** / **Clear failed**.

### Can I batch-retry failed tasks?

Currently retry is per row. Use the status filter to surface failed rows, then retry one by one.

### What does taskKind `group` mean?

That task corresponds to a group listing (see [Group & sizes](./group-and-sizes)): all items in the group walk the same `group/upsert` chain.