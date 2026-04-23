# Onboarding System Documentation

## Overview

Platform-IO implements a comprehensive coach marks (onboarding tour) system that guides new users through the platform's key features. The system follows UX best practices for user onboarding and feature discovery.

## Architecture

### Components

The onboarding system consists of three main components:

1. **OnboardingContext** (`/src/app/contexts/OnboardingContext.tsx`)
   - Manages onboarding state globally
   - Tracks current step and completion status
   - Persists completion in localStorage
   - Provides navigation controls (next, previous, skip)

2. **CoachMark** (`/src/app/components/onboarding/CoachMark.tsx`)
   - Individual tooltip component for each step
   - Creates spotlight effect on target elements
   - Provides step navigation and progress indicators
   - Supports multiple positioning options

3. **DashboardTour** (`/src/app/components/onboarding/DashboardTour.tsx`)
   - Defines the tour flow for the Dashboard
   - Configures 8 steps introducing key features
   - Maps tour steps to UI elements via IDs

## Features

### UX Best Practices Implemented

✅ **Progressive Disclosure**
- Information is revealed step-by-step
- Users aren't overwhelmed with all features at once

✅ **Contextual Guidance**
- Tooltips appear near relevant UI elements
- Spotlights highlight exactly what to focus on

✅ **User Control**
- Skip button available at all times
- Back button to review previous steps
- Clear progress indicators

✅ **Visual Hierarchy**
- Overlay dims background (60% black)
- Spotlight with blue border highlights targets
- Clean, readable tooltip design

✅ **Persistence**
- Tour only shows once per user
- Stored in localStorage
- Can be reset for testing

✅ **Smooth Animations**
- Auto-scroll to target elements
- Fade transitions for overlay
- Smooth positioning updates

✅ **Accessibility**
- Keyboard-friendly navigation
- ARIA labels on buttons
- High contrast colors

## Usage

### Basic Implementation

```tsx
import { OnboardingProvider } from '../contexts/OnboardingContext';
import { DashboardTour } from '../components/onboarding/DashboardTour';

export function YourPage() {
  return (
    <OnboardingProvider totalSteps={8} autoStart={true}>
      <div>
        {/* Your page content */}
      </div>
      
      <DashboardTour />
    </OnboardingProvider>
  );
}
```

### Creating a Custom Tour

```tsx
import { CoachMark } from './CoachMark';

export function CustomTour() {
  return (
    <>
      <CoachMark
        step={0}
        title="Welcome!"
        description="Let's get you started."
        position="center"
      />
      
      <CoachMark
        step={1}
        title="Navigation"
        description="Find all tools here."
        targetId="main-navigation"
        position="right"
      />
      
      {/* Add more steps */}
    </>
  );
}
```

### Target Element IDs

Tour steps reference UI elements by ID. Key IDs used:

- `main-navigation` - Sidebar navigation menu
- `dashboard-stats` - Stats grid on dashboard
- `nav-chat` - Chat navigation link
- `nav-ai-chat` - AI Chat navigation link
- `nav-todo` - To-Do navigation link
- `user-profile-menu` - User profile/settings area

## Tour Steps

### Dashboard Tour (8 Steps)

1. **Welcome Message** (Center)
   - Introduces the tour
   - Sets expectations

2. **Navigation Menu** (Right of sidebar)
   - Shows where to find all tools
   - Explains primary navigation

3. **Dashboard Overview** (Below stats)
   - Highlights key metrics
   - Explains dashboard purpose

4. **Team Chat** (Right of nav item)
   - Introduces real-time communication
   - Directs to Chat feature

5. **AI Assistant** (Right of nav item)
   - Explains AI help capabilities
   - Highlights productivity features

6. **Task Management** (Right of nav item)
   - Shows To-Do system
   - Explains task tracking

7. **User Profile** (Below header)
   - Shows settings location
   - Explains customization options

8. **Completion** (Center)
   - Congratulates user
   - Encourages exploration

## Configuration

### OnboardingProvider Props

```tsx
interface OnboardingProviderProps {
  children: ReactNode;
  totalSteps: number;      // Total number of tour steps
  autoStart?: boolean;     // Auto-start on first visit (default: true)
}
```

### CoachMark Props

```tsx
interface CoachMarkProps {
  step: number;                                    // Step index (0-based)
  title: string;                                   // Tooltip title
  description: string;                             // Tooltip description
  targetId?: string;                               // DOM element ID to highlight
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';  // Tooltip position
}
```

## Design System

### Colors

The onboarding system uses Platform-IO's design system colors:

- **Primary**: Blue (#3B82F6) for accents and highlights
- **Overlay**: Black with 60% opacity
- **Background**: White (#FFFFFF)
- **Text**: Gray scale (900, 600, 500, 400)
- **Border**: Gray-200 (#E5E7EB)

### No Gradients

Per design guidelines, the system uses **solid colors only**:
- Spotlight border: Solid blue (#3B82F6)
- Shadow: Solid color with opacity
- Buttons: Solid backgrounds

### Spacing

- Tooltip padding: 24px (1.5rem)
- Spotlight padding: 8px around target
- Gap between elements: 8px, 12px, 16px, 24px
- Border radius: 8px (lg)

### Typography

- Title: font-semibold, default size
- Description: text-sm, text-gray-600
- Step indicator: text-xs, font-medium
- Buttons: Default button styles from design system

## API Reference

### Context Methods

```tsx
const {
  isActive,              // boolean - Is tour currently active?
  currentStep,           // number - Current step index
  totalSteps,            // number - Total number of steps
  startOnboarding,       // () => void - Start the tour
  nextStep,              // () => void - Go to next step
  previousStep,          // () => void - Go to previous step
  skipOnboarding,        // () => void - Skip entire tour
  completeOnboarding,    // () => void - Mark tour as complete
} = useOnboarding();
```

### Helper Functions

```tsx
import { resetOnboarding } from '../contexts/OnboardingContext';

// Reset tour for testing
resetOnboarding();
```

## LocalStorage

The system uses one localStorage key:

- **Key**: `platform-io-onboarding-completed`
- **Value**: `'true'` when completed
- **Purpose**: Prevent tour from showing again

## Positioning Logic

The CoachMark component calculates tooltip position based on:

1. **Target Element Position**: Uses `getBoundingClientRect()`
2. **Tooltip Size**: Approximate 360px width, 200px height
3. **Spacing**: 16px gap from target
4. **Position Prop**: Determines side to display on

### Position Options

- `top`: Above target, horizontally centered
- `bottom`: Below target, horizontally centered
- `left`: Left of target, vertically centered
- `right`: Right of target, vertically centered
- `center`: Screen center (for non-targeted steps)

## Spotlight Effect

The spotlight highlights the target element:

1. **Dark Overlay**: 60% black covering entire screen
2. **Border Highlight**: 2px solid blue border
3. **Shadow**: Blue shadow for emphasis
4. **Padding**: 8px spacing from element edges
5. **Z-Index**: 9999 to appear above overlay (9998)

## Accessibility

### Keyboard Navigation

- ✅ Tab through buttons
- ✅ Enter/Space to activate
- ✅ Escape to close (via skip button)

### Screen Readers

- ✅ ARIA labels on close button
- ✅ Semantic HTML structure
- ✅ Clear button text

### Visual Accessibility

- ✅ High contrast (blue on white)
- ✅ Large clickable areas
- ✅ Clear visual hierarchy
- ✅ No reliance on color alone

## Best Practices

### When to Use Tours

✅ **Good Use Cases:**
- First-time user onboarding
- Major feature releases
- Complex interfaces
- Product tours for prospects

❌ **Avoid When:**
- Interface is self-explanatory
- User has already completed tour
- Every single feature update
- As primary documentation

### Tour Design Tips

1. **Keep It Short**: 5-10 steps maximum
2. **Focus on Value**: Show key features first
3. **Allow Skipping**: Never force users
4. **Make It Optional**: Should enhance, not block
5. **Test Thoroughly**: Ensure all targets exist
6. **Mobile Friendly**: Works on all screen sizes

## Testing

### Manual Testing

```tsx
// In browser console:
localStorage.removeItem('platform-io-onboarding-completed');
location.reload();
```

### Reset Function

```tsx
import { resetOnboarding } from '../contexts/OnboardingContext';

// In your component
<button onClick={resetOnboarding}>Reset Tour</button>
```

## Mobile Responsiveness

The tour adapts to mobile devices:

- ✅ Tooltips reposition for small screens
- ✅ Overlay works on touch devices
- ✅ Buttons sized for touch (minimum 44px)
- ✅ Text remains readable
- ✅ Scrolling works correctly

## Performance

- **Lazy Rendering**: Only active step renders
- **No Animation Libraries**: Pure CSS transitions
- **Minimal Re-renders**: Context optimization
- **Small Bundle**: ~3KB gzipped for entire system

## Future Enhancements

Potential improvements for future versions:

- [ ] Multi-tour support (different tours for different pages)
- [ ] Custom themes per tour
- [ ] Analytics integration (track completion rates)
- [ ] Localization support
- [ ] Video/GIF embeds in tooltips
- [ ] Branch logic (conditional steps)
- [ ] Hotspot hints (small dots for feature discovery)

## Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile Safari/Chrome

## Related Files

- `/src/app/contexts/OnboardingContext.tsx` - State management
- `/src/app/components/onboarding/CoachMark.tsx` - Tooltip component
- `/src/app/components/onboarding/DashboardTour.tsx` - Dashboard tour
- `/src/app/pages/Dashboard.tsx` - Tour implementation example
- `/src/app/components/Layout.tsx` - Navigation IDs for targeting
