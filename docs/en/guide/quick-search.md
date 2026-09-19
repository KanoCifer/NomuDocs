---
title: Quick search
---

# Quick search

Quick search is Nomu's focused overlay that floats above every page. From any page, press `Ctrl/⌘ + Shift + S`, type a Partner SKU or title keyword, and immediately see matching active / hidden items in the current store. Jump to detail or flip status with one keystroke — no need to navigate into the Noon backend first.

## How to open

- Global shortcut `Ctrl/⌘ + Shift + S` (see [Keyboard shortcuts](./shortcuts))
- **Quick search** entry in the action sheet

It opens as a centered card at the top of the page (**not** a modal — it does **not** block the original page), with the input already focused. Press `Esc` or click outside to close.

## Visuals & layout

- Single card, `2xl` radius, 4px grid spacing
- The input takes the full first row, 15px font, placeholder "Search products / Partner SKU"
- Up to 5 candidates; the selected one lifts to 1.02× with a warm gold border
- Each candidate shows: title (14px / 600, truncated to 2 lines) + partnerSku (mono 10.5px) + currency / price (if present) + status chip (active / hidden)
- The bottom status bar shows: missing store / missing code / loading error / empty / ready (ready shows "Press ↵ to open")

## Keyboard

| Key | Behavior |
| --- | --- |
| `↓` / `Ctrl + N` | Select next |
| `↑` / `Ctrl + P` | Select previous |
| `Enter` | Open the selected hit's detail (new tab) |
| `Shift + Enter` | Toggle the selected hit's seller status (active ↔ hidden) |
| `Esc` | Close the overlay |

While typing, the arrow keys do not change selection, to avoid conflicting with text editing.

## Behavior details

- Input change triggers search: 300ms debounce, then call `offer/list/noon`
- Each page takes 8 items (the first 8 from Noon's search are usually enough for 5 good candidates); rank by PartnerSku prefix / contains / title / csku, then take the top 5
- Empty state when nothing matches: "No products found"
- State machine: `idle / no-active-store / missing-store-code / typing / loading / ready / empty / error`

## Inline actions

Each candidate, besides "Enter to open", can also:

- **Toggle seller status** (`Shift + Enter`) — optimistic update via `offer/upsert/is_active-plp`, with pending / error feedback inside 800ms
- **Pencil → inline product edit** — opens the edit dialog for title / price / stock / category / brand, submits on the publishTask minimal-change path
- **Eye icon → preview** — overlays a preview view on the original page

## Relationship with catalog browse

Quick search is the "focused mode" of [Catalog browse](./catalog-browse) — both use `CatalogOffer`, both support status toggling, both can trigger inline product edit. The differences:

| Dimension | Quick search | Catalog browse |
| --- | --- | --- |
| Entry | Global shortcut | Side-panel drawer |
| Space | Top-centered card, doesn't block the page | Side-panel drawer |
| Candidates | Top 5 | 20 per page, paginated |
| Use case | Quick locate / status flip | Systematic browse of a batch |

Both share the same `CatalogOffer` data model and status-toggle logic; writes synchronize through `db.changed`.

## FAQ

### Pressing the shortcut does nothing?

- Make sure Chrome is the focused window
- Check `chrome://extensions/shortcuts` to see if another extension has stolen the command
- Search by command name with the "Nomu" prefix

### Toggled status, but the original Noon page hasn't moved?

Press `Cmd/⌘ + R` to refresh the original Noon backend page. Nomu has already written the change to Noon; the status chip is fetched on demand.