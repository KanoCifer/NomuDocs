---
title: Barcode label printing
description: "Print barcode labels for your own SKUs with Nomu. Code 128, EAN-13 and UPC-A, single or batch, exported as PNG, SVG, or a ZIP bundle. Or ask the assistant for a whole batch."
---

# Barcode label printing

A standalone page for making barcode labels for your own SKUs, reachable from the extension toolbar. Pick an encoding format and a label size, fill in the SKU, brand, and origin, and you get a live preview you can export as PNG or SVG, or bundle the whole run into a ZIP.

## Two ways to do it

Both routes produce the same thing. Pick whichever fits the job:

| | [Standalone page](#getting-in) | [Ask the assistant](#ask-the-assistant) |
| --- | --- | --- |
| Best for | A few items in hand, previewing them one by one | A list of SKUs, a whole batch at once |
| How | Fill the form, adjust settings, watch the preview | Say which codes you need in the Nomu assistant |
| Output | PNG, SVG, or a ZIP bundle | One zip download link |
| Batch size | A few dozen is comfortable | Up to 200 per call |
| Label sizes | The 6 presets only | Any size in mm, 10 to 300 |

Both routes use the same specs, so the same settings draw the bars in the same place and at the same thickness.

## Ask the assistant

In the [Nomu assistant](./nomu-assistant), just say which codes you need. The assistant calls the tool, generates the whole batch, and hands you a zip link. For example:

> Make 50×30 labels for these 12 SKUs, brand Nomu, origin China

The assistant lists what it's about to generate and confirms with you first.

**Supported specs**

| Option | Values |
| --- | --- |
| Format | Code 128 (default) / EAN-13 / UPC-A |
| Label size | 40×20, 50×30, 60×40, 70×50, 80×60, 100×60 mm, or any size in mm you like such as "45×25", between 10 and 300 |
| Resolution | Fixed at 300 DPI on both routes. There is no option |
| What's shown | The encoded value under the barcode, and the brand/origin line, each can be asked for or left off |

**How it differs from the page**

- **The output is a zip**: every label contributes an SVG and a PNG. Print shops want bitmaps, sticker printers want vectors, and both are in the package so nobody downloads twice.
- **One call, one whole batch**: up to 200 labels. Go over that and the assistant tells you to split the run rather than quietly truncating it.
- **Brand and origin are per label**: different brands in one batch get filled in individually, not defaulted to a single value for the whole run.
- **Invalid and duplicate codes are skipped**: codes are de-duplicated after the checksum is filled in, and the assistant tells you exactly which ones were dropped. The rest of the batch still generates.
- **Bad specs get called out**: when the bars get too narrow for a scanner to read, the assistant gets a warning and passes it on so you can move to a bigger label. You won't get a label that prints and then won't scan.
- **Zip links last about a week.** Download anything you need to keep.

::: warning Login required
Both the standalone page and the assistant require a signed-in Nomu account. Signed out, opening either one just shows a sign-in card.
:::

## Getting in

Click the **Barcode** button on the extension toolbar to open the barcode label page. Like the task panel, it's a standalone extension page, so you can pop it into its own tab or another window.

## How to use

1. **Pick an encoding format**: Code 128 (general purpose), EAN-13 (European retail), or UPC-A (North American retail)
2. **Pick a label size**: 40×20 / 50×30 / 60×40 / 70×50 / 80×60 / 100×60 mm, covering the common sticker sizes
3. **Pick a mode**:
   - **Single**: one barcode value
   - **Batch**: paste many lines at once, one label per line, written as `SKU,brand,origin`, for example `SKU-0001,Speedo,Made in China`. Brand and origin can be left empty
4. **Fill in brand and origin**: in single mode these print under the barcode, and both are optional
5. **Toggle what's shown**: the encoded value and the brand/origin line are each independently switchable
6. **Export**

The stage on the right previews the current settings live. The footer shows how many labels are valid, the dot dimensions at the current DPI, and, in batch mode, how many lines were skipped.

## Export options

| Output | Use it for |
| --- | --- |
| **PNG**, a bitmap, with dots derived from the DPI and the label's millimetre size | Sending to a label printer, or dropping into a document |
| **SVG**, vector, stays sharp at any zoom | Handing to a designer or further editing |
| **ZIP bundle**, the whole run in one package, with an SVG and a PNG per label | Batch work, so nobody clicks download dozens of times |

## Encoding rules and checksums

- **Code 128**: letters, digits, and common symbols (ASCII 32 to 127). Wrong characters get flagged on the page
- **EAN-13**: digits only. Give 12 or 13 digits: short inputs get padded with leading zeros, and the check digit is always recomputed from the data
- **UPC-A**: digits only. Give 11 or 12 digits, same padding rule
- Code 128 is the default, and it's the right choice when you're feeding it SKU strings

Invalid or duplicate batch lines are skipped without affecting the rest of the run, and the footer tells you how many were dropped.

## FAQ

### The printout doesn't match the preview.

It does. Preview, PNG, SVG, and the ZIP all read the same layout, so bar position and bar thickness are identical for the same settings.

### The ZPL bars come out too thin or too thick.

Nomu no longer emits ZPL or any other printer command stream. The page gives you PNG, SVG, and ZIP. For batch printing, export PNG and send it to your printer software, then adjust the bar width to match the printer's manual.

### Is there a limit on batch PNG exports?

Batch PNG export is a single tall image, so very large batches run into the browser's canvas height limit. Split big runs into several exports.

### Chinese brand names come out as garbage when printing.

Export PNG. PNG is a bitmap, so it prints the same way on any machine, whereas Chinese in a vector file depends on the fonts available where it's rendered.

### Do the assistant's zip links expire?

Yes. The link points at a file on the server, kept for about a week. Download anything you need to keep.

### What happens if I ask for 500 labels?

The cap is 200 per call. The assistant will tell you to split it; once you say how many batches, it generates them one by one rather than taking 500 and handing you a fraction.

## See also

- [Nomu assistant](./nomu-assistant): where batch barcode generation lives
- [Feature overview](./features): full index of Nomu capabilities
- [Account and AI credits](./account): both the page and the assistant require sign-in
