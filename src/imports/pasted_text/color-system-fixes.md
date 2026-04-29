TASK: Fix all 58 color system violations in the Rally V2 codebase. Every color must become a CSS variable reference — no hardcoded hex values, no Tailwind semantic color classes (text-red-*, border-red-*, etc), and no raw RGBA values anywhere in component files.

Rally uses CSS custom properties for its entire color system. The variables are defined in the global CSS and swap automatically between light/dark mode and all 6 themes. Any hardcoded hex bypasses this system and breaks dark mode and theme switching.

Work through these fix groups in order. For each one, find the exact file and line reference, make the replacement, and move to the next.

---

FIX GROUP 1 — Purple cluster (#8B5CF6, #6b21a8, #f5f3ff)
These always appear together as icon color + background pairs. They have no dark-mode swap.
Rule: #8B5CF6 or #6b21a8 → var(--info-on-light) | #f5f3ff → var(--info-soft-light)

Files to fix:
- DashboardV2: TeamPulse > VoiceRoom lines 696–697
- ChatV2: LeftRail > VoiceChannel lines 468–469
- AIChatV2: TodayStrip Create card line 166, StarterGroups line 187, QuickActions Find a file line 206
- AIChatV2: IconMap files icon line 287, PendingActionIcons update_file line 338

For AIChatV2 run a file-wide find-replace of #6b21a8 → var(--info-on-light) and #f5f3ff → var(--info-soft-light).

Also fix AIChatV2 QuickActions > Search web line 210:
  color: '#374151' → var(--neutral-on-light)
  bg: '#f3f4f6' → var(--neutral-soft-light)

---

FIX GROUP 2 — ROLE_CFG objects (TeamV2 lines 24–26, ProfileV2 lines 23–25)
These two files contain identical hardcoded role color objects. Fix both independently.

Replace the entire ROLE_CFG with:
  owner:  { color: 'var(--rally-brand-on-light)', bg: 'var(--rally-brand-soft-light)' }
  admin:  { color: 'var(--info-on-light)',         bg: 'var(--info-soft-light)' }
  member: { color: 'var(--success-on-light)',      bg: 'var(--success-soft-light)' }
  viewer: { color: 'var(--neutral-on-light)',      bg: 'var(--neutral-soft-light)' }

---

FIX GROUP 3 — Dark mode surface failures (DangerZone + confirm inputs)

TeamV2 line 961 — DangerZone card background:
  className="bg-[#fff8f8]" → style={{ background: 'var(--error-soft-light)' }}

TeamV2 line 979 AND ProfileV2 line 872 — confirm inputs:
  Replace: className="bg-white border-red-300 placeholder:text-red-300"
  With:    style={{ background: 'var(--elevated)', borderColor: 'var(--error-solid)' }}
           and placeholder color: var(--error-on-light)

---

FIX GROUP 4 — Voice/status green (#0f6a43 hardcoded in ChatV2)

ChatV2 lines 350, 370, 476 — pulse bars, status dot, online dot:
  '#0f6a43' → var(--success-solid)

ChatV2 line 371 — room name text:
  color: '#0f6a43' → color: var(--success-on-light)

Note: use var(--success-solid) for dot/bar fills, var(--success-on-light) for text. Different tokens, different roles.

---

FIX GROUP 5 — TodoV2 config objects

PRIORITY config lines 46–49 — replace entire object:
  urgent: { color: 'var(--error-on-light)',        bg: 'var(--error-soft-light)' }
  high:   { color: 'var(--rally-brand-on-light)',  bg: 'var(--rally-brand-soft-light)' }
  medium: { color: 'var(--info-on-light)',          bg: 'var(--info-soft-light)' }
  low:    { color: 'var(--success-on-light)',       bg: 'var(--success-soft-light)' }

STATUS config line 53:
  todo: { color: 'var(--neutral-on-light)', bg: 'var(--neutral-soft-light)' }

CATEGORY config line 60:
  design:  { color: 'var(--info-on-light)',    bg: 'var(--info-soft-light)' }
CATEGORY config line 65:
  feature: { color: 'var(--neutral-on-light)', bg: 'var(--neutral-soft-light)' }

StatsBar line 231:
  overdue: { color: 'var(--error-on-light)',   bg: 'var(--error-soft-light)',   border: 'var(--error-solid)' }
  today:   { color: 'var(--warning-on-light)', bg: 'var(--warning-soft-light)', border: 'var(--warning-solid)' }

---

FIX GROUP 6 — Info solid (#0f5fd7 icons)

Run a global find-replace across all files:
  '#0f5fd7' → 'var(--info-solid)'
  text-[#0f5fd7] → style={{ color: 'var(--info-solid)' }}

Also fix ChatV2 line 558 — Beta badge:
  badgeBg: '#fff2ed' → var(--rally-brand-soft-light)
  badgeText: '#c60f08' → var(--rally-brand-on-light)

Fix ChatV2 line 581 — LinkPreview colorMap:
  Replace entire colorMap with:
    info:    { bg: 'var(--info-soft-light)',    text: 'var(--info-on-light)' }
    success: { bg: 'var(--success-soft-light)', text: 'var(--success-on-light)' }
    warning: { bg: 'var(--warning-soft-light)', text: 'var(--warning-on-light)' }

---

FIX GROUP 7 — Semantic misuse (#d90000 on non-destructive elements)

AIChatV2 line 209 — QuickActions Prepare meeting:
  color: '#d90000' → var(--warning-on-light)
  bg: '#fdecec' → var(--warning-soft-light)

AIChatV2 line 289 — PendingActionIcons events:
  color: '#d90000' → var(--warning-on-light)

Rule: --error-solid (#d90000) is ONLY for Delete / Remove / Revoke. Scheduling and event actions use --warning-*.

---

FIX GROUP 8 — Tailwind text-red-* / border-red-* classes

Global replacement table — apply across ALL files:
  text-red-400, text-red-500, text-red-600 → style={{ color: 'var(--error-on-light)' }}
  hover:text-red-600 → use onMouseEnter/Leave or CSS :hover with var(--error-on-light)
  border-red-200, border-red-300 → style={{ borderColor: 'var(--error-solid)' }}
  hover:bg-red-50, bg-red-50 → style={{ background: 'var(--error-soft-light)' }}
  text-red-600 dark:text-red-400 → style={{ color: 'var(--error-on-light)' }} — token handles both modes, dark: prefix not needed

Specific files:
- TeamV2 line 975: DangerZone 6 elements — apply table above
- TeamV2 line 281: MemberRow remove action
- ProfileV2 line 770: PasswordSection mismatch
- ProfileV2 line 806: SessionList revoke button
- ProfileV2 line 848: DangerZone Delete Account heading
- FilesV2 line 316: ContextMenu danger item
- FilesV2 line 959: FileDetail delete button
- TodoV2 line 200: TaskRow overdue date text
- TeamSelectionV2 line 254: CreatePanel required asterisk

---

FIX GROUP 9 — Focus ring + press state (global)

Add to globals.css:
  *:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--focus-ring);
    border-radius: var(--radius);
  }

Add to primary button component:
  active state: background → var(--rally-brand-pressed), transform: scale(0.97)

In Tailwind on the button element:
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-[var(--focus-ring)]
  active:bg-[var(--rally-brand-pressed)]
  active:scale-[0.97]

---

FIX GROUP 10 — Misc

ProfileV2 line 776 — inline JS color string:
  background: pwSaved ? '#0f6a43' : undefined
  → background: pwSaved ? 'var(--success-solid)' : undefined

All V2 pages — 13px text nodes:
  text-[13px] or fontSize: '13px' → text-sm (14px) for body text, or text-[11px] for labels
  13px does not exist in the Rally type scale.

DashboardV2 line 136 — Figma brand icon:
  figma: { color: '#a259ff' } → figma: { color: 'var(--neutral-on-light)' }
  (or define --figma-brand: #a259ff outside the theme token system if brand color is required)

---

VERIFICATION CHECKLIST — after all fixes:

1. Run a global grep for any remaining raw hex values (#[0-9a-fA-F]{3,6}) in component files — there should be zero results outside of globals.css and token definition files.
2. Run a global grep for text-red-, border-red-, bg-red- — should return zero results.
3. Toggle dark mode — every surface, text, and icon should adapt. No bright white boxes, no invisible text.
4. Switch theme from Rally to Ocean — every color should update. Any element staying orange-red after the switch is still hardcoded.
5. Tab through every interactive element — every one should show the var(--focus-ring) coral ring.
6. Check all buttons have an active/press state with scale feedback.