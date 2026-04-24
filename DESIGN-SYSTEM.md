# Rally Design System

### The definitive reference for visual tokens, component patterns, and design philosophy

---

## 1. Visual Theme & Atmosphere

Rally's visual identity is built on a single, unmistakable conviction: warmth drives action. The default theme pairs **Rally Orange-Red** (`#ff4615`) against a layered cream-and-bone surface stack, producing an atmosphere that feels simultaneously energetic and intimate. Where most productivity tools default to cold neutrals and blue-shifted grays, Rally leans into the heat of a working team — the urgency of a shared deadline, the spark of a new idea. Every surface is tinted toward amber and ivory; the background is never a clinical white but a soft `#fff7f3`, and the canvas layer underneath it is a blush `#ffe1d2` that grounds the whole experience in organic warmth.

Typography is handled by a single typeface family, **Nunito Sans**, at two weights: Medium 500 for headings, labels, and interactive elements; and Regular 400 for body copy and secondary text. The choice is deliberate — Nunito Sans is slightly rounded at its terminals, which softens what could otherwise be a harsh palette, and its optical range from 300 to 700 gives the system a full expressive range without requiring a second typeface. Monospace output (token values, code labels, hex strings) falls back to the system `ui-monospace` stack, creating a clear visual mode-switch between editorial content and technical reference.

Depth in Rally is achieved without gradients. This is an explicit constraint — the system uses layered flat surfaces (`--canvas` → `--surface` → `--elevated`), low-opacity box shadows with warm undertones, and semantic border tints to communicate hierarchy. Elevation is directional: elements closer to the user have whiter backgrounds and more prominent shadows, while the furthest-back layer is the warmest. This approach ensures every elevation level reads correctly in both light and dark mode without relying on gradient direction, which breaks predictably when themes switch.

The multi-theme engine is a first-class citizen of the system. Six named palettes — Rally, Ocean, Forest, Slate, Rose, Amber — each replace the entire brand token set and base layer simultaneously via CSS variable injection. This means every component, focus ring, selected state, hover tint, and soft background responds to theme switching in a single frame, with no hardcoded hex values surviving in rendered markup. The system was designed so that switching from Rally Orange to Ocean Blue feels like a mode change, not a reskin — each palette has its own emotional register, from energetic fire to deep-sea precision to forest calm.

### Key Characteristics

- **Gradient-free surfaces** — all depth is achieved through surface layering and warm-toned box shadows
- **Single typeface system** — Nunito Sans at weight 500 and 400 covers every typographic role
- **Token-driven theming** — zero hardcoded hex values in components; all interactive colors point to CSS vars
- **Warm-chromatic neutral stack** — gray tones are shifted toward brown-amber, never blue-grey
- **Semantic color architecture** — every color token carries a role (brand, error, info, warning, success, neutral) not just a value
- **Icon-only vertical sidebar** — 72px fixed rail with label beneath each icon; maximum content real estate
- **Rounded geometry** — the radius scale tops at `20px` and `9999px`; sharp corners are reserved for decorative line separators only
- **Role-aware contrast pairs** — every semantic color has a matched `on-light` and `on-dark` text token for accessible text over its soft background
- **Dual-version design language** — V1 Classic (spacious card layout) and V2 Command Center (dense panel layout) share the same token base

---

## 2. Color Palette & Roles

### Primary — Brand

| Token                      | Hex       | Role                                                                                                |
| -------------------------- | --------- | --------------------------------------------------------------------------------------------------- |
| `--rally-brand`            | `#ff4615` | Primary brand color. CTAs, primary buttons, active nav icons, links, brand accents.                 |
| `--rally-brand-hover`      | `#fe3511` | Hover state for brand-colored interactive elements. Slightly deeper than the base.                  |
| `--rally-brand-pressed`    | `#ef1b07` | Active / pressed state. The deepest red-orange in the interactive brand sequence.                   |
| `--rally-brand-on-light`   | `#c60f08` | Brand-tinted text on light soft backgrounds (`--rally-brand-soft-light`). Ensures WCAG AA contrast. |
| `--rally-brand-on-dark`    | `#ff9571` | Brand-tinted text on dark soft backgrounds (`--rally-brand-soft-dark`). A warm peachy coral.        |
| `--rally-brand-soft-light` | `#fff2ed` | Light-mode tinted background for selected rows, AI panels, active badges, and brand-tinted cards.   |
| `--rally-brand-soft-dark`  | `#440608` | Dark-mode equivalent of soft-light. A near-black garnet used for selected states in dark mode.      |

### Secondary & Accent — Interaction States

| Token               | Hex (Light) | Hex (Dark) | Role                                                                                     |
| ------------------- | ----------- | ---------- | ---------------------------------------------------------------------------------------- |
| `--focus-ring`      | `#ff9571`   | `#ff5931`  | Focus ring outline on all interactive elements. Warm coral — unmistakable at a glance.   |
| `--selected-bg`     | `#ffe2d4`   | `#440608`  | Background fill for selected / active list rows and nav items.                           |
| `--selected-border` | `#ff5931`   | `#ff5931`  | Border color for selected items. One shade deeper than the brand base.                   |
| `--selected-text`   | `#c60f08`   | `#ff9571`  | Text/icon color inside a selected element. Uses on-light / on-dark pairs.                |
| `--disabled-bg`     | `#fff2ed`   | `#262322`  | Background of disabled inputs and buttons.                                               |
| `--disabled-border` | `#ff5931`   | `#70635d`  | Border of disabled elements. Light-mode retains brand proximity; dark-mode goes neutral. |
| `--disabled-text`   | `#70635d`   | `#8a807c`  | Text/icon color inside disabled elements. Always muted; never the full brand color.      |

### Surface & Background

| Token        | Light Mode | Dark Mode | Role                                                                                   |
| ------------ | ---------- | --------- | -------------------------------------------------------------------------------------- |
| `--canvas`   | `#ffe1d2`  | `#191919` | The furthest-back layer. Page chrome, sidebar backgrounds, section dividers.           |
| `--surface`  | `#fff7f3`  | `#232323` | Primary page background (`--background` alias). The base reading surface.              |
| `--elevated` | `#ffffff`  | `#2c2c2c` | Raised surfaces: cards, popovers, modals, dropdowns. The lightest layer in light mode. |

### Neutrals & Text

| Token                  | Light Mode | Dark Mode | Role                                                                                     |
| ---------------------- | ---------- | --------- | ---------------------------------------------------------------------------------------- |
| `--text-primary`       | `#231d1a`  | `#fff2ed` | Primary readable text. Near-black with warm undertone in light; cream-white in dark.     |
| `--text-secondary`     | `#5f514b`  | `#c7b8b2` | Secondary / supporting text. Body descriptions, timestamps, metadata.                    |
| `--neutral-solid`      | `#5f514b`  | —         | Neutral icon and label color. Matches text-secondary in light mode.                      |
| `--neutral-soft-light` | `#f4ece8`  | —         | Light muted backgrounds: chip surfaces, input background, skeleton loaders.              |
| `--neutral-soft-dark`  | —          | `#262322` | Dark muted backgrounds.                                                                  |
| `--neutral-on-light`   | `#5f514b`  | —         | Text on neutral-soft-light backgrounds.                                                  |
| `--neutral-on-dark`    | —          | `#c7b8b2` | Text on neutral-soft-dark backgrounds.                                                   |
| `--border-color`       | `#d1aa99`  | `#4a403c` | Default border for cards, inputs, dividers. Warm taupe in light; charcoal-brown in dark. |

### Semantic & Accent

**Error**
| Token | Value | Role |
|---|---|---|
| `--error-solid` | `#d90000` | Destructive action buttons, error icons, form validation borders |
| `--error-hover` | `#b00000` | Hover state on error/destructive elements |
| `--error-pressed` | `#8e0000` | Active/pressed destructive elements |
| `--error-soft-light` | `#fdecec` | Error-tinted card backgrounds, validation message backgrounds |
| `--error-soft-dark` | `#341111` | Dark-mode error soft background |
| `--error-on-light` | `#b00000` | Error text on error-soft-light backgrounds |
| `--error-on-dark` | `#ff8a8a` | Error text on dark surfaces |

**Info**
| Token | Value | Role |
|---|---|---|
| `--info-solid` | `#0f5fd7` | Informational badges, chat message type indicators, link-type icons |
| `--info-soft-light` | `#eef4ff` | Info-tinted chip and badge backgrounds |
| `--info-soft-dark` | `#101d36` | Dark-mode info soft background |
| `--info-on-light` | `#0f5fd7` | Info text on info-soft-light |
| `--info-on-dark` | `#a9cbff` | Info text on dark surfaces |

**Warning**
| Token | Value | Role |
|---|---|---|
| `--warning-solid` | `#8a4f00` | Warning badges, task due-date indicators, caution-state icons |
| `--warning-soft-light` | `#fff4e5` | Warning-tinted badge/chip backgrounds |
| `--warning-soft-dark` | `#33210a` | Dark-mode warning soft background |
| `--warning-on-light` | `#8a4f00` | Warning text on warning-soft-light |
| `--warning-on-dark` | `#ffd08a` | Warning text on dark surfaces |

**Success**
| Token | Value | Role |
|---|---|---|
| `--success-solid` | `#0f6a43` | Confirmation buttons, success state indicators, "Saved" transitions |
| `--success-soft-light` | `#eaf7f0` | Success-tinted card backgrounds, completion banners |
| `--success-soft-dark` | `#10261c` | Dark-mode success soft background |
| `--success-on-light` | `#0f6a43` | Success text on success-soft-light |
| `--success-on-dark` | `#7ad6a7` | Success text on dark surfaces |

**Neutral / Read-only**
| Token | Value | Role |
|---|---|---|
| `--neutral-solid` | `#5f514b` | Read-only state labels, neutral badges, muted icons |
| `--neutral-soft-light` | `#f4ece8` | Neutral chip backgrounds, muted badge fills |
| `--neutral-soft-dark` | `#262322` | Dark-mode neutral soft background |
| `--neutral-on-light` | `#5f514b` | Neutral text on neutral-soft-light |
| `--neutral-on-dark` | `#c7b8b2` | Neutral text on dark surfaces |

### Chart Colors

| Token       | Light     | Dark      | Role                             |
| ----------- | --------- | --------- | -------------------------------- |
| `--chart-1` | `#ff4615` | `#ff9571` | Brand / primary data series      |
| `--chart-2` | `#0f5fd7` | `#a9cbff` | Info / secondary data series     |
| `--chart-3` | `#0f6a43` | `#7ad6a7` | Success / tertiary data series   |
| `--chart-4` | `#8a4f00` | `#ffd08a` | Warning / quaternary data series |
| `--chart-5` | `#d90000` | `#ff8a8a` | Error / quinary data series      |

### Gradient System

**Rally is deliberately gradient-free.** No linear or radial gradients are used on any interactive element, card, button, or background surface. Depth and dimension are achieved exclusively through:

1. **Surface layering** — Canvas → Surface → Elevated creates a three-stop brightness ramp
2. **Warm box shadows** — shadows use `rgba(35,29,26, N)` which is the warm near-black of `--text-primary`, keeping shadows in harmony with the palette
3. **Tinted soft backgrounds** — semantic soft colors (`--rally-brand-soft-light`, `--error-soft-light`, etc.) create visual hierarchy through hue
4. **Border contrast** — `--border-color` at `#d1aa99` (light) is noticeably warm-toned, reinforcing surface boundaries without gradients

Agents and developers should not introduce gradients to any Rally component.

---

## 3. Typography Rules

### Font Family

| Role                    | Family      | Fallbacks                                                   | Token                          |
| ----------------------- | ----------- | ----------------------------------------------------------- | ------------------------------ |
| **UI / Body / Display** | Nunito Sans | `ui-sans-serif`, `system-ui`, `-apple-system`, `sans-serif` | `--font-sans`                  |
| **Code / Mono**         | System Mono | `ui-monospace`, `Menlo`, `'Courier New'`, `monospace`       | `font-mono` (Tailwind utility) |

Nunito Sans is loaded from Google Fonts with weights 300, 400, 500, 600, 700 in both normal and italic axes, using `display=swap` for progressive loading. It is applied globally via `font-family: var(--font-sans) !important` — no element in Rally uses a different sans-serif typeface.

### Hierarchy

| Role               | Font         | Size             | Weight      | Line Height | Letter Spacing    | Notes                                             |
| ------------------ | ------------ | ---------------- | ----------- | ----------- | ----------------- | ------------------------------------------------- |
| Display / Hero     | Nunito Sans  | 36px / 2.25rem   | 500 Medium  | 1.5         | Default           | Marketing headlines, onboarding splash text       |
| H1 Page Heading    | Nunito Sans  | 28px / 1.75rem   | 500 Medium  | 1.5         | Default           | Primary page title, modal headings                |
| H2 Section Heading | Nunito Sans  | 22px / 1.375rem  | 500 Medium  | 1.5         | Default           | Major section dividers within a page              |
| H3 Card Heading    | Nunito Sans  | 18px / 1.125rem  | 500 Medium  | 1.5         | Default           | Card titles, panel headings                       |
| H4 Sub-heading     | Nunito Sans  | 16px / 1rem      | 500 Medium  | 1.5         | Default           | Form field group labels, widget titles            |
| Body               | Nunito Sans  | 16px / 1rem      | 400 Regular | 1.5         | Default           | Primary reading text, paragraph content           |
| Body SM            | Nunito Sans  | 14px / 0.875rem  | 400 Regular | 1.5         | Default           | Secondary descriptions, card body text            |
| Caption            | Nunito Sans  | 12px / 0.75rem   | 400 Regular | 1.5         | Default           | Timestamps, hints, helper text, table values      |
| Label              | Nunito Sans  | 16px / 1rem      | 500 Medium  | 1.5         | Default           | Form labels, input annotations                    |
| Overline           | Nunito Sans  | 11px / 0.6875rem | 500 Medium  | 1.5         | `tracking-widest` | Section category tags, chip labels, tab text      |
| Micro              | Nunito Sans  | 10px / 0.625rem  | 500 Medium  | tight       | Default           | Navigation rail labels, avatar labels, badge dots |
| Button             | Nunito Sans  | 16px / 1rem      | 500 Medium  | 1.5         | Default           | All button labels by default                      |
| Code / Token       | ui-monospace | 13px / 0.8125rem | 400 Regular | 1.5         | Default           | Hex values, CSS tokens, keyboard shortcuts        |

### Principles

**1. One family, full range.** Nunito Sans covers every typographic role from 10px nav labels to 36px hero displays. Introducing a second face creates unnecessary complexity in a product where UI density and consistency are paramount. The rounded terminals of Nunito Sans naturally soften the assertive brand color palette.

**2. Weight over size for hierarchy.** Rally uses a tight size scale with only 7 distinct steps. Hierarchy within the same size is expressed through weight (500 vs 400) and color (`--text-primary` vs `--text-secondary`). This produces a visually quieter but semantically richer interface.

**3. Medium is the default interactive weight.** Every element that invites interaction — buttons, labels, form labels, nav items, headings — uses weight 500. Regular 400 is reserved strictly for passive reading content: paragraphs, descriptions, metadata. This rule makes the "interactive surface area" of any screen immediately legible.

**4. No uppercase text in body content.** Uppercase is reserved exclusively for the Overline / section-label role (11px, `tracking-widest`), where it distinguishes category labels from content. Body text, headings, and buttons are always sentence-case or title-case.

**5. Monospace for technical values only.** The system mono stack appears for CSS token names, hex values, keyboard shortcut badges, and code display. This creates an immediate cognitive mode-switch — anything in mono is a machine value, not editorial content.

**6. Line height is uniform at 1.5.** All type roles in Rally use `line-height: 1.5` (the default). Variation in visual density is achieved through margin and padding, not changed leading. This ensures predictable height calculations across all UI contexts.

**7. Letter spacing is additive, not subtractive.** Only the Overline role uses `tracking-widest` (≈0.1em). All other roles use default tracking. Condensed tracking is never used — Nunito Sans is not designed for tight tracking and becomes less legible at small sizes if compressed.

---

## 4. Component Stylings

### Buttons

**Primary Button**

- Background: `--rally-brand` (`#ff4615`)
- Text: `#ffffff`
- Padding: `10px 16px` (`px-4 py-2.5`)
- Border Radius: `8px` (`--radius`)
- Border: none
- Hover: background → `--rally-brand-hover` (`#fe3511`)
- Pressed: background → `--rally-brand-pressed` (`#ef1b07`)
- Focus: `box-shadow: 0 0 0 3px var(--focus-ring)` (`#ff9571`)
- Disabled: `background: #ffbda4`, `color: #ffffff`, `opacity: 0.65`, `cursor: not-allowed`
- Font: 16px / weight 500
- Usage: Single primary action per section. Save, Send, Create, Confirm.

**Secondary / Outline Button**

- Background: `transparent`
- Text: `--text-primary` (`#231d1a`)
- Border: `1px solid --border-color` (`#d1aa99`)
- Border Radius: `8px`
- Hover: background → `--neutral-soft-light` (`#f4ece8`)
- Disabled: `color: #70635d`, `opacity: 0.65`
- Usage: Secondary actions alongside a primary button. Cancel, Back, Export.

**Ghost Button**

- Background: `transparent`
- Text: `--text-primary`
- Border: none
- Hover: background → `--neutral-soft-light` (`#f4ece8`)
- Brand Ghost variant: background → `--rally-brand-soft-light` (`#fff2ed`), text → `--rally-brand-on-light` (`#c60f08`)
- Usage: Tertiary actions, icon-only toolbar buttons, inline contextual actions.

**Destructive Button**

- Background: `--error-solid` (`#d90000`)
- Text: `#ffffff`
- Hover: background → `--error-hover` (`#b00000`)
- Disabled: background → `--error-soft-light`, text → `--error-on-light`
- Usage: Delete, Remove, Revoke access. Always paired with a confirmation step.

**Icon Button**

- Size: `28px × 28px` to `36px × 36px` depending on context
- Border Radius: `7px` to `9px`
- Background: `transparent` at rest
- Hover: background → `var(--muted)` (`--neutral-soft-light`)
- Active / selected: background → `--rally-brand-soft-light`, color → `--rally-brand`
- Usage: Toolbar actions, panel toggles, header right-side controls.

**Confirm-after-save Button (animated state)**

- Default state: `--rally-brand` background
- After save: transitions to `--success-solid` (`#0f6a43`) for approximately 2 seconds, then resets
- Usage: Save Changes, Send Invite — any action with async confirmation feedback.

---

### Cards & Containers

**Base Card**

- Background: `--elevated` / `var(--card)` → `#ffffff` light / `#2c2c2c` dark
- Border: `1px solid --border-color`
- Border Radius: `12px` (`--radius-lg`) — most common card radius
- Shadow: `--shadow` (`0 2px 8px 0 rgba(35,29,26,0.10)`)
- Padding: `16px` (`p-4`)
- Usage: Dashboard widgets, chat preview cards, task cards, file cards.

**Panel / Section Container**

- Background: `--surface` / `var(--background)`
- Border: `1px solid --border-color`
- Border Radius: `14px` (`rounded-[14px]`) — used for larger panels, drawers
- Padding: `16px–24px`
- Usage: Detail panels, side panels, settings sections.

**Brand-tinted Card**

- Background: `--rally-brand-soft-light` (`#fff2ed`)
- Border: `1px solid --selected-border` (`#ff5931`)
- Text: `--rally-brand-on-light` (`#c60f08`)
- Usage: AI assist panels, onboarding highlights, featured content.

**Semantic Cards (Error, Success, Warning, Info)**
Each follows the same structure:

- Background: `--{semantic}-soft-light`
- Border: `1px solid --{semantic}-solid`
- Text: `--{semantic}-on-light`
- Border Radius: `12px`

---

### Inputs & Forms

**Text Input — Default**

- Background: `var(--card)` / `var(--background)` (context-dependent)
- Border: `1px solid --border-color` (`#d1aa99`)
- Border Radius: `8px` (`--radius`)
- Padding: `10px 12px` (`px-3 py-2.5`)
- Text: `--text-primary`
- Placeholder: `--muted-foreground` (`--neutral-on-light`)
- Font size: 13px–16px depending on context

**Text Input — Focused**

- Border color: `var(--rally-brand)` (`#ff4615`)
- Box shadow: `0 0 0 2px rgba(255, 149, 113, 0.33)` — soft peach ring
- Transition: `border-color 150ms ease`

**Text Input — Error**

- Border color: `--error-solid` (`#d90000`)
- Box shadow: `0 0 0 2px --error-soft-light`

**Text Input — Disabled**

- `opacity: 0.65`
- `cursor: not-allowed`
- Border: `1px solid --border-color`
- Color: `--disabled-text`

**Select / Textarea**

- Identical border, radius, and padding as text input
- `focus:border-[var(--rally-brand)]` class convention
- Textarea includes `resize-none` by default to maintain layout predictability

**Form Label**

- Size: 11px
- Weight: 500
- Color: `--muted-foreground`
- Font family: monospace (when labeling a technical field like a token); sans-serif otherwise
- Margin bottom: `6px` (`mb-1.5`)

**Search / Composer Input Wrapper**

- Wraps an input in a container with `border + focus-within:border-[var(--rally-brand)]`
- Container border transitions instead of the inner input — produces a more intentional focus region
- Border Radius: `12px`–`14px` (slightly larger than field inputs)

---

### Navigation

**Primary Sidebar**

- Width: `72px` fixed
- Background: `--sidebar` → `--elevated`
- Border Right: `1px solid --sidebar-border`
- Layout: flex column; logo at top, nav items in flex-1 scroll zone, theme toggle + profile at bottom
- Nav items: icon + 9px label stacked vertically, full-width, `rounded-xl` (12px)

**Nav Item — Default**

- Color: `--foreground` / `--text-primary`
- Background: `transparent`
- Hover: `bg-muted` (`--neutral-soft-light`)
- Padding: `py-2.5 px-1`

**Nav Item — Active**

- Background: `--selected-bg`
- Text / Icon color: `--selected-text`
- No border — the background fill is sufficient distinction

**Version Badge (logo area)**

- 14px circle, bottom-right of the logo button
- Background: `--rally-brand`
- Text: `#ffffff`
- Shows "1" or "2" for the active version

**Secondary Sidebar (contextual)**

- Appears adjacent to the primary rail for AI Chat, Chat, and Files V2
- Background: `--surface`
- Border Right: `1px solid --border-color`
- Width: context-dependent (224px–260px)

---

### Image Treatment

- **Border Radius**: Images in cards use `rounded-[8px]`–`rounded-[12px]`; full-panel hero images use `rounded-[16px]`
- **Aspect Ratios**: Thumbnails 16:9 or 4:3; avatar images 1:1 (always `rounded-full`)
- **Avatar sizes**: 24px, 32px, 40px, 48px, 64px — always `rounded-full`
- **Screenshot style**: Applied inside card containers with a `border border-border` ring, no additional shadow
- **AI-generated indicators**: Sparkles icon (`size-3.5`) in `--rally-brand` color inline before text labels

---

### Distinctive Components

**Badge / Status Chip**

- Height: `~20px`
- Padding: `px-2 py-0.5`
- Border Radius: `9999px` (`rounded-full`)
- Font: 11px, weight 500
- Variants: Primary (`#fff2ed` / `#c60f08`), Success (`#eaf7f0` / `#0f6a43`), Warning (`#fff4e5` / `#8a4f00`), Error (`#fdecec` / `#b00000`), Info (`#eef4ff` / `#0f5fd7`), Neutral (`#f4ece8` / `#5f514b`), Solid brand (`#ff4615` / `#fff`)

**Role Badge (RBAC)**

- Owner: `color: --rally-brand`, `bg: --rally-brand-soft-light`, Crown icon
- Admin: `color: --info-on-light`, `bg: --info-soft-light`, Shield icon
- Member: `color: --neutral-on-light`, `bg: --neutral-soft-light`, User icon
- Viewer: `color: --neutral-on-light`, `bg: --neutral-soft-light`, Eye icon

**Tab Bar (sub-navigation)**

- Active tab: `bg-[var(--rally-brand-soft-light)]`, `text-[var(--rally-brand)]`, weight 500
- Inactive tab: `text-muted-foreground`
- Hover: `bg-muted`
- Border Radius: `7px`
- Padding: `px-3 py-1.5`
- Font: 12px

**Action Chip (AI suggestions, quick filters)**

- Border: `1px solid --border-color`
- Background: `--card`
- Hover: `border-[var(--rally-brand)]`, `bg-[var(--rally-brand-soft-light)]`
- Border Radius: `9999px` (full)
- Font: 11px, weight 400–500

**AI Assist Panel**

- Border: `1px solid --rally-brand-soft-light`
- Background: `--rally-brand-soft-light`
- Border Radius: `10px` (`--radius-md`)
- Header icon: `<Sparkles>` in `--rally-brand`
- Font: 11px label weight 500 in `--rally-brand`

**Modal / Drawer**

- Background: `--elevated`
- Border: `1px solid --border-color`
- Border Radius: `16px` (`--radius-xl`)
- Shadow: `--shadow-lg` (`0 8px 32px 0 rgba(35,29,26,0.16)`)
- Backdrop: `bg-black/40` with `backdrop-blur` where appropriate

**Tooltip**

- Background: `--canvas` (darkest layer in light mode, most visible contrast)
- Border: `1px solid --border-color`
- Border Radius: `8px`
- Font: 11px–12px, Regular 400
- Shadow: `--shadow-sm`

**Version Switcher Popover**

- Width: `220px`
- Background: `--card` / `--elevated`
- Border Radius: `14px`
- Shadow: `0 8px 32px rgba(0,0,0,0.12)`
- Active item: `bg: --rally-brand-soft-light`, `border: 1px solid --rally-brand`

---

## 5. Layout Principles

### Spacing System

Base unit: **4px**

| Token      | px   | rem     | Use                                                           |
| ---------- | ---- | ------- | ------------------------------------------------------------- |
| `space-1`  | 4px  | 0.25rem | Micro gaps — icon-to-label, badge padding                     |
| `space-2`  | 8px  | 0.5rem  | Tight gaps — list item inner padding, chip padding            |
| `space-3`  | 12px | 0.75rem | Standard inline gaps — button icon + label, input icon offset |
| `space-4`  | 16px | 1rem    | Card padding, section inner padding, form field spacing       |
| `space-5`  | 20px | 1.25rem | Relaxed card padding, modal padding                           |
| `space-6`  | 24px | 1.5rem  | Section-level spacing, between form groups                    |
| `space-8`  | 32px | 2rem    | Between sections on a page                                    |
| `space-10` | 40px | 2.5rem  | Major page region gaps                                        |
| `space-12` | 48px | 3rem    | Hero vertical padding                                         |
| `space-16` | 64px | 4rem    | Landing page section rhythm                                   |

### Grid & Container

- **Primary sidebar**: `72px` fixed width, full-height, non-scrolling
- **Secondary sidebar**: `224px`–`260px` contextual, adjacent to primary
- **Content area**: remaining viewport width after sidebar(s)
- **Max content width**: `1280px` on landing/marketing pages; full-width on app pages (no max-width constraint inside the app shell)
- **App grid pattern**: Sidebar rail + optional secondary panel + main content = three-column variable layout
- **Dashboard grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for feature cards; `grid-cols-2 lg:grid-cols-4` for metric tiles
- **Landing page sections**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Hero layout**: Centered single-column, max-width `640px`–`768px` for copy; full-width for background treatments

### Whitespace Philosophy

**Breathing Density.** Rally is a high-density tool — multiple panels, lists, and data streams coexist on screen. Spacing is generous enough to prevent cognitive overload but tight enough to keep related content visually clustered. The 4px base unit produces a spacing vocabulary that resolves to clear clusters: inner-element (4–8px), within-component (12–16px), between-components (24–32px), between-sections (40–64px).

**Surface as Separator.** In Rally, whitespace between sections is often replaced by surface-layer transitions. Moving from `--canvas` to `--surface` to `--elevated` communicates hierarchy without requiring explicit margin. This is especially visible in the sidebar and the multi-panel layouts of V2, where surface changes do the work that gutters would do in a traditional grid.

**Vertical Rhythm First.** All components are designed to stack cleanly in vertical lists. Padding is symmetrical; line heights are consistent at 1.5. This means any list of cards, any column of form fields, any stack of navigation items will naturally read at a steady rhythm without requiring per-component margin overrides.

### Border Radius Scale

| Label | Token           | Value  | Usage                                                  |
| ----- | --------------- | ------ | ------------------------------------------------------ |
| XS    | `--radius-xs`   | 2px    | Tag underlines, thin decorative separators             |
| SM    | `--radius-sm`   | 4px    | Inline chips, small checkboxes, tiny icon containers   |
| Base  | `--radius`      | 8px    | Input fields, standard buttons, dropdowns, small cards |
| MD    | `--radius-md`   | 10px   | List-item row selection, panel sections, task rows     |
| LG    | `--radius-lg`   | 12px   | Primary cards, popovers, notification containers       |
| XL    | `--radius-xl`   | 16px   | Large panels, drawers, modals, dashboard widgets       |
| 2XL   | `--radius-2xl`  | 20px   | Logo mark container, full-size feature cards           |
| Full  | `--radius-full` | 9999px | Badges, chips, avatars, toggle switches, pill buttons  |

---

## 6. Depth & Elevation

| Level   | Token         | CSS Value                           | Use Cases                                      |
| ------- | ------------- | ----------------------------------- | ---------------------------------------------- |
| Flat    | —             | none                                | Sidebar nav items, body text areas, table rows |
| Whisper | `--shadow-sm` | `0 1px 2px 0 rgba(35,29,26,0.06)`   | Tooltips, inline chips, micro overlays         |
| Card    | `--shadow`    | `0 2px 8px 0 rgba(35,29,26,0.10)`   | Standard cards, dropdowns, date pickers        |
| Raised  | `--shadow-md` | `0 4px 16px 0 rgba(35,29,26,0.13)`  | Modals, popovers, context menus                |
| Dialog  | `--shadow-lg` | `0 8px 32px 0 rgba(35,29,26,0.16)`  | Full-size dialogs, drawers, command palette    |
| Overlay | `--shadow-xl` | `0 16px 48px 0 rgba(35,29,26,0.20)` | Page-blocking overlays, splash screens         |

### Shadow Philosophy

All Rally shadows use the same chromatic shadow color — `rgba(35,29,26, N)` — where `35,29,26` is the RGB decomposition of `--text-primary` (`#231d1a`). This is intentional: warm shadows (with reddish-brown undertones) feel organic and grounded, while cold blue-grey shadows would fight the amber palette. The opacity steps from 0.06 to 0.20 are chosen to work across both light and dark mode without inversion — the dark mode surface colors are already much darker than their light-mode equivalents, so shadow visibility self-regulates.

The shadow system deliberately avoids colored or tinted drop shadows (e.g., `rgba(255,70,21,0.2)`). Brand-colored shadows on buttons or cards are an anti-pattern in Rally — they compete with the focus ring and the semantic soft backgrounds.

### Decorative Depth

Rather than gradients or color washes, Rally uses these non-shadow depth techniques:

- **Surface stacking**: `--canvas` → `--surface` → `--elevated` creates a three-stop ramp. Elements on `--elevated` (`#ffffff`) appear to float above `--surface` (`#fff7f3`) by virtue of the subtle warmth contrast alone.
- **Border articulation**: `--border-color` at `#d1aa99` (light) is warm enough to create clear surface boundaries without shadows. Combined with `bg-card` fills, cards are visually separate without any shadow required.
- **Focus ring as depth signal**: The `--focus-ring` (`#ff9571`) outer glow on focused inputs creates a visual "lift" effect on the active element without using elevation shadows.
- **Active/selected tinting**: Selected rows and items shift their background from transparent → `--selected-bg` (`#ffe2d4`). This subtle warm tint is perceived as the row "coming forward" — a depth effect achieved purely through hue.
- **Section alternation**: In lists with alternating density, `bg-muted/30` (`--neutral-soft-light` at 30%) is used to create zebra-like banding without border lines.

---

## 7. Do's and Don'ts

### Do

1. **Use `var(--rally-brand)` for all interactive brand accents.** Never hardcode `#ff4615`. The token respects the active theme; the hex does not.
2. **Pair every branded soft background with its `on-light` text token.** When using `--rally-brand-soft-light` as a card or chip background, always use `--rally-brand-on-light` (`#c60f08`) as the text color — not the full brand orange.
3. **Use `focus:border-[var(--rally-brand)]` on all inputs.** This is the system-wide focus convention. Combined with `transition-colors`, it produces the expected focus feedback.
4. **Apply `rounded-[8px]` to all standard inputs and buttons.** This is `--radius`, the base radius. Only special cases (chips, avatars, modals) deviate.
5. **Use the three-stop surface hierarchy for panel backgrounds.** App shell: `--canvas`. Page background: `--surface`. Cards and overlays: `--elevated`.
6. **Always use `--success-solid` for confirmed save states.** The save button transitions from `--rally-brand` to `#0f6a43` on success — don't use green for anything else.
7. **Prefer `hover:bg-[var(--rally-brand-soft-light)]` over custom hover tints.** This is the established hover treatment for interactive chips, dashed-border buttons, and action rows.
8. **Use the semantic `on-light` / `on-dark` tokens for text inside tinted backgrounds.** They are accessibility-calculated; inventing ad-hoc text colors on soft backgrounds will fail contrast requirements.
9. **Keep button labels in the 12px–16px range at weight 500.** Smaller button text uses the Overline scale (11px). Nothing in a button should be `text-xs` (10px) or smaller.
10. **Use `--shadow-md` for modals and `--shadow-lg` for dialogs.** Escalating shadow levels communicate modal importance; don't flatten all overlays to `--shadow`.

### Don't

1. **Don't use gradients.** No `linear-gradient`, `radial-gradient`, or CSS gradient of any kind on any Rally component, background, or button.
2. **Don't hardcode hex values for interactive colors.** `#ff4615` in a className or inline style will not respond to theme switching. Always use the CSS variable token.
3. **Don't use blue-grey neutral tones.** Rally's neutral stack is warm-brown (`#5f514b`, `#c7b8b2`). Adding Tailwind's default `slate` or `zinc` grays introduces a cool-chromatic conflict with the palette.
4. **Don't change border-radius on standard buttons or inputs.** The `8px` base radius is the system convention. Rounding buttons to `full` turns them into pills, which is a distinct stylistic category reserved for chips and status badges.
5. **Don't use `text-white` directly on soft brand backgrounds.** White text on `#fff2ed` has extremely poor contrast. Always use `--rally-brand-on-light` (`#c60f08`) for brand-tinted surfaces.
6. **Don't vary the font family.** `Nunito Sans` is the only sans-serif in the system. Substituting `Inter`, `Geist`, or other popular dev choices — even as a fallback — creates visual inconsistency.
7. **Don't use `font-bold` (700) for UI headings.** Rally headings use `font-medium` (500). Bold weight is available in the scale but should be reserved for the most extreme emphasis, not routine headings.
8. **Don't use box-shadow as the only focus indicator.** Always combine focus border change (`focus:border-[var(--rally-brand)]`) with the ring shadow — both signals together ensure accessibility in high-contrast mode.
9. **Don't place more than one primary button per section.** Each panel, card, or section should have at most one `--rally-brand`-filled primary button. Multiple competing primaries are an anti-pattern.
10. **Don't apply `--error-solid` for non-destructive warnings.** Use `--warning-solid` (`#8a4f00`) for caution states. The red error color signals irreversible or dangerous actions only.

---

## 8. Responsive Behavior

### Breakpoints

| Name  | Width    | Key Changes                                                                                                        |
| ----- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `xs`  | < 640px  | Single column layout; sidebar collapses to a slide-over drawer triggered by hamburger menu; cards stack full-width |
| `sm`  | ≥ 640px  | Two-column grids unlock; sidebar drawer remains; modal max-width relaxes                                           |
| `md`  | ≥ 768px  | Three-column dashboard grids; sidebar becomes persistent (no longer a drawer on some layouts)                      |
| `lg`  | ≥ 1024px | Full sidebar + secondary sidebar combo unlocks; three+ column panel layouts; dense data tables                     |
| `xl`  | ≥ 1280px | Content max-width cap applies on marketing pages; additional right-side detail panels appear                       |
| `2xl` | ≥ 1536px | Extra whitespace padding on landing sections; wider grid max-width                                                 |

### Touch Targets

- **Minimum tap target**: 44px × 44px on all interactive elements
- **Navigation rail items**: `w-full` × `min-h-[44px]` (achieved via `py-2.5` on a 24px icon + 9px label = ~44px total)
- **Icon buttons**: Minimum `w-8 h-8` (32px); touch hitbox extended via `p-1` padding when at `size-5` icon
- **Input fields**: `py-2.5` ensures minimum 44px height at 16px font-size
- **Chips and badges**: Interactive chips have `px-3 py-1` minimum; larger touch padding applied on mobile via responsive classes

### Collapsing Strategy

**Navigation**: On mobile (`< 768px`), the 72px vertical sidebar collapses to a top-anchored hamburger button that opens a full-width slide-over drawer with the same icon + label nav items, now stacked horizontally with larger tap targets.

**Hero (landing)**: Single-column below `md`; split two-column above `lg`. Copy width is unconstrained below `sm`, capped at `max-w-xl` above `md`.

**Dashboard grids**: `grid-cols-1` → `grid-cols-2` → `grid-cols-3` at `sm`, `md`, `lg` respectively. Metric tiles `grid-cols-2` → `grid-cols-4`.

**Typography scale**: Display (36px) reduces to H1 (28px) on screens narrower than 640px. All other scale steps remain constant — the minimum reading size of 11px (Overline/nav labels) is not reduced further on mobile.

**Spacing**: Section padding (`px-4 sm:px-6 lg:px-8`) increases with viewport. Card inner padding stays at `p-4` across all breakpoints.

**Secondary sidebars**: Hidden entirely below `lg`; their content becomes accessible via a slide-over or a tab-bar toggle at smaller breakpoints.

### Image Behavior

- **Avatars**: Fixed pixel sizes (`24px`, `32px`, `40px`, `48px`, `64px`); never scale with viewport
- **Card thumbnails**: `w-full h-auto` within their grid cell; aspect ratio preserved via `aspect-video` or `aspect-square`
- **Hero / feature images**: `w-full max-w-full`; scale fluidly within container width
- **Logo mark**: Fixed pixel size in nav (`26px`); scales up on marketing pages (`40px`–`64px`)
- **File preview thumbnails**: Fixed at the card's grid column width; object-fit `cover` to fill predictably

---

## 9. Agent Prompt Guide

### Quick Color Reference

- **Brand CTA / Primary Button**: `--rally-brand` (`#ff4615`)
- **Brand Hover**: `--rally-brand-hover` (`#fe3511`)
- **Brand Soft Background (light)**: `--rally-brand-soft-light` (`#fff2ed`)
- **Brand Text on Soft (light)**: `--rally-brand-on-light` (`#c60f08`)
- **Page Background**: `--surface` (`#fff7f3` light / `#232323` dark)
- **Card Background**: `--elevated` (`#ffffff` light / `#2c2c2c` dark)
- **Default Border**: `--border-color` (`#d1aa99` light / `#4a403c` dark)
- **Primary Text**: `--text-primary` (`#231d1a` light / `#fff2ed` dark)
- **Secondary Text**: `--text-secondary` (`#5f514b` light / `#c7b8b2` dark)
- **Focus Ring**: `--focus-ring` (`#ff9571`)
- **Success / Saved**: `--success-solid` (`#0f6a43`)
- **Error / Destructive**: `--error-solid` (`#d90000`)

### Example Component Prompts

**Primary Button:**

> "Create a primary button with background `#ff4615` (`--rally-brand`), white text, `px-4 py-2.5` padding, `rounded-[8px]` radius, hover background `#fe3511`, and `box-shadow: 0 0 0 3px #ff9571` on focus. No gradient."

**Card Component:**

> "Build a card with `background: #ffffff` (light), `border: 1px solid #d1aa99`, `border-radius: 12px`, `box-shadow: 0 2px 8px 0 rgba(35,29,26,0.10)`, and `padding: 16px`. Heading in Nunito Sans 500, body in Nunito Sans 400."

**Active Nav Item:**

> "The active navigation item should have `background: #ffe2d4` (`--selected-bg`), text/icon color `#c60f08` (`--selected-text`), `border-radius: 12px` (rounded-xl), full-width, stacked icon + 9px label. No left border accent."

**Input with Focus State:**

> "Text input with `border: 1px solid #d1aa99`, `border-radius: 8px`, `padding: 10px 12px`. On focus: `border-color: #ff4615`, `box-shadow: 0 0 0 2px rgba(255,149,113,0.33)`. Font: Nunito Sans 400, 14px. No gradient, no inner shadow."

**AI Assist Panel:**

> "Build a panel with `background: #fff2ed`, `border: 1px solid #fff2ed`, `border-radius: 10px`, header row with a `<Sparkles>` icon colored `#ff4615` and label text `#ff4615` at 11px weight 500 reading 'AI Assist'. Action chips inside use `border: 1px solid #d1aa99`, `border-radius: 9999px`, hover `border-color: #ff4615` and `background: #fff2ed`."

### Iteration Guide

1. **Reference tokens, not hex values, in your prompts.** Ask for "brand soft light background" not "#fff2ed" — the hex is a snapshot of the default theme; the intent is the token. This way your prompt is correct across all 6 themes.

2. **Specify the radius explicitly.** Rally has 8 named steps. "Rounded" is ambiguous — say `rounded-[8px]` for inputs/buttons, `rounded-[12px]` for cards, `rounded-full` for chips.

3. **State "no gradient" if generating buttons or backgrounds.** Models trained on broad UI patterns will default to subtle gradients on buttons. Rally is explicitly gradient-free.

4. **Include both light and dark mode token values** when asking for a component if you want it theme-aware. Provide the light hex and state "dark mode uses `[dark hex]` via CSS var override."

5. **Use "weight 500" not "bold" for headings.** Bold (`700`) is in the font scale but is not used for headings. "Medium" or "weight 500" is the correct instruction.

6. **When describing hover / focus / selected states, provide all three.** Rally components always have fully defined state progressions. A prompt that specifies only the default state will produce a component missing its interaction feedback.

7. **Prefer `style={{ background: "var(--rally-brand)" }}` over `className="bg-[#ff4615]"`.** CSS variable references in inline styles respond to theme switching; arbitrary Tailwind color classes with hardcoded hex do not.