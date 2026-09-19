# What is Nomu

Nomu is a Chrome extension built for Noon sellers (UAE / Saudi) that turns a source product page (1688 / noon.com) into a listed Noon product. It collapses capture, translation, image cleanup, and publishing into one pipeline:

> Capture the source product snapshot → parse it into structured product data → translate (Chinese → English / Arabic) → generate compliant product images → publish each item to Noon as a listed product.

## Core capabilities

- **End-to-end automation** — capture, translate, build images, and list inside the same engine, processed item-by-item. The first failure stops the batch; a single run can take a whole batch end to end.
- **Batch listing** — every product from one capture shares the same store settings. The engine runs per item, while the UI submits them serially under the hood.
- **Multi-store / multi-account** — store records are isolated per store; multi-account work piggybacks on the seller browser's already-signed-in Noon session. Store settings live in the side panel.
- **Compliance guardrails baked in** — product images are forced to 660×900 white-background JPEG; category, brand, and FX conversions are validated inside the engine.
- **Sizes variant group** — same-brand, same-category items are merged along a specification axis (size / model / color); the parent is auto-published if it is not already live.
- **Task panel** — full-history view of all publishing tasks with filtering by status, type, and time window. Failed items can be retried or cancelled one by one.
- **Chinese UI** — the working language is Chinese; dark mode follows the system.

## How it works

Nomu does not require extra credentials. It coexists with the seller's normal workflow:

1. The extension's service worker issues requests directly to Noon's APIs. `credentials: "include"` carries the seller's already-signed-in Noon cookie, so no Noon tab has to be open.
2. When direct calls hit a network failure or return 401 / 403, they fall back to a page-world fetch bridge.
3. Every request URL is gated by an allow-list. Anything outside the allow-list is rejected.

## Supported platforms

| Stage | Supported |
| --- | --- |
| Source | 1688, noon.com |
| Publish target | Noon UAE (`ae`), Noon Saudi (`sa`) |
| Browser | Chrome (Manifest V3) |

Other source platforms are on the roadmap but are not committed yet.

## Next steps

- [Quick start](./quick-start) — the full capture-to-publish flow.
- [Privacy policy](/en/privacy/) — see where your data goes.