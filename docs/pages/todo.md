# To-Do Page

## Purpose

The To-Do page provides a task management system with multiple lists, priority levels, emoji support (Microsoft To Do style), and deadline tracking. Users can organize tasks into color-coded lists and track progress with filtering options.

## Location

`/src/app/pages/Todo.tsx`

## Route

`/todo`

## User Roles & Permissions

### Owner, Admin, Member
- ✅ Create lists
- ✅ Edit own lists
- ✅ Delete own lists
- ✅ Create tasks
- ✅ Edit tasks
- ✅ Delete tasks
- ✅ Toggle task completion
- ✅ Filter tasks

### Viewer
- ✅ View lists
- ✅ View tasks
- ❌ Cannot create/edit/delete
- ❌ Cannot toggle completion

## Features

### 1. List Management (CRUD)

**Create List**
- Name (required)
- Description (optional)
- Color (8 preset colors)

**Edit List**
- Update name, description, color
- Dialog interface

**Delete List**
- Confirmation required
- Deletes list and all its tasks
- Warning about data loss

**List Display**
- Sidebar with all lists
- Color indicator
- "All Lists" option to view all tasks
- Edit/Delete buttons (if permitted)

### 2. Task Management (CRUD)

**Create Task**
- **Emoji** (optional) - Separated from title like Microsoft To Do
  - 30 common emojis to choose from
  - Displayed separately before title
  - Can be added or removed
- **Title** (required)
- **List** assignment (required)
- **Priority** (Low/Medium/High/Urgent)
- **Deadline** (optional)
- **Description** (optional)
- **Mentions** (comma-separated user IDs)

**Edit Task**
- Update any field
- Move to different list
- Change priority/deadline
- Add/remove emoji

**Delete Task**
- Confirmation dialog
- Permanent deletion

**Toggle Completion**
- Checkbox to mark complete/incomplete
- Visual strikethrough when completed
- Affects filtering

### 3. Emoji System (Microsoft To Do Style)

**Features:**
- Emoji picker with 30 common emojis
- Emoji rendered separately from title
- Large emoji display (text-2xl)
- Remove emoji button (X)
- Optional - tasks can have no emoji
- Grid layout emoji picker

**Common Emojis:**
📝 ✅ 🎯 🔥 💡 📅 🚀 ⭐ 💼 📊 🎨 🔧 📱 💻 📧 📞 🏠 🍕 ✈️ 🎉 ❤️ 👍 ⚡ 🌟 🎵 📚 🔔 🎁 🌈 🔑

### 4. Priority System

**Levels:**
- **Low** - Green (bg-green-50, text-green-600)
- **Medium** - Yellow (bg-yellow-50, text-yellow-600)
- **High** - Orange (bg-orange-50, text-orange-600)

**Sorting:**
Tasks sorted by:
1. Completion status (active first)
2. Priority (high → low)
3. Deadline (earliest first)

### 5. Filtering

**Filter Options:**
- **All** - Show all tasks
- **Active** - Only incomplete tasks
- **Completed** - Only completed tasks

**Toggle Buttons:**
- Blue highlight for active filter
- Located in header next to "Add Task"

### 6. Deadline System

**Features:**
- Optional date picker
- Smart date display:
  - "Today" for today
  - "Tomorrow" for tomorrow
  - "Mar 22" for other dates
- Overdue indication:
  - Red border on task
  - Red background (bg-red-50)
  - "(Overdue)" text in badge

### 7. Mentions System

**Features:**
- Comma-separated user IDs
- Stored as array in task
- Badge showing mention count
- Input field in task form

## Data Structures

### TodoList
```typescript
interface TodoList {
  id: string;
  name: string;
  color: string;         // Hex color
  description: string;
  teamId: string;
  createdBy: string;
}
```

### Task
```typescript
interface Task {
  id: string;
  listId: string;
  emoji?: string;        // Single emoji, optional
  title: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  deadline?: string;     // ISO date string
  completed: boolean;
  description: string;
  mentions: string[];    // User IDs
  createdBy: string;
  createdAt: string;     // ISO datetime
}
```

### List Colors
```typescript
const LIST_COLORS = [
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
- Simplified read-only view
- No checkboxes or action buttons
- Clean task display

**Active Mode (Member/Admin/Owner):**
- 4-column grid (1 sidebar + 3 main)
- Lists on left
- Tasks on right
- Full CRUD capabilities

### List Sidebar
- "All Lists" button
- Individual list buttons with:
  - Color dot
  - List name
  - Selection highlight
  - Edit/Delete buttons (if permitted)
- "+" button to create new list

### Task Display
- Checkbox (if permitted)
- Emoji (if set) - separate, large
- Title (bold, strikethrough if completed)
- Description (smaller text)
- Badges:
  - Priority (color-coded)
  - Deadline (with icon)
  - List (with color dot)
  - Mentions count
- Edit/Delete buttons (if permitted)

### List Dialog
- Name input
- Description textarea
- Color picker (4x2 grid)
- Create/Update button

### Task Dialog
- Emoji picker section
  - Show selected emoji (large) with remove button
  - OR "Add Emoji" button
  - Emoji grid (10 columns)
- Title input
- List selector dropdown
- Priority dropdown (Low/Medium/High/Urgent)
- Deadline date picker
- Description textarea
- Mentions input
- Create/Update button
- Scrollable content

### Filter Buttons
- Pill-style toggle group
- Blue highlight for active
- Border around group

## User Interactions

### Create List
1. User clicks "+" in lists sidebar
2. Dialog opens
3. User enters name, description
4. User selects color from grid
5. User clicks "Create List"
6. List added to sidebar
7. Dialog closes

### Create Task
1. User clicks "Add Task" button
2. Dialog opens
3. User optionally selects emoji
4. User enters title (required)
5. User selects list, priority, deadline (optional)
6. User enters description, mentions (optional)
7. User clicks "Create Task"
8. Task added to list
9. Dialog closes

### Select Emoji
1. In task dialog, user clicks "Add Emoji"
2. Emoji grid appears
3. User clicks desired emoji
4. Emoji selected and grid closes
5. Large emoji displayed with remove button

### Toggle Task Completion
1. User clicks checkbox next to task
2. Task marked complete/incomplete
3. Visual feedback (strikethrough)
4. Task re-sorted in list

### Filter Tasks
1. User clicks filter button (All/Active/Completed)
2. Tasks filtered immediately
3. Button highlighted in blue
4. Count updates

### Edit Task
1. User clicks edit icon on task
2. Dialog opens with current values
3. User modifies fields
4. User clicks "Update Task"
5. Task updated
6. Dialog closes

### Delete Task/List
1. User clicks delete icon
2. Confirmation dialog appears
3. User confirms
4. Item deleted
5. UI updates

## Permission Checks

### Can Create/Edit
```typescript
const canCreate = userRole !== 'viewer';

{canCreate && <Button>Add Task</Button>}
```

## Context Integration

### Auth Context
```typescript
const { userRole, user } = useAuth();
```

**Used For:**
- Permission checks
- Setting createdBy field
- Displaying role badge

## Helper Functions

### formatDate(dateStr: string)
Formats deadline dates intelligently:
```typescript
"Today" | "Tomorrow" | "Mar 22"
```

## State Management

### List State
```typescript
const [lists, setLists] = useState<TodoList[]>(mockLists);
const [listDialogOpen, setListDialogOpen] = useState(false);
const [editingList, setEditingList] = useState<TodoList | null>(null);
const [listName, setListName] = useState("");
const [listColor, setListColor] = useState(LIST_COLORS[0].value);
const [listDescription, setListDescription] = useState("");
```

### Task State
```typescript
const [tasks, setTasks] = useState<Task[]>(mockTasks);
const [taskDialogOpen, setTaskDialogOpen] = useState(false);
const [editingTask, setEditingTask] = useState<Task | null>(null);
const [taskEmoji, setTaskEmoji] = useState<string | undefined>(undefined);
const [showEmojiPicker, setShowEmojiPicker] = useState(false);
const [taskTitle, setTaskTitle] = useState("");
const [taskPriority, setTaskPriority] = useState<Priority>("medium");
const [taskDeadline, setTaskDeadline] = useState("");
const [taskDescription, setTaskDescription] = useState("");
const [taskMentions, setTaskMentions] = useState("");
const [taskList, setTaskList] = useState(selectedList || lists[0]?.id || "");
```

### View State
```typescript
const [selectedList, setSelectedList] = useState<string | null>(lists[0]?.id || null);
const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
```

## Mock Data

### Mock Lists
```typescript
const mockLists: TodoList[] = [
  {
    id: "list-1",
    name: "Personal Tasks",
    color: "#3B82F6",
    description: "My personal to-do items",
    teamId: "team-1",
    createdBy: "user-1",
  },
  // ...
];
```

### Mock Tasks
```typescript
const mockTasks: Task[] = [
  {
    id: "task-1",
    listId: "list-1",
    emoji: "📝",
    title: "Review design mockups",
    priority: "high",
    deadline: "2026-03-23",
    completed: false,
    description: "Review the new dashboard designs",
    mentions: ["user-2"],
    createdBy: "user-1",
    createdAt: "2026-03-22T09:00:00",
  },
  // ...
];
```

## Removed Features

- ❌ **Total tasks stat** - Simplified header
- ❌ **Active count** - Removed counter
- ❌ **Completed count** - Removed counter
- ❌ **Progress bar** - No visual progress indicator

**Rationale:** Focus on actual task management, not metrics.

## Design System

### Colors (Solid Only)
```css
/* Priority Colors */
Low:     #10B981 (green-600)
Medium:  #F59E0B (yellow-600)
High:    #F97316 (orange-600)

/* List Colors */
8 preset colors (Blue, Green, Purple, Red, Orange, Pink, Teal, Yellow)

/* Overdue */
Border:   border-red-200
Background: bg-red-50
Text:     text-red-600
```

### Spacing
- Task padding: p-3
- List sidebar gap: gap-2
- Grid gap: gap-6
- Emoji picker gap: gap-1

### Typography
- Task title: font-medium
- Description: text-sm text-gray-600
- Badges: text-xs
- Emoji: text-2xl (in task), text-3xl (when selected)

## Responsive Design

### Mobile (< 1024px)
- Single column layout
- Lists above tasks (stacked)
- Full-width buttons
- Emoji picker: 10 columns (wraps on mobile)

### Desktop (>= 1024px)
- 4-column grid
- Sidebar: 1 column
- Tasks: 3 columns
- Side-by-side layout

## Accessibility

- ✅ Keyboard navigation
- ✅ Checkbox for task completion
- ✅ ARIA labels on icon buttons
- ✅ High contrast colors
- ✅ Focus indicators
- ✅ Semantic HTML
- ✅ Color + text for priority (not color alone)

## Testing Checklist

### Lists
- [ ] Can create list
- [ ] Can edit list
- [ ] Can delete list (with confirmation)
- [ ] Can select list to filter
- [ ] Color picker works
- [ ] "All Lists" shows all tasks

### Tasks
- [ ] Can create task
- [ ] Can edit task
- [ ] Can delete task (with confirmation)
- [ ] Can toggle completion
- [ ] Can add emoji
- [ ] Can remove emoji
- [ ] Emoji displayed separately
- [ ] Priority colors correct
- [ ] Deadline formatting works
- [ ] Overdue tasks highlighted
- [ ] Mentions stored correctly

### Filtering
- [ ] "All" shows all tasks
- [ ] "Active" shows only incomplete
- [ ] "Completed" shows only completed
- [ ] Filter state persists during session

### Permissions
- [ ] Viewer mode works (read-only)
- [ ] Member/Admin/Owner can create/edit
- [ ] Checkboxes only for non-viewers
- [ ] Action buttons only for non-viewers

### General
- [ ] Mobile responsive
- [ ] Dialogs scroll when content long
- [ ] Empty states show
- [ ] Confirmations work
- [ ] Sorting works (completed, priority, deadline)

## Future Enhancements

- Subtasks/checklist items
- Task templates
- Recurring tasks
- Task attachments
- Task comments
- Drag-and-drop reordering
- List sharing/permissions
- Task assignment to team members
- Time tracking
- Task history/activity log
- Custom emoji upload
- Task search
- Batch operations
- Export to CSV/PDF
- Calendar view of deadlines
- Task dependencies

## Related Files

- `/src/app/contexts/AuthContext.tsx` - User permissions
- `/src/app/components/ui/card.tsx` - Card component
- `/src/app/components/ui/dialog.tsx` - Dialogs
- `/src/app/components/ui/checkbox.tsx` - Task completion
- `/src/app/components/ui/select.tsx` - Dropdowns
- `/src/app/components/ui/badge.tsx` - Priority/list badges

## Example Code

### Emoji Picker
```tsx
{showEmojiPicker && !taskEmoji && (
  <div className="grid grid-cols-10 gap-1 p-2 border rounded-lg bg-gray-50">
    {COMMON_EMOJIS.map((emoji) => (
      <button
        key={emoji}
        onClick={() => {
          setTaskEmoji(emoji);
          setShowEmojiPicker(false);
        }}
        className="text-2xl hover:bg-gray-200 rounded p-1"
      >
        {emoji}
      </button>
    ))}
  </div>
)}
```

### Task Display with Emoji
```tsx
<div className="flex items-start gap-3">
  <Checkbox checked={task.completed} onCheckedChange={() => handleToggleTask(task.id)} />
  
  {task.emoji && (
    <span className="text-2xl leading-none mt-0.5">{task.emoji}</span>
  )}
  
  <div className="flex-1">
    <p className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>
      {task.title}
    </p>
  </div>
</div>
```

### Priority Badge
```tsx
<Badge className={`${PRIORITY_CONFIG[task.priority].bgColor} ${PRIORITY_CONFIG[task.priority].color} text-xs`}>
  {PRIORITY_CONFIG[task.priority].label}
</Badge>
```

---

**Page Version**: 2.0 (Complete Rebuild)  
**Last Updated**: March 22, 2026  
**Status**: Complete  
**Microsoft To Do Emoji**: ✅  
**Priority System**: ✅  
**Stats Removed**: ✅