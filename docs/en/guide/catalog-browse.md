---
title: Catalog browse
---

# Catalog browse

Catalog browse is Nomu's "active / hidden item overview" panel that sits on the Noon seller catalog. It does not replace the Noon backend — it is a **panel overlaid on top of the original page**: every detail of the original page stays visible, with a searchable, paginated, status-toggleable view next to it.

## How to open

- From any page, press `Ctrl/⌘ + Shift + O` (see [Keyboard shortcuts](./shortcuts))
- Tap **Catalog browse** in the action sheet
- Tap the **Catalog browse** entry at the top of the popup

It slides in from the side and floats above the original page. Closing it returns you to the original page; no navigation.

## What you see

Each row shows a `CatalogOffer` — one offer returned by the `offer/list/noon` API:

- Product main image thumbnail
- Title
- PartnerSku
- Currency / price (if present)
- Seller status chip (active / hidden)
- Optimization hints (`offer_issues`)

Search filters by partnerSku / title substring; the search box has a 300ms debounce.

## Paging & status

- 20 items per page
- When the drawer is open and focus is not in the input, `←` / `→` pages back / forward
- When the limit is hit, a **Load older** button appears at the bottom

State machine:

| Status | Meaning |
| --- | --- |
| `idle` | Initial |
| `no-active-store` | No active store — prompts you to pick one in the side panel |
| `missing-store-code` | Active store lacks a Noon Store Code — prompts you to fill it in |
| `loading` | Fetching |
| `ready` | Got results |
| `error` | API failed; retry button available |

## Toggle seller status

The inline **active / hidden** switch uses optimistic updates — the UI flips immediately, the request rolls back on failure, and on success the page is re-fetched. The response's `psku[].is_active` is the source of truth and is written back to the row, keeping the local view aligned with the Noon backend list.

## Inline product edit

Each row has a pencil button on the right. Tap it to open the "inline product edit" dialog — directly edit title, price, stock, category, brand, etc. on a single offer. Submission walks a publishTask on the minimal-change path and does not touch other fields.

> The same ability lives in the [Quick search](./quick-search) overlay.

## Relationship with the task panel

Status changes in catalog browse are **immediate** (direct call to `offer/upsert/is_active-plp`); they do not enter the publishTask step table — a different write path from "publish". Within 100ms of the change, `db.changed` is pushed back; catalog browse and any other view subscribing to the same resource (such as the [Task panel](./tasks)) refresh in sync.

## Relationship with duplicate

Catalog browse is **read-only + status-toggle**; to duplicate into the current store, use the [Duplicate product](./duplicate) flow from the action sheet — its own form, its own task, not chained inside catalog browse.

## FAQ

### Empty list?

- `no-active-store` — no active store picked yet
- `missing-store-code` — the active store's Noon Store Code is empty; fill it in under [Store management](./stores)
- API error — see the error message and retry

### Toggled status, but the page hasn't updated?

Press `Cmd/⌘ + R` to refresh the original page. Nomu has already written the change to Noon; the original page just isn't re-fetching automatically.