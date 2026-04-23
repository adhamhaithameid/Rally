# Component Documentation

## Overview
Platform-IO uses a component-based architecture with reusable UI components built on Radix UI primitives. All components follow the design system and are fully accessible.

## Component Library

### Location
All UI components are located in `/src/app/components/ui/`

### Design Principles
- **Accessibility**: WCAG 2.1 AA compliant
- **Consistency**: Uniform behavior across the app
- **Customizable**: Props for variants and sizes
- **Composable**: Can be combined for complex UIs
- **NO GRADIENTS**: Solid colors only

## Core Components

### Button

**File**: `button.tsx`

**Variants**:
```tsx
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
```

**Sizes**:
```tsx
<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon Only</Button>
```

**Design Specs**:
- Default: `bg-blue-600 text-white`
- Outline: `border-gray-200 bg-transparent hover:bg-gray-50`
- Ghost: `bg-transparent hover:bg-gray-100`
- Padding: `px-4 py-2` (default)
- Border-radius: `rounded-lg`
- Transition: `transition-colors`

**Usage**:
```tsx
import { Button } from "../components/ui/button";

<Button onClick={handleClick}>
  Click me
</Button>
```

### Card

**Files**: `card.tsx`

**Components**:
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>
```

**Design Specs**:
- Background: `bg-white`
- Border: `border border-gray-200`
- Border-radius: `rounded-lg`
- Shadow: Optional `hover:shadow-lg`
- Padding: `p-6` for header/content

**Usage**:
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>My Card</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content here</p>
  </CardContent>
</Card>
```

### Input

**File**: `input.tsx`

**Type**:
```tsx
<Input type="text" placeholder="Enter text" />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
```

**Design Specs**:
- Border: `border border-gray-200`
- Border-radius: `rounded-lg`
- Padding: `px-3 py-2`
- Focus: `focus:border-blue-600 focus:ring-2 focus:ring-blue-100`
- Placeholder: `placeholder:text-gray-500`
- Text: `text-gray-900`

**With Icon**:
```tsx
<div className="relative">
  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
  <Input className="pl-10" placeholder="Email" />
</div>
```

### Label

**File**: `label.tsx`

**Usage**:
```tsx
<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" />
```

**Design Specs**:
- Font: `text-sm font-medium`
- Color: `text-gray-700`
- Cursor: `cursor-pointer` when associated with input

### Badge

**File**: `badge.tsx`

**Variants**:
```tsx
<Badge>Default</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
```

**Design Specs**:
- Default: `bg-blue-600 text-white`
- Outline: `border border-gray-200`
- Padding: `px-2 py-1`
- Font: `text-xs font-medium`
- Border-radius: `rounded-md`

**Semantic Color Badges**:
```tsx
<Badge className="bg-green-100 text-green-700 border-green-200">
  Success
</Badge>
<Badge className="bg-red-100 text-red-700 border-red-200">
  Error
</Badge>
<Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
  Warning
</Badge>
```

### Avatar

**File**: `avatar.tsx`

**Components**:
```tsx
<Avatar>
  <AvatarImage src="/path/to/image.jpg" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

**Sizes**:
```tsx
<Avatar className="size-8">Small</Avatar>
<Avatar className="size-10">Default</Avatar>
<Avatar className="size-12">Medium</Avatar>
<Avatar className="size-24">Large</Avatar>
```

**Design Specs**:
- Shape: `rounded-full`
- Fallback: `bg-gray-200 text-gray-600`
- Size: Customizable via className

**With Status Indicator**:
```tsx
<div className="relative">
  <Avatar />
  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
</div>
```

### Checkbox

**File**: `checkbox.tsx`

**Usage**:
```tsx
<Checkbox 
  id="terms" 
  checked={accepted}
  onCheckedChange={setAccepted}
/>
<Label htmlFor="terms">Accept terms</Label>
```

**Design Specs**:
- Size: `size-4`
- Border: `border-gray-300`
- Checked: `bg-blue-600`
- Focus: `focus:ring-2 focus:ring-blue-100`

### Switch

**File**: `switch.tsx`

**Usage**:
```tsx
<Switch 
  checked={enabled}
  onCheckedChange={setEnabled}
/>
```

**Design Specs**:
- Track (off): `bg-gray-200`
- Track (on): `bg-blue-600`
- Thumb: `bg-white rounded-full`
- Size: `w-11 h-6`

### Tabs

**File**: `tabs.tsx`

**Components**:
```tsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    Content 1
  </TabsContent>
  <TabsContent value="tab2">
    Content 2
  </TabsContent>
</Tabs>
```

**Design Specs**:
- TabsList: `bg-gray-100 p-1 rounded-lg`
- TabsTrigger (active): `bg-white shadow-sm`
- TabsTrigger (inactive): `text-gray-600`

### Progress

**File**: `progress.tsx`

**Usage**:
```tsx
<Progress value={75} className="h-2" />
```

**Design Specs**:
- Track: `bg-gray-200`
- Fill: `bg-blue-600`
- Border-radius: `rounded-full`
- Height: `h-2` (default, customizable)

### Separator

**File**: `separator.tsx`

**Usage**:
```tsx
<Separator />
<Separator orientation="vertical" />
```

**Design Specs**:
- Horizontal: `h-px bg-gray-200`
- Vertical: `w-px bg-gray-200`

### Textarea

**File**: `textarea.tsx`

**Usage**:
```tsx
<Textarea 
  placeholder="Enter description..." 
  rows={4}
/>
```

**Design Specs**:
- Border: `border border-gray-200`
- Border-radius: `rounded-lg`
- Padding: `px-3 py-2`
- Resize: `resize-y` (vertical only)
- Focus: `focus:border-blue-600 focus:ring-2 focus:ring-blue-100`

### Select

**File**: `select.tsx`

**Usage**:
```tsx
<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

**Design Specs**:
- Trigger: `border border-gray-200 rounded-lg`
- Content: `bg-white border border-gray-200 rounded-lg shadow-lg`
- Item: `hover:bg-gray-100`

### Dialog

**File**: `dialog.tsx`

**Usage**:
```tsx
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description</DialogDescription>
    </DialogHeader>
    {/* Content */}
    <DialogFooter>
      <Button onClick={() => setIsOpen(false)}>Close</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Design Specs**:
- Overlay: `bg-black/50`
- Content: `bg-white rounded-lg shadow-xl p-6`
- Max-width: `max-w-lg`

### Tooltip

**File**: `tooltip.tsx`

**Usage**:
```tsx
<Tooltip>
  <TooltipTrigger>
    <Button>Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Tooltip content</p>
  </TooltipContent>
</Tooltip>
```

**Design Specs**:
- Background: `bg-gray-900`
- Text: `text-white text-sm`
- Padding: `px-3 py-2`
- Border-radius: `rounded-md`
- Arrow: Included

## Layout Components

### Layout (Sidebar Navigation)

**File**: `/src/app/components/Layout.tsx`

**Structure**:
```tsx
<Layout>
  {/* Sidebar with navigation */}
  {/* Main content area */}
</Layout>
```

**Features**:
- Responsive sidebar (overlay on mobile, static on desktop)
- Navigation menu with icons
- Active state indication
- Mobile menu button
- Backdrop overlay

**Design Specs**:
- Sidebar width: `w-64` (256px)
- Background: `bg-white`
- Border: `border-r border-gray-200`
- Mobile: Fixed overlay with `z-40`
- Active item: `bg-blue-50 text-blue-600`

## Custom Components

### ImageWithFallback

**File**: `/src/app/components/figma/ImageWithFallback.tsx`

**Usage**:
```tsx
<ImageWithFallback
  src="path/to/image.jpg"
  alt="Description"
  className="w-full h-64 object-cover"
/>
```

**Features**:
- Automatic fallback on error
- Same props as `<img>` tag
- Used for user-uploaded images

## Component Composition

### Complex UI Examples

#### Form Field
```tsx
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <div className="relative">
    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
    <Input 
      id="email" 
      type="email" 
      className="pl-10"
      placeholder="you@example.com"
    />
  </div>
  <p className="text-xs text-gray-500">
    We'll never share your email.
  </p>
</div>
```

#### Stat Card
```tsx
<Card>
  <CardContent className="pt-6">
    <div className="text-2xl font-bold text-blue-600">
      1,234
    </div>
    <div className="text-sm text-gray-600">
      Total Users
    </div>
  </CardContent>
</Card>
```

#### User Card
```tsx
<Card>
  <CardContent className="pt-6">
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">John Doe</p>
        <p className="text-sm text-gray-500">john@example.com</p>
      </div>
      <Badge className="ml-auto">Admin</Badge>
    </div>
  </CardContent>
</Card>
```

## Styling Patterns

### Consistent Class Names

#### Containers
```tsx
className="min-h-full bg-white p-4 lg:p-8"
className="max-w-7xl mx-auto"
className="max-w-4xl mx-auto"
```

#### Grids
```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
className="grid grid-cols-2 lg:grid-cols-4 gap-4"
```

#### Stacks
```tsx
className="space-y-4"  // Form fields
className="space-y-6"  // Sections
className="flex flex-col gap-4"
```

#### Flex Layouts
```tsx
className="flex items-center justify-between"
className="flex items-start gap-3"
className="flex flex-wrap gap-2"
```

## Accessibility Features

### Built-in Accessibility
- ARIA attributes included
- Keyboard navigation supported
- Focus management handled
- Screen reader friendly
- Color contrast compliant

### Usage Best Practices
- Always use Label with Input
- Provide meaningful button text
- Include alt text for images
- Use semantic HTML
- Test with keyboard only

## Icon Usage

### Lucide React Icons

**Import**:
```tsx
import { IconName } from "lucide-react";
```

**Common Icons**:
```tsx
<Home className="size-5" />
<User className="size-5" />
<Settings className="size-5" />
<Search className="size-4" />
<Check className="size-4" />
<X className="size-4" />
<ChevronRight className="size-4" />
<Plus className="size-5" />
<Trash2 className="size-4" />
<Edit className="size-4" />
```

**Icon Sizing**:
- `size-3`: 12px (very small)
- `size-4`: 16px (small, in text)
- `size-5`: 20px (standard)
- `size-6`: 24px (large)
- `size-8`: 32px (extra large)

**Icon Colors**:
- Default: `text-gray-600`
- Primary: `text-blue-600`
- Success: `text-green-600`
- Warning: `text-yellow-600`
- Error: `text-red-600`
- Disabled: `text-gray-400`

## Component Guidelines

### DO
✓ Use existing components
✓ Follow design system colors
✓ Maintain consistent spacing
✓ Make components accessible
✓ Use semantic HTML
✓ Test keyboard navigation
✓ Provide proper labels
✓ Use solid colors only

### DON'T
✗ Create duplicate components
✗ Use custom colors outside palette
✗ Use gradients
✗ Skip accessibility features
✗ Use divs for buttons
✗ Forget hover/focus states
✗ Hardcode sizes (use scale)

## Testing Components

### Checklist
- [ ] Renders correctly
- [ ] Props work as expected
- [ ] Keyboard accessible
- [ ] Screen reader friendly
- [ ] Focus indicators visible
- [ ] Colors meet contrast ratios
- [ ] Responsive on all screens
- [ ] Works in dark/light mode (if applicable)
- [ ] Loading states handled
- [ ] Error states handled

## Version
Component Library Version: 1.0.0
Last Updated: March 19, 2026
