---
title: "Quick start"
description: "Nomu quick start: sign in to your Nomu account, capture from a 1688, Taobao or JD product page, review items in the draft list, then publish to Noon."
---

# Quick start

Ship a batch in four moves: sign in, capture, confirm, publish.

## 0. Install Nomu and sign in to your account

Search for Nomu in the Chrome Web Store or the Purple Bird (紫鸟) plugin center and install it.

Open the extension's **Account** page and sign in with an email code or an email link, neither of which needs a password. On top of that, AI translation, NomuDesign generation and prompt optimization are billed by credits. See [Account & AI credits](/en/guide/account).

## 1. Capture from the source page

Open any 1688, Taobao/Tmall, JD.com or noon.com product detail page. The extension pulls the product info (title, image gallery, variant specs, price) into your draft list automatically.

## 2. Confirm item by item

Open the listing drawer on the Noon seller catalog and check each product:

- Adjust price and currency (built-in CNY conversion)
- Read through the auto-translated English / Arabic title and selling points
- Product images are already processed to Noon's spec (width ≥ 660px, aspect ratio ≥ 0.5, ≤ 10MB JPEG)
- The Noon category is auto-suggested from the source data, and you can change it
- Pick the store settings (country, PartnerCode, warehouse, quantity, warranty, brand)

## 3. Publish one item at a time to Noon

Once you submit, each product walks the same chain: create product, upload images, write attributes (EN / AR), set price, stock, barcode (optional), activate, warranty registration (optional).

- **One task per product**: if one product in a batch fails, the rest keep going.
- **Retries skip finished work**: steps that already succeeded are not run again.
- **Progress is visible**: the task panel shows the status of every task, and failed items can be retried or cancelled on their own.

## Side tasks

- **Export the batch to Excel**: the "Export" button at the top of the capture drawer turns the current list into an `.xlsx` with the source URL, title, SKU and reference price. Send it to a teammate for reconciliation, or edit fields in the sheet and paste them back.
- **Push to the transfer station**: the same drawer's "Push to transfer station" button sends the list to your account's cloud pool (see [Cloud pool & transfer station](./cloud-pool)). Nothing lands on this machine, so another device can pick it up.

## Multi-store and multi-account

Keep several store configurations in the extension settings. Switching accounts works by saving and restoring the Noon sessions already signed in across your browser tabs. The store code can be auto-recognized from the current page.

Cross-store listing is not supported yet: you can only publish to the Noon store you are signed in to on the current page.

## FAQ

### Is Nomu free?

The extension itself is free, and no feature is charged for. AI translation, image generation and the assistant are billed by credits. Your settings and login info stay in your own browser.

### Do I need to provide any keys or login grants?

For Noon, no. Nomu works through the Noon session you are already signed in to, so you never enter a Noon password or API key.

### Do I need a Nomu account?

Yes. Sign up on the website, then sign in on the extension's account page with an email code or an email link. Signed out, the pages show a sign-in wall. See [Account & AI credits](/en/guide/account).

### How good is the translation? Do I still need to proofread?

Translation runs automatically (Chinese to English and Arabic). For high-ticket or branded items, give it a manual eyeball pass before publishing. Auto translation is not guaranteed to read like a native speaker wrote it.

### What happens if a product fails to list?

The failed product is flagged in the task panel and stops at that step. Fix it and retry that item on its own, and the steps that already succeeded are not run again.
