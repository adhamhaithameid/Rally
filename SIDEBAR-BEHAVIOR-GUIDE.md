# Sidebar Behavior Guide

## Overview

Platform-IO features a collapsible main navigation sidebar with smooth animations and persistent state across sessions.

## Features

✅ **Desktop Collapse** - Toggle between full (256px) and mini (64px) width  
✅ **Mobile Responsive** - Overlay sidebar on mobile devices  
✅ **Persistent State** - Remembers collapsed/expanded preference  
✅ **Smooth Animation** - 300ms cubic-bezier transition  
✅ **Auto-Adapt** - Collapses automatically on small screens  
✅ **Icon-Only Mode** - Shows only icons when collapsed

---

## Main Navigation Sidebar

### States

**Expanded (Default)**
- Width: 256px (16rem)
- Shows: Icons + Labels
- Logo: Full "Platform-IO" text
- Footer: Theme toggle + Collapse button + Copyright

**Collapsed**
- Width: 64px (4rem)
- Shows: Icons only
- Logo: "P" letter in colored circle
- Footer: Icon buttons only
- Tooltips: Show labels on hover

**Mobile**
- Overlay mode (full screen)
- Width: 256px
- Slide from left
- Dark overlay behind
- Close button (X) in top-right

---

## Controls

### Desktop Collapse Toggle

**Location**: Sidebar footer  
**Button**: Chevron icon (Left when expanded, Right when collapsed)  
**Label**: "Collapse" (when expanded)  
**Tooltip**: "Expand sidebar" (when collapsed)

```tsx
<button onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
  {sidebarCollapsed ? (
    <ChevronRight className="size-5" />
  ) : (
    <>
      <ChevronLeft className="size-5" />
      <span>Collapse</span>
    </>
  )}
</button>
```

### Mobile Menu Toggle

**Location**: Fixed top-left corner  
**Button**: Menu icon (hamburger) / X icon  
**Visibility**: Only on screens < 1024px

```tsx
<button onClick={() => setSidebarOpen(!sidebarOpen)}>
  {sidebarOpen ? <X /> : <Menu />}
</button>
```

---

## Behavior Details

### Desktop (>= 1024px)

1. **Default State**: Expanded (256px)
2. **User clicks Collapse**: Smoothly shrinks to 64px
3. **Icons remain visible**: Labels hidden
4. **Logo changes**: "P" icon replaces full text
5. **Preference saved**: localStorage remembers choice
6. **Page reload**: Restores previous state

### Tablet (640px - 1023px)

1. **Overlay mode**: Sidebar overlays content
2. **Hidden by default**: Must click menu button
3. **Full width**: Always 256px when open
4. **Dark backdrop**: 50% opacity overlay
5. **Click outside**: Closes sidebar

### Mobile (< 640px)

1. **Overlay mode**: Same as tablet
2. **Menu button visible**: Top-left corner
3. **Close on navigation**: Auto-closes when link clicked
4. **Swipe gesture**: (Future enhancement)

---

## Animation

### Transition Specs

```css
/* Width transition */
transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);

/* Transform transition (mobile) */
transition: transform 300ms ease-in-out;

/* Opacity transition (overlay) */
transition: opacity 300ms ease-in-out;
```

### States

**Expanding**: 64px → 256px over 300ms  
**Collapsing**: 256px → 64px over 300ms  
**Mobile Open**: translateX(-100%) → translateX(0) over 300ms  
**Mobile Close**: translateX(0) → translateX(-100%) over 300ms

---

## Persistence

### localStorage Key

```javascript
localStorage.setItem('platform-io-sidebar-collapsed', 'true' | 'false');
```

### Initial Load

```typescript
const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
  const saved = localStorage.getItem('platform-io-sidebar-collapsed');
  return saved === 'true';
});
```

### Save on Change

```typescript
useEffect(() => {
  localStorage.setItem('platform-io-sidebar-collapsed', String(sidebarCollapsed));
}, [sidebarCollapsed]);
```

---

## Navigation Items

### Expanded State

```tsx
<Link className="flex items-center gap-3 px-4 py-3">
  <Icon className="size-5" />
  <span>Label</span>
</Link>
```

### Collapsed State

```tsx
<Link 
  className="flex items-center justify-center px-0 py-3"
  title="Label"
>
  <Icon className="size-5" />
</Link>
```

---

## Logo Behavior

### Expanded

```tsx
<div className="p-6">
  <h1 className="text-2xl font-bold text-blue-600">Platform-IO</h1>
  <p className="text-sm text-muted-foreground">Your Workspace</p>
</div>
```

### Collapsed

```tsx
<div className="p-3 flex items-center justify-center">
  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
    <span className="text-white font-bold text-lg">P</span>
  </div>
</div>
```

---

## Footer Elements

### Expanded State

1. **Theme Toggle**
   - Icon: Moon/Sun
   - Label: "Dark Mode" / "Light Mode"
   - Full width button

2. **Collapse Button**
   - Icon: ChevronLeft
   - Label: "Collapse"
   - Full width button

3. **Copyright**
   - Text: "© 2026 Platform-IO"
   - Center aligned
   - Small gray text

### Collapsed State

1. **Theme Toggle**
   - Icon only: Moon/Sun
   - Centered
   - Tooltip on hover

2. **Expand Button**
   - Icon only: ChevronRight
   - Centered
   - Tooltip on hover

3. **Copyright**
   - Hidden

---

## Active States

### Active Navigation Item

**Light Mode**:
```css
bg-blue-50 text-blue-600
```

**Dark Mode**:
```css
dark:bg-blue-900/30 dark:text-blue-400
```

### Hover States

**Light Mode**:
```css
hover:bg-muted /* bg-gray-50 equivalent */
```

**Dark Mode**:
```css
dark:hover:bg-muted /* dark gray */
```

---

## Responsive Breakpoints

```css
/* Mobile */
< 640px: Overlay sidebar, menu button visible

/* Tablet */
640px - 1023px: Overlay sidebar, menu button visible

/* Desktop Small */
1024px - 1279px: Collapsible sidebar, always visible

/* Desktop Large */
>= 1280px: Collapsible sidebar, spacious layout
```

---

## Page-Specific Sidebars

Some pages have their own sidebars (Chat, AI Chat, To-Do, Calendar). These follow similar patterns:

### Chat Page Sidebar
- Channels list
- Collapsible sections (Text, Voice, DMs)
- Settings on hover

### AI Chat Page Sidebar
- Chat history list
- Options menu on hover
- Create new chat button

### To-Do Page Sidebar
- Task lists
- Options menu on hover
- Create new list button

### Calendar Page Sidebar
- Calendar list
- Options menu on hover
- Create new calendar button

Each page sidebar:
- Can collapse independently
- Saves state to localStorage
- Same animation style
- Responsive on mobile

---

## Implementation Pattern

### Basic Structure

```tsx
export function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <div className="flex">
      <aside className={`transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        {/* Sidebar content */}
      </aside>
      
      <main className="flex-1">
        {/* Page content */}
      </main>
    </div>
  );
}
```

### With Persistence

```tsx
const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
  return localStorage.getItem('sidebar-collapsed') === 'true';
});

useEffect(() => {
  localStorage.setItem('sidebar-collapsed', String(sidebarCollapsed));
}, [sidebarCollapsed]);
```

---

## Testing Checklist

### Desktop
- [ ] Sidebar expands/collapses smoothly
- [ ] Icons always visible
- [ ] Labels hide when collapsed
- [ ] Logo switches to icon
- [ ] Footer buttons adapt
- [ ] State persists on refresh
- [ ] Active item highlights correctly

### Tablet
- [ ] Menu button appears
- [ ] Sidebar overlays content
- [ ] Dark backdrop visible
- [ ] Click outside closes
- [ ] Navigation closes sidebar

### Mobile
- [ ] Menu button in top-left
- [ ] Full-width sidebar
- [ ] Smooth slide animation
- [ ] Auto-close on navigation
- [ ] No horizontal scroll

### General
- [ ] No layout shift
- [ ] Smooth transitions
- [ ] No flickering
- [ ] Tooltips work when collapsed
- [ ] Keyboard accessible

---

## Common Issues & Solutions

### Issue: Sidebar Flickers on Load
**Solution**: Initialize state from localStorage before render.

### Issue: Content Jumps When Toggling
**Solution**: Use `transition-all` on sidebar width, ensure main content has `flex-1`.

### Issue: Icons Misaligned When Collapsed
**Solution**: Use `justify-center` and remove padding when collapsed.

### Issue: Mobile Sidebar Doesn't Close
**Solution**: Ensure overlay has `onClick={() => setSidebarOpen(false)}`.

---

## Future Enhancements

- Keyboard shortcut to toggle (Cmd/Ctrl + B)
- Swipe gesture on mobile
- Resize handle for custom width
- Mini-sidebar preview on hover
- Section collapse/expand animations
- Sidebar position (left/right)

---

## Files

1. `/src/app/components/Layout.tsx` - Main sidebar implementation
2. `/src/app/pages/Chat.tsx` - Chat-specific sidebar
3. `/src/app/pages/AIChat.tsx` - AI chat-specific sidebar
4. `/src/app/pages/Todo.tsx` - To-do-specific sidebar
5. `/src/app/pages/CalendarPage.tsx` - Calendar-specific sidebar

---

## Status

✅ **Main Sidebar** - Complete and tested  
🟡 **Page Sidebars** - In progress  
⏸️ **Mobile Gestures** - Future enhancement

---

**Version**: 1.0  
**Last Updated**: March 22, 2026  
**Next**: Implement page-specific sidebar collapse
