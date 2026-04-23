# AI Chat Page

## Purpose

The AI Chat page provides an AI assistant interface styled like Google Gemini, with platform-wide actions for managing calendar events, tasks, and internet search capabilities.

## Location

`/src/app/pages/AIChat.tsx`

## Route

`/ai-chat`

## User Roles & Permissions

### Owner, Admin, Member
- ✅ Create AI chats
- ✅ Rename chats
- ✅ Delete chats
- ✅ Send messages
- ✅ Use platform actions
- ✅ Toggle internet search

### Viewer
- ❌ **Blocked from AI Chat**
- Shows "AI Assistant requires an active role" message
- Must upgrade to Member or higher

## Features

### 1. Gemini-Style Interface

**Empty Chat Greeting:**
- Sparkle icon (✨)
- "Hi [FirstName]" personalized greeting
- Large heading: "Where should we start?"
- 6 suggested action chips in grid layout

**Suggested Prompts:**
1. 🖼️ Create image
2. 🎸 Create music
3. ✍️ Write anything
4. 🎥 Create video
5. 🚀 Boost my day
6. 📚 Help me learn

**Layout:**
- First row: 4 chips (grid-cols-4)
- Second row: 2 chips (grid-cols-2)
- Clean, spacious design
- Rounded cards (rounded-2xl)
- Hover effects

### 2. Platform Actions

**Calendar Actions:**
- **Search Events**: "What meetings do I have this week?"
  - Action badge: 📅 Searched Calendar
  - Returns calendar events matching query
- **Create Event**: "Schedule a team meeting for tomorrow at 2pm"
  - Action badge: 📅 Created Event
  - Extracts details and creates calendar event

**Task Actions:**
- **Search Tasks**: "Show my high priority tasks"
  - Action badge: ✅ Searched Tasks
  - Returns matching to-do tasks
- **Create Task**: "Add task to review design mockups"
  - Action badge: ✅ Created Task
  - Creates new task in to-do list

**Internet Search:**
- Toggle "Internet search" (on/off)
- When enabled, searches web instead of platform
- Action badge: 🌐 Searched Internet
- Orange indicator when active

### 3. Chat Management

**Create Chat:**
- Plus button in sidebar
- Dialog: Enter chat name
- New chat appears in sidebar
- Automatically selects new chat

**Rename Chat:**
- Edit button next to chat
- Dialog: Enter new name
- Updates chat name
- Preserves all messages

**Delete Chat:**
- Trash button next to chat
- Confirmation: "Delete this chat? Cannot be undone."
- Removes chat and all messages
- Selects another chat if available

### 4. Message Interface

**Gemini-Style Input:**
- Rounded container (rounded-3xl)
- Gray background (bg-gray-50)
- Components:
  - Plus button (left)
  - Text input (center, borderless)
  - Dropdown: Platform / Web Search
  - Microphone button
  - Send button (right)

**Placeholder:** "Ask Platform AI..."

**Input Features:**
- Enter to send (Shift+Enter for new line)
- Auto-clears on send
- Disabled while streaming

### 5. Streaming Responses

**Simulation:**
- Animated typing dots (3 dots, staggered bounce)
- 500ms delay before response
- Detects user intent from message
- Generates contextual response

**Intent Detection:**
- Keywords: "event", "meeting", "calendar" → calendar actions
- Keywords: "task", "todo", "to-do" → task actions
- Internet search on → web search
- Default → helpful guidance

**Response Format:**
- AI avatar: Blue circle with sparkle icon
- Message in gray bubble (bg-gray-100)
- Rounded design (rounded-2xl)
- Action badges below message
- Timestamp

### 6. Action Badges

**Visual Indicators:**
Each action shows a badge with:
- Icon (📅 🌐 ✅)
- Label: "Searched Calendar", "Created Event", etc.
- Outline style
- Appears below AI responses

**Action Types:**
- `search_events` → 📅 Searched Calendar
- `create_event` → 📅 Created Event
- `search_todos` → ✅ Searched Tasks
- `create_todo` → ✅ Created Task
- `search_internet` → 🌐 Searched Internet

## Data Structures

### AIChat
```typescript
interface AIChat {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  messages: AIMessage[];
}
```

### AIMessage
```typescript
interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  media?: string[];
  actions?: AIAction[];
  streaming?: boolean;
}
```

### AIAction
```typescript
interface AIAction {
  type: 'search_events' | 'create_event' | 'search_todos' | 'create_todo' | 'search_internet';
  params: Record<string, any>;
  result: any;
}
```

## UI Components

### Empty Chat State

```tsx
<div className="flex flex-col items-center justify-center h-full">
  {/* Greeting */}
  <div className="flex items-center gap-2 mb-6">
    <Sparkles className="size-6 text-blue-600" />
    <h2 className="text-2xl">Hi {userName}</h2>
  </div>
  
  {/* Main prompt */}
  <h1 className="text-4xl lg:text-5xl font-normal mb-12">
    Where should we start?
  </h1>
  
  {/* Suggested prompts */}
  <div className="w-full max-w-2xl space-y-3">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {suggestedPrompts.slice(0, 4).map(prompt => (
        <button className="p-4 border rounded-2xl hover:bg-gray-50">
          <span className="text-2xl mb-2">{prompt.emoji}</span>
          <p className="text-sm font-medium">{prompt.label}</p>
        </button>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-3">
      {suggestedPrompts.slice(4).map(prompt => (
        <button className="p-4 border rounded-2xl hover:bg-gray-50">
          <span className="text-2xl mb-2">{prompt.emoji}</span>
          <p className="text-sm font-medium">{prompt.label}</p>
        </button>
      ))}
    </div>
  </div>
</div>
```

### Message Display

```tsx
{/* User message */}
<div className="flex gap-3 justify-end">
  <div className="inline-block p-4 rounded-2xl bg-blue-600 text-white">
    <p className="text-sm">{message.content}</p>
  </div>
  <Avatar>{userInitial}</Avatar>
</div>

{/* AI message */}
<div className="flex gap-3">
  <div className="size-8 rounded-full bg-blue-600 flex items-center justify-center">
    <Sparkles className="size-4 text-white" />
  </div>
  
  <div>
    <div className="inline-block p-4 rounded-2xl bg-gray-100">
      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
    </div>
    
    {message.actions && (
      <div className="flex flex-wrap gap-2 mt-2">
        {message.actions.map(action => (
          <Badge variant="outline">
            {getActionIcon(action.type)}
            <span>{getActionLabel(action.type)}</span>
          </Badge>
        ))}
      </div>
    )}
    
    <p className="text-xs text-gray-500 mt-1">{formatTime(timestamp)}</p>
  </div>
</div>
```

### Input Area

```tsx
<div className="p-4 lg:p-6 border-t">
  <div className="max-w-3xl mx-auto">
    {/* Internet search indicator */}
    {internetSearch && (
      <div className="mb-3 p-2 bg-orange-50 border border-orange-200 rounded-lg">
        <Globe className="size-4 text-orange-600" />
        <span className="text-orange-700">Internet search enabled</span>
      </div>
    )}
    
    {/* Input row */}
    <div className="flex items-end gap-2 p-3 bg-gray-50 rounded-3xl">
      <Button variant="ghost" size="sm" className="rounded-full">
        <Plus className="size-5" />
      </Button>
      
      <Input
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
        placeholder="Ask Platform AI..."
        className="flex-1 border-0 bg-transparent focus-visible:ring-0"
        disabled={isStreaming}
      />
      
      <Select value={internetSearch ? "web" : "platform"}>
        <SelectTrigger className="w-auto border-0 bg-transparent">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="platform">Platform</SelectItem>
          <SelectItem value="web">Web Search</SelectItem>
        </SelectContent>
      </Select>
      
      <Button variant="ghost" size="sm" className="rounded-full">
        <Mic className="size-5" />
      </Button>
      
      <Button onClick={handleSendMessage} size="sm" className="rounded-full">
        <Send className="size-4" />
      </Button>
    </div>
  </div>
</div>
```

### Streaming Indicator

```tsx
<div className="flex gap-3">
  <div className="size-8 rounded-full bg-blue-600">
    <Sparkles className="size-4 text-white" />
  </div>
  
  <div className="inline-block p-4 rounded-2xl bg-gray-100">
    <div className="flex gap-1">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
           style={{ animationDelay: '0.2s' }} />
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
           style={{ animationDelay: '0.4s' }} />
    </div>
  </div>
</div>
```

## User Interactions

### Start New Chat
1. Click + in sidebar
2. Dialog opens: "New Chat"
3. Enter chat name
4. Click "Create Chat"
5. New chat added and selected
6. Empty state with greeting shows

### Send Message
1. Type message in input
2. Press Enter or click Send
3. User message appears (right, blue)
4. Streaming indicator shows
5. AI response appears (left, gray)
6. Action badges show if applicable
7. Input clears

### Use Suggested Prompt
1. Click suggested action chip
2. Prompt text fills input
3. User can edit or send immediately
4. Sends like normal message

### Toggle Internet Search
1. Click dropdown in input area
2. Select "Web Search" or "Platform"
3. Orange indicator shows if web search
4. Next message uses selected mode
5. Action badge reflects search type

### Rename Chat
1. Click edit icon next to chat
2. Dialog opens with current name
3. Enter new name
4. Click "Rename"
5. Chat name updates in sidebar

### Delete Chat
1. Click trash icon next to chat
2. Confirmation: "Delete this chat? Cannot be undone."
3. Confirm deletion
4. Chat removed from sidebar
5. Selects first available chat (or shows empty)

## Action Detection Logic

```typescript
const lowerMsg = userMessage.toLowerCase();

if (lowerMsg.includes('event') || lowerMsg.includes('meeting') || lowerMsg.includes('calendar')) {
  if (lowerMsg.includes('create') || lowerMsg.includes('schedule')) {
    // Create event action
    actions.push({
      type: 'create_event',
      params: { extracted_from_message: userMessage },
      result: { success: true, event_id: 'event-new' }
    });
  } else {
    // Search events action
    actions.push({
      type: 'search_events',
      params: { query: userMessage },
      result: { count: 2 }
    });
  }
}

// Similar for tasks and internet search
```

## Context Integration

### Auth Context
```typescript
const { user, userRole } = useAuth();
```

**Used For:**
- Blocking viewers
- Personalizing greeting
- Setting message author

## State Management

### Chat State
```typescript
const [chats, setChats] = useState<AIChat[]>(mockChats);
const [selectedChat, setSelectedChat] = useState<AIChat | null>(null);
```

### Message State
```typescript
const [messageInput, setMessageInput] = useState("");
const [isStreaming, setIsStreaming] = useState(false);
const [internetSearch, setInternetSearch] = useState(false);
```

### Dialog State
```typescript
const [chatDialogOpen, setChatDialogOpen] = useState(false);
const [editingChat, setEditingChat] = useState<AIChat | null>(null);
const [chatName, setChatName] = useState("");
```

## Mock Data

```typescript
const mockChats: AIChat[] = [
  {
    id: 'chat-1',
    name: 'General Assistant',
    userId: 'user-1',
    createdAt: '2026-03-22T09:00:00',
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'What meetings do I have this week?',
        timestamp: '2026-03-22T09:00:00',
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: "I found 3 meetings...",
        timestamp: '2026-03-22T09:00:10',
        actions: [{
          type: 'search_events',
          params: { timeframe: 'this_week' },
          result: { count: 3 }
        }],
      },
    ],
  },
];
```

## Suggested Prompts

```typescript
const SUGGESTED_PROMPTS = [
  { icon: ImageIcon, label: "Create image", emoji: "🖼️" },
  { icon: Music, label: "Create music", emoji: "🎸" },
  { icon: Pencil, label: "Write anything", emoji: "✍️" },
  { icon: Video, label: "Create video", emoji: "🎥" },
  { icon: TrendingUp, label: "Boost my day", emoji: "🚀" },
  { icon: GraduationCap, label: "Help me learn", emoji: "📚" },
];
```

## Removed Features

- ❌ **Like button** - No thumbs up on responses
- ❌ **Dislike button** - No thumbs down on responses
- ❌ **Regenerate button** - No re-generate response
- ❌ **Copy button** - No copy to clipboard
- ❌ **Share button** - No share conversation

**Rationale:** Keep interface clean and focused.

## Design System

### Colors
```css
/* AI Elements */
AI avatar:        bg-blue-600
AI message:       bg-gray-100, text-gray-900

/* User Elements */
User message:     bg-blue-600, text-white
User avatar:      bg-gray-300, text-gray-700

/* Indicators */
Internet search:  bg-orange-50, border-orange-200, text-orange-700
Streaming:        bg-gray-400 (dots)

/* Suggested chips */
Chip background:  border border-gray-200
Chip hover:       bg-gray-50
```

### Spacing
```css
Main padding:       p-4 lg:p-8
Input container:    p-3 (inside rounded-3xl)
Message gap:        gap-3
Chip gap:           gap-3
Empty state gap:    mb-6, mb-12
```

### Typography
```css
Greeting:           text-2xl
Main heading:       text-4xl lg:text-5xl, font-normal
Chip label:         text-sm font-medium
Message:            text-sm, whitespace-pre-wrap
Timestamp:          text-xs text-gray-500
```

### Radius
```css
Input container:    rounded-3xl
Message bubbles:    rounded-2xl
Suggested chips:    rounded-2xl
Avatar:             rounded-full
Buttons:            rounded-full
```

## Responsive Design

### Mobile (< 1024px)
- Sidebar: Full width, stacked
- Heading: text-4xl
- Chips: 2 columns
- Messages: Full width bubbles

### Desktop (>= 1024px)
- Sidebar: w-64, left column
- Heading: text-5xl
- Chips: 4 columns (first row)
- Messages: max-w-3xl, centered

## Accessibility

- ✅ Keyboard navigation
- ✅ ARIA labels on buttons
- ✅ Focus indicators
- ✅ High contrast
- ✅ Screen reader friendly
- ✅ Clear button labels

## Testing Checklist

### Chats
- [ ] Can create new chat
- [ ] Can rename chat
- [ ] Can delete chat
- [ ] Chat selection works
- [ ] Messages persist per chat

### Messages
- [ ] Can send message
- [ ] Streaming animation works
- [ ] AI response appears
- [ ] Action badges show
- [ ] Timestamps display

### Actions
- [ ] Calendar search detected
- [ ] Calendar create detected
- [ ] Task search detected
- [ ] Task create detected
- [ ] Internet search works

### Interface
- [ ] Greeting shows with user name
- [ ] Suggested prompts work
- [ ] Internet search toggle works
- [ ] Input clears after send
- [ ] Disabled while streaming

### Permissions
- [ ] Viewer blocked completely
- [ ] Member/Admin/Owner can use
- [ ] Empty state for blocked users

## Future Enhancements

- Real AI integration (OpenAI, Anthropic, Gemini)
- Actual platform actions (real API calls)
- Voice input (Web Speech API)
- Image generation
- File attachments
- Code syntax highlighting
- Export conversation
- Conversation search
- Conversation folders
- AI model selection
- Temperature/settings control
- Token usage display
- Cost tracking

## Related Files

- `/src/app/contexts/AuthContext.tsx` - User permissions
- `/src/app/components/ui/select.tsx` - Platform/Web dropdown
- `/src/app/components/ui/dialog.tsx` - Chat management

---

**Page Version**: 2.0 (Gemini-Style Interface)  
**Last Updated**: March 22, 2026  
**Status**: Complete  
**Gemini UI**: ✅  
**Platform Actions**: ✅  
**Like/Dislike Removed**: ✅
