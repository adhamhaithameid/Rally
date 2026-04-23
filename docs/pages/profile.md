# Profile Page

## Purpose

The Profile page allows users to manage their personal information, view associated teams, configure preferences, and perform account actions like logout and account deletion.

## Location

`/src/app/pages/Profile.tsx`

## Route

`/profile`

## User Roles & Permissions

### All Roles (Owner, Admin, Member, Viewer)
- ✅ View own profile
- ✅ Edit personal information
- ✅ View associated teams
- ✅ Change theme
- ✅ Logout
- ✅ Delete own account

**Note:** All users have full control over their own profile, regardless of role.

## Features

### 1. Profile Overview

**Displays:**
- Avatar (auto-generated from name, or uploaded)
- Full name
- Email address
- Job title
- Tags (expertise areas)
- Camera button for avatar upload

**Avatar:**
- Size: 96px (size-24)
- Auto-generated using `generateAvatar(name)` from AuthContext
- Upload button (camera icon) in bottom-right corner
- Circular with colored background

**Tags:**
- Displayed as secondary badges
- Multiple tags supported
- Shows areas of expertise
- Editable in form

### 2. Personal Information

**Editable Fields:**

1. **Full Name** (required)
   - Text input
   - Used for avatar generation

2. **Email Address** (required)
   - Email input
   - Mail icon prefix
   - Validation: email format

3. **Gender** (optional)
   - Dropdown selection
   - Options: Male, Female, Other, Prefer not to say

4. **Job Title** (optional)
   - Text input
   - Briefcase icon prefix
   - Example: "Product Manager"

5. **Phone Number** (optional)
   - Tel input
   - Phone icon prefix
   - Format: "+1 (555) 123-4567"

6. **Timezone** (required)
   - Dropdown selection
   - Globe icon prefix
   - Options:
     - Eastern Time (ET)
     - Central Time (CT)
     - Mountain Time (MT)
     - Pacific Time (PT)
     - Alaska Time (AKT)
     - Hawaii Time (HT)
     - London (GMT)
     - Paris (CET)
     - Tokyo (JST)
     - UTC

7. **Tags** (optional)
   - Text input (comma-separated)
   - Tag icon prefix
   - Example: "Product, Design, Leadership"
   - Help text: "Add tags to help others know your areas of expertise"

### 3. Associated Teams

**Team Display:**
- List of all teams user is a member of
- Each team shows:
  - Team icon (Users)
  - Team name
  - Project name
  - Role badge (color-coded)

**Role Badge Colors:**
```typescript
Owner:  bg-yellow-50, text-yellow-700, border-yellow-200
Admin:  bg-blue-50, text-blue-700, border-blue-200
Member: bg-green-50, text-green-700, border-green-200
Viewer: bg-gray-50, text-gray-700, border-gray-200
```

**Read-only:**
- Cannot change team membership from profile
- Must be managed from Team page
- Shows current status only

### 4. Preferences

**Theme Selector:**
- Dropdown: Light / Dark
- Only two options (no Auto)
- Applies to entire application
- Persists across sessions

**Removed Settings:**
- ❌ No Auto theme option
- ❌ No notification preferences
- ❌ No privacy settings
- ❌ No language selection

### 5. Account Actions

**Logout:**
- Button in Account Actions section
- Confirmation: "Are you sure you want to log out?"
- Logs user out
- Redirects to login page

**Delete Account:**
- Red warning section
- Shows what will be deleted:
  - Profile and personal information
  - All messages and conversations
  - Tasks and to-do lists
  - Files and folders created
  - Team memberships (non-owner)
- Confirmation dialog
- Type "DELETE" to confirm
- Permanent action (cannot be undone)
- Button disabled until typed correctly

## Data Structures

### User (from AuthContext)
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  gender?: string;
  job?: string;
  phone?: string;
  timezone: string;
  tags: string[];
  teams: TeamMembership[];
}

interface TeamMembership {
  teamId: string;
  teamName: string;
  projectName: string;
  role: UserRole;
}
```

## UI Components

### Profile Overview Card

```tsx
<Card>
  <CardContent>
    <div className="flex items-center gap-6">
      {/* Avatar */}
      <div className="relative">
        <Avatar className="size-24">
          <AvatarFallback>
            <img src={generateAvatar(user.name)} />
          </AvatarFallback>
        </Avatar>
        <button className="absolute bottom-0 right-0 size-8 bg-blue-600 rounded-full">
          <Camera className="size-4" />
        </button>
      </div>
      
      {/* Info */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        {user.job && <p className="text-sm text-gray-500">{user.job}</p>}
        
        <div className="flex gap-2 mt-3">
          {user.tags.map(tag => (
            <Badge variant="secondary">{tag}</Badge>
          ))}
        </div>
      </div>
    </div>
  </CardContent>
</Card>
```

### Personal Information Form

```tsx
<Card>
  <CardHeader>
    <CardTitle>Personal Information</CardTitle>
    <CardDescription>Update your personal details</CardDescription>
  </CardHeader>
  
  <CardContent>
    <div className="grid grid-cols-2 gap-4">
      {/* Name */}
      <div>
        <Label>Full Name</Label>
        <Input value={name} onChange={...} />
      </div>
      
      {/* Email */}
      <div>
        <Label>Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2" />
          <Input className="pl-10" value={email} onChange={...} />
        </div>
      </div>
      
      {/* Similar for other fields */}
    </div>
    
    <Button onClick={handleSaveProfile}>Save Changes</Button>
  </CardContent>
</Card>
```

### Associated Teams Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Associated Teams</CardTitle>
    <CardDescription>Teams you're a member of and your roles</CardDescription>
  </CardHeader>
  
  <CardContent>
    {user.teams.map(team => (
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center gap-3">
          <Users className="size-5 text-gray-400" />
          <div>
            <p className="font-medium">{team.teamName}</p>
            <p className="text-sm text-gray-600">{team.projectName}</p>
          </div>
        </div>
        <Badge className={getRoleBadgeColor(team.role)}>
          {team.role}
        </Badge>
      </div>
    ))}
  </CardContent>
</Card>
```

### Delete Account Dialog

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">
      <Trash2 className="size-4 mr-2" />
      Delete Account
    </Button>
  </DialogTrigger>
  
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete Account</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account.
      </DialogDescription>
    </DialogHeader>
    
    {/* Warning box */}
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-sm text-red-900 font-medium">This will delete:</p>
      <ul className="text-sm text-red-700 list-disc list-inside">
        <li>Your profile and personal information</li>
        <li>All your messages and conversations</li>
        <li>Your tasks and to-do lists</li>
        <li>Files and folders you've created</li>
        <li>Your team memberships (where you're not the owner)</li>
      </ul>
    </div>
    
    {/* Confirmation input */}
    <div>
      <Label>Type <strong>DELETE</strong> to confirm</Label>
      <Input
        value={deleteConfirmation}
        onChange={(e) => setDeleteConfirmation(e.target.value)}
        placeholder="DELETE"
      />
    </div>
    
    <Button
      variant="destructive"
      onClick={handleDeleteAccount}
      disabled={deleteConfirmation !== "DELETE"}
    >
      Permanently Delete Account
    </Button>
  </DialogContent>
</Dialog>
```

## User Interactions

### Edit Profile
1. User modifies any field in Personal Information
2. Fields update in real-time (controlled inputs)
3. Click "Save Changes" button
4. Alert: "Profile updated successfully!"
5. Updates persist in AuthContext
6. (In real app: API call to save)

### Upload Avatar
1. Click camera button on avatar
2. File picker opens (future enhancement)
3. Select image
4. Image uploaded and cropped
5. Avatar updates
6. (Currently simulated)

### Change Theme
1. Click theme dropdown
2. Select Light or Dark
3. Theme applies immediately
4. Preference saved
5. (Currently shows selection only)

### Logout
1. Click "Logout" button
2. Confirmation: "Are you sure you want to log out?"
3. Confirm
4. AuthContext logout() called
5. Redirect to /login

### Delete Account
1. Click "Delete Account" button
2. Dialog opens with warning
3. Read list of what will be deleted
4. Type "DELETE" in confirmation input
5. "Permanently Delete Account" button enables
6. Click button
7. Account deletion initiated
8. Alert: "Account deletion initiated"
9. (In real app: API call, then logout and redirect)

## Context Integration

### Auth Context
```typescript
const { user, userRole, updateUser, logout } = useAuth();
```

**Methods Used:**
- `user` - Get current user data
- `userRole` - Display role badge
- `updateUser()` - Save profile changes
- `logout()` - Sign out user

## State Management

### Form State
```typescript
const [name, setName] = useState(user?.name || "");
const [email, setEmail] = useState(user?.email || "");
const [gender, setGender] = useState(user?.gender || "");
const [job, setJob] = useState(user?.job || "");
const [phone, setPhone] = useState(user?.phone || "");
const [timezone, setTimezone] = useState(user?.timezone || "America/New_York");
const [tags, setTags] = useState(user?.tags.join(", ") || "");
const [theme, setTheme] = useState<'light' | 'dark'>('light');
```

### Delete State
```typescript
const [deleteConfirmation, setDeleteConfirmation] = useState("");
const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
```

## Helper Functions

### Get Role Badge Color
```typescript
const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "owner":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "admin":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "member":
      return "bg-green-50 text-green-700 border-green-200";
    case "viewer":
      return "bg-gray-50 text-gray-700 border-gray-200";
    default:
      return "";
  }
};
```

### Save Profile
```typescript
const handleSaveProfile = () => {
  updateUser({
    name,
    email,
    gender,
    job,
    phone,
    timezone,
    tags: tags.split(",").map((t) => t.trim()).filter((t) => t),
  });
  alert("Profile updated successfully!");
};
```

## Removed Features

- ❌ **Two-Factor Authentication (2FA)** - No security section
- ❌ **Active Sessions** - No session management
- ❌ **Notifications preferences** - No notification settings
- ❌ **Privacy settings** - No privacy controls
- ❌ **Auto theme option** - Only Light/Dark
- ❌ **Bio textarea** - No profile bio
- ❌ **Location input** - No location field
- ❌ **Language selector** - No multi-language
- ❌ **Social links** - No social media connections

**Rationale:** Keep profile focused on essential information and team context.

## Design System

### Colors
```css
/* Role Badges */
Owner:      bg-yellow-50, text-yellow-700, border-yellow-200
Admin:      bg-blue-50, text-blue-700, border-blue-200
Member:     bg-green-50, text-green-700, border-green-200
Viewer:     bg-gray-50, text-gray-700, border-gray-200

/* Actions */
Logout:     outline button
Delete:     destructive (red) button

/* Warning */
Delete box: bg-red-50, border-red-200, text-red-900
```

### Spacing
```css
Profile card:      gap-6 (avatar to info)
Form grid:         grid-cols-2 gap-4
Team list:         space-y-3
Card padding:      p-4 lg:p-6
```

### Typography
```css
Profile name:      text-2xl font-bold
Profile email:     text-gray-600
Job title:         text-sm text-gray-500
Section title:     (CardTitle from UI)
Form labels:       (Label from UI)
```

### Icons
```css
Avatar camera:     size-4
Form icons:        size-4 (Mail, Briefcase, Phone, Globe, Tag)
Team icon:         size-5
Action icons:      size-4 (LogOut, Trash2)
```

## Responsive Design

### Mobile (< 768px)
- Profile: Stack avatar and info vertically
- Form: Single column (grid-cols-1)
- Teams: Full width cards
- Buttons: Full width

### Desktop (>= 768px)
- Profile: Horizontal layout
- Form: Two columns (grid-cols-2)
- Teams: Card layout with flex
- Buttons: Auto width

## Accessibility

- ✅ Keyboard navigation
- ✅ ARIA labels on icon inputs
- ✅ Semantic HTML
- ✅ Focus indicators
- ✅ High contrast
- ✅ Clear labels
- ✅ Confirmation dialogs

## Testing Checklist

### Profile
- [ ] Can view own profile
- [ ] Avatar displays correctly
- [ ] Tags display correctly
- [ ] Job title shows (if set)

### Edit
- [ ] Can edit name
- [ ] Can edit email
- [ ] Can select gender
- [ ] Can edit job title
- [ ] Can edit phone
- [ ] Can select timezone
- [ ] Can edit tags (comma-separated)
- [ ] Save updates AuthContext

### Teams
- [ ] Associated teams display
- [ ] Role badges show correct colors
- [ ] Team names and projects show
- [ ] Read-only (no edit buttons)

### Preferences
- [ ] Can select theme
- [ ] Light/Dark options only
- [ ] No Auto option

### Actions
- [ ] Logout button works
- [ ] Logout confirmation works
- [ ] Delete dialog opens
- [ ] Warning list shows
- [ ] Type-to-confirm works
- [ ] Button disabled until "DELETE" typed
- [ ] Delete action triggers

## Future Enhancements

- Real avatar upload with cropper
- Two-factor authentication
- Active session management
- Notification preferences
- Privacy settings
- Language selection
- Profile bio/about section
- Location field
- Social media links
- Profile visibility settings
- Export user data
- Download profile archive
- Account suspension (vs deletion)
- Email preferences
- API key management

## Related Files

- `/src/app/contexts/AuthContext.tsx` - User data and methods
- `/src/app/components/ui/avatar.tsx` - Avatar component
- `/src/app/components/ui/badge.tsx` - Role badges
- `/src/app/components/ui/select.tsx` - Dropdowns

## Example Code

### Update User Data
```typescript
const handleSaveProfile = () => {
  updateUser({
    name,
    email,
    gender,
    job,
    phone,
    timezone,
    tags: tags.split(",").map((t) => t.trim()).filter((t) => t),
  });
  alert("Profile updated successfully!");
};
```

### Logout Flow
```typescript
const handleLogout = () => {
  if (confirm("Are you sure you want to log out?")) {
    logout();
    navigate("/login");
  }
};
```

### Delete Account Flow
```typescript
const handleDeleteAccount = () => {
  if (deleteConfirmation === "DELETE") {
    alert("Account deletion initiated. This would normally delete your account.");
    setDeleteDialogOpen(false);
    setDeleteConfirmation("");
    // In real app: API call, then logout and redirect
  }
};
```

---

**Page Version**: 2.0 (Simplified Profile)  
**Last Updated**: March 22, 2026  
**Status**: Complete  
**Associated Teams**: ✅  
**2FA/Sessions Removed**: ✅
