---
title: Duplicate product
---

# Duplicate product

"Duplicate product" is Nomu's bulk porting capability inside Noon: it pulls a complete snapshot from an already-listed source product (located by PartnerSku) and rebuilds a fresh draft under the current store. It reuses category, brand, attributes, and images so you don't have to fill them again.

Typical scenarios: the same item listed on both UAE / Saudi, moving a hit from an old PartnerCode to a new one, or migrating inventory between stores.

## Entry

The duplicate entry lives on the noon-catalog seller catalog page:

- Tap **Duplicate product** in the action sheet to open `DuplicateProductDialog`
- You can also duplicate a single product from inside its drawer

The dialog is mounted at the top of the UI, independent of the main listing flow. Pick a target device and it starts assembling tasks.

## Input: source product location

Each duplicate row needs three core fields:

| Field | Meaning |
| --- | --- |
| Source PSKU (`sourcePsku`) | The source Noon PSKU to duplicate from |
| Target PartnerSku (`targetPartnerSku`) | The new product's Partner SKU in your store |
| Barcode | Optional, the new product's barcode |

Brand can be customized (the `brand` field, empty = follow the source brand). Store, warehouse, stock, and promo fields are no longer per-row — they all **come from the store configuration** ([Store management](./stores)). Editing the store edits the global behavior.

## Cross-device duplication

The target does not have to be local. The top of the dialog lists every signed-in device under your account (this machine is first, with online / offline badges and last-active timestamps). Pick one and that device lands the result:

- **This machine** — duplication runs locally, drops straight into the local listing queue. Nothing is pushed.
- **Other device** — this machine only pushes the source snapshot; **nothing is saved locally**. The target device rebuilds the draft under its currently active store and queues it for listing. If the target is online, it picks up immediately; otherwise on next launch.

Cross-device duplication rides on the multi-device sync bus. Both sides need to be signed in to the same account with the extension online. Delivery is idempotent: a "source SKU + target PartnerSku" pair that already has an in-flight or queued task is reused, never duplicated.

Stock is **not** shipped with the cross-device snapshot — the sender's stock is meaningless to the receiver. The receiving end marks it as to-be-filled; complete it in that device's [Task panel](./tasks) as needed.

## Single vs batch

Single is for porting one or two items. Batch is for store initialization or cross-store migration.

In batch mode, you can paste Excel / CSV cells directly. The paste area auto-detects three columns: source PSKU, target Partner SKU, and Barcode (via headers or column order). The number of detected rows is shown up front. Unrecognized rows are flagged explicitly and do not slip into the queue.

Each row in the table is independently editable:

- Manually edit source PSKU / target Partner SKU / Barcode
- One-click Barcode generation (the **Generate barcode** button produces one in `{country}-{seq}` format)
- Delete a single row

**Start duplication** enables only when all rows are valid. Once pressed, rows are queued one by one with per-row progress; closing the dialog does not abort the queue.

## Task tracking

Duplicate tasks have their own state machine: `pending → enqueued / cancelled / failed`.

- `pending` — waiting in the table for the background driver
- `enqueued` — terminal; the corresponding `publishTask` is queued. Further progress is read from publishTask
- `cancelled` — manually cancelled (per row, single-row cancel)
- `failed` — pre-flight failed; could be source PSKU not found, merchant API error, etc.

After enqueueing, batch tasks live in the [Task panel](./tasks) under the **Duplicate tasks** view, which provides:

- One-click clear of finished duplicate tasks
- Per-row retry of failed tasks
- Cancel in-flight tasks

## What you can change after duplication

Duplication only copies the "inheritable" parts (category, brand, attributes, images, description, etc.). Target PartnerSku / Barcode / stock / warehouse / warranty are written from the current store configuration. Once duplication enters the publishTask step table, all the pre-listing edits mentioned in [Quick start](./quick-start) are still possible.

## Relationship with Group / Sizes

Duplication produces a **single product** (`taskKind: 'single'`). To put it into a group or under a sizes variant, go through the group or sizes flow in the listing drawer — see [Group & sizes](./group-and-sizes).

## FAQ

### Does duplication overwrite an existing product?

Yes. If the target PartnerSku already exists in the current store, duplication treats it as upsert and refreshes the row. Use a different target PartnerSku if you don't want to overwrite.

### Can I reuse category / brand?

Category and brand follow the source. If you want a custom brand, set the `brand` field in the batch row; empty = follow source.

### If I change category or brand in the duplication, does it still follow source?

Yes — `brand` empty means follow source; explicit means follow the row.

### I duplicated but I don't see the product?

Check the [Task panel](./tasks) duplicate view for whether it failed / got enqueued. After `enqueued`, wait for the publishTask to finish.