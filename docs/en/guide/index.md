---
title: "What is Nomu"
description: "What is Nomu: a Chrome extension for Noon UAE and Noon Saudi sellers. Capture products from 1688, Taobao, Tmall, JD.com or noon.com, auto-translate to English and Arabic, process compliant product images, and publish item by item to Noon."
---

# What is Nomu

Nomu is a Chrome extension built for Noon sellers (UAE / Saudi). Open a source product page (1688, Taobao/Tmall, JD.com, or noon.com) and capture, translation, product images and publishing all run in the same pipeline, all the way to a listed Noon product:

> Capture the source product → translate (Chinese → English / Arabic) → turn the images into compliant ones → publish item by item to Noon.

## Core capabilities

- **End-to-end automation**: capture, translation, images and publishing run in one pipeline, and every product is its own task. One product failing does not hold up the rest.
- **Batch listing**: every product in a batch shares the same store settings. One click on "List all" publishes them one after another.
- **Multi-store / multi-account**: store settings live in the extension settings. Nomu can only publish to the Noon store you are signed in to on the current page; cross-store listing is not supported yet.
- **Compliance guardrails built in**: product images are processed locally in your browser to Noon's spec (width ≥ 660px, aspect ratio ≥ 0.5, ≤ 10MB JPEG), padded with white when the ratio is off. Category, brand and currency conversion are checked before publishing.
- **Groups and size variants**: same-brand products are merged into a group along a specification axis (size / model / color). A group needs at least one member and every member must share the brand, so a brand mismatch blocks the group. If the parent is not live yet, Nomu publishes it first.
- **Task panel**: see how every publishing task is doing, filter by status, type and time, then retry or cancel failed items one at a time.
- **Nomu Assistant**: a general assistant for Noon sellers. Answers and product parsing come back as they are written, billed by credits.
- **Chinese UI**: the working language is Chinese, and dark mode follows your system.

## Supported platforms

| Stage | Supported |
| --- | --- |
| Source | 1688, Taobao/Tmall, JD.com, noon.com |
| Publish target | Noon UAE (`ae`), Noon Saudi (`sa`) |
| Browser | Chrome (Manifest V3) |

Other source platforms are on the roadmap but are not committed yet.

## Next steps

- [Quick start](./quick-start): the full capture-to-publish flow.
- [Privacy policy](/en/privacy/): see where your data goes.
