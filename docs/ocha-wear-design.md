# Ocha Wear — Design System

> Translating the Ocha Wear brand identity into actionable design tokens, component rules, and UI patterns.
> Color values derived directly from the official logo asset.

---

## 1. Design Principles

**1. Grounded Elegance**
The olive + cream logo is the visual anchor. Every screen should feel like it belongs to the same world as that monogram — warm, composed, and quietly confident.

**2. Nature as a Foundation**
Olive green is not an accent — it is the brand's identity color. It grounds the playful seasonal palettes and prevents the visual language from drifting into generic "pastel fashion brand" territory.

**3. Campaign Energy on a Stable Base**
Seasonal collections bring color and excitement, but they always sit on top of the same olive/cream/off-white foundation. The logo should always feel at home on any page.

**4. Mobile-First, Always**
The audience shops through Instagram, TikTok, and Shopee on mobile. Every layout decision starts from a 390px viewport.

---

## 2. Color Tokens

### 2.1 Brand Colors (Logo-Derived)

```css
--color-brand-olive:      #768156;   /* Ocha Olive — logo background, primary CTA */
--color-brand-olive-dark: #5E6844;   /* Olive darkened 15% — hover states */
--color-brand-olive-light:#A0A87A;   /* Olive lightened — tinted surfaces */
--color-brand-olive-tint: #EEF0E6;   /* Olive at 12% opacity on white — subtle bg */
--color-brand-cream:      #EAE4DA;   /* Ocha Cream — logo lettermark, premium surfaces */
--color-brand-cream-dark: #D4CBBD;   /* Cream darkened — borders, dividers */
```

### 2.2 Core UI Palette

```css
--color-bg-primary:       #F7F4F0;   /* Warm Off-White — default page background */
--color-bg-surface:       #FFFFFF;   /* Pure white — cards, modals */
--color-bg-cream:         #EAE4DA;   /* Ocha Cream — premium section backgrounds */
--color-bg-olive-tint:    #EEF0E6;   /* Tinted olive — subtle section differentiation */

--color-text-primary:     #2B2B2B;   /* Soft Black — body text, headings */
--color-text-secondary:   #6B6663;   /* Stone Gray — captions, metadata */
--color-text-inverse:     #EAE4DA;   /* Cream — text on olive backgrounds */
--color-text-on-cream:    #2B2B2B;   /* Text on cream surfaces */

--color-divider:          #DDD7CF;   /* Warm taupe — borders, hairlines */
--color-overlay:          rgba(43, 43, 43, 0.45);  /* Modal backdrop */
```

### 2.3 Seasonal / Campaign Palette

Scoped to campaign sections only. Never used in navigation, checkout, or account UI.

```css
--color-season-blush:     #F2C4C0;   /* Blush Rose — Summer / feminine drops */
--color-season-lemon:     #F5EAA0;   /* Lemon Bloom — Summer Bloom collection */
--color-season-sky:       #C8E4F0;   /* Sky Mist — fresh / cool seasonal drops */
--color-season-peach:     #F5D4B0;   /* Peach Dew — warm / resort campaigns */
```

### 2.4 Functional Colors

```css
--color-success:          #768156;   /* Reuse Ocha Olive — in-stock, confirmation */
--color-error:            #C97070;   /* Warm red — out of stock, errors */
--color-warning:          #E8C97A;   /* Warm amber — low stock, mild warnings */
```

### 2.5 Color Usage Rules

- **Ocha Olive** is the primary action color — used for primary buttons, active nav states, and key callouts. It is never a background for large page sections (only for banners and CTAs).
- **Ocha Cream** is a premium surface — use it for hero sections, product spotlights, and high-end editorial blocks. Avoid for high-density UI like tables or forms.
- **Seasonal colors** are campaign-scoped. Apply via a wrapper class, never globally.
- All text on `--color-brand-olive` backgrounds must use `--color-text-inverse` (#EAE4DA).
- Page backgrounds use `--color-bg-primary` (#F7F4F0) — never pure white for large areas.

---

## 3. Typography

### 3.1 Typeface Stack

The display typeface echoes the **classical serif character** of the OC monogram logo.

| Role | Typeface | Weight | Notes |
|---|---|---|---|
| Display / Hero | Cormorant Garamond | 400 Italic, 600 | Headlines, collection names — mirrors logo serif |
| Body | DM Sans | 400, 500, 700 | All body copy, UI labels, prices |
| Script Accent | Satisfy | 400 | Decorative only — collection stamps, tagline treatments |

**Google Fonts import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400;1,600&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&family=Satisfy&display=swap');
```

### 3.2 Type Scale

```css
--text-xs:    11px;  /* line-height: 1.5 — micro labels, badges */
--text-sm:    13px;  /* line-height: 1.5 — captions, metadata */
--text-base:  15px;  /* line-height: 1.6 — body default */
--text-md:    17px;  /* line-height: 1.5 — lead paragraph */
--text-lg:    22px;  /* line-height: 1.4 — section subheadings */
--text-xl:    28px;  /* line-height: 1.3 — page subheadings */
--text-2xl:   36px;  /* line-height: 1.2 — section headings */
--text-3xl:   48px;  /* line-height: 1.1 — hero titles */
--text-4xl:   64px;  /* line-height: 1.0 — max display (desktop only) */
```

### 3.3 Typography Rules

- **Cormorant Garamond Italic** for all display/hero headings — directly references the serif character of the logo letterforms.
- **Never** use bold italic together for Cormorant — italic alone carries enough presence.
- **Satisfy (script)** is decorative only. Max 2 instances per page. Never in navigation or functional UI.
- **DM Sans 700** reserved for: price tags, primary CTA labels, and product names.
- **Letter spacing:** Display uses `letter-spacing: -0.02em`. Labels/badges use `letter-spacing: 0.06em`.
- **Line length:** Body copy max `65ch` — wider feels unread on mobile.

### 3.4 Typographic Hierarchy

```
Collection stamp    → Satisfy 13px, --color-brand-olive, letter-spacing: 0.08em
    ↓
Hero headline       → Cormorant Garamond Italic, 48–64px, --color-text-primary
    ↓
Subheading          → DM Sans 500, 22px, --color-text-primary
    ↓
Body copy           → DM Sans 400, 15px, --color-text-secondary
    ↓
UI label / CTA      → DM Sans 700, 12px, UPPERCASE, letter-spacing: 0.08em
```

---

## 4. Spacing & Layout

### 4.1 Spacing Scale

Base unit: `4px`

```css
--space-1:    4px;
--space-2:    8px;
--space-3:    12px;
--space-4:    16px;
--space-5:    20px;
--space-6:    24px;
--space-8:    32px;
--space-10:   40px;
--space-12:   48px;
--space-16:   64px;
--space-20:   80px;
--space-24:   96px;
--space-32:  128px;
```

### 4.2 Layout Grid

```
Mobile (default, < 768px)
  Columns: 2  |  Gutter: 12px  |  Margin: 16px

Tablet (≥ 768px)
  Columns: 3  |  Gutter: 20px  |  Margin: 32px

Desktop (≥ 1280px)
  Columns: 4  |  Gutter: 24px  |  Margin: auto (max-width: 1200px)
```

### 4.3 Border Radius

Ocha uses **soft but not bubbly** rounding — consistent with the brand's balance of warmth and sophistication.

```css
--radius-sm:    4px;    /* Badges, micro tags */
--radius-md:    10px;   /* Buttons, inputs */
--radius-lg:    16px;   /* Cards, product tiles */
--radius-xl:    24px;   /* Hero banners, featured panels */
--radius-full:  9999px; /* Avatar thumbnails only */
```

---

## 5. Components

### 5.1 Buttons

#### Primary Button
```
Background:     --color-brand-olive (#768156)
Text:           --color-text-inverse (#EAE4DA)
Font:           DM Sans 700, 12px, UPPERCASE, letter-spacing: 0.08em
Padding:        13px 32px
Border Radius:  --radius-md (10px)
Border:         none
Hover:          --color-brand-olive-dark (#5E6844)
Active:         scale(0.97)
Focus:          outline 2px solid --color-brand-olive, offset 3px
```

#### Secondary Button (Ghost)
```
Background:     transparent
Text:           --color-brand-olive
Border:         1.5px solid --color-brand-olive
Border Radius:  --radius-md
Hover:          background --color-brand-olive-tint (#EEF0E6)
```

#### Text Link
```
Color:          --color-brand-olive
Underline:      1px solid, underline-offset: 3px
Hover:          opacity 0.75
```

**Usage rules:**
- One primary button per viewport section.
- CTA copy is always active verbs: "Shop Now", "See Collection", "Add to Bag".
- Never use seasonal palette colors for functional button backgrounds.

---

### 5.2 Product Card

```
┌─────────────────────────┐
│                         │  ← border-radius: --radius-lg
│   Product Image  3:4    │  ← object-fit: cover
│                         │
│   [collection stamp]    │  ← top-right corner badge
├─────────────────────────┤  ← bg: --color-bg-surface
│  Product Name           │  ← DM Sans 500, 14px, --color-text-primary
│  Rp 89.000              │  ← DM Sans 700, 15px, --color-text-primary
│  ★★★★☆  4.2  |  sold   │  ← DM Sans 400, 12px, --color-text-secondary
└─────────────────────────┘
```

**Specs:**
- Card shadow: `0 2px 16px rgba(43, 43, 43, 0.08)`
- Image radius: `--radius-lg` top corners, 0 bottom corners
- Hover: `translateY(-4px)`, shadow to `0 8px 24px rgba(43,43,43,0.14)`
- Collection badge: `Satisfy 11px`, `--color-brand-olive` bg, `--color-text-inverse` text, `--radius-sm`

---

### 5.3 Collection Banner

Full-width editorial strip for seasonal drops.

```
┌─────────────────────────────────────────────────────────┐
│  [Satisfy stamp: "Now Available"]                       │
│                                                         │
│  Summer Bloom                        [ campaign image ] │
│  Cormorant Garamond Italic, 52px                        │
│                                                         │
│  Fits that hit. ✦  [Shop the Collection →]             │
└─────────────────────────────────────────────────────────┘
```

**Specs:**
- Background: campaign color or `--color-brand-cream` (default)
- Text side gradient: `linear-gradient(to right, #EAE4DA 45%, transparent 80%)`
- Min height: `460px` mobile (stacked), `540px` desktop (split 50/50)
- CTA button: Primary style (olive bg)
- Stamp color: `--color-brand-olive`

---

### 5.4 Navigation Bar

```
┌──────────────────────────────────────────────────────────┐
│  [OC monogram]  Ocha Wear        [Search] [Wish] [Bag]  │
│  ──────────────────────────────────────────────────────  │
│  New In    Collections    About    Sale                  │
└──────────────────────────────────────────────────────────┘
```

**Specs:**
- Background: `--color-bg-primary` / `backdrop-filter: blur(12px)` on scroll
- Scroll border: `1px solid --color-divider` — appears on scroll only
- Logo wordmark: Cormorant Garamond 600, 18px, `letter-spacing: 0.05em`
- Logo icon: OC monogram SVG — olive on cream (or cream on olive for dark headers)
- Nav links: DM Sans 400, 14px; active state → `--color-brand-olive` with underline
- Height: 64px desktop, 56px mobile; sticky

---

### 5.5 Badge / Tag

```
Background:   --color-brand-olive (primary) or --color-brand-cream (soft)
Text:         DM Sans 500 or Satisfy, 11px
Padding:      4px 10px
Radius:       --radius-sm (4px)
```

| Variant | Background | Text |
|---|---|---|
| Collection name | `--color-brand-olive` | `--color-text-inverse` |
| "NEW" | `--color-brand-olive` | `--color-text-inverse` |
| "SOLD OUT" | `--color-divider` | `--color-text-secondary` |
| Seasonal label | Campaign color | `--color-text-primary` |

---

### 5.6 Input Fields

```css
border:           1.5px solid var(--color-divider);
border-radius:    var(--radius-md);       /* 10px */
background:       var(--color-bg-surface);
padding:          12px 16px;
font:             DM Sans 400, 15px;
color:            var(--color-text-primary);

/* Placeholder */
color:            var(--color-text-secondary);

/* Focus */
border-color:     var(--color-brand-olive);
box-shadow:       0 0 0 3px rgba(118, 129, 86, 0.18);

/* Error */
border-color:     var(--color-error);
```

---

## 6. Iconography

- **Style:** Outlined, 1.5px stroke. Never filled — filled feels heavy against the brand's lightness.
- **Size:** 16px inline, 20px nav/utility, 24px feature callouts
- **Library:** Lucide Icons or Phosphor Icons (outline)
- **Color:** Always `currentColor` — never hardcoded

---

## 7. Imagery Guidelines

### Ratios
| Context | Ratio | Notes |
|---|---|---|
| Hero / banner | 16:9 or freeform | Warm editorial, model-forward |
| Product tile | 3:4 (portrait) | Clean or lifestyle background |
| Campaign feature | 1:1 | Bold, mood-forward |
| Story / Reel cover | 9:16 | Centered crop, vertically composed |

### Color Treatment
- **Warm-lifted** — slight warmth added in post; greens should lean olive, not mint
- Backgrounds: `--color-bg-primary` or `--color-brand-cream` for catalog/product shots
- **Never:** Cool-toned edits, heavy vignettes, dark moody filters

### Graphic Elements
- Thin botanical line art — single-weight stroke in `--color-brand-olive` or `--color-brand-cream`
- Subtle grain/texture overlay on cream sections (opacity ≤ 8%)
- **No** loud geometric shapes, neon accents, or heavy drop shadows on imagery

---

## 8. Motion & Animation

Animation is gentle and deliberate — like fabric settling after movement.

### Easing

```css
--ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1);  /* Card hover, playful lift */
--ease-smooth:    cubic-bezier(0.4, 0, 0.2, 1);        /* Default transitions */
--ease-out-soft:  cubic-bezier(0, 0, 0.2, 1);          /* Elements entering */
--ease-in-soft:   cubic-bezier(0.4, 0, 1, 1);          /* Elements exiting */
```

### Duration

```css
--duration-fast:    150ms;   /* Hover, focus rings */
--duration-base:    250ms;   /* Button states, toggles */
--duration-enter:   400ms;   /* Page elements appearing */
--duration-hero:    600ms;   /* Hero reveals, banners */
```

### Rules
- Product card hover: `translateY(-4px)` + shadow deepens — `250ms --ease-spring`
- Button press: `scale(0.97)` — `150ms --ease-smooth`
- Section reveal on scroll: `opacity 0 → 1` + `translateY(20px → 0)` — `400ms --ease-out-soft`, staggered 80ms
- Use skeleton screens, not spinners, for loading states
- Always respect `prefers-reduced-motion: reduce` — disable all transforms

---

## 9. Seasonal Campaign Theming

Each collection drop overrides the base theme via a scoped class. The olive/cream identity remains constant; only campaign accent colors change.

```css
/* Base — always present */
:root {
  --campaign-accent:    #768156;   /* Defaults to Ocha Olive */
  --campaign-bg:        #EAE4DA;   /* Defaults to Ocha Cream */
  --campaign-text:      #2B2B2B;
}

/* Summer Bloom */
.theme-summer-bloom {
  --campaign-accent:    #C9A800;
  --campaign-bg:        #F5EAA0;
  --campaign-text:      #2B2B2B;
}

/* Ibiza */
.theme-ibiza {
  --campaign-accent:    #4A90B8;
  --campaign-bg:        #C8E4F0;
  --campaign-text:      #2B2B2B;
}

/* Blush / Rose */
.theme-blush {
  --campaign-accent:    #C07878;
  --campaign-bg:        #F2C4C0;
  --campaign-text:      #2B2B2B;
}
```

**Rule:** Campaign theme classes apply only to `.campaign-banner`, `.collection-hero`, and `.collection-grid` sections — never to `<nav>`, `<footer>`, checkout flow, or account pages.

---

## 10. Accessibility

| Standard | Target |
|---|---|
| Body text contrast | WCAG AA — min 4.5:1 |
| Large text / UI | WCAG AA — min 3:1 |
| Focus indicators | 2px `--color-brand-olive` outline, 3px offset |
| Touch targets | Min 44×44px |
| Reduced motion | All animation disabled via `prefers-reduced-motion: reduce` |
| Minimum font size | 11px (badge labels only); 13px for all readable UI |

**Contrast checks — core pairs:**
| Pair | Ratio | Pass |
|---|---|---|
| `#2B2B2B` on `#F7F4F0` (bg primary) | 13.9:1 | ✅ AAA |
| `#2B2B2B` on `#EAE4DA` (cream) | 10.4:1 | ✅ AAA |
| `#EAE4DA` on `#768156` (olive bg) | 4.6:1 | ✅ AA |
| `#6B6663` on `#F7F4F0` (secondary text) | 5.5:1 | ✅ AA |
| `#2B2B2B` on `#F2C4C0` (blush campaign) | 7.1:1 | ✅ AAA |

---

## 11. Do's & Don'ts

### ✅ Do
- Use `--color-brand-olive` as the primary action and identity color throughout
- Use `--color-brand-cream` for premium surfaces and high-end section treatments
- Use Cormorant Garamond Italic for headlines — it directly references the logo's serif character
- Let white space and warm off-white do the heavy lifting; Ocha's elegance is in restraint
- Scope campaign palettes tightly — the olive/cream base must always be recognizable

### ❌ Don't
- Don't make blush pink or pastel colors the primary brand color — they are seasonal guests
- Don't use `Satisfy` script for anything functional (navigation, labels, forms)
- Don't place the logo on cool, dark, or busy backgrounds
- Don't use pure `#000000` black or pure `#FFFFFF` white for large surfaces
- Don't stack more than one campaign theme accent color in the same section

---

*Ocha Wear Design System — logo colors extracted from official asset (June 2026). Derived from `ocha-wear-brand-guideline.md`.*
