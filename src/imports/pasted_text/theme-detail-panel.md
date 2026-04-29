TASK: Design the Theme Detail Panel — triggered by the ⓘ icon on any selected theme card in the Rally Theme Settings page.

You are speccing a "Theme Detail Panel" that opens when a user taps the ⓘ (info) icon on any selected theme in Rally's settings. This is not a static preview or a fake mockup — it must use real Rally components pulled directly from the live design system, in their real states, connected to real variables. Every color shown must be a live Figma variable reference. Nothing is decorative or illustrative only.

PANEL TRIGGER & BEHAVIOR:
- The ⓘ icon appears top-right on the currently selected theme card in the Theme Settings grid
- Clicking it opens a right-side detail drawer (not a modal) that pushes or overlays the main content
- Drawer width: 480px on desktop, full-screen on mobile
- The drawer is scrollable vertically; the header (theme name + close button) is sticky
- The drawer background uses --surface (not --elevated), with a left border of 1px --border-color
- A dark-mode toggle at the top of the drawer switches the entire preview area between light and dark mode independently of the app's current mode — so users can inspect both modes for any theme

PANEL STRUCTURE (top to bottom):

Section 1 — Theme Identity
- Theme name (H2, weight 500) and theme category label (Overline, 11px)
- A horizontal row of 7 color swatches: brand, brand-soft-light, surface, canvas, elevated, border, text-primary
- Each swatch is a 40x40px rounded square (radius 8px) with the variable name beneath it in monospace 10px
- The swatches must be live: they pull their fill from the theme's variable set, not hardcoded hex

Section 2 — Light Mode Preview (labeled "Light")
This section has a white/cream background (--surface light value) and contains real instances of:

2a. Buttons — all 5 variants in their default state side by side:
    Primary, Secondary/Outline, Ghost, Destructive, Icon Button
    Then below that, all 5 again in their HOVER state
    Then all 5 in their DISABLED state

2b. Form Inputs — one text input in: Default, Focused, Error, Disabled states
    One select, one textarea (2 rows), one search wrapper — all in default state

2c. Status Badges — all 7 badge variants: Primary, Success, Warning, Error, Info, Neutral, Solid brand
    Label them with their semantic role underneath (11px, --text-secondary)

2d. Cards — 3 card types side by side:
    Base Card (with a dummy heading, body text, and a primary button)
    Brand-tinted Card (with sparkles icon and short AI-assist body)
    Semantic Card — Error variant (with error icon and short message)

2e. Navigation — one vertical slice of the sidebar showing:
    3 nav items: one Default, one Hovered, one Active
    Each item has icon + label as per the real Rally nav spec (72px wide, icon + 9px label)

2f. Typography — one line of each type role:
    Display, H1, H2, H3, Body, Body SM, Caption, Label, Overline, Micro, Button label
    Shown in real Rally type styles, not faked. Each row shows the role name on the left (monospace 10px, --text-secondary) and the sample text on the right.

Section 3 — Dark Mode Preview (labeled "Dark")
Exact mirror of Section 2, but with the dark-mode variable values active.
Background switches to --surface dark (#232323).
All components use their dark-mode variable bindings.
This section must reveal any dark-mode failures — if a component has a hardcoded light color that does not adapt, it will visually break here, making it easy to spot.

Section 4 — Full Color Token Reference
A scrollable table with 3 columns: Token Name | Light Value (swatch + hex) | Dark Value (swatch + hex)
Cover all tokens: brand group, surface group, neutral group, semantic group (error, info, warning, success), chart colors, focus ring, selected states, disabled states
The swatches in this table are live variable references.
Row height: 32px. Font: monospace 12px for token names, regular 12px for hex values.

Section 5 — Interactive States Reference
A compact matrix showing:
Rows: Button Primary, Button Secondary, Input, Nav Item, Chip/Badge, Card
Columns: Default | Hover | Focus | Active/Pressed | Disabled | Selected
Each cell shows the background color swatch for that state, pulled from the real variable.
Cell size: 36x36px, tooltip on hover shows the variable name.

COMPONENT RULES:
- Every component in this panel is a real instance from the Rally component library — not a copy-pasted frame or a manually rebuilt fake
- All colors are live variable references bound to the active theme's token set
- When the theme changes (e.g. from Rally Orange to Ocean Blue), the entire detail panel updates automatically with no manual edits needed
- The dark-mode toggle at the top of the drawer only controls the preview area, not the panel's chrome
- The panel's chrome (header, section labels, token table labels) always uses the app's current mode setting

DESIGN CONSTRAINTS:
- No gradients anywhere in the panel
- No hardcoded hex values — every color is a variable
- Font: Nunito Sans, weight 500 for labels and headings, 400 for body and descriptions
- Radius: 8px for inputs/buttons, 12px for cards, 9999px for chips/badges — exactly matching Rally spec
- Section dividers: 1px solid --border-color, full width
- Section labels: 11px, weight 500, --text-secondary, uppercase, letter-spacing widest (Overline style)