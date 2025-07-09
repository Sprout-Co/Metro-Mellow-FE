# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Metromellow is a comprehensive home services platform built with Next.js 15, offering cleaning, laundry, cooking, errands, and pest control services. The platform features:

- **Customer Website**: Public-facing site with service information and booking
- **Customer Dashboard**: Protected area for managing appointments, subscriptions, and account settings
- **Admin Panel**: Service and staff management interface for administrators
- **Super Admin System**: Platform-wide administration for system owners

## Development Commands

### Core Commands

- `npm run dev` - Start development server (default port 3000)
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint code quality checks
- `npm run codegen` - Generate GraphQL types from backend schema (watch mode)
- `npm test` - Run unit tests with Jest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

### GraphQL Development

- Backend GraphQL endpoint: `http://localhost:4000/graphql`
- Run `npm run codegen` to generate TypeScript types from GraphQL schema
- GraphQL types are auto-generated in `src/graphql/api.ts`

## Architecture Overview

### Frontend Stack

- **Next.js 15** with App Router (src/app directory structure)
- **TypeScript** for type safety
- **Apollo Client** for GraphQL state management
- **Zustand** for client-side state management
- **Tailwind CSS** + **SASS/SCSS** for styling
- **Framer Motion** for animations

### Project Structure

#### Route Organization

- `src/app/(routes)/(site)/` - Public website pages (about, services, contact)
- `src/app/(routes)/(app)/dashboard/` - Customer dashboard (protected)
- `src/app/(routes)/(app)/admin/` - Admin panel (admin-only)
- `src/app/(routes)/(app)/super-admin/` - Super admin system (super-admin only)
- `src/app/(routes)/get-started/` - Authentication flows

#### Component Architecture

- `src/components/` - Reusable components (ui, layout, providers)
- `src/app/_components/` - Route-specific components
- Component structure: `ComponentName/ComponentName.tsx` + `ComponentName.module.scss`

#### State Management

- **GraphQL**: Apollo Client for server state and caching
- **Zustand**: Client-side state in `src/store/slices/`
- **Authentication**: Cookie-based with JWT tokens stored in "auth-storage" cookie

#### Styling System

- **SASS Architecture**: Variables, mixins, and functions in `src/styles/abstracts/`
- **Global imports**: Variables and mixins auto-imported via Next.js config
- **Tailwind CSS**: Utility classes for rapid development
- **CSS Modules**: Component-scoped styles with .module.scss extension

### GraphQL Integration

#### Backend Schema

The backend provides comprehensive GraphQL schema with:

- **User Management**: Authentication, profiles, role-based access
- **Service Management**: Cleaning, laundry, cooking, errands, pest control
- **Booking System**: Appointments, scheduling, status tracking
- **Staff Management**: Profiles, availability, performance tracking
- **Payment System**: Methods, invoices, refunds
- **Subscription System**: Recurring services with different plans

#### Frontend GraphQL Setup

- **Queries/Mutations**: Organized by domain in `src/graphql/queries/` and `src/graphql/mutations/`
- **Hooks**: Custom GraphQL hooks in `src/graphql/hooks/`
- **Type Generation**: Auto-generated types from backend schema
- **Authentication**: Automatic token injection via Apollo auth link

### Authentication & Authorization

#### User Roles

- `CUSTOMER` - Standard users booking services
- `STAFF` - Service providers
- `ADMIN` - Service and staff managers
- `SUPER_ADMIN` - Platform administrators

#### Route Protection

- Middleware handles authentication and role-based access
- Protected routes redirect unauthenticated users to `/get-started`
- Admin routes require ADMIN or SUPER_ADMIN roles
- Authentication state managed via Zustand store

## Development Guidelines

### Code Organization

- Follow existing component structure with TypeScript + SCSS modules
- Use GraphQL hooks for data fetching and mutations
- Implement proper loading and error states for all async operations
- Follow existing naming conventions for files and components

### GraphQL Development

- Always run `npm run codegen` after backend schema changes
- Use generated TypeScript types for type safety
- Organize queries/mutations by domain (auth, bookings, services, etc.)
- Handle GraphQL errors appropriately in UI components

### Styling Conventions

- Use SCSS modules for component-specific styles
- Leverage Tailwind for utility classes and rapid prototyping
- Import global SASS variables/mixins as needed (auto-imported)
- Follow responsive design patterns established in existing components

### State Management

- Use Apollo Client for all server-side data
- Use Zustand for UI state, authentication status, and client-side preferences
- Avoid duplicating server state in client stores

### Testing & Quality

- Run `npm run lint` before committing changes
- Ensure TypeScript compilation passes with `npm run build`
- Run `npm test` to execute unit tests for components and hooks
- Test authentication flows across different user roles
- Verify responsive design on multiple screen sizes

### Testing Framework

- **Jest** with React Testing Library for unit tests
- Tests located in `__tests__` directories alongside components
- Mock configurations for GraphQL, Redux, and Next.js features
- Coverage reports available with `npm run test:coverage`
- Working test suites for admin components (AdminDashboardLayout, StatusBadge, MetricCard, Dashboard page)
- Utility functions and helper tests for admin functionality

## Key Files & Directories

### Configuration

- `next.config.ts` - Next.js configuration with SASS setup and optimization
- `codegen.ts` - GraphQL code generation configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `src/lib/apollo-client.ts` - Apollo Client setup with authentication

### Core Features

- `src/middleware.ts` - Route protection and role-based access control
- `src/store/` - Zustand state management
- `src/constants/` - Application constants and route definitions
- `src/graphql/` - All GraphQL-related code (queries, mutations, types, hooks)

### Styling

- `src/styles/abstracts/` - SASS variables, mixins, and functions
- `src/app/globals.scss` - Global styles and CSS imports

This structure supports the full lifecycle of home services from discovery and booking to delivery and management, with appropriate interfaces for all user types.
