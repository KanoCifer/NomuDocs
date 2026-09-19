---
title: NomuDesign image generation
---

# NomuDesign image generation

NomuDesign is Nomu's built-in AI workspace for product imagery. It is not a "one-click background swap" filter — it is a composable canvas: you wire source images, reference images, prompts, and generation nodes, the AI generates new images, and you push them back to the product gallery with one click.

> A Nomu account is required to run generation — AI credits from [Account & credits](./account) will be consumed.

## How to enter

All three entries jump to the standalone page `nomu-design.html?productId=...`:

- "Go to NomuDesign" from the single-product drawer or group page
- "NomuDesign" in the action sheet, which pops a product picker first
- Auto-redirect after applying a result

The canvas is one-to-one with a product: one product, one draft, no loss on refresh.

## The four node types

| Node | Purpose |
| --- | --- |
| Product image (`image`) | An image picked from the product gallery, used as source or final apply target |
| Reference image (`referenceImage`) | An uploaded reference image that visually guides the prompt |
| Prompt (`prompt`) | The text given to the AI; supports one-click **AI Optimize** |
| Generation (`generation`) | The run node; carries model + tier + status + result |

Nodes wire into whatever chain you need: reference → prompt → generation. Topology decides what context the AI sees.

## Models & tiers

The dropdown in the top-right of a generation node switches `model · tier`:

- **Doubao-Seedream-5.0-lite**: tiers 2K / 3K / 4K
- **Doubao-Seedream-5.0-pro**: tiers 1K / 1.5K / 2K

Switching model falls back to the first tier of the new model if the old tier is not in the new model's tier list, so you never end up with an invalid value.

## Prompt templates & AI optimize

The prompt node ships with three tools:

- **Preset templates** — built-in common prompts, one-click insert
- **Template list / dropdown** — your saved template collection
- **Save as template** — save the current prompt as your own template (with category) for reuse later
- **AI optimize** — call AI to rewrite / strengthen the prompt (consumes credits)

The prompt input box is 10 rows tall, comfortable for long prompts.

## Generated images & history

Each generation node keeps the **latest 5** results (`GENERATION_HISTORY_LIMIT`). You can:

- Scrub through every version as thumbnails
- Click to roll back to an old version (rollback only replaces the current `designRef` pointer — no two-way history)
- Download a single image
- Use the canvas-level lightbox to flip through pages

Re-running is **overwrite** semantics — the node only holds the current draft. Replaced rows are kept **only** when still pinned by a downstream chained node's `designRef`, preventing dangling references.

## Apply to product

After a generation, hit **Apply to product…**:

- **Copy** semantics — a new `productAssets` row at `${memberId}-image-${sort}` plus a short reference added to the product's `images`, independent of the source generated image
- **Cross-member reuse** — the target can be the canvas's owning product or any sibling in the same group; multiple products in one group can share a single design
- If the product already has 9 main images, a warning shows and nothing is appended

After apply, a confirmation modal lists the targets. Confirm and the new images are written into the product gallery; you're bounced back to the canvas.

## Data persistence

- The canvas is persisted as a **draft** in Dexie `workbenchDrafts` (one product, one draft)
- Generated image bytes go into `designAssets` (a standalone domain entity, with its own lineage: prompt, model, tier, reference image refs)
- Product image bytes go into `productAssets` (split out from inline base64 in v10); main image rows hold only the short `asset:<id>` reference
- The three tables don't pollute each other; deletion semantics are naturally decoupled

> Archiving a product (`status='archived'`, with unarchive) does not delete `designAssets` — unarchiving restores the full workspace draft.

## Relationship with the listing pipeline

NomuDesign does not participate in the listing step table. It is a "pre-listing" preparation: after generating and applying, you go through the regular listing pipeline, and the image step picks up the new product images directly.

## FAQ

### Generation failed or insufficient credits?

The credit card on the [Account & credits](./account) page shows the balance. Insufficient balance or service unavailability shows an explicit message.

### Does AI optimize double-charge?

AI requests carry idempotency keys — timeout retries do not double-charge.

### Does Apply replace the original image?

No. Apply means "append main images to the product gallery". The original is untouched. To reorder main images, open the product editor and click **Set as main**.

### Draft gone?

Drafts are stored per product ID; reopening the canvas restores them automatically. If the product has been archived, NomuDesign still opens in read mode and the draft is intact and editable.