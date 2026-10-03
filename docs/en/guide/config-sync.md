---
title: Cloud config sync
description: "Nomu cloud config sync backs your partner code, store code, warehouses, warranty and PSKU prefix up to your Nomu account, so a new device or a reinstall restores them in one click. Sync only happens when you ask for it."
---

# Cloud config sync

Store settings (partner code, store code, warehouses, warranty, PSKU prefix and sequence) live in your browser by default. **Cloud config sync** backs them up to your Nomu account, so a new device or a reinstall gets them back in one click.

> Sync needs a signed-in Nomu account. It only runs when you press a button, never on its own.

## How to use

Open the **Account** extension page and find the **Cloud config sync** card under the **AI credits** card:

- **Upload to cloud** pushes every local store config up and overwrites whatever the cloud already had
- **Download to local** takes the full cloud config, overwrites the local one, and also deletes the local records the cloud has marked as deleted
- **Last synced** shows the local time of your most recent successful sync, or **Never synced** if there hasn't been one

## Sync semantics

Both directions send the whole set of store configs, not a slice of it. When the same config was changed on two devices, the one you changed last wins and the later sync overwrites the earlier one. Uploading once before you switch devices is the safe move.

## Data scope

Store settings: country, partner code, store code, warehouses, warranty type and months, PSKU prefix and sequence, fulfillment type, note, and the global settings.

Product batches, NomuDesign drafts, and task records are not synced. They stay in your own browser.

## Storage locations

Store settings live in your browser. The cloud backup lives on the Nomu account service.

## FAQ

### How do I restore on a new device?

Sign in to the same Nomu account on the new device, open the account page, and click **Download to local**. The cloud config overwrites what the new device had.

### Will multiple people conflict?

They can. The one you changed last wins, and the later sync overwrites the earlier one. Re-syncing on one device is harmless; editing back and forth across devices is how you lose a change.

### Sync failed?

A toast shows the error (network, expired sign-in, rejected values), your local data is untouched, and you can press the button again to retry.

### Don't want cloud sync?

You don't need it. No part of Nomu depends on it. Signing in to a Nomu account is the one thing that does send your email and token to the account service.
