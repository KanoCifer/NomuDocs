---
title: Cloud config sync
---

# Cloud config sync

By default, your Nomu store configuration (PartnerCode, store code, warranty, PSKU prefix, etc.) is stored locally in your browser. **Cloud config sync** backs these configs up to the Nomu account service so you can restore them on another device or after a reinstall with a single click.

> Sync requires a Nomu account. Sync is **only triggered manually from the account page** — it never runs automatically.

## How to use

Open the **Account** extension page (standalone `account.html`), find the **Cloud config sync** card below the **AI credits** card:

- **Upload to cloud** — push all local store configs to the cloud, overwriting whatever is there.
- **Download to local** — pull the full cloud config and overwrite the local one, also deleting any local records marked as deleted on the cloud side.
- **Last synced** — the local time of the most recent successful sync; shows "Never synced" if there isn't one.

## Sync semantics

Sync is **local-as-source-of-truth**:

| Action | Up | Down |
| --- | --- | --- |
| Upload | Local full snapshot (with version) | Server acknowledgement |
| Download | Local full snapshot (to satisfy server's upload contract) | Cloud full snapshot → `bulkPut` overwrites local |

Every sync sends the full local config (up to 200 rows). The server does optimistic concurrency control on `version` (LWW — last write wins). Records marked `deleted: true` remotely are deleted locally.

## Data scope

The synced fields are the entire `ConfigModel` row in the Dexie `configs` table, primarily:

- `kind` (`store` / `global`)
- `country`, `partnerCode`, `noonStoreCode`
- `wareHouses` (FBP warehouse snapshot)
- `warrantyType`, `warrantyDuration`
- `pskuPrefix`, `pskuSeq`
- `fulfillmentType`, `note`
- `globalSettings` (global settings row only)
- `version` (optimistic-concurrency version, incremented by +1 on every local change)

Product batches, NomuDesign drafts, and task records are **not** synced — they only live in the local browser.

## Storage locations

| Data | Location |
| --- | --- |
| Store config | Browser `chrome.storage.local` + Dexie `configs` table |
| Cloud backup | Nomu account service (`api.kanocifer.chat`) |
| Last synced time | `globalSettings.nomuLastSyncAt`, browser-local |

## FAQ

### How do I restore on a new device?

Sign in to the same Nomu account on the new device → open the account page → click **Download to local**, and the cloud config overwrites the local one.

### Will multiple people conflict?

The server does LWW upsert on `version` + `updatedAt`. The later sync wins over the earlier one; we recommend doing one **Upload to cloud** before switching devices to make sure you have the latest.

### Sync failed?

A toast shows the error (network, auth, parameter validation, etc.) and local data is unaffected. Hit the button again to retry.

### Don't want cloud sync?

Totally optional — if you never upload, nothing leaves your browser. No Nomu feature depends on cloud sync.