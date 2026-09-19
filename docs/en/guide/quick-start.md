# Quick start

Three steps to ship a batch: capture → confirm → publish.

## 1. Capture from the source page

Open any 1688 or noon.com product detail page. The extension automatically pulls the product info (title, image gallery, variant specs, price) into your batch list. 1688's "one parent / multiple variants" are split into independent items, each with full content and no cross-dependencies.

## 2. Confirm item by item

Open the listing drawer on the Noon seller catalog and verify each product:

- Adjust price and currency (built-in CNY conversion)
- Check the auto-translated English / Arabic title and selling points
- Product images are already processed to Noon's 660×900 white-background JPEG spec
- The Noon category is auto-suggested from the source data and editable
- Pick the store settings (country, PartnerCode, warehouse, quantity, warranty, brand)

## 3. Publish one item at a time to Noon

After you submit, the engine walks each item through the same chain: create product → upload images → write attributes (EN / AR) → set price → stock → barcode (optional) → activate → warranty registration (optional).

- **First failure stops the batch** — the batch halts on the first failure. You never end up with "half listed, half missed".
- **Resume** — on retry, steps that already succeeded are skipped automatically.
- **Inspect progress** — the task panel shows every past task's status. Failed items can be retried or cancelled individually.

## Multi-store and multi-account

Maintain multiple store configurations in the side panel. Switching accounts is done by saving / restoring the Noon sessions already signed in across your browser tabs. The store code can be auto-recognized from the current page (via Noon Catalog's store list API).

## FAQ

### Is Nomu free?

Yes — the tool itself is free. Settings and login info stay in your own browser; there is no subscription.

### Do I need to provide any keys or login grants?

For Noon — no. Nomu operates through your already-signed-in Noon session, so you never enter a Noon password or API key.

### Do I need a Nomu account?

Translation requires a Nomu account (password or email magic-link). Without an account, capture, image cleanup, and listing still work. The account is used for translation authentication only — see the [Privacy policy](/en/privacy/).

### How good is the translation? Do I still need to proofread?

Translation runs automatically (Chinese → English / Arabic). For high-ticket or branded items, we recommend a manual eyeball pass before publishing — auto translation is not guaranteed to be native quality.

### What happens if a product fails to list?

The batch halts on the first failure. The failed product is highlighted in the list and can be retried individually or after manual edits.