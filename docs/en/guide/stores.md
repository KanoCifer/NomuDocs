---
title: Store management
description: "Nomu store management: manage Noon stores by country, partner code, warehouse, warranty, and PSKU sequence. A whole captured batch shares one set of store settings."
---

# Store management

Which country, which partner code, which warehouse, how warranty is registered, where the PSKU sequence starts: all of it lives on the store record. A whole captured batch shares one set of store settings, so a store filled in wrong takes the whole batch down with it.

## Where to see stores

Store management lives on the extension's settings page. Two ways in:

- Click the Nomu icon in the toolbar, then click **Open store settings** in the popup.
- Press `Ctrl/⌘ + Shift + P` for the action sheet, then go to **Settings**.

The page shows the active store at a glance (country, partner code, warehouse, warranty), the store list, and the actions **Detect current page**, **New store**, **Edit**, and **Delete**.

## What fields a store has

| Field | What it does |
| --- | --- |
| Note | Tells apart stores sharing one partner code. Optional. |
| Country | `sa` (Saudi Arabia) or `ae` (UAE) |
| PartnerCode | Your Noon partner code. A new store needs either `PRJ` followed by digits, or digits only, and nothing else saves otherwise. |
| Noon Store Code | Your Noon store code, for example `STR520747-NSA`. Type it in or let Nomu detect it. |
| Fulfillment type | `fbp` (you ship) or `fbn` (Noon warehouse) |
| Default FBP warehouse | The warehouse new products stock against by default. Each product can still override it. You need a partner code filled in before the warehouse list will load. |
| Warranty type | Not set / No warranty / Warranty |
| Warranty months | Only used when the type is Warranty. Other types ignore it. |
| PSKU prefix | The fixed prefix on every PSKU. Defaults to `N`. |
| PSKU sequence | A digits-only string. See [PSKU sequence](#psku-sequence). |

## Multiple stores under one PartnerCode

One partner code can have several records side by side: an `fbp` store and an `fbn` store under the same partner, or UAE and Saudi as separate rows. Creating a store always appends, so it never overwrites an existing one. Notes that clash get a `-1`, `-2` suffix added automatically.

Switching stores only moves which one is active. Batches, drafts, and task records stay untouched.

## Detect from current page

Open a noon-catalog seller backend tab and click **Detect current page** at the top of the settings page. Nomu reads the store details out of the current tab's address, saves them to the store record, then confirms that it detected and saved the partner code it found.

The details come from the tab's address, so an address without a store code in it can't be detected.

## PSKU sequence

The sequence is a digits-only string, and its width is whatever you type:

- Start at `1` and you get `1`, `2`, `3`
- Store it as `0001` to keep the `0001` / `0002` shape
- Past the width it grows on its own, so `9999` becomes `10000`

Publishing increments from the store's current sequence and writes the consumed range back, so two products under one store never land on the same number.

## Fulfillment type

- `fbp` (Fulfilled by Partner), you ship from your own warehouse. Pick a default FBP warehouse on the store, otherwise every product needs its own warehouse and stock.
- `fbn` (Fulfilled by Noon), stock sits in a Noon warehouse and Noon ships it. Noon writes no stock for these.

Getting the fulfillment type wrong leaves stock unwritten instead of failing the publish, so check stock on the Noon backend after you list.

## Delete and archive

Deleting a store clears its PSKU sequence and other settings with it, but never rolls back products already listed on Noon. Noon listing only goes one way, so check that no batch or task still needs the store before you delete it.

If you only want it off to one side, keep the record and change the note. Running several stores is normal anyway.

## FAQ

### How do I know which store is active?

The popup header shows the note, partner code, and country of the active store. On the settings page the active row is highlighted with a dot.

### Same PartnerCode, two stores: how?

Create a store with the same partner code and a different note or a different country. Both records exist side by side and don't interfere.

### Changing a store's settings affects past tasks?

No. Each task keeps the store details as they were when it ran. Editing the store later never rewrites history.

### I don't see the "Detect current page" button?

Check that the active tab really is a noon-catalog backend tab. If it isn't, Nomu says "Current tab URL not detected". If it is but nothing was detected, it says the page has no store code and to open noon-catalog.
