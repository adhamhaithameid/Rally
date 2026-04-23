# Rally Design System

**Version:** 1.0  
**Project:** Rally Workspace  
**Last updated:** 2026-04-16

---

## Overview

Rally uses a flat, warm-toned design system built around an orange-red brand color (`#ff4615`).  
All tokens live in `/src/styles/theme.css` and are consumed via CSS custom properties.  
**No hardcoded color values** should appear in component files — always reference a token.

---

## Color System

### Brand / Primary

| Token | Value | Usage |
|---|---|---|
| `--rally-brand` | `#ff4615` | Primary buttons, links, active icons |
| `--rally-brand-hover` | `#fe3511` | Hover state of primary elements |
| `--rally-brand-pressed` | `#ef1b07` | Pressed / active state |
| `--rally-brand-on-light` | `#c60f08` | Brand text/icon on light surfaces |
| `--rally-brand-on-dark` | `#ff9571` | Brand text/icon on dark surfaces |
| `--rally-brand-soft-light` | `#fff2ed` | Tinted background (light mode) |
| `--rally-brand-soft-dark` | `#440608` | Tinted background (dark mode) |

### Base Layer — Light Mode

| Token | Value | Usage |
|---|---|---|
| `--canvas` | `#ffe1d2` | Outermost page background |
| `--surface` | `#fff7f3` | Default surface (mapped to `--background`) |
| `--elevated` | `#ffffff` | Cards, modals (mapped to `--card`) |
| `--border-color` | `#d1aa99` | All borders (mapped to `--border`) |
| `--text-primary` | `#231d1a` | Primary text (mapped to `--foreground`) |
| `--text-secondary` | `#5f514b` | Muted text (mapped to `--muted-foreground`) |

### Base Layer — Dark Mode

| Token | Value | Usage |
|---|---|---|
| `--canvas` | `#191919` | Outermost dark background |
| `--surface` | `#232323` | Default dark surface |
| `--elevated` | `#2c2c2c` | Dark cards, modals |
| `--border-color` | `#4a403c` | Dark borders |
| `--text-primary` | `#fff2ed` | Primary dark-mode text |
| `--text-secondary` | `#c7b8b2` | Muted dark-mode text |

### Semantic Colors

Each semantic color has 5 variants: `solid`, `soft-light`, `soft-dark`, `on-light`, `on-dark`.

| Semantic | Solid | Soft Light | Soft Dark |
|---|---|---|---|
| **Error** | `#d90000` | `#fdecec` | `#341111` |
| **Info** | `#0f5fd7` | `#eef4ff` | `#101d36` |
| **Warning** | `#8a4f00` | `#fff4e5` | `#33210a` |
| **Success** | `#0f6a43` | `#eaf7f0` | `#10261c` |
| **Neutral** | `#5f514b` | `#f4ece8` | `#262322` |

### Interaction States

| State | Token | Light | Dark |
|---|---|---|---|
| Disabled BG | `--disabled-bg` | `#fff2ed` | `#262322` |
| Disabled Border | `--disabled-border` | `#ff5931` | `#70635d` |
| Disabled Text | `--disabled-text` | `#70635d` | `#8a807c` |
| Focus Ring | `--focus-ring` | `#ff9571` | `#ff9571` |
| Selected BG | `--selected-bg` | `#ffe2d4` | `#440608` |
| Selected Border | `--selected-border` | `#ff5931` | `#ff5931` |
| Selected Text | `--selected-text` | `#c60f08` | `#ff9571` |

---

## Typography

| Name | Size | Weight | Usage |
|---|---|---|---|
| Display | 36px | Medium 500 | Hero headings |
| H1 | 28px | Medium 500 | Page titles |
| H2 | 22px | Medium 500 | Section headings |
| H3 | 18px | Medium 500 | Card headings |
| H4 | 16px | Medium 500 | Sub-headings, labels |
| Body | 16px | Normal 400 | Paragraph text |
| Body SM | 14px | Normal 400 | Secondary info |
| Caption | 12px | Normal 400 | Hints, footnotes |
| Overline | 11px | Medium 500 | Section category labels (UPPERCASE) |

**Font stack:** `ui-sans-serif, system-ui, -apple-system, sans-serif`  
**Mono stack:** `ui-monospace, Menlo, monospace`  
**Weights in use:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

---

## Spacing

Follows a 4px base grid.

| Token | px | rem |
|---|---|---|
| space-1 | 4px | 0.25rem |
| space-2 | 8px | 0.5rem |
| space-3 | 12px | 0.75rem |
| space-4 | 16px | 1rem |
| space-5 | 20px | 1.25rem |
| space-6 | 24px | 1.5rem |
| space-8 | 32px | 2rem |
| space-10 | 40px | 2.5rem |
| space-12 | 48px | 3rem |
| space-16 | 64px | 4rem |

---

## Border Radius

| Token | Value | Tailwind | Usage |
|---|---|---|---|
| `--radius-xs` | 2px | `rounded-[2px]` | Chips, tiny tags |
| `--radius-sm` | 4px | `rounded-[4px]` | Badges, small elements |
| `--radius` | 8px | `rounded-[8px]` | Buttons, inputs |
| `--radius-md` | 10px | `rounded-[10px]` | Cards, panels |
| `--radius-lg` | 12px | `rounded-[12px]` | Modals |
| `--radius-xl` | 16px | `rounded-[16px]` | Large cards |
| `--radius-2xl` | 20px | `rounded-[20px]` | Logo marks |
| `--radius-full` | 9999px | `rounded-full` | Avatars, pills |

---

## Shadows / Elevation

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(35,29,26,.06)` | Tooltips, chips |
| `--shadow` | `0 2px 8px rgba(35,29,26,.10)` | Cards, dropdowns |
| `--shadow-md` | `0 4px 16px rgba(35,29,26,.13)` | Modals, popovers |
| `--shadow-lg` | `0 8px 32px rgba(35,29,26,.16)` | Dialogs, drawers |
| `--shadow-xl` | `0 16px 48px rgba(35,29,26,.20)` | Full-page overlays |

---

## Logo

The Rally logomark is the `R` glyph stored in `/src/imports/svg-gyowvurp60.ts`.

| Variant | Background | Icon color |
|---|---|---|
| Dark | `#191919` | `#ff4615` |
| Light | `#ffe1d2` | `#ff4615` |

**Import usage:**
```tsx
import svgPaths from "../../imports/svg-gyowvurp60";

<svg viewBox="27 26 133 127" fill="none">
  <path d={svgPaths.p6b466c0} fill="#ff4615" />
</svg>
```

---

## Design Rules

1. **No gradients.** Use flat colors only.
2. **No hardcoded hex values** in component files — always use CSS tokens.
3. **All text must meet WCAG AA contrast** against its background.
4. **Semantic colors for state communication** — use `--error-*`, `--success-*`, etc., not arbitrary reds/greens.
5. **Disabled elements** use `--disabled-*` tokens, not `opacity: 0.5` alone.
6. **Focus states** always use `--focus-ring` (`#ff9571`) as the outline/ring color.
7. **Dark mode** is always fully supported — every token has a `.dark` override.
8. **Spacing** follows the 4px grid — use `space-*` tokens, not arbitrary pixel values.

---

## File Locations

| File | Purpose |
|---|---|
| `/src/styles/theme.css` | All CSS custom property tokens |
| `/src/app/pages/DesignSystem.tsx` | Live design system page (`/app/design-system`) |
| `/src/imports/svg-gyowvurp60.ts` | Rally logomark SVG path data |
| `/src/imports/Frame2.tsx` | Logo composition component |
| `/docs/design-system.md` | This documentation file |
