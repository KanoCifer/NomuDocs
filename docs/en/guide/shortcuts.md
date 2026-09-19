---
title: Keyboard shortcuts
---

# Keyboard shortcuts

Nomu binds common actions to global Chrome commands — not page-specific — so they work everywhere. The commands are defined in `wxt.config.ts` under `manifest.commands` and are visible alongside everything else in the Chrome commands panel (`chrome://extensions/shortcuts`). You can rebind them there.

## Command list

| Command | mac | Windows / Linux | Action |
| --- | --- | --- | --- |
| Open Nomu catalog browse | `⌘ + Shift + O` | `Ctrl + Shift + O` | Open the catalog browse side panel on the current page ([Catalog browse](./catalog-browse)) |
| Open action menu | `⌘ + Shift + P` | `Ctrl + Shift + P` | Trigger the action sheet; from a product page it jumps straight to listing / duplicate / NomuDesign |
| Open QuickSearch | `⌘ + Shift + S` | `Ctrl + Shift + S` | Trigger the quick search overlay ([Quick search](./quick-search)) |
| Hide / show Nomu floating button | `Alt + Shift + H` | `Alt + Shift + H` | Toggle the floating entry's visibility in the bottom-right corner |

> All 4 commands are `global` level (they fire even when Chrome is not focused), but the **current** default `Ctrl/⌘ + Shift + Y` for opening the side panel appears **additionally** on the Welcome onboarding page and in the manifest — it is a different entry from **Open Nomu catalog browse**: the former goes through `sidePanel.open()`, the latter through the catalog-browse entry in the action sheet.

## Behavior details

- Command conflicts are silently dropped by Chrome; rebind from `chrome://extensions/shortcuts`.
- Shortcuts work whenever Chrome is focused; they also respond when focus is inside a Noon backend or 1688 source page.
- `Alt + Shift + H` toggles the floating entry in the bottom-right corner only. It does not affect popup / side panel / other shortcuts.

## Rebinding

Open `chrome://extensions/shortcuts` (on Mac: Chrome menu → Tools → Extension shortcuts), find the **Nomu** group, and rebind. Nomu does not store keybindings — Chrome persists them.

## FAQ

### Pressed but nothing happens?

- Make sure Chrome is the focused window
- Check `chrome://extensions/shortcuts` — the command may be set to "Unassigned" or taken by another extension
- Search command names with the "Nomu" prefix

### Want more shortcuts?

The Welcome onboarding's "Shortcuts" panel only shows the four above; there are no more bindings right now. Reach out if you want one added.