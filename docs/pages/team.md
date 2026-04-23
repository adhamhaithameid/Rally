# Team Page

## Purpose

The Team page allows users to view and manage their team settings, project information, and team members. It implements comprehensive role-based access control (RBAC) with four distinct user roles: Owner, Admin, Member, and Viewer.

## Location

`/src/app/pages/Team.tsx`

## Route

`/team`

## User Roles & Permissions

### Owner
- ✅ Manage admins (promote/demote)
- ✅ Manage all team data (name, project, description, tags)
- ✅ Edit team avatar
- ✅ View/copy invitation link
- ✅ Add/remove members (all roles)
- ✅ Change member roles (including admin)
- ✅ All admin permissions

### Admin
- ✅ Manage members (add/remove members and viewers)
- ✅ Change member roles (member ↔ viewer only)
- ✅ View team information
- ✅ View/copy invitation link
- ❌ Cannot edit team data
- ❌ Cannot manage other admins

### Member
- ✅ View team information
- ✅ View team members
- ✅ View/copy invitation link
- ❌ Cannot edit anything
- ❌ Cannot manage members

### Viewer
- ✅ View team information (read-only)
- ✅ View team members (read-only)
- ❌ Cannot see invitation link
- ❌ Cannot edit or manage anything

## Features

### 1. Team Information Management

**Fields:**
- **Name**: Team name
- **Project Name**: Associated project (1 team = 1 project)
- **Description**: Team and project description
- **Communication Tags**: Comma-separated tags for categorization
- **Invitation Link**: Shareable link to invite new members
- **Avatar**: Team avatar (generated or uploaded)

**Avatar System:**
- Auto-generated based on team name (initials)
- Color-coded using hash of team name
- Hover to upload custom image (Owner only)

### 2. Member Management

**Add Members** (Admin/Owner)
- Email invitation
- Role selection
- Send invitation

**Member List Display:**
- Avatar (generated or uploaded)
- Name and email
- Join date
- Role badge with icon
- Action buttons (if has permission)

**Change Roles** (Based on permissions)
- Owner can change anyone to any role
- Admin can change members/viewers
- Dropdown role selector

**Remove Members** (Admin/Owner)
- Cannot remove owner
- Cannot remove self
- Admin cannot remove other admins
- Confirmation required

### 3. Role Permissions Reference

Visual card grid showing what each role can do:
- Owner (Yellow): All permissions
- Admin (Blue): Member + calendar management
- Member (Green): Normal interaction
- Viewer (Gray): Read-only

## Data Structures

### Team
```typescript
interface Team {
  id: string;
  name: string;
  projectName: string;
  description: string;
  communication: string[];  // Tags
  inviteLink: string;
  avatar?: string;
  ownerId: string;
  members: TeamMember[];
  calendars: Calendar[];
  createdAt: string;
}
```

### Team Member
```typescript
interface TeamMember {
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  joinedAt: string;
}
```

### User Role
```typescript
type UserRole = 'owner' | 'admin' | 'member' | 'viewer';
```

## UI Components

### Page Layouts

#### Viewer Mode (Read-Only)
- Team info card (read-only)
- Members list (read-only)
- No edit buttons
- Role badge showing "Viewer (Read-only)"

#### Member/Admin/Owner Mode
- Editable team info card
- Member management
- Role-based action buttons
- Invitation link with copy button

### Team Information Card
- Avatar with upload overlay (Owner)
- Team name and project name
- Edit button (Owner)
- Description display/edit
- Tags display/edit
- Invitation link with copy button

### Edit Team Dialog (Owner Only)
- Team name input
- Project name input
- Description textarea
- Tags input (comma-separated)
- Save/Cancel buttons

### Members Card
- Member count in header
- "Add Member" button (Admin/Owner)
- Member list with:
  - Avatar
  - Name, email
  - Join date
  - Role badge/selector
  - Remove button

### Add Member Dialog (Admin/Owner)
- Email input
- Role selector (based on user's permissions)
- Send invitation button

### Role Permissions Reference Card
- 4-column grid (responsive)
- Color-coded cards
- Icon for each role
- Permission bullets

## User Interactions

### View Team Info (All Roles)
1. User navigates to Team page
2. Sees team name, project, description
3. Sees communication tags
4. Views member list

### Copy Invitation Link (Member+)
1. User clicks copy button next to invite link
2. Link copied to clipboard
3. Checkmark appears for 2 seconds
4. Can share link to invite others

### Edit Team Data (Owner Only)
1. User clicks "Edit Team" button
2. Dialog/inline form appears
3. User edits name, project, description, tags
4. User clicks "Save Changes"
5. Team data updated
6. Form closes

### Upload Team Avatar (Owner Only)
1. User hovers over avatar
2. Upload overlay appears
3. User clicks to upload image
4. Image replaces generated avatar

### Add Team Member (Admin/Owner)
1. User clicks "Add Member" button
2. Dialog opens
3. User enters email address
4. User selects role (based on permissions)
5. User clicks "Send Invitation"
6. Invitation sent
7. Dialog closes

### Change Member Role (Admin/Owner)
1. User opens role dropdown for member
2. Selects new role (based on permissions)
3. Role updated immediately
4. Visual feedback (badge color changes)

### Remove Member (Admin/Owner)
1. User clicks trash icon next to member
2. Confirmation dialog appears
3. User confirms
4. Member removed from team
5. List updates

## Permission Checks

### Edit Team Data
```typescript
const canEditTeam = hasPermission("*"); // Owner only
```

### Manage Members
```typescript
const canManageMembers = hasPermission("manage_members") || hasPermission("*");
```

### Modify Specific Member
```typescript
const canModifyMember =
  canManageMembers && 
  !isCurrentUser && 
  member.role !== "owner" &&
  (userRole === "owner" || (userRole === "admin" && member.role !== "admin"));
```

## Context Integration

### Auth Context
```typescript
const { user, currentTeam, userRole, hasPermission } = useAuth();
```

**Used For:**
- Getting current team data
- Checking user's role
- Permission validation
- User identification

## Helper Functions

### generateAvatar(name: string)
Generates SVG avatar with initials and color
```typescript
import { generateAvatar } from "../contexts/AuthContext";

<img src={generateAvatar(teamName)} alt={teamName} />
```

### getRoleIcon(role: UserRole)
Returns appropriate icon for role:
- Owner: Crown (yellow)
- Admin: Shield (blue)
- Member: Users (green)
- Viewer: Eye (gray)

### getRoleBadgeColor(role: UserRole)
Returns Tailwind classes for role badge styling

## Mock API Functions

### handleSaveTeam()
```typescript
// Mock save - in real app, call API
console.log("Saving team:", {
  teamName,
  projectName,
  description,
  tags: tags.split(",").map(t => t.trim())
});
```

### handleInviteMember()
```typescript
// Mock invite - in real app, call API
console.log("Inviting member:", {
  email: newMemberEmail,
  role: newMemberRole
});
```

### handleChangeRole()
```typescript
// Mock role change - in real app, call API
console.log("Changing role:", { memberId, newRole });
```

### handleRemoveMember()
```typescript
// Mock remove - in real app, call API
console.log("Removing member:", memberId);
```

## Removed Features

- ❌ **Pending Invitations** - Simplified to instant link sharing
- ❌ **Online Now** - Not needed for this version
- ❌ **Activity Feed** - Moved to Dashboard
- ❌ **Team Statistics** - Simplified approach

## Design System

### Colors (Solid Only)
- Yellow (#F59E0B) - Owner
- Blue (#3B82F6) - Admin
- Green (#10B981) - Member
- Gray (#6B7280) - Viewer

### Role Badge Colors
```css
Owner:  bg-yellow-50 text-yellow-700 border-yellow-200
Admin:  bg-blue-50 text-blue-700 border-blue-200
Member: bg-green-50 text-green-700 border-green-200
Viewer: bg-gray-50 text-gray-700 border-gray-200
```

### Spacing
- Page padding: p-4 lg:p-8
- Card padding: p-4
- Member item padding: p-3
- Gaps: gap-2, gap-3, gap-4

## Responsive Design

### Mobile (< 768px)
- Single column layout
- Stacked permission cards
- Full-width buttons

### Tablet (768px - 1024px)
- 2-column permission grid
- Side-by-side layouts start

### Desktop (> 1024px)
- 4-column permission grid
- Optimal spacing

## Accessibility

- ✅ Keyboard navigation
- ✅ ARIA labels on buttons
- ✅ Role badges with icons + text
- ✅ High contrast colors
- ✅ Focus indicators
- ✅ Screen reader friendly
- ✅ Semantic HTML

## Testing Checklist

### Owner
- [ ] Can edit team name
- [ ] Can edit project name
- [ ] Can edit description
- [ ] Can edit tags
- [ ] Can upload avatar
- [ ] Can copy invite link
- [ ] Can add members (all roles)
- [ ] Can change any member's role
- [ ] Can remove any member (except self)
- [ ] Can promote/demote admins

### Admin
- [ ] Cannot edit team data
- [ ] Can copy invite link
- [ ] Can add members (member/viewer)
- [ ] Can change member/viewer roles
- [ ] Can remove members/viewers
- [ ] Cannot remove admins
- [ ] Cannot remove owner

### Member
- [ ] Can view all team info
- [ ] Can copy invite link
- [ ] Cannot edit anything
- [ ] Cannot manage members

### Viewer
- [ ] Can view team info (read-only)
- [ ] Can view members (read-only)
- [ ] Cannot see invite link
- [ ] No edit buttons visible
- [ ] Special viewer layout

### General
- [ ] Role badges display correctly
- [ ] Avatar generation works
- [ ] Permission reference card accurate
- [ ] Mobile responsive
- [ ] Dialogs work
- [ ] Confirmations work
- [ ] Copy to clipboard works

## Future Enhancements

- Team activity log
- Member statistics
- Online status indicators
- Team settings (more advanced)
- Multiple projects per team
- Team templates
- Bulk member import
- Team analytics
- Integration settings

## Related Files

- `/src/app/contexts/AuthContext.tsx` - Team and user data, permissions
- `/src/app/components/ui/card.tsx` - Card component
- `/src/app/components/ui/dialog.tsx` - Dialog modals
- `/src/app/components/ui/badge.tsx` - Role badges
- `/src/app/components/ui/select.tsx` - Role selector
- `/src/app/components/ui/button.tsx` - Action buttons

## Example Code

### Permission Check
```tsx
const canEditTeam = hasPermission("*");

{canEditTeam && (
  <Button onClick={() => setEditMode(true)}>
    <Edit2 className="size-4 mr-2" />
    Edit Team
  </Button>
)}
```

### Role Badge
```tsx
<Badge className={getRoleBadgeColor(member.role)}>
  <span className="flex items-center gap-1">
    {getRoleIcon(member.role)}
    {member.role}
  </span>
</Badge>
```

### Avatar Generation
```tsx
<img
  src={currentTeam.avatar || generateAvatar(currentTeam.name)}
  alt={currentTeam.name}
  className="size-16 rounded-lg"
/>
```

---

**Page Version**: 2.0 (Complete Rebuild)  
**Last Updated**: March 22, 2026  
**Status**: Complete  
**RBAC**: Fully Implemented ✅  
**One Team = One Project**: ✅
