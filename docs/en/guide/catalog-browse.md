---
title: Catalog browse
description: "Nomu catalog browse overlays an active and hidden item drawer on the Noon seller catalog. Searchable, paginated and status-toggleable, with every detail of the original page preserved."
---

# Catalog browse

Catalog browse is a panel that slides in along the right edge of the Noon seller catalog page. It does not replace the Noon backend: the original page stays exactly as it is, with a searchable, pageable, status-toggleable view next to it.

## How to open

- Tap **View Catalog** in the action sheet

It slides in from the side and floats above the original page. Closing it brings you back to that page; nothing navigates away.

## What you see

Each row is one product:

- Main image thumbnail
- Title
- Status (live / hidden), tap it to switch
- Price
- Stock (FBN / FBP)
- Partner SKU and Noon SKU
- Units sold and impressions
- Optimization hints

The search box filters by Partner SKU or title. Give it a moment after typing and the results come back on their own.

## Paging & status

- 20 items per page, and you can jump straight to a page number at the bottom
- While the drawer is open and the cursor is out of the search box, `←` and `→` page back and forward

With no store selected, the panel tells you to pick one under Settings, "Store management" first. If loading fails, you get the reason and a **Retry** button. An empty list reads "No products yet".

## Toggle seller status

Tapping the status marker in a row flips it, and the result goes straight back to Noon. If the write fails, the row returns to its previous state and shows the reason underneath.

## Inline product edit

Each row has a pencil button on the right. It opens the **Edit product** dialog, split into product content (title, description and bullet points, one set each for English and Arabic), price, barcode, and more product info (dimensions, weight, suggested retail price, tax rate and so on).

Only the fields you fill in get submitted. Anything left blank keeps its current value on Noon. Products missing a parent SKU code cannot be edited, so their pencil button is disabled.

> The same dialog is available from the [Quick search](./quick-search) overlay.

## Relationship with the task panel

Status changes made in catalog browse take effect immediately and never enter the publish task list. Once the change lands, every view of those same products, such as the [Task panel](./tasks), refreshes with it.

## Relationship with duplicate

Catalog browse is for browsing and status changes only. To copy products into the current store, use [Duplicate product](./duplicate) from the action sheet.

## FAQ

### Empty list?

- No active store picked yet under Settings, "Store management"
- The keyword is too long, try a shorter one
- Loading failed, read the reason in the panel and retry

### Toggled status, but the page hasn't updated?

Nomu has already written the change to Noon. The original page simply does not refresh itself, so press `Cmd/⌘ + R` to reload it.
