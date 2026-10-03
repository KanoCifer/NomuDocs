---
title: Duplicate product
description: "Duplicate product in Nomu pulls the full contents of an already-listed Noon item by its source PSKU and rebuilds a listable draft in the current store, reusing category, brand, attributes, and images."
---

# Duplicate product

Duplicate product is how you move listings around inside Noon. Nomu finds an already-listed item by its source PSKU, pulls the whole thing back, and rebuilds it as a fresh draft in your current store. Category, brand, attributes, and images come along, so you don't fill them in again.

Typical uses: listing the same item on both UAE and Saudi, moving a hit from an old PartnerCode to a new one, or migrating between stores.

> A signed-in Nomu account is required. Signed out, the page is just a sign-in card.

## Entry

The duplicate entry is on the noon-catalog seller catalog page. Tap **Duplicate product** in the action menu to open the batch page, or duplicate a single product from its own drawer.

## Input: source product location

Each row needs three required fields, plus two optional ones:

| Field | What it is |
| --- | --- |
| Source PSKU | The Noon PSKU you're duplicating from |
| Target PSKU | The new product's Partner SKU in your store |
| Barcode | Optional. Leave it empty to carry over the source barcode |
| Brand | Optional. Empty follows the source brand, filled in wins for that row |

Store, warehouse, stock, and warranty aren't per-row. They come from [Store management](./stores), so editing the store changes all of them.

## Cross-device duplication

The target doesn't have to be this machine. The top of the page lists every device signed in to your account, with this machine first and the others badged online or offline. Pick one and that's where the result lands:

- **This machine** runs the duplication locally and drops it straight into the local listing queue. Nothing is pushed anywhere.
- **Another device** means this machine only pushes the source contents over. Nothing is saved locally. An online device picks it up immediately; an offline one gets it next time it comes online.

Both ends need to be signed in to the same account with the extension running. A "source PSKU + target PSKU" pair that already has a task running or queued gets reused rather than queued twice.

**Stock doesn't travel with the push.** The sender's stock means nothing to the receiver. Stock comes through empty and you fill it in on the receiving device's [Task panel](./tasks). For FBP, missing either quantity or warehouse means the stock step is skipped and the product lands on Noon at zero stock.

## Single vs batch

Single duplication suits moving one or two items. Batch suits setting up a store or migrating between stores.

In batch mode you can paste Excel (tab separated) or CSV (comma separated) straight in. The column order is fixed: source PSKU, target PSKU, barcode, and the third column is optional. Hit **Identify pasted content** and you'll see how many rows came through. Nothing recognizable means you get told so instead of a half-empty batch.

Every row stays editable:

- Edit source PSKU, target PSKU, or barcode by hand
- Generate a SKU in one click
- Delete a single row

The same barcode can't appear twice in one batch. Those rows fail at submit, and you're told which row the duplicate came from.

## Task tracking

Duplicate tasks live in the **Duplicate tasks** view of the [Task panel](./tasks), with five states:

- Waiting, still queued for handling
- Enqueued, the copy is done. Watch the listing task from here
- Forwarded, another device has the copy and nothing was stored locally
- Failed, usually because the source PSKU isn't on Noon, or the target PSKU already exists in this store
- Cancelled

The panel can clear finished tasks, retry failed rows one by one, and cancel work in progress.

## What you can change after duplication

Only the inheritable parts come across (category, brand, attributes, images, description, and so on). Target PSKU, barcode, stock, warehouse, and warranty are written from your current store settings. Once the copy is in the listing flow, every edit listed in [Quick start](./quick-start) is still available.

If the target PSKU already exists in the current store, the duplication doesn't overwrite it. That row simply fails. Use a different target PSKU for a different product.

## Relationship with Group / Sizes

Duplication produces a single product. To group it with other products or hang it under a size table, use the group or sizes flow in the listing drawer. See [Group & sizes](./group-and-sizes).

## FAQ

### Does duplication overwrite an existing product?

No. If the target PSKU is already there, that row fails. Deal with the old listing on the Noon backend first, or use a different target PSKU.

### Can I reuse category / brand?

Both follow the source. To use a different brand, fill the brand in for that row. Empty means follow the source.

### If I change category or brand in the duplication, does it still follow source?

Only when you leave it empty. An empty brand follows the source product, a filled-in one wins for that row. Category always follows the source.

### I duplicated but I don't see the product?

Open the duplicate view in the [Task panel](./tasks). Enqueued means wait for the listing task to finish. Failed means the reason is in the message.
