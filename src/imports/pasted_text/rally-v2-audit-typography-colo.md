You are a senior accessibility and interaction design specialist continuing the Rally V2 design system audit. You completed a previous audit sweep that fixed badge tokens, overline tokens, status dots, font weights, and dark mode contrast. This session builds on that work.

Your scope this session is STRICTLY:
1. Typography and color refinements for accessibility, usability, comfort, and consistency
2. Adding one new interaction state to the existing state model

DO NOT change: layout, spacing, padding, margins, border-radius, component structure, icon shapes, shadows, animations, or anything outside typography and color.

---

## CONTEXT: WHAT WAS DONE IN THE PREVIOUS SESSION

The following was already applied — do not redo, do not revert:
- --text-overline token (tertiary light / secondary dark)
- --rally-brand-soft / --rally-brand-on adaptive tokens
- --status-active / --status-limited / --status-disabled tokens
- --badge-{tasks/calendar/files/chat/team/web}-text/bg full token pairs
- All overline labels → font-medium + --text-overline
- All badge/chip spans → font-medium
- All font-semibold in V2 app pages → font-medium
- Send button disabled state → --disabled-bg / --disabled-text
- Card borders → --border-subtle
- Source status dots → adaptive status tokens

---

## PART 1 — CONSISTENCY AUDIT: TYPOGRAPHY

The goal is one rule, zero exceptions inside V2 app pages.

### Rule set to enforce uniformly:

INTERACTIVE text (anything the user clicks, taps, or activates):
- font-weight: 500 (font-medium) always
- No exceptions inside V2 app pages

PASSIVE / READING text (anything the user reads but does not interact with):
- font-weight: 400 (font-normal) always
- Headings that are not clickable: 500
- Body paragraphs, descriptions, metadata: 400
- Timestamps, captions, helper text: 400

SIZE FLOORS:
- Minimum 10px for any visible text
- Nav rail labels: exactly 10px, weight 500
- Badge / chip text: exactly 11px, weight 500
- Overline / section labels: exactly 11px, weight 500, uppercase, tracking-widest
- Caption / timestamp: exactly 12px, weight 400
- Body SM: exactly 14px, weight 400
- Body: exactly 16px, weight 400
- Headings (H3 card): exactly 18px, weight 500
- Headings (H2 section): exactly 22px, weight 500
- Headings (H1 page): exactly 28px, weight 500

### Sweep every V2 page for these specific violations:

1. Any text using font-normal (400) that is on a clickable element
   → Change to font-medium (500)

2. Any text using font-medium (500) on timestamps, helper text, sub-captions,
   thread dates, file size labels, member count labels, "Last updated" labels
   → Change to font-normal (400)

3. Any text between 12px and 14px that is not caption or badge
   → Evaluate: if it is body content raise to 14px, if it is metadata keep at 12px

4. Any text using a size that does not exist in the scale above
   → Round to nearest step in the scale

5. Any element using letter-spacing other than:
   - tracking-widest on overlines only
   - default (no tracking) on everything else
   → Remove non-standard tracking

---

## PART 2 — CONSISTENCY AUDIT: COLOR

The goal is that every element of the same semantic role uses the same token. No ad-hoc colors anywhere.

### Check and enforce across all V2 pages:

RULE 1 — Text color by role:
- All primary headings and interactive labels → var(--text-primary)
- All body and description text → var(--text-secondary)
- All timestamps, helper text, captions, metadata → var(--text-tertiary) / var(--text-overline) for section labels
- All placeholder text → var(--text-placeholder)
- All disabled text → var(--disabled-text)

Flag any element using a raw hex value for text color. Replace with the correct semantic token.
Flag any element using Tailwind color classes (text-gray-*, text-slate-*, text-zinc-*) instead of semantic tokens. Replace with the correct semantic token.

RULE 2 — Background color by surface level:
- Page/app shell: var(--canvas) / var(--surface)
- Cards: var(--elevated) in light, #2c2c2c in dark via token
- Tinted brand surfaces: var(--rally-brand-soft) adaptive token
- Tinted semantic surfaces: var(--{semantic}-soft-light) in light, var(--{semantic}-soft-dark) in dark

Flag any element using a raw hex background. Replace with the nearest correct token.

RULE 3 — Border color by hierarchy:
- Outer card / input / modal borders: var(--border-color)
- Inner card dividers / list separators / tab borders: var(--border-subtle)
- Selected / active borders: var(--selected-border)
- Focus ring: var(--focus-ring) via box-shadow only, never border

Flag any element using border-border (old Tailwind default) that should be border-subtle.
Flag any element using a raw border hex.

RULE 4 — Icon color by state:
- Icon at rest inside a nav item: var(--text-secondary)
- Icon at rest inside a button: inherits button text color
- Icon active / selected: var(--selected-text) or var(--rally-brand-on) adaptive
- Icon disabled: var(--disabled-text)
- Icon decorative (non-interactive): var(--text-tertiary)

Flag any icon using a raw hex color. Replace with the correct semantic token.

RULE 5 — Badge / chip consistency:
Every badge and chip must use one of these token pairs only. No custom one-off colors.
- Brand/Primary: --badge-calendar-bg / --badge-calendar-text
- Tasks/Success: --badge-tasks-bg / --badge-tasks-text
- Files/Info: --badge-files-bg / --badge-files-text
- Chat/Neutral: --badge-chat-bg / --badge-chat-text
- Team/Neutral: --badge-team-bg / --badge-team-text
- Web/Neutral disabled: --badge-web-bg / --badge-web-text
- Error badge: var(--error-soft-light) bg / var(--error-on-light) text
- Warning badge: var(--warning-soft-light) bg / var(--warning-on-light) text
- Solid brand badge: var(--rally-brand) bg / #ffffff text

If any badge anywhere is using a color outside these pairs, flag and correct it.

---

## PART 3 — COMFORT AND READABILITY REFINEMENTS

These are not violations — they are improvements to comfort.

### 3.1 Line height enforcement

Every text element must have line-height: 1.5 (leading-normal in Tailwind).
The only exception is nav rail labels at 10px which use leading-tight.

Sweep all V2 pages and flag:
- Any element with line-height below 1.4 that is not a nav label or badge
- Any element with line-height above 1.6
→ Set to 1.5

### 3.2 Contrast comfort ceiling

While WCAG has no upper contrast limit, very high contrast in dark mode can cause
visual fatigue. Flag any dark mode text element where:
- Text color is pure #ffffff on a surface darker than #1a1a1a
→ Suggest swapping to var(--text-primary dark) which is #fff2ed — a slightly warm
  off-white that reduces harshness without failing contrast

Do not change any light mode text colors for this rule.

### 3.3 Muted icon consistency in dark mode

All icons that are decorative or secondary in dark mode must use
var(--text-tertiary) dark (#8a807c) consistently.
Any icon using opacity tricks (e.g. opacity: 0.4 on a white icon) instead of
a semantic color token — flag and replace with var(--text-tertiary).

---

## PART 4 — NEW INTERACTION STATE: PRESSING

The current state model has: normal → hover → active (post-click result / selected).
You must add one state between hover and active: the PRESSING state.

The pressing state is: the moment the user's cursor/finger is DOWN on the element
but has not yet released. It is the :active CSS pseudo-class moment.
In React this maps to onMouseDown / onPointerDown.

This state must be added to ALL interactive elements: buttons, nav items,
list rows, chips, cards that are clickable, icon buttons, tabs, badge filters.

### Token values for the PRESSING state:

PRIMARY BUTTON pressing:
- Background: var(--rally-brand-pressed) = #ef1b07
- Text: #ffffff
- Scale: transform: scale(0.97) — the ONLY layout/transform change allowed in this session, because it has zero impact on spacing or component dimensions at rest
- Transition: all 80ms ease (faster than hover transition which is 120ms)

SECONDARY BUTTON pressing:
- Background: var(--neutral-soft-light) = #f4ece8 darkened by perception
  Use: #e8ddd8 (a step darker than --neutral-soft-light, not a new token — inline only)
- Border: var(--border-color) = #d1aa99
- Text: var(--text-primary)
- Scale: transform: scale(0.97)

GHOST BUTTON pressing:
- Background: var(--neutral-soft-light) = #f4ece8
- Scale: transform: scale(0.97)

BRAND GHOST BUTTON pressing:
- Background: var(--rally-brand-200) = #ffd0be
- Text: var(--rally-brand-on-light) = #c60f08
- Scale: transform: scale(0.97)

DESTRUCTIVE BUTTON pressing:
- Background: var(--error-pressed) = #8e0000
- Text: #ffffff
- Scale: transform: scale(0.97)

ICON BUTTON pressing:
- Background: var(--neutral-soft-light) = #f4ece8
- Scale: transform: scale(0.94) — slightly more responsive for small targets
- No border change

NAV ITEM pressing:
- Background: var(--selected-bg) = #ffe2d4 in light / var(--rally-brand-mid-dark) = #2a100e in dark
- Text/Icon: var(--selected-text) = #c60f08 in light / var(--rally-brand-on-dark) = #ff9571 in dark
- Scale: none — nav items do not scale, they only shift background
- Transition: 60ms ease

LIST ROW pressing (thread rows, file rows, task rows):
- Background: var(--neutral-soft-light) = #f4ece8 in light / #2a2a2a in dark
- Scale: none — rows do not scale
- Transition: 60ms ease

CHIP / BADGE FILTER pressing (when chips are interactive filters):
- Background: var(--rally-brand-200) = #ffd0be in light / var(--rally-brand-mid-dark) in dark
- Border: var(--selected-border) = #ff5931
- Text: var(--rally-brand-on-light) = #c60f08 in light / var(--rally-brand-on-dark) in dark
- Scale: transform: scale(0.96)
- Transition: 80ms ease

TAB pressing:
- Background: var(--rally-brand-soft-light) = #fff2ed in light / var(--rally-brand-mid-dark) in dark
- Text: var(--rally-brand-on-light) in light / var(--rally-brand-on-dark) in dark
- Scale: none
- Transition: 60ms ease

CLICKABLE CARD pressing (cards that navigate or trigger actions):
- Background: one step darker than current — use var(--neutral-soft-light) at 60% overlay
  In Tailwind: add bg-[var(--neutral-soft-light)]/60 on press
- Border: var(--border-color) — no change
- Scale: transform: scale(0.99) — very subtle, just enough to feel tactile
- Transition: 80ms ease

### Implementation pattern:

In Tailwind + React, apply the pressing state using the active: variant:

active:scale-[0.97]
active:bg-[var(--rally-brand-pressed)]
active:transition-all
active:[transition-duration:80ms]

Or using cn() / clsx with conditional classes:
'active:scale-[0.97] active:bg-[var(--rally-brand-pressed)]'

For elements where Tailwind active: does not work reliably (e.g. touch on mobile,
or nested interactive elements), add:
onMouseDown={() => setIsPressing(true)}
onMouseUp={() => setIsPressing(false)}
onMouseLeave={() => setIsPressing(false)}
onTouchStart={() => setIsPressing(true)}
onTouchEnd={() => setIsPressing(false)}

And apply pressing classes conditionally via isPressing state.

### Transition timing for the full state chain:

rest → hover: 120ms ease (existing)
hover → pressing: 80ms ease (new — faster feel)
pressing → rest (on release without action): 150ms ease-out (slight elastic feel)
pressing → active/selected (on release with action): 100ms ease

Apply this transition chain using:
transition-all duration-[120ms] ease
and override on active: with duration-[80ms]

The ease-out on release is achieved by setting the base transition to ease-out
and overriding only the hover/press directions with ease.

---

## OUTPUT FORMAT

For Part 1 and 2: list violations in this format:
FILE: [filename]
LAYER/COMPONENT: [component or element name]
VIOLATION: [what rule is broken]
CURRENT: [current value]
CORRECT: [correct token or value]
ACTION: [exact change to make]

For Part 3: list comfort improvements in this format:
FILE: [filename]
ELEMENT: [element]
IMPROVEMENT: [what to improve]
CHANGE: [exact value change]

For Part 4: confirm which components received the pressing state and list any
that could not receive it and why.

---

## DO NOT CHANGE

- Component structure, layout, spacing, padding, margin, border-radius
- Shadow values
- Icon shapes or sizes
- Image or illustration content
- Any token values defined in the previous session
- Any exempt files: LoginV2.tsx, LandingV2.tsx, ForgotPassword, Signup, 
  ResetPassword, TeamSelection auth flow pages
- font-bold in the exempt files above
- The scale() transform values are the ONLY geometric change permitted,
  and only on the pressing state, and only on elements that already have
  cursor: pointer