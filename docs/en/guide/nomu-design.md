---
title: NomuDesign image generation
description: "NomuDesign is Nomu's AI product image workspace. Compose source images, references, prompts and generation nodes on a canvas, then push generated images back to the product gallery in one click."
---

# NomuDesign image generation

NomuDesign is Nomu's built-in AI workspace for product imagery. It is not a "one-click background swap" filter, it is a composable canvas: you wire source images, reference images, prompts and generation nodes, the AI generates new images, and you push them back to the product gallery with one click.

> Without a signed-in Nomu account the whole design workspace is replaced by a sign-in wall. Once you are signed in you can run generation, which consumes AI credits from [Account & credits](./account).

## How to enter

All three entries land on the same design page:

- "Go to NomuDesign" from the single-product drawer or group page
- "NomuDesign" in the action sheet, which pops a product picker first
- Auto-redirect after applying a result

The canvas is one-to-one with a product: one product, one draft, no loss on refresh.

## The four node types

| Node | Purpose |
| --- | --- |
| Product image | An image picked from the product gallery, used as source or final apply target |
| Reference image | An uploaded reference image that visually guides the prompt |
| Prompt | The text given to the AI, with one-click **AI Optimize** |
| Generation | The run node, carrying model, tier, status and result |

Nodes wire into whatever chain you need: reference image, prompt, generation. The order you connect them in decides what the AI sees.

## Models & tiers

The dropdown in the top-right of a generation node switches model and tier:

- **Doubao-Seedream-5.0-lite**: tiers 2K / 3K / 4K
- **Doubao-Seedream-5.0-pro**: tiers 1K / 1.5K / 2K

If the tier you were on does not exist for the new model, it falls back to the new model's first tier.

## Prompt templates & AI optimize

The prompt node comes with these tools:

- **Preset templates**: built-in common prompts, one-click insert
- **Template list / dropdown**: your saved template collection
- **Save as template**: save the current prompt as your own template (with category) for reuse later
- **AI optimize**: call AI to rewrite or strengthen the prompt, consumes credits

## Generated images & history

Each generation node keeps the **latest 5** results. You can:

- Scrub through every version as thumbnails
- Click to roll back to an older version
- Download a single image
- Use the canvas-level lightbox to flip through pages

Running a node again overwrites: the node holds only the current version. Older images that no downstream node still points at are cleaned up.

## Apply to product

After a generation, hit **Apply to product…**:

- Apply means **append**. The new image is written into the product gallery and stays independent of the generated original
- The target can be the canvas's owning product or any sibling in the same group, so several products in one group can share a single design
- If the product already has 9 main images, a warning shows and nothing is appended

After apply, a confirmation modal lists the targets. Confirm and the new images are written into the product gallery, and you are bounced back to the canvas.

## Relationship with the listing pipeline

NomuDesign does not participate in the listing step table. It is pre-listing work: after generating and applying, you go through the regular listing pipeline, and the image step picks up the new product images directly.

## FAQ

### Generation failed or insufficient credits?

The credit card on the [Account & credits](./account) page shows the balance. Insufficient balance or service unavailability shows an explicit message.

### Does AI optimize double-charge?

No. A timeout retry of the same operation is charged once.

### Does Apply replace the original image?

No. Apply means "append main images to the product gallery". The original is untouched. To reorder main images, open the product editor and click **Set as main**.

### Draft gone?

Drafts are stored per product, and reopening the canvas restores them automatically. If the product has been archived, NomuDesign still opens and the draft is intact and editable.
