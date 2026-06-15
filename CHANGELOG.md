# Bharat Birthtime — Changelog

All notable changes are recorded here in reverse chronological order.
Format: `## [vX.Y] — YYYY-MM-DD` · brief summary per change.

---

## [v1.4] — 2026-06-16

**Share Card — Full Visual Redesign**
- Complete rewrite of `drawCard()`: dark gradient background (#071f1c → #0e4a41), radial centre glow, subtle nakshatra ring watermark, double gold border
- Programmatic brand logo drawn on card (teal arc, gold crescent, two 4-pointed stars) — replaces Om symbol
- Gregorian birthday now shown on card: "Born 15 Jan 1990 (Gregorian)"
- QR code added bottom-right of card (links to https://bharat-birthtime.pages.dev) using qrcodejs CDN
- Visual hierarchy improved: name italic 62px → tithi big date 76px bold → ornament divider → nakshatra big date 58px bold
- qrcodejs library added via CDN: `https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js`

**Icons & Social Preview**
- icon-192.png, icon-512.png, favicon.png — regenerated from extracted Canva brand logo (teal background, moon+stars design)
- og-image.png — regenerated 1200×630 with brand logo on right, text content on left

**Page Structure**
- Facts section (`id="factsSection"`) removed entirely — nav link, section HTML, and associated CSS all removed
- Header logo reverted to original nakshatra wheel SVG (27 alternating-colour segments, crescent moon centre)

---

## [v1.3] — 2026-06-14

**Dasha Table**
- Hover tooltips added to all 9 planet names in Dasha table — shows life themes for each period
- `DASHA_TIP` object added with descriptions for Ketu, Venus, Sun, Moon, Mars, Rahu, Jupiter, Saturn, Mercury
- Hover instruction added above table: *"💡 Hover over any planet name below to see the life themes it governs during its period."*

**Stay Connected Section**
- Rewritten as two side-by-side cards: WhatsApp Channel card + Browser Reminders card
- WhatsApp and Instagram links removed from contact section (intentional — not for public listing)
- Removed subtext "Jyotisha insights, festival context..." from under Stay Connected heading

**Social Sharing**
- `updateSocialLinks()` fixed — detects `file://` protocol locally and substitutes `https://bharatbirthtime.in`
- LinkedIn share uses `url+summary`, Twitter/X uses `url` only
- OG meta tags updated: added `og:url`, `og:image`, `og:image:width/height/alt`, `twitter:card` → `summary_large_image`, `twitter:image`

**Page UX**
- Scroll-to-top button added (fixed bottom-right, fades in after 320px scroll, fades out at top)
- Website share footer section added (5 buttons: WhatsApp, Twitter/X, Facebook, LinkedIn, Copy Link)

**OneSignal**
- App ID updated to `7d43e69e-b9b7-482c-bd2f-993857aac815`

---

## [v1.2] — 2026-06-13

**Cloudflare Pages Setup**
- Migrated from Cloudflare Workers to Cloudflare Pages (static hosting)
- Auto-deploy pipeline established: git push to `studioofgigil/bharat-birthtime` → live at https://bharat-birthtime.pages.dev within 60s
- `index.html` rule established: must always be exact copy of `bharat-birthtime.html`
- DEPLOY-GUIDE.md created covering full workflow, auth, domain setup, and social URLs

---

## [v1.1] — 2026-06-10

**Core Jyotisha Engine**
- Meeus 57-term Moon series + Lahiri ayanamsa for sidereal longitude
- Tithi: `floor(elongation/12)+1` where elongation = norm360(moonLon − sunLon)
- Nakshatra: `floor(sidereal_moon_lon / (360/27))`
- NOAA sunrise algorithm (3-iteration convergence) for local sunrise time
- Vimshottari Dasha: 120-year cycle, 9 planets, `DASHA_P` + `DASHA_Y` arrays
- URL profile sharing via `URLSearchParams` (dob/tob/lat/lon/tz encoded in URL)
- FESTIVAL_DATA: 37 festivals indexed by tithi + masa

**PWA**
- manifest.json, sw.js, icon-192.png, icon-512.png, favicon.png
- OneSignal push notification integration for birthday reminders

---

## [v1.0] — 2026-06-01

- Initial build: single-file HTML converting Gregorian birthday to Janma Tithi + Janma Nakshatra
- 100% in-browser computation — zero data sent to any server
- Dark teal theme, Devanagari typography, festival highlights
