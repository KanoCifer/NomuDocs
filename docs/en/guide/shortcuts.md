---
title: Keyboard shortcuts
description: "Nomu keyboard shortcuts: three global Chrome commands for the action menu, quick search and the floating button toggle, rebindable from chrome://extensions/shortcuts."
---

# Keyboard shortcuts

Nomu puts its common actions on global Chrome commands. You rebind them in `chrome://extensions/shortcuts`.

## Command list

| Command | mac | Windows / Linux | Action |
| --- | --- | --- | --- |
| Open action menu | `⌘ + Shift + P` | `Ctrl + Shift + P` | Open the action sheet; from a product page it takes you straight to listing, duplicate, NomuDesign |
| Open QuickSearch | `⌘ + Shift + S` | `Ctrl + Shift + S` | Open the quick search overlay ([Quick search](./quick-search)) |
| Hide / show Nomu floating button | `Alt + Shift + H` | `Alt + Shift + H` | Show or hide the floating button in the bottom-right corner |

## Behavior details

- Shortcuts respond on Noon seller backend pages. Press them on other sites and nothing happens
- If a command collides with another extension, Chrome drops it silently. Rebind it from `chrome://extensions/shortcuts`
- `Alt + Shift + H` only toggles the floating button in the bottom-right corner. It leaves the popup, the overlays and the other shortcuts alone

## Rebinding

Open `chrome://extensions/shortcuts` (on Mac: Chrome menu → Tools → Extension shortcuts), find the Nomu group, and set the keys you want. Chrome stores the keybindings, not Nomu.

## FAQ

### Pressed but nothing happens?

- Make sure Chrome is the focused window
- Check `chrome://extensions/shortcuts`. The command may be set to "Unassigned", or another extension may have taken it

### Want more shortcuts?

There are only the three above today. Tell us what you need.
