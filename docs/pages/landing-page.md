# Landing Page Documentation

## Overview
The Landing page is the first page users see when visiting Platform-IO. It serves as the marketing homepage, showcasing features, testimonials, and calls-to-action to encourage signups.

## File Location
`/src/app/pages/Landing.tsx`

## Purpose
- Introduce Platform-IO to new visitors
- Highlight key features and benefits
- Build trust through testimonials and statistics
- Drive conversions to signup page
- Provide navigation to login

## Layout Structure

### 1. Navigation Bar
**Location**: Top of page
**Components**:
- Logo (Platform-IO with icon)
- Login button (ghost variant)
- Get Started button (primary)

**Design Specifications**:
- Background: white
- Border-bottom: border-gray-200
- Padding: py-4
- Container: max-width with px-4
- Fixed height for consistency

**Spacing**:
- Logo to navigation: justify-between
- Buttons gap: gap-4

### 2. Hero Section
**Location**: Top section after navigation
**Components**:
- Main heading
- Subtitle/description
- Primary CTA button
- Secondary CTA button
- Trust indicator text

**Design Specifications**:
- Padding: py-20 mobile, py-32 desktop
- Text alignment: center
- Max-width: max-w-4xl mx-auto

**Typography**:
- Heading: text-5xl lg:text-7xl, font-bold, text-gray-900
- Subtitle: text-xl, text-gray-600, max-w-2xl
- CTA text: text-lg

**Colors**:
- Heading: text-gray-900
- Subtitle: text-gray-600
- Background: white (no gradient)

**Spacing**:
- Heading margin-bottom: mb-6
- Subtitle margin-bottom: mb-8
- Buttons gap: gap-4
- Trust text margin-top: mt-4

### 3. Stats Section
**Location**: After hero, before features
**Components**:
- 4 stat cards displaying:
  - Active Teams (10K+)
  - Users Worldwide (500K+)
  - Uptime SLA (99.9%)
  - Support availability (24/7)

**Design Specifications**:
- Background: bg-gray-50
- Border: border-y border-gray-200
- Grid: grid-cols-2 lg:grid-cols-4
- Gap: gap-8
- Padding: py-16

**Typography**:
- Stat value: text-4xl, font-bold, colored (blue/green/purple/orange-600)
- Stat label: text-gray-600

**Colors**:
- Section background: bg-gray-50
- Values: Semantic colors (blue-600, green-600, etc.)
- Labels: text-gray-600

### 4. Features Grid
**Location**: Main content section
**Components**:
- Section heading
- Section description
- 4 feature cards:
  - Secure & Reliable (Shield icon)
  - Lightning Fast (Zap icon)
  - Team Collaboration (Users icon)
  - Cloud Storage (Cloud icon)

**Design Specifications**:
- Container: py-20
- Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
- Gap: gap-6
- Max-width: max-w-6xl mx-auto

**Card Design**:
- Background: white
- Border: border-2 border-gray-200
- Hover: hover:border-blue-200
- Rounded: rounded-lg
- Transition: transition-colors

**Icon Container**:
- Size: w-12 h-12
- Background: bg-blue-50
- Icon color: text-blue-600
- Rounded: rounded-lg
- Margin-bottom: mb-4

**Typography**:
- Section heading: text-4xl, font-bold, mb-4
- Section description: text-xl, text-gray-600
- Card title: CardTitle component
- Card description: CardDescription component

### 5. Testimonials Section
**Location**: After features
**Components**:
- Section heading
- Section description
- 3 testimonial cards from:
  - Sarah Johnson (CEO, TechCorp)
  - Mike Chen (Product Manager, StartupXYZ)
  - Emily Davis (Designer, CreativeStudio)

**Design Specifications**:
- Background: bg-gray-50
- Padding: py-20
- Grid: grid-cols-1 md:grid-cols-3
- Gap: gap-6
- Max-width: max-w-6xl mx-auto

**Card Design**:
- Card component with CardHeader and CardContent
- Background: white
- Star rating: 5 stars, fill-yellow-400

**Typography**:
- Quote: text-base, text-gray-700, leading-relaxed
- Name: font-semibold
- Role: text-sm, text-gray-600

**Star Icons**:
- Size: size-5
- Color: fill-yellow-400 text-yellow-400
- Gap: gap-1

### 6. CTA Section
**Location**: Before footer
**Components**:
- Large heading
- Description text
- Primary CTA button

**Design Specifications**:
- Container: py-20
- Inner card: bg-blue-600, rounded-2xl, p-12
- Max-width: max-w-4xl mx-auto
- Text alignment: center

**Typography**:
- Heading: text-4xl, font-bold, text-white
- Description: text-xl, text-blue-100
- Button: variant="outline", bg-white text-blue-600

**Colors**:
- Background: bg-blue-600 (solid, no gradient)
- Text: white
- Description: text-blue-100
- Button: white background, blue-600 text

**Spacing**:
- Heading margin-bottom: mb-4
- Description margin-bottom: mb-8

### 7. Footer
**Location**: Bottom of page
**Components**:
- 4 column layout:
  - Product (Features, Pricing, Security, Updates)
  - Company (About, Careers, Contact, Blog)
  - Resources (Documentation, Help Center, Community, API)
  - Legal (Privacy, Terms, Cookie Policy, Licenses)
- Copyright notice

**Design Specifications**:
- Background: bg-gray-50
- Border-top: border-gray-200
- Padding: py-12
- Grid: grid-cols-2 md:grid-cols-4
- Gap: gap-8

**Typography**:
- Column heading: font-semibold, mb-4
- Links: text-sm, text-gray-600, hover:text-gray-900
- Copyright: text-sm, text-gray-600, text-center

**Link Spacing**:
- List: space-y-2

**Copyright Section**:
- Border-top: border-gray-200
- Padding-top: pt-8
- Text alignment: center

## Colors Used

### Backgrounds
- Page: white
- Stats section: bg-gray-50
- Testimonials section: bg-gray-50
- Footer: bg-gray-50
- CTA card: bg-blue-600

### Text
- Headings: text-gray-900
- Body text: text-gray-600
- CTA section text: white
- CTA description: text-blue-100
- Footer links: text-gray-600

### Interactive Elements
- Primary button: bg-blue-600, hover:bg-blue-700
- Outline button: border with hover:bg-gray-100
- Card borders: border-gray-200, hover:border-blue-200

### Icons & Accents
- Feature icons: text-blue-600 on bg-blue-50
- Stars: fill-yellow-400 text-yellow-400
- Stat values: Various semantic colors (blue-600, green-600, purple-600, orange-600)

## Typography Scale

### Headings
- Hero: text-5xl lg:text-7xl
- Sections: text-4xl
- Card titles: CardTitle (text-lg)

### Body Text
- Hero subtitle: text-xl
- Section descriptions: text-xl
- Card descriptions: CardDescription (text-sm)
- Footer links: text-sm
- Trust indicators: text-sm

### Button Text
- Large buttons: text-lg
- Regular buttons: text-base

## Spacing

### Sections
- Hero padding: py-20 lg:py-32
- Content sections: py-20
- Stats section: py-16
- Footer: py-12

### Grid Gaps
- Feature grid: gap-6
- Testimonial grid: gap-6
- Footer columns: gap-8
- Stats grid: gap-8

### Internal Spacing
- Section heading to description: mb-4
- Description to content: mb-8 or mb-16
- Card icon to title: mb-4
- Footer heading to links: mb-4

## Responsive Behavior

### Mobile (< 768px)
- Hero heading: text-5xl
- Navigation buttons: Full width stack
- Stats grid: grid-cols-2
- Features grid: grid-cols-1
- Testimonials grid: grid-cols-1
- Footer grid: grid-cols-2
- Padding: p-4

### Tablet (768px - 1024px)
- Features grid: grid-cols-2
- Testimonials grid: grid-cols-2 or 3
- Footer grid: grid-cols-4

### Desktop (> 1024px)
- Hero heading: text-7xl
- Full grid layouts
- Maximum widths applied
- Padding: px-4 standard

## Interactive Elements

### Buttons
1. **Login Button**
   - Variant: ghost
   - Location: Top right navigation
   - Action: Navigate to /login

2. **Get Started Button (Nav)**
   - Variant: primary
   - Location: Top right navigation
   - Action: Navigate to /signup

3. **Start Free Trial (Hero)**
   - Variant: primary
   - Size: lg
   - Action: Navigate to /signup
   - Icon: ArrowRight

4. **Watch Demo**
   - Variant: outline
   - Size: lg
   - Action: Demo video/modal

5. **Start Your Free Trial (CTA)**
   - Variant: outline with white background
   - Size: lg
   - Action: Navigate to /signup

### Links
- Footer navigation links (multiple)
- Logo link to home

## Accessibility

### Semantic HTML
- `<nav>` for navigation
- `<section>` for content sections
- `<footer>` for footer
- Proper heading hierarchy (h1, h2, h3)

### Keyboard Navigation
- All buttons focusable
- Tab order follows visual order
- Focus indicators visible

### Screen Readers
- Descriptive button labels
- Alt text for logo
- Semantic structure

### Color Contrast
- All text meets WCAG AA standards
- Interactive elements have sufficient contrast

## Content

### Hero Content
- **Heading**: "Your Team's Productivity Hub"
- **Subtitle**: "Platform-IO brings together all the tools your team needs to collaborate, communicate, and deliver exceptional results."
- **Trust Badge**: "No credit card required • 14-day free trial"

### Stats
- 10K+ Active Teams
- 500K+ Users Worldwide
- 99.9% Uptime SLA
- 24/7 Support

### Features
1. Secure & Reliable - Enterprise-grade security
2. Lightning Fast - Optimized performance
3. Team Collaboration - Real-time collaboration
4. Cloud Storage - Access anywhere

### CTA
- **Heading**: "Ready to Get Started?"
- **Description**: "Join thousands of teams already using Platform-IO"

## State Management
- No complex state management
- Simple useState for mobile menu (if needed)
- Navigation handled by react-router Link components

## Dependencies
- react-router (Link component)
- lucide-react (icons)
- UI components (Button, Card)

## Performance Considerations
- No heavy images loaded
- Minimal JavaScript
- CSS-only animations
- Fast page load time

## Future Enhancements
- Video embed for demo
- Animation on scroll
- Interactive feature previews
- A/B testing for CTAs
- Analytics tracking

## Related Pages
- Navigates to: /login, /signup
- Part of: Public pages (no authentication)
- Design system: Follows design-system.md principles
