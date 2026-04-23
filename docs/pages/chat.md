# Chat Page

## Purpose

The Chat page provides a Discord-style messaging system with text channels, personal DMs, and voice-only channels. Features a collapsible sidebar and role-based permissions for each channel type.

## Location

`/src/app/pages/Chat.tsx`

## Route

`/chat`

## User Roles & Permissions

### Owner, Admin
- ✅ Create text/voice channels
- ✅ Edit channel settings
- ✅ Manage channel permissions
- ✅ Delete channels
- ✅ Send messages (if channel permits)
- ✅ Join voice channels

### Member
- ✅ Send messages (if channel permits)
- ✅ Join voice channels
- ✅ Create DMs
- ❌ Cannot manage channels

### Viewer
- ✅ View channels and messages (read-only)
- ❌ Cannot send messages
- ❌ Cannot join voice
- ❌ Cannot create channels/DMs

## Features

### 1. Collapsible Sidebar

**Functionality:**
- Collapse/expand button (chevron icon)
- Collapsed: Shows only icons (width: 16px on desktop)
- Expanded: Shows full channel list (width: 256px on desktop)
- Smooth transition animation (duration: 300ms)

**States:**
- `sidebarCollapsed: boolean` - controls visibility
- Persists during session

### 2. Text Channels

**Channel Properties:**
- Name (lowercase, e.g., "general", "announcements")
- Hash icon (#)
- Team-wide visibility
- Granular permissions

**Features:**
- Message sending
- Reply to messages
- Edit messages (if permitted)
- Delete messages (if permitted)
- Media attachments
- Emoji in channel names not supported (clean Discord style)

**Default Channels:**
- #general - All members can write
- #announcements - Only admins can write

### 3. Voice Channels

**Channel Properties:**
- Name (e.g., "Team Voice", "Casual Chat")
- Volume icon (🔊)
- Voice-only (no text chat)
- Join/Leave functionality

**Features:**
- Join voice channel
- Leave voice channel
- Connected indicator (green background)
- Participant count display
- "🎙️ Connected • X participant(s)" status

**Voice Channel UI:**
- Clicking opens large centered view
- Volume icon (size-16)
- Join/Leave button
- No text input (voice only)

### 4. Direct Messages (DMs)

**DM Properties:**
- One-on-one conversations
- User icon (👤)
- User name as channel name
- Private to two participants

**Features:**
- Start DM with any team member
- Same messaging features as text channels
- Personal message history
- No permissions needed

**DM Creation:**
- Plus button in DMs section
- Select user from team
- Creates new DM channel

### 5. Channel Permissions

**Granular Permission System:**

For **Text Channels**, control:
- **Write**: Who can send messages
- **Read**: Who can view messages
- **Delete**: Who can delete any message
- **Modify**: Who can edit any message
- **Notify**: Who can send @all notifications
- **Allow AI**: Enable AI in this channel

For **Voice Channels**, control:
- Who can join
- Who can manage (admins only)

**Permission Roles:**
Each permission can be assigned to:
- Owner
- Admin
- Member
- Viewer

**Example Configurations:**
```typescript
// Public channel - everyone can write
{
  write: ['owner', 'admin', 'member'],
  read: ['owner', 'admin', 'member', 'viewer'],
  delete: ['owner', 'admin'],
  modify: ['owner', 'admin'],
  notify: ['owner', 'admin'],
  allowAi: true
}

// Announcements - admin only write
{
  write: ['owner', 'admin'],
  read: ['owner', 'admin', 'member', 'viewer'],
  delete: ['owner', 'admin'],
  modify: ['owner', 'admin'],
  notify: ['owner', 'admin'],
  allowAi: false
}
```

### 6. Message Features

**Message Properties:**
- User avatar
- User name
- Timestamp
- Message content
- Optional media attachments
- Optional reply reference
- Edit indicator

**Message Actions:**
- **Reply**: Quote and respond to message
- **Edit**: Modify own message (shows "edited" badge)
- **Delete**: Remove message (own or if permitted)

**Reply System:**
- Shows quoted message above reply
- Border-left indicator
- Original author name
- Truncated original message
- Cancel reply button (X)

**Edit System:**
- Pre-fills input with message text
- Blue indicator "Editing message..."
- Cancel edit button (X)
- Saves with "edited" badge

## Data Structures

### Channel
```typescript
interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice' | 'dm';
  teamId?: string;           // undefined for DMs
  dmUserId?: string;         // other user ID for DMs
  dmUserName?: string;       // other user name for DMs
  createdBy: string;
  permissions: ChannelPermissions;
  members: string[];
}
```

### ChannelPermissions
```typescript
interface ChannelPermissions {
  write: UserRole[];
  read: UserRole[];
  delete: UserRole[];
  modify: UserRole[];
  notify: UserRole[];
  allowAi: boolean;
}
```

### ChatMessage
```typescript
interface ChatMessage {
  id: string;
  channelId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  message: string;
  media?: string[];
  replyTo?: string;          // Message ID being replied to
  timestamp: string;         // ISO datetime
  edited?: boolean;
}
```

## UI Components

### Page Layout

**Sidebar (Collapsible):**
- Collapse/expand button in header
- Three sections:
  1. Text Channels
  2. Voice Channels
  3. Direct Messages
- Each section has:
  - Header with label and + button (if permitted)
  - List of channels
  - Settings icon per channel (if permitted)

**Chat Area:**
- Header with channel info
- Messages area (scrollable)
- Input area (if permitted)

### Sidebar Sections

**Text Channels:**
```tsx
<h3>TEXT CHANNELS</h3>
<button onClick={create}>+</button>

{textChannels.map(channel => (
  <button>
    <Hash /> {channel.name}
  </button>
))}
```

**Voice Channels:**
```tsx
<h3>VOICE CHANNELS</h3>
<button onClick={create}>+</button>

{voiceChannels.map(channel => (
  <button>
    <Volume2 /> {channel.name}
  </button>
  {isConnected && (
    <div>🎙️ Connected • X participant(s)</div>
  )}
))}
```

**Direct Messages:**
```tsx
<h3>DIRECT MESSAGES</h3>
<button onClick={create}>+</button>

{dmChannels.map(channel => (
  <button>
    <User /> {channel.name}
  </button>
))}
```

### Channel Header

**Text/DM Channel:**
```tsx
<Hash /> {channelName}
{memberCount} members
```

**Voice Channel:**
```tsx
<Volume2 /> {channelName}
{isConnected ? "You're connected" : "Join to start talking"}
```

### Message Display

```tsx
<Avatar>{initials}</Avatar>

<div>
  <span>{userName}</span>
  <span>{time}</span>
  {edited && <Badge>edited</Badge>}
  
  {replyTo && (
    <div className="border-l-2">
      {repliedUserName}: {repliedMessage}
    </div>
  )}
  
  <p>{message}</p>
  
  {media && media.map(file => (
    <Badge>📎 {file}</Badge>
  ))}
  
  <div className="opacity-0 group-hover:opacity-100">
    <button>Reply</button>
    <button>Edit</button>
    <button>Delete</button>
  </div>
</div>
```

### Input Area

**With Reply:**
```tsx
<div className="bg-gray-50">
  Replying to {userName}: {message.substring(0, 50)}...
  <button onClick={cancel}>×</button>
</div>
```

**With Edit:**
```tsx
<div className="bg-blue-50">
  Editing message...
  <button onClick={cancel}>×</button>
</div>
```

**Input Row:**
```tsx
<Button><Upload /></Button>
<Input placeholder="Message #{channelName}" />
<Button><Send /></Button>
```

## User Interactions

### Create Text Channel (Admin)
1. Click + in Text Channels section
2. Dialog opens
3. Enter channel name
4. Set permissions (who can write, read, etc.)
5. Toggle "Allow AI in this channel"
6. Click "Create Channel"
7. Channel added to sidebar

### Create Voice Channel (Admin)
1. Click + in Voice Channels section
2. Dialog opens (simplified - no AI toggle)
3. Enter channel name
4. Click "Create Channel"
5. Voice channel added to sidebar

### Join Voice Channel
1. Click voice channel in sidebar
2. Main area shows large join UI
3. Click "Join Voice Channel" button
4. Green indicator shows "🎙️ Connected"
5. Channel in sidebar shows connected state
6. Click "Leave Voice Channel" to disconnect

### Send Message
1. Select text channel or DM
2. Type message in input
3. Press Enter or click Send
4. Message appears in chat
5. Input clears

### Reply to Message
1. Hover over message
2. Click "Reply" button
3. Quoted message appears above input
4. Type response
5. Send message
6. Reply includes reference to original

### Edit Message
1. Hover over own message
2. Click "Edit" button
3. Message text loads into input
4. Blue "Editing..." indicator shows
5. Modify message
6. Send updated message
7. Message shows "edited" badge

### Delete Message
1. Hover over message
2. Click "Delete" button
3. Confirmation dialog
4. Confirm deletion
5. Message removed

### Toggle Sidebar
1. Click chevron button in sidebar header
2. Sidebar collapses to 16px (icons only)
3. Click again to expand
4. Smooth animation transition

## Permission Checks

### Can Manage Channels
```typescript
const canManageChannels = hasPermission("manage_groups") || hasPermission("*");

{canManageChannels && <Button>Create Channel</Button>}
```

### Can Write in Channel
```typescript
const canWrite = selectedChannel && userRole && 
  selectedChannel.permissions.write.includes(userRole);

{canWrite ? <Input /> : <p>No write permission</p>}
```

### Can Delete Message
```typescript
const canDelete = selectedChannel && userRole && 
  selectedChannel.permissions.delete.includes(userRole);

{(canDelete || isOwnMessage) && <Button>Delete</Button>}
```

## Context Integration

### Auth Context
```typescript
const { user, userRole, hasPermission } = useAuth();
```

**Used For:**
- Permission checks
- Setting message author
- Displaying user info
- Role-based UI

## State Management

### Channel State
```typescript
const [channels, setChannels] = useState<Channel[]>(mockChannels);
const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
const [inVoiceChannel, setInVoiceChannel] = useState<string | null>(null);
```

### Message State
```typescript
const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
const [messageInput, setMessageInput] = useState("");
const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
const [editingMessage, setEditingMessage] = useState<ChatMessage | null>(null);
```

### Channel Form State
```typescript
const [channelDialogOpen, setChannelDialogOpen] = useState(false);
const [editingChannel, setEditingChannel] = useState<Channel | null>(null);
const [channelName, setChannelName] = useState("");
const [channelType, setChannelType] = useState<'text' | 'voice'>('text');
const [permWrite, setPermWrite] = useState<UserRole[]>([...]);
// ... other permissions
```

## Mock Data

### Mock Channels
```typescript
const mockChannels: Channel[] = [
  {
    id: "text-1",
    name: "general",
    type: "text",
    teamId: "team-1",
    createdBy: "user-1",
    permissions: defaultPermissions,
    members: ["user-1", "user-2", "user-3"],
  },
  {
    id: "voice-1",
    name: "Team Voice",
    type: "voice",
    teamId: "team-1",
    createdBy: "user-1",
    permissions: defaultPermissions,
    members: ["user-1", "user-2"],
  },
  {
    id: "dm-1",
    name: "Sarah Johnson",
    type: "dm",
    dmUserId: "user-2",
    dmUserName: "Sarah Johnson",
    createdBy: "user-1",
    permissions: defaultPermissions,
    members: ["user-1", "user-2"],
  },
];
```

## Removed Features

- ❌ **Video calls** - No video chat integration
- ❌ **Emoji reactions** - No 😀👍 reactions on messages
- ❌ **Typing indicators** - No "User is typing..."
- ❌ **Read receipts** - No message read status
- ❌ **Message search** - No search functionality
- ❌ **Pinned messages** - No pin feature
- ❌ **Threads** - No threaded conversations

**Rationale:** Keep the chat simple and focused on core messaging.

## Design System

### Colors
```css
/* Channel Types */
Text:    Hash icon, default gray
Voice:   Volume2 icon, default gray
DM:      User icon, default gray

/* States */
Selected:   bg-blue-50, text-blue-600
Connected:  bg-green-50, text-green-600
Hover:      bg-gray-50

/* Messages */
Own message reply indicator:    bg-gray-50
Edit indicator:                 bg-blue-50
Reply quote border:             border-l-2 border-gray-300
```

### Spacing
```css
Sidebar:          w-64 (expanded), w-16 (collapsed)
Section gap:      gap-4
Channel gap:      gap-1
Message gap:      gap-4
Padding:          p-4
```

### Typography
```css
Section headers:  text-xs font-semibold uppercase text-gray-500
Channel names:    text-sm font-medium
Message author:   font-medium text-sm
Message text:     text-sm
Timestamps:       text-xs text-gray-500
```

### Icons
```css
Hash:       size-4
Volume2:    size-4
User:       size-4
Send:       size-4
Upload:     size-4
Settings:   size-3
Plus:       size-3
Edit:       size-3
Trash:      size-3
Reply:      size-3
```

## Responsive Design

### Mobile (< 1024px)
- Sidebar: Full width, stacked above chat
- Border bottom instead of border right
- Single column layout
- Collapsible sidebar still works

### Desktop (>= 1024px)
- Sidebar: Left column (w-64 or w-16)
- Chat: Right column (flex-1)
- Side-by-side layout
- Border right on sidebar

## Accessibility

- ✅ Keyboard navigation
- ✅ ARIA labels on icon buttons
- ✅ Semantic HTML (header, main)
- ✅ Focus indicators
- ✅ Screen reader friendly
- ✅ High contrast colors
- ✅ Clear hover states

## Testing Checklist

### Channels
- [ ] Can create text channel (admin)
- [ ] Can create voice channel (admin)
- [ ] Can edit channel settings
- [ ] Can delete channel
- [ ] Permissions save correctly
- [ ] Channel filtering works

### Voice
- [ ] Can join voice channel
- [ ] Can leave voice channel
- [ ] Connected indicator shows
- [ ] Participant count updates
- [ ] Only one voice channel at a time

### Messages
- [ ] Can send message
- [ ] Can reply to message
- [ ] Can edit own message
- [ ] Can delete message (if permitted)
- [ ] Reply reference shows correctly
- [ ] Edited badge appears

### Sidebar
- [ ] Collapsible toggle works
- [ ] Smooth animation
- [ ] Channels organized by type
- [ ] Selected channel highlights
- [ ] + buttons only for admins

### Permissions
- [ ] Viewer mode works (read-only)
- [ ] Member can send messages (if channel permits)
- [ ] Admin can manage channels
- [ ] Permission checks enforce

### General
- [ ] Mobile responsive
- [ ] Messages scroll to bottom
- [ ] Empty states show
- [ ] Confirmations work

## Future Enhancements

- Message search across channels
- Typing indicators
- Read receipts
- Pinned messages
- Threads/replies
- Emoji reactions
- GIF support
- File drag-and-drop
- Voice chat audio (WebRTC)
- Screen sharing
- Channel categories
- Channel archiving
- Message history export
- @mentions autocomplete
- Channel mute/notifications

## Related Files

- `/src/app/contexts/AuthContext.tsx` - User permissions
- `/src/app/components/ui/avatar.tsx` - User avatars
- `/src/app/components/ui/dialog.tsx` - Channel creation
- `/src/app/components/ui/switch.tsx` - Permission toggles

## Example Code

### Create Text Channel Dialog
```tsx
<DialogContent>
  <DialogHeader>
    <DialogTitle>Create Channel</DialogTitle>
  </DialogHeader>
  
  <Input
    value={channelName}
    onChange={(e) => setChannelName(e.target.value)}
    placeholder="e.g., general, announcements"
  />
  
  <Select value={channelType} onValueChange={setChannelType}>
    <SelectItem value="text">Text Channel</SelectItem>
    <SelectItem value="voice">Voice Channel</SelectItem>
  </Select>
  
  {channelType === 'text' && (
    <div>
      <Switch checked={allowAi} onCheckedChange={setAllowAi} />
      <Label>Allow AI in this channel</Label>
    </div>
  )}
  
  <Button onClick={handleCreateChannel}>Create Channel</Button>
</DialogContent>
```

### Voice Channel Join UI
```tsx
<div className="flex-1 flex items-center justify-center">
  <Volume2 className="size-16 text-gray-400" />
  <h3>{selectedChannel.name}</h3>
  <p>
    {inVoiceChannel === selectedChannel.id 
      ? `You're connected • ${participantCount} participant(s)`
      : 'Join this voice channel to start talking'}
  </p>
  <Button
    variant={inVoiceChannel === selectedChannel.id ? "destructive" : "default"}
    onClick={() => inVoiceChannel === selectedChannel.id 
      ? handleLeaveVoice() 
      : handleJoinVoice(selectedChannel.id)}
  >
    {inVoiceChannel === selectedChannel.id ? (
      <><MicOff /> Leave Voice Channel</>
    ) : (
      <><Mic /> Join Voice Channel</>
    )}
  </Button>
</div>
```

---

**Page Version**: 2.0 (Discord-Style Rebuild)  
**Last Updated**: March 22, 2026  
**Status**: Complete  
**Collapsible Sidebar**: ✅  
**Voice Channels**: ✅  
**Direct Messages**: ✅
