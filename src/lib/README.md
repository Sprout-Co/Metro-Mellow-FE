# Library Organization

This directory contains all core libraries and infrastructure code for the Metromellow application.

## Structure

### `/seo` - SEO Library
All SEO-related functionality is centralized here:
- **helpers.ts** - SEO utility functions (schema creators, business info)
- **components/StructuredData.tsx** - React component for JSON-LD structured data
- **routes/** - Route handlers for robots.txt and sitemap.xml
- **index.ts** - Clean exports for easy importing

**Usage:**
```typescript
import {
  StructuredData,
  createServiceSchema,
  createFAQSchema,
  businessInfo,
} from "@/lib/seo";
```

### `/analytics` - Analytics Library
All analytics and tracking functionality:
- **web-vitals.ts** - Core Web Vitals tracking
- **components/WebVitalsReporter.tsx** - React component for Web Vitals
- **components/GoogleTagManager.tsx** - GTM integration components
- **gtm/hook.ts** - useGoogleTagManager hook
- **index.ts** - Clean exports for easy importing

**Usage:**
```typescript
import {
  WebVitalsReporter,
  GoogleTagManager,
  GoogleTagManagerScript,
  useGoogleTagManager,
} from "@/lib/analytics";
```

### `/services` - Business Logic Services
Service layer for data operations:
- **blog.ts** - Blog data and operations
- **waitlist.ts** - Waitlist management
- **socket-notification.ts** - Real-time notifications

### Other Libraries
- **apollo-client.ts** - GraphQL client configuration
- **firebase.ts** - Firebase initialization
- **fonts.ts** - Font configuration
- **redux/** - Redux store and slices

## Benefits of This Organization

1. **Clear Separation**: Infrastructure code is separate from UI components
2. **Easy Discovery**: Related functionality is grouped together
3. **Clean Imports**: Single import path for related features
4. **Maintainability**: Easier to find and update related code
5. **Scalability**: Easy to add new libraries following the same pattern

## Migration Notes

If you see old import paths, they should be updated:
- ❌ `@/utils/seoHelpers` → ✅ `@/lib/seo`
- ❌ `@/components/common/SEO/StructuredData` → ✅ `@/lib/seo`
- ❌ `@/hooks/useGoogleTagManager` → ✅ `@/lib/analytics`
- ❌ `@/components/common/WebVitalsReporter` → ✅ `@/lib/analytics`
- ❌ `@/components/common/GoogleTagManager` → ✅ `@/lib/analytics`

