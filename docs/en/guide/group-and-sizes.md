---
title: Group & sizes variants
description: "Group and sizes variants in Nomu: two ways to publish several versions of the same product together on Noon, with where each one is configured and what limits each one has."
---

# Group & sizes variants

When you publish several versions of the same product, Nomu gives you two ways to hold them together. They sit side by side as separate tabs on the Noon backend, and they differ in where you configure them and what they let you do:

| Path | Noon backend | Code marker | Each product | Typical use |
| --- | --- | --- | --- | --- |
| Group | Group tab | Group product codes start with `ZD` | Published on its own, one failure doesn't touch the rest | Same product in several sizes or models, a colour range |
| Sizes | Sizes tab | Variant parent codes start with `ZA` | Children hang off the parent | Standard size tables (clothes, shoes) |

A plain single product that uses neither path publishes exactly as it always did.

## Group listing

### When to use

Several products of the same brand and category, each with its own SKU and images, but the title, description, selling points, category, and department need to stay aligned. Grouping gives buyers one product page with the variants listed underneath it.

### How it runs

Open the action menu and pick **Create group**. Three steps:

1. Pick one product as the parent
2. Tick the SKUs to pull into the group. Same brand, at least one
3. Give the group a name, tick the specification axes, fill in the value for each product, then confirm

### Key rules

- **Everything in a group has to be the same brand.** A different brand means the group won't build. Products with no brand can join, but they end up on the brand the group already has.
- **Category doesn't have to match.** Editing the group's shared fields overwrites every member, so think before you change one.
- Every product in the group has to belong to the store you're working in.
- One product can't sit in two groups at once. Move it out of the old group or dissolve that group first.
- Once a member has a task running or already finished, you can't replace the whole group. Dissolve it and build again.
- Each product inside a group publishes on its own. One failure doesn't roll back the others, and the task panel shows a separate status for each.
- The group name is the one you typed when you built it, and Noon files the products under it.

### Distinguish the concepts

- Group product codes start with `ZD`, and they show up on the Group tab.
- Variant parent codes start with `ZA`, and they show up on the Sizes tab.
- These are two separate mechanisms on the Noon backend. Don't read one as the other.

## Sizes variant group

### When to use

A standard size table. The product you're on becomes the parent, with any number of size children under it. A child only needs a size, a SKU, and a barcode. Everything else follows the parent.

### How it runs

Size variants don't need their own task. You set them up in the single-product listing form:

1. Capture or create your product (see [Quick start](./quick-start))
2. Open the product's listing drawer and scroll to the size variants section
3. Fill in **Current product size** with this product's own size, say S / M / L
4. Add children with **Add size**, one row per child with a size, a SKU, and a barcode. SKUs are generated for you and you can edit them
5. Submit as usual. The parent and its children go out together in that one submission

Leave the size variants section empty and it stays an ordinary single-product listing.

### Key rules

- **Size is the only axis you get.** There's no second axis for colour or style.
- **The parent size is required.** Fill in children without a parent size and that product fails to publish.
- Two child rows can't share the same size. Duplicate child sizes are rejected.
- If a child's size matches the parent's, that's fine. The axis option is de-duplicated instead of throwing an error.
- A child barcode can be left empty, and then no barcode gets written for it.
- The parent publishes first, then the children are created one by one.

### Task panel markers

Size variants aren't a separate kind of task. They run as part of the single-product listing task, so what you see in the task panel is an ordinary single-product task. The children's codes show up in the task details.

## Group or Sizes?

| What you want | Use |
| --- | --- |
| Standard size table (S / M / L / XL …) | **Sizes** |
| Colour range (red / blue / black), separate images per colour | **Group**, with the Colour Name axis |
| One model with sub-models (phone 128G / 256G / 512G) | **Group**, with the Model Name axis |
| Different images shown per colour variant | **Group**, with the Colour Name axis |
| Children that follow the parent | **Sizes** |

## FAQ

### After grouping, why are the items' statuses still independent?

Grouping lines the products up together on the Noon backend. It doesn't mean they succeed or fail as a set. Each product publishes on its own and the task panel tracks them one by one.

### Does Grouping require same brand?

Yes. Same brand is a hard rule and a group won't build across brands. Products with no brand can slip in, but they take the brand the rest of the group has.

### Can Group and Sizes coexist?

No. Once a product has size variants in its single-product form, its children stay out of any group. Grouping only takes products that haven't been listed yet.

### Do size variants need their own task?

No. They go out with the product. The parent publishes first, then the children are created one by one.
