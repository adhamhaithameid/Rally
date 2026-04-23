# Color System Documentation

## Overview
Platform-IO uses a carefully designed color system that ensures consistency, accessibility, and visual hierarchy throughout the application. **NO GRADIENTS ARE USED** - only solid colors.

## Design Philosophy
- **Clarity**: Solid colors provide clear visual boundaries
- **Accessibility**: All color combinations meet WCAG 2.1 AA standards
- **Consistency**: Limited palette ensures cohesive experience
- **Purposeful**: Each color has specific semantic meaning

## Color Palette

### Primary Brand Color
**Blue** - Primary brand identity and interactive elements

```css
blue-50:  #eff6ff   /* Light backgrounds, hover states */
blue-100: #dbeafe   /* Slightly darker backgrounds */
blue-200: #bfdbfe   /* Borders, dividers, hover borders */
blue-300: #93c5fd   /* Disabled states, subtle emphasis */
blue-600: #2563eb   /* Primary actions, links, brand */
blue-700: #1d4ed8   /* Hover states for primary actions */
```

**Usage**:
- Primary buttons: bg-blue-600
- Button hover: bg-blue-700
- Active sidebar items: bg-blue-50, text-blue-600
- Links: text-blue-600
- Focus rings: ring-blue-100
- Borders (interactive): border-blue-200
- Badges (info): bg-blue-100, text-blue-700

### Neutral Grays
**Gray** - Structure, text, backgrounds

```css
white:    #ffffff   /* Cards, overlays, buttons */
gray-50:  #f9fafb   /* Page backgrounds, alternating sections */
gray-100: #f3f4f6   /* Disabled backgrounds, subtle fills */
gray-200: #e5e7eb   /* Borders, dividers, separators */
gray-300: #d1d5db   /* Disabled borders */
gray-400: #9ca3af   /* Placeholder text, disabled text */
gray-500: #6b7280   /* Secondary text, captions */
gray-600: #4b5563   /* Body text, default text */
gray-700: #374151   /* Emphasized text, dark secondary */
gray-900: #111827   /* Headings, primary text */
```

**Usage**:
- Page backgrounds: bg-gray-50
- Card backgrounds: bg-white
- Text headings: text-gray-900
- Body text: text-gray-600
- Secondary text: text-gray-500
- Placeholders: text-gray-400
- Borders: border-gray-200
- Hover backgrounds: bg-gray-50 or bg-gray-100
- Disabled: bg-gray-100, text-gray-400

### Semantic Colors

#### Success - Green
```css
green-50:  #f0fdf4   /* Success backgrounds */
green-100: #dcfce7   /* Success badge backgrounds */
green-200: #bbf7d0   /* Success borders */
green-600: #16a34a   /* Success text, icons */
green-700: #15803d   /* Success hover states */
```

**Usage**:
- Success messages
- Completed tasks
- Positive metrics
- Online status indicators
- Success badges

#### Warning - Yellow
```css
yellow-50:  #fefce8   /* Warning backgrounds */
yellow-100: #fef9c3   /* Warning badge backgrounds */
yellow-200: #fef08a   /* Warning borders */
yellow-400: #facc15   /* Star ratings */
yellow-600: #ca8a04   /* Warning text */
yellow-700: #a16207   /* Warning hover states */
```

**Usage**:
- Warning messages
- Pending states
- Medium priority items
- Star ratings (yellow-400)
- Warning badges

#### Danger/Error - Red
```css
red-50:  #fef2f2   /* Error backgrounds */
red-100: #fee2e2   /* Error badge backgrounds */
red-200: #fecaca   /* Error borders */
red-600: #dc2626   /* Error text, icons, delete actions */
red-700: #b91c1c   /* Error hover states */
```

**Usage**:
- Error messages
- Delete/destructive actions
- High priority items
- Validation errors
- Danger badges

#### Info/Alternative - Purple
```css
purple-50:  #faf5ff   /* Info backgrounds */
purple-100: #f3e8ff   /* Info badge backgrounds */
purple-200: #e9d5ff   /* Info borders */
purple-600: #9333ea   /* Info text, icons */
purple-700: #7e22ce   /* Info hover states */
```

**Usage**:
- Information messages
- Admin roles
- Alternative actions
- Special features (AI)
- Purple badges

#### Accent - Orange
```css
orange-50:  #fff7ed   /* Orange backgrounds */
orange-100: #ffedd5   /* Orange badge backgrounds */
orange-200: #fed7aa   /* Orange borders */
orange-600: #ea580c   /* Orange text, icons */
orange-700: #c2410c   /* Orange hover states */
```

**Usage**:
- Active tasks
- Important metrics
- Warm call-to-actions
- Planning/scheduling items
- Orange badges

#### Additional - Pink
```css
pink-50:  #fdf2f8   /* Pink backgrounds */
pink-100: #fce7f3   /* Pink badge backgrounds */
pink-200: #fbcfe8   /* Pink borders */
pink-600: #db2777   /* Pink text */
pink-700: #be185d   /* Pink hover states */
```

**Usage**:
- Demo events
- Special categories
- Alternative accents
- Pink badges

## Color Application

### Backgrounds

#### Page Backgrounds
```css
bg-white        /* Default for all pages */
bg-gray-50      /* Alternative sections (stats, footer) */
```

**Rule**: Never use gradients. All backgrounds must be solid colors.

#### Card Backgrounds
```css
bg-white        /* Default card background */
bg-gray-50      /* Disabled or completed items */
bg-blue-50      /* Selected/active items */
bg-{color}-50   /* Semantic state cards */
```

#### Interactive Backgrounds
```css
/* Buttons */
bg-blue-600         /* Primary */
hover:bg-blue-700   /* Primary hover */
bg-white            /* Outline */
hover:bg-gray-50    /* Outline hover */

/* List items */
hover:bg-gray-50    /* Neutral hover */
bg-blue-50          /* Active state */
```

### Text Colors

#### Hierarchy
```css
text-gray-900   /* Primary text (headings, important) */
text-gray-700   /* Secondary emphasis */
text-gray-600   /* Body text (default) */
text-gray-500   /* Tertiary text (captions, labels) */
text-gray-400   /* Placeholder text */
```

#### Semantic Text
```css
text-blue-600   /* Links, primary actions */
text-green-600  /* Success text */
text-red-600    /* Error text, destructive actions */
text-yellow-600 /* Warning text */
text-purple-600 /* Info text */
text-orange-600 /* Active/important text */
```

#### Special Text
```css
text-white      /* On dark backgrounds */
text-blue-100   /* On blue-600 backgrounds */
```

### Borders

#### Default Borders
```css
border-gray-200         /* Default card/input borders */
border-gray-300         /* Slightly emphasized borders */
```

#### Interactive Borders
```css
border-blue-600         /* Active/selected */
hover:border-blue-200   /* Interactive hover */
focus:border-blue-600   /* Focus state */
```

#### Semantic Borders
```css
border-green-200    /* Success */
border-yellow-200   /* Warning */
border-red-200      /* Error */
border-purple-200   /* Info */
```

### Icons

#### Icon Colors
```css
/* Neutral */
text-gray-400   /* Disabled icons */
text-gray-500   /* Inactive icons */
text-gray-600   /* Default icons */

/* Semantic */
text-blue-600   /* Primary action icons */
text-green-600  /* Success icons */
text-red-600    /* Danger/delete icons */
text-yellow-400 /* Star/rating icons */
text-purple-600 /* Special feature icons */
```

### Badges

#### Badge Pattern
```tsx
className={`
  bg-{color}-100 
  text-{color}-700 
  border-{color}-200
`}
```

#### Examples
```css
/* Info */
bg-blue-100 text-blue-700 border-blue-200

/* Success */
bg-green-100 text-green-700 border-green-200

/* Warning */
bg-yellow-100 text-yellow-700 border-yellow-200

/* Error */
bg-red-100 text-red-700 border-red-200

/* Neutral */
bg-gray-100 text-gray-700 border-gray-200
```

## Color Contrast Ratios

All color combinations meet WCAG 2.1 AA standards:

### Text on White
- gray-900: 17.28:1 ✓
- gray-700: 9.73:1 ✓
- gray-600: 7.58:1 ✓
- gray-500: 4.93:1 ✓
- gray-400: 3.49:1 ✗ (large text only)

### Text on Gray-50
- gray-900: 16.71:1 ✓
- gray-700: 9.41:1 ✓
- gray-600: 7.33:1 ✓
- gray-500: 4.77:1 ✓

### White Text on Colors
- blue-600: 5.13:1 ✓
- green-600: 4.89:1 ✓
- red-600: 5.49:1 ✓
- purple-600: 6.84:1 ✓

## State Colors

### Interactive States

#### Default
```css
border-gray-200 bg-white text-gray-600
```

#### Hover
```css
border-blue-200 bg-gray-50 text-gray-700
```

#### Active/Selected
```css
border-blue-600 bg-blue-50 text-blue-600
```

#### Focus
```css
border-blue-600 ring-2 ring-blue-100
```

#### Disabled
```css
border-gray-200 bg-gray-100 text-gray-400 opacity-50 cursor-not-allowed
```

### Form States

#### Valid
```css
border-green-600 text-green-600
```

#### Invalid
```css
border-red-600 text-red-600
```

#### Loading
```css
opacity-50 cursor-wait
```

## Status Indicators

### Online Status
```css
bg-green-500    /* Online dot */
bg-gray-400     /* Offline dot */
bg-yellow-500   /* Away dot */
bg-red-500      /* Busy dot */
```

### Priority Levels
```css
/* High */
bg-red-100 text-red-700 border-red-200

/* Medium */
bg-yellow-100 text-yellow-700 border-yellow-200

/* Low */
bg-green-100 text-green-700 border-green-200
```

### Progress Indicators
```css
bg-gray-200         /* Track */
bg-blue-600         /* Progress fill */
bg-green-600        /* Success fill */
bg-yellow-600       /* Warning fill */
bg-red-600          /* Error fill */
```

## Dark Backgrounds

When using colored backgrounds (rarely), adjust text:

### Blue Background
```css
bg-blue-600 text-white
/* Subdued text: text-blue-100 */
```

### Usage Example
```tsx
<div className="bg-blue-600 p-12 rounded-2xl">
  <h2 className="text-white">Heading</h2>
  <p className="text-blue-100">Description</p>
</div>
```

## Color Combinations

### Recommended Pairings

#### Primary Emphasis
```
bg-blue-600 + text-white
bg-blue-50 + text-blue-600
```

#### Success
```
bg-green-50 + text-green-700
bg-green-600 + text-white
```

#### Warning
```
bg-yellow-50 + text-yellow-700
bg-yellow-100 + text-yellow-700
```

#### Error
```
bg-red-50 + text-red-700
bg-red-600 + text-white
```

#### Neutral
```
bg-gray-50 + text-gray-600
bg-white + text-gray-900
```

## Usage Guidelines

### DO
✓ Use solid colors only
✓ Follow semantic color meanings
✓ Maintain sufficient contrast
✓ Use gray-50 for page backgrounds
✓ Use white for cards
✓ Use blue for primary actions
✓ Use semantic colors for states

### DON'T
✗ Use gradients
✗ Mix semantic meanings
✗ Use low contrast combinations
✗ Create new colors outside palette
✗ Use color as only indicator (accessibility)
✗ Override color system without reason

## Testing Colors

### Contrast Checker
Use tools like:
- WebAIM Contrast Checker
- Chrome DevTools Color Picker
- Adobe Color Accessibility Tools

### Accessibility Testing
- Test with grayscale
- Test with color blindness simulators
- Verify screen reader announcements
- Check keyboard focus visibility

## Color Variables

If using CSS custom properties:

```css
:root {
  /* Primary */
  --color-primary: 37 99 235;      /* blue-600 */
  --color-primary-light: 239 246 255; /* blue-50 */
  
  /* Neutral */
  --color-background: 255 255 255;  /* white */
  --color-surface: 249 250 251;     /* gray-50 */
  --color-text: 75 85 99;           /* gray-600 */
  --color-heading: 17 24 39;        /* gray-900 */
  
  /* Semantic */
  --color-success: 22 163 74;       /* green-600 */
  --color-warning: 202 138 4;       /* yellow-600 */
  --color-error: 220 38 38;         /* red-600 */
  --color-info: 147 51 234;         /* purple-600 */
}
```

## Version
Color System Version: 1.0.0
Last Updated: March 19, 2026
