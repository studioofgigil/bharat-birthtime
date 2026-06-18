# Bharat Birthtime — Deployment & Workflow Guide

> Last updated: June 2026 | Add new instructions at the bottom under the relevant section.

---

## Stack

| Layer | Tool | URL |
|-------|------|-----|
| Code files | Local Mac folder | `/Users/veerbandi/Claude/Projects/Bharat Birthtime/` |
| Version control | GitHub | https://github.com/studioofgigil/bharat-birthtime |
| Hosting | Cloudflare Pages | https://bharat-birthtime.pages.dev |
| Custom domain | Cloudflare + BigRock | https://birthstarday.com |
| Auto-deploy | On every `git push` to `main` | ~30–60 sec lag |

---

## Every time Claude makes changes — run these 3 commands

Open **Terminal** and paste:

```bash
cd "/Users/veerbandi/Claude/Projects/Bharat Birthtime"
git add .
git commit -m "brief description of what changed"
git push
```

Cloudflare detects the push automatically and goes live within 60 seconds.

---

## Important file rules

- **`bharat-birthtime.html`** — the master working file. All edits go here.
- **`index.html`** — must always be an exact copy of `bharat-birthtime.html`. Cloudflare Pages serves `index.html` at the root URL `/`. Claude keeps this in sync whenever it updates the master file.
- If they ever get out of sync, run:
  ```bash
  cp "/Users/veerbandi/Claude/Projects/Bharat Birthtime/bharat-birthtime.html" \
     "/Users/veerbandi/Claude/Projects/Bharat Birthtime/index.html"
  ```
  Then push.

---

## GitHub authentication

- **Account:** studioofgigil
- **Auth method:** Personal Access Token (PAT) stored in macOS Keychain
- **Token scope needed:** `repo`
- To regenerate a token: github.com → Avatar → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token (classic) → check `repo` → copy immediately
- To store new token in Keychain:
  ```bash
  git remote set-url origin https://studioofgigil:YOUR_TOKEN@github.com/studioofgigil/bharat-birthtime.git
  git config --global credential.helper osxkeychain
  ```

---

## Cloudflare Pages setup (reference — already done)

- **Project name:** bharat-birthtime
- **Connected repo:** studioofgigil/bharat-birthtime (main branch)
- **Build command:** *(blank)*
- **Build output directory:** `/`
- **Dashboard:** dash.cloudflare.com → Workers & Pages → bharat-birthtime (Pages icon, not Worker)

### If Cloudflare loses GitHub connection
1. Cloudflare Dashboard → bharat-birthtime → Settings → Builds & deployments → Disconnect
2. Reconnect Git → authorize studioofgigil account specifically
3. Select `bharat-birthtime` repo → Save

---

## Cloudflare Pages vs Workers — know the difference

| | Pages | Workers |
|--|-------|---------|
| Icon | Page icon (what we use ✅) | Blue diamond |
| URL pattern | `.pages.dev` | `.workers.dev` |
| Use for | Static HTML sites | Serverless functions |
| Deploy trigger | Auto on git push | Manual or wrangler CLI |

**We use Pages. If you ever see `.workers.dev` in the URL, something is wrong.**

---

## PWA & Service Worker notes

- `sw.js` is the service worker — handles offline caching and push notifications
- `manifest.json` — PWA manifest (app name, icons, theme colour)
- `icon-192.png`, `icon-512.png`, `favicon.png` — PWA icons
- `og-image.png` — 1200×630 social preview image for Facebook/LinkedIn/Twitter
- These files must all be in the same folder as `index.html` and pushed to GitHub together

---

## OneSignal Push Notifications

- **App ID:** `7d43e69e-b9b7-482c-bd2f-993857aac815`
- Configured in `bharat-birthtime.html` inside the OneSignal SDK init block
- Users opt in via the "Enable reminders on this device" button in Stay Connected section
- To change App ID in future: search for the App ID string in `bharat-birthtime.html` and replace

---

## Custom domain (when ready)

To connect a domain like `bharatbirthtime.in`:
1. Buy domain from GoDaddy / Namecheap / BigRock (~₹700–900/year for .in)
2. Cloudflare Pages → bharat-birthtime → Custom domains → Add domain
3. Follow DNS instructions (point nameservers or add CNAME)
4. Update all hardcoded `bharatbirthtime.in` references in the HTML (OG tags, share buttons, service worker) — currently placeholders

---

## Social sharing URLs (hardcoded in HTML)

The "Share this website" section at the bottom uses these hardcoded URLs — update once domain is live:
- WhatsApp: `https://wa.me/?text=...bharatbirthtime.in`
- Twitter: `https://twitter.com/intent/tweet?url=bharatbirthtime.in`
- Facebook: `https://www.facebook.com/sharer/sharer.php?u=bharatbirthtime.in`
- LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=bharatbirthtime.in`
- OG image meta tag: `<meta property="og:image" content="https://bharatbirthtime.in/og-image.png">`

Search for `bharatbirthtime.in` in the HTML to find all occurrences.

---

## WhatsApp Channel

- **Channel:** Breeze under the Banyan
- **Link:** https://whatsapp.com/channel/0029VbCQ8rPHwXb5Wpungh44
- Referenced in Stay Connected section of the page

---

## Contact

- **Email:** studioofgigil@gmail.com
- (WhatsApp and Instagram intentionally removed from the live page)

---

## Git tagging — version anchors

Tag every release so you can jump back to any named version instantly.

**After each push, run:**
```bash
cd "/Users/veerbandi/Claude/Projects/Bharat Birthtime"
git tag v1.5          # use the version number from CHANGELOG.md
git push --tags
```

**To list all tags:**
```bash
git tag
```

**To jump back to a tagged version (read-only inspection):**
```bash
git checkout v1.4
# to return to latest:
git checkout main
```

**Tagging convention used in this project:** `v<major>.<minor>` — increment minor for feature additions, major for full redesigns.

---

## Future instructions — add below this line

*(Paste new deployment notes, domain setup steps, analytics setup, or any other guides here as the project grows)*
