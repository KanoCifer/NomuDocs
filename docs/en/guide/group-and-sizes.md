---
title: Group & sizes variants
---

# Group & sizes variants

When listing multiple same-product-different-spec items on Noon, Nomu provides two parallel "variants" paths. Both group several items for one publish, but the semantics, the platform's data shape, and where you configure them all differ:

| Path | Platform UI | Platform artifact | Per-item independence | Typical scenario |
| --- | --- | --- | --- | --- |
| Group | Noon backend Group Tab | `skuGroup` (`ZD…`) | Kept: each item walks its own `product/create` chain | Same product, multiple sizes / models, color series |
| Sizes | Noon backend Sizes Tab | `parentGroupKey` / `skuParent` (`ZA…`) | Children inherit parent, price is independent | Standard size tables (clothes / shoes) |

The two paths **do not interfere** — single-product listing (neither grouped nor with size variants) still walks the original pipeline. Nothing is mandatory.

## Group listing

### When to use

Multiple products of the "same brand, same category", each with its own PartnerSku and images, but the **title / description / selling points / category / department** must stay aligned. Grouping makes the buyer see one unified PDP with selectable variants underneath.

### How it runs

1. Capture or create multiple same-product items
2. Check the ones to group in the listing drawer
3. Set the "group name" (`partnerRef`) and the "specification axis" (`size` / `model_name` / `colour_name`)
4. After submission, the engine walks the group path: the **first item** does `group/upsert` to create the group and get a `skuGroup` (`ZD…`); **subsequent items** join with that `skuGroup`; each item additionally writes its own axis value after joining

### Key rules

- **Same brand is a hard gate** (criterion = `BrandRef.code`): enforced by the create/replace transaction in the storage layer. If either side has no brand, it is allowed; **the in-group brand must match** before the group can be created
- **Same category is not a gate**: in-group category consistency is only maintained by "editing group shared fields overwrites members"; there is no transactional validation
- Each item, after grouping, still walks its own full `product/create` chain and content; it does not share a SKU chain. "Group" is an **optional aggregate view** on top of the flat product model (see [CONTEXT.md](https://github.com/KanoCifer/noon-tool/blob/main/CONTEXT.md) ADR-0001 / 0006)
- Group tasks show up in the task panel as `taskKind: 'group'`, with "N items · parent/child · #N"

### Distinguish the concepts

- `skuGroup` (`ZD…`) — the group identifier in the group path
- `skuParent` (`ZA…`) — every product's own parent code in the single-product path (in single path, the two are equal)
- **Do not** conflate "Group" with "Sizes variant" — they are parallel mechanisms in the platform UI

## Sizes variant group

### When to use

Noon backend's `Sizes` tab for standard size tables: one product acts as the parent (with price / description / images), with N size variants as children. The children's content **inherits automatically** from the parent (image, title, description, brand, etc.); **the price needs to be written separately**.

### How it runs

Size variants no longer need a separate task — you configure them right in the **single-product listing form**:

1. Capture or create your product (see [Quick start](./quick-start))
2. Open the product's listing drawer and scroll to the "Size variants" section
3. Click "Add variant" and fill in the **parent size** (this item's own size, e.g. S / M / L)
4. Add child rows one by one: each with a size, SKU, and barcode (SKUs are generated for you, and can be edited)
5. Submit as usual — the parent and all children go out in that single submission

Leaving the "Size variants" section empty means an ordinary single-product listing, with no variant logic triggered at all.

### Key rules

- **The axis must be exactly 1 = size**, no multi-axis (color / style)
- The parent size is required once you've added variants: without it, that product fails to publish
- Child SKUs are derived as `parentCode-{index}`, numbered in the order you filled the variant rows
- Child prices submit together with the variants, matching the row order
- Size names are trimmed, and a child size identical to the parent size is de-duplicated — you won't get a repeated axis option
- The engine handles variants in the **last step** of single-product listing: the parent's content (title, images, price) lands on Noon first, then children are created one by one

### Task panel markers

Size variants are no longer a separate task type — they run as the final step of the single-product listing task, so what you see in the task panel is an ordinary single-product task. The children's `parentGroupKey` / `pskuCode` / `sku` show in that task's child area.

## Group or Sizes?

| What you want | Use |
| --- | --- |
| Standard size table (S / M / L / XL …) | **Sizes** |
| Color series (red / blue / black), independent images per color | **Group** |
| Same model with sub-models (phone 128G / 256G / 512G) | **Group** + `model_name` axis |
| Different images per color variant | **Group** + `colour_name` axis |
| Children content must strictly inherit from parent | **Sizes** |

## FAQ

### After grouping, why are the items' statuses still independent?

Grouping is a platform-level "shared section + members" organization, **not** "all members succeed or fail together". Every item still walks its own `product/create` chain and step table; the task panel shows independent statuses.

### Does Grouping require same brand?

Yes. Same brand is a hard gate — `BrandRef.code` must match for the group to be created. If either side has no brand set, it is allowed past the UI; the storage layer still enforces the rule when actually creating.

### Can Group and Sizes coexist?

**No**. Once a product has size variants filled in on its single-product form, its children are not Group members. The Group section only shows unlisted single products.

### Do size variants need their own task?

No. They're the final step of the single-product listing task and submit with the product — the parent lands on Noon first, then children are created one by one.