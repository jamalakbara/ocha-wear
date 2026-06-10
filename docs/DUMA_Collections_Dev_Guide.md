# DUMA Official — Developer Implementation Guide
## Page: COLLECTIONS PAGE

> Reverse-engineered from the live site (`https://dumaofficial.com/collections`).
> Platform: **Shopify** · Base theme: **Archetype Themes** fork ("Revamp Agusutus 2025").
> Reference width: **1440px desktop**, DPR 2.
> Shares all global tokens (color, type, footer) with the HOME PAGE guide — see that file for the design-token reference. This file documents only what is **specific to the collections index**.

---

## 1. What this page is
This is the **collection INDEX** (a list of all collections), not a product-listing page (PLP). It renders a centered title, a 3-column grid of collection tiles, then the shared footer. (Individual collection PLPs — e.g. `/collections/dress` — add a filter/sort sidebar; see §6.)

Page structure (top → bottom):
```
1. announcement   (43px, shared)
2. header         (69px) — SOLID WHITE from the top (no hero)
3. page title     "ALL COLLECTIONS" (centered)
4. collection grid (3-col tiles, 24 items)
5. footer         (shared)
+ floating: Wishlist tab, WhatsApp button
```

---

## 2. Header — difference from home page ⭐
Because there is **no full-bleed hero**, the header is **solid white from the very top** instead of transparent.

| Property | Home page (over hero) | Collections page |
|---|---|---|
| background | `rgba(0,0,0,0)` transparent | `#ffffff` |
| text color | white | `#454545` |
| `margin-bottom` overlay trick | yes (`-69px`) | no |
| height | 69px | 69px |

`SALE` nav item is still red. Layout (logo left / nav center / utilities right) is identical.

```css
/* Collections: header is plain, no overlay */
.template-list-collections .Header { background:#fff; color:#454545; position:sticky; top:0; }
```

---

## 3. Page title
- Text: **"ALL COLLECTIONS"**, centered.
- Font: **cinemasunday serif, 20px, uppercase, `#454545`**, weight 400.
- Sits on a white band between the header and the grid (generous vertical whitespace above and below).

```css
.collections-title { font-family:cinemasunday,serif; font-size:20px;
  text-transform:uppercase; color:#454545; text-align:center; }
```

---

## 4. Collection grid
Built on a **Bootstrap-style flex grid**, not CSS grid.

| Item | Value |
|---|---|
| Wrapper class | `.CollectionList.CollectionList--grid` (`display:flex; flex-wrap:wrap`) |
| Tile classes | `col-12 col-md-4 p-1-half six-items CollectionItem--expand` |
| Columns | **3 across on desktop** (`col-md-4` = 4/12), **1 across on mobile** (`col-12`) |
| Gutter | `p-1-half` padding utility on each tile |
| Tile size (1440px) | ~480 × 615px |
| Image aspect | ~465 × 595 (portrait, ≈ 4:5) |
| Tile count | 24 |
| Full-bleed? | No — grid sits inside page padding, unlike the homepage category strip which is edge-to-edge |

```html
<div class="CollectionList CollectionList--grid">
  <div class="col-12 col-md-4 p-1-half six-items CollectionItem CollectionItem--expand">
    <a href="/collections/dresses">
      <img class="Image--lazyLoad Image--fadeIn" data-src="…">
      <span class="CollectionItem__Title">Dresses</span>
      <span class="CollectionItem__Cta">View Products</span>
    </a>
  </div>
  …
</div>
```

---

## 5. Collection tile — anatomy & interaction ⭐
Each tile is a full-height portrait model image with:

1. **Label (default, always visible):** collection name, **cinemasunday serif, uppercase, 18px, `#666`**, anchored **bottom-left**.
2. **Hover state** (`CollectionItem--expand`):
   - A **brown/dark tint overlay** fades in over the image.
   - Image scales/zooms slightly (the `--expand` modifier).
   - A centered **"VIEW PRODUCTS"** button is revealed.

### "VIEW PRODUCTS" button spec (measured)
| Property | Value |
|---|---|
| Element | `<a>` |
| Size | 199 × 48px |
| Font | Nunito Sans, 13px, uppercase |
| Letter-spacing | **2.6px** |
| Color | `#363636` (text) |
| Background | transparent |
| Border | `1px solid #ffffff` |
| Padding | `14px 28px` |
| Border-radius | `0` (sharp) |
| Position | centered in tile |

```css
.CollectionItem { position:relative; overflow:hidden; }
.CollectionItem img { transition:transform .6s ease; }
.CollectionItem:hover img { transform:scale(1.05); }            /* --expand zoom */
.CollectionItem__Overlay { position:absolute; inset:0;
  background:rgba(84,52,37,.35); opacity:0; transition:opacity .3s; }
.CollectionItem:hover .CollectionItem__Overlay { opacity:1; }
.CollectionItem__Title { position:absolute; left:24px; bottom:24px;
  font-family:cinemasunday,serif; font-size:18px; text-transform:uppercase; color:#fff; }
.CollectionItem__Cta { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
  border:1px solid #fff; color:#363636; background:transparent;
  font:13px/1 "Nunito Sans"; letter-spacing:2.6px; text-transform:uppercase;
  padding:14px 28px; opacity:0; transition:opacity .3s; }
.CollectionItem:hover .CollectionItem__Cta { opacity:1; }
```

> Note: this differs from the **home page** category strip, which is edge-to-edge and uses a small bottom-left `SHOP NOW →` text link instead of a centered bordered button.

---

## 6. Product-listing (PLP) sidebar — for individual collections
Individual collection pages (e.g. `/collections/dress`) reuse the theme's filter/sort panel (`.collection-sidebar-panel.panel`). Document for completeness:

- **FILTER** trigger opens an accordion panel.
- **SORT BY:** Best Selling · Newest · Lowest price · Highest price (maps to `?sort_by=best-selling | created-descending | price-ascending | price-descending`).
- **Filter groups (accordions):** MATERIAL · COLLECTION · SIZE · STOCK STATUS · CATEGORY.
- Actions: **Apply** / **Reset**.
- Product grid reuses `.ProductItem` cards with the same **hover image crossfade** (`opacity 0.3s`), centered Work Sans 15px titles, and `Sold out` badges as the home page "Our Picks".

---

## 7. Build checklist (collections index)
- [ ] Reuse global tokens, fonts, and footer from the HOME PAGE guide.
- [ ] Header: **solid white from top** (no transparent/overlay state), dark text, SALE red, sticky.
- [ ] Centered "ALL COLLECTIONS" title in cinemasunday serif 20px uppercase, with whitespace bands.
- [ ] Bootstrap flex grid: `col-md-4` (3-up desktop) / `col-12` (1-up mobile), `p-1-half` gutters.
- [ ] Portrait tiles (~4:5), 24 items, lazy-loaded fade-in images.
- [ ] Tile default: bottom-left serif uppercase label.
- [ ] Tile hover: brown tint + image zoom (`--expand`) + centered bordered "VIEW PRODUCTS" button (Nunito Sans 13px, letter-spacing 2.6px, 1px white border, 14×28 padding, square).
- [ ] (PLP variant) filter/sort sidebar: SORT BY + MATERIAL/COLLECTION/SIZE/STOCK STATUS/CATEGORY accordions + Apply/Reset.
- [ ] Floating wishlist tab + WhatsApp button.
