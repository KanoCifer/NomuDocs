---
title: Cloud pool & transfer station
---

# Cloud pool & transfer station

The cloud pool is the cross-device handoff point for your account's captures: products captured on device A can be pushed up to the cloud instead of landing locally; when device B comes online, the floating island surfaces them and lets you claim them back into the local batch in one click.

> Sign-in to a Nomu account is required. Items in the pool are **not** written to the local database — they only land locally after you claim them.

## Where to find it

| Entry point | When it shows up |
| --- | --- |
| "Push to transfer station" button in the capture drawer | After capture finishes, before the batch lands locally |
| Floating island at the bottom of every page | Always on; shows online device count and pool item count for the account |

By default the capture drawer still lands the batch locally first; "Push to transfer station" is what moves this batch from local to cloud. They are separate write paths and do not double-write.

## Push and claim

**Push side**

- After capture completes, click "Push to transfer station". The batch leaves the local batch list and mounts onto the cloud pool
- The pool header shows "online device count / items in pool"
- Pushes are idempotent — re-pushing the same product (matched by source URL + parsed signature) does not double-write

**Claim side**

- Expanding the floating island shows products pushed by other devices on the same account
- The header "Claim all" button reserves every SKU up front and consumes them sequentially, avoiding number gaps; per-row results are aggregated back
- The claim button on each card can pull a single item
- Claimed products land in the claim device's local batch and continue down the normal listing pipeline (edit, group, publish, duplicate — all still available)

Claimed SKU numbers increment against the claiming device's store PSKU sequence and do not share numbering with the push device — this is **handoff**, not **duplicate**.

## Showing / hiding the floating island

The bottom floating island can be turned off:

- Quick menu "More" → "Hide floating island" toggle; persists across sessions
- When hidden, the pool's online status and item count do not display, but other devices' pushes still land normally. The next time you open the extension, if the pool has unclaimed items, a toast surfaces them.

> Any device on the same account that is **not installed** or has been **offline** for a long time auto-demotes to offline and no longer counts toward the online count.

## Offline and catch-up

- If the receiving side is offline when something is pushed, it still lands in the cloud pool
- When that side comes online, the floating island shows the backlog; one claim pulls everything
- **Unclaimed** items in the pool stick around for a window (see server policy); older items are purged

## When to use it

- **Split roles across machines**: one machine only captures (no Noon login needed) and pushes; another machine only publishes (already signed in to Noon) and claims
- **Switch machines mid-batch**: push what's unfinished and claim it on the new machine
- **One-off parses**: products parsed from the right-click "Parse with AI" adapter can go straight to the pool without dirtying the local batch

## How it differs from "Duplicate product"

| Dimension | Cloud pool / transfer station | Duplicate product |
| --- | --- | --- |
| Push side | Any capturing device | Must have a source PSKU (an already-listed Noon product) |
| Landing side | Claim device's local batch | Target PartnerSku's already-listed product (upsert semantics) |
| What runs after | Capture → listing after claim | Joins the publishTask step table directly |
| Sign-in required | Yes | No |

## FAQ

### I pushed and now my local batch is empty?

Pushing moves items from the local batch to the cloud pool — it does not copy. If you want both, accept the batch locally first, then push a separate copy; there is currently no "keep both local and cloud" toggle.

### Claim all is stuck?

Claim all consumes sequentially. When one SKU fails to reserve (network blip, peer throttling), that row surfaces its failure reason and the rest continue — you will not see "the whole batch failed".

### Can I still claim if the floating island is hidden?

Yes. Hiding the floating island only stops the always-on surface; receiving into the pool itself is unaffected. Re-open the floating island, or just open the capture drawer to see the backlog.