# Non-Authenticated Pages Unit Testing Plan

## Overview
This document outlines the comprehensive unit testing strategy for all non-authenticated (public) pages in the Metro Mellow frontend application. These pages are accessible without user authentication and represent the primary user-facing functionality.

## Priority 1: Core Public Pages

### 1. Home Page (`/`)
- **File**: `src/app/page.tsx`
- **Components**: 
  - Hero
  - ServicesGallery
  - ServiceHero
  - Services
  - Testimonials
  - CTA
  - ServiceCards
  - HowItWorks
  - WhyChooseUs
  - ExperienceSection
  - ChoresSection
  - MobileAppPromoSection
  - ToDoToTaDaSection
  - TestimonialCarouselSection
  - ServiceCatalog
- **Testing Focus**: Component rendering, navigation, service display, testimonials

### 2. Welcome Page (`/welcome`) - Maintenance Mode Page
- **File**: `src/app/(routes)/(site)/welcome/page.tsx`
- **Components**: 
  - HeroSection
  - ProblemStatement
  - SolutionOverview
  - WaitlistSection
  - SocialMediaSection
  - FAQSection
- **Testing Focus**: Waitlist functionality, FAQ interactions, maintenance mode behavior

### 3. About Page (`/about`)
- **File**: `src/app/(routes)/(site)/about/page.tsx`
- **Components**: Various about page sections
- **Testing Focus**: Content rendering, team information, company story

### 4. Contact Page (`/contact`)
- **File**: `src/app/(routes)/(site)/contact/page.tsx`
- **Components**: Contact form, contact information
- **Testing Focus**: Form validation, form submission, contact details display

### 5. For Business Page (`/for-business`)
- **File**: `src/app/(routes)/(site)/for-business/page.tsx`
- **Components**: 
  - BusinessHero
  - BusinessBenefits
  - EnterpriseServices
  - EnterpriseFeatures
  - PricingTiersSection
  - SuccessStoriesSection
  - IntegrationTechnologySection
  - EnterpriseCTA
- **Testing Focus**: Business features display, pricing information, enterprise benefits

## Priority 2: Service Pages

### 6. Food Services Page (`/services/food`)
- **File**: `src/app/(routes)/(site)/services/food/page.tsx`
- **Components**: 
  - FoodHero
  - MealPromoSection
  - FruitBowlSection
  - FoodIllustrationSection
  - OrderStepsSection
  - FoodMenuSection
  - FAQSection
- **Testing Focus**: Menu display, food categories, ordering process

### 7. Cleaning Services Page (`/services/cleaning`)
- **File**: `src/app/(routes)/(site)/services/cleaning/page.tsx`
- **Components**: Cleaning-specific components
- **Testing Focus**: Service packages, pricing, cleaning options

### 8. Laundry Services Page (`/services/laundry`)
- **File**: `src/app/(routes)/(site)/services/laundry/page.tsx`
- **Components**: Laundry-specific components
- **Testing Focus**: Laundry services, pricing tiers, service options

### 9. Pest Control Services Page (`/services/pest-control`)
- **File**: `src/app/(routes)/(site)/services/pest-control/page.tsx`
- **Components**: Pest control-specific components
- **Testing Focus**: Pest control services, treatment options, safety information

## Priority 3: Public Booking Page

### 10. Public Bookings Page (`/bookings`)
- **File**: `src/app/(routes)/(site)/bookings/page.tsx`
- **Components**: 
  - BookingHero
  - SubscriptionModule
- **Testing Focus**: Booking flow initiation, subscription information

## Priority 4: Authentication Pages (Non-authenticated state)

### 11. Get Started Page (`/get-started`)
- **File**: `src/app/(routes)/(app)/get-started/page.tsx`
- **Components**: 
  - AuthManagement
  - LoginForm
  - RegisterForm
- **Testing Focus**: Login/register form validation, form switching, authentication flow

## Priority 5: Layout & Navigation

### 12. Site Layout
- **File**: `src/app/(routes)/(site)/layout.tsx`
- **Components**: Navbar, Footer (conditionally rendered based on maintenance mode)
- **Testing Focus**: Layout rendering, maintenance mode behavior, navigation structure

### 13. Navigation Components
- **Navbar**: `src/components/layout/Navbar/Navbar.tsx`
- **Footer**: `src/components/layout/Footer/Footer.tsx`
- **Testing Focus**: Navigation links, responsive behavior, logo display

## Priority 6: Utility & Error Pages

### 14. 404 Page (if exists)
- **Testing Focus**: Error page rendering, navigation back to home

### 15. Terms & Privacy Pages (if implemented)
- **Routes**: `/terms`, `/privacy`
- **Testing Focus**: Legal content display, link functionality

## Testing Considerations for Non-Authenticated Pages

### Key Testing Areas:

1. **Component Rendering**: All components render correctly without authentication
2. **Navigation**: Links work properly and lead to correct pages
3. **Forms**: Contact forms, waitlist forms, and authentication forms work correctly
4. **Responsive Design**: Pages work on different screen sizes
5. **SEO**: Meta tags and structured data are present
6. **Performance**: Pages load efficiently
7. **Accessibility**: Components meet accessibility standards
8. **Maintenance Mode**: Welcome page displays correctly when maintenance mode is active
9. **External Links**: Social media links and external references work
10. **Image Loading**: All images and media assets load properly

### Special Testing Scenarios:

- **Maintenance Mode**: When `MAINTENANCE_MODE=true`, only welcome page should be accessible
- **Waitlist Functionality**: Email collection and Firebase integration
- **Service Filtering**: Service pages should display relevant content
- **Form Validation**: All forms should validate input correctly
- **Error Handling**: Graceful handling of loading errors and network issues

## Testing Technology Stack

### Core Testing Framework

#### **Jest** - Test Runner
- **Version**: 30.0.3
- **Configuration**: `jest.config.js` with Next.js integration
- **Environment**: `jest-environment-jsdom` for DOM testing
- **Coverage**: Built-in coverage reporting with `--coverage` flag

#### **React Testing Library** - Component Testing
- **Version**: 16.3.0
- **Purpose**: Testing React components from a user's perspective
- **Key Features**: 
  - `render()` for component rendering
  - `screen` for querying elements
  - `fireEvent` for user interactions
  - `waitFor` for async operations

#### **@testing-library/jest-dom** - Custom Matchers
- **Version**: 6.6.3
- **Purpose**: Additional Jest matchers for DOM testing
- **Key Matchers**: `toBeInTheDocument()`, `toHaveClass()`, `toBeVisible()`, etc.

#### **@testing-library/user-event** - User Interaction Simulation
- **Version**: 14.6.1
- **Purpose**: More realistic user interaction simulation
- **Key Features**: `userEvent.type()`, `userEvent.click()`, `userEvent.hover()`

### Testing Configuration

#### **Jest Setup** (`jest.setup.js`)
```javascript
import '@testing-library/jest-dom'

// Mock framer-motion for animations
jest.mock('framer-motion', () => ({
  motion: { div: 'div', span: 'span', button: 'button' },
  AnimatePresence: ({ children }) => children,
}))

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
  }),
  useSearchParams: () => ({ get: jest.fn() }),
  usePathname: () => '/',
}))

// Mock Apollo Client
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useLazyQuery: jest.fn(),
}))
```

#### **Jest Configuration** (`jest.config.js`)
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/graphql/api.ts', // Generated GraphQL types
  ],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.(test|spec).{js,jsx,ts,tsx}',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
}
```

### Additional Testing Tools

#### **TypeScript Support**
- **@types/jest**: 30.0.0 - TypeScript definitions for Jest
- **@types/react**: 19 - TypeScript definitions for React
- **@types/react-dom**: 19 - TypeScript definitions for React DOM

#### **Mocking Strategy**
- **Jest Mocks**: Built-in mocking for modules and functions
- **Manual Mocks**: Custom mock implementations for external dependencies
- **Mock Service Worker**: For API mocking (recommended for future use)

### Recommended Testing Patterns

#### **Component Testing Pattern**
```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Component from './Component'

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('handles user interactions', async () => {
    const user = userEvent.setup()
    render(<Component />)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(screen.getByText('Clicked!')).toBeInTheDocument()
  })
})
```

#### **Page Testing Pattern**
```typescript
import { render, screen } from '@testing-library/react'
import Page from './page'

// Mock child components
jest.mock('./_components/ChildComponent', () => {
  return function MockChildComponent() {
    return <div data-testid="child-component">Mock Child</div>
  }
})

describe('Page', () => {
  it('renders all sections', () => {
    render(<Page />)
    
    expect(screen.getByTestId('child-component')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
```

### Testing Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

## Testing Implementation Strategy

### Phase 1: Core Pages (Priority 1)
- Start with Home page and Welcome page
- Focus on component rendering and basic functionality
- Implement navigation testing
- **Tools**: Jest + React Testing Library + user-event

### Phase 2: Service Pages (Priority 2)
- Test all service-specific pages
- Verify service information display
- Test service filtering and categorization
- **Tools**: Component mocking + GraphQL mocking

### Phase 3: Authentication & Forms (Priority 3-4)
- Test authentication forms and validation
- Implement form submission testing
- Test error handling and user feedback
- **Tools**: Form testing + validation testing + error boundary testing

### Phase 4: Layout & Navigation (Priority 5)
- Test responsive design
- Verify navigation structure
- Test maintenance mode behavior
- **Tools**: Responsive testing + router mocking

### Phase 5: Edge Cases & Utilities (Priority 6)
- Test error pages
- Implement accessibility testing
- Test performance and loading states
- **Tools**: Error boundary testing + accessibility testing

## Test File Structure

```
src/
├── __tests__/
│   ├── pages/
│   │   ├── home.test.tsx
│   │   ├── welcome.test.tsx
│   │   ├── about.test.tsx
│   │   ├── contact.test.tsx
│   │   ├── for-business.test.tsx
│   │   └── services/
│   │       ├── food.test.tsx
│   │       ├── cleaning.test.tsx
│   │       ├── laundry.test.tsx
│   │       └── pest-control.test.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.test.tsx
│   │   │   └── Footer.test.tsx
│   │   └── ui/
│   │       ├── Button.test.tsx
│   │       ├── Modal.test.tsx
│   │       └── FAQSection.test.tsx
│   └── utils/
│       ├── formValidation.test.ts
│       └── navigation.test.ts
```

## Mock Strategy

### GraphQL Operations
- Mock all GraphQL queries and mutations
- Provide realistic test data
- Test error scenarios

### External Services
- Mock Firebase waitlist operations
- Mock image loading and optimization
- Mock external API calls

### Browser APIs
- Mock localStorage and sessionStorage
- Mock window.location and navigation
- Mock responsive breakpoints

## Coverage Goals

- **Component Rendering**: 100% coverage
- **User Interactions**: 90% coverage
- **Form Validation**: 95% coverage
- **Navigation**: 100% coverage
- **Error Handling**: 85% coverage
- **Overall Coverage Target**: 85%+

## Conclusion

This comprehensive testing plan ensures that all public-facing functionality is thoroughly tested, providing confidence in the user experience and application reliability. The phased approach allows for systematic implementation while maintaining focus on the most critical user-facing features. 