# Metromellow Backend Context

## Server Architecture

### Core Components

- Express.js server with Apollo GraphQL integration
- MongoDB database connection
- Security features including:
  - Helmet for security headers
  - CORS enabled
  - Rate limiting (100 requests per 15 minutes per IP)
- Error handling and logging middleware

### Server Configuration

- Default port: 4000 (configurable via PORT environment variable)
- GraphQL endpoint: `http://localhost:4000/graphql`
- MongoDB connection string configurable via MONGODB_URI environment variable

## Complete GraphQL Schema

### User Management

```graphql
type User {
  id: ID!
  email: String!
  firstName: String!
  lastName: String!
  role: UserRole!
  phone: String
  address: Address
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum UserRole {
  CUSTOMER
  STAFF
  ADMIN
  SUPER_ADMIN
}

type Address {
  street: String!
  city: String!
  state: String!
  zipCode: String!
  country: String!
}

input CreateUserInput {
  email: String!
  password: String!
  firstName: String!
  lastName: String!
  role: UserRole!
  phone: String
  address: AddressInput
}

input UpdateUserInput {
  firstName: String
  lastName: String
  phone: String
  address: AddressInput
}

input AddressInput {
  street: String!
  city: String!
  state: String!
  zipCode: String!
  country: String!
}

type AuthPayload {
  token: String!
  user: User!
}

extend type Query {
  me: User
  user(id: ID!): User
  users(role: UserRole): [User!]!
}

extend type Mutation {
  register(input: CreateUserInput!): AuthPayload!
  login(email: String!, password: String!): AuthPayload!
  updateProfile(input: UpdateUserInput!): User!
  changePassword(currentPassword: String!, newPassword: String!): Boolean!
  forgotPassword(email: String!): Boolean!
  resetPassword(token: String!, newPassword: String!): Boolean!
  updateUserRole(userId: ID!, role: UserRole!): User!
}
```

### Service Management

```graphql
type Service {
  id: ID!
  name: String!
  description: String!
  category: ServiceCategory!
  price: Float!
  duration: Int! # in minutes
  status: ServiceStatus!
  imageUrl: String
  features: [String!]
  requirements: [String!]
  pricing: ServicePricing!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type ServicePricing {
  basePrice: Float!
  duration: Int! # in minutes
}

enum ServiceCategory {
  CLEANING
  LAUNDRY
  COOKING
  ERRANDS
  PEST_CONTROL
}

enum ServiceStatus {
  ACTIVE
  INACTIVE
  MAINTENANCE
}

input CreateServiceInput {
  name: String!
  description: String!
  category: ServiceCategory!
  price: Float!
  duration: Int!
  imageUrl: String
  features: [String!]
  requirements: [String!]
  pricing: ServicePricingInput!
}

input ServicePricingInput {
  basePrice: Float!
  duration: Int!
}

input UpdateServiceInput {
  name: String
  description: String
  category: ServiceCategory
  price: Float
  duration: Int
  status: ServiceStatus
  imageUrl: String
  features: [String!]
  requirements: [String!]
  pricing: ServicePricingInput
}

extend type Query {
  service(id: ID!): Service
  services(category: ServiceCategory, status: ServiceStatus): [Service!]!
}

extend type Mutation {
  createService(input: CreateServiceInput!): Service!
  updateService(id: ID!, input: UpdateServiceInput!): Service!
  deleteService(id: ID!): Boolean!
  updateServiceStatus(id: ID!, status: ServiceStatus!): Service!
  updateServicePricing(id: ID!, pricing: ServicePricingInput!): Service!
}
```

### Booking System

```graphql
type Booking {
  id: ID!
  customer: User!
  service: Service!
  staff: User
  date: DateTime!
  startTime: String!
  endTime: String!
  status: BookingStatus!
  notes: String
  address: Address!
  totalPrice: Float!
  paymentStatus: PaymentStatus!
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum BookingStatus {
  PENDING
  CONFIRMED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

input CreateBookingInput {
  serviceId: ID!
  date: DateTime!
  startTime: String!
  notes: String
  address: AddressInput!
}

input UpdateBookingInput {
  date: DateTime
  startTime: String
  notes: String
  address: AddressInput
}

extend type Query {
  booking(id: ID!): Booking
  bookings(status: BookingStatus): [Booking!]!
  customerBookings: [Booking!]!
  staffBookings: [Booking!]!
}

extend type Mutation {
  createBooking(input: CreateBookingInput!): Booking!
  updateBooking(id: ID!, input: UpdateBookingInput!): Booking!
  cancelBooking(id: ID!): Booking!
  completeBooking(id: ID!): Booking!
  assignStaff(bookingId: ID!, staffId: ID!): Booking!
  updateBookingStatus(id: ID!, status: BookingStatus!): Booking!
}
```

### Staff Management

```graphql
type StaffProfile {
  id: ID!
  user: User!
  serviceCategories: [ServiceCategory!]!
  availability: [StaffAvailability!]!
  rating: Float!
  totalJobs: Int!
  completedJobs: Int!
  activeJobs: Int!
  documents: [StaffDocument!]!
  status: StaffStatus!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type StaffAvailability {
  dayOfWeek: Int!
  startTime: String!
  endTime: String!
  isAvailable: Boolean!
}

type StaffDocument {
  id: ID!
  type: StaffDocumentType!
  url: String!
  verified: Boolean!
  uploadedAt: DateTime!
}

enum StaffStatus {
  ACTIVE
  INACTIVE
  ON_LEAVE
  SUSPENDED
}

enum StaffDocumentType {
  ID_PROOF
  ADDRESS_PROOF
  CRIMINAL_RECORD
  CERTIFICATION
  INSURANCE
}

enum StaffPerformance {
  EXCELLENT
  GOOD
  SATISFACTORY
  NEEDS_IMPROVEMENT
  UNSATISFACTORY
}

input StaffAvailabilityInput {
  dayOfWeek: Int!
  startTime: String!
  endTime: String!
  isAvailable: Boolean!
}

input CreateStaffProfileInput {
  serviceCategories: [ServiceCategory!]!
  availability: [StaffAvailabilityInput!]!
  documents: [StaffDocumentInput!]!
}

input StaffDocumentInput {
  type: StaffDocumentType!
  url: String!
}

input UpdateStaffProfileInput {
  serviceCategories: [ServiceCategory!]
  availability: [StaffAvailabilityInput!]
  status: StaffStatus
}

extend type Query {
  staffProfile(id: ID!): StaffProfile
  staffProfiles(status: StaffStatus): [StaffProfile!]!
  availableStaff(
    serviceCategory: ServiceCategory!
    date: DateTime!
  ): [StaffProfile!]!
  staffPerformance(id: ID!): StaffPerformance!
}

extend type Mutation {
  createStaffProfile(input: CreateStaffProfileInput!): StaffProfile!
  updateStaffProfile(id: ID!, input: UpdateStaffProfileInput!): StaffProfile!
  updateStaffStatus(id: ID!, status: StaffStatus!): StaffProfile!
  updateStaffAvailability(
    id: ID!
    availability: [StaffAvailabilityInput!]!
  ): StaffProfile!
  uploadStaffDocument(id: ID!, input: StaffDocumentInput!): StaffDocument!
  verifyStaffDocument(id: ID!, documentId: ID!): StaffDocument!
  deleteStaffDocument(id: ID!, documentId: ID!): Boolean!
}
```

### Payment System

```graphql
type PaymentMethod {
  id: ID!
  user: User!
  type: PaymentMethodType!
  last4: String!
  expiryMonth: Int!
  expiryYear: Int!
  brand: String!
  isDefault: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Payment {
  id: ID!
  booking: Booking!
  customer: User!
  amount: Float!
  currency: String!
  status: PaymentStatus!
  paymentMethod: PaymentMethod!
  paymentIntentId: String!
  refundAmount: Float
  refundReason: String
  metadata: JSON
  createdAt: DateTime!
  updatedAt: DateTime!
}

type InvoiceItem {
  description: String!
  quantity: Int!
  unitPrice: Float!
  amount: Float!
}

type Invoice {
  id: ID!
  payment: Payment!
  invoiceNumber: String!
  subtotal: Float!
  tax: Float!
  total: Float!
  dueDate: DateTime!
  status: InvoiceStatus!
  items: [InvoiceItem!]!
  paidAt: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum PaymentMethodType {
  CREDIT_CARD
  DEBIT_CARD
  BANK_TRANSFER
  DIGITAL_WALLET
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
  PARTIALLY_REFUNDED
}

enum InvoiceStatus {
  PENDING
  PAID
  CANCELLED
  OVERDUE
}

input CreatePaymentInput {
  bookingId: ID!
  paymentMethodId: ID!
  amount: Float!
  currency: String!
  metadata: JSON
}

input RefundPaymentInput {
  paymentId: ID!
  amount: Float!
  reason: String!
}

input AddPaymentMethodInput {
  type: PaymentMethodType!
  token: String!
  isDefault: Boolean
}

extend type Query {
  payment(id: ID!): Payment!
  payments(status: PaymentStatus): [Payment!]!
  customerPayments: [Payment!]!
  paymentMethods: [PaymentMethod!]!
  invoice(id: ID!): Invoice!
  customerInvoices: [Invoice!]!
}

extend type Mutation {
  createPayment(input: CreatePaymentInput!): Payment!
  refundPayment(input: RefundPaymentInput!): Payment!
  addPaymentMethod(input: AddPaymentMethodInput!): PaymentMethod!
  removePaymentMethod(id: ID!): Boolean!
  setDefaultPaymentMethod(id: ID!): PaymentMethod!
  generateInvoice(paymentId: ID!): Invoice!
  markInvoiceAsPaid(id: ID!): Invoice!
  cancelInvoice(id: ID!): Invoice!
}
```

### Subscription System

```graphql
type Subscription {
  id: ID!
  customer: User!
  service: Service!
  plan: SubscriptionPlan!
  startDate: DateTime!
  endDate: DateTime
  status: SubscriptionStatus!
  frequency: SubscriptionFrequency!
  price: Float!
  nextBillingDate: DateTime!
  lastBillingDate: DateTime
  autoRenew: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum SubscriptionPlan {
  BASIC
  PREMIUM
  LUXURY
}

enum SubscriptionFrequency {
  WEEKLY
  BI_WEEKLY
  MONTHLY
  QUARTERLY
}

enum SubscriptionStatus {
  ACTIVE
  EXPIRED
  CANCELLED
  PENDING
  SUSPENDED
}

input CreateSubscriptionInput {
  serviceId: ID!
  plan: SubscriptionPlan!
  startDate: DateTime!
  frequency: SubscriptionFrequency!
  autoRenew: Boolean!
}

input UpdateSubscriptionInput {
  plan: SubscriptionPlan
  frequency: SubscriptionFrequency
  autoRenew: Boolean
  endDate: DateTime
}

extend type Query {
  subscription(id: ID!): Subscription
  subscriptions(status: SubscriptionStatus): [Subscription!]!
  customerSubscriptions: [Subscription!]!
}

extend type Mutation {
  createSubscription(input: CreateSubscriptionInput!): Subscription!
  updateSubscription(id: ID!, input: UpdateSubscriptionInput!): Subscription!
  cancelSubscription(id: ID!): Subscription!
  reactivateSubscription(id: ID!): Subscription!
  updateSubscriptionStatus(id: ID!, status: SubscriptionStatus!): Subscription!
}
```

### Root Types

```graphql
type Query {
  _: Boolean
}

type Mutation {
  _: Boolean
}

type Subscription {
  _: Boolean
}

scalar DateTime
scalar JSON
```

## Data Types and Scalars

### Custom Scalars

- `DateTime`: For handling date and time values
- `JSON`: For flexible data storage

### Common Types

- `Address`: Structured address information
- `AuthPayload`: Authentication response containing token and user data

## Security Features

### Authentication & Authorization

- JWT-based authentication
- Password hashing
- Role-based access control
- Token-based session management

### Security Measures

- Helmet for security headers
- CORS protection
- Rate limiting
- Request/response logging
- Error handling and sanitization

## Error Handling

### Error Structure

```typescript
{
  message: string;
  code: string;
  stack?: string; // Only in development mode
}
```

### Error Types

- GraphQL validation errors
- Authentication errors
- Authorization errors
- Database errors
- Custom business logic errors

## Frontend Integration Guide

### Setup Requirements

1. Apollo Client configuration
2. GraphQL endpoint configuration
3. Authentication token management
4. Error handling implementation
5. Type definitions from schema

### Key Considerations

- Handle authentication state
- Implement proper error boundaries
- Manage loading states
- Cache management
- Real-time updates (if using subscriptions)

## Environment Variables

Required environment variables:

```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/metro-mellow
NODE_ENV=development|production
```

## API Best Practices

1. **Authentication**

   - Include JWT token in Authorization header
   - Handle token expiration
   - Implement refresh token mechanism

2. **Error Handling**

   - Implement proper error boundaries
   - Handle network errors
   - Display user-friendly error messages

3. **Performance**

   - Implement proper caching strategies
   - Use pagination for large datasets
   - Optimize queries and mutations

4. **Security**
   - Never expose sensitive data
   - Validate all inputs
   - Implement proper access control

## Development Guidelines

1. **Code Organization**

   - Follow modular architecture
   - Implement proper separation of concerns
   - Use TypeScript for type safety

2. **Testing**

   - Unit tests for resolvers
   - Integration tests for API endpoints
   - E2E tests for critical flows

3. **Documentation**
   - Keep schema documentation up to date
   - Document complex business logic
   - Maintain API documentation
