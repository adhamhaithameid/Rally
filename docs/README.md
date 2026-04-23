# Platform-IO Documentation

## Welcome to Platform-IO

Platform-IO is a comprehensive team productivity platform built with React, TypeScript, and Tailwind CSS. This documentation provides complete details about the design system, components, pages, and implementation guidelines.

## Quick Links

- **[Design System](./design-system.md)** - Core design principles and guidelines
- **[Color System](./colors.md)** - Complete color palette and usage
- **[Page Documentation](./pages/README.md)** - Individual page specifications
- **[Components](./components.md)** - Reusable component library
- **[Onboarding System](./onboarding-system.md)** - Coach marks and user tours

## Project Overview

### Technology Stack
- **Framework**: React 18.3.1
- **Routing**: React Router 7.13.0
- **Styling**: Tailwind CSS 4.1.12
- **TypeScript**: Type-safe development
- **Icons**: Lucide React 0.487.0
- **UI Components**: Radix UI primitives

### Project Name
**Platform-IO** - Your Team's Productivity Hub

### Design Philosophy
1. **No Gradients** - Only solid colors for clarity
2. **Accessibility First** - WCAG 2.1 AA compliant
3. **Consistency** - Uniform patterns across all pages
4. **Performance** - Optimized and fast
5. **Responsive** - Mobile-first approach

## Application Flow

### User Journey
```
Landing Page
    ↓
Login / Signup
    ↓
Forgot Password (optional)
    ↓
Team Selection
    ↓
Dashboard (with onboarding tour)
    ├─ Dashboard (analytics)
    ├─ Chat (messaging)
    ├─ AI Chat (assistant)
    ├─ To-Do (tasks)
    ├─ Calendar (events)
    ├─ Files (storage)
    ├─ Team (management)
    └─ Profile (settings)
```

### Route Structure

#### Public Routes (No Layout)
- `/` - Landing page
- `/login` - User login
- `/signup` - User registration
- `/forgot-password` - Password reset request
- `/reset-password` - Password reset form
- `/team-selection` - Choose/create team

#### Protected Routes (With Sidebar Layout)
- `/dashboard` - Analytics dashboard (with onboarding tour)
- `/chat` - Team messaging
- `/ai-chat` - AI assistant
- `/todo` - Task management
- `/calendar` - Event scheduling
- `/files` - File management
- `/team` - Team settings
- `/profile` - User profile

## File Structure

```
platform-io/
├── docs/
│   ├── README.md (this file)
│   ├── design-system.md
│   ├── colors.md
│   ├── components.md
│   └── pages/
│       ├── README.md
│       ├── landing-page.md
│       ├── login-page.md
│       ├── signup-page.md
│       ├── dashboard-page.md
│       └── ... (other pages)
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ui/ (reusable components)
│   │   │   ├── Layout.tsx
│   │   │   └── figma/
│   │   ├── pages/
│   │   │   ├── Landing.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   ├── ForgotPassword.tsx
│   │   │   ├── ResetPassword.tsx
│   │   │   ├── TeamSelection.tsx
│   │   │   ├── Welcome.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Chat.tsx
│   │   │   ├── AIChat.tsx
│   │   │   ├── Todo.tsx
│   │   │   ├── CalendarPage.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── FileSystem.tsx
│   │   │   ├── Team.tsx
│   │   │   └── NotFound.tsx
│   │   ├── routes.ts
│   │   └── App.tsx
│   └── styles/
│       ├── index.css
│       ├── tailwind.css
│       ├── theme.css
│       └── fonts.css
├── package.json
└── vite.config.ts
```

## Core Principles

### 1. No Gradients
All backgrounds use solid colors. This ensures:
- Visual clarity
- Better accessibility
- Consistent appearance
- Easier maintenance
- Print-friendly designs

### 2. Color System
- **Primary**: Blue (blue-600)
- **Backgrounds**: White and gray-50
- **Text**: Gray scale (900, 600, 500)
- **Semantic**: Green (success), Red (error), Yellow (warning), Purple (info)

### 3. Typography
- **System fonts only** (no external fonts)
- Clear hierarchy (3xl for titles, base for body)
- Consistent weights (400 normal, 500 medium, 700 bold)
- Good line height for readability (1.5 for body)

### 4. Spacing
- Based on 4px increments
- Consistent padding and margins
- Responsive spacing (p-4 mobile, p-8 desktop)
- Grid gaps (gap-4 or gap-6)

### 5. Components
- Reusable UI components from `/components/ui/`
- Consistent props and behavior
- Accessible by default
- Well-documented

## Design System Highlights

### Colors (Solid Only)
```css
Primary:    blue-600 (#2563eb)
Background: white, gray-50
Text:       gray-900, gray-600, gray-500
Success:    green-600
Warning:    yellow-600
Error:      red-600
Info:       purple-600
```

### Typography
```css
Page Title:     text-3xl font-bold
Heading:        text-xl font-semibold
Body:           text-base font-normal
Label:          text-sm font-medium
Caption:        text-xs font-normal
```

### Spacing
```css
Page:           p-4 lg:p-8
Section:        mb-6 or mb-8
Card:           p-6
Stack:          space-y-4
Grid:           gap-4 or gap-6
```

### Buttons
```tsx
Primary:    <Button>Label</Button>
Secondary:  <Button variant="outline">Label</Button>
Ghost:      <Button variant="ghost">Label</Button>
```

## Component Library

### UI Components (Radix-based)
All components located in `/src/app/components/ui/`:
- Accordion
- Alert Dialog
- Alert
- Avatar
- Badge
- Button
- Calendar
- Card
- Checkbox
- Dialog
- Dropdown Menu
- Input
- Label
- Progress
- Select
- Separator
- Sheet
- Switch
- Tabs
- Textarea
- Tooltip
- And more...

### Layout Components
- **Layout.tsx** - Sidebar navigation (used for protected pages)

### Custom Components
- **ImageWithFallback.tsx** - Image component with fallback

## Responsive Design

### Breakpoints
```css
sm:  640px   (Small devices)
md:  768px   (Tablets)
lg:  1024px  (Desktops)
xl:  1280px  (Large desktops)
2xl: 1536px  (Extra large)
```

### Mobile-First Approach
- Default styles for mobile
- Progressive enhancement for larger screens
- Sidebar collapses to overlay on mobile
- Grid columns reduce on smaller screens
- Padding adjusts (p-4 → p-8)

## Accessibility

### WCAG 2.1 AA Compliance
- Color contrast ratios met
- Keyboard navigation
- Screen reader support
- Focus indicators
- Semantic HTML
- ARIA labels where needed

### Key Features
- Tab order follows visual order
- All interactive elements focusable
- Error messages announced
- Loading states communicated
- Alt text for images

## State Management

### Pattern Used
- React useState for local state
- No global state library (kept simple)
- Form state managed locally
- Navigation state in react-router

### State Examples
```tsx
// Local UI state
const [isOpen, setIsOpen] = useState(false);

// Form state
const [email, setEmail] = useState("");

// List state
const [todos, setTodos] = useState(initialTodos);
```

## Performance

### Optimizations
- Code splitting by route (react-router)
- Lazy loading where beneficial
- Minimal re-renders
- CSS-only animations
- SVG icons (lucide-react)
- No heavy images
- System fonts (no external loading)

## Testing Checklist

For each page/component:
- [ ] Displays correctly on mobile
- [ ] Displays correctly on tablet
- [ ] Displays correctly on desktop
- [ ] All buttons functional
- [ ] Forms validate
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Colors meet contrast requirements
- [ ] No gradients used
- [ ] Typography follows scale
- [ ] Spacing follows system
- [ ] Loading states work
- [ ] Error states work
- [ ] Screen reader compatible

## Development Guidelines

### Creating a New Page
1. Create component in `/src/app/pages/`
2. Add route in `/src/app/routes.ts`
3. Follow layout pattern
4. Use design system colors
5. Apply proper spacing
6. Make it responsive
7. Test accessibility
8. Create documentation in `/docs/pages/`

### Creating a New Component
1. Create in `/src/app/components/ui/` (if reusable)
2. Follow existing patterns
3. Make it accessible
4. Document props
5. Test in multiple contexts
6. Add to component docs

### Styling Guidelines
1. Use Tailwind utility classes
2. No custom CSS unless necessary
3. Follow spacing scale
4. Use design system colors
5. NO GRADIENTS
6. Maintain consistency

## Common Patterns

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
  <h1 className="text-3xl font-bold text-gray-900 mb-2">
    Page Title
  </h1>
  <p className="text-gray-600">Description</p>
</div>
```

### Card Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id}>
      {/* Card content */}
    </Card>
  ))}
</div>
```

### Form
```tsx
<form className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="field">Label</Label>
    <Input id="field" type="text" />
  </div>
  <Button type="submit">Submit</Button>
</form>
```

## Browser Support

### Supported Browsers
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### Features Used
- CSS Grid
- Flexbox
- CSS Custom Properties
- Modern JavaScript (ES2020+)
- React 18 features

## Deployment

### Build Command
```bash
npm run build
```

### Output
- Optimized production build
- Code splitting enabled
- Minified CSS and JS
- Source maps generated

## Version History

### v1.0.0 (March 19, 2026)
- Initial release
- 15 pages implemented
- Complete design system
- Full documentation
- Responsive design
- Accessibility compliant

## Contributing

### Guidelines
1. Follow existing patterns
2. Maintain design system
3. Test thoroughly
4. Update documentation
5. Ensure accessibility
6. No gradients!

## Support

### Documentation
- Design system: `docs/design-system.md`
- Colors: `docs/colors.md`
- Pages: `docs/pages/`
- Components: `docs/components.md`

### Resources
- React docs: https://react.dev
- Tailwind docs: https://tailwindcss.com
- Radix UI docs: https://radix-ui.com
- Lucide icons: https://lucide.dev

## License
© 2026 Platform-IO. All rights reserved.

## Maintainers
Platform-IO Design System Team

---

**Last Updated**: March 19, 2026  
**Version**: 1.0.0  
**Status**: Production Ready