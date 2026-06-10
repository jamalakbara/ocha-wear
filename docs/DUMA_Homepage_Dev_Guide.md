# DUMA Official — Developer Implementation Guide
## Page: HOME PAGE

> Reverse-engineered from the live site (`https://dumaofficial.com/`).
> Platform: **Shopify** · Base theme: **Archetype Themes** fork (internally "Revamp Agusutus 2025").
> Reference width: **1440px desktop**, DPR 2.

---

## 1. Tech stack & foundations

| Item | Value |
|---|---|
| Platform | Shopify (Liquid + vanilla JS, no React/Vue) |
| Theme family | Archetype Themes (BEM-style `Block__Element` classes, `u-h1` utilities) |
| Image loading | `lazysizes` — every image uses `Image--lazyLoad Image--fadeIn` |
| Responsive images | Art-directed `srcset`: `_1x1` (mobile square) vs `_x800`/wide (desktop) |
| Layout width | **Full-bleed, no max-width container** (`max-width: none`) |
| Section spacing | Sections flush-stacked — `margin: 0`, mostly `padding: 0`. Separation comes from imagery + whitespace bands, not gaps |

---

## 2. Design tokens

### Colors
```css
:root {
  --cream:        #ece9e0; /* announcement bar bg */
  --brown:        #543425; /* announcement text */
  --brown-accent: #5f3e22; /* CTA text, subscribe */
  --taupe:        #c9bfb5; /* button fills, accents */
  --beige:        #f1e4d8;
  --text:         #454545; /* primary body/product text */
  --text-muted:   #666666; /* nav, footer, headings */
  --line:         #e3e3e3; /* borders / dividers */
  --near-black:   #363636;
  --white:        #ffffff;
  --sale-red:     #c8232c; /* "SALE" nav item only */
}
```

### Typography
Self-hosted `.woff2`, all with `font-display: swap`.

| Role | Font | Usage |
|---|---|---|
| Display / emotional | **Theseasons** (high-contrast serif) | hero wordmark, lookbook captions |
| Section headings | **cinemasunday** (serif) | "OUR PICKS", footer titles |
| Functional UI | **Work Sans** (variable) | nav, product titles, footer links, buttons |
| Logo | serif wordmark ("DUMA") | header |
| Spare faces in theme | NNNouvelleGrotesk, HVFitzgeraldBold, BwGradualDEMO | available, used sparingly |

**Rule of thumb:** serif for display moments, Work Sans for everything functional, UI text is **uppercase with wide letter-spacing**.

### Measured type scale
| Element | Font | Size | Treatment | Color |
|---|---|---|---|---|
| Hero wordmark | Theseasons | ~120px+ | centered | white |
| Section heading | cinemasunday | 20px | uppercase, centered | `#666` |
| Nav links | Work Sans | ~13px | uppercase | `#666` (sticky) / white (over hero) |
| Category label | Work Sans | 17px | uppercase | white |
| "Shop now" micro-link | Work Sans | 10px | uppercase | white |
| Product title | Work Sans | 15px | sentence case, centered | `#454545` |
| CTA button | Work Sans | 13px | uppercase, letter-spacing 1.5px | black |
| Footer title | cinemasunday | 14px | uppercase | `#666` |
| Footer link | Work Sans | 12px | uppercase | `#666` |
| Subscribe button | Work Sans | 12px | uppercase, letter-spacing 2.4px | `#5f3e22` |

### Shape language
No rounded corners anywhere (`border-radius: 0`). Buttons are sharp; many CTAs are **borderless text links** (transparent bg, 4px bottom padding for an underline feel).

---

## 3. Page structure (top → bottom)

Stack order of Shopify sections (~4,900px total height):

```
1. popup            (newsletter/promo modal, 0px in flow)
2. sidebar-menu     (off-canvas mobile nav, 0px in flow)
3. announcement     (43px)
4. header           (69px, overlays hero)
5. slideshow        (808px) — hero
6. image_slider_grid(495px) — category grid
7. two-up editorial (720px)
8. image_section    (655px) — lookbook
9. featured-collections (964px) — "Our Picks"
10. bottom banner   (722px)
11. footer          (395px)
+ floating: Wishlist tab (right edge), WhatsApp button (bottom-right)
```

---

## 4. Component specs

### 4.1 Announcement bar — 43px
- Background `#ece9e0`, text `#543425`, **Work Sans 15px**, centered.
- Copy pattern: `Out Now — {Campaign} | Free Shipping Nationwide*`
- No padding; text vertically centered in 43px.

### 4.2 Header — 69px ⭐ key technique
- **Over hero:** `background: rgba(0,0,0,0)` (transparent), text white, pulled up onto the hero with `margin-bottom: -69px`.
- **On scroll:** becomes a **solid white sticky bar**, text turns dark, `SALE` stays red.
- 3-zone layout:
  - **Left:** "DUMA" serif logo (~110×33px)
  - **Center:** `SHOP ▾ · NEW ARRIVALS · ABOUT US · SALE` (Work Sans uppercase ~13px)
  - **Right:** `IDR ▾` currency · account · search · cart
- `SHOP ▾` opens a mega-menu with image tiles (New In / Most Wanted).

```css
/* transparent-over-hero → solid-on-scroll */
.Header { position: fixed; width: 100%; background: transparent; color: #fff;
          margin-bottom: -69px; transition: background .3s, color .3s; }
.Header.is-stuck { background: #fff; color: #666; }
.Header .nav--sale { color: #c8232c; }
```

### 4.3 Hero slideshow — 808px
- Full-bleed photo, `object-fit: cover`, supports rotating slides.
- Campaign wordmark **centered** in Theseasons serif, white, sitting directly on the image (no overlay tint, no box).
- Mobile swaps to the `_1x1` square crop.

### 4.4 Category grid — 495px
- Desktop: 4-column slider (`.slider.desktop-only`, 4 slides). Mobile: stacked `.mobile-grid`.
- Each cell = full-height vertical model shot.
- **Label anchored bottom-left, white overlay:**
  - Category: Work Sans **uppercase 17px**
  - Sub-link: `SHOP NOW →` Work Sans **uppercase 10px**
- Items: OUTERWEARS · DRESSES · BOTTOMS · TOPS

### 4.5 Two-up editorial — 720px
- 50/50 side-by-side full-bleed campaign images/video. No text.

### 4.6 Lookbook image — 655px
- Single centered full-width photo + caption below, centered, serif display (e.g. "DUMA Escape, Perth '25").

### 4.7 "Our Picks" carousel — 964px
- Heading: **"OUR PICKS"**, cinemasunday serif, 20px, uppercase, centered, `#666`.
- Horizontal product carousel (`.ProductList--carousel`), ~24 cards, fixed-width cards with small gaps.
- **Product card** (`.ProductItem`):
  - Stacked primary + `--alternate` image.
  - **Hover = crossfade** via `transition: opacity 0.3s`.
  - Title: Work Sans 15px, `#454545`, centered.
  - `Sold out` badge (most items sold out — limited-drop signal).
- Closes with centered `VIEW ALL PRODUCTS →` text link.

```css
.ProductItem__Image, .ProductItem__Image--alternate { transition: opacity .3s; }
.ProductItem__Image--alternate { opacity: 0; position: absolute; inset: 0; }
.ProductItem:hover .ProductItem__Image          { opacity: 0; }
.ProductItem:hover .ProductItem__Image--alternate{ opacity: 1; }
```

### 4.8 Bottom banner — 722px
- Full-width "home living" interior shot (lifestyle positioning), links to a collection.

### 4.9 Footer — 395px
- White bg, 4 left-aligned columns: **GENERAL · INFO · CUSTOMER CARE · NEWSLETTER**.
- Titles: cinemasunday serif uppercase 14px `#666`. Links: Work Sans uppercase 12px `#666`.
- Newsletter: **underline-only email input** (no box) + `SUBSCRIBE` button (Work Sans uppercase 12px, letter-spacing 2.4px, text `#5f3e22`, taupe fill).
- Centered legal line: "PT Duma Kreasi Indonesia".

---

## 5. Motion / animation

| Animation | Trigger | Detail |
|---|---|---|
| Header transition | scroll | transparent+white-text → solid-white+dark-text |
| Product image swap | card hover | `opacity 0.3s` crossfade primary ↔ alternate |
| Button label slide | CTA hover | `buttonFromLeftToRight/RightToLeft/TopToBottom` keyframes — text translates out, duplicate slides in from opposite edge |
| Lazy fade-in | scroll into view | `Image--fadeIn` via lazysizes |
| Cart drawer | add to cart | `cartEmptyOpening`, `variantSelectorInfoOpening/Closing` popovers |
| Shop-the-look dots | section enter | `shopTheLookDotKeyframe` pulse |

```css
@keyframes buttonFromLeftToRight {
  0%   { transform: translate(0); }
  25%  { opacity: 0; transform: translate(100%); }
  50%  { opacity: 0; transform: translate(-100%); }
  75%  { opacity: 1; transform: translate(0); }
}
```

---

## 6. Third-party apps / integrations
- **Wishlist Hero** (revampco) — the floating "My Wishlist" right-edge tab.
- **Nova Multi-Currency Converter** — `IDR ▾ / USD` switcher.
- **Minmaxify** — order quantity / purchase limits (supports limited drops).
- **WhatsApp** chat button — fixed bottom-right.
- **Google Analytics** (migrated tag).

---

## 7. Build checklist (to replicate the home page)
- [ ] Full-bleed layout, no max-width, zero inter-section margin.
- [ ] Load Theseasons + cinemasunday + Work Sans (`font-display: swap`).
- [ ] Apply color tokens; keep everything square-cornered.
- [ ] Cream announcement bar (43px) with brown centered text.
- [ ] Transparent header overlaying hero (`margin-bottom:-69px`), solid-white sticky on scroll, SALE in red.
- [ ] 808px hero with centered serif wordmark, `object-fit: cover`, `1x1` mobile crop.
- [ ] 4-col category slider with bottom-left white labels + 10px shop-now links.
- [ ] Editorial two-up + lookbook caption beats.
- [ ] Product carousel with hover crossfade cards, centered Work Sans titles, sold-out badges.
- [ ] Lifestyle bottom banner.
- [ ] 4-column footer + underline newsletter input + taupe subscribe button.
- [ ] Floating wishlist tab + WhatsApp button.
