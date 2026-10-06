---
title: Quick search
description: "Nomu quick search: press Ctrl / Cmd + Shift + S in the Noon seller backend to open the search overlay, type a SKU or title keyword, and jump to detail or flip status in the current store."
---

# Quick search

Quick search is a search panel that floats above the Noon seller backend. Press `Ctrl/⌘ + Shift + S`, type a SKU or a title, and the live and hidden products in the current store line up right away. `Enter` opens the detail page, `Shift + Enter` flips the status. No hunting through a list first.

## How to open

- Shortcut `Ctrl/⌘ + Shift + S` (see [Keyboard shortcuts](./shortcuts))
- **QuickSearch** entry in the action sheet

The input is focused the moment the panel opens, so you can start typing straight away.

## Visuals & layout

Each candidate shows a title, its Partner SKU, the price, and the status (live / hidden).

- Up to 5 candidates, and the more specific your keyword the closer the match
- The bottom bar tells you where you are: how many candidates, still searching, no match, or search failed
- With no store selected, it tells you to pick one under Settings, "Store management" first
- When nothing matches, it names the keyword that came up empty and asks you to try another one

## Keyboard

| Key | Behavior |
| --- | --- |
| `↓` / `Ctrl + N` | Select next |
| `↑` / `Ctrl + P` | Select previous |
| `Enter` | Open the selected product's detail page (new tab) |
| `Shift + Enter` | Toggle the selected product's seller status (live ↔ hidden) |
| `Esc` | Close the overlay |

While you are typing, the arrow keys move the text cursor instead of the selection, so they never fight with your editing.

## Inline actions

Besides opening a product with `Enter`, each candidate can also:

- **Flip the status** with `Shift + Enter`. The result goes straight back to Noon
- **Open the edit dialog** from the pencil button, to change product content, price, barcode and so on

## Relationship with the product catalog

Quick search is the focused version of the [Product catalog](./catalog-browse), with the same status toggle and the same edit panel. What differs:

| Dimension | Quick search | Product catalog |
| --- | --- | --- |
| Entry | Shortcut | "View Catalog" in the action sheet, or the extension popup |
| Form | A centered overlay you type into | A page of its own: list / detail / filter columns |
| Candidates | Up to 5 | 50 per page, pageable |
| Use case | Locate something fast, flip a status | Browse through a batch of products and cost them out |

## FAQ

### Pressing the shortcut does nothing?

- Check that you are on a Noon seller backend page
- Make sure Chrome is the focused window
- Check `chrome://extensions/shortcuts`. The shortcut may be set to "Unassigned", or another extension may have taken it

### Toggled status, but the original Noon page hasn't moved?

Press `Cmd/⌘ + R` to reload the Noon backend page. Nomu has already written the change to Noon; the original page just does not refresh itself.
