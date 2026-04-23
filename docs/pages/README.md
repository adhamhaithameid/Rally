# Platform-IO Page Documentation Index

This directory contains detailed documentation for every page in the Platform-IO application.

## Page Documentation Files

### Public Pages (No Authentication)
1. **[landing-page.md](./landing-page.md)** - Marketing homepage
2. **login-page.md** - User login
3. **signup-page.md** - User registration
4. **forgot-password-page.md** - Password reset request
5. **reset-password-page.md** - Password reset form
6. **team-selection-page.md** - Team chooser after auth

### Protected Pages (Requires Authentication)
7. **welcome-page.md** - Post-login welcome dashboard
8. **dashboard-page.md** - Main analytics dashboard
9. **chat-page.md** - Team messaging
10. **ai-chat-page.md** - AI assistant
11. **todo-page.md** - Task management
12. **calendar-page.md** - Event scheduling
13. **files-page.md** - File management system
14. **team-page.md** - Team management
15. **profile-page.md** - User profile settings

## Documentation Template

Each page document follows this structure:

### 1. Overview
- File location
- Purpose
- User flow context

### 2. Layout Structure
- Detailed breakdown of each section
- Component hierarchy
- Positioning

### 3. Design Specifications
- Color usage
- Typography details
- Spacing measurements
- Border and shadow specs

### 4. Interactive Elements
- Buttons and their actions
- Form inputs
- Links and navigation

### 5. Responsive Behavior
- Mobile layout (< 768px)
- Tablet layout (768px - 1024px)
- Desktop layout (> 1024px)

### 6. Colors Used
- Background colors
- Text colors
- Interactive element colors
- Status indicators

### 7. Typography Scale
- Heading sizes
- Body text sizes
- Special text treatments

### 8. Spacing
- Section padding
- Grid gaps
- Internal component spacing

### 9. State Management
- React state usage
- Form validation
- Loading states

### 10. Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support

### 11. Content
- Static text content
- Dynamic data structures
- Mock data examples

### 12. Dependencies
- External libraries
- Internal components
- Icon usage

## Common Design Patterns

### Page Container
```tsx
<div className="min-h-full bg-white p-4 lg:p-8">
  <div className="max-w-7xl mx-auto">
    {/* Content */}
  </div>
</div>
```

### Page Header
```tsx
<div className="mb-8">
  <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Title</h1>
  <p className="text-gray-600">Description</p>
</div>
```

### Stats Grid
```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
  {/* Stat cards */}
</div>
```

### Content Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Content cards */}
</div>
```

## Color Usage Across Pages

### Page Backgrounds
- All pages: `bg-white` (NO GRADIENTS)
- Alternative sections: `bg-gray-50`
- Cards: `bg-white`

### Text Colors
- Page titles: `text-gray-900`
- Body text: `text-gray-600`
- Secondary text: `text-gray-500`
- Placeholder: `text-gray-400`

### Interactive Elements
- Primary buttons: `bg-blue-600` hover `bg-blue-700`
- Borders: `border-gray-200` hover `border-blue-200`
- Active states: `bg-blue-50`

### Status Colors
- Success: `green-600` and `green-50`
- Warning: `yellow-600` and `yellow-50`
- Error: `red-600` and `red-50`
- Info: `blue-600` and `blue-50`

## Typography Consistency

### Page Structure
- Page title: `text-3xl font-bold text-gray-900`
- Page description: `text-gray-600`
- Section headings: `text-xl font-semibold`
- Card titles: CardTitle component
- Labels: `text-sm font-medium text-gray-700`
- Helper text: `text-xs text-gray-500`

## Spacing Standards

### Page Level
- Mobile padding: `p-4`
- Desktop padding: `p-8`
- Section spacing: `mb-6` or `mb-8`
- Max container width: `max-w-7xl`

### Component Level
- Card padding: `p-6`
- Button padding: `px-4 py-2`
- Grid gaps: `gap-4` or `gap-6`
- Form field spacing: `space-y-4`

## Navigation Flow

### Public Flow
```
Landing → Login/Signup → Team Selection → Welcome
                ↓
        Forgot Password → Reset Password → Login
```

### Protected Flow
```
Welcome
   ├─ Dashboard
   ├─ Chat
   ├─ AI Chat
   ├─ To-Do
   ├─ Calendar
   ├─ Files
   ├─ Team
   └─ Profile
```

## Component Reusability

### UI Components Used Across Pages
- Button (all pages)
- Card (most pages)
- Input (forms)
- Label (forms)
- Badge (status indicators)
- Avatar (user representation)
- Tabs (multi-section pages)

### Layout Components
- Layout (sidebar navigation for protected pages)
- No layout for public pages

## Form Patterns

### Standard Form Structure
```tsx
<form className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="field">Label</Label>
    <Input id="field" type="text" required />
    <p className="text-xs text-gray-500">Helper text</p>
  </div>
  <Button type="submit">Submit</Button>
</form>
```

### Form Validation
- Required fields marked
- Error messages in red (text-red-600)
- Success states in green
- Real-time validation where appropriate

## Responsive Breakpoints

All pages follow these breakpoints:
- **Mobile**: < 768px (single column, reduced padding)
- **Tablet**: 768px - 1024px (2 columns typically)
- **Desktop**: > 1024px (full layout, multiple columns)

### Sidebar Behavior
- Mobile: Hidden, toggle button shows overlay
- Desktop: Always visible, 256px width

## Accessibility Standards

### WCAG 2.1 AA Compliance
- Color contrast ratios met
- Keyboard navigation supported
- Focus indicators visible
- Screen reader compatible
- Semantic HTML used

### Forms
- Labels associated with inputs
- Error messages announced
- Required fields indicated
- Validation feedback clear

## Performance Optimization

### All Pages
- Code splitting by route
- Lazy loading where appropriate
- Optimized re-renders
- Minimal state management
- CSS-only transitions

### Assets
- SVG icons (lucide-react)
- No heavy images
- No external font loading (system fonts)

## Testing Checklist

For each page, verify:
- [ ] Responsive on mobile, tablet, desktop
- [ ] All interactive elements functional
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Colors meet contrast requirements
- [ ] No gradient backgrounds used
- [ ] Typography follows scale
- [ ] Spacing follows system
- [ ] Loading states handled
- [ ] Error states handled
- [ ] Forms validate properly
- [ ] Navigation works correctly

## Related Documentation
- [Design System](../design-system.md) - Core design principles
- [Component Library](../components.md) - Reusable components
- [Color System](../colors.md) - Color palette details
- [Typography](../typography.md) - Font usage guide
- [Spacing](../spacing.md) - Spacing scale

## Maintenance

### When Adding a New Page
1. Create page component in `/src/app/pages/`
2. Add route in `/src/app/routes.ts`
3. Create documentation in `/docs/pages/`
4. Update this index
5. Test responsive behavior
6. Verify accessibility
7. Update navigation if needed

### When Modifying a Page
1. Update page component
2. Update documentation
3. Test all states
4. Verify no regressions
5. Update screenshots if needed

## Version History
- v1.0.0 - Initial page structure (March 19, 2026)
