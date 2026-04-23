# Calendar Page

## Purpose

The Calendar page allows admins to create and manage multiple calendars with color coding, and create/edit events with full scheduling details including recurrence rules, timezones, and all-day events. Members and viewers can view calendars and events.

## Location

`/src/app/pages/CalendarPage.tsx`

## Route

`/calendar`

## User Roles & Permissions

### Owner
- ✅ All admin permissions
- ✅ Manage calendars (CRUD)
- ✅ Manage events (CRUD)

### Admin
- ✅ Create calendars
- ✅ Edit/delete calendars
- ✅ Create events
- ✅ Edit/delete events
- ✅ Manage calendar colors

### Member
- ✅ View calendars
- ✅ View events
- ❌ Cannot create/edit/delete

### Viewer
- ✅ View calendars (read-only)
- ✅ View events (read-only)
- ❌ No management capabilities

## Features

### 1. Calendar Management (Admin/Owner Only)

**Create Calendar**
- Name
- Color selection (8 preset colors)
- Automatic ID generation
- Team association

**Edit Calendar**
- Update name
- Change color
- Save changes

**Delete Calendar**
- Confirmation dialog
- Deletes calendar and all its events
- Warning about data loss

**Calendar List**
- Sidebar display
- Color indicator
- Selection toggle
- Edit/delete buttons (if permitted)

### 2. Event Management (Admin/Owner Only)

**Create Event**
- Title (required)
- Description (optional)
- Calendar selection (required)
- Start date/time (required)
- End date/time (required)
- All-day toggle
- Timezone selection
- Recurrence rule (optional, iCalendar RRULE format)

**Edit Event**
- Update any field
- Move to different calendar
- Change timing
- Modify recurrence

**Delete Event**
- Confirmation dialog
- Permanent deletion

**Event Display**
- Title and description
- Start/end times
- Timezone indicator
- Recurrence indicator
- Calendar badge
- Color-coded indicator

### 3. View Modes

**All Calendars View**
- Shows events from all calendars
- Default view

**Single Calendar View**
- Filter events by calendar
- Click calendar in sidebar
- Toggle on/off

### 4. Event Details Display

**Information Shown:**
- Event title
- Description (if provided)
- Date and time
  - All-day: "Mar 22, 2026"
  - Timed: "Mar 22, 10:00 AM - 10:30 AM"
- Timezone
- Recurrence status
- Calendar name (badge)
- Calendar color (left border)

## Data Structures

### Calendar
```typescript
interface Calendar {
  id: string;
  name: string;
  color: string;          // Hex color
  teamId: string;
  createdBy: string;
  events: CalendarEvent[];
}
```

### Calendar Event
```typescript
interface CalendarEvent {
  id: string;
  calendarId: string;
  title: string;
  description: string;
  start: string;          // ISO 8601 format
  end: string;            // ISO 8601 format
  allDay: boolean;
  timezone: string;       // IANA timezone
  rule?: string;          // iCalendar RRULE format
  createdBy: string;
}
```

### Calendar Colors
```typescript
const CALENDAR_COLORS = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#10B981" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Red", value: "#EF4444" },
  { name: "Orange", value: "#F97316" },
  { name: "Pink", value: "#EC4899" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Yellow", value: "#F59E0B" },
];
```

## UI Components

### Page Layout

**Viewer Mode:**
- 1-column sidebar + 3-column main area (on desktop)
- Calendars list (clickable for filtering)
- Events list (read-only)
- No create/edit/delete buttons

**Admin/Owner Mode:**
- Same layout
- "+" button on calendars
- "Add Event" button
- Edit/delete buttons on items

### Calendar Sidebar
- "All Calendars" option
- List of calendars with:
  - Color dot
  - Name
  - Selection state
  - Edit/Delete buttons (if permitted)
- "+" button to create (Admin/Owner)

### Events Main Area
- Header with title and description
- Filter indicator (which calendar viewing)
- "Add Event" button (Admin/Owner)
- Events list:
  - Color border (from calendar)
  - Title (bold)
  - Description
  - Icons and details (time, timezone, recurrence)
  - Calendar badge
  - Edit/Delete buttons (if permitted)

### Calendar Dialog (Create/Edit)
- Title: "Create Calendar" or "Edit Calendar"
- Name input field
- Color picker (8 color grid)
  - Selected color has dark border and scale effect
  - Hover states
- Create/Update button
- Disabled if no name

### Event Dialog (Create/Edit)
- Title: "Create Event" or "Edit Event"
- Scrollable content (max-height with overflow)
- Fields:
  - Title input
  - Description textarea
  - Calendar selector dropdown
  - All-day switch
  - Start date/datetime input
  - End date/datetime input
  - Timezone selector (5 common timezones + UTC)
  - Recurrence rule input (with help text)
- Create/Update button
- Disabled if required fields missing

## User Interactions

### View Calendars (All Roles)
1. User sees list of calendars in sidebar
2. Can click to filter events
3. Color dots show calendar colors

### Filter Events by Calendar
1. User clicks calendar name in sidebar
2. Events list filters to that calendar only
3. Calendar name highlighted
4. Click again to show all calendars

### Create Calendar (Admin/Owner)
1. User clicks "+" button in calendars sidebar
2. Dialog opens
3. User enters calendar name
4. User selects color from grid
5. User clicks "Create Calendar"
6. Calendar added to list
7. Dialog closes

### Edit Calendar (Admin/Owner)
1. User clicks edit icon next to calendar
2. Dialog opens with current values
3. User modifies name and/or color
4. User clicks "Update Calendar"
5. Calendar updated
6. Dialog closes

### Delete Calendar (Admin/Owner)
1. User clicks delete icon next to calendar
2. Confirmation dialog appears
3. User confirms deletion
4. Calendar and all its events deleted
5. List updates

### Create Event (Admin/Owner)
1. User clicks "Add Event" button
2. Dialog opens
3. User fills in required fields (title, calendar, start, end)
4. User optionally fills description, timezone, recurrence
5. User toggles all-day if needed
6. User clicks "Create Event"
7. Event added to list
8. Dialog closes

### Edit Event (Admin/Owner)
1. User clicks edit icon on event
2. Dialog opens with current values
3. User modifies fields
4. User clicks "Update Event"
5. Event updated
6. Dialog closes

### Delete Event (Admin/Owner)
1. User clicks delete icon on event
2. Confirmation dialog appears
3. User confirms deletion
4. Event deleted
5. List updates

## Permission Checks

### Manage Calendars
```typescript
const canManageCalendars = hasPermission("manage_calendars") || hasPermission("*");
```

### Manage Events
```typescript
const canManageEvents = hasPermission("manage_calendars") || hasPermission("*");
```

**Note**: Currently both calendars and events require same permission. Can be separated if needed.

## Context Integration

### Auth Context
```typescript
const { userRole, hasPermission } = useAuth();
```

**Used For:**
- Checking if user can manage calendars
- Checking if user can manage events
- Displaying role badge
- Conditional rendering of buttons

## Helper Functions

### formatDateTime(dateStr: string, allDay: boolean)
Formats event date/time for display:
- All-day events: "Mar 22, 2026"
- Timed events: "Mar 22, 10:00 AM"

```typescript
const formatDateTime = (dateStr: string, allDay: boolean) => {
  const date = new Date(dateStr);
  if (allDay) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};
```

## State Management

### Calendar CRUD State
```typescript
const [calendars, setCalendars] = useState<Calendar[]>(mockCalendars);
const [calendarDialogOpen, setCalendarDialogOpen] = useState(false);
const [editingCalendar, setEditingCalendar] = useState<Calendar | null>(null);
const [calendarName, setCalendarName] = useState("");
const [calendarColor, setCalendarColor] = useState(CALENDAR_COLORS[0].value);
```

### Event CRUD State
```typescript
const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
const [eventDialogOpen, setEventDialogOpen] = useState(false);
const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
const [eventTitle, setEventTitle] = useState("");
const [eventDescription, setEventDescription] = useState("");
const [eventStart, setEventStart] = useState("");
const [eventEnd, setEventEnd] = useState("");
const [eventAllDay, setEventAllDay] = useState(false);
const [eventTimezone, setEventTimezone] = useState("America/New_York");
const [eventRule, setEventRule] = useState("");
const [eventCalendar, setEventCalendar] = useState("");
```

### View State
```typescript
const [selectedCalendar, setSelectedCalendar] = useState<string | null>(null);
```

## Mock Data

### Mock Calendars
```typescript
const mockCalendars: Calendar[] = [
  {
    id: "cal-1",
    name: "General",
    color: "#3B82F6",
    teamId: "team-1",
    createdBy: "user-1",
    events: [],
  },
  // ...
];
```

### Mock Events
```typescript
const mockEvents: CalendarEvent[] = [
  {
    id: "event-1",
    calendarId: "cal-1",
    title: "Team Standup",
    description: "Daily standup meeting",
    start: "2026-03-22T10:00:00",
    end: "2026-03-22T10:30:00",
    allDay: false,
    timezone: "America/New_York",
    rule: "FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR",
    createdBy: "user-1",
  },
  // ...
];
```

## Recurrence Rules (RRULE)

### Format
iCalendar RRULE format (RFC 5545)

### Examples
```
Daily (weekdays): FREQ=DAILY;BYDAY=MO,TU,WE,TH,FR
Weekly on Monday: FREQ=WEEKLY;BYDAY=MO
Monthly on 15th: FREQ=MONTHLY;BYMONTHDAY=15
Yearly: FREQ=YEARLY
Every 2 weeks: FREQ=WEEKLY;INTERVAL=2
```

### Display
- If rule exists: Shows "Recurring" badge with Repeat icon
- If no rule: No indicator

## Timezones Supported

- America/New_York (Eastern Time)
- America/Chicago (Central Time)
- America/Denver (Mountain Time)
- America/Los_Angeles (Pacific Time)
- UTC

**Note**: Can be expanded to support more timezones as needed.

## Design System

### Colors
- Calendar colors: 8 preset solid colors
- Event borders: Match calendar color
- Icons: Gray for time/location, blue for calendar
- Badges: outline variant

### Spacing
- Page: p-4 lg:p-8
- Grid gap: gap-6
- Event spacing: space-y-3
- Card padding: p-4

### Typography
- Event title: font-medium
- Event description: text-sm text-gray-600
- Details: text-xs text-gray-500

## Responsive Design

### Mobile (< 1024px)
- Single column layout
- Calendar sidebar above events
- Full-width dialogs

### Desktop (>= 1024px)
- 4-column grid
- Sidebar: 1 column
- Events: 3 columns
- Side-by-side layout

## Accessibility

- ✅ Keyboard navigation
- ✅ ARIA labels on icon buttons
- ✅ High contrast colors
- ✅ Focus indicators
- ✅ Semantic HTML
- ✅ Date/time inputs accessible
- ✅ Select dropdowns keyboard-friendly

## Testing Checklist

### Admin/Owner
- [ ] Can create calendar
- [ ] Can edit calendar
- [ ] Can delete calendar (with confirmation)
- [ ] Can create event
- [ ] Can edit event
- [ ] Can delete event (with confirmation)
- [ ] Can set all-day events
- [ ] Can set recurrence rules
- [ ] Can change timezones
- [ ] Can assign events to calendars

### Member
- [ ] Can view calendars
- [ ] Can view events
- [ ] Can filter by calendar
- [ ] Cannot see create/edit/delete buttons
- [ ] Read-only mode works

### Viewer
- [ ] Special viewer layout
- [ ] Can view calendars
- [ ] Can view events
- [ ] Can filter by calendar
- [ ] No management buttons
- [ ] Role badge shows "Viewer (Read-only)"

### General
- [ ] Color selection works
- [ ] Date/time pickers work
- [ ] All-day toggle works
- [ ] Timezone selector works
- [ ] Form validation works
- [ ] Empty state shows when no events
- [ ] Mobile responsive
- [ ] Dialogs scroll when content is long
- [ ] Confirmations work

## Future Enhancements

- Calendar view (day/week/month grid)
- Drag-and-drop events
- Event reminders/notifications
- Calendar sharing
- Calendar subscriptions (iCal URLs)
- Event categories/tags
- Event attachments
- Event attendees
- Event conflicts detection
- Calendar import/export
- Recurring event exceptions
- Calendar permissions (per calendar)

## Related Files

- `/src/app/contexts/AuthContext.tsx` - User permissions, Calendar interfaces
- `/src/app/components/ui/card.tsx` - Card component
- `/src/app/components/ui/dialog.tsx` - Dialogs
- `/src/app/components/ui/select.tsx` - Dropdowns
- `/src/app/components/ui/switch.tsx` - All-day toggle
- `/src/app/components/ui/input.tsx` - Text inputs
- `/src/app/components/ui/textarea.tsx` - Description
- `/src/app/components/ui/badge.tsx` - Calendar badges

## Example Code

### Calendar Color Selector
```tsx
<div className="grid grid-cols-4 gap-2">
  {CALENDAR_COLORS.map((color) => (
    <button
      key={color.value}
      onClick={() => setCalendarColor(color.value)}
      className={`w-full aspect-square rounded-lg border-2 transition-all ${
        calendarColor === color.value
          ? "border-gray-900 scale-110"
          : "border-gray-200 hover:border-gray-400"
      }`}
      style={{ backgroundColor: color.value }}
      title={color.name}
    />
  ))}
</div>
```

### Event Display
```tsx
<div className="flex items-start gap-3">
  <div
    className="w-1 h-full rounded"
    style={{ backgroundColor: calendar?.color }}
  />
  <div className="flex-1">
    <h3 className="font-medium">{event.title}</h3>
    {event.description && (
      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
    )}
    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
      <span className="flex items-center gap-1">
        <Clock className="size-3" />
        {formatDateTime(event.start, event.allDay)}
      </span>
      {event.rule && (
        <span className="flex items-center gap-1">
          <Repeat className="size-3" />
          Recurring
        </span>
      )}
    </div>
  </div>
</div>
```

---

**Page Version**: 2.0 (Complete Rebuild)  
**Last Updated**: March 22, 2026  
**Status**: Complete  
**RBAC**: Fully Implemented ✅  
**Calendar CRUD**: ✅  
**Event CRUD**: ✅
