---
title: Barcode label printing
description: "Print barcode labels for your own SKUs with Nomu. Code 128, EAN-13 and UPC-A are supported, single or batch, printable or exportable as SVG, PNG or ZPL for label printers."
---

# Barcode label printing

A standalone page for printing barcode labels for your own SKUs, reachable from the extension toolbar. Pick an encoding format and label size, fill in the SKU, brand, and origin, and you get a live label preview you can print directly or export to your label printer.

## Two ways to do it

Barcode labels come in two flavours. They produce the same thing — pick whichever fits the job:

| | [Standalone page](#getting-in) | [Ask the assistant](#ask-the-assistant) |
| --- | --- | --- |
| Best for | A few items in hand, previewing and printing one by one | A list of SKUs, a whole batch at once |
| How | Fill the form, adjust settings, watch the preview | Say which codes you need in the Nomu assistant |
| Output | Browser print / SVG / PNG / ZPL | One zip download link |
| Batch size | A few dozen is comfortable | Up to 200 per call |

Both routes read the same layout geometry, so the same settings draw bars in exactly the same place and at exactly the same thickness.

## Ask the assistant

In the [Nomu assistant](./nomu-assistant), just say which codes you need. The assistant calls the tool, generates the whole batch, and hands you a zip link. For example:

> Make 50×30 labels at 203 DPI for these 12 SKUs, brand Nomu, origin China

The assistant lists what it's about to generate and confirms with you first.

**Supported specs**

| Option | Values |
| --- | --- |
| Format | Code 128 (default) / EAN-13 / UPC-A |
| Label size | 40×20, 50×30, 60×40, 70×50, 80×60, 100×60 mm — or just say an arbitrary size like "45×25" in mm |
| Resolution | 203 DPI (default) / 300 DPI |
| What's shown | Border, the encoded digits under the barcode, and the brand/origin line — each can be asked for or left off |

**How it differs from the page**

- **The output is a zip**: every label contributes an SVG and a PNG. Print shops want bitmaps, design firms and sticker printers want vectors — both are in the package, so nobody clicks download twice.
- **One call, one whole batch**: up to 200 labels. Go over that and the assistant tells you to split the run rather than quietly truncating it.
- **Brand is per label**: different brands in one batch get filled in individually, not defaulted to a single value for the whole run.
- **Invalid and duplicate codes are skipped**: codes are de-duplicated after checksums are filled in, and the assistant tells you exactly which ones were dropped — the rest of the batch still generates.
- **Bad specs get called out**: when the module width falls below what a scanner can physically read, the assistant gets a warning and passes it on, so you can switch to a bigger label or a higher DPI. You won't get a label that prints and then won't scan.

::: warning Login required
The assistant needs a signed-in Nomu account. Without one the tool isn't available.
:::

## Getting in

Click the **Barcode** button on the extension toolbar to open the barcode label page. Like the task panel and NomuDesign, it's a standalone extension page — pop it into its own tab or another window so you aren't switching back and forth while printing.

## How to use

1. **Pick an encoding format** — Code 128 (general-purpose), EAN-13 (European retail), or UPC-A (North American retail)
2. **Pick a label size** — 40×20 / 50×30 / 60×40 / 70×50 / 80×60 / 100×60 mm, covering the common sticker sizes
3. **Pick a resolution** — 203 DPI or 300 DPI, to match your label printer
4. **Pick a mode**:
   - **Single** — one SKU
   - **Batch** — paste many lines at once, one SKU per line, previewed in order
5. **Fill in brand and origin** — this line prints under the barcode; both are optional
6. **Toggle what's shown** — border, the encoded digits under the barcode, and the brand/origin line are each independently switchable
7. **Export or print**

The stage on the right previews the current settings live. The footer shows how many labels are valid, the dot dimensions at the chosen DPI, and — in batch mode — how many lines were skipped.

## Export options

| Output | Use it for |
| --- | --- |
| **Print** — calls the browser's print dialog. Paper size follows the selected label spec automatically, so there's nothing to change in the print dialog | Printing on a standard printer |
| **SVG** — vector, stays sharp at any zoom; good for handing to a designer or further editing | Vector output |
| **PNG** — bitmap, with dots derived from the chosen DPI and the label's millimetre size | Sending straight to a label printer, or dropping into a document |
| **ZPL** — Zebra command stream, ready to feed a ZPL label printer for batch runs | ZPL label printers |

## Encoding rules and checksums

- **Code 128** — accepts letters, digits, and common symbols. Non-printable characters are stripped out
- **EAN-13** — digits only. Give 12 digits of data and the 13th check digit is computed for you; the page tells you it filled the checksum in
- **UPC-A** — digits only. Give 11 digits of data and the 12th check digit is computed for you

Invalid or duplicate batch lines are skipped without affecting the rest of the run — the footer tells you how many were dropped.

## FAQ

### The printout doesn't match the preview.

It does. Preview, SVG, PNG, and ZPL all read the same layout geometry, so bar position and bar thickness are identical for the same settings.

### The ZPL bars come out too thin or too thick.

Bar module width is generated from an empirical value, and label printers differ slightly by model. If you hit this, export SVG or PNG instead and adjust per your printer's manual.

### Is there a limit on batch PNG exports?

Batch PNG export is a single tall image, so very large batches run into the browser's canvas height limit. Split big runs into several exports, or hand the job to the printer via ZPL instead.

### Chinese brand names come out as garbage when printing.

ZPL relies on the printer's built-in font for Chinese, and support varies by model. When you need reliable Chinese on the label, export PNG.

### Do the assistant's zip links expire?

The link points at a file on our server, kept for about a week. Anything you need to keep long-term, download and store it yourself.

### What happens if I ask for 500 labels?

The cap is 200 per call. The assistant will tell you to split it; once you say how many batches, it generates them one by one — it won't take 500 and hand you a fraction.

## See also

- [Nomu assistant](./nomu-assistant) — where batch barcode generation lives
- [Feature overview](./features) — full index of Nomu capabilities
- [Account and AI credits](./account) — the assistant requires a login
