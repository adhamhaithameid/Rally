# File System Page

## Purpose

The File System page provides an FTP/Git-like interface for managing team files and folders with granular permission control at the file and folder level.

## Location

`/src/app/pages/FileSystem.tsx`

## Route

`/files`

## User Roles & Permissions

### Permission-Based Access
Unlike other pages, file system access is determined by **individual file/folder permissions**, not just user role.

**Owner (of file/folder):**
- ✅ Full control over their files
- ✅ Can set permissions
- ✅ Can delete

**Role-Based Defaults:**
- **Viewer**: Can only view files they have read permission for
- **Member**: Can create files/folders in permitted locations
- **Admin/Owner**: Can manage permissions on any file/folder

## Features

### 1. Tree Navigation

**Breadcrumb Path:**
- Home icon (/) for root
- Clickable path segments
- Shows current location
- Separator: /

**Navigation:**
- Click folder to enter
- ".." button to go up one level
- Home button to jump to root
- Path segments clickable for quick navigation

**Example Path:**
```
🏠 / Design Assets / Mockups
```

### 2. File & Folder Operations

**Create Folder:**
- Name input
- Creates in current path
- Auto-assigns default permissions
- Owner: current user

**Upload File:**
- File name input
- File size input (bytes, simulated)
- Creates in current path
- Auto-assigns default permissions
- Owner: current user

**Download File:**
- Click download button
- Simulates file download
- Requires read permission

**Delete File/Folder:**
- Click delete button
- Confirmation required
- Deletes file and all children (for folders)
- Requires delete permission

### 3. Granular Permissions

**Per File/Folder Permissions:**

Each file or folder has:
- **Owner**: User who created it or was assigned ownership
- **Read**: Roles that can view/download
- **Write**: Roles that can modify
- **Delete**: Roles that can remove

**Permission Levels:**
- Owner
- Admin
- Member
- Viewer

**Permission Management:**
- Lock icon button on files/folders
- Opens permissions dialog
- Only owner or platform owner can manage
- Multi-select roles per permission type

**Example:**
```typescript
{
  owner: "user-1",
  read: ['owner', 'admin', 'member', 'viewer'],
  write: ['owner', 'admin', 'member'],
  delete: ['owner', 'admin'],
}
```

### 4. File Information

**Displayed Info:**
- File/folder icon
- Name
- Size (for files, formatted: B, KB, MB, GB)
- Modified date/time
- Owner badge (if you're the owner)

**File Size Formatting:**
```typescript
0 B
1.5 KB
2.4 MB
1.2 GB
```

**Date Formatting:**
```typescript
"Mar 22, 2026, 2:30 PM"
```

### 5. File/Folder List

**Columns (visual):**
- Icon (Folder 📁 or File 📄)
- Name
- Size (files only)
- Modified date
- Actions (if permitted)

**Sorting:**
- Folders first
- Then files
- Alphabetical within each group

**Actions:**
- 🔒 Manage permissions (owner/admin)
- ⬇️ Download (files only)
- 🗑️ Delete (if permitted)

## Data Structures

### FileNode
```typescript
interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;              // Full path: /folder/subfolder/file.txt
  size?: number;             // Bytes, files only
  permissions: FilePermissions;
  createdBy: string;
  createdAt: string;
  modifiedAt: string;
  parent?: string;           // Parent folder ID
}
```

### FilePermissions
```typescript
interface FilePermissions {
  owner: string;             // User ID
  read: UserRole[];
  write: UserRole[];
  delete: UserRole[];
}
```

## UI Components

### Page Layout

**Viewer Mode:**
- Simplified read-only view
- No create/upload buttons
- No action buttons on files

**Active Mode:**
- Breadcrumb navigation
- New Folder + Upload File buttons
- Full file list with actions

### Breadcrumb Navigation

```tsx
<div className="flex items-center gap-2">
  <button onClick={goToRoot}>
    <Home className="size-4" />
  </button>
  
  <span>/</span>
  
  {path.map((segment, idx) => (
    <>
      <button onClick={() => navigateTo(idx)}>
        {segment}
      </button>
      <span>/</span>
    </>
  ))}
</div>
```

### File/Folder Row

```tsx
<div className="flex items-center justify-between p-3 border rounded-lg">
  <button onClick={navigate} className="flex items-center gap-3">
    {type === 'folder' ? (
      <Folder className="size-5 text-blue-600" />
    ) : (
      <FileIcon className="size-5 text-gray-600" />
    )}
    
    <div>
      <p className="font-medium">{name}</p>
      <p className="text-xs text-gray-500">
        {size && `${formatSize(size)} • `}
        Modified {formatDate(modifiedAt)}
      </p>
    </div>
  </button>
  
  <div className="flex gap-1">
    {canManagePermissions && (
      <Button onClick={openPermissions}>
        <Lock className="size-4" />
      </Button>
    )}
    
    {type === 'file' && (
      <Button onClick={download}>
        <Download className="size-4" />
      </Button>
    )}
    
    {canDelete && (
      <Button onClick={deleteNode}>
        <Trash2 className="size-4" />
      </Button>
    )}
  </div>
</div>
```

### Permissions Dialog

```tsx
<DialogContent>
  <DialogHeader>
    <DialogTitle>Manage Permissions</DialogTitle>
    <DialogDescription>
      Set who can read, write, and delete "{fileName}"
    </DialogDescription>
  </DialogHeader>
  
  <div className="space-y-4">
    <div>
      <Label>Who can read?</Label>
      <div className="grid grid-cols-4 gap-2">
        {['owner', 'admin', 'member', 'viewer'].map(role => (
          <button
            onClick={() => toggleRead(role)}
            className={permRead.includes(role) ? 'active' : 'inactive'}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
    
    <div>
      <Label>Who can write/modify?</Label>
      {/* Same as above */}
    </div>
    
    <div>
      <Label>Who can delete?</Label>
      {/* Same as above */}
    </div>
    
    <Button onClick={updatePermissions}>
      Update Permissions
    </Button>
  </div>
</DialogContent>
```

## User Interactions

### Navigate to Folder
1. Click folder name or icon
2. Path updates
3. File list shows folder contents
4. Breadcrumb updates

### Go Up One Level
1. Click ".." button
2. Returns to parent folder
3. Path updates
4. File list refreshes

### Go to Root
1. Click Home icon in breadcrumb
2. Jumps to root directory (/)
3. Path clears
4. Shows root files

### Create Folder
1. Click "New Folder" button
2. Dialog opens
3. Enter folder name
4. Click "Create Folder"
5. Folder created in current path
6. Default permissions applied
7. Folder appears in list

### Upload File
1. Click "Upload File" button
2. Dialog opens
3. Enter file name
4. Enter file size (simulated)
5. Click "Upload File"
6. File created in current path
7. Default permissions applied
8. File appears in list

### Download File
1. Click download icon on file
2. Alert shows "Downloading {fileName}..."
3. (In real app: file download initiates)

### Delete File/Folder
1. Click delete icon
2. Confirmation: "Delete {name}?" (+ warning if folder)
3. Confirm deletion
4. File/folder and children removed
5. List updates

### Manage Permissions
1. Click lock icon on file/folder
2. Permissions dialog opens
3. Toggle roles for read/write/delete
4. Click "Update Permissions"
5. Permissions saved
6. Dialog closes

## Permission Checks

### Can Read
```typescript
const canRead = (node: FileNode) => {
  if (!userRole) return false;
  if (node.permissions.owner === user?.id) return true;
  return node.permissions.read.includes(userRole);
};
```

### Can Write
```typescript
const canWrite = (node: FileNode) => {
  if (!userRole) return false;
  if (node.permissions.owner === user?.id) return true;
  return node.permissions.write.includes(userRole);
};
```

### Can Delete
```typescript
const canDelete = (node: FileNode) => {
  if (!userRole) return false;
  if (node.permissions.owner === user?.id) return true;
  return node.permissions.delete.includes(userRole);
};
```

### Can Create in Path
```typescript
const canCreateInCurrentPath = () => {
  if (!userRole) return false;
  if (userRole === 'viewer') return false;
  
  if (currentPath.length === 0) {
    return ['owner', 'admin', 'member'].includes(userRole);
  }
  
  const currentFolder = findFolder(currentPath);
  return currentFolder ? canWrite(currentFolder) : false;
};
```

## Context Integration

### Auth Context
```typescript
const { user, userRole } = useAuth();
```

**Used For:**
- Permission checks
- Setting file owner
- Determining create capability

## Helper Functions

### Format File Size
```typescript
const formatFileSize = (bytes: number | undefined) => {
  if (!bytes) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
};

// Examples:
// 0 -> "0 B"
// 1024 -> "1 KB"
// 2457600 -> "2.34 MB"
```

### Format Date
```typescript
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { 
    month: "short", 
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
};

// Example: "Mar 22, 2026, 2:30 PM"
```

## State Management

### Navigation State
```typescript
const [currentPath, setCurrentPath] = useState<string[]>([]);
// [] = root
// ['Design Assets'] = /Design Assets
// ['Design Assets', 'Mockups'] = /Design Assets/Mockups
```

### File System State
```typescript
const [fileSystem, setFileSystem] = useState<FileNode[]>(mockFileSystem);
const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);
```

### Form State
```typescript
// Folder
const [folderDialogOpen, setFolderDialogOpen] = useState(false);
const [folderName, setFolderName] = useState("");

// File
const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
const [fileName, setFileName] = useState("");
const [fileSize, setFileSize] = useState("");

// Permissions
const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
const [editingNode, setEditingNode] = useState<FileNode | null>(null);
const [permRead, setPermRead] = useState<UserRole[]>([...]);
const [permWrite, setPermWrite] = useState<UserRole[]>([...]);
const [permDelete, setPermDelete] = useState<UserRole[]>([...]);
```

## Mock Data

```typescript
const mockFileSystem: FileNode[] = [
  {
    id: 'folder-1',
    name: 'Design Assets',
    type: 'folder',
    path: '/Design Assets',
    permissions: defaultPermissions,
    createdBy: 'user-1',
    createdAt: '2026-03-01T10:00:00',
    modifiedAt: '2026-03-15T14:30:00',
  },
  {
    id: 'file-1',
    name: 'dashboard-mockup.fig',
    type: 'file',
    path: '/Design Assets/dashboard-mockup.fig',
    size: 2457600,  // ~2.4 MB
    permissions: defaultPermissions,
    createdBy: 'user-1',
    createdAt: '2026-03-10T09:00:00',
    modifiedAt: '2026-03-15T14:30:00',
    parent: 'folder-1',
  },
  // ...
];
```

## Removed Features

- ❌ **Storage section** - No "Your current storage usage"
- ❌ **Storage quota** - No usage limits display
- ❌ **Storage meter** - No progress bar
- ❌ **File preview** - No inline file viewing
- ❌ **File versioning** - No version history
- ❌ **Share links** - No public file sharing

**Rationale:** Focus on core file management and permissions.

## Design System

### Colors
```css
Folder:        text-blue-600
File:          text-gray-600
Owner badge:   bg-yellow-50, text-yellow-700

Permissions active:   bg-blue-100, text-blue-700, border-blue-300
Permissions inactive: bg-gray-100, text-gray-600, border-gray-300
```

### Icons
```css
Folder:       size-5
File:         size-5
Home:         size-4
Lock:         size-4
Download:     size-4
Trash:        size-4
Plus:         size-4
```

### Spacing
```css
File row padding:      p-3
Icon-text gap:         gap-3
Action buttons gap:    gap-1
Grid columns:          grid-cols-4 (permission toggles)
```

## Responsive Design

### Mobile (< 1024px)
- Single column layout
- Stack breadcrumb path
- Full-width file rows
- Action buttons remain visible

### Desktop (>= 1024px)
- Single column (max-w-7xl)
- Horizontal breadcrumb
- File rows with actions on right
- Hover effects on rows

## Accessibility

- ✅ Keyboard navigation
- ✅ ARIA labels on icon buttons
- ✅ Semantic HTML
- ✅ Focus indicators
- ✅ High contrast colors
- ✅ Clear hover states
- ✅ Confirmation dialogs

## Testing Checklist

### Navigation
- [ ] Can enter folders
- [ ] Can go up with ".."
- [ ] Home button goes to root
- [ ] Breadcrumb path clickable
- [ ] Path updates correctly

### File Operations
- [ ] Can create folder
- [ ] Can upload file (simulated)
- [ ] Can download file
- [ ] Can delete file
- [ ] Can delete folder (with children)

### Permissions
- [ ] Owner can manage permissions
- [ ] Platform owner can manage any file
- [ ] Permission toggles work
- [ ] Permissions enforce on operations
- [ ] Viewer can only see permitted files

### General
- [ ] File size formats correctly
- [ ] Dates format correctly
- [ ] Owner badge shows
- [ ] Empty states work
- [ ] Confirmations work

## Future Enhancements

- Real file upload (drag & drop)
- File preview (images, PDFs)
- File versioning
- File search
- Bulk operations
- Share links with expiry
- File comments
- File tags/labels
- Folder colors
- Recent files
- Starred/favorites
- Trash/recycle bin
- File activity log
- Export folder as zip
- Cloud storage sync

## Related Files

- `/src/app/contexts/AuthContext.tsx` - User permissions
- `/src/app/components/ui/dialog.tsx` - Dialogs
- `/src/app/components/ui/badge.tsx` - Owner badge

---

**Page Version**: 2.0 (FTP-Style with Permissions)  
**Last Updated**: March 22, 2026  
**Status**: Complete  
**Granular Permissions**: ✅  
**Storage Stats Removed**: ✅
