---
title: Group & sizes variants
---

# Group & sizes variants

When listing multiple same-product-different-spec items on Noon, Nomu provides two parallel "variants" paths. Both group several items for one publish, but the semantics, the platform's data shape, and the entry point all differ:

| Path | Platform UI | Platform artifact | Per-item independence | Typical scenario |
| --- | --- | --- | --- | --- |
| Group | Noon backend Group Tab | `skuGroup` (`ZD…`) | Kept: each item walks its own `product/create` chain | Same product, multiple sizes / models, color series |
| Sizes | Noon backend Sizes Tab | `parentGroupKey` / `skuParent` (`ZA…`) | Children inherit parent, price is independent | Standard size tables (clothes / shoes) |

The two paths **do not interfere** — single-product listing (neither group nor sizes) still walks the original pipeline. Nothing is mandatory.

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

Noon backend's `Sizes` tab for standard size tables: a parent (with price / description / images) and N size children. The children's content **inherits automatically** from the parent (image, title, description, brand, etc.); **only the price needs to be upserted separately**.

### How it runs

1. The parent walks the single-product path to "active" first (see [Quick start](./quick-start))
2. In the action sheet, pick the parent in the Sizes section to pop the "sizes variant" drawer
3. Fill in the parent's size plus the children rows (each with its own PartnerSku)
4. After submission, the engine walks `product/update` → `parent + axesUpdate + childrenCreate`; children are assigned `sku = parent-{childIx}`

### Key rules

- **The axis must be exactly 1 = size**, no multi-axis (color / style)
- In the single-product path, "every product is its own parent" — parent/child is a local disambiguator, not "a group sharing one size set"
- Children's prices are written separately via `offer/upsert/price`
- Parent publication is required: `category` (FullTypeCategory) + `brand` (BrandRef) + `price > 0` + `warrantyType` — missing any one fails the parent publish step directly

### What if the parent is not yet published

The Sizes entry **does not require the parent to be published**. Parent publication is fully handled by the backend `sizes.worker`:

- `sizes.parentPublish` first checks `parent.status === 'active' && parent.parentGroupKey` — if satisfied, skip; otherwise walks the single-product path to publish the parent
- After `sizes.assertParentPublished`, the engine continues with `childrenUpdate` / `childrenCreate` / `zskuUpsert` / `virtualCompute`

If the parent's publication is already committed and the required fields are present, the CTA just fires a sizes-scope batch and the backend handles it; otherwise it throws before submission with a human-readable CTA hint.

### Task panel markers

- Sizes tasks show up as `taskKind: 'sizes'`
- The row's child area shows `parentGroupKey` / `pskuCode` / `sku` / `childIx`

## Delete a Sizes variant group

Deleting a Sizes variant group **really deletes** the parent and children with no archive residue (a previous deletion-residue bug was fixed). Confirm there are no in-flight tasks before deleting.

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

**No**. A product that is a Sizes child is not a Group member. The action sheet's Sizes section only shows rows with `variantRole='parent'`; the Group section only shows unlisted single products.

### If the parent is not yet published, can I still build children?

Yes. The **Add N sizes** CTA in the Sizes drawer is not disabled by the parent's unlisted state. The backend worker falls back to publishing the parent first, then building children.