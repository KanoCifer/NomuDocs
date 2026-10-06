---
title: Features overview
description: "Nomu features overview: capture from 1688, Taobao, Tmall, JD and noon.com, list item by item, translate Chinese into English and Arabic, process product images, predict Noon categories, track tasks, duplicate across devices and print barcode labels."
---

# Features overview

Nomu runs one line, from a source product to a live Noon listing, and store management, bulk duplication, AI imagery, catalog browsing and task tracking all ride on it. This page indexes every capability, and each one links to the full guide.

## Main line: capture → list

| Stage | Capability | Details |
| --- | --- | --- |
| Source capture | One-click capture from 1688, Taobao, Tmall, JD.com and noon.com product pages: title, image gallery, variant specs and price in one go | [Quick start](./quick-start) |
| Field editing | A per-item drawer to confirm every field: adjust price, change currency, switch category, change brand, apply a template | [Quick start](./quick-start) |
| AI translation | Chinese into English or Arabic, titles and selling points translated for the UAE and Saudi sites | [Quick start](./quick-start) · [Account & credits](./account) |
| Image compliance | Product images processed to Noon's spec (width ≥ 660px, aspect ≥ 0.5, ≤ 10MB JPEG) | [Quick start](./quick-start) |
| AI imagery | The NomuDesign canvas generates product images, with model choice, prompt optimization and apply-to-product | [NomuDesign](./nomu-design) |
| Listing | Every product is its own task, run through fixed steps: create, upload images, write attributes, set price, set stock, activate. One failure never stops the rest | [Quick start](./quick-start) |
| Group listing | Same-brand products merged along a spec axis (size, model, colour) and published as one group | [Group & sizes](./group-and-sizes) |
| Size variants | Sizes go into the single-product listing form, parent and children submitted in one go | [Group & sizes](./group-and-sizes) |
| Barcode label printing | Barcode labels for your own SKUs (Code 128, EAN-13, UPC-A): preview and print one by one on the standalone page, export PNG or SVG, or have the assistant build a whole batch as a ZIP | [Barcode label printing](./barcode-labels) |
| Duplicate product | Clone a listed Noon product from its source PSKU, one at a time, in bulk, or onto another device | [Duplicate product](./duplicate) |

## Stores & accounts

| Capability | Details |
| --- | --- |
| Multiple stores | Keep several stores with their country, partner code, store code, warehouse, warranty, PSKU sequence and fulfillment type | [Store management](./stores) |
| Detect from current page | Read the store code off the open noon-catalog tab and save it to the store record | [Store management](./stores) |
| FBP warehouse snapshot | Pull and store the FBP warehouse list, pick from it while listing | [Store management](./stores) |
| Noon session check | A banner in the task panel and the popup tells you whether your Noon session is still valid | [Task panel](./tasks) |
| Nomu account | Required before you can use any part of Nomu; balance and history live on the account page | [Account & credits](./account) |
| AI credits card | Balance plus your latest 10 transactions (translation, prompt optimization, generation) | [Account & credits](./account) |

## Catalog browse & search

| Capability | Details |
| --- | --- |
| Catalog browse | A panel down the right of your Noon seller catalog page listing the store's active and hidden products, with search, paging and one-click seller-status changes | [Catalog browse](./catalog-browse) |
| Quick search | Press `Ctrl/⌘ + Shift + S` on a Noon seller page to bring up the overlay: search active or hidden products, jump to detail, change status | [Quick search](./quick-search) |
| Inline edit | Open the edit dialog straight from catalog browse or quick search | [Catalog browse](./catalog-browse) · [Quick search](./quick-search) |

## Tracking & retry

| Capability | Details |
| --- | --- |
| Task panel | A standalone page with publish and duplicate views, filters, retry on failure, and clearing finished tasks | [Task panel](./tasks) |
| Failure pinpointing | The failed item is flagged, and the failing step, error code and retry count are all spelled out, ready for a single-item retry | [Task panel](./tasks) |
| Resume | Retrying skips the steps that already passed, and you are not charged twice | [Task panel](./tasks) |

## Utilities

| Capability | Details |
| --- | --- |
| Nomu Assistant | A standalone page for streaming Q&A and product parsing, reachable from the popup and the action menu | [Nomu Assistant](./nomu-assistant) |
| Live FX rates | Open the FX dialog from the action menu and convert CNY prices into SAR or AED | [Quick start](./quick-start) |
| AI category prediction | Assembles a description from the English title, brand, audience, selling points and details, recommends a Noon category, and you can still change it by hand | [Quick start](./quick-start) |
| Category and brand templates | Save a category plus brand pairing as a template and reuse it on the next product | [Quick start](./quick-start) |
| Keyboard shortcuts | Four Chrome commands; the action menu, quick search and floating button toggle only fire on Noon seller pages | [Keyboard shortcuts](./shortcuts) |
| Welcome onboarding | Six steps on first install covering permissions, store detection, creating a store and a trial capture | Pops up automatically on first install |

## General guarantees

- **Only whitelisted sites**. The extension only talks to the sites listed here, and anything outside that list is never called
- **Your data stays local**. Stores, batch drafts and NomuDesign drafts live in your browser. Once you sign in, your account token and the content sent upstream for AI calls go to the account service; one anonymous diagnostic event is also reported when the extension crashes, see the [Privacy policy](/en/privacy/)
- **Cookie channel**. Nomu works through the Noon session already signed in in your browser, so you never hand over a Noon key, and Nomu stores no Noon credentials of its own
