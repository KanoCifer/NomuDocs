---
layout: NomuDocsHome
title: Nomu Docs
description: Official documentation for Nomu — install, store setup, the capture-to-publish pipeline, the task panel, product duplication, barcode labels, quick search, plus the changelog and support.

hero:
  eyebrow: Nomu Docs · Documentation
  headline: From install to first listing,
  accent: all of it documented
  subheadline: The manual for capture, translation, image work and one-by-one publishing — install, store setup, publishing, duplication, barcodes, search, and every place you get stuck.
  actions:
    - text: Quick start
      link: /en/guide/quick-start
      variant: brand
    - text: Install Nomu
      link: /en/guide/install
      variant: alt
    - text: Changelog
      link: /en/guide/changelog
      variant: link

# Hero flow strip: how the first item gets out
flow:
  title: Your first listing, five steps
  steps:
    - Install the extension
    - Sign in to Noon
    - Capture a source item
    - Translate · images · category
    - Publish item by item
  note: 'Sources: 1688 / Taobao & Tmall / JD.com / noon.com · Destinations: Noon UAE & Saudi'

# Three starting points
paths:
  eyebrow: Get started
  title: Start from one of these
  subtitle: Three pages to get moving. Already running Nomu? Jump straight to what you need.
  items:
    - number: '01'
      title: Install Nomu
      body: One click from the Chrome Web Store, or drag in the zip to load it unpacked.
      link: /en/guide/install
    - number: '02'
      title: Quick start
      body: From a fresh install to your first published item, in one pipeline.
      link: /en/guide/quick-start
    - number: '03'
      title: Features overview
      body: What every capability does, and where its edges are, on one page.
      link: /en/guide/features

# No items here: the section reads the sidebar from .vitepress/config.mts
map:
  eyebrow: Contents
  title: All documentation
  subtitle: Everything the sidebar can reach.

capabilities:
  eyebrow: At a glance
  title: What is inside
  subtitle: Ten capabilities, and the stretch each one covers.

features:
  - title: End-to-end automation
    details: A single engine drives the whole pipeline one item at a time. The first failure stops the batch, and retries automatically skip the steps that already succeeded.
  - title: No API keys required
    details: Works against your already-signed-in Noon session — no API keys, no OAuth grants. Every request URL is gated by a hardcoded allow-list.
  - title: Data stays on your device
    details: Store settings, batch drafts, and NomuDesign drafts all live in your browser. No analytics, no tracking, no telemetry.
  - title: AI product imagery
    details: The NomuDesign canvas supports prompt templates, AI rewrite, model + tier selection, history scrub, and one-click apply back to the product gallery.
  - title: Task panel
    details: A standalone extension page that tracks publish and duplicate tasks side by side, points at the failing step, and lets you retry single items or clear finished tasks.
  - title: Multi-store / multi-account
    details: Keep several stores under the same PartnerCode, auto-detect the store code from the active tab, and snap FBP warehouses straight into the listing pipeline.
  - title: Group + Sizes variants
    details: Publish same-brand batches along a specification axis (Group), or add standard sizes as variants right in the single-product form and submit once (Sizes). The two paths never collide.
  - title: Barcode label printing
    details: Print barcode labels for your own SKUs. Code 128 / EAN-13 / UPC-A, printable directly or exported as SVG / PNG / ZPL.
  - title: Duplicate products
    details: Clone already-listed Noon products by PartnerSku, one item or many. Batch mode accepts pasted Excel / CSV cells.
  - title: Catalog browse + quick search
    details: Side-panel browsing of active / hidden items in the current store; press ⌘+Shift+S anywhere to open the focused search overlay.

cta:
  title: Install it, keep this tab open
  body: Capture, translate, build images, publish, duplicate, track tasks — whichever step you are on, the matching page is here.
  primary:
    text: Quick start
    link: /en/guide/quick-start
  secondary:
    text: Install Nomu
    link: /en/guide/install
  support:
    text: Need help?
    link: /en/guide/support

footer:
  note: 'Nomu: an easy-to-use tool for Noon sellers'
  links:
    - text: Privacy policy
      link: /en/privacy/
    - text: Changelog
      link: /en/guide/changelog
    - text: Get support
      link: /en/guide/support
    - text: Back to the site
      link: https://nomu.kanocifer.chat
---
