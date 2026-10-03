---
title: Task panel
description: "The Nomu task panel lists every listing and duplication task, shows how long each step took, and lets you retry a failed item on its own."
---

# Task panel

The task panel is a standalone Nomu page. Which device you published from, which step the job is on, where it stopped, whether it can be retried: all of it is here, so you don't have to sit next to the listing drawer while a batch runs.

## How to open

Three ways in:

- Click the Nomu icon in the toolbar, then **Tasks** in the popup
- The action menu and the floating button on your Noon seller pages both carry **Task panel**
- The **Tasks** entry in the dashboard

It always opens in a new tab. Close the tab and you're out.

## Two task kinds, two views

The switch at the top toggles between two views. Each one keeps its own search text and filters, so switching back and forth loses nothing:

- **Publish tasks**, single products and grouped products going live. Size variants are the last step of a single-product listing, not a task of their own
- **Duplicate tasks**, cloning an already-listed Noon product from its source PSKU

### Publish task statuses

| State | What it means |
| --- | --- |
| Pending | Queued, not started yet |
| Running | Working through the steps |
| Completed | Every step finished |
| Failed | A step failed. Open the row to see why, then retry |
| Cancelled | You cancelled it |

### Duplicate task statuses

| State | What it means |
| --- | --- |
| Pending | The duplication request came in, not started yet |
| Enqueued | Duplication is done and the product joined the listing queue. Follow its progress in the publish view |
| Forwarded | Cross-device duplication: the other device has it, nothing was stored on this one |
| Failed | Duplication didn't work. Open the row to see why |
| Cancelled | You cancelled it |

## What each row shows

Each row is one product:

- Thumbnail, product title, your SKU
- Status dot, country (Saudi / UAE), task type (single / group)
- Which step it's on, and how long each step took
- Grouped products also show how many items are in the group, whether this one is the parent or a child, and its value on the spec axis. See [Group & sizes](./group-and-sizes)

Click anywhere in the row that isn't a button to expand or collapse it; failed rows start expanded. Expanding shows the full step timeline, and the failed step carries the error code, the error message, how many times it's been tried, plus **Retry** and **Copy error**. Retry only works when the error is marked retryable; otherwise the button is greyed out.

Cancelling only means anything for a pending task. A task that's already running either finishes or fails, so wait for the result.

Times are relative (a few minutes ago, a few hours ago); hover for the exact time.

## Filters

Four blocks down the left sidebar:

- **Overview** counts every state. Click a row to see only that state, click it again to see everything again. The listing success rate sits at the bottom. By default you see only pending, running and failed: completed and cancelled are counted but hidden until you click those two rows
- **Task type**, single or group, multi-select, everything selected by default
- **Time**, today / 7 days / 10 days, the last 7 days by default
- **Bulk actions**, **Clear failed** and **Clear completed**

The search box at the top matches on title or PSKU. In the duplicate view it matches the source or target SKU.

## Loading & resume

- A page shows at most 200 tasks. **Load earlier tasks** appears at the bottom, doubles the window each click, and disappears once there's nothing older left
- The list refreshes itself while tasks run, so there's nothing to reload by hand
- One listing task runs at a time by default, so a batch of 50 takes a while. Both the concurrency and the automatic retry limit (3 tries by default) live in extension settings

## Retry & clear

- **Retry** puts a failed item back in the queue; steps that already passed are skipped. A timeout on the same AI call never charges twice, and retrying a failed task never submits it twice
- **Clear completed** deletes finished and cancelled publish tasks from your browser, after a confirmation
- **Clear failed** deletes failed publish tasks from your browser. The dialog also lists the products these tasks already created on Noon and deletes those too by default; untick the box if you'd rather keep them
- **Clear tasks** is the duplicate view's button, and it drops finished duplicate task records

## Failure diagnosis

To report a failed task, send all of it: the text from **Copy error**, the product title and SKU, and the country and store. With those four nobody has to ask you a follow-up question.

## Noon session state

The task panel and the popup both carry a Noon session banner. When Noon isn't connected it says **Not logged in**, with **Session expired · Listing, sync and stock push are paused** underneath and three actions: **Log in now**, **Refresh**, **Remind me later**. It disappears once you're logged in, and **Remind me later** keeps it away for the rest of the session.

An expired session pauses listing, sync and stock push, so a batch will fail in a row. Fix the session before you submit anything.

If you aren't signed in to a Nomu account, this whole page is a sign-in wall and you never see the banner.

## Relationship with past listings

- Task records are kept per task and survive closing the browser or switching stores
- Editing a store later never rewrites tasks that already ran: a task holds the store settings as they were when it ran
- Once a task finishes, the product's real PSKU on Noon is stored on that publication record

## FAQ

### Does retry double-charge?

No. A timeout on the same AI call never charges twice, retrying a failed task never submits it twice, and steps that already passed are skipped.

### Task disappeared?

Check the filters and the time window first. The default view is pending, running and failed from the last 7 days, so anything outside that window, or anything already completed, stays hidden. **Clear completed** and **Clear failed** also delete local records, and those are gone for good.

### Can I batch-retry failed tasks?

Not yet, one item at a time. Use the overview row to surface the failed ones, then retry them one by one.
