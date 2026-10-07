---
title: "Install Nomu"
description: "Install Nomu from the Chrome Web Store or the Purple Bird (紫鸟) plugin center. Step-by-step instructions, per-store assignment in Purple Bird, first-run sign-in and troubleshooting notes."
---

# Install Nomu

Nomu is on the Chrome Web Store and in the Purple Bird (紫鸟) plugin center. Both routes install the same extension, and both sign you into the same Nomu account.

## Method 1 Chrome Web Store

### 1. Open the store page

In your browser, go to Nomu's Chrome Web Store listing:

```
https://chromewebstore.google.com/detail/nomu/idfojgkppleknejhenmggcnnnmdglaik
```

You can also click the **Add to Chrome** button on the [landing page](https://nomu.kanocifer.chat) to jump straight there.

### 2. Click "Add to Chrome"

Click **Add to Chrome** on the store page; Chrome will pop up a confirmation.

### 3. Confirm permissions and install

Check the permissions listed in the prompt, then click **Add extension** to finish the install.

### 4. Pin it to the toolbar (recommended)

After install, click the puzzle icon in your toolbar and pin Nomu so the overview panel is one click away.

## Method 2 Purple Bird

In Purple Bird you can **install per store environment**: every store is a separate environment, and Nomu only shows up in the stores you assign it to. Multi-store teams assign it where it is needed instead of installing it everywhere.

### 1. Open Nomu's plugin page

```
https://appstore.ziniao.com/plugin/detail/16312716825135/Nomu-Tool-for-Noon.html
```

### 2. Install it in Purple Bird

- Open Purple Bird and go to **Manage → Applications → Get more plugins** to open the plugin center
- Search for "Nomu - Tool for Noon" and install it

### 3. Assign stores

Tick the store environments that need Nomu under **Assign stores** in the plugin center. Stores you leave unticked don't see the extension, and you can add or remove stores later from **Assign stores** or from application management in your admin console.

::: tip Team setups
Because the plugin lives inside a store environment, one account can't affect another. Grant employees access through Purple Bird's employee allowlist and permission controls, and authorize only the people who need to install or configure it.

Each store environment in Purple Bird keeps its own copy of the data: store settings configured in one store do not appear in another environment on their own. To share one set of store settings across environments, use [cloud config sync](/en/guide/config-sync): **Upload to cloud** in one environment, **Download to local** in the next.
:::

## After installing Sign in to your Nomu account

[Register](https://nomu.kanocifer.chat/register) and sign in to Nomu from the extension's **Account** page. See [Account & AI credits](/en/guide/account).

Publishing also needs you signed in to your own Noon store in the browser — Nomu works through the session you are already logged in with, so it never asks for your Noon password or keys.

## FAQ

### Store page won't open?

Make sure you're on Chrome, Edge, or another Chromium-based browser. Firefox and Safari are not supported yet.

### How do I install on Purple Bird (紫鸟)?

See [Method 2](#method-2-purple-bird) above: search for "Nomu - Tool for Noon" in the Purple Bird plugin center, install it, then tick the store environments that need Nomu under **Assign stores**.

### How do I update to the latest version?

Chrome auto-updates installed extensions. You can also force a check on `chrome://extensions` by turning on **Developer mode** and clicking **Update**. Store settings and batch data live in your browser, so an update never loses them.

## Other questions

[Get support](/en/guide/support)