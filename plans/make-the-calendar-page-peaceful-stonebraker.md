# Calendar V2 Redesign — Simpler, Options in Buttons

## Context

The current `/app/calendar-v2` page (`src/app/pages/CalendarV2.tsx`, 1557 lines) is visually crowded. A permanent 192px left rail sits beside every view, containing a mini calendar, "Up Next" card, five calendar-visibility toggles, a Quick Create button, and a collapsible schedule-changes log. When the event detail panel also opens (304px), the actual calendar area shrinks to a narrow column. The user wants the page to feel simple and open, with all those options tucked into toolbar buttons that open popovers on demand.

## What Changes

### 1. Remove the Left Rail entirely
- Delete `<LeftRail>` from the layout and remove the `LeftRail` component
- Free the full width for the calendar views at all times

### 2. New single-line toolbar with popovers for everything
Replace the current header with a cleaner one-line bar:

```
[← →]  [Apr 20–24, 2026]  [Today]     —spacer—     [🔍 Search]  [📅 Calendars ▾]  [Week · Agenda · Month]  [✨ AI]  [+ New Event]
```

**Calendars popover** (clicking `Calendars ▾` opens a `position: fixed` dropdown anchored to the button via `getBoundingClientRect()`):
- Section 1: Mini calendar (reuse existing `MiniCalendar` component)
- Section 2: Calendar list toggles (checkboxes with color dots — reuse existing toggle logic)
- Section 3: "Up Next" summary (reuse existing `UpNextCard` content, condensed)
- Section 4: Schedule Changes (expandable, reuse `SCHEDULE_CHANGES` data)
- Close on outside click (same pattern as `DateRangePicker` / `FilterPanel` in `TodoV2.tsx`)

### 3. Event Detail Panel — keep but lighter
- Keep the `EventDetailPanel` right sidebar (304px) as-is — it's well designed
- No layout change needed here, just benefits from the extra space the rail removal gives

### 4. Visual cleanup in the toolbar
- Use `var(--elevated)` / `var(--border-color)` / `var(--text-primary)` tokens consistently (currently the header mixes `bg-card`, `border-border`, Tailwind class names and inline CSS vars inconsistently)
- View switcher: convert from a bordered-box to the same segmented `p-0.5 bg-muted rounded-[8px]` pattern used in `TodoV2.tsx` (cleaner, already established pattern)
- Navigation arrows: simple icon buttons with hover state
- "Today" button: small outlined pill
- All spacing uses `gap-2` / `px-4 py-3` like the rest of the app

### 5. Search UX
- Keep as a text input; on mobile hide label and show icon-only (already handled with `hidden sm:block`)

---

## Files to Modify

**Only one file:** `src/app/pages/CalendarV2.tsx`

Changes within it:
- Remove `LeftRail` function component (~70 lines)
- Add `CalendarPopover` function component (~120 lines) — the new dropdown containing mini cal + toggles + up next + changes
- Update `CalendarV2` main component:
  - Remove `LeftRail` from JSX
  - Replace header toolbar JSX with the new clean version
  - Add `calPopoverOpen` + `calPopoverRect` state (same pattern as `filterOpen`/`filterRect` in TodoV2)
  - Wire `Calendars` button to open popover using `getBoundingClientRect()`
- Reuse all existing helpers: `MiniCalendar`, `UpNextCard`, `SCHEDULE_CHANGES`, `toggleList`, `goToPrevWeek`, `goToNextWeek`, `goToToday`, `handleDateClick`, `handleMiniCalMonth`
- Keep `WeekView`, `AgendaView`, `MonthView`, `EventDetailPanel`, `NewEventModal` completely unchanged

---

## Reused Patterns

- **Fixed popover anchoring**: same `getBoundingClientRect()` → `position: fixed; top: rect.bottom + 6; right: window.innerWidth - rect.right` pattern introduced for `DateRangePicker` and `FilterPanel` in `TodoV2.tsx`
- **Segmented view toggle**: same `inline-flex items-center p-0.5 rounded-[8px] bg-muted` + `IconToggle` pattern from `TodoV2.tsx` (can use text labels instead of icons here)
- **Outside-click close**: same `useEffect + document.addEventListener("mousedown")` pattern already used in `RowMenu`, `DateRangePicker`, `FilterPanel`

---

## Verification

1. Open `/app/calendar-v2` — page should fill the full width with no left sidebar
2. Click the **Calendars** button in the header → popover appears below the button showing mini calendar, calendar toggles, up next, and schedule changes
3. Toggle a calendar (e.g. Deadlines off) → events of that type disappear from the week view; popover stays open
4. Click outside the popover → it closes
5. Navigate weeks with ← → arrows; click Today; switch views (Week/Agenda/Month) — all work as before
6. Click an event → event detail panel opens on the right; full calendar area is now wider without the left rail
7. Click **+ New Event** → modal opens, create event works
8. All three views (Week, Agenda, Month) render correctly with the extra width
