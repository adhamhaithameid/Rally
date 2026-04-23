# Platform-IO Implementation Specification

## Overview

This document provides detailed specifications for implementing the remaining pages in the Platform-IO refactor.

---

## Completed Pages ✅

1. **Dashboard** - Removed stats, added quick actions, recent activity, upcoming events
2. **Team** - Complete RBAC implementation with team/project management
3. **Calendar** - Full CRUD for calendars and events with role-based permissions

---

## To-Do Page Specification

### Data Structures

```typescript
interface TodoList {
  id: string;
  name: string;
  color: string;
  description: string;
  teamId: string;
  createdBy: string;
  tasks: Task[];
}

interface Task {
  id: string;
  listId: string;
  emoji?: string; // Separated from title
  title: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  deadline?: string;
  completed: boolean;
  description: string;
  mentions: string[]; // User IDs
  createdBy: string;
  createdAt: string;
}
```

### Features to Implement

**Lists (CRUD - All roles can create/manage their own)**
- Name
- Color picker (8 colors like calendar)
- Description
- Create/Edit/Delete lists

**Tasks (CRUD)**
- Emoji picker at start (like Microsoft To Do)
  - Emoji rendered separately in UI
  - Optional, can be added/removed
- Title
- Priority dropdown (low/medium/high/urgent) with color coding
- Deadline date picker
- Completed checkbox
- Description textarea
- Mentions system (@user tags)
- List assignment

**UI Layout**
- Left sidebar: List of todo lists with colors
- Main area: Tasks from selected list
- Filter by: All/Active/Completed
- Sort by: Priority/Deadline/Created date

### Remove
- ❌ "Total tasks" stat
- ❌ "Active" count
- ❌ "Completed" count
- ❌ "Progress" bar

### Role-Based Permissions
- **All roles**: Can create/manage their own lists and tasks
- **Viewer**: Read-only, cannot create or modify

---

## Chat Page Specification

### Data Structures

```typescript
interface ChatGroup {
  id: string;
  name: string;
  type: 'text' | 'voice' | 'text-voice';
  teamId: string;
  createdBy: string;
  permissions: GroupPermissions;
  members: string[]; // User IDs
}

interface GroupPermissions {
  write: UserRole[]; // Who can send messages
  read: UserRole[]; // Who can read
  delete: UserRole[]; // Who can delete messages
  modify: UserRole[]; // Who can edit messages
  notify: UserRole[]; // Who can send @all notifications
  allowAi: boolean; // Allow AI in this group
}

interface ChatMessage {
  id: string;
  groupId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  message: string;
  media?: string[]; // URLs
  replyTo?: string; // Message ID
  timestamp: string;
  edited?: boolean;
}
```

### Features to Implement

**Groups (Admin manages)**
- Name
- Type selection (text/voice/text-voice)
- Permission settings per role
- Member list

**Messages**
- Text input
- Media upload (images, files)
- Reply to message (with quote)
- Edit own messages
- Delete own messages (or admin can delete any)
- Timestamp display
- User avatar and name

**Voice Chat** (Simple indicator)
- "Join Voice" button
- Active participants list
- Leave voice button

### Remove
- ❌ Video calls
- ❌ Emoji reactions (😀👍 etc)

### Role-Based Permissions
- **Admin**: Manage groups, manage permissions, delete any message
- **Member**: Based on group permissions
- **Viewer**: Read-only (if allowed by group permissions)

---

## File System Page Specification

### Data Structures

```typescript
interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  size?: number; // bytes, for files
  permissions: FilePermissions;
  createdBy: string;
  createdAt: string;
  modifiedAt: string;
  parent?: string; // Folder ID
}

interface FilePermissions {
  owner: string; // User ID
  read: UserRole[];
  write: UserRole[];
  delete: UserRole[];
}
```

### Features to Implement

**FTP/Git-like Interface**
- Tree view of folders and files
- Breadcrumb navigation
- Current path display

**File Operations**
- Upload file
- Download file
- View file (preview for images, text)
- Delete file (with permissions check)
- Rename file

**Folder Operations**
- Create folder
- Delete folder (with contents warning)
- Rename folder
- Navigate into folder

**Permissions per File/Folder**
- Owner
- Read permissions (by role)
- Write permissions (by role)
- Delete permissions (by role)

### Remove
- ❌ "Storage" section
- ❌ "Your current storage usage" display
- ❌ Storage quotas/limits UI

### Role-Based Permissions
- **Owner**: Determines file/folder permissions
- **Based on file permissions**: Read/Write/Delete access

---

## AI Chat Page Specification

### Data Structures

```typescript
interface AIChat {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  messages: AIMessage[];
}

interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  media?: string[]; // Uploaded files
  actions?: AIAction[]; // Actions taken
}

interface AIAction {
  type: 'search_events' | 'create_event' | 'search_todos' | 'create_todo' | 'search_internet';
  params: Record<string, any>;
  result: any;
}
```

### Features to Implement

**Chat Management**
- List of chats in sidebar
- Create new chat
- Rename chat
- Delete chat
- Switch between chats

**AI Conversation (Streamed)**
- Message input with media upload
- Streaming response (text appears gradually)
- Message history
- Code block formatting
- Markdown support

**Platform Actions**
- Search events: "Find my meetings this week"
- Create event: "Schedule team meeting tomorrow at 2pm"
- Search todos: "Show my high priority tasks"
- Create todo: "Add task to redesign homepage"
- Internet search toggle: "Search the web for..."

**Media Upload**
- Images
- PDFs
- Text files
- Send to AI for analysis

### Remove
- ❌ Like button
- ❌ Dislike button
- ❌ Thumbs up/down reactions

### Role-Based Permissions
- **All roles**: Can use AI (unless disabled by group permissions in chat)
- **AI actions respect role permissions**: Can only create/search what role allows

---

## Profile Page Specification

### Data Structures

```typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
  gender?: string;
  job?: string;
  phone?: string;
  timezone: string;
  tags: string[];
  avatar?: string;
  teams: TeamMembership[];
}
```

### Features to Implement

**Profile Information**
- Name (editable)
- Email (display only or editable with verification)
- Gender dropdown (Male/Female/Other/Prefer not to say)
- Job title input
- Phone input
- Timezone selector
- Tags (comma-separated chips)
- Avatar upload with preview

**Associated Teams**
- List of teams user is part of
- Team name
- Project name
- Role badge
- Quick navigate to team

**Account Actions**
- Logout button (clears auth, redirects to login)
- Delete account button (with confirmation dialog)
  - "Are you sure?" modal
  - Type "DELETE" to confirm

**Theme Selector** (keep but simplify)
- Light mode
- Dark mode (remove "Auto")

### Remove
- ❌ Two-Factor Authentication section
- ❌ "Enable 2FA" button
- ❌ Active Sessions list
- ❌ Notifications preferences
- ❌ Privacy settings
- ❌ "Auto" theme option
- ❌ Bio textarea
- ❌ Location input

### Role-Based Permissions
- **All roles**: Can edit own profile

---

## Design System Guidelines

### Colors (Solid Only - No Gradients)
```css
Primary:   #3B82F6 (blue-600)
Success:   #10B981 (green-600)
Warning:   #F59E0B (yellow-600)
Danger:    #EF4444 (red-600)
Purple:    #8B5CF6 (purple-600)
```

### Priority Colors (for tasks)
```css
Low:      #10B981 (green)
Medium:   #F59E0B (yellow)
High:     #F97316 (orange)
Urgent:   #EF4444 (red)
```

### Spacing
- Page padding: `p-4 lg:p-8`
- Card padding: `p-6`
- Gaps: `gap-4` or `gap-6`
- Margins: `mb-6` or `mb-8`

### Typography
- Page title: `text-3xl font-bold`
- Section title: `text-xl font-semibold`
- Card title: `font-medium` or `font-semibold`
- Body: `text-sm` or `text-base`
- Caption: `text-xs`

---

## Common Patterns

### Page Header
```tsx
<div className="mb-8">
  <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Title</h1>
  <p className="text-gray-600">Page description</p>
  <Badge variant="outline" className="mt-2">
    Your Role: {userRole}
  </Badge>
</div>
```

### CRUD Dialog
```tsx
<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
  <DialogTrigger asChild>
    <Button>
      <Plus className="size-4 mr-2" />
      Create New
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{editing ? "Edit" : "Create"}</DialogTitle>
      <DialogDescription>Description here</DialogDescription>
    </DialogHeader>
    <div className="space-y-4 mt-4">
      {/* Form fields */}
      <Button onClick={handleSave}>Save</Button>
    </div>
  </DialogContent>
</Dialog>
```

### Viewer Mode Check
```tsx
if (userRole === 'viewer') {
  return <ReadOnlyView />;
}
```

### Permission Check
```tsx
const canManage = hasPermission('manage_xyz') || hasPermission('*');

{canManage && <Button>Manage</Button>}
```

---

## Documentation Template

For each page, create `/docs/pages/[page-name].md`:

```markdown
# [Page Name] Page

## Purpose
What this page does and why it exists.

## User Roles & Permissions

### Owner
- Can do X, Y, Z

### Admin
- Can do A, B, C

### Member
- Can do D, E, F

### Viewer
- Read-only access

## Features

### Feature 1
Description of feature 1

### Feature 2
Description of feature 2

## Data Structures

### Entity Name
\`\`\`typescript
interface Entity {
  field: type;
}
\`\`\`

## UI Components

### Main Layout
Description of layout

### Component 1
What it does

## User Interactions

### Create Action
1. User clicks "Create"
2. Dialog opens
3. User fills form
4. User clicks "Save"
5. Item created

### Edit Action
[Similar format]

### Delete Action
[Similar format]

## API Functions (Mock)

### createEntity()
```typescript
function createEntity(data: EntityData): Entity {
  // Mock implementation
}
```

## Removed Features

- ❌ Feature A (reason)
- ❌ Feature B (reason)

## Examples

### Example 1
Screenshot or code example

## Testing Checklist

- [ ] Create works
- [ ] Edit works
- [ ] Delete works
- [ ] Permissions enforced
- [ ] Viewer mode works
- [ ] Mobile responsive
- [ ] Accessible

## Future Enhancements

- Potential improvement 1
- Potential improvement 2
```

---

## Implementation Checklist

### For Each Page:

1. **Define interfaces** at top of file
2. **Import Auth context**: `useAuth()`
3. **Check permissions** with `hasPermission()`
4. **Implement Viewer mode** (read-only view)
5. **Implement CRUD operations**
   - Create
   - Read/List
   - Update
   - Delete
6. **Add role badges** to show user's role
7. **Test with mock data**
8. **Create documentation**

### General:

- ✅ Follow design system (no gradients)
- ✅ Use consistent spacing
- ✅ Accessible color contrasts
- ✅ Keyboard navigation
- ✅ Mobile responsive
- ✅ Loading states
- ✅ Error states
- ✅ Empty states
- ✅ Confirmation dialogs for destructive actions

---

## Next Steps

1. Implement Todo page
2. Implement Chat page
3. Implement File System page
4. Implement AI Chat page
5. Implement Profile page
6. Create documentation for each
7. Update main README
8. Final testing

---

**Document Version**: 1.0  
**Last Updated**: March 22, 2026  
**Status**: Ready for Implementation
