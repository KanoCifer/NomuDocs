---
title: Barcode label printing
---

# Barcode label printing

A standalone page for printing barcode labels for your own SKUs, reachable from the extension toolbar. Pick an encoding format and label size, fill in the SKU, brand, and origin, and you get a live label preview you can print directly or export to your label printer.

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
