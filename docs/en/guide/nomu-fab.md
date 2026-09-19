# NomuFab entry point

NomuFab is Nomu's main interaction entry. It lives as a floating button in the bottom-right corner of the Noon seller backend. Tapping it opens the action sheet, which exposes capture, management, and tools.

## How to use it

- Tap the floating button → open the action sheet.
- Tap the scrim or swipe down → close the sheet.
- Items in the sheet support ↑↓ keyboard navigation, Enter to trigger, Home/End to jump to the ends (see [Keyboard shortcuts](./shortcuts)).

## Action sheet layout

The sheet is split into three groups:

| Group | Description |
| --- | --- |
| Actions | Shortcuts for core features |
| My groups | Product group list + create group |
| Sizes variants | Existing size variants (only when present) |

## All entries

### Data & capture

| Entry | Function |
| --- | --- |
| Single product | Open the single-product drawer, showing the captured list and progress. The badge shows how many items are waiting. |
| View catalog | Browse the current store's catalog with active / hidden filtering. |
| Quick search | Focused search overlay by Partner SKU or title. Shortcut `Cmd/Ctrl + Shift + S`. |
| Archived products | View archived products, with restore or permanent delete. |

### Product creation & duplication

| Entry | Function |
| --- | --- |
| Bulk duplicate | Open the duplicate panel; single or batch copy of existing Noon products. |
| NomuDesign | Open the product picker; pick an unlisted item to enter the NomuDesign canvas. |

### Tools & system

| Entry | Function |
| --- | --- |
| Live FX | Dialog showing live SAR / AED rates with a CNY base. |
| Task panel | Open the standalone task page with full history, filter, retry, delete. |
| Knowledge assistant | Open the RAG Q&A panel for streaming answers from Nomu docs. |
| Documentation | Open Nomu docs in a new tab (`https://nomu.kanocifer.chat/docs/`). |
| Settings | Open settings to manage stores, shortcuts, cache cleanup, etc. |
| Privacy policy | Modal showing Nomu's data handling notes. |

### Account

| Entry | Function |
| --- | --- |
| Account | Open the account page with profile info, AI credit balance and consumption history, plus login / logout. |

## Groups

### My groups

Shows every product group you've created, with member count per group.

- Tap a row → enter that group's detail view.
- Tap the trash icon on the right → dissolve (after a confirmation).
- **Create group** is always pinned to the bottom — tap to open the step-by-step wizard.

### Sizes variants

Only shown when size variants exist. Each row shows the Partner SKU, child count, and listing status.

- Tap a row → enter that size group's edit view.
- Tap the trash icon on the right → dissolve the size group (after a confirmation).

## Related

- [Quick start](./quick-start) — the full capture-to-publish flow
- [Task panel](./tasks) — task status and retry mechanism
- [Keyboard shortcuts](./shortcuts) — global shortcut list
- [Settings](./config-sync) — cloud config sync