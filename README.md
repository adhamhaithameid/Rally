# Platform-IO - Team Collaboration Workspace

**Version**: 2.0 (Major Refactor)  
**Status**: In Development (40% Complete)  
**Last Updated**: March 22, 2026

---

## Overview

Platform-IO is a comprehensive team productivity platform with role-based access control, designed for teams to collaborate on projects through integrated tools for chat, tasks, calendars, files, and AI assistance.

### Key Features

- 🔐 **4-Tier Role-Based Access Control** (Owner, Admin, Member, Viewer)
- 👥 **One Team = One Project** model
- 📅 **Multi-Calendar System** with color coding and events
- ✅ **Task Management** with lists and priorities
- 💬 **Team Chat** with permissions and voice
- 📁 **FTP-Style File System** with permissions
- 🤖 **AI Assistant** with platform-wide actions
- 🎨 **No Gradients** - Solid colors only
- ♿ **Accessible** - WCAG 2.1 AA compliant
- 📱 **Responsive** - Mobile-first design

---

## Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure

```
platform-io/
├── src/
│   ├── app/
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx          # RBAC & user management
│   │   │   └── OnboardingContext.tsx    # Tour system
│   │   ├── components/
│   │   │   ├── ui/                      # Reusable components
│   │   │   ├── onboarding/              # Tour components
│   │   │   └── Layout.tsx               # Main layout with sidebar
│   │   ├── pages/
│   │   │   ├── Landing.tsx              # Public landing
│   │   │   ├── Login.tsx                # Authentication
│   │   │   ├── Signup.tsx               # Registration
│   │   │   ├── TeamSelection.tsx        # Choose/create team
│   │   │   ├── Dashboard.tsx            # ✅ Main dashboard
│   │   │   ├── Team.tsx                 # ✅ Team management
│   │   │   ├── CalendarPage.tsx         # ✅ Calendar & events
│   │   │   ├── Todo.tsx                 # 🔄 Task management
│   │   │   ├── Chat.tsx                 # 🔄 Messaging
│   │   │   ├── FileSystem.tsx           # 🔄 File management
│   │   │   ├── AIChat.tsx               # 🔄 AI assistant
│   │   │   └── Profile.tsx              # 🔄 User profile
│   │   ├── routes.ts                    # Route configuration
│   │   └── App.tsx                      # App root
│   └── styles/
│       ├── index.css                    # Main styles
│       ├── tailwind.css                 # Tailwind v4
│       ├── theme.css                    # Design tokens
│       └── fonts.css                    # Font imports
├── docs/
│   ├── README.md                        # Main documentation
│   ├── design-system.md                 # Design system
│   ├── colors.md                        # Color palette
│   ├── components.md                    # Component docs
│   ├── onboarding-system.md             # Tour system
│   └── pages/                           # Page-specific docs
│       ├── dashboard.md                 # ✅
│       ├── team.md                      # ✅
│       ├── calendar.md                  # ✅
│       ├── todo.md                      # 🔄
│       ├── chat.md                      # 🔄
│       ├── files.md                     # 🔄
│       ├── ai-chat.md                   # 🔄
│       └── profile.md                   # 🔄
├── IMPLEMENTATION-SPEC.md               # Implementation guide
├── PROJECT-STATUS.md                    # Current status
├── REFACTOR-PROGRESS.md                 # Progress tracker
└── package.json
```

**Legend**: ✅ Complete | 🔄 In Progress

---

## User Roles & Permissions

### Owner 👑
- Manage admins (promote/demote)
- Manage all team data (name, project, description)
- Edit team avatar and settings
- **All admin permissions**

### Admin 🛡️
- Manage members (add/remove/change roles)
- Manage calendars and events (CRUD)
- Manage chat groups and permissions
- Cannot modify owner or team core data

### Member 👥
- Normal interaction with all features
- Create tasks, send messages, upload files
- View all content
- Cannot manage others

### Viewer 👁️
- Read-only access to all content
- Special viewer mode UI
- Cannot create or modify anything

---

## Pages

### ✅ Dashboard (`/dashboard`)
Your team's activity hub

**Features:**
- Quick actions (Create Task, New Message, Add Event, Ask AI)
- Recent activity feed
- Upcoming events
- Team overview
- Onboarding tour for new users

**Documentation**: `/docs/pages/dashboard.md`

### ✅ Team (`/team`)
Team and project management

**Features:**
- Team info (name, project name, description, tags)
- Invitation link (shareable, no pending invites)
- Member management with role-based permissions
- Avatar (auto-generated or uploaded)
- Role permissions reference

**Documentation**: `/docs/pages/team.md`

### ✅ Calendar (`/calendar`)
Multi-calendar system with events

**Features:**
- **Calendars** (Admin/Owner): name, color (8 presets)
- **Events** (Admin/Owner): title, description, start, end, all-day, timezone, recurrence rule
- Calendar filtering
- iCalendar RRULE support
- Timezone selection

**Documentation**: `/docs/pages/calendar.md`

### 🔄 To-Do (`/todo`)
Task management with lists

**Features:**
- **Lists**: name, color, description
- **Tasks**: emoji (separate from title), title, priority (4 levels), deadline, completed, description, mentions
- Like Microsoft To Do emoji system
- No stats displayed

**Documentation**: `/docs/pages/todo.md` (pending)  
**Specification**: `/IMPLEMENTATION-SPEC.md` - To-Do section

### 🔄 Chat (`/chat`)
Team messaging with permissions

**Features:**
- **Groups** (Admin): name, type (text/voice), permissions
- **Permissions**: write, read, delete, modify, notify, allow-ai
- **Messages**: text, media, reply, timestamps
- Voice chat (join/leave)
- No video calls or emoji reactions

**Documentation**: `/docs/pages/chat.md` (pending)  
**Specification**: `/IMPLEMENTATION-SPEC.md` - Chat section

### 🔄 Files (`/files`)
FTP-style file system

**Features:**
- Tree view navigation
- Files & folders with permissions
- Upload, download, view, delete
- Permission system (per file/folder)
- No storage quotas/usage display

**Documentation**: `/docs/pages/files.md` (pending)  
**Specification**: `/IMPLEMENTATION-SPEC.md` - File System section

### 🔄 AI Chat (`/ai-chat`)
AI assistant with platform actions

**Features:**
- Chat management (CRUD)
- Streamed responses
- Platform actions (search/create events, search/create todos)
- Internet search option
- Media/file upload
- No like/dislike buttons

**Documentation**: `/docs/pages/ai-chat.md` (pending)  
**Specification**: `/IMPLEMENTATION-SPEC.md` - AI Chat section

### 🔄 Profile (`/profile`)
User profile and settings

**Features:**
- Personal info (name, gender, job, phone, timezone, email, tags)
- Avatar upload
- Associated teams with roles
- Logout
- Delete account
- Theme selector (light/dark, no auto)
- No 2FA, sessions, notifications, privacy settings

**Documentation**: `/docs/pages/profile.md` (pending)  
**Specification**: `/IMPLEMENTATION-SPEC.md` - Profile section

---

## Technology Stack

### Core
- **React** 18.3.1 - UI framework
- **TypeScript** - Type safety
- **Vite** 6.3.5 - Build tool
- **React Router** 7.13.0 - Routing (Data mode)

### Styling
- **Tailwind CSS** 4.1.12 - Utility-first CSS
- **Radix UI** - Accessible primitives
- **Lucide React** 0.487.0 - Icons

### State Management
- **React Context** - Global state (Auth, Onboarding)
- **useState** - Local state
- No external state library

---

## Design System

### Principles

1. **No Gradients** ✅
   - Only solid colors
   - Better accessibility
   - Consistent appearance
   - Print-friendly

2. **Accessibility First** ♿
   - WCAG 2.1 AA compliant
   - High contrast colors
   - Keyboard navigation
   - Screen reader support
   - Semantic HTML

3. **Mobile-First** 📱
   - Responsive by default
   - Touch-friendly
   - Progressive enhancement

4. **Consistency** 🎯
   - Uniform patterns
   - Reusable components
   - Predictable behavior

### Colors (Solid Only)

```css
/* Primary */
Blue:    #3B82F6 (blue-600)

/* Semantic */
Success: #10B981 (green-600)
Warning: #F59E0B (yellow-600)
Danger:  #EF4444 (red-600)
Info:    #8B5CF6 (purple-600)

/* Roles */
Owner:   #F59E0B (yellow-600)
Admin:   #3B82F6 (blue-600)
Member:  #10B981 (green-600)
Viewer:  #6B7280 (gray-600)

/* Text */
Primary:   #111827 (gray-900)
Secondary: #4B5563 (gray-600)
Tertiary:  #6B7280 (gray-500)

/* Backgrounds */
White:     #FFFFFF
Light:     #F9FAFB (gray-50)
```

### Typography

```css
Page Title:     text-3xl font-bold
Section Title:  text-xl font-semibold
Card Title:     text-lg font-medium
Body:           text-base
Small:          text-sm
Caption:        text-xs
```

### Spacing

```css
Page:     p-4 lg:p-8
Section:  mb-6 mb-8
Card:     p-4 p-6
Gap:      gap-2 gap-3 gap-4 gap-6
```

**Full Details**: `/docs/design-system.md`

---

## Role-Based Access Control (RBAC)

### Permission System

```typescript
// Check permission
const canManage = hasPermission('manage_calendars');

// Owner has all permissions
hasPermission('*') // Returns true for owner

// Conditional rendering
{hasPermission('manage_members') && (
  <Button>Add Member</Button>
)}
```

### Permission Matrix

| Feature | Owner | Admin | Member | Viewer |
|---------|-------|-------|--------|--------|
| Edit team data | ✅ | ❌ | ❌ | ❌ |
| Manage admins | ✅ | ❌ | ❌ | ❌ |
| Manage members | ✅ | ✅ | ❌ | ❌ |
| Manage calendars | ✅ | ✅ | ❌ | ❌ |
| Create events | ✅ | ✅ | ❌ | ❌ |
| Create tasks | ✅ | ✅ | ✅ | ❌ |
| Send messages | ✅ | ✅ | ✅ | ❌ |
| Upload files | ✅ | ✅ | ✅ | ❌ |
| View content | ✅ | ✅ | ✅ | ✅ |

---

## Development

### Prerequisites
- Node.js 18+
- npm or pnpm

### Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Type check
npx tsc --noEmit
```

### Environment Setup

No environment variables required for development. Uses mock data.

### Code Style

- **TypeScript** strict mode
- **ESLint** for linting
- **Prettier** for formatting (recommended)
- Follow existing patterns

---

## Testing

### Manual Testing Checklist

For each page:
- [ ] Test as Owner
- [ ] Test as Admin
- [ ] Test as Member
- [ ] Test as Viewer
- [ ] Mobile responsive
- [ ] Tablet responsive
- [ ] Desktop responsive
- [ ] Keyboard navigation
- [ ] Screen reader compatible
- [ ] No gradients used
- [ ] Colors meet contrast
- [ ] Loading states work
- [ ] Error states work
- [ ] Empty states work

### Testing with Different Roles

1. Modify mock user role in `/src/app/contexts/AuthContext.tsx`
2. Change `role` in team membership
3. Refresh page
4. Test features

---

## Documentation

### Quick Links

- **[Implementation Spec](/IMPLEMENTATION-SPEC.md)** - Guide for remaining pages
- **[Project Status](/PROJECT-STATUS.md)** - Current progress
- **[Design System](/docs/design-system.md)** - Design guidelines
- **[Onboarding System](/docs/onboarding-system.md)** - Tour system
- **[Page Docs](/docs/pages/)** - Individual page documentation

### Writing Documentation

Use template in `/IMPLEMENTATION-SPEC.md` for new pages:

1. Purpose
2. User Roles & Permissions
3. Features
4. Data Structures
5. UI Components
6. User Interactions
7. Examples
8. Testing Checklist

---

## Deployment

### Build

```bash
npm run build
```

Output: `/dist` directory

### Requirements

- Node.js server or static hosting
- HTTPS recommended
- Modern browser support

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

---

## Contributing

### Before Contributing

1. Read `/IMPLEMENTATION-SPEC.md`
2. Check `/PROJECT-STATUS.md` for current work
3. Follow design system (no gradients!)
4. Test with all user roles
5. Document your changes

### Pull Request Process

1. Create feature branch
2. Implement changes
3. Test thoroughly (all roles)
4. Update documentation
5. Submit PR with description

---

## Project Status

**Completed** (40%):
- ✅ Auth & RBAC system
- ✅ Dashboard page
- ✅ Team page
- ✅ Calendar page
- ✅ Onboarding tour
- ✅ Documentation infrastructure

**In Progress** (60%):
- 🔄 To-Do page
- 🔄 Chat page
- 🔄 File System page
- 🔄 AI Chat page
- 🔄 Profile page
- 🔄 Remaining documentation

**See**: `/PROJECT-STATUS.md` for detailed progress

---

## Key Decisions

### One Team = One Project
Each team has exactly one project. To start a new project, create a new team.

**Rationale**: Simplifies management, clear ownership, easier permissions.

### No Gradients
All backgrounds use solid colors only.

**Rationale**: Better accessibility, consistent appearance, easier maintenance, print-friendly.

### Four-Tier RBAC
Owner, Admin, Member, Viewer roles.

**Rationale**: Clear hierarchy, flexible permissions, covers all use cases.

### Invitation Links (No Pending)
Share link instead of email invitations.

**Rationale**: Simpler, no pending state, instant access.

---

## Troubleshooting

### Build Errors

```bash
# Clear cache
rm -rf node_modules .vite
npm install
```

### Type Errors

```bash
# Check types
npx tsc --noEmit
```

### Onboarding Tour Not Showing

```javascript
// In browser console:
localStorage.removeItem('platform-io-onboarding-completed');
location.reload();
```

---

## License

© 2026 Platform-IO. All rights reserved.

---

## Support

### Documentation
- Main docs: `/docs/README.md`
- Implementation guide: `/IMPLEMENTATION-SPEC.md`
- Current status: `/PROJECT-STATUS.md`

### Resources
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://radix-ui.com)
- [Lucide Icons](https://lucide.dev)

---

## Roadmap

### Phase 1 - Core Features (Current)
- [x] Auth & RBAC
- [x] Dashboard
- [x] Team Management
- [x] Calendar System
- [ ] Task Management
- [ ] Chat System
- [ ] File System
- [ ] AI Assistant
- [ ] User Profile

### Phase 2 - Enhancement
- [ ] Real-time updates
- [ ] Notifications
- [ ] Activity logging
- [ ] Search functionality
- [ ] Advanced permissions
- [ ] Team analytics

### Phase 3 - Integration
- [ ] Third-party integrations
- [ ] API development
- [ ] Webhooks
- [ ] Export/import
- [ ] Mobile apps

---

**Version**: 2.0-beta  
**Last Updated**: March 22, 2026  
**Status**: Active Development  
**Progress**: 40% Complete

For detailed implementation instructions, see `/IMPLEMENTATION-SPEC.md`.
