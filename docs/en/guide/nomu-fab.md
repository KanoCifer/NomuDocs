# NomuFab entry point

NomuFab is Nomu's main interaction entry. It lives as a floating button in the bottom-right corner of the Noon seller backend. Tapping it opens the action sheet, which exposes capture, management, and tools.

## How to use it

- Tap the floating button → open the action sheet.
- Tap the scrim or swipe down → close the sheet.
- Items in the sheet support ↑↓ keyboard navigation, Enter to trigger, Home/End to jump to the ends (see [Keyboard shortcuts](./shortcuts)).

## Action sheet layout

The sheet is split into two groups:

| Group | Description |
| --- | --- |
| Actions | Shortcuts for core features |
| My groups | Product group list + create group |

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
| Knowledge assistant | Open the RAG Q&A panel for streaming answers from Nomu docs. See [Knowledge assistant](#knowledge-assistant). |
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

Size variants no longer form their own section in the action sheet — they're configured inside the single-product listing form (see [Group & sizes](./group-and-sizes)).

## Related

- [Quick start](./quick-start) — the full capture-to-publish flow
- [Task panel](./tasks) — task status and retry mechanism
- [Keyboard shortcuts](./shortcuts) — global shortcut list
- [Settings](./config-sync) — cloud config sync
- [Cloud pool & transfer station](./cloud-pool) — hand off captures across devices

## Knowledge assistant

The knowledge assistant is a RAG (retrieval-augmented generation) Q&A panel — **not** a general-purpose AI chat. Your question is semantically searched against the Nomu doc corpus, and the model streams an answer grounded in the matched passages.

- Entry: action menu "Knowledge assistant"
- Scope: Nomu's own docs only — it does not fetch external pages and does not read your store data
- Use case: listing rules, field constraints, error code meanings — anything the docs already cover, but faster than browsing
- Billing: shares the AI credits pool with translation and image generation (questions that are not `design_generate` / `nomu_prompt_optimize` still draw from the same balance)
- Without sign-in / expired session: the panel jumps to the account page first, then returns

### Not the same as the right-click "Parse with AI" entry

| Dimension | Knowledge assistant | Right-click "Parse with AI" |
| --- | --- | --- |
| Trigger | Action menu | Right-click on any page |
| What it does | Looks up answers in the Nomu doc corpus | Parses the current page into a draftable product |
| Uploaded | Question text only | Page bodyText capped at 8k + 3 pageImages in DOM order + viewport screenshot |
| Output | Streamed answer text | A product draft landed in the local batch (or pushed to the cloud pool) |
| Billing | AI credits for Q&A | AI credits for parse (separate source label) |

Right-click parse fits "I hit a page with no adapter and need a draft on the fly" — including sites Nomu does not ship a preset adapter for.