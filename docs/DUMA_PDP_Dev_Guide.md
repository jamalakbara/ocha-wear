# DUMA Official — Developer Implementation Guide
## Page: PRODUCT DETAIL PAGE (PDP)

> Reverse-engineered from the live site (`/collections/dress/products/thasa-dress-black`).
> Platform: **Shopify** · Base theme: **Archetype Themes** fork ("Revamp Agusutus 2025").
> Reference width: **1440px desktop**, DPR 2.
> Shares global tokens (color, type, header, footer, floating UI) with the HOME PAGE guide. This file documents the **product detail layout**.

---

## 1. Page structure (top → bottom)
```
1. announcement            (43px, shared)
2. header                  (69px) — SOLID WHITE from top, SALE red
3. product-template        — 3-zone product layout (gallery + info)
4. product-recommendations — "You may also like" carousel
5. recently-viewed-products— "Recently Viewed" carousel
6. footer                  (shared)
+ floating: Wishlist tab, WhatsApp button
```

---

## 2. Core layout — 3 zones
The product template is a three-column layout:

```
┌────────┬───────────────────────────┬──────────────────┐
│ THUMB  │   STACKED IMAGE GALLERY    │   PRODUCT INFO   │
│ RAIL   │   (scrolls)                │   (sticky)       │
│(sticky)│                            │   ~400px wide    │
└────────┴───────────────────────────┴──────────────────┘
```
- **Left — thumbnail rail (sticky):** narrow vertical column of image thumbnails, pinned while you scroll. Clicking a thumb scrolls the gallery to that image. The last thumb carries a **▶ play icon** = product video.
- **Center — stacked gallery:** `Product__Gallery--stack Product__Gallery--withThumbnails`. All product images are stacked **vertically** at large size and scrolled through (no arrows/dots) — a long editorial scroll, ending in the video.
- **Right — product info (sticky):** ~400px column that stays fixed while the gallery scrolls past it.

```css
.Product__Gallery--stack .Product__SlideItem { display:block; width:100%; margin-bottom:8px; }
.Product__Thumbnails { position:sticky; top:90px; width:80px; }
.ProductMeta       { position:sticky; top:90px; width:400px; }
```

---

## 3. Product info column (right, sticky)
Top → bottom:

| Element | Font | Size | Treatment | Color |
|---|---|---|---|---|
| Vendor | cinemasunday serif | 14px | uppercase | `#454545` |
| Title | cinemasunday serif | 18px | uppercase | `#454545` |
| Price | Nunito Sans | 15px | — | `#454545` |
| — divider — | | | `1px solid #e3e3e3` | |
| Accordion labels | cinemasunday serif | ~14px | uppercase, underlined | `#454545` |
| Accordion body | Nunito Sans | ~15px | sentence case | `#454545` |
| "Share" + icons | Nunito Sans | small | — | `#666` |

- **Vendor:** `DUMA OFFICIAL`
- **Title:** `{NAME} | {COLOR}` (e.g. `THASA DRESS | BLACK`)
- **Price:** IDR-formatted, `Rp 725,000` (sale items would show red + struck-through original, per PLP convention).

### Accordions (`Collapsible`)
Three collapsible rows with a `+ / −` toggle on the right:
1. **DESCRIPTION** — open by default (`−`). Product copy in Nunito Sans.
2. **DETAILS** — collapsed (`+`).
3. **SHIPPING/RETURNS** — collapsed (`+`).

```css
.Collapsible__Button { display:flex; justify-content:space-between; align-items:center;
  font-family:cinemasunday,serif; text-transform:uppercase; font-size:14px;
  text-decoration:underline; padding:18px 0; border-bottom:1px solid #e3e3e3; cursor:pointer; }
.Collapsible__Button .icon::after { content:"+"; }
.Collapsible__Button[aria-expanded="true"] .icon::after { content:"−"; }
.Collapsible__Content { font-family:"Nunito Sans",sans-serif; font-size:15px; color:#454545; }
```

### Social share row
A `Share` label followed by **Facebook / Twitter / Pinterest** icon links, at the bottom of the info column.

---

## 4. ⭐ No on-page purchase form (catalog / editorial PDP)
**Important behavioral finding:** this PDP renders **no add-to-cart form and no size/variant selector** (`form[action*="/cart/add"]` is absent). The page is informational — image gallery + description + share — with **no buy button**.

- The product's variant data still exists in the page's product JSON (2 variants defined), but it is **not surfaced** as a selectable control.
- Ordering is therefore routed **off-page** — the persistent **WhatsApp** button (bottom-right) is the de-facto purchase channel, typical of WhatsApp-commerce fashion brands in this market.

> Implementation note: if you replicate this, the PDP is a content template, not a commerce form. If you instead want a standard purchasable PDP, you'd add: a size/variant `fieldset` of swatch buttons, an `Add to cart` submit, quantity, and the theme's `variantSelectorInfoOpening/Closing` popover animations (these keyframes already exist in the theme CSS).
>
> Re-verify on additional products — some items may expose a buy form while this one does not. Treat "no purchase UI" as observed on this product, not guaranteed store-wide.

```html
<!-- Observed: informational meta block, NO <form action="/cart/add"> -->
<div class="ProductMeta">
  <span class="ProductMeta__Vendor">Duma Official</span>
  <h1 class="ProductMeta__Title">Thasa Dress | Black</h1>
  <span class="ProductMeta__Price">Rp 725,000</span>
  <hr>
  <div class="Collapsible" data-open>…DESCRIPTION…</div>
  <div class="Collapsible">…DETAILS…</div>
  <div class="Collapsible">…SHIPPING/RETURNS…</div>
  <div class="ProductMeta__ShareButtons">Share … </div>
</div>
```

---

## 5. Below-product sections
1. **`product-recommendations` — "You may also like"**
   - Heading style matches site section headers.
   - Carousel of related `.ProductItem` cards (same hover crossfade, serif uppercase title, Nunito Sans price as PLP). Observed items: Gavina Dress | Black, Audrey Dress | Black, Raven Dress | Black, Chi Dress | Maroon.
2. **`recently-viewed-products` — "Recently Viewed"**
   - Same card component, populated from the visitor's browsing history.
3. **Footer** — shared 4-column layout.

---

## 6. Build checklist (PDP)
- [ ] Reuse global tokens, fonts, header (solid white, SALE red), footer, floating UI.
- [ ] 3-zone layout: sticky thumbnail rail · scrolling stacked gallery · sticky ~400px info column.
- [ ] Stacked gallery (`--stack --withThumbnails`): full-width images stacked vertically, click-thumb-to-scroll, final slide = product video with ▶ thumb.
- [ ] Info column: vendor (serif 14px), title `{NAME} | {COLOR}` (serif 18px), IDR price (Nunito Sans 15px), divider.
- [ ] Three `Collapsible` accordions: DESCRIPTION (open), DETAILS, SHIPPING/RETURNS, with `+/−` toggles, underlined serif uppercase labels.
- [ ] Social share row (Facebook/Twitter/Pinterest).
- [ ] PDP is a **catalog page — no add-to-cart / no size selector**; route purchase via WhatsApp. (Add a buy form only if building a purchasable variant.)
- [ ] "You may also like" + "Recently Viewed" `.ProductItem` carousels below.
