# Platform-IO Global Changes - Implementation Plan

**Date Started**: March 22, 2026  
**Status**: 🟡 In Progress  
**Estimated Prompts**: 5-7

---

## 📋 Change Categories

### 1. Global/Foundation Changes (Priority 1)
- [x] Main navigation sidebar collapsible
- [x] Dark mode implementation (full theme system)
- [ ] Unified hover effects (remove all shadows)
- [x] Ensure responsive on all devices
- [x] Create ThemeContext for dark mode

### 2. Dashboard Page Updates (Priority 2)
- [ ] Remove "Your Role" badge
- [ ] Display Communication Tags as colored badges in Team Overview
- [ ] Make Team Overview content role-specific
- [ ] Make Quick Actions role-specific
- [ ] Apply unified hover effects

### 3. Chat Page Enhancements (Priority 3)
- [ ] Settings icon appears on hover only
- [ ] Change sidebar collapse behavior (smooth slide)
- [ ] Make DMs, Voice, Text sections individually collapsible
- [ ] Create dedicated voice channel page with controls
- [ ] Message actions: icons visible, labels on hover
- [ ] Add search functionality in channels
- [ ] Add "Message Privately" on user hover
- [ ] Add delete option for DMs only
- [ ] My messages right, others left alignment

### 4. AI Chat Page Updates (Priority 4)
- [ ] Remove microphone icon
- [ ] Replace dropdown with globe icon
- [ ] Update new chat options (align with project purpose)
- [ ] Add options menu (edit/delete) on each chat
- [ ] Make sidebar collapsible
- [ ] Make suggested action chips clickable

### 5. To-Do Page Updates (Priority 5)
- [ ] Add options icon (edit/delete) on list items in sidebar
- [ ] Remove "Your Role" badge

### 6. Calendar Page Updates (Priority 6)
- [ ] Enhance calendar view (better UX)
- [ ] Add options icon (edit/delete) on calendar items in sidebar

### 7. Profile Page Enhancement (Priority 7)
- [ ] Implement tabbed interface (multiple tabs)

---

## 🎯 Prompt-by-Prompt Breakdown

### **Prompt 1: Foundation - Dark Mode & Main Sidebar** (CURRENT)
**Status**: ✅ Complete!

**Tasks**:
1. ✅ Create ThemeContext with dark mode support
2. ✅ Implement main navigation sidebar collapse
3. ✅ Add dark mode toggle to layout
4. ✅ Create CSS variables for dark mode colors (already existed)
5. ✅ Test on mobile/tablet/desktop

**Files Modified**:
- `/src/app/contexts/ThemeContext.tsx` (NEW) ✅
- `/src/app/App.tsx` (wrapped with ThemeProvider) ✅
- `/src/app/components/Layout.tsx` (sidebar collapse + theme toggle) ✅
- `/src/styles/theme.css` (already had dark mode variables) ✅

**Documentation Created**:
- `/DARK-MODE-GUIDE.md` ✅
- `/SIDEBAR-BEHAVIOR-GUIDE.md` ✅

**Expected Outcome**:
- ✅ Dark mode toggle working
- ✅ Main sidebar collapsible
- ✅ Responsive on all devices
- ✅ Smooth animations
- ✅ Persistent state (localStorage)

**What Works Now**:
- Main sidebar collapses from 256px to 64px (desktop)
- Theme toggle in sidebar footer (Moon/Sun icon)
- Dark mode fully functional with CSS variables
- Mobile overlay sidebar (< 1024px)
- Collapsed state shows icons only with tooltips
- Logo changes to "P" icon when collapsed
- State persists across page reloads

---

### **Prompt 2: Global Hover Effects & Dashboard Updates**
**Status**: ⏸️ Pending

**Tasks**:
1. Remove all shadow effects globally
2. Unify hover states (bg-gray-50 for light, bg-gray-800 for dark)
3. Dashboard: Remove role badge
4. Dashboard: Add colored communication tags
5. Dashboard: Role-specific Team Overview
6. Dashboard: Role-specific Quick Actions

**Files to Modify**:
- All page files (global search/replace for shadows)
- `/src/app/pages/Dashboard.tsx`
- `/src/styles/theme.css` (hover state variables)

**Expected Outcome**:
- ✅ No shadows anywhere
- ✅ Consistent hover effects
- ✅ Dashboard personalized by role

---

### **Prompt 3: Chat Page Major Overhaul**
**Status**: ⏸️ Pending

**Tasks**:
1. Settings icons on hover only
2. Collapsible sections (DMs, Voice, Text)
3. Voice channel dedicated page
4. Message alignment (mine right, others left)
5. Action icons always visible, labels on hover
6. Search functionality
7. "Message Privately" option
8. Delete DMs option

**Files to Modify**:
- `/src/app/pages/Chat.tsx`
- `/docs/pages/chat.md`

**Expected Outcome**:
- ✅ Improved chat UX
- ✅ Better organization
- ✅ Voice channel page

---

### **Prompt 4: AI Chat, To-Do, Calendar Updates**
**Status**: ⏸️ Pending

**Tasks**:
1. AI Chat: Remove mic, add globe icon
2. AI Chat: New chat options
3. AI Chat: Options menu on chats
4. AI Chat: Collapsible sidebar
5. To-Do: Options menu on lists
6. To-Do: Remove role badge
7. Calendar: Enhanced view
8. Calendar: Options menu on calendars

**Files to Modify**:
- `/src/app/pages/AIChat.tsx`
- `/src/app/pages/Todo.tsx`
- `/src/app/pages/CalendarPage.tsx`
- Related documentation files

**Expected Outcome**:
- ✅ Cleaner AI interface
- ✅ Better options access
- ✅ Enhanced calendar UX

---

### **Prompt 5: Profile Tabs & Final Polish**
**Status**: ⏸️ Pending

**Tasks**:
1. Profile: Implement tabbed interface
2. Final testing on all devices
3. Dark mode verification across all pages
4. Documentation updates
5. Create final summary

**Files to Modify**:
- `/src/app/pages/Profile.tsx`
- `/docs/pages/profile.md`
- All documentation files (dark mode notes)

**Expected Outcome**:
- ✅ Tabbed profile
- ✅ Everything tested
- ✅ Complete documentation

---

## 📊 Progress Tracking

### Overall Progress: 13% Complete (4/30 tasks)

| Category | Tasks | Completed | Progress |
|----------|-------|-----------|----------|
| Foundation | 5 | 4 | 80% ✅ |
| Dashboard | 5 | 0 | 0% |
| Chat | 9 | 0 | 0% |
| AI Chat | 6 | 0 | 0% |
| To-Do | 2 | 0 | 0% |
| Calendar | 2 | 0 | 0% |
| Profile | 1 | 0 | 0% |
| **TOTAL** | **30** | **4** | **13%** |

---

## 🎨 Design System Updates

### Dark Mode Color Palette
```css
/* Light Mode (existing) */
--background: #ffffff;
--foreground: #000000;
--card: #ffffff;
--card-foreground: #000000;
--primary: #3B82F6;
--secondary: #E5E7EB;
--muted: #F3F4F6;
--border: #E5E7EB;

/* Dark Mode (NEW) */
--background-dark: #0a0a0a;
--foreground-dark: #ededed;
--card-dark: #171717;
--card-foreground-dark: #ededed;
--primary-dark: #3B82F6;
--secondary-dark: #262626;
--muted-dark: #1f1f1f;
--border-dark: #262626;
```

### Unified Hover Effects
```css
/* Light Mode */
.hover-effect:hover {
  background-color: #F9FAFB; /* bg-gray-50 */
  transition: background-color 150ms;
}

/* Dark Mode */
.dark .hover-effect:hover {
  background-color: #1F2937; /* bg-gray-800 */
  transition: background-color 150ms;
}

/* NO SHADOWS ANYWHERE */
/* Remove: shadow-sm, shadow-md, shadow-lg, etc. */
```

### Sidebar Collapse Animations
```css
.sidebar-collapsed {
  width: 64px; /* Collapsed width */
  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-expanded {
  width: 256px; /* Full width */
  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 🔧 Technical Notes

### Main Sidebar Collapse
- Collapsed: 64px width (icon only)
- Expanded: 256px width (full menu)
- Smooth transition (300ms)
- Icons always visible
- Labels hidden when collapsed

### Page Sidebars Collapse
Each page sidebar (Chat, AI Chat, To-Do, Calendar) will have:
- Individual collapse state
- Same animation style as main sidebar
- Persistent state (localStorage)
- Mobile: Auto-collapse on small screens

### Dark Mode Implementation
Using CSS variables + context:
```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
```

Applied via:
- `<html class="dark">` when dark mode active
- CSS variables switch automatically
- Persisted to localStorage

### Responsive Breakpoints
```css
mobile:  < 640px
tablet:  640px - 1024px
desktop: >= 1024px
```

---

## 📝 Documentation Updates Required

After each prompt, update:
1. `/GLOBAL-CHANGES-PLAN.md` (this file)
2. Relevant `/docs/pages/*.md` files
3. `/REFACTOR-PROGRESS.md`
4. Create `/DARK-MODE-GUIDE.md` (new)
5. Create `/SIDEBAR-BEHAVIOR-GUIDE.md` (new)

---

## ✅ Success Criteria

### Foundation Complete When:
- ✅ Dark mode toggle works on all pages
- ✅ Main sidebar collapses smoothly
- ✅ No visual glitches on any device
- ✅ All colors accessible in both modes

### All Changes Complete When:
- ✅ All 30 tasks checked off
- ✅ No shadows anywhere
- ✅ Consistent hover effects
- ✅ All sidebars collapsible
- ✅ Dark mode perfect on all pages
- ✅ Responsive on mobile/tablet/desktop
- ✅ All documentation updated
- ✅ User testing passed

---

## 🚀 Next Steps (After This File)

1. Create ThemeContext
2. Implement dark mode CSS variables
3. Make main sidebar collapsible
4. Test on all devices
5. Report back with progress
6. Move to Prompt 2

---

**Current Prompt**: 1 of ~5  
**Current Focus**: Foundation (Dark Mode & Main Sidebar)  
**Next Focus**: Global Hover & Dashboard