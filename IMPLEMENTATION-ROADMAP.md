# Platform-IO Enhancement Implementation Roadmap

**Date Started**: March 22, 2026  
**Current Status**: In Progress  
**Dark Mode**: Paused at 75% completion

---

## 📊 PROGRESS TRACKER

### ✅ COMPLETED

#### Phase 1: Foundation (DONE)
- [x] Main sidebar collapsible functionality
- [x] Dark mode foundation (75% - paused)
- [x] ThemeContext and theme toggle

---

### 🚧 IN PROGRESS

#### Phase 2: Global Changes
- [ ] Remove shadows from ALL hover effects
- [ ] Make every sidebar collapsible (Chat, AIChat, Todo, Calendar, Team)
- [ ] Ensure mobile responsiveness for all sidebars
- [ ] Unify hover effects globally

#### Phase 3: Dashboard Page
- [ ] Remove "Your Role" badge from header
- [ ] Add Communication Tags as colored badges in Team Overview
- [ ] Make Team Overview role-specific:
  - Owner: Full team stats + all members
  - Admin: Team stats + assigned members
  - Member: Personal stats + team count
  - Viewer: Read-only team info
- [ ] Make Quick Actions role-specific:
  - Owner/Admin: All 4 actions
  - Member: Create Task, Ask AI
  - Viewer: None (hidden or disabled)

#### Phase 4: Chat Page (Major Updates)
- [ ] Settings icon appears on hover in channel items
- [ ] Change sidebar collapse to icon-only mode
- [ ] Make channel sections collapsible:
  - Text Channels (collapsible)
  - Voice Channels (collapsible)
  - Direct Messages (collapsible)
- [ ] Voice channels: Create dedicated page with controls
- [ ] Message actions (Reply/Edit/Delete):
  - Show icons always
  - Reveal text labels on hover
- [ ] Add search bar in text channels
- [ ] Add "Message Privately" option on user hover
- [ ] Add delete option for DMs only
- [ ] My messages on right, others on left (Discord style)

#### Phase 5: AI Chat Page
- [ ] Remove microphone icon
- [ ] Add Globe icon for web search option
- [ ] Update new chat prompt suggestions (project-aligned)
- [ ] Add options icon (3-dot menu) on chat items
- [ ] Options menu: Edit chat name, Delete chat
- [ ] Make AI sidebar collapsible
- [ ] Add clickable action icons

#### Phase 6: Todo Page
- [ ] Remove "Your Role" badge
- [ ] Add options icon (3-dot menu) on list items
- [ ] Options menu: Edit list, Delete list

#### Phase 7: Calendar Page
- [ ] Enhance calendar grid view (better spacing, clarity)
- [ ] Improve month navigation
- [ ] Add options icon (3-dot menu) on calendar items
- [ ] Options menu: Edit calendar, Delete calendar

#### Phase 8: Profile Page
- [ ] Create tabbed interface:
  - Personal Info tab
  - Security tab
  - Preferences tab
  - Activity tab

---

## 🎯 IMPLEMENTATION PLAN

### Session 1 (Current): Global + Dashboard + Chat Basics
**Time**: 30-40 mins  
**Priority**: HIGH

1. ✅ Create roadmap document
2. Remove all shadow hover effects globally
3. Dashboard improvements (role badge, communication tags)
4. Chat: Collapsible sections + settings on hover
5. Chat: Message alignment (me right, others left)

### Session 2: Chat Advanced + AIChat
**Time**: 30-35 mins  
**Priority**: HIGH

1. Chat: Voice channel page with controls
2. Chat: Message actions redesign
3. Chat: Search functionality
4. Chat: Private message option
5. AIChat: Remove mic, add globe
6. AIChat: Collapsible sidebar + options menu

### Session 3: Todo + Calendar + Profile
**Time**: 25-30 mins  
**Priority**: MEDIUM

1. Todo: Remove role badge + add options menu
2. Calendar: Enhanced view + options menu
3. Profile: Tabbed interface
4. Final testing and polish

### Session 4: Testing & Polish
**Time**: 20-25 mins  
**Priority**: MEDIUM

1. Test all collapsible sidebars on mobile
2. Test role-specific features
3. Verify no shadows on hover anywhere
4. Cross-browser testing
5. Documentation update

---

## 📝 DETAILED CHANGE LOG

### Global Changes

#### Hover Effects (Remove Shadows)
**Files to Update**:
- `/src/app/pages/Dashboard.tsx` - Card hover effects
- `/src/app/pages/Chat.tsx` - Channel/message hover
- `/src/app/pages/AIChat.tsx` - Chat item hover
- `/src/app/pages/Todo.tsx` - Task/list hover
- `/src/app/pages/CalendarPage.tsx` - Event hover
- `/src/app/pages/Team.tsx` - Member card hover
- `/src/app/components/ui/card.tsx` - Remove shadow variants

**Pattern**:
```tsx
// BEFORE
className="hover:shadow-lg transition-shadow"

// AFTER  
className="hover:bg-muted transition-colors"
```

#### Collapsible Sidebars
**Implementation Pattern**:
```tsx
const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

// Sidebar container
<div className={`transition-all ${
  sidebarCollapsed ? 'w-16' : 'w-64'
}`}>
  {/* Content */}
</div>

// Toggle button
<Button onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
  {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
</Button>
```

---

### Dashboard Page Changes

#### 1. Remove Role Badge
**File**: `/src/app/pages/Dashboard.tsx`  
**Line**: ~145  
**Change**: Remove entire Badge component showing role

#### 2. Communication Tags in Team Overview
**File**: `/src/app/pages/Dashboard.tsx`  
**Section**: Team Overview Card  
**Change**: Add colored Badge components for each user's tags
```tsx
<div className="flex flex-wrap gap-1">
  {member.communicationTags.map(tag => (
    <Badge key={tag} variant="secondary">{tag}</Badge>
  ))}
</div>
```

#### 3. Role-Specific Team Overview
**Logic**:
```tsx
// Owner/Admin: Show all members
if (userRole === 'owner' || userRole === 'admin') {
  return <FullTeamOverview />
}
// Member: Show personal stats
else if (userRole === 'member') {
  return <PersonalStatsOverview />
}
// Viewer: Read-only
else {
  return <ViewerTeamOverview />
}
```

#### 4. Role-Specific Quick Actions
**Logic**:
```tsx
const quickActions = {
  owner: ['Create Task', 'New Message', 'Add Event', 'Ask AI'],
  admin: ['Create Task', 'New Message', 'Add Event', 'Ask AI'],
  member: ['Create Task', 'Ask AI'],
  viewer: []
};
```

---

### Chat Page Changes

#### 1. Settings Icon on Hover
**Pattern**:
```tsx
<div className="group">
  <div className="flex items-center justify-between">
    <span>Channel Name</span>
    <button className="opacity-0 group-hover:opacity-100">
      <Settings className="size-4" />
    </button>
  </div>
</div>
```

#### 2. Collapsible Channel Sections
**Implementation**:
- Each section (Text, Voice, DM) gets collapse state
- ChevronDown/ChevronRight toggle icon
- Smooth height transition

#### 3. Voice Channel Page
**New Component**: `/src/app/components/VoiceChannelView.tsx`  
**Features**:
- Participant grid
- Mute/unmute controls
- Video toggle
- Screen share
- Leave call button

#### 4. Message Alignment
**Pattern**:
```tsx
{message.userId === currentUser.id ? (
  // My message - right aligned
  <div className="flex justify-end">
    <div className="bg-blue-600 text-white">{message.text}</div>
  </div>
) : (
  // Other message - left aligned
  <div className="flex justify-start">
    <div className="bg-muted">{message.text}</div>
  </div>
)}
```

#### 5. Message Actions (Icons → Hover Text)
**Pattern**:
```tsx
<div className="group flex gap-1">
  <button className="group/btn">
    <Reply className="size-3" />
    <span className="hidden group-hover/btn:inline">Reply</span>
  </button>
  <button className="group/btn">
    <Edit className="size-3" />
    <span className="hidden group-hover/btn:inline">Edit</span>
  </button>
</div>
```

---

### AI Chat Page Changes

#### 1. Remove Microphone, Add Globe
**File**: `/src/app/pages/AIChat.tsx`  
**Change**: Replace Mic icon with Globe icon

#### 2. New Chat Prompts (Project-Aligned)
**Updated Prompts**:
- "Help me plan a team meeting"
- "Summarize project progress"
- "Draft a task assignment"
- "Create a status report"

#### 3. Chat Options Menu
**Pattern**:
```tsx
<DropdownMenu>
  <DropdownMenuTrigger>
    <MoreVertical className="size-4" />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit name</DropdownMenuItem>
    <DropdownMenuItem>Delete chat</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

### Todo Page Changes

#### 1. Remove Role Badge
**File**: `/src/app/pages/Todo.tsx`  
**Change**: Remove Badge showing role

#### 2. List Options Menu
**Location**: Each list item in sidebar  
**Options**: Edit list name, Delete list

---

### Calendar Page Changes

#### 1. Enhanced Calendar View
**Improvements**:
- Larger day cells
- Better event truncation
- Clearer today indicator
- Improved color contrast

#### 2. Calendar Options Menu
**Location**: Each calendar in sidebar  
**Options**: Edit calendar, Delete calendar

---

### Profile Page Changes

#### 1. Tabbed Interface
**Tabs**:
1. **Personal Info**: Name, email, avatar, bio
2. **Security**: Password change, 2FA settings
3. **Preferences**: Theme, notifications, language
4. **Activity**: Recent actions, login history

**Implementation**: Use shadcn/ui Tabs component

---

## 🎨 Design Patterns

### Collapsible Sidebar Pattern
```tsx
const [collapsed, setCollapsed] = useState(false);

return (
  <div className={`relative transition-all duration-300 ${
    collapsed ? 'w-16' : 'w-64'
  }`}>
    {/* Header with toggle */}
    <div className="flex items-center justify-between p-4">
      {!collapsed && <h2>Sidebar Title</h2>}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight /> : <ChevronLeft />}
      </Button>
    </div>
    
    {/* Content */}
    <div className="p-4">
      {collapsed ? (
        // Icon-only view
        <IconOnlyItems />
      ) : (
        // Full view
        <FullItems />
      )}
    </div>
  </div>
);
```

### Hover-Reveal Options Pattern
```tsx
<div className="group relative">
  <div className="main-content">
    {/* Main item content */}
  </div>
  
  <button className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
    <Settings className="size-4" />
  </button>
</div>
```

### No-Shadow Hover Pattern
```tsx
// Instead of shadows, use background color changes
className="transition-colors hover:bg-muted"

// Or border highlight
className="transition-colors hover:border-primary"

// Or subtle scale
className="transition-transform hover:scale-105"
```

---

## 📱 Mobile Responsiveness

### Sidebar Behavior on Mobile
- Default: Collapsed/hidden on mobile
- Hamburger menu to open
- Overlay mode (not push)
- Tap outside to close

### Pattern:
```tsx
<div className={`
  fixed lg:relative
  ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
  transition-transform
`}>
  {/* Sidebar content */}
</div>

{/* Mobile overlay */}
{isMobileOpen && (
  <div
    className="fixed inset-0 bg-black/50 lg:hidden"
    onClick={() => setIsMobileOpen(false)}
  />
)}
```

---

## 🧪 Testing Checklist

### Global
- [ ] All sidebars collapse/expand smoothly
- [ ] No shadows on hover anywhere
- [ ] Responsive on mobile (320px+)
- [ ] Responsive on tablet (768px+)
- [ ] Responsive on desktop (1024px+)

### Dashboard
- [ ] Role badge removed
- [ ] Communication tags display correctly
- [ ] Team Overview shows correct data per role
- [ ] Quick actions filtered by role

### Chat
- [ ] Settings icon appears on channel hover
- [ ] All channel sections collapsible
- [ ] Voice channel page works
- [ ] Messages aligned correctly (me right, others left)
- [ ] Message actions show/hide properly
- [ ] Search functionality works
- [ ] Private message option appears

### AI Chat
- [ ] No microphone icon
- [ ] Globe icon present
- [ ] New prompts relevant to project
- [ ] Chat options menu works
- [ ] Sidebar collapsible

### Todo
- [ ] Role badge removed
- [ ] List options menu works

### Calendar
- [ ] Enhanced view is clearer
- [ ] Calendar options menu works

### Profile
- [ ] All tabs render
- [ ] Tab switching works
- [ ] Tab content displays correctly

---

## 📚 Files Modified Summary

### Created
- [ ] `/IMPLEMENTATION-ROADMAP.md` (this file)
- [ ] `/src/app/components/VoiceChannelView.tsx` (new)

### Modified
- [ ] `/src/app/pages/Dashboard.tsx`
- [ ] `/src/app/pages/Chat.tsx`
- [ ] `/src/app/pages/AIChat.tsx`
- [ ] `/src/app/pages/Todo.tsx`
- [ ] `/src/app/pages/CalendarPage.tsx`
- [ ] `/src/app/pages/Profile.tsx`
- [ ] `/src/app/components/ui/card.tsx` (maybe)

---

## 🚀 Current Session Goals

**Session 1 - Today**:
1. ✅ Create this roadmap
2. Remove shadow hover effects globally
3. Dashboard: Remove role, add communication tags, role-specific views
4. Chat: Collapsible sections, settings on hover, message alignment

**Estimated Time**: 30-40 minutes  
**Status**: Starting now...

---

**Next Update**: After Session 1 completion
