---
title: Features overview
---

# Features overview

Nomu runs one main line — "1688 / Taobao / Tmall / JD / noon source product → Noon listing" — and folds store management, bulk duplication, AI imagery, catalog browsing, and task tracking into the same pipeline. This page is an index of every capability, each linked to a full guide.

## Main line: capture → list

| Stage | Capability | Details |
| --- | --- | --- |
| Source capture | One-click capture from 1688, Taobao/Tmall, JD.com or noon.com product pages; title, image gallery, variant specs, and price land in one shot | [Quick start](./quick-start) |
| Field editing | Per-item drawer to confirm every field — adjust price, change currency, switch category, change brand, apply a template | [Quick start](./quick-start) |
| AI translation | Chinese → English / Arabic, titles and selling points auto-translated for UAE / Saudi | [Quick start](./quick-start) · [Account & credits](./account) |
| Image compliance | Auto-processed to Noon spec (width ≥ 660px, aspect ≥ 0.5, ≤ 10MB JPEG) | [Quick start](./quick-start) |
| AI imagery | NomuDesign canvas runs image generation with model selection, prompt optimization, and apply-to-product | [NomuDesign](./nomu-design) |
| Listing pipeline | Declarative step table drives each item through `product/create` → `activate` + `warranty` | [Quick start](./quick-start) |
| Group listing | Same-brand items merged along a specification axis (size / model / color) | [Group & sizes](./group-and-sizes) |
| Sizes variants | Sizes live in the single-product listing form; parent and children go out in one submission | [Group & sizes](./group-and-sizes) |
| Barcode label printing | Print barcode labels for your own SKUs; print directly or export SVG / PNG / ZPL | [Barcode label printing](./barcode-labels) |
| Duplicate product | Clone an already-listed Noon product by PartnerSku — single, batch, or template | [Duplicate product](./duplicate) |

## Stores & accounts

| Capability | Details |
| --- | --- |
| Side-panel multi-store | Maintain multiple stores in the side panel — country, PartnerCode, warehouse, warranty, PSKU sequence, fulfillment type | [Store management](./stores) |
| Detect from current page | One-click recognize and save the store code from the active noon-catalog tab | [Store management](./stores) |
| FBP warehouse snapshot | Pull and store the FBP warehouse list; pick directly during publishing | [Store management](./stores) |
| Noon session detection | Banner in tasks / popup surfaces the seller's Noon session state | [Task panel](./tasks) |
| Nomu account | Required for translation, image generation, prompt optimization, AI credits | [Account & credits](./account) |
| AI credits card | Balance + latest 10 transactions (translation / prompt optimization / generation) | [Account & credits](./account) |

## Catalog browse & search

| Capability | Details |
| --- | --- |
| Catalog browse | Side-panel browse of the current store's offer list with search, paging, inline seller-status toggling | [Catalog browse](./catalog-browse) |
| Quick search | `Ctrl/⌘ + Shift + S` global overlay; search active / hidden items, jump to detail or change status | [Quick search](./quick-search) |
| Inline edit | Edit dialog can be opened straight from catalog browse or quick search | [Catalog browse](./catalog-browse) · [Quick search](./quick-search) |

## Tracking & retry

| Capability | Details |
| --- | --- |
| Task panel | Standalone extension page `tasks.html` with publish / duplicate dual view, filtering, retry, clear | [Task panel](./tasks) |
| Failure pinpointing | Failed rows expand inline with error code / failing step / retry count, plus one-click retry or cancel | [Task panel](./tasks) |
| Resume | When retrying, steps that already succeeded are skipped automatically | [Task panel](./tasks) |

## Utilities

| Capability | Details |
| --- | --- |
| Live FX rates | Open the FX dialog from the action menu; convert CNY-base prices into SAR / AED | [Quick start](./quick-start) |
| AI category prediction | Source data auto-recommends Noon category (family / product_type / subtype) | [Quick start](./quick-start) |
| Category + brand templates | Save and reuse "category + brand" bundles for the same kind of product | [Duplicate product](./duplicate) |
| Keyboard shortcuts | Four global commands: side panel, action menu, quick search, floating button toggle | [Keyboard shortcuts](./shortcuts) |
| Welcome onboarding | Six steps on first install to walk through permissions, stores, and a trial capture | Pops up automatically on first install |

## General guarantees

- **Request allow-list** — every request URL to Noon / 1688 / Taobao / Tmall / JD / the Nomu backend is gated by a hardcoded allow-list. Anything outside is rejected.
- **Local-first data** — store records, batch drafts, NomuDesign drafts, and Nomu account tokens live in your browser. No analytics, no tracking. See the [Privacy policy](/en/privacy/).
- **Cookie channel** — operates through your browser's already-signed-in Noon session. Nomu itself never stores Noon credentials.
- **Dark mode** — the UI follows the system `prefers-color-scheme: dark` setting.