# Dashboard Page

## Purpose

The Dashboard serves as the main landing page after team selection, providing users with an overview of their team's activity, upcoming events, and quick access to key features. It includes an onboarding tour for first-time users.

## Location

`/src/app/pages/Dashboard.tsx`

## Route

`/dashboard`

## User Roles & Permissions

### All Roles (Owner, Admin, Member, Viewer)
- View recent activity
- View upcoming events
- See team overview
- Access quick actions
- Complete onboarding tour

**Note**: Dashboard is read-only for all roles. Actions are taken through linked pages.

## Features

### 1. Quick Actions Grid
Four shortcut cards to main features:
- **Create Task** → Links to `/todo`
- **New Message** → Links to `/chat`
- **Add Event** → Links to `/calendar`
- **Ask AI** → Links to `/ai-chat`

### 2. Recent Activity Feed
Displays last 5 team activities:
- User who performed action
- Action type (completed, commented, created, updated, shared)
- Item name
- Time ago
- Activity type badge (task, chat, file, calendar)

### 3. Upcoming Events
Shows next 4 upcoming events:
- Event title
- Date and time
- Calendar name with color indicator
- Badge showing calendar
- Link to full calendar view

### 4. Team Overview
Current team information:
- Team name
- Project name
- Description
- Communication tags
- Member count
- Link to manage team

### 5. Onboarding Tour
8-step guided tour for new users (see `/docs/onboarding-system.md`)

## Data Structures

### Recent Activity
```typescript
{
  user: string;        // User name
  action: string;      // "completed", "commented on", etc.
  item: string;        // Item name
  time: string;        // "5 min ago"
  type: string;        // "task", "chat", "file", "calendar"
}
```

### Upcoming Event
```typescript
{
  title: string;       // Event title
  time: string;        // "Today, 10:00 AM"
  calendar: string;    // Calendar name
  color: string;       // Background color class
}
```

### Quick Action
```typescript
{
  label: string;       // "Create Task"
  icon: LucideIcon;    // Icon component
  link: string;        // "/todo"
  color: string;       // Icon color class
}
```

## UI Components

### Layout
- Full-width page with max-width container (max-w-7xl)
- Responsive padding (p-4 on mobile, p-8 on desktop)
- White background

### Header Section
- Page title (text-3xl font-bold)
- Welcome message with user name and current project
- Role badge

### Quick Actions (Grid)
- 2 columns on mobile
- 4 columns on desktop
- Cards with hover effect
- Centered icons and labels
- Color-coded icons

### Activity & Events (2-Column Grid)
- Single column on mobile
- 2 columns on large screens
- Cards with scrollable content
- Badges for categorization

### Team Overview (Full Width)
- Description text
- Tag chips
- Member count with large number
- Call-to-action button

## User Interactions

### View Activity
1. User views recent activity list
2. Can see who did what and when
3. Activity types indicated by badges

### View Upcoming Events
1. User sees next 4 events
2. Color-coded by calendar
3. Click "View Full Calendar" to see all events

### Access Quick Actions
1. User clicks on any quick action card
2. Navigates to corresponding page

### View Team Info
1. User reads team description
2. Sees communication tags
3. Clicks "Manage Team" to edit (if has permissions)

### Complete Onboarding Tour
1. Tour appears automatically on first visit
2. User can navigate through steps
3. User can skip tour
4. Tour completion stored in localStorage

## Context Integration

### Auth Context
```typescript
const { user, currentTeam, userRole } = useAuth();
```

**Used For:**
- Displaying user name in welcome message
- Showing current team/project name
- Displaying user's role badge
- Team overview data

### Onboarding Context
```typescript
<OnboardingProvider totalSteps={8} autoStart={true}>
  {/* Page content */}
  <DashboardTour />
</OnboardingProvider>
```

## Removed Features

- ❌ **Total Tasks stat** - Removed to simplify dashboard
- ❌ **Messages count** - Not needed
- ❌ **Team Members count widget** - Moved to Team Overview
- ❌ **Completion Rate** - Too complex for dashboard
- ❌ **Active Projects section** - Projects tied to teams now

## Mock Data

### Recent Activities (5 items)
```typescript
const recentActivities = [
  {
    user: "Sarah Johnson",
    action: "completed",
    item: "Website Redesign Task",
    time: "5 min ago",
    type: "task"
  },
  // ... 4 more
];
```

### Upcoming Events (4 items)
```typescript
const upcomingEvents = [
  {
    title: "Team Standup",
    time: "Today, 10:00 AM",
    calendar: "General",
    color: "bg-blue-600"
  },
  // ... 3 more
];
```

## Design System

### Colors
- Blue (#3B82F6) - Primary actions, activity dots
- Green (#10B981) - Create Task icon
- Purple (#8B5CF6) - Add Event icon
- Orange (#F97316) - Ask AI icon
- Gray scales for text hierarchy

### Spacing
- Page padding: p-4 lg:p-8
- Section margin: mb-8
- Grid gap: gap-4, gap-6
- Card padding: p-6

### Typography
- Title: text-3xl font-bold
- Description: text-gray-600
- Labels: text-sm font-medium
- Captions: text-xs text-gray-500

## Responsive Design

### Mobile (< 768px)
- Quick actions: 2 columns
- Activity/Events: 1 column (stacked)
- Reduced padding (p-4)

### Tablet (768px - 1024px)
- Quick actions: 2 columns
- Activity/Events: 2 columns

### Desktop (> 1024px)
- Quick actions: 4 columns
- Activity/Events: 2 columns
- Full padding (p-8)

## Accessibility

- ✅ Semantic HTML structure
- ✅ ARIA labels where needed
- ✅ Keyboard navigation for quick actions
- ✅ High contrast text
- ✅ Focus indicators on interactive elements

## Testing Checklist

- [ ] Displays user name correctly
- [ ] Shows current team/project
- [ ] Role badge appears
- [ ] Quick actions navigate correctly
- [ ] Recent activity list renders
- [ ] Upcoming events list renders
- [ ] Team overview shows correct data
- [ ] Onboarding tour appears on first visit
- [ ] Tour can be skipped
- [ ] Mobile layout works
- [ ] Tablet layout works
- [ ] Desktop layout works
- [ ] Links work correctly
- [ ] Hover states visible

## Future Enhancements

- Real-time activity updates
- Customizable dashboard widgets
- Activity filtering
- Event reminders
- Notification center integration
- Dashboard analytics
- Custom quick actions
- Widget drag-and-drop

## Related Files

- `/src/app/contexts/AuthContext.tsx` - User and team data
- `/src/app/contexts/OnboardingContext.tsx` - Tour state
- `/src/app/components/onboarding/DashboardTour.tsx` - Tour steps
- `/src/app/components/ui/card.tsx` - Card component
- `/src/app/components/ui/badge.tsx` - Badge component
- `/src/app/components/ui/button.tsx` - Button component

## Example Usage

### Quick Action Card
```tsx
<Link to="/todo">
  <Card className="hover:shadow-md transition-shadow cursor-pointer">
    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
      <CheckCircle2 className="size-8 text-blue-600 mb-3" />
      <p className="font-medium text-sm">Create Task</p>
    </CardContent>
  </Card>
</Link>
```

### Activity Item
```tsx
<div className="flex items-start gap-3">
  <div className="w-2 h-2 mt-2 rounded-full bg-blue-600" />
  <div className="flex-1">
    <p className="text-sm">
      <span className="font-medium">{activity.user}</span>{" "}
      <span className="text-gray-600">{activity.action}</span>{" "}
      <span className="font-medium">{activity.item}</span>
    </p>
    <div className="flex items-center gap-2 mt-1">
      <p className="text-xs text-gray-500">{activity.time}</p>
      <Badge variant="outline" className="text-xs">
        {activity.type}
      </Badge>
    </div>
  </div>
</div>
```

---

**Page Version**: 2.0 (Refactored)  
**Last Updated**: March 22, 2026  
**Status**: Complete  
**Onboarding**: Integrated ✅
