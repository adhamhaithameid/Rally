# Dark Mode Fix Progress

**Status**: 🟡 In Progress  
**Started**: March 22, 2026  
**Goal**: Ensure all pages support dark mode properly

---

## ✅ Completed

### 1. Foundation (100% Complete)
- [x] ThemeContext created
- [x] App wrapped with ThemeProvider  
- [x] Main sidebar with theme toggle
- [x] CSS variables already exist in theme.css
- [x] UI components (Card, Button, etc.) already use theme variables

### 2. Pages Updated for Dark Mode

#### Dashboard ✅ (100% Complete)
**Changes Made**:
- `bg-white` → `bg-background`
- `text-gray-900` → `text-foreground`
- `text-gray-600` → `text-muted-foreground`
- `text-gray-700` → `text-foreground`
- `text-gray-500` → `text-muted-foreground`
- `text-blue-600` → `text-blue-600 dark:text-blue-400`
- `bg-blue-600` → `bg-blue-600 dark:bg-blue-400`
- `hover:shadow-md` → `hover:bg-muted` (removed shadow)
- `border-t` → `border-t border-border`
- Icon colors: Added `dark:opacity-80` for better visibility

**File**: `/src/app/pages/Dashboard.tsx`

---

## 🟡 In Progress

### Pages Remaining (7/8)

1. **Chat** ⏸️
   - Status: Not started
   - Requires: 50+ color replacements
   - Priority: High

2. **AI Chat** ⏸️
   - Status: Not started
   - Requires: 30+ color replacements
   - Priority: High

3. **Todo** ⏸️
   - Status: Not started
   - Requires: 40+ color replacements
   - Priority: High

4. **Calendar** ⏸️
   - Status: Not started
   - Requires: 35+ color replacements
   - Priority: High

5. **Profile** ⏸️
   - Status: Not started
   - Requires: 20+ color replacements
   - Priority: Medium

6. **FileSystem** ⏸️
   - Status: Not started
   - Requires: 25+ color replacements
   - Priority: Medium

7. **Team** ⏸️
   - Status: Not started
   - Requires: 30+ color replacements
   - Priority: Medium

---

## 📋 Standard Replacements

### Background Colors
```tsx
// Before
bg-white → bg-background
bg-gray-50 → bg-muted (for cards/sections)

// Before
className="bg-white"
// After
className="bg-background"
```

### Text Colors
```tsx
// Before
text-gray-900 → text-foreground
text-gray-700 → text-foreground
text-gray-600 → text-muted-foreground
text-gray-500 → text-muted-foreground

// Before
className="text-gray-900"
// After
className="text-foreground"
```

### Border Colors
```tsx
// Before
border-gray-200 → border-border

// Before
className="border-gray-200"
// After
className="border-border"
```

### Hover States
```tsx
// Before
hover:bg-gray-50 → hover:bg-muted

// Before
className="hover:bg-gray-50"
// After
className="hover:bg-muted"
```

### Active/Selected States
```tsx
// Before
bg-blue-50 text-blue-600

// After
bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400

// Example
className="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
```

### Role Badge Colors (with Dark Mode)
```tsx
// Owner
bg-yellow-50 text-yellow-700 border-yellow-200
dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800

// Admin
bg-blue-50 text-blue-700 border-blue-200
dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800

// Member
bg-green-50 text-green-700 border-green-200
dark:bg-green-900/30 dark:text-green-400 dark:border-green-800

// Viewer
bg-gray-50 text-gray-700 border-gray-200
dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700
```

---

## 🎨 Color Reference Guide

### Light Mode
```css
Background:     #ffffff (white)
Foreground:     #000000 (black)
Muted:          #f3f4f6 (gray-50)
Muted FG:       #717182 (gray-600)
Border:         rgba(0,0,0,0.1)
Card:           #ffffff (white)
```

### Dark Mode
```css
Background:     oklch(0.145 0 0) (near black)
Foreground:     oklch(0.985 0 0) (near white)
Muted:          oklch(0.269 0 0) (dark gray)
Muted FG:       oklch(0.708 0 0) (light gray)
Border:         oklch(0.269 0 0)
Card:           oklch(0.145 0 0) (dark gray)
```

---

## 🔍 Search & Replace Strategy

### Step 1: Background Colors
```bash
Find:    bg-white
Replace: bg-background

Find:    bg-gray-50
Replace: bg-muted (contextual - use for cards/hover)
```

### Step 2: Text Colors
```bash
Find:    text-gray-900
Replace: text-foreground

Find:    text-gray-700
Replace: text-foreground

Find:    text-gray-600
Replace: text-muted-foreground

Find:    text-gray-500
Replace: text-muted-foreground
```

### Step 3: Borders
```bash
Find:    border-gray-200
Replace: border-border
```

### Step 4: Hover States
```bash
Find:    hover:bg-gray-50
Replace: hover:bg-muted
```

### Step 5: Active States (Manual)
For active/selected states, add dark variants:
```tsx
bg-blue-50 text-blue-600
→
bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400
```

---

## ✅ Verification Checklist

For each page updated:
- [ ] All `bg-white` replaced
- [ ] All `bg-gray-50` evaluated (context-dependent)
- [ ] All `text-gray-*` replaced with semantic colors
- [ ] All `border-gray-200` replaced with `border-border`
- [ ] All hover states use `hover:bg-muted`
- [ ] Active states have dark variants
- [ ] Role badges have dark variants
- [ ] Icons visible in dark mode
- [ ] Tested in both light and dark themes
- [ ] No hardcoded colors remain

---

## 🚫 Things to Avoid

1. **Don't touch**:
   - Color-specific classes that are intentional (e.g., `bg-blue-600`, `text-red-600`)
   - Colored badges/indicators that should stay the same
   - Chart colors

2. **Don't replace**:
   - `bg-gray-50` in contexts where it's a specific shade (evaluate each case)
   - Transparent backgrounds
   - Fixed color palettes (calendars, charts)

3. **Be careful with**:
   - Shadows (we're removing these anyway - project requirement)
   - Images/icons that may need dark variants
   - Third-party components

---

## 📊 Progress Tracking

| Page | Total Changes | Completed | % Complete |
|------|---------------|-----------|------------|
| Dashboard | ~30 | 30 | 100% ✅ |
| Chat | ~50 | 0 | 0% |
| AI Chat | ~30 | 0 | 0% |
| Todo | ~40 | 0 | 0% |
| Calendar | ~35 | 0 | 0% |
| Profile | ~20 | 0 | 0% |
| FileSystem | ~25 | 0 | 0% |
| Team | ~30 | 0 | 0% |
| **TOTAL** | **~260** | **30** | **12%** |

---

## 🎯 Next Steps

1. ✅ Dashboard - Complete
2. 🔄 Update remaining 7 pages (bulk operation)
3. Test all pages in dark mode
4. Fix any visual issues
5. Update documentation
6. Create before/after screenshots

---

## 🔧 Quick Fix Script (Conceptual)

For each `.tsx` file in `/src/app/pages/`:
1. Replace `bg-white` with `bg-background`
2. Replace `text-gray-900` with `text-foreground`
3. Replace `text-gray-700` with `text-foreground`
4. Replace `text-gray-600` with `text-muted-foreground`
5. Replace `text-gray-500` with `text-muted-foreground`
6. Replace `border-gray-200` with `border-border`
7. Replace `hover:bg-gray-50` with `hover:bg-muted`
8. Manually add dark variants to active states

---

**Status**: Dashboard complete, 7 pages remaining  
**Estimated Time**: 30-45 minutes for all pages  
**Blocker**: None  
**Ready to proceed**: Yes
