# Install Nomu

Nomu is on the Chrome Web Store. The whole install takes less than a minute.

## Steps

### 1. Open the store page

In your browser, go to Nomu's Chrome Web Store listing:

```
https://chromewebstore.google.com/detail/nomu/idfojgkppleknejhenmggcnnnmdglaik
```

You can also click the **Add to Chrome** button on the [landing page](https://nomu.kanocifer.chat) to jump straight there.

### 2. Click "Add to Chrome"

Click **Add to Chrome** in the top-right of the store page; Chrome will pop up a confirmation.

### 3. Confirm permissions and install

Review the permissions in the prompt, then click **Add extension** to finish the install.

### 4. Pin it to the toolbar (recommended)

After install, click the puzzle icon 🧩 in your toolbar and pin Nomu so the side panel is always one click away.

## FAQ

### Store page won't open?

Make sure you're on Chrome, Edge, or another Chromium-based browser. Firefox / Safari are not supported.

### Installing on Purple Bird (紫鸟) or other Chromium-based browsers

These browsers are theoretically Manifest V3 compatible, but the Chrome Web Store is not directly reachable from them. Use one of:

1. **Ask the author** for a signed `.crx` or extension package, then either "Load unpacked" or drag the `.crx` into the browser's extension page.
2. After install, grant permissions the same way as on Chrome. Store configs, batch drafts and the login state stay per-machine; nothing syncs back to your Chrome profile.

> Purple Bird's multi-account windowing stacks with Nomu's multi-store design — each Purple Bird window logs in to a separate Noon account, and each account owns one or more Nomu stores. Switching Purple Bird windows swaps account context.

### How do I update to the latest version?

Chrome auto-updates installed extensions. You can also force a check on `chrome://extensions` by turning on **Developer mode** and clicking **Update**. Store settings and batch data live locally, so updates never lose them.

### I click the icon and nothing happens?

Nomu's UI lives on source product pages (1688, Taobao/Tmall, JD.com or noon.com) and the Noon seller catalog. Sign in to Noon first, then open one of those pages.

## Other questions

[Get support](./support)