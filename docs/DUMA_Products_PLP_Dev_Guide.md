# DUMA Official — Developer Implementation Guide
## Page: PRODUCTS PAGE (Collection PLP)

> Reverse-engineered from the live site (`https://dumaofficial.com/collections/dress`).
> Platform: **Shopify** · Base theme: **Archetype Themes** fork ("Revamp Agusutus 2025").
> Reference width: **1440px desktop**, DPR 2.
> Shares global tokens (color, type, header, footer) with the HOME PAGE guide. This file documents the **product-listing layout** (filters, sort, product grid, card, pagination).

---

## 1. Page structure (top → bottom)
```
1. announcement     (43px, shared)
2. header           (69px) — SOLID WHITE from top (no hero), SALE red
3. collection title "DRESSES" (centered)
4. filter / sort bar (horizontal)
5. product grid     (3-col, infinite scroll)
6. footer           (shared)
+ floating: Wishlist tab, WhatsApp button
```
Total height grows as products lazy-load (≈7,200px+ for this collection).

---

## 2. Collection title
- Text = collection name, **"DRESSES"**, centered, on a white band.
- Font: **cinemasunday serif, 20px, uppercase, `#454545`**, weight 400.
- Same treatment as the "ALL COLLECTIONS" title — consistent page-header pattern across the site.

---

## 3. Filter + Sort bar ⭐
A single **horizontal toolbar** (`.col-12.filter-group`) directly under the title — **not a left sidebar**.

### Layout
- **Left cluster (filters):** dropdown toggles, each with a `⌄` caret —
  `MATERIAL · COLLECTION · SIZE · STOCK STATUS · CATEGORY`
- **Right cluster:** item count `55 ITEMS` + `SORT BY ⌄`
- Type for both clusters: **cinemasunday serif, 12px, uppercase, `#444`**.

### Filter dropdown panel
Clicking a filter opens a small **white panel** anchored under the label, options left-aligned, square corners, subtle border. Example contents:
- **MATERIAL:** Knit · Woven
- **COLLECTION / SIZE / STOCK STATUS / CATEGORY:** same panel style, collection-specific values.

### Sort dropdown panel
Opens a white panel anchored to the **right** edge. Options (in order):
1. Best Selling — `?sort_by=best-selling`
2. Alphabetically, A–Z — `title-ascending`
3. Alphabetically, Z–A — `title-descending`
4. Newest — `created-descending`
5. Lowest Price — `price-ascending`
6. Highest Price — `price-descending`

```css
.filter-group { display:flex; justify-content:space-between; align-items:center;
  font-family:cinemasunday,serif; font-size:12px; text-transform:uppercase; color:#444; }
.filter-group .filter-toggle { margin-right:24px; cursor:pointer; }
.filter-dropdown { position:absolute; background:#fff; border:1px solid #e3e3e3;
  padding:12px 16px; min-width:160px; }   /* left-aligned for filters, right-aligned for sort */
.filter-dropdown li { padding:6px 0; font-family:WorkSans,sans-serif; text-transform:uppercase; }
```

---

## 4. Product grid
| Item | Value |
|---|---|
| Wrapper | `.ProductListWrapper` |
| Columns | **3 across on desktop** (1 on mobile) |
| Card width (1440px) | ~433px |
| Gutter | tight / near edge-to-edge — minimal gap between columns |
| Image aspect | portrait ≈ 4:5 |
| Initial load | ~24 cards, then lazy/infinite (see §6) |
| Lazy loading | `Image--lazyLoad Image--fadeIn` |

> Difference vs. the **collections index**: that page uses a Bootstrap flex grid with visible `p-1-half` gutters and `--expand` zoom tiles; the PLP grid is tighter and uses the standard `.ProductItem` product card.

---

## 5. Product card (`.ProductItem`) ⭐
Anatomy, top → bottom:

1. **Status badge** — top-left, translucent white pill, small uppercase text:
   - `On sale` (discounted items)
   - `Sold out` (out-of-stock — common, limited-drop signal)
2. **Image** — portrait, with **hover crossfade** between primary and `--alternate` photo (`transition: opacity 0.3s`), identical to the home page "Our Picks" cards.
3. **Title** — centered, **cinemasunday serif, 14px, uppercase, `#454545`** (e.g. `GAVINA DRESS | BLACK`, `AUDREY DRESS | CREAM`). Naming convention: `{NAME} | {COLOR}`.
4. **Price** — centered, **Nunito Sans, 14px, `#454545`**, IDR-formatted `Rp 695,000`.
   - **Sale:** current price in **red** + original price struck-through, e.g. `Rp 97,000` ~~`Rp 485,000`~~.
5. **Variant swatches** — small circular color dots below the price (e.g. black / cream / navy), indicating available colorways.

```css
.ProductItem { position:relative; text-align:center; }
.ProductItem__Label { position:absolute; top:16px; left:16px;
  background:rgba(255,255,255,.7); color:#363636; font-size:11px;
  text-transform:uppercase; padding:4px 10px; }            /* On sale / Sold out */
.ProductItem__Image, .ProductItem__Image--alternate { transition:opacity .3s; }
.ProductItem:hover .ProductItem__Image           { opacity:0; }
.ProductItem:hover .ProductItem__Image--alternate{ opacity:1; }
.ProductItem__Title { font-family:cinemasunday,serif; font-size:14px;
  text-transform:uppercase; color:#454545; margin-top:14px; }
.ProductItem__Price { font-family:"Nunito Sans",sans-serif; font-size:14px; color:#454545; }
.ProductItem__Price--sale { color:#f94c43; }
.ProductItem__Price del    { color:#9d9d9d; margin-left:6px; }
.ProductItem__Swatches { display:flex; justify-content:center; gap:6px; margin-top:8px; }
.ProductItem__Swatch { width:12px; height:12px; border-radius:50%; }
```

---

## 6. Pagination — infinite scroll ⭐
No numbered pages or "load more" button. On reaching the bottom, a centered **"PLEASE WAIT.."** loader (cinemasunday serif, uppercase, grey) appears and the next batch is fetched and appended automatically until the full count (here 55) is rendered, then the footer follows.

```js
// concept: observe a sentinel near the grid end, fetch ?page=N, append .ProductItem nodes
const sentinel = document.querySelector('.ProductListWrapper__sentinel');
new IntersectionObserver(async ([e]) => {
  if (!e.isIntersecting || loading || page > maxPages) return;
  loading = true; showLoader('PLEASE WAIT..');
  const html = await fetch(`${location.pathname}?page=${++page}`).then(r => r.text());
  appendProducts(html); loading = false;
}).observe(sentinel);
```

---

## 7. Build checklist (products / PLP page)
- [ ] Reuse global tokens, fonts, header (solid white, SALE red), and footer from the HOME PAGE guide.
- [ ] Centered collection title in cinemasunday serif 20px uppercase.
- [ ] Horizontal filter/sort toolbar (serif 12px uppercase): MATERIAL/COLLECTION/SIZE/STOCK STATUS/CATEGORY dropdowns left; `{n} ITEMS` + SORT BY right.
- [ ] Filter dropdowns = small white left-anchored panels; sort = right-anchored panel with 6 options (Best Selling → Highest Price).
- [ ] 3-column tight product grid (`.ProductListWrapper`), portrait ~4:5 images, lazy fade-in.
- [ ] Product card: top-left On sale / Sold out badge, hover image crossfade, centered serif uppercase title `{NAME} | {COLOR}`, Nunito Sans IDR price, red sale price + strikethrough, color swatch dots.
- [ ] Infinite scroll with "PLEASE WAIT.." loader appending batches up to total count.
- [ ] Floating wishlist tab + WhatsApp button.
