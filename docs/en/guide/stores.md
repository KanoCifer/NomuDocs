---
title: Store management
---

# Store management

Every listing action in Nomu is organized around a "store": which country, what PartnerCode, which warehouse, how warranty is registered, how the PSKU sequence advances — all live on the store record. A whole captured batch shares one set of store settings.

## Where to see stores

Store management lives in the Chrome side panel. Two entry points:

- Click the Nomu icon in the toolbar to open the popup, then click **Open full side panel**.
- From any page, press `Ctrl/⌘ + Shift + Y` (see [Keyboard shortcuts](./shortcuts)).

The side panel shows the active store's overview (country / PartnerCode / warehouse count / warranty), the store list, and actions like **Detect current page**, **New store**, **Edit**, **Refresh warehouses**, and **Delete**.

## What fields a store has

Each store is a row in the Dexie `configs` table (`kind: 'store'`), shaped as `ConfigModel`:

| Field | Meaning |
| --- | --- |
| `note` | Memo for distinguishing stores under the same PartnerCode; can be empty |
| `country` | Country: `sa` (Saudi Arabia) or `ae` (UAE) |
| `partnerCode` | Noon PartnerCode; new entries must start with `PRJ…` or be pure digits |
| `noonStoreCode` | Noon store code (e.g. `STR520747-NSA`); enter manually or auto-detect |
| `wareHouses` | FBP warehouse snapshot; chosen directly during publishing |
| `warrantyType` | Warranty type (e.g. `seller`) |
| `warrantyDuration` | Warranty duration (only for `seller` type) |
| `pskuPrefix` | PSKU prefix, default `N` |
| `pskuSeq` | PSKU sequence as a numeric string; pad-then-increment by string length (`0001 → 0002`), natural growth past the limit (`9999 → 10000`) |
| `fulfillmentType` | Fulfillment: `fbp` (fulfilled by partner) or `fbn` (Noon warehouse) |

## Multiple stores under one PartnerCode

The same PartnerCode may have multiple records — e.g. an `fbp` store and an `fbn` store side by side, or UAE / Saudi as separate rows. New stores are always appended. Name collisions get auto-suffixed with `-1`, `-2`, etc. by the storage layer.

Switching stores only moves the "active" pointer. Product batches, NomuDesign drafts, and task records never interfere with each other.

## Detect from current page

Open a noon-catalog seller backend tab (e.g. `https://catalog.noon.partners/...`). The side panel's top-level **Detect current page** parses the active tab's URL plus the merchant API (`noon-store/list`) and writes the result into the store record. The flow:

1. Pull the `noonStoreCode`.
2. Reverse-look the PartnerCode, country, and other metadata.
3. Save to the store record and show "Detected and saved {partnerCode}".

> Older builds read the `noonStore` cookie via the `cookies` permission. We have since moved to the merchant API, which has a smaller permission footprint.

## FBP warehouse snapshot

When you create or detect a store, Nomu best-effort fetches the FBP warehouse list once and writes it into `wareHouses`. If the network blips during the call, the old snapshot is kept — you can hit **Refresh** on the row later to retry.

During publishing, the warehouses attached to the store flow straight into the listing pipeline's stock step. You don't have to pick a warehouse for every item.

## PSKU sequence

The PSKU sequence is a **numeric string** whose width is whatever you write:

- Default `1` → writes `1`, `2`, `3` …
- To keep the format `0001` / `0002`, store it as `"0001"`.
- Past the limit it grows naturally: after `9999`, it becomes `10000`.

The publishing engine increments `pskuSeq` for the store as it goes, then writes the new value back. Same-store collisions never happen.

## Fulfillment type

- `fbp` (Fulfilled by Partner) — you ship from your own warehouse.
- `fbn` (Fulfilled by Noon) — you send inventory to a Noon warehouse and Noon ships it. The store record maintains warehouses separately.

The publishing pipeline differs per fulfillment type. Picking the wrong one in the store record causes the stock step to fail.

## Delete and archive

Deleting a store also clears its PSKU sequence and other metadata, but **does not** roll back products already listed on Noon — Noon listing is one-way. Before deleting, confirm no batch or task depends on the store.

If you only want to take it offline temporarily, leave the record and change the memo. Multiple stores are normal.

## FAQ

### How do I know which store is active?

The popup hero shows "memo / PartnerCode / country" of the current store. In the side panel, the active row is highlighted with a dot.

### Same PartnerCode, two stores — how?

Just click **New store**, fill the same PartnerCode with different memos or different countries. Both records will coexist.

### Changing a store's settings affects past tasks?

No. Each task record carries the store snapshot view (`ListingStoreTarget`) from the moment it ran. Editing the store does not rewrite history.

### I don't see the "Detect current page" button?

Make sure the active tab is a noon-catalog backend tab. Otherwise you'll see "Current tab URL not detected".