---
title: Product catalog
description: "Nomu's product catalog is a page of its own: list, detail and filters side by side. Searchable, filterable, pageable, with fee breakdown and profit, seller-status changes and batch editing."
---

# Product catalog

The product catalog is a Nomu extension page of its own. It does not cover the Noon backend — the backend stays exactly as it is, and the catalog page sits beside it (or in another tab) as a view you can search, filter, cost out and edit.

## How to open

- **View Catalog** in the action sheet
- **Catalog** at the bottom of the extension popup

Both lead to the same page.

## What each column holds

The page is three columns, left to right:

- **List** — the current store's products. Each row shows the image, title, status, stock, Partner SKU / Noon SKU, plus **units sold** and impressions. Rows show sold rather than the selling price, so you judge what actually moves before picking stock.
- **Detail** — click a row and this column shows that product's full information.
- **Filters** — narrow the list by status, stock, price and other dimensions, with a one-click clear at the top that tells you how many were cleared. When there is nothing to filter by, this column stays away.

With no store selected, the page tells you to pick one under Settings, "Store management". If loading fails, you get the reason and a **Retry** button.

## Search and paging

- The search box filters by Partner SKU / Noon SKU / title; give it a moment after typing and the results come back on their own
- 50 items per page, and you can jump straight to a page number at the bottom

## Fee breakdown and profit

Selecting a product works out a fee breakdown and a profit card immediately: how the price splits across commission, FBN shipping, first-mile and product cost, at a glance.

Items with missing data are named rather than folded into a number that merely looks complete (`The following items were not queried for lack of data: …`).

## Toggle seller status

Tapping the status marker flips it, and the result goes straight back to Noon. If the write fails, the row returns to its previous state and shows the reason underneath. Select multiple rows to switch status or delete in bulk.

Draft rows missing a psku are skipped, and the result reports `· N skipped` — the whole batch never fails quietly.

## Inline product edit

Each row has an edit button that opens the edit panel, split into product content (title, description and bullet points, one set each for English and Arabic), price, barcode, and more product information (dimensions, weight, suggested retail price, tax rate and so on).

Only the fields you fill in get submitted. Anything left blank keeps its current value on Noon.

> The same capability is available from the [Quick search](./quick-search) overlay.

## Relationship with the task panel

Status changes made in the catalog take effect immediately and never enter the publish task list. Once the change lands, every view of those same products, such as the [Task panel](./tasks), refreshes with it.

## Relationship with duplicate

The catalog is for browsing, editing and status changes. To copy products into the current store, use [Duplicate product](./duplicate) from the action sheet.

## FAQ

### Empty list?

- No active store picked yet under Settings, "Store management"
- The keyword is too long, try a shorter one
- The filters hid everything — clear them and look again
- Loading failed, read the reason on the page and retry

### Toggled status, but the page hasn't updated?

Nomu has already written the change to Noon. The Noon backend page simply does not refresh itself, so press `Cmd/⌘ + R` to reload it.