# Metro Mellow Frontend Project Structure

This document provides a detailed overview of the project structure and explains the purpose of each directory and file.

## Detailed Project Structure

```
metro-mellow-fe/
├── .git/                    # Git version control system files
├── .next/                   # Next.js build output directory
├── node_modules/            # Project dependencies
├── public/                  # Static files served by Next.js
├── src/                     # Source code directory
│   ├── app/                # Next.js 13+ app directory
│   │   ├── api/           # API routes
│   │   ├── (routes)/      # Application routes
│   │   │   ├── (site)/    # Public site routes
│   │   │   └── (app)/     # Protected app routes
│   │   ├── _components/   # Route-specific components
│   │   ├── layout.tsx     # Root layout component
│   │   ├── page.tsx       # Root page component
│   │   └── globals.scss   # Global styles
│   ├── components/        # Reusable React components
│   │   ├── providers/     # Context providers
│   │   ├── ui/           # UI components
│   │   │   ├── Button/   # Button component
│   │   │   ├── Card/     # Card component
│   │   │   └── Icon/     # Icon component
│   │   └── layout/       # Layout components
│   ├── constants/         # Application constants
│   ├── graphql/          # GraphQL related files
│   │   ├── mutations/    # GraphQL mutations
│   │   │   ├── auth/     # Authentication mutations
│   │   │   ├── bookings/ # Booking mutations
│   │   │   ├── payments/ # Payment mutations
│   │   │   ├── services/ # Service mutations
│   │   │   ├── staff/    # Staff mutations
│   │   │   └── subscriptions/ # Subscription mutations
│   │   ├── queries/      # GraphQL queries
│   │   ├── hooks/        # GraphQL hooks
│   │   ├── types/        # GraphQL types
│   │   ├── api.ts        # GraphQL API configuration
│   │   └── queries.ts    # Query definitions
│   ├── gql/              # Generated GraphQL types
│   ├── hooks/            # Custom React hooks
│   │   ├── useAuth.ts           # Authentication hook
│   │   └── useAuthOperations.ts # Auth operations hook
│   ├── lib/              # Library code
│   ├── middleware.ts     # Next.js middleware
│   ├── services/         # API services
│   ├── store/            # State management
│   │   └── slices/       # Redux slices
│   │       ├── auth.ts   # Authentication state
│   │       └── ui.ts     # UI state
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript types
│   │   └── forms.ts      # Form-related types
│   └── utils/            # Utility functions
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── backend_context.md     # Backend API documentation
├── codegen.ts            # GraphQL code generation config
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js configuration
├── next-env.d.ts        # Next.js TypeScript declarations
├── package.json          # Project dependencies and scripts
├── package-lock.json     # Locked versions of dependencies
├── postcss.config.mjs    # PostCSS configuration
├── README.md             # Project documentation
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Key Files and Directories Explained

### Root Level Files

- `.env`: Contains environment variables and configuration
- `package.json`: Defines project dependencies, scripts, and metadata
- `next.config.ts`: Next.js framework configuration
- `tailwind.config.ts`: Tailwind CSS styling configuration
- `tsconfig.json`: TypeScript compiler configuration
- `eslint.config.mjs`: Code linting rules and configuration
- `postcss.config.mjs`: PostCSS configuration for CSS processing

### Source Directory (`src/`)

#### Core Application Structure

- `app/`: Next.js 13+ App Router structure

  - `api/`: API routes for server-side functionality
  - `(routes)/`: Application pages and routes
    - `(site)/`: Public-facing site routes
    - `(app)/`: Protected application routes
  - `_components/`: Route-specific components
  - `layout.tsx`: Root layout component
  - `page.tsx`: Root page component
  - `globals.scss`: Global styles

- `components/`: Reusable React components
  - `providers/`: Context providers for state management
  - `ui/`: Reusable UI components
    - `Button/`: Button component and variants
    - `Card/`: Card component and variants
    - `Icon/`: Icon component and variants
  - `layout/`: Layout-specific components

#### State Management and Data

- `store/`: Redux state management

  - `slices/`: Redux slices for different state domains
    - `auth.ts`: Authentication state management
    - `ui.ts`: UI state management (theme, modals, etc.)

- `graphql/`: GraphQL integration
  - `mutations/`: GraphQL mutation definitions
    - `auth/`: Authentication-related mutations
    - `bookings/`: Booking-related mutations
    - `payments/`: Payment-related mutations
    - `services/`: Service-related mutations
    - `staff/`: Staff-related mutations
    - `subscriptions/`: Subscription-related mutations
  - `queries/`: GraphQL query definitions
  - `hooks/`: Custom GraphQL hooks
  - `types/`: GraphQL type definitions
  - `api.ts`: GraphQL client configuration
  - `queries.ts`: Query definitions

#### Utilities and Helpers

- `hooks/`: Custom React hooks for shared logic
  - `useAuth.ts`: Authentication hook for user state
  - `useAuthOperations.ts`: Authentication operations hook
- `utils/`: Helper functions and utility code
- `lib/`: Core library code and shared functionality
- `constants/`: Application-wide constants and configuration
- `types/`: TypeScript type definitions and interfaces
  - `forms.ts`: Form-related type definitions

#### Styling

- `styles/`: Global styles, CSS modules, and styling utilities

### Build and Configuration

- `.next/`: Contains the built application files
- `public/`: Static assets served by Next.js
- `node_modules/`: Project dependencies installed via npm/yarn

## Technology Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux/Context
- **API Integration**: GraphQL
- **Build Tools**: PostCSS, ESLint

This structure follows modern React application best practices and provides a scalable foundation for the Metro Mellow frontend application.
