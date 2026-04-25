You are a senior accessibility and visual design auditor reviewing the Rally V2 design system implementation in Figma. Your job is to audit COLOR and FONT USAGE ONLY across the AI Chat page (app/ai-chat-v2) in both light mode and dark mode. Do not suggest layout changes, component restructuring, spacing adjustments, or any structural edits. Every suggestion must be a token swap or a font property change only.

---

## WHAT YOU NEED TO KNOW FIRST

Ask Figma to show you the current design system by running:

"Show me all local color styles, text styles, and component sets currently defined in this file."

Then confirm the following tokens exist before auditing. If any are missing, flag them as absent:

REQUIRED TOKENS (light mode):
- --text-primary: #231d1a
- --text-secondary: #5f514b
- --text-tertiary: #8c7b74
- --text-placeholder: #b09e98
- --rally-brand: #ff4615
- --rally-brand-on-light: #c60f08
- --rally-brand-soft-light: #fff2ed
- --rally-brand-200: #ffd0be
- --border-color: #d1aa99
- --border-subtle: rgba(209, 170, 153, 0.5)
- --canvas: #ffe1d2
- --surface: #fff7f3
- --elevated: #ffffff
- --success-solid: #0f6a43
- --success-soft-light: #eaf7f0
- --success-on-light: #0f6a43
- --warning-solid: #8a4f00
- --warning-soft-light: #fff4e5
- --warning-on-light: #8a4f00
- --error-solid: #d90000
- --error-soft-light: #fdecec
- --error-on-light: #b00000
- --info-solid: #0f5fd7
- --info-soft-light: #eef4ff
- --info-on-light: #0f5fd7
- --neutral-solid: #5f514b
- --neutral-soft-light: #f4ece8

REQUIRED TOKENS (dark mode overrides):
- --text-primary: #fff2ed
- --text-secondary: #c7b8b2
- --text-tertiary: #8a807c
- --text-placeholder: #5f514b
- --rally-brand-soft-dark: #440608
- --rally-brand-mid-dark: #2a100e
- --canvas: #191919
- --surface: #232323
- --elevated: #2c2c2c
- --border-color: rgba(255, 255, 255, 0.10)

---

## ACCESSIBILITY RULES TO ENFORCE

Apply WCAG 2.1 AA as the minimum standard.
Apply WCAG 2.1 AAA where text is below 14px or weight is below 500.

CONTRAST RATIOS REQUIRED:
- Text 16px+ weight 500 (labels, buttons, headings): minimum 4.5:1
- Text 14px weight 400 (body): minimum 4.5:1
- Text 12px weight 400 (caption): minimum 4.5:1 — consider AAA (7:1) here
- Text 11px weight 500 (overline, badge, chip): minimum 4.5:1 — this size is borderline; flag anything below 5:1
- Text 10px weight 500 (nav labels, micro): minimum 7:1 — this is AAA territory, enforce it
- Text 9px (if any exist): flag as violation regardless of contrast — minimum size is 10px in Rally V2
- Interactive icons (24px and below): minimum 3:1 against their background
- Non-interactive decorative elements: no requirement, skip

---

## AUDIT SECTION 1 — LIGHT MODE

Go through the AI Chat V2 page in light mode. For each item below, check the current color token applied and the contrast ratio against its background. Report violations only.

### 1.1 Thread list badges (the colored pill chips on each thread row)

Each thread row shows colored badge chips like Tasks (green), Calendar (orange/brand), Files (purple/pink), Chat (neutral), Team (neutral).

Check each badge variant:
- Badge text color against badge background color
- Badge background against thread row background (--surface or --elevated)

Expected token pairs:
- Tasks badge: text --success-on-light (#0f6a43) on bg --success-soft-light (#eaf7f0) → must be ≥ 4.5:1
- Calendar badge: text --rally-brand-on-light (#c60f08) on bg --rally-brand-soft-light (#fff2ed) → must be ≥ 4.5:1
- Files badge: text --info-on-light (#0f5fd7) on bg --info-soft-light (#eef4ff) → must be ≥ 4.5:1
- Chat badge: text --neutral-solid (#5f514b) on bg --neutral-soft-light (#f4ece8) → must be ≥ 4.5:1
- Team badge: text --neutral-solid (#5f514b) on bg --neutral-soft-light (#f4ece8) → must be ≥ 4.5:1

If any badge is using a different token pair, flag it and specify what to change it to.

### 1.2 Thread row timestamps and metadata

The "1h ago", "Yesterday", "Apr 22" labels next to thread titles.

These must use --text-tertiary (#8c7b74) at 12px weight 400.
Contrast of #8c7b74 on --surface (#fff7f3) = approximately 4.6:1 — acceptable.
Contrast of #8c7b74 on --elevated (#ffffff) = approximately 4.3:1 — borderline, flag if on white.

If timestamps are currently using --text-secondary (#5f514b), that is acceptable (higher contrast). Only flag downward — if they are using something lighter than --text-tertiary, correct it to --text-tertiary.

### 1.3 Section overlines (PINNED, TODAY, EARLIER)

These labels are 11px, weight 500, uppercase, letter-spacing widest.
They must use --text-tertiary (#8c7b74).
Contrast of #8c7b74 on --surface (#fff7f3) ≈ 4.6:1 — at 11px this is borderline.

If currently using --text-secondary (#5f514b) — acceptable, leave as is.
If using --text-placeholder (#b09e98) or lighter — flag as violation. Change to --text-tertiary (#8c7b74).
If using --muted-foreground or any non-system token — flag and correct to --text-tertiary.

### 1.4 Source access panel (right sidebar — Current Context, Source Access, Related Work)

Check:
- Section headings (CURRENT CONTEXT, SOURCE ACCESS, RELATED WORK): must be --text-tertiary, 10-11px, weight 500
- Item labels (Design Team, Rally AI, Team knowledge, Files, Tasks, Calendar, Chat, Web): must be --text-primary or --text-secondary at 13-14px
- Sub-labels (Active workspace, Default model, Full access, Limited by admin, Disabled): must be --text-tertiary at 11-12px
- Status indicators (colored dots): green dot = --success-solid, muted dot = --neutral-solid. Check these are not using raw hex values.

### 1.5 Composer / input area

The bottom input with attachment icons (paperclip, checkbox, calendar, hashtag, mic).

- Icon color at rest: must be --text-secondary or --neutral-solid (#5f514b) — contrast on --elevated (#ffffff) ≈ 7.2:1 — acceptable
- Send button arrow (currently appears gray/disabled): if send is disabled, color must be --disabled-text (#b09e98). If active, must be #ffffff on --rally-brand background. Flag if the disabled arrow is using --text-tertiary instead of --disabled-text.
- Placeholder text "Ask anything — or pick a prompt below…": must be --text-placeholder (#b09e98)

### 1.6 Starter prompt cards (Catch up, Find, etc.)

Cards on --surface (#fff7f3) background.
- Card heading (Catch up, Find): --text-primary (#231d1a), 15-16px, weight 500 → must be ≥ 4.5:1 ✓
- Card body text (What changed since yesterday?, etc.): --text-secondary (#5f514b), 13-14px, weight 400 → must be ≥ 4.5:1 ✓
- Card borders: must use --border-subtle (rgba 209,170,153,0.5) not --border-color. Flag if using full-opacity border — too heavy for card-within-surface context.

### 1.7 AI input chip row (Team, Files, Tasks, Calendar, Chat, Web chips)

These are the filter chips in the AI input area.
- Selected chip (e.g. Team highlighted): background --rally-brand-soft-light, text --rally-brand-on-light (#c60f08) → ≥ 4.5:1 ✓
- Unselected chip: background --elevated (#ffffff), text --text-secondary (#5f514b) → ≥ 7:1 ✓
- "Web" chip if showing disabled/muted state: must use --disabled-text (#b09e98) on --disabled-bg (#f4ece8) → check contrast ≈ 3.1:1 — FLAG THIS. At 11px this fails AA. Correct to --text-tertiary (#8c7b74) on --neutral-soft-light (#f4ece8) → ≈ 4.4:1, borderline. Or keep --neutral-solid (#5f514b) on --neutral-soft-light → ≈ 7:1 — preferred.

---

## AUDIT SECTION 2 — DARK MODE

Switch to dark mode and repeat the audit for the same components. Dark mode has different failure modes — the main risks are:

1. Colored elements losing saturation and becoming indistinguishable
2. Light elements on dark surfaces being too bright (contrast too high causing glare is not an issue for WCAG but flag anything above 18:1 as potentially harsh)
3. Border lines disappearing entirely

### 2.1 Thread list badges in dark mode

In dark mode, badge backgrounds and text must switch to their dark semantic equivalents. Rally does not define explicit dark badge tokens for every semantic color — this is a gap. Apply the following corrections:

Tasks badge (dark): text #7ad6a7 (--success-on-dark) on bg #10261c (--success-soft-dark) → must be ≥ 4.5:1. If not using these tokens, flag and correct.
Calendar badge (dark): text --rally-brand-on-dark (#ff9571) on bg --rally-brand-soft-dark (#440608) → must be ≥ 4.5:1. Flag if on wrong background.
Files badge (dark): text #a9cbff (--info-on-dark) on bg #101d36 (--info-soft-dark) → must be ≥ 4.5:1.
Chat / Team badge (dark): text --neutral-on-dark (#c7b8b2) on bg --neutral-soft-dark (#262322) → must be ≥ 3.5:1 minimum (these are decorative-adjacent at small size, but prefer 4.5:1).

If any badge in dark mode is using light mode token values (e.g. #eaf7f0 background in dark mode) — that is a critical flag. Correct to the dark equivalents above.

### 2.2 Section overlines in dark mode (PINNED, TODAY, EARLIER)

Must use --text-tertiary dark (#8a807c).
Contrast of #8a807c on --surface dark (#232323) ≈ 3.9:1 — this FAILS AA at 11px.

CORRECTION: Upgrade section overlines in dark mode to --text-secondary dark (#c7b8b2).
Contrast of #c7b8b2 on #232323 ≈ 7.1:1 — passes AAA. Apply this change.

This is the single most impactful accessibility fix in dark mode.

### 2.3 "AI Home" selected state in dark mode sidebar

The selected nav item should show:
- Background: --rally-brand-soft-dark (#440608)
- Text/icon: --rally-brand-on-dark (#ff9571)

If the selected background is barely visible or using a lighter/wrong tint, it may be using --rally-brand-mid-dark (#2a100e) incorrectly as the selected state instead of the hover state. Correct to:
- Rest (active/selected): background --rally-brand-soft-dark (#440608), text --rally-brand-on-dark (#ff9571)
- Hover on selected: background --rally-brand-soft-dark at 80% opacity
- Pre-selected hover: background --rally-brand-mid-dark (#2a100e)

### 2.4 Card borders in dark mode

All card and panel borders must use rgba(255,255,255,0.10) — this is --border-color in dark mode.

If any card border is:
- Using a flat hex like #4a403c — replace with var(--border-color) which resolves to rgba(255,255,255,0.10) in dark mode
- Using rgba(255,255,255,0.05) or lower — too low, raise to 0.10
- Using rgba(255,255,255,0.15) or higher — too high, lower to 0.10

The starter prompt cards (Catch up, Find) in dark mode specifically — these are white/light cards on a dark background. Check:
- Card background: must be --elevated dark (#2c2c2c)
- Card heading text: --text-primary dark (#fff2ed) on #2c2c2c → ≈ 14:1 ✓
- Card body text: --text-secondary dark (#c7b8b2) on #2c2c2c → check ratio
- Card border: rgba(255,255,255,0.10) — if not set, add it

### 2.5 Source access status dots in dark mode

The colored dots indicating access status (green = full access, muted = limited/disabled).

- Green active dot: must be --success-solid (#0f6a43) OR --success-on-dark (#7ad6a7). In dark mode #0f6a43 on #232323 ≈ 3.2:1 — this FAILS. 
  CORRECTION: In dark mode the active dot must use #7ad6a7 (--success-on-dark) not #0f6a43 (--success-solid). Flag and correct.
- Muted/disabled dot: must be --neutral-solid dark or --text-tertiary dark (#8a807c) — ≈ 3.9:1 on #232323. Acceptable for a decorative 8px dot.

### 2.6 Send button / composer in dark mode

The send arrow button appears gray/inactive in both screenshots.

In dark mode:
- Disabled send: background --neutral-soft-dark (#262322), icon --text-tertiary (#8a807c) → must be visible. #8a807c on #262322 ≈ 3.8:1 — borderline for an icon. If the icon is below 3:1, raise icon color to --text-secondary dark (#c7b8b2).
- Active send: background --rally-brand (#ff4615), icon #ffffff → ≈ 3.8:1. At large icon size this passes for UI component (3:1 minimum). Acceptable.

### 2.7 Nav rail labels in dark mode

The 9-10px labels beneath each icon (Home, Chat, AI Chat, To-Do, Calendar, Files, Team, System, Theme, Profile).

These must be:
- Font size: 10px minimum (flag any at 9px)
- Font weight: 500 (flag any at 400)
- Color (inactive): --text-tertiary dark (#8a807c) — contrast on --canvas dark (#191919) ≈ 4.1:1 — passes AA for this decorative-adjacent role
- Color (active): --rally-brand-on-dark (#ff9571) — contrast on --rally-brand-soft-dark (#440608) ≈ 4.8:1 — passes AA ✓

If nav labels are currently at 9px — flag as size violation. Minimum is 10px.

---

## OUTPUT FORMAT

For each violation found, output exactly this format:

VIOLATION: [Component name] — [Light/Dark] mode
ELEMENT: [specific text or icon element]
CURRENT: [current color token or hex] on [current background token or hex] = [contrast ratio]:1
REQUIRED: [correct color token] on [background] = [correct ratio]:1
ACTION: Change [property] from [current] to [correct token name]
FIGMA LAYER: [layer path if identifiable]

---

## DO NOT FLAG

- Layout, spacing, padding, margin, component size
- Icon shape, illustration style, image content
- Component structure or variant organization
- Anything using correct token pairs already
- Contrast ratios above 4.5:1 for body text (these pass — do not "improve" them unless specifically AAA is required)
- The brand color #ff4615 on white — this is 3.8:1, which fails AA for text but is used only on icon backgrounds and CTAs where the 3:1 UI component threshold applies

---

## AFTER THE AUDIT

Once all violations are listed, output a second section:

FONT ENFORCEMENT CHECKS:

1. Are any text elements using font-bold (700) in V2 app pages outside of auth-flow and LandingV2 marketing pages? If yes, list each layer path. Change font-weight to 500.

2. Are any elements using font-size below 10px? List each. Change to 10px.

3. Are any overline / section label elements (PINNED, TODAY, EARLIER, CURRENT CONTEXT, SOURCE ACCESS) NOT using uppercase + tracking-widest + font-weight 500? Flag and correct.

4. Are any badge/chip text elements using font-weight 400? Change to 500.

5. Are any caption/timestamp elements using font-weight 500 or higher? They should be 400. Flag if weight 500 is applied to passive content like timestamps or helper text.