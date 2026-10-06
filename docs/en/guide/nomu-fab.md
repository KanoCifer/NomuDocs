---
title: "NomuFab entry point"
description: "The NomuFab entry point is Nomu's main interaction surface in the Noon seller backend. Tap the floating button to open the action sheet for capture, store management and tools."
---

# NomuFab entry point

NomuFab is Nomu's main entry point, a floating button in the bottom-right corner of the Noon seller backend. Tap it and the action sheet opens, with capture, store, tool and account entries in one place.

## How to use it

- Tap the floating button → open the action sheet.
- Tap the scrim or press `Esc` → close the sheet.
- `↑` and `↓` move through the entries, `Enter` opens the highlighted one, `Home` and `End` jump to the ends.

## Action sheet layout

From top to bottom: capture, tools, account and help, then your product groups.

## All entries

### Data & capture

| Entry | Function |
| --- | --- |
| Single product | Open the single-product drawer with the captured list and progress. The badge counts what is still waiting. |
| View Catalog | Browse the current store's catalog, filter by status and page through it ([Product catalog](./catalog-browse)). |
| QuickSearch | Search overlay by Partner SKU or title, up to 5 candidates. Shortcut `Cmd/Ctrl + Shift + S`. |
| Archived products | View archived products, restore them or delete them for good. |

### Product creation & duplication

| Entry | Function |
| --- | --- |
| Bulk copy products | Open the duplicate panel to copy existing Noon products into the current store, one at a time or in bulk. |
| NomuDesign | Open the product picker; pick an unlisted item to enter the NomuDesign canvas. |

### Tools & system

| Entry | Function |
| --- | --- |
| Live FX | Dialog showing live SAR / AED rates with CNY as the base. |
| Nomu Assistant | Standalone page for streaming Q&A and product parsing. See [Nomu Assistant](./nomu-assistant). |
| Connection status | Sync bus latency and connected devices. |
| Dynamic Island settings | Show or hide the transfer widget at the bottom. |
| Task panel | Standalone task page with every publish task, filterable, with retry and delete. |
| Documentation | Open Nomu docs in a new tab (`https://nomu.kanocifer.chat/docs/`). |
| Settings | Manage stores, shortcuts, clear local data. |
| Privacy policy | Dialog showing Nomu's data handling notes. |

### Account

| Entry | Function |
| --- | --- |
| Account | Open the account page with profile info, AI credit balance and consumption history, plus sign in and sign out. |

## Groups

### My groups

Every product group you have created, with a member count on each one.

- Tap a row → enter that group's detail view.
- Tap the trash icon on the right → dissolve it, after you confirm.
- **Create group** always sits at the bottom of the list. Tap it for the step-by-step wizard.

### Sizes variants

Size variants are not a section of the action sheet. You configure them inside the single-product listing form (see [Group & sizes](./group-and-sizes)).

## Related

- [Nomu Assistant](./nomu-assistant): streaming Q&A and product parsing from the action menu
- [Quick start](./quick-start): the full capture-to-publish flow
- [Task panel](./tasks): task status and retry mechanism
- [Keyboard shortcuts](./shortcuts): the global shortcut list
- [Settings](./config-sync): cloud config sync
- [Cloud pool & transfer station](./cloud-pool): hand off captures across devices
