import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AddPaymentMethodInput = {
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  token: Scalars['String']['input'];
  type: PaymentMethodType;
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  state: Scalars['String']['output'];
  street: Scalars['String']['output'];
  zipCode: Scalars['String']['output'];
};

export type AddressInput = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  state: Scalars['String']['input'];
  street: Scalars['String']['input'];
  zipCode: Scalars['String']['input'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type Booking = {
  __typename?: 'Booking';
  address: Address;
  createdAt: Scalars['DateTime']['output'];
  customer: User;
  date: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  laundryBags?: Maybe<Scalars['Int']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  paymentStatus: PaymentStatus;
  propertyType?: Maybe<PropertyType>;
  recurringDiscount?: Maybe<Scalars['Float']['output']>;
  roomQuantities?: Maybe<RoomQuantities>;
  service?: Maybe<Service>;
  serviceOption: Scalars['String']['output'];
  serviceType: ServiceType;
  staff?: Maybe<User>;
  status: BookingStatus;
  timeSlot: TimeSlot;
  totalPrice: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum BookingStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Confirmed = 'CONFIRMED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export type CreateBookingInput = {
  address: AddressInput;
  date: Scalars['DateTime']['input'];
  laundryBags?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  propertyType?: InputMaybe<PropertyType>;
  roomQuantities?: InputMaybe<RoomQuantitiesInput>;
  serviceId: Scalars['ID']['input'];
  serviceOption: Scalars['String']['input'];
  serviceType: ServiceType;
  timeSlot: TimeSlot;
  totalPrice: Scalars['Float']['input'];
};

export type CreatePaymentInput = {
  amount: Scalars['Float']['input'];
  bookingId: Scalars['ID']['input'];
  currency: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  paymentMethodId: Scalars['ID']['input'];
};

export type CreateServiceInput = {
  category: ServiceCategory;
  description: Scalars['String']['input'];
  displayPrice: Scalars['String']['input'];
  features?: InputMaybe<Array<Scalars['String']['input']>>;
  icon: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  inclusions?: InputMaybe<Array<Scalars['String']['input']>>;
  label: Scalars['String']['input'];
  name: Scalars['String']['input'];
  options?: InputMaybe<Array<ServiceOptionInput>>;
  price: Scalars['Float']['input'];
  service_id: ServiceId;
};

export type CreateStaffProfileInput = {
  availability: Array<StaffAvailabilityInput>;
  documents: Array<StaffDocumentInput>;
  serviceCategories: Array<ServiceCategory>;
};

export type CreateSubscriptionInput = {
  autoRenew: Scalars['Boolean']['input'];
  frequency: SubscriptionFrequency;
  plan: SubscriptionPlan;
  serviceId: Scalars['ID']['input'];
  startDate: Scalars['DateTime']['input'];
};

export type CreateUserInput = {
  address?: InputMaybe<AddressInput>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  role: UserRole;
};

export type ExtraItem = {
  __typename?: 'ExtraItem';
  cost: Scalars['Float']['output'];
  items: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type ExtraItemInput = {
  cost: Scalars['Float']['input'];
  items: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type Invoice = {
  __typename?: 'Invoice';
  createdAt: Scalars['DateTime']['output'];
  dueDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  invoiceNumber: Scalars['String']['output'];
  items: Array<InvoiceItem>;
  paidAt?: Maybe<Scalars['DateTime']['output']>;
  payment: Payment;
  status: InvoiceStatus;
  subtotal: Scalars['Float']['output'];
  tax: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type InvoiceItem = {
  __typename?: 'InvoiceItem';
  amount: Scalars['Float']['output'];
  description: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  unitPrice: Scalars['Float']['output'];
};

export enum InvoiceStatus {
  Cancelled = 'CANCELLED',
  Draft = 'DRAFT',
  Overdue = 'OVERDUE',
  Paid = 'PAID',
  Pending = 'PENDING',
  Sent = 'SENT'
}

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']['output']>;
  addPaymentMethod: PaymentMethod;
  assignStaff: Booking;
  cancelBooking: Booking;
  cancelInvoice: Invoice;
  cancelSubscription: Subscription;
  changePassword: Scalars['Boolean']['output'];
  completeBooking: Booking;
  createBooking: Scalars['Boolean']['output'];
  createPayment: Payment;
  createService: Service;
  createStaffProfile: StaffProfile;
  createSubscription: Subscription;
  deleteService: Scalars['Boolean']['output'];
  deleteStaffDocument: Scalars['Boolean']['output'];
  forgotPassword: Scalars['Boolean']['output'];
  generateInvoice: Invoice;
  login: AuthPayload;
  markInvoiceAsPaid: Invoice;
  reactivateSubscription: Subscription;
  refundPayment: Payment;
  register: AuthPayload;
  removePaymentMethod: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  setDefaultPaymentMethod: PaymentMethod;
  updateBooking: Booking;
  updateBookingStatus: Booking;
  updateProfile: User;
  updateService: Service;
  updateServiceStatus: Service;
  updateStaffAvailability: StaffProfile;
  updateStaffProfile: StaffProfile;
  updateStaffStatus: StaffProfile;
  updateSubscription: Subscription;
  updateSubscriptionStatus: Subscription;
  updateUserRole: User;
  uploadStaffDocument: StaffDocument;
  verifyStaffDocument: StaffDocument;
};


export type MutationAddPaymentMethodArgs = {
  input: AddPaymentMethodInput;
};


export type MutationAssignStaffArgs = {
  bookingId: Scalars['ID']['input'];
  staffId: Scalars['ID']['input'];
};


export type MutationCancelBookingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCancelInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCancelSubscriptionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationCompleteBookingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCreateBookingArgs = {
  input: CreateBookingInput;
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};


export type MutationCreateServiceArgs = {
  input: CreateServiceInput;
};


export type MutationCreateStaffProfileArgs = {
  input: CreateStaffProfileInput;
};


export type MutationCreateSubscriptionArgs = {
  input: CreateSubscriptionInput;
};


export type MutationDeleteServiceArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteStaffDocumentArgs = {
  documentId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationGenerateInvoiceArgs = {
  paymentId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationMarkInvoiceAsPaidArgs = {
  id: Scalars['ID']['input'];
};


export type MutationReactivateSubscriptionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRefundPaymentArgs = {
  input: RefundPaymentInput;
};


export type MutationRegisterArgs = {
  input: CreateUserInput;
};


export type MutationRemovePaymentMethodArgs = {
  id: Scalars['ID']['input'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSetDefaultPaymentMethodArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateBookingArgs = {
  id: Scalars['ID']['input'];
  input: UpdateBookingInput;
};


export type MutationUpdateBookingStatusArgs = {
  id: Scalars['ID']['input'];
  status: BookingStatus;
};


export type MutationUpdateProfileArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateServiceArgs = {
  id: Scalars['ID']['input'];
  input: UpdateServiceInput;
};


export type MutationUpdateServiceStatusArgs = {
  id: Scalars['ID']['input'];
  status: ServiceStatus;
};


export type MutationUpdateStaffAvailabilityArgs = {
  availability: Array<StaffAvailabilityInput>;
  id: Scalars['ID']['input'];
};


export type MutationUpdateStaffProfileArgs = {
  id: Scalars['ID']['input'];
  input: UpdateStaffProfileInput;
};


export type MutationUpdateStaffStatusArgs = {
  id: Scalars['ID']['input'];
  status: StaffStatus;
};


export type MutationUpdateSubscriptionArgs = {
  id: Scalars['ID']['input'];
  input: UpdateSubscriptionInput;
};


export type MutationUpdateSubscriptionStatusArgs = {
  id: Scalars['ID']['input'];
  status: SubscriptionStatus;
};


export type MutationUpdateUserRoleArgs = {
  role: UserRole;
  userId: Scalars['ID']['input'];
};


export type MutationUploadStaffDocumentArgs = {
  id: Scalars['ID']['input'];
  input: StaffDocumentInput;
};


export type MutationVerifyStaffDocumentArgs = {
  documentId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Float']['output'];
  booking: Booking;
  createdAt: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  customer: User;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  paymentIntentId: Scalars['String']['output'];
  paymentMethod: PaymentMethod;
  refundAmount?: Maybe<Scalars['Float']['output']>;
  refundReason?: Maybe<Scalars['String']['output']>;
  status: PaymentStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  brand: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  expiryMonth: Scalars['Int']['output'];
  expiryYear: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  isDefault: Scalars['Boolean']['output'];
  last4: Scalars['String']['output'];
  type: PaymentMethodType;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export enum PaymentMethodType {
  BankTransfer = 'BANK_TRANSFER',
  Cash = 'CASH',
  CreditCard = 'CREDIT_CARD',
  DebitCard = 'DEBIT_CARD',
  DigitalWallet = 'DIGITAL_WALLET'
}

export enum PaymentStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Paid = 'PAID',
  PartiallyRefunded = 'PARTIALLY_REFUNDED',
  Pending = 'PENDING',
  Refunded = 'REFUNDED'
}

export enum PropertyType {
  Duplex = 'DUPLEX',
  Flat = 'FLAT'
}

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']['output']>;
  availableStaff: Array<StaffProfile>;
  booking?: Maybe<Booking>;
  bookings: Array<Booking>;
  customerBookings: Array<Booking>;
  customerInvoices: Array<Invoice>;
  customerPayments: Array<Payment>;
  customerSubscriptions: Array<Subscription>;
  invoice: Invoice;
  me?: Maybe<User>;
  payment: Payment;
  paymentMethods: Array<PaymentMethod>;
  payments: Array<Payment>;
  service?: Maybe<Service>;
  services: Array<Service>;
  staffBookings: Array<Booking>;
  staffPerformance: StaffPerformance;
  staffProfile?: Maybe<StaffProfile>;
  staffProfiles: Array<StaffProfile>;
  subscription?: Maybe<Subscription>;
  subscriptions: Array<Subscription>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryAvailableStaffArgs = {
  date: Scalars['DateTime']['input'];
  serviceCategory: ServiceCategory;
};


export type QueryBookingArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBookingsArgs = {
  status?: InputMaybe<BookingStatus>;
};


export type QueryInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPaymentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPaymentsArgs = {
  status?: InputMaybe<PaymentStatus>;
};


export type QueryServiceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryServicesArgs = {
  category?: InputMaybe<ServiceCategory>;
  status?: InputMaybe<ServiceStatus>;
};


export type QueryStaffPerformanceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStaffProfileArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStaffProfilesArgs = {
  status?: InputMaybe<StaffStatus>;
};


export type QuerySubscriptionArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySubscriptionsArgs = {
  status?: InputMaybe<SubscriptionStatus>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  role?: InputMaybe<UserRole>;
};

export type RefundPaymentInput = {
  amount: Scalars['Float']['input'];
  paymentId: Scalars['ID']['input'];
  reason: Scalars['String']['input'];
};

export type RoomQuantities = {
  __typename?: 'RoomQuantities';
  bathrooms: Scalars['Int']['output'];
  bedrooms: Scalars['Int']['output'];
  kitchen: Scalars['Int']['output'];
  livingRooms: Scalars['Int']['output'];
  outdoor: Scalars['Int']['output'];
  study: Scalars['Int']['output'];
};

export type RoomQuantitiesInput = {
  bathrooms: Scalars['Int']['input'];
  bedrooms: Scalars['Int']['input'];
  kitchen: Scalars['Int']['input'];
  livingRooms: Scalars['Int']['input'];
  outdoor: Scalars['Int']['input'];
  study: Scalars['Int']['input'];
};

export type Service = {
  __typename?: 'Service';
  _id: Scalars['ID']['output'];
  category: ServiceCategory;
  description: Scalars['String']['output'];
  displayPrice: Scalars['String']['output'];
  features?: Maybe<Array<Scalars['String']['output']>>;
  icon: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inclusions?: Maybe<Array<Scalars['String']['output']>>;
  label: Scalars['String']['output'];
  name: Scalars['String']['output'];
  options?: Maybe<Array<ServiceOption>>;
  price: Scalars['Float']['output'];
  service_id: ServiceId;
  status: ServiceStatus;
};

export enum ServiceCategory {
  Cleaning = 'CLEANING',
  Cooking = 'COOKING',
  Errands = 'ERRANDS',
  Laundry = 'LAUNDRY',
  PestControl = 'PEST_CONTROL'
}

export enum ServiceId {
  Cleaning = 'CLEANING',
  DeepCleaning = 'DEEP_CLEANING',
  DryCleaning = 'DRY_CLEANING',
  Laundry = 'LAUNDRY',
  MoveInMoveOutCleaning = 'MOVE_IN_MOVE_OUT_CLEANING',
  PestControl = 'PEST_CONTROL',
  PestControlCommercial = 'PEST_CONTROL_COMMERCIAL',
  PestControlResidential = 'PEST_CONTROL_RESIDENTIAL',
  PostConstructionCleaning = 'POST_CONSTRUCTION_CLEANING',
  PremiumLaundry = 'PREMIUM_LAUNDRY',
  StandardCleaning = 'STANDARD_CLEANING',
  StandardLaundry = 'STANDARD_LAUNDRY'
}

export type ServiceOption = {
  __typename?: 'ServiceOption';
  description: Scalars['String']['output'];
  extraItems?: Maybe<Array<ExtraItem>>;
  id: Scalars['String']['output'];
  inclusions?: Maybe<Array<Scalars['String']['output']>>;
  label: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  service_id: ServiceId;
};

export type ServiceOptionInput = {
  description: Scalars['String']['input'];
  extraItems?: InputMaybe<Array<ExtraItemInput>>;
  inclusions?: InputMaybe<Array<Scalars['String']['input']>>;
  label: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  service_id: ServiceId;
};

export enum ServiceStatus {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Inactive = 'INACTIVE',
  Maintenance = 'MAINTENANCE'
}

export enum ServiceType {
  Cleaning = 'CLEANING',
  Laundry = 'LAUNDRY',
  PestControl = 'PEST_CONTROL'
}

export type StaffAvailability = {
  __typename?: 'StaffAvailability';
  dayOfWeek: Scalars['Int']['output'];
  endTime: Scalars['String']['output'];
  isAvailable: Scalars['Boolean']['output'];
  startTime: Scalars['String']['output'];
};

export type StaffAvailabilityInput = {
  dayOfWeek: Scalars['Int']['input'];
  endTime: Scalars['String']['input'];
  isAvailable: Scalars['Boolean']['input'];
  startTime: Scalars['String']['input'];
};

export type StaffDocument = {
  __typename?: 'StaffDocument';
  id: Scalars['ID']['output'];
  type: StaffDocumentType;
  uploadedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export type StaffDocumentInput = {
  type: StaffDocumentType;
  url: Scalars['String']['input'];
};

export enum StaffDocumentType {
  AddressProof = 'ADDRESS_PROOF',
  Certification = 'CERTIFICATION',
  CriminalRecord = 'CRIMINAL_RECORD',
  IdProof = 'ID_PROOF',
  Insurance = 'INSURANCE'
}

export enum StaffPerformance {
  Excellent = 'EXCELLENT',
  Good = 'GOOD',
  NeedsImprovement = 'NEEDS_IMPROVEMENT',
  Satisfactory = 'SATISFACTORY',
  Unsatisfactory = 'UNSATISFACTORY'
}

export type StaffProfile = {
  __typename?: 'StaffProfile';
  activeJobs: Scalars['Int']['output'];
  availability: Array<StaffAvailability>;
  completedJobs: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  documents: Array<StaffDocument>;
  id: Scalars['ID']['output'];
  rating: Scalars['Float']['output'];
  serviceCategories: Array<ServiceCategory>;
  status: StaffStatus;
  totalJobs: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export enum StaffStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  OnLeave = 'ON_LEAVE',
  Suspended = 'SUSPENDED'
}

export type Subscription = {
  __typename?: 'Subscription';
  _?: Maybe<Scalars['Boolean']['output']>;
  autoRenew: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  customer: User;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  frequency: SubscriptionFrequency;
  id: Scalars['ID']['output'];
  lastBillingDate?: Maybe<Scalars['DateTime']['output']>;
  nextBillingDate: Scalars['DateTime']['output'];
  plan: SubscriptionPlan;
  price: Scalars['Float']['output'];
  service: Service;
  startDate: Scalars['DateTime']['output'];
  status: SubscriptionStatus;
  updatedAt: Scalars['DateTime']['output'];
};

export enum SubscriptionFrequency {
  BiWeekly = 'BI_WEEKLY',
  Monthly = 'MONTHLY',
  Quarterly = 'QUARTERLY',
  Weekly = 'WEEKLY'
}

export enum SubscriptionPlan {
  Basic = 'BASIC',
  Luxury = 'LUXURY',
  Premium = 'PREMIUM'
}

export enum SubscriptionStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Expired = 'EXPIRED',
  Paused = 'PAUSED',
  Pending = 'PENDING',
  Suspended = 'SUSPENDED'
}

export enum TimeSlot {
  Afternoon = 'AFTERNOON',
  Evening = 'EVENING',
  Morning = 'MORNING'
}

export type UpdateBookingInput = {
  address: AddressInput;
  date: Scalars['DateTime']['input'];
  laundryBags?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  propertyType?: InputMaybe<PropertyType>;
  roomQuantities?: InputMaybe<RoomQuantitiesInput>;
  serviceOption: Scalars['String']['input'];
  serviceType: ServiceType;
  timeSlot: TimeSlot;
  totalPrice: Scalars['Float']['input'];
};

export type UpdateServiceInput = {
  category?: InputMaybe<ServiceCategory>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayPrice?: InputMaybe<Scalars['String']['input']>;
  features?: InputMaybe<Array<Scalars['String']['input']>>;
  icon?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  inclusions?: InputMaybe<Array<Scalars['String']['input']>>;
  label?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  options?: InputMaybe<Array<ServiceOptionInput>>;
  price?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<ServiceStatus>;
};

export type UpdateStaffProfileInput = {
  availability?: InputMaybe<Array<StaffAvailabilityInput>>;
  serviceCategories?: InputMaybe<Array<ServiceCategory>>;
  status?: InputMaybe<StaffStatus>;
};

export type UpdateSubscriptionInput = {
  autoRenew?: InputMaybe<Scalars['Boolean']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  frequency?: InputMaybe<SubscriptionFrequency>;
  plan?: InputMaybe<SubscriptionPlan>;
};

export type UpdateUserInput = {
  address?: InputMaybe<AddressInput>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Address>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  updatedAt: Scalars['DateTime']['output'];
};

export enum UserRole {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Staff = 'STAFF',
  SuperAdmin = 'SUPER_ADMIN'
}

export type RegisterMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, address?: { __typename?: 'Address', street: string, city: string, state: string, zipCode: string, country: string } | null } } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, address?: { __typename?: 'Address', street: string, city: string, state: string, zipCode: string, country: string } | null } } };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, address?: { __typename?: 'Address', street: string, city: string, state: string, zipCode: string, country: string } | null } };

export type ChangePasswordMutationVariables = Exact<{
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: boolean };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type UpdateUserRoleMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  role: UserRole;
}>;


export type UpdateUserRoleMutation = { __typename?: 'Mutation', updateUserRole: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, address?: { __typename?: 'Address', street: string, city: string, state: string, zipCode: string, country: string } | null } };

export type CreateBookingMutationVariables = Exact<{
  input: CreateBookingInput;
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: boolean };

export type UpdateBookingMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateBookingInput;
}>;


export type UpdateBookingMutation = { __typename?: 'Mutation', updateBooking: { __typename?: 'Booking', id: string, date: any, timeSlot: TimeSlot, status: BookingStatus, notes?: string | null, totalPrice: number, paymentStatus: PaymentStatus, createdAt: any, updatedAt: any, customer: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, service?: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string, description: string } | null, staff?: { __typename?: 'User', id: string, firstName: string, lastName: string } | null, address: { __typename?: 'Address', street: string, city: string, state: string, zipCode: string, country: string } } };

export type CancelBookingMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CancelBookingMutation = { __typename?: 'Mutation', cancelBooking: { __typename?: 'Booking', id: string, status: BookingStatus, updatedAt: any } };

export type CompleteBookingMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CompleteBookingMutation = { __typename?: 'Mutation', completeBooking: { __typename?: 'Booking', id: string, status: BookingStatus, updatedAt: any } };

export type AssignStaffMutationVariables = Exact<{
  bookingId: Scalars['ID']['input'];
  staffId: Scalars['ID']['input'];
}>;


export type AssignStaffMutation = { __typename?: 'Mutation', assignStaff: { __typename?: 'Booking', id: string, status: BookingStatus, updatedAt: any, staff?: { __typename?: 'User', id: string, firstName: string, lastName: string } | null } };

export type UpdateBookingStatusMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  status: BookingStatus;
}>;


export type UpdateBookingStatusMutation = { __typename?: 'Mutation', updateBookingStatus: { __typename?: 'Booking', id: string, status: BookingStatus, updatedAt: any } };

export type CreatePaymentMutationVariables = Exact<{
  input: CreatePaymentInput;
}>;


export type CreatePaymentMutation = { __typename?: 'Mutation', createPayment: { __typename?: 'Payment', id: string, amount: number, currency: string, status: PaymentStatus, paymentIntentId: string, refundAmount?: number | null, refundReason?: string | null, metadata?: any | null, createdAt: any, updatedAt: any, booking: { __typename?: 'Booking', id: string, service?: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string } | null }, customer: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, paymentMethod: { __typename?: 'PaymentMethod', id: string, type: PaymentMethodType, last4: string, expiryMonth: number, expiryYear: number, brand: string, isDefault: boolean } } };

export type RefundPaymentMutationVariables = Exact<{
  input: RefundPaymentInput;
}>;


export type RefundPaymentMutation = { __typename?: 'Mutation', refundPayment: { __typename?: 'Payment', id: string, amount: number, currency: string, status: PaymentStatus, refundAmount?: number | null, refundReason?: string | null, updatedAt: any } };

export type AddPaymentMethodMutationVariables = Exact<{
  input: AddPaymentMethodInput;
}>;


export type AddPaymentMethodMutation = { __typename?: 'Mutation', addPaymentMethod: { __typename?: 'PaymentMethod', id: string, type: PaymentMethodType, last4: string, expiryMonth: number, expiryYear: number, brand: string, isDefault: boolean, createdAt: any, updatedAt: any } };

export type RemovePaymentMethodMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemovePaymentMethodMutation = { __typename?: 'Mutation', removePaymentMethod: boolean };

export type SetDefaultPaymentMethodMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type SetDefaultPaymentMethodMutation = { __typename?: 'Mutation', setDefaultPaymentMethod: { __typename?: 'PaymentMethod', id: string, type: PaymentMethodType, last4: string, expiryMonth: number, expiryYear: number, brand: string, isDefault: boolean, updatedAt: any } };

export type GenerateInvoiceMutationVariables = Exact<{
  paymentId: Scalars['ID']['input'];
}>;


export type GenerateInvoiceMutation = { __typename?: 'Mutation', generateInvoice: { __typename?: 'Invoice', id: string, invoiceNumber: string, subtotal: number, tax: number, total: number, dueDate: any, status: InvoiceStatus, createdAt: any, updatedAt: any, items: Array<{ __typename?: 'InvoiceItem', description: string, quantity: number, unitPrice: number, amount: number }> } };

export type MarkInvoiceAsPaidMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type MarkInvoiceAsPaidMutation = { __typename?: 'Mutation', markInvoiceAsPaid: { __typename?: 'Invoice', id: string, status: InvoiceStatus, paidAt?: any | null, updatedAt: any } };

export type CancelInvoiceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CancelInvoiceMutation = { __typename?: 'Mutation', cancelInvoice: { __typename?: 'Invoice', id: string, status: InvoiceStatus, updatedAt: any } };

export type CreateServiceMutationVariables = Exact<{
  input: CreateServiceInput;
}>;


export type CreateServiceMutation = { __typename?: 'Mutation', createService: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string, label: string, description: string, category: ServiceCategory, icon: string, price: number, displayPrice: string, status: ServiceStatus, imageUrl?: string | null, features?: Array<string> | null, inclusions?: Array<string> | null, options?: Array<{ __typename?: 'ServiceOption', id: string, service_id: ServiceId, label: string, description: string, price: number, inclusions?: Array<string> | null, extraItems?: Array<{ __typename?: 'ExtraItem', name: string, items: number, cost: number }> | null }> | null } };

export type UpdateServiceMutationVariables = Exact<{
  updateServiceId: Scalars['ID']['input'];
  input: UpdateServiceInput;
}>;


export type UpdateServiceMutation = { __typename?: 'Mutation', updateService: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string, label: string, description: string, category: ServiceCategory, icon: string, price: number, displayPrice: string, status: ServiceStatus, imageUrl?: string | null, features?: Array<string> | null, inclusions?: Array<string> | null, options?: Array<{ __typename?: 'ServiceOption', id: string, service_id: ServiceId, label: string, description: string, price: number, inclusions?: Array<string> | null, extraItems?: Array<{ __typename?: 'ExtraItem', name: string, items: number, cost: number }> | null }> | null } };

export type DeleteServiceMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteServiceMutation = { __typename?: 'Mutation', deleteService: boolean };

export type UpdateServiceStatusMutationVariables = Exact<{
  updateServiceStatusId: Scalars['ID']['input'];
  status: ServiceStatus;
}>;


export type UpdateServiceStatusMutation = { __typename?: 'Mutation', updateServiceStatus: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string, label: string, description: string, category: ServiceCategory, icon: string, price: number, displayPrice: string, status: ServiceStatus, imageUrl?: string | null, features?: Array<string> | null, inclusions?: Array<string> | null, options?: Array<{ __typename?: 'ServiceOption', id: string, service_id: ServiceId, label: string, description: string, price: number, inclusions?: Array<string> | null, extraItems?: Array<{ __typename?: 'ExtraItem', name: string, items: number, cost: number }> | null }> | null } };

export type CreateStaffProfileMutationVariables = Exact<{
  input: CreateStaffProfileInput;
}>;


export type CreateStaffProfileMutation = { __typename?: 'Mutation', createStaffProfile: { __typename?: 'StaffProfile', id: string, serviceCategories: Array<ServiceCategory>, rating: number, totalJobs: number, completedJobs: number, activeJobs: number, status: StaffStatus, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, availability: Array<{ __typename?: 'StaffAvailability', dayOfWeek: number, startTime: string, endTime: string, isAvailable: boolean }>, documents: Array<{ __typename?: 'StaffDocument', id: string, type: StaffDocumentType, url: string, verified: boolean, uploadedAt: any }> } };

export type UpdateStaffProfileMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateStaffProfileInput;
}>;


export type UpdateStaffProfileMutation = { __typename?: 'Mutation', updateStaffProfile: { __typename?: 'StaffProfile', id: string, serviceCategories: Array<ServiceCategory>, rating: number, totalJobs: number, completedJobs: number, activeJobs: number, status: StaffStatus, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, availability: Array<{ __typename?: 'StaffAvailability', dayOfWeek: number, startTime: string, endTime: string, isAvailable: boolean }>, documents: Array<{ __typename?: 'StaffDocument', id: string, type: StaffDocumentType, url: string, verified: boolean, uploadedAt: any }> } };

export type UpdateStaffStatusMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  status: StaffStatus;
}>;


export type UpdateStaffStatusMutation = { __typename?: 'Mutation', updateStaffStatus: { __typename?: 'StaffProfile', id: string, status: StaffStatus, updatedAt: any } };

export type UpdateStaffAvailabilityMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  availability: Array<StaffAvailabilityInput> | StaffAvailabilityInput;
}>;


export type UpdateStaffAvailabilityMutation = { __typename?: 'Mutation', updateStaffAvailability: { __typename?: 'StaffProfile', id: string, updatedAt: any, availability: Array<{ __typename?: 'StaffAvailability', dayOfWeek: number, startTime: string, endTime: string, isAvailable: boolean }> } };

export type UploadStaffDocumentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: StaffDocumentInput;
}>;


export type UploadStaffDocumentMutation = { __typename?: 'Mutation', uploadStaffDocument: { __typename?: 'StaffDocument', id: string, type: StaffDocumentType, url: string, verified: boolean, uploadedAt: any } };

export type VerifyStaffDocumentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  documentId: Scalars['ID']['input'];
}>;


export type VerifyStaffDocumentMutation = { __typename?: 'Mutation', verifyStaffDocument: { __typename?: 'StaffDocument', id: string, type: StaffDocumentType, url: string, verified: boolean, uploadedAt: any } };

export type DeleteStaffDocumentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  documentId: Scalars['ID']['input'];
}>;


export type DeleteStaffDocumentMutation = { __typename?: 'Mutation', deleteStaffDocument: boolean };

export type CreateSubscriptionMutationVariables = Exact<{
  input: CreateSubscriptionInput;
}>;


export type CreateSubscriptionMutation = { __typename?: 'Mutation', createSubscription: { __typename?: 'Subscription', id: string, plan: SubscriptionPlan, startDate: any, endDate?: any | null, status: SubscriptionStatus, frequency: SubscriptionFrequency, price: number, nextBillingDate: any, lastBillingDate?: any | null, autoRenew: boolean, createdAt: any, updatedAt: any, customer: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, service: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string, description: string } } };

export type UpdateSubscriptionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateSubscriptionInput;
}>;


export type UpdateSubscriptionMutation = { __typename?: 'Mutation', updateSubscription: { __typename?: 'Subscription', id: string, plan: SubscriptionPlan, startDate: any, endDate?: any | null, status: SubscriptionStatus, frequency: SubscriptionFrequency, price: number, nextBillingDate: any, lastBillingDate?: any | null, autoRenew: boolean, createdAt: any, updatedAt: any, customer: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, service: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string, description: string } } };

export type CancelSubscriptionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CancelSubscriptionMutation = { __typename?: 'Mutation', cancelSubscription: { __typename?: 'Subscription', id: string, status: SubscriptionStatus, endDate?: any | null, updatedAt: any } };

export type ReactivateSubscriptionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ReactivateSubscriptionMutation = { __typename?: 'Mutation', reactivateSubscription: { __typename?: 'Subscription', id: string, status: SubscriptionStatus, endDate?: any | null, updatedAt: any } };

export type UpdateSubscriptionStatusMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  status: SubscriptionStatus;
}>;


export type UpdateSubscriptionStatusMutation = { __typename?: 'Mutation', updateSubscriptionStatus: { __typename?: 'Subscription', id: string, status: SubscriptionStatus, updatedAt: any } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any, address?: { __typename?: 'Address', street: string, city: string, state: string, zipCode: string, country: string } | null } | null };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any, address?: { __typename?: 'Address', street: string, city: string, state: string, zipCode: string, country: string } | null } | null };

export type GetUsersQueryVariables = Exact<{
  role?: InputMaybe<UserRole>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any, address?: { __typename?: 'Address', street: string, city: string, state: string, zipCode: string, country: string } | null }> };

export type GetBookingsQueryVariables = Exact<{
  status?: InputMaybe<BookingStatus>;
}>;


export type GetBookingsQuery = { __typename?: 'Query', bookings: Array<{ __typename?: 'Booking', id: string, date: any, timeSlot: TimeSlot, status: BookingStatus, notes?: string | null, totalPrice: number, paymentStatus: PaymentStatus, createdAt: any, updatedAt: any, serviceType: ServiceType, serviceOption: string, propertyType?: PropertyType | null, laundryBags?: number | null, recurringDiscount?: number | null, customer: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any, address?: { __typename?: 'Address', street: string, city: string, state: string, zipCode: string, country: string } | null }, service?: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string, label: string, description: string, category: ServiceCategory, icon: string, price: number, displayPrice: string, status: ServiceStatus, imageUrl?: string | null, features?: Array<string> | null, inclusions?: Array<string> | null, options?: Array<{ __typename?: 'ServiceOption', id: string, service_id: ServiceId, label: string, description: string, price: number, inclusions?: Array<string> | null, extraItems?: Array<{ __typename?: 'ExtraItem', name: string, items: number, cost: number }> | null }> | null } | null, staff?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any, address?: { __typename?: 'Address', street: string, city: string, state: string, zipCode: string, country: string } | null } | null, address: { __typename?: 'Address', street: string, city: string, state: string, zipCode: string, country: string }, roomQuantities?: { __typename?: 'RoomQuantities', bedrooms: number, livingRooms: number, bathrooms: number, kitchen: number, study: number, outdoor: number } | null }> };

export type GetBookingByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetBookingByIdQuery = { __typename?: 'Query', booking?: { __typename?: 'Booking', id: string, date: any, timeSlot: TimeSlot, status: BookingStatus, notes?: string | null, totalPrice: number, paymentStatus: PaymentStatus, createdAt: any, updatedAt: any, serviceType: ServiceType, serviceOption: string, propertyType?: PropertyType | null, laundryBags?: number | null, recurringDiscount?: number | null, customer: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any, address?: { __typename?: 'Address', street: string, city: string, state: string, zipCode: string, country: string } | null }, service?: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string, label: string, description: string, category: ServiceCategory, icon: string, price: number, displayPrice: string, status: ServiceStatus, imageUrl?: string | null, features?: Array<string> | null, inclusions?: Array<string> | null, options?: Array<{ __typename?: 'ServiceOption', id: string, service_id: ServiceId, label: string, description: string, price: number, inclusions?: Array<string> | null, extraItems?: Array<{ __typename?: 'ExtraItem', name: string, items: number, cost: number }> | null }> | null } | null, staff?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any, address?: { __typename?: 'Address', street: string, city: string, state: string, zipCode: string, country: string } | null } | null, address: { __typename?: 'Address', street: string, city: string, state: string, zipCode: string, country: string }, roomQuantities?: { __typename?: 'RoomQuantities', bedrooms: number, livingRooms: number, bathrooms: number, kitchen: number, study: number, outdoor: number } | null } | null };

export type GetCustomerBookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomerBookingsQuery = { __typename?: 'Query', customerBookings: Array<{ __typename?: 'Booking', id: string, date: any, timeSlot: TimeSlot, status: BookingStatus, notes?: string | null, totalPrice: number, paymentStatus: PaymentStatus, createdAt: any, updatedAt: any, serviceType: ServiceType, serviceOption: string, propertyType?: PropertyType | null, laundryBags?: number | null, recurringDiscount?: number | null, customer: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any, address?: { __typename?: 'Address', street: string, city: string, state: string, zipCode: string, country: string } | null }, service?: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string, label: string, description: string, category: ServiceCategory, icon: string, price: number, displayPrice: string, status: ServiceStatus, imageUrl?: string | null, features?: Array<string> | null, inclusions?: Array<string> | null, options?: Array<{ __typename?: 'ServiceOption', id: string, service_id: ServiceId, label: string, description: string, price: number, inclusions?: Array<string> | null, extraItems?: Array<{ __typename?: 'ExtraItem', name: string, items: number, cost: number }> | null }> | null } | null, staff?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any, address?: { __typename?: 'Address', street: string, city: string, state: string, zipCode: string, country: string } | null } | null, address: { __typename?: 'Address', street: string, city: string, state: string, zipCode: string, country: string }, roomQuantities?: { __typename?: 'RoomQuantities', bedrooms: number, livingRooms: number, bathrooms: number, kitchen: number, study: number, outdoor: number } | null }> };

export type GetStaffBookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStaffBookingsQuery = { __typename?: 'Query', staffBookings: Array<{ __typename?: 'Booking', id: string, date: any, timeSlot: TimeSlot, status: BookingStatus, notes?: string | null, totalPrice: number, paymentStatus: PaymentStatus, createdAt: any, updatedAt: any, serviceType: ServiceType, serviceOption: string, propertyType?: PropertyType | null, laundryBags?: number | null, recurringDiscount?: number | null, customer: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any, address?: { __typename?: 'Address', street: string, city: string, state: string, zipCode: string, country: string } | null }, service?: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string, label: string, description: string, category: ServiceCategory, icon: string, price: number, displayPrice: string, status: ServiceStatus, imageUrl?: string | null, features?: Array<string> | null, inclusions?: Array<string> | null, options?: Array<{ __typename?: 'ServiceOption', id: string, service_id: ServiceId, label: string, description: string, price: number, inclusions?: Array<string> | null, extraItems?: Array<{ __typename?: 'ExtraItem', name: string, items: number, cost: number }> | null }> | null } | null, staff?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any, address?: { __typename?: 'Address', street: string, city: string, state: string, zipCode: string, country: string } | null } | null, address: { __typename?: 'Address', street: string, city: string, state: string, zipCode: string, country: string }, roomQuantities?: { __typename?: 'RoomQuantities', bedrooms: number, livingRooms: number, bathrooms: number, kitchen: number, study: number, outdoor: number } | null }> };

export type GetPaymentByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPaymentByIdQuery = { __typename?: 'Query', payment: { __typename?: 'Payment', id: string, amount: number, currency: string, status: PaymentStatus, paymentIntentId: string, refundAmount?: number | null, refundReason?: string | null, metadata?: any | null, createdAt: any, updatedAt: any, booking: { __typename?: 'Booking', id: string, service?: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string } | null }, customer: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, paymentMethod: { __typename?: 'PaymentMethod', id: string, type: PaymentMethodType, last4: string, expiryMonth: number, expiryYear: number, brand: string, isDefault: boolean } } };

export type GetPaymentsQueryVariables = Exact<{
  status?: InputMaybe<PaymentStatus>;
}>;


export type GetPaymentsQuery = { __typename?: 'Query', payments: Array<{ __typename?: 'Payment', id: string, amount: number, currency: string, status: PaymentStatus, createdAt: any, updatedAt: any, booking: { __typename?: 'Booking', id: string, service?: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string } | null }, customer: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, paymentMethod: { __typename?: 'PaymentMethod', id: string, type: PaymentMethodType, last4: string, brand: string } }> };

export type GetCustomerPaymentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomerPaymentsQuery = { __typename?: 'Query', customerPayments: Array<{ __typename?: 'Payment', id: string, amount: number, currency: string, status: PaymentStatus, createdAt: any, updatedAt: any, booking: { __typename?: 'Booking', id: string, service?: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string } | null }, paymentMethod: { __typename?: 'PaymentMethod', id: string, type: PaymentMethodType, last4: string, brand: string } }> };

export type GetPaymentMethodsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPaymentMethodsQuery = { __typename?: 'Query', paymentMethods: Array<{ __typename?: 'PaymentMethod', id: string, type: PaymentMethodType, last4: string, expiryMonth: number, expiryYear: number, brand: string, isDefault: boolean, createdAt: any, updatedAt: any }> };

export type GetInvoiceByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetInvoiceByIdQuery = { __typename?: 'Query', invoice: { __typename?: 'Invoice', id: string, invoiceNumber: string, subtotal: number, tax: number, total: number, dueDate: any, status: InvoiceStatus, paidAt?: any | null, createdAt: any, updatedAt: any, payment: { __typename?: 'Payment', id: string, amount: number, currency: string }, items: Array<{ __typename?: 'InvoiceItem', description: string, quantity: number, unitPrice: number, amount: number }> } };

export type GetCustomerInvoicesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomerInvoicesQuery = { __typename?: 'Query', customerInvoices: Array<{ __typename?: 'Invoice', id: string, invoiceNumber: string, subtotal: number, tax: number, total: number, dueDate: any, status: InvoiceStatus, paidAt?: any | null, createdAt: any, updatedAt: any, items: Array<{ __typename?: 'InvoiceItem', description: string, quantity: number, unitPrice: number, amount: number }> }> };

export type GetServicesQueryVariables = Exact<{
  category?: InputMaybe<ServiceCategory>;
  status?: InputMaybe<ServiceStatus>;
}>;


export type GetServicesQuery = { __typename?: 'Query', services: Array<{ __typename?: 'Service', _id: string, service_id: ServiceId, name: string, label: string, description: string, category: ServiceCategory, icon: string, price: number, displayPrice: string, status: ServiceStatus, imageUrl?: string | null, features?: Array<string> | null, inclusions?: Array<string> | null, options?: Array<{ __typename?: 'ServiceOption', id: string, service_id: ServiceId, label: string, description: string, price: number, inclusions?: Array<string> | null, extraItems?: Array<{ __typename?: 'ExtraItem', name: string, items: number, cost: number }> | null }> | null }> };

export type GetServiceByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetServiceByIdQuery = { __typename?: 'Query', service?: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string, label: string, description: string, category: ServiceCategory, icon: string, price: number, displayPrice: string, status: ServiceStatus, imageUrl?: string | null, features?: Array<string> | null, inclusions?: Array<string> | null, options?: Array<{ __typename?: 'ServiceOption', id: string, service_id: ServiceId, label: string, description: string, price: number, inclusions?: Array<string> | null, extraItems?: Array<{ __typename?: 'ExtraItem', name: string, items: number, cost: number }> | null }> | null } | null };

export type GetStaffProfilesQueryVariables = Exact<{
  status?: InputMaybe<StaffStatus>;
}>;


export type GetStaffProfilesQuery = { __typename?: 'Query', staffProfiles: Array<{ __typename?: 'StaffProfile', id: string, serviceCategories: Array<ServiceCategory>, rating: number, totalJobs: number, completedJobs: number, activeJobs: number, status: StaffStatus, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, availability: Array<{ __typename?: 'StaffAvailability', dayOfWeek: number, startTime: string, endTime: string, isAvailable: boolean }>, documents: Array<{ __typename?: 'StaffDocument', id: string, type: StaffDocumentType, url: string, verified: boolean, uploadedAt: any }> }> };

export type GetStaffProfileByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetStaffProfileByIdQuery = { __typename?: 'Query', staffProfile?: { __typename?: 'StaffProfile', id: string, serviceCategories: Array<ServiceCategory>, rating: number, totalJobs: number, completedJobs: number, activeJobs: number, status: StaffStatus, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, availability: Array<{ __typename?: 'StaffAvailability', dayOfWeek: number, startTime: string, endTime: string, isAvailable: boolean }>, documents: Array<{ __typename?: 'StaffDocument', id: string, type: StaffDocumentType, url: string, verified: boolean, uploadedAt: any }> } | null };

export type GetAvailableStaffQueryVariables = Exact<{
  serviceCategory: ServiceCategory;
  date: Scalars['DateTime']['input'];
}>;


export type GetAvailableStaffQuery = { __typename?: 'Query', availableStaff: Array<{ __typename?: 'StaffProfile', id: string, serviceCategories: Array<ServiceCategory>, rating: number, totalJobs: number, completedJobs: number, activeJobs: number, status: StaffStatus, user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, availability: Array<{ __typename?: 'StaffAvailability', dayOfWeek: number, startTime: string, endTime: string, isAvailable: boolean }> }> };

export type GetStaffPerformanceQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetStaffPerformanceQuery = { __typename?: 'Query', staffPerformance: StaffPerformance };

export type GetSubscriptionByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetSubscriptionByIdQuery = { __typename?: 'Query', subscription?: { __typename?: 'Subscription', id: string, plan: SubscriptionPlan, startDate: any, endDate?: any | null, status: SubscriptionStatus, frequency: SubscriptionFrequency, price: number, nextBillingDate: any, lastBillingDate?: any | null, autoRenew: boolean, createdAt: any, updatedAt: any, customer: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, service: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string, description: string } } | null };

export type GetSubscriptionsQueryVariables = Exact<{
  status?: InputMaybe<SubscriptionStatus>;
}>;


export type GetSubscriptionsQuery = { __typename?: 'Query', subscriptions: Array<{ __typename?: 'Subscription', id: string, plan: SubscriptionPlan, startDate: any, endDate?: any | null, status: SubscriptionStatus, frequency: SubscriptionFrequency, price: number, nextBillingDate: any, lastBillingDate?: any | null, autoRenew: boolean, createdAt: any, updatedAt: any, customer: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, service: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string, description: string } }> };

export type GetCustomerSubscriptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomerSubscriptionsQuery = { __typename?: 'Query', customerSubscriptions: Array<{ __typename?: 'Subscription', id: string, plan: SubscriptionPlan, startDate: any, endDate?: any | null, status: SubscriptionStatus, frequency: SubscriptionFrequency, price: number, nextBillingDate: any, lastBillingDate?: any | null, autoRenew: boolean, createdAt: any, updatedAt: any, service: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string, description: string } }> };


export const RegisterDocument = gql`
    mutation Register($input: CreateUserInput!) {
  register(input: $input) {
    token
    user {
      id
      email
      firstName
      lastName
      role
      phone
      address {
        street
        city
        state
        zipCode
        country
      }
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      email
      firstName
      lastName
      role
      phone
      address {
        street
        city
        state
        zipCode
        country
      }
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: UpdateUserInput!) {
  updateProfile(input: $input) {
    id
    email
    firstName
    lastName
    role
    phone
    address {
      street
      city
      state
      zipCode
      country
    }
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
  changePassword(currentPassword: $currentPassword, newPassword: $newPassword)
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      currentPassword: // value for 'currentPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $newPassword: String!) {
  resetPassword(token: $token, newPassword: $newPassword)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const UpdateUserRoleDocument = gql`
    mutation UpdateUserRole($userId: ID!, $role: UserRole!) {
  updateUserRole(userId: $userId, role: $role) {
    id
    email
    firstName
    lastName
    role
    phone
    address {
      street
      city
      state
      zipCode
      country
    }
  }
}
    `;
export type UpdateUserRoleMutationFn = Apollo.MutationFunction<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>;

/**
 * __useUpdateUserRoleMutation__
 *
 * To run a mutation, you first call `useUpdateUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserRoleMutation, { data, loading, error }] = useUpdateUserRoleMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useUpdateUserRoleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>(UpdateUserRoleDocument, options);
      }
export type UpdateUserRoleMutationHookResult = ReturnType<typeof useUpdateUserRoleMutation>;
export type UpdateUserRoleMutationResult = Apollo.MutationResult<UpdateUserRoleMutation>;
export type UpdateUserRoleMutationOptions = Apollo.BaseMutationOptions<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>;
export const CreateBookingDocument = gql`
    mutation CreateBooking($input: CreateBookingInput!) {
  createBooking(input: $input)
}
    `;
export type CreateBookingMutationFn = Apollo.MutationFunction<CreateBookingMutation, CreateBookingMutationVariables>;

/**
 * __useCreateBookingMutation__
 *
 * To run a mutation, you first call `useCreateBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookingMutation, { data, loading, error }] = useCreateBookingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBookingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateBookingMutation, CreateBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateBookingMutation, CreateBookingMutationVariables>(CreateBookingDocument, options);
      }
export type CreateBookingMutationHookResult = ReturnType<typeof useCreateBookingMutation>;
export type CreateBookingMutationResult = Apollo.MutationResult<CreateBookingMutation>;
export type CreateBookingMutationOptions = Apollo.BaseMutationOptions<CreateBookingMutation, CreateBookingMutationVariables>;
export const UpdateBookingDocument = gql`
    mutation UpdateBooking($id: ID!, $input: UpdateBookingInput!) {
  updateBooking(id: $id, input: $input) {
    id
    customer {
      id
      firstName
      lastName
      email
    }
    service {
      _id
      service_id
      name
      description
    }
    staff {
      id
      firstName
      lastName
    }
    date
    timeSlot
    status
    notes
    address {
      street
      city
      state
      zipCode
      country
    }
    totalPrice
    paymentStatus
    createdAt
    updatedAt
  }
}
    `;
export type UpdateBookingMutationFn = Apollo.MutationFunction<UpdateBookingMutation, UpdateBookingMutationVariables>;

/**
 * __useUpdateBookingMutation__
 *
 * To run a mutation, you first call `useUpdateBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookingMutation, { data, loading, error }] = useUpdateBookingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBookingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateBookingMutation, UpdateBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateBookingMutation, UpdateBookingMutationVariables>(UpdateBookingDocument, options);
      }
export type UpdateBookingMutationHookResult = ReturnType<typeof useUpdateBookingMutation>;
export type UpdateBookingMutationResult = Apollo.MutationResult<UpdateBookingMutation>;
export type UpdateBookingMutationOptions = Apollo.BaseMutationOptions<UpdateBookingMutation, UpdateBookingMutationVariables>;
export const CancelBookingDocument = gql`
    mutation CancelBooking($id: ID!) {
  cancelBooking(id: $id) {
    id
    status
    updatedAt
  }
}
    `;
export type CancelBookingMutationFn = Apollo.MutationFunction<CancelBookingMutation, CancelBookingMutationVariables>;

/**
 * __useCancelBookingMutation__
 *
 * To run a mutation, you first call `useCancelBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelBookingMutation, { data, loading, error }] = useCancelBookingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCancelBookingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CancelBookingMutation, CancelBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CancelBookingMutation, CancelBookingMutationVariables>(CancelBookingDocument, options);
      }
export type CancelBookingMutationHookResult = ReturnType<typeof useCancelBookingMutation>;
export type CancelBookingMutationResult = Apollo.MutationResult<CancelBookingMutation>;
export type CancelBookingMutationOptions = Apollo.BaseMutationOptions<CancelBookingMutation, CancelBookingMutationVariables>;
export const CompleteBookingDocument = gql`
    mutation CompleteBooking($id: ID!) {
  completeBooking(id: $id) {
    id
    status
    updatedAt
  }
}
    `;
export type CompleteBookingMutationFn = Apollo.MutationFunction<CompleteBookingMutation, CompleteBookingMutationVariables>;

/**
 * __useCompleteBookingMutation__
 *
 * To run a mutation, you first call `useCompleteBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeBookingMutation, { data, loading, error }] = useCompleteBookingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCompleteBookingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CompleteBookingMutation, CompleteBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CompleteBookingMutation, CompleteBookingMutationVariables>(CompleteBookingDocument, options);
      }
export type CompleteBookingMutationHookResult = ReturnType<typeof useCompleteBookingMutation>;
export type CompleteBookingMutationResult = Apollo.MutationResult<CompleteBookingMutation>;
export type CompleteBookingMutationOptions = Apollo.BaseMutationOptions<CompleteBookingMutation, CompleteBookingMutationVariables>;
export const AssignStaffDocument = gql`
    mutation AssignStaff($bookingId: ID!, $staffId: ID!) {
  assignStaff(bookingId: $bookingId, staffId: $staffId) {
    id
    staff {
      id
      firstName
      lastName
    }
    status
    updatedAt
  }
}
    `;
export type AssignStaffMutationFn = Apollo.MutationFunction<AssignStaffMutation, AssignStaffMutationVariables>;

/**
 * __useAssignStaffMutation__
 *
 * To run a mutation, you first call `useAssignStaffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignStaffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignStaffMutation, { data, loading, error }] = useAssignStaffMutation({
 *   variables: {
 *      bookingId: // value for 'bookingId'
 *      staffId: // value for 'staffId'
 *   },
 * });
 */
export function useAssignStaffMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AssignStaffMutation, AssignStaffMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AssignStaffMutation, AssignStaffMutationVariables>(AssignStaffDocument, options);
      }
export type AssignStaffMutationHookResult = ReturnType<typeof useAssignStaffMutation>;
export type AssignStaffMutationResult = Apollo.MutationResult<AssignStaffMutation>;
export type AssignStaffMutationOptions = Apollo.BaseMutationOptions<AssignStaffMutation, AssignStaffMutationVariables>;
export const UpdateBookingStatusDocument = gql`
    mutation UpdateBookingStatus($id: ID!, $status: BookingStatus!) {
  updateBookingStatus(id: $id, status: $status) {
    id
    status
    updatedAt
  }
}
    `;
export type UpdateBookingStatusMutationFn = Apollo.MutationFunction<UpdateBookingStatusMutation, UpdateBookingStatusMutationVariables>;

/**
 * __useUpdateBookingStatusMutation__
 *
 * To run a mutation, you first call `useUpdateBookingStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookingStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookingStatusMutation, { data, loading, error }] = useUpdateBookingStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateBookingStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateBookingStatusMutation, UpdateBookingStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateBookingStatusMutation, UpdateBookingStatusMutationVariables>(UpdateBookingStatusDocument, options);
      }
export type UpdateBookingStatusMutationHookResult = ReturnType<typeof useUpdateBookingStatusMutation>;
export type UpdateBookingStatusMutationResult = Apollo.MutationResult<UpdateBookingStatusMutation>;
export type UpdateBookingStatusMutationOptions = Apollo.BaseMutationOptions<UpdateBookingStatusMutation, UpdateBookingStatusMutationVariables>;
export const CreatePaymentDocument = gql`
    mutation CreatePayment($input: CreatePaymentInput!) {
  createPayment(input: $input) {
    id
    booking {
      id
      service {
        _id
        service_id
        name
      }
    }
    customer {
      id
      firstName
      lastName
      email
    }
    amount
    currency
    status
    paymentMethod {
      id
      type
      last4
      expiryMonth
      expiryYear
      brand
      isDefault
    }
    paymentIntentId
    refundAmount
    refundReason
    metadata
    createdAt
    updatedAt
  }
}
    `;
export type CreatePaymentMutationFn = Apollo.MutationFunction<CreatePaymentMutation, CreatePaymentMutationVariables>;

/**
 * __useCreatePaymentMutation__
 *
 * To run a mutation, you first call `useCreatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentMutation, { data, loading, error }] = useCreatePaymentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePaymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePaymentMutation, CreatePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreatePaymentMutation, CreatePaymentMutationVariables>(CreatePaymentDocument, options);
      }
export type CreatePaymentMutationHookResult = ReturnType<typeof useCreatePaymentMutation>;
export type CreatePaymentMutationResult = Apollo.MutationResult<CreatePaymentMutation>;
export type CreatePaymentMutationOptions = Apollo.BaseMutationOptions<CreatePaymentMutation, CreatePaymentMutationVariables>;
export const RefundPaymentDocument = gql`
    mutation RefundPayment($input: RefundPaymentInput!) {
  refundPayment(input: $input) {
    id
    amount
    currency
    status
    refundAmount
    refundReason
    updatedAt
  }
}
    `;
export type RefundPaymentMutationFn = Apollo.MutationFunction<RefundPaymentMutation, RefundPaymentMutationVariables>;

/**
 * __useRefundPaymentMutation__
 *
 * To run a mutation, you first call `useRefundPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefundPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refundPaymentMutation, { data, loading, error }] = useRefundPaymentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRefundPaymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RefundPaymentMutation, RefundPaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RefundPaymentMutation, RefundPaymentMutationVariables>(RefundPaymentDocument, options);
      }
export type RefundPaymentMutationHookResult = ReturnType<typeof useRefundPaymentMutation>;
export type RefundPaymentMutationResult = Apollo.MutationResult<RefundPaymentMutation>;
export type RefundPaymentMutationOptions = Apollo.BaseMutationOptions<RefundPaymentMutation, RefundPaymentMutationVariables>;
export const AddPaymentMethodDocument = gql`
    mutation AddPaymentMethod($input: AddPaymentMethodInput!) {
  addPaymentMethod(input: $input) {
    id
    type
    last4
    expiryMonth
    expiryYear
    brand
    isDefault
    createdAt
    updatedAt
  }
}
    `;
export type AddPaymentMethodMutationFn = Apollo.MutationFunction<AddPaymentMethodMutation, AddPaymentMethodMutationVariables>;

/**
 * __useAddPaymentMethodMutation__
 *
 * To run a mutation, you first call `useAddPaymentMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPaymentMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPaymentMethodMutation, { data, loading, error }] = useAddPaymentMethodMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddPaymentMethodMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddPaymentMethodMutation, AddPaymentMethodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AddPaymentMethodMutation, AddPaymentMethodMutationVariables>(AddPaymentMethodDocument, options);
      }
export type AddPaymentMethodMutationHookResult = ReturnType<typeof useAddPaymentMethodMutation>;
export type AddPaymentMethodMutationResult = Apollo.MutationResult<AddPaymentMethodMutation>;
export type AddPaymentMethodMutationOptions = Apollo.BaseMutationOptions<AddPaymentMethodMutation, AddPaymentMethodMutationVariables>;
export const RemovePaymentMethodDocument = gql`
    mutation RemovePaymentMethod($id: ID!) {
  removePaymentMethod(id: $id)
}
    `;
export type RemovePaymentMethodMutationFn = Apollo.MutationFunction<RemovePaymentMethodMutation, RemovePaymentMethodMutationVariables>;

/**
 * __useRemovePaymentMethodMutation__
 *
 * To run a mutation, you first call `useRemovePaymentMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePaymentMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePaymentMethodMutation, { data, loading, error }] = useRemovePaymentMethodMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemovePaymentMethodMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemovePaymentMethodMutation, RemovePaymentMethodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemovePaymentMethodMutation, RemovePaymentMethodMutationVariables>(RemovePaymentMethodDocument, options);
      }
export type RemovePaymentMethodMutationHookResult = ReturnType<typeof useRemovePaymentMethodMutation>;
export type RemovePaymentMethodMutationResult = Apollo.MutationResult<RemovePaymentMethodMutation>;
export type RemovePaymentMethodMutationOptions = Apollo.BaseMutationOptions<RemovePaymentMethodMutation, RemovePaymentMethodMutationVariables>;
export const SetDefaultPaymentMethodDocument = gql`
    mutation SetDefaultPaymentMethod($id: ID!) {
  setDefaultPaymentMethod(id: $id) {
    id
    type
    last4
    expiryMonth
    expiryYear
    brand
    isDefault
    updatedAt
  }
}
    `;
export type SetDefaultPaymentMethodMutationFn = Apollo.MutationFunction<SetDefaultPaymentMethodMutation, SetDefaultPaymentMethodMutationVariables>;

/**
 * __useSetDefaultPaymentMethodMutation__
 *
 * To run a mutation, you first call `useSetDefaultPaymentMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDefaultPaymentMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDefaultPaymentMethodMutation, { data, loading, error }] = useSetDefaultPaymentMethodMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSetDefaultPaymentMethodMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetDefaultPaymentMethodMutation, SetDefaultPaymentMethodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetDefaultPaymentMethodMutation, SetDefaultPaymentMethodMutationVariables>(SetDefaultPaymentMethodDocument, options);
      }
export type SetDefaultPaymentMethodMutationHookResult = ReturnType<typeof useSetDefaultPaymentMethodMutation>;
export type SetDefaultPaymentMethodMutationResult = Apollo.MutationResult<SetDefaultPaymentMethodMutation>;
export type SetDefaultPaymentMethodMutationOptions = Apollo.BaseMutationOptions<SetDefaultPaymentMethodMutation, SetDefaultPaymentMethodMutationVariables>;
export const GenerateInvoiceDocument = gql`
    mutation GenerateInvoice($paymentId: ID!) {
  generateInvoice(paymentId: $paymentId) {
    id
    invoiceNumber
    subtotal
    tax
    total
    dueDate
    status
    items {
      description
      quantity
      unitPrice
      amount
    }
    createdAt
    updatedAt
  }
}
    `;
export type GenerateInvoiceMutationFn = Apollo.MutationFunction<GenerateInvoiceMutation, GenerateInvoiceMutationVariables>;

/**
 * __useGenerateInvoiceMutation__
 *
 * To run a mutation, you first call `useGenerateInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateInvoiceMutation, { data, loading, error }] = useGenerateInvoiceMutation({
 *   variables: {
 *      paymentId: // value for 'paymentId'
 *   },
 * });
 */
export function useGenerateInvoiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GenerateInvoiceMutation, GenerateInvoiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<GenerateInvoiceMutation, GenerateInvoiceMutationVariables>(GenerateInvoiceDocument, options);
      }
export type GenerateInvoiceMutationHookResult = ReturnType<typeof useGenerateInvoiceMutation>;
export type GenerateInvoiceMutationResult = Apollo.MutationResult<GenerateInvoiceMutation>;
export type GenerateInvoiceMutationOptions = Apollo.BaseMutationOptions<GenerateInvoiceMutation, GenerateInvoiceMutationVariables>;
export const MarkInvoiceAsPaidDocument = gql`
    mutation MarkInvoiceAsPaid($id: ID!) {
  markInvoiceAsPaid(id: $id) {
    id
    status
    paidAt
    updatedAt
  }
}
    `;
export type MarkInvoiceAsPaidMutationFn = Apollo.MutationFunction<MarkInvoiceAsPaidMutation, MarkInvoiceAsPaidMutationVariables>;

/**
 * __useMarkInvoiceAsPaidMutation__
 *
 * To run a mutation, you first call `useMarkInvoiceAsPaidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkInvoiceAsPaidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markInvoiceAsPaidMutation, { data, loading, error }] = useMarkInvoiceAsPaidMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkInvoiceAsPaidMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MarkInvoiceAsPaidMutation, MarkInvoiceAsPaidMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<MarkInvoiceAsPaidMutation, MarkInvoiceAsPaidMutationVariables>(MarkInvoiceAsPaidDocument, options);
      }
export type MarkInvoiceAsPaidMutationHookResult = ReturnType<typeof useMarkInvoiceAsPaidMutation>;
export type MarkInvoiceAsPaidMutationResult = Apollo.MutationResult<MarkInvoiceAsPaidMutation>;
export type MarkInvoiceAsPaidMutationOptions = Apollo.BaseMutationOptions<MarkInvoiceAsPaidMutation, MarkInvoiceAsPaidMutationVariables>;
export const CancelInvoiceDocument = gql`
    mutation CancelInvoice($id: ID!) {
  cancelInvoice(id: $id) {
    id
    status
    updatedAt
  }
}
    `;
export type CancelInvoiceMutationFn = Apollo.MutationFunction<CancelInvoiceMutation, CancelInvoiceMutationVariables>;

/**
 * __useCancelInvoiceMutation__
 *
 * To run a mutation, you first call `useCancelInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelInvoiceMutation, { data, loading, error }] = useCancelInvoiceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCancelInvoiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CancelInvoiceMutation, CancelInvoiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CancelInvoiceMutation, CancelInvoiceMutationVariables>(CancelInvoiceDocument, options);
      }
export type CancelInvoiceMutationHookResult = ReturnType<typeof useCancelInvoiceMutation>;
export type CancelInvoiceMutationResult = Apollo.MutationResult<CancelInvoiceMutation>;
export type CancelInvoiceMutationOptions = Apollo.BaseMutationOptions<CancelInvoiceMutation, CancelInvoiceMutationVariables>;
export const CreateServiceDocument = gql`
    mutation CreateService($input: CreateServiceInput!) {
  createService(input: $input) {
    _id
    service_id
    name
    label
    description
    category
    icon
    price
    displayPrice
    status
    imageUrl
    features
    inclusions
    options {
      id
      service_id
      label
      description
      price
      inclusions
      extraItems {
        name
        items
        cost
      }
    }
  }
}
    `;
export type CreateServiceMutationFn = Apollo.MutationFunction<CreateServiceMutation, CreateServiceMutationVariables>;

/**
 * __useCreateServiceMutation__
 *
 * To run a mutation, you first call `useCreateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServiceMutation, { data, loading, error }] = useCreateServiceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateServiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateServiceMutation, CreateServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateServiceMutation, CreateServiceMutationVariables>(CreateServiceDocument, options);
      }
export type CreateServiceMutationHookResult = ReturnType<typeof useCreateServiceMutation>;
export type CreateServiceMutationResult = Apollo.MutationResult<CreateServiceMutation>;
export type CreateServiceMutationOptions = Apollo.BaseMutationOptions<CreateServiceMutation, CreateServiceMutationVariables>;
export const UpdateServiceDocument = gql`
    mutation UpdateService($updateServiceId: ID!, $input: UpdateServiceInput!) {
  updateService(id: $updateServiceId, input: $input) {
    _id
    service_id
    name
    label
    description
    category
    icon
    price
    displayPrice
    status
    imageUrl
    features
    inclusions
    options {
      id
      service_id
      label
      description
      price
      inclusions
      extraItems {
        name
        items
        cost
      }
    }
  }
}
    `;
export type UpdateServiceMutationFn = Apollo.MutationFunction<UpdateServiceMutation, UpdateServiceMutationVariables>;

/**
 * __useUpdateServiceMutation__
 *
 * To run a mutation, you first call `useUpdateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServiceMutation, { data, loading, error }] = useUpdateServiceMutation({
 *   variables: {
 *      updateServiceId: // value for 'updateServiceId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateServiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateServiceMutation, UpdateServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateServiceMutation, UpdateServiceMutationVariables>(UpdateServiceDocument, options);
      }
export type UpdateServiceMutationHookResult = ReturnType<typeof useUpdateServiceMutation>;
export type UpdateServiceMutationResult = Apollo.MutationResult<UpdateServiceMutation>;
export type UpdateServiceMutationOptions = Apollo.BaseMutationOptions<UpdateServiceMutation, UpdateServiceMutationVariables>;
export const DeleteServiceDocument = gql`
    mutation DeleteService($id: ID!) {
  deleteService(id: $id)
}
    `;
export type DeleteServiceMutationFn = Apollo.MutationFunction<DeleteServiceMutation, DeleteServiceMutationVariables>;

/**
 * __useDeleteServiceMutation__
 *
 * To run a mutation, you first call `useDeleteServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteServiceMutation, { data, loading, error }] = useDeleteServiceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteServiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteServiceMutation, DeleteServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteServiceMutation, DeleteServiceMutationVariables>(DeleteServiceDocument, options);
      }
export type DeleteServiceMutationHookResult = ReturnType<typeof useDeleteServiceMutation>;
export type DeleteServiceMutationResult = Apollo.MutationResult<DeleteServiceMutation>;
export type DeleteServiceMutationOptions = Apollo.BaseMutationOptions<DeleteServiceMutation, DeleteServiceMutationVariables>;
export const UpdateServiceStatusDocument = gql`
    mutation UpdateServiceStatus($updateServiceStatusId: ID!, $status: ServiceStatus!) {
  updateServiceStatus(id: $updateServiceStatusId, status: $status) {
    _id
    service_id
    name
    label
    description
    category
    icon
    price
    displayPrice
    status
    imageUrl
    features
    inclusions
    options {
      id
      service_id
      label
      description
      price
      inclusions
      extraItems {
        name
        items
        cost
      }
    }
  }
}
    `;
export type UpdateServiceStatusMutationFn = Apollo.MutationFunction<UpdateServiceStatusMutation, UpdateServiceStatusMutationVariables>;

/**
 * __useUpdateServiceStatusMutation__
 *
 * To run a mutation, you first call `useUpdateServiceStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServiceStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServiceStatusMutation, { data, loading, error }] = useUpdateServiceStatusMutation({
 *   variables: {
 *      updateServiceStatusId: // value for 'updateServiceStatusId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateServiceStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateServiceStatusMutation, UpdateServiceStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateServiceStatusMutation, UpdateServiceStatusMutationVariables>(UpdateServiceStatusDocument, options);
      }
export type UpdateServiceStatusMutationHookResult = ReturnType<typeof useUpdateServiceStatusMutation>;
export type UpdateServiceStatusMutationResult = Apollo.MutationResult<UpdateServiceStatusMutation>;
export type UpdateServiceStatusMutationOptions = Apollo.BaseMutationOptions<UpdateServiceStatusMutation, UpdateServiceStatusMutationVariables>;
export const CreateStaffProfileDocument = gql`
    mutation CreateStaffProfile($input: CreateStaffProfileInput!) {
  createStaffProfile(input: $input) {
    id
    user {
      id
      firstName
      lastName
      email
    }
    serviceCategories
    availability {
      dayOfWeek
      startTime
      endTime
      isAvailable
    }
    rating
    totalJobs
    completedJobs
    activeJobs
    documents {
      id
      type
      url
      verified
      uploadedAt
    }
    status
    createdAt
    updatedAt
  }
}
    `;
export type CreateStaffProfileMutationFn = Apollo.MutationFunction<CreateStaffProfileMutation, CreateStaffProfileMutationVariables>;

/**
 * __useCreateStaffProfileMutation__
 *
 * To run a mutation, you first call `useCreateStaffProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStaffProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStaffProfileMutation, { data, loading, error }] = useCreateStaffProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStaffProfileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateStaffProfileMutation, CreateStaffProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateStaffProfileMutation, CreateStaffProfileMutationVariables>(CreateStaffProfileDocument, options);
      }
export type CreateStaffProfileMutationHookResult = ReturnType<typeof useCreateStaffProfileMutation>;
export type CreateStaffProfileMutationResult = Apollo.MutationResult<CreateStaffProfileMutation>;
export type CreateStaffProfileMutationOptions = Apollo.BaseMutationOptions<CreateStaffProfileMutation, CreateStaffProfileMutationVariables>;
export const UpdateStaffProfileDocument = gql`
    mutation UpdateStaffProfile($id: ID!, $input: UpdateStaffProfileInput!) {
  updateStaffProfile(id: $id, input: $input) {
    id
    user {
      id
      firstName
      lastName
      email
    }
    serviceCategories
    availability {
      dayOfWeek
      startTime
      endTime
      isAvailable
    }
    rating
    totalJobs
    completedJobs
    activeJobs
    documents {
      id
      type
      url
      verified
      uploadedAt
    }
    status
    createdAt
    updatedAt
  }
}
    `;
export type UpdateStaffProfileMutationFn = Apollo.MutationFunction<UpdateStaffProfileMutation, UpdateStaffProfileMutationVariables>;

/**
 * __useUpdateStaffProfileMutation__
 *
 * To run a mutation, you first call `useUpdateStaffProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStaffProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStaffProfileMutation, { data, loading, error }] = useUpdateStaffProfileMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateStaffProfileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateStaffProfileMutation, UpdateStaffProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateStaffProfileMutation, UpdateStaffProfileMutationVariables>(UpdateStaffProfileDocument, options);
      }
export type UpdateStaffProfileMutationHookResult = ReturnType<typeof useUpdateStaffProfileMutation>;
export type UpdateStaffProfileMutationResult = Apollo.MutationResult<UpdateStaffProfileMutation>;
export type UpdateStaffProfileMutationOptions = Apollo.BaseMutationOptions<UpdateStaffProfileMutation, UpdateStaffProfileMutationVariables>;
export const UpdateStaffStatusDocument = gql`
    mutation UpdateStaffStatus($id: ID!, $status: StaffStatus!) {
  updateStaffStatus(id: $id, status: $status) {
    id
    status
    updatedAt
  }
}
    `;
export type UpdateStaffStatusMutationFn = Apollo.MutationFunction<UpdateStaffStatusMutation, UpdateStaffStatusMutationVariables>;

/**
 * __useUpdateStaffStatusMutation__
 *
 * To run a mutation, you first call `useUpdateStaffStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStaffStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStaffStatusMutation, { data, loading, error }] = useUpdateStaffStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateStaffStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateStaffStatusMutation, UpdateStaffStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateStaffStatusMutation, UpdateStaffStatusMutationVariables>(UpdateStaffStatusDocument, options);
      }
export type UpdateStaffStatusMutationHookResult = ReturnType<typeof useUpdateStaffStatusMutation>;
export type UpdateStaffStatusMutationResult = Apollo.MutationResult<UpdateStaffStatusMutation>;
export type UpdateStaffStatusMutationOptions = Apollo.BaseMutationOptions<UpdateStaffStatusMutation, UpdateStaffStatusMutationVariables>;
export const UpdateStaffAvailabilityDocument = gql`
    mutation UpdateStaffAvailability($id: ID!, $availability: [StaffAvailabilityInput!]!) {
  updateStaffAvailability(id: $id, availability: $availability) {
    id
    availability {
      dayOfWeek
      startTime
      endTime
      isAvailable
    }
    updatedAt
  }
}
    `;
export type UpdateStaffAvailabilityMutationFn = Apollo.MutationFunction<UpdateStaffAvailabilityMutation, UpdateStaffAvailabilityMutationVariables>;

/**
 * __useUpdateStaffAvailabilityMutation__
 *
 * To run a mutation, you first call `useUpdateStaffAvailabilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStaffAvailabilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStaffAvailabilityMutation, { data, loading, error }] = useUpdateStaffAvailabilityMutation({
 *   variables: {
 *      id: // value for 'id'
 *      availability: // value for 'availability'
 *   },
 * });
 */
export function useUpdateStaffAvailabilityMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateStaffAvailabilityMutation, UpdateStaffAvailabilityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateStaffAvailabilityMutation, UpdateStaffAvailabilityMutationVariables>(UpdateStaffAvailabilityDocument, options);
      }
export type UpdateStaffAvailabilityMutationHookResult = ReturnType<typeof useUpdateStaffAvailabilityMutation>;
export type UpdateStaffAvailabilityMutationResult = Apollo.MutationResult<UpdateStaffAvailabilityMutation>;
export type UpdateStaffAvailabilityMutationOptions = Apollo.BaseMutationOptions<UpdateStaffAvailabilityMutation, UpdateStaffAvailabilityMutationVariables>;
export const UploadStaffDocumentDocument = gql`
    mutation UploadStaffDocument($id: ID!, $input: StaffDocumentInput!) {
  uploadStaffDocument(id: $id, input: $input) {
    id
    type
    url
    verified
    uploadedAt
  }
}
    `;
export type UploadStaffDocumentMutationFn = Apollo.MutationFunction<UploadStaffDocumentMutation, UploadStaffDocumentMutationVariables>;

/**
 * __useUploadStaffDocumentMutation__
 *
 * To run a mutation, you first call `useUploadStaffDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadStaffDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadStaffDocumentMutation, { data, loading, error }] = useUploadStaffDocumentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadStaffDocumentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UploadStaffDocumentMutation, UploadStaffDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UploadStaffDocumentMutation, UploadStaffDocumentMutationVariables>(UploadStaffDocumentDocument, options);
      }
export type UploadStaffDocumentMutationHookResult = ReturnType<typeof useUploadStaffDocumentMutation>;
export type UploadStaffDocumentMutationResult = Apollo.MutationResult<UploadStaffDocumentMutation>;
export type UploadStaffDocumentMutationOptions = Apollo.BaseMutationOptions<UploadStaffDocumentMutation, UploadStaffDocumentMutationVariables>;
export const VerifyStaffDocumentDocument = gql`
    mutation VerifyStaffDocument($id: ID!, $documentId: ID!) {
  verifyStaffDocument(id: $id, documentId: $documentId) {
    id
    type
    url
    verified
    uploadedAt
  }
}
    `;
export type VerifyStaffDocumentMutationFn = Apollo.MutationFunction<VerifyStaffDocumentMutation, VerifyStaffDocumentMutationVariables>;

/**
 * __useVerifyStaffDocumentMutation__
 *
 * To run a mutation, you first call `useVerifyStaffDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyStaffDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyStaffDocumentMutation, { data, loading, error }] = useVerifyStaffDocumentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      documentId: // value for 'documentId'
 *   },
 * });
 */
export function useVerifyStaffDocumentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyStaffDocumentMutation, VerifyStaffDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<VerifyStaffDocumentMutation, VerifyStaffDocumentMutationVariables>(VerifyStaffDocumentDocument, options);
      }
export type VerifyStaffDocumentMutationHookResult = ReturnType<typeof useVerifyStaffDocumentMutation>;
export type VerifyStaffDocumentMutationResult = Apollo.MutationResult<VerifyStaffDocumentMutation>;
export type VerifyStaffDocumentMutationOptions = Apollo.BaseMutationOptions<VerifyStaffDocumentMutation, VerifyStaffDocumentMutationVariables>;
export const DeleteStaffDocumentDocument = gql`
    mutation DeleteStaffDocument($id: ID!, $documentId: ID!) {
  deleteStaffDocument(id: $id, documentId: $documentId)
}
    `;
export type DeleteStaffDocumentMutationFn = Apollo.MutationFunction<DeleteStaffDocumentMutation, DeleteStaffDocumentMutationVariables>;

/**
 * __useDeleteStaffDocumentMutation__
 *
 * To run a mutation, you first call `useDeleteStaffDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStaffDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStaffDocumentMutation, { data, loading, error }] = useDeleteStaffDocumentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      documentId: // value for 'documentId'
 *   },
 * });
 */
export function useDeleteStaffDocumentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteStaffDocumentMutation, DeleteStaffDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteStaffDocumentMutation, DeleteStaffDocumentMutationVariables>(DeleteStaffDocumentDocument, options);
      }
export type DeleteStaffDocumentMutationHookResult = ReturnType<typeof useDeleteStaffDocumentMutation>;
export type DeleteStaffDocumentMutationResult = Apollo.MutationResult<DeleteStaffDocumentMutation>;
export type DeleteStaffDocumentMutationOptions = Apollo.BaseMutationOptions<DeleteStaffDocumentMutation, DeleteStaffDocumentMutationVariables>;
export const CreateSubscriptionDocument = gql`
    mutation CreateSubscription($input: CreateSubscriptionInput!) {
  createSubscription(input: $input) {
    id
    customer {
      id
      firstName
      lastName
      email
    }
    service {
      _id
      service_id
      name
      description
    }
    plan
    startDate
    endDate
    status
    frequency
    price
    nextBillingDate
    lastBillingDate
    autoRenew
    createdAt
    updatedAt
  }
}
    `;
export type CreateSubscriptionMutationFn = Apollo.MutationFunction<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;

/**
 * __useCreateSubscriptionMutation__
 *
 * To run a mutation, you first call `useCreateSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubscriptionMutation, { data, loading, error }] = useCreateSubscriptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSubscriptionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>(CreateSubscriptionDocument, options);
      }
export type CreateSubscriptionMutationHookResult = ReturnType<typeof useCreateSubscriptionMutation>;
export type CreateSubscriptionMutationResult = Apollo.MutationResult<CreateSubscriptionMutation>;
export type CreateSubscriptionMutationOptions = Apollo.BaseMutationOptions<CreateSubscriptionMutation, CreateSubscriptionMutationVariables>;
export const UpdateSubscriptionDocument = gql`
    mutation UpdateSubscription($id: ID!, $input: UpdateSubscriptionInput!) {
  updateSubscription(id: $id, input: $input) {
    id
    customer {
      id
      firstName
      lastName
      email
    }
    service {
      _id
      service_id
      name
      description
    }
    plan
    startDate
    endDate
    status
    frequency
    price
    nextBillingDate
    lastBillingDate
    autoRenew
    createdAt
    updatedAt
  }
}
    `;
export type UpdateSubscriptionMutationFn = Apollo.MutationFunction<UpdateSubscriptionMutation, UpdateSubscriptionMutationVariables>;

/**
 * __useUpdateSubscriptionMutation__
 *
 * To run a mutation, you first call `useUpdateSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubscriptionMutation, { data, loading, error }] = useUpdateSubscriptionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSubscriptionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateSubscriptionMutation, UpdateSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateSubscriptionMutation, UpdateSubscriptionMutationVariables>(UpdateSubscriptionDocument, options);
      }
export type UpdateSubscriptionMutationHookResult = ReturnType<typeof useUpdateSubscriptionMutation>;
export type UpdateSubscriptionMutationResult = Apollo.MutationResult<UpdateSubscriptionMutation>;
export type UpdateSubscriptionMutationOptions = Apollo.BaseMutationOptions<UpdateSubscriptionMutation, UpdateSubscriptionMutationVariables>;
export const CancelSubscriptionDocument = gql`
    mutation CancelSubscription($id: ID!) {
  cancelSubscription(id: $id) {
    id
    status
    endDate
    updatedAt
  }
}
    `;
export type CancelSubscriptionMutationFn = Apollo.MutationFunction<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>;

/**
 * __useCancelSubscriptionMutation__
 *
 * To run a mutation, you first call `useCancelSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelSubscriptionMutation, { data, loading, error }] = useCancelSubscriptionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCancelSubscriptionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>(CancelSubscriptionDocument, options);
      }
export type CancelSubscriptionMutationHookResult = ReturnType<typeof useCancelSubscriptionMutation>;
export type CancelSubscriptionMutationResult = Apollo.MutationResult<CancelSubscriptionMutation>;
export type CancelSubscriptionMutationOptions = Apollo.BaseMutationOptions<CancelSubscriptionMutation, CancelSubscriptionMutationVariables>;
export const ReactivateSubscriptionDocument = gql`
    mutation ReactivateSubscription($id: ID!) {
  reactivateSubscription(id: $id) {
    id
    status
    endDate
    updatedAt
  }
}
    `;
export type ReactivateSubscriptionMutationFn = Apollo.MutationFunction<ReactivateSubscriptionMutation, ReactivateSubscriptionMutationVariables>;

/**
 * __useReactivateSubscriptionMutation__
 *
 * To run a mutation, you first call `useReactivateSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReactivateSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reactivateSubscriptionMutation, { data, loading, error }] = useReactivateSubscriptionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReactivateSubscriptionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReactivateSubscriptionMutation, ReactivateSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ReactivateSubscriptionMutation, ReactivateSubscriptionMutationVariables>(ReactivateSubscriptionDocument, options);
      }
export type ReactivateSubscriptionMutationHookResult = ReturnType<typeof useReactivateSubscriptionMutation>;
export type ReactivateSubscriptionMutationResult = Apollo.MutationResult<ReactivateSubscriptionMutation>;
export type ReactivateSubscriptionMutationOptions = Apollo.BaseMutationOptions<ReactivateSubscriptionMutation, ReactivateSubscriptionMutationVariables>;
export const UpdateSubscriptionStatusDocument = gql`
    mutation UpdateSubscriptionStatus($id: ID!, $status: SubscriptionStatus!) {
  updateSubscriptionStatus(id: $id, status: $status) {
    id
    status
    updatedAt
  }
}
    `;
export type UpdateSubscriptionStatusMutationFn = Apollo.MutationFunction<UpdateSubscriptionStatusMutation, UpdateSubscriptionStatusMutationVariables>;

/**
 * __useUpdateSubscriptionStatusMutation__
 *
 * To run a mutation, you first call `useUpdateSubscriptionStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubscriptionStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubscriptionStatusMutation, { data, loading, error }] = useUpdateSubscriptionStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateSubscriptionStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateSubscriptionStatusMutation, UpdateSubscriptionStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateSubscriptionStatusMutation, UpdateSubscriptionStatusMutationVariables>(UpdateSubscriptionStatusDocument, options);
      }
export type UpdateSubscriptionStatusMutationHookResult = ReturnType<typeof useUpdateSubscriptionStatusMutation>;
export type UpdateSubscriptionStatusMutationResult = Apollo.MutationResult<UpdateSubscriptionStatusMutation>;
export type UpdateSubscriptionStatusMutationOptions = Apollo.BaseMutationOptions<UpdateSubscriptionStatusMutation, UpdateSubscriptionStatusMutationVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  me {
    id
    email
    firstName
    lastName
    role
    phone
    address {
      street
      city
      state
      zipCode
      country
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export function useGetCurrentUserSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<typeof useGetCurrentUserSuspenseQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($id: ID!) {
  user(id: $id) {
    id
    email
    firstName
    lastName
    role
    phone
    address {
      street
      city
      state
      zipCode
      country
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables> & ({ variables: GetUserByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export function useGetUserByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdSuspenseQueryHookResult = ReturnType<typeof useGetUserByIdSuspenseQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers($role: UserRole) {
  users(role: $role) {
    id
    email
    firstName
    lastName
    role
    phone
    address {
      street
      city
      state
      zipCode
      country
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      role: // value for 'role'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetBookingsDocument = gql`
    query GetBookings($status: BookingStatus) {
  bookings(status: $status) {
    id
    customer {
      id
      email
      firstName
      lastName
      role
      phone
      address {
        street
        city
        state
        zipCode
        country
      }
      createdAt
      updatedAt
    }
    service {
      _id
      service_id
      name
      label
      description
      category
      icon
      price
      displayPrice
      status
      imageUrl
      features
      inclusions
      options {
        id
        service_id
        label
        description
        price
        inclusions
        extraItems {
          name
          items
          cost
        }
      }
    }
    staff {
      id
      email
      firstName
      lastName
      role
      phone
      address {
        street
        city
        state
        zipCode
        country
      }
      createdAt
      updatedAt
    }
    date
    timeSlot
    status
    notes
    address {
      street
      city
      state
      zipCode
      country
    }
    totalPrice
    paymentStatus
    createdAt
    updatedAt
    serviceType
    serviceOption
    propertyType
    roomQuantities {
      bedrooms
      livingRooms
      bathrooms
      kitchen
      study
      outdoor
    }
    laundryBags
    recurringDiscount
  }
}
    `;

/**
 * __useGetBookingsQuery__
 *
 * To run a query within a React component, call `useGetBookingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookingsQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetBookingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetBookingsQuery, GetBookingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetBookingsQuery, GetBookingsQueryVariables>(GetBookingsDocument, options);
      }
export function useGetBookingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBookingsQuery, GetBookingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetBookingsQuery, GetBookingsQueryVariables>(GetBookingsDocument, options);
        }
export function useGetBookingsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetBookingsQuery, GetBookingsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetBookingsQuery, GetBookingsQueryVariables>(GetBookingsDocument, options);
        }
export type GetBookingsQueryHookResult = ReturnType<typeof useGetBookingsQuery>;
export type GetBookingsLazyQueryHookResult = ReturnType<typeof useGetBookingsLazyQuery>;
export type GetBookingsSuspenseQueryHookResult = ReturnType<typeof useGetBookingsSuspenseQuery>;
export type GetBookingsQueryResult = Apollo.QueryResult<GetBookingsQuery, GetBookingsQueryVariables>;
export const GetBookingByIdDocument = gql`
    query GetBookingById($id: ID!) {
  booking(id: $id) {
    id
    customer {
      id
      email
      firstName
      lastName
      role
      phone
      createdAt
      updatedAt
      address {
        street
        city
        state
        zipCode
        country
      }
    }
    service {
      _id
      service_id
      name
      label
      description
      category
      icon
      price
      displayPrice
      status
      imageUrl
      features
      inclusions
      options {
        id
        service_id
        label
        description
        price
        inclusions
        extraItems {
          name
          items
          cost
        }
      }
    }
    staff {
      id
      email
      firstName
      lastName
      role
      phone
      createdAt
      updatedAt
      address {
        street
        city
        state
        zipCode
        country
      }
    }
    date
    timeSlot
    status
    notes
    address {
      street
      city
      state
      zipCode
      country
    }
    totalPrice
    paymentStatus
    createdAt
    updatedAt
    serviceType
    serviceOption
    propertyType
    roomQuantities {
      bedrooms
      livingRooms
      bathrooms
      kitchen
      study
      outdoor
    }
    laundryBags
    recurringDiscount
  }
}
    `;

/**
 * __useGetBookingByIdQuery__
 *
 * To run a query within a React component, call `useGetBookingByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookingByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookingByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBookingByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetBookingByIdQuery, GetBookingByIdQueryVariables> & ({ variables: GetBookingByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetBookingByIdQuery, GetBookingByIdQueryVariables>(GetBookingByIdDocument, options);
      }
export function useGetBookingByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBookingByIdQuery, GetBookingByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetBookingByIdQuery, GetBookingByIdQueryVariables>(GetBookingByIdDocument, options);
        }
export function useGetBookingByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetBookingByIdQuery, GetBookingByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetBookingByIdQuery, GetBookingByIdQueryVariables>(GetBookingByIdDocument, options);
        }
export type GetBookingByIdQueryHookResult = ReturnType<typeof useGetBookingByIdQuery>;
export type GetBookingByIdLazyQueryHookResult = ReturnType<typeof useGetBookingByIdLazyQuery>;
export type GetBookingByIdSuspenseQueryHookResult = ReturnType<typeof useGetBookingByIdSuspenseQuery>;
export type GetBookingByIdQueryResult = Apollo.QueryResult<GetBookingByIdQuery, GetBookingByIdQueryVariables>;
export const GetCustomerBookingsDocument = gql`
    query GetCustomerBookings {
  customerBookings {
    id
    customer {
      id
      email
      firstName
      lastName
      role
      phone
      createdAt
      updatedAt
      address {
        street
        city
        state
        zipCode
        country
      }
    }
    service {
      _id
      service_id
      name
      label
      description
      category
      icon
      price
      displayPrice
      status
      imageUrl
      features
      inclusions
      options {
        id
        service_id
        label
        description
        price
        inclusions
        extraItems {
          name
          items
          cost
        }
      }
    }
    staff {
      id
      email
      firstName
      lastName
      role
      phone
      createdAt
      updatedAt
      address {
        street
        city
        state
        zipCode
        country
      }
    }
    date
    timeSlot
    status
    notes
    address {
      street
      city
      state
      zipCode
      country
    }
    totalPrice
    paymentStatus
    createdAt
    updatedAt
    serviceType
    serviceOption
    propertyType
    roomQuantities {
      bedrooms
      livingRooms
      bathrooms
      kitchen
      study
      outdoor
    }
    laundryBags
    recurringDiscount
  }
}
    `;

/**
 * __useGetCustomerBookingsQuery__
 *
 * To run a query within a React component, call `useGetCustomerBookingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerBookingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerBookingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCustomerBookingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCustomerBookingsQuery, GetCustomerBookingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCustomerBookingsQuery, GetCustomerBookingsQueryVariables>(GetCustomerBookingsDocument, options);
      }
export function useGetCustomerBookingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCustomerBookingsQuery, GetCustomerBookingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCustomerBookingsQuery, GetCustomerBookingsQueryVariables>(GetCustomerBookingsDocument, options);
        }
export function useGetCustomerBookingsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCustomerBookingsQuery, GetCustomerBookingsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCustomerBookingsQuery, GetCustomerBookingsQueryVariables>(GetCustomerBookingsDocument, options);
        }
export type GetCustomerBookingsQueryHookResult = ReturnType<typeof useGetCustomerBookingsQuery>;
export type GetCustomerBookingsLazyQueryHookResult = ReturnType<typeof useGetCustomerBookingsLazyQuery>;
export type GetCustomerBookingsSuspenseQueryHookResult = ReturnType<typeof useGetCustomerBookingsSuspenseQuery>;
export type GetCustomerBookingsQueryResult = Apollo.QueryResult<GetCustomerBookingsQuery, GetCustomerBookingsQueryVariables>;
export const GetStaffBookingsDocument = gql`
    query GetStaffBookings {
  staffBookings {
    id
    customer {
      id
      email
      firstName
      lastName
      role
      phone
      createdAt
      updatedAt
      address {
        street
        city
        state
        zipCode
        country
      }
    }
    service {
      _id
      service_id
      name
      label
      description
      category
      icon
      price
      displayPrice
      status
      imageUrl
      features
      inclusions
      options {
        id
        service_id
        label
        description
        price
        inclusions
        extraItems {
          name
          items
          cost
        }
      }
    }
    staff {
      id
      email
      firstName
      lastName
      role
      phone
      createdAt
      updatedAt
      address {
        street
        city
        state
        zipCode
        country
      }
    }
    date
    timeSlot
    status
    notes
    address {
      street
      city
      state
      zipCode
      country
    }
    totalPrice
    paymentStatus
    createdAt
    updatedAt
    serviceType
    serviceOption
    propertyType
    roomQuantities {
      bedrooms
      livingRooms
      bathrooms
      kitchen
      study
      outdoor
    }
    laundryBags
    recurringDiscount
  }
}
    `;

/**
 * __useGetStaffBookingsQuery__
 *
 * To run a query within a React component, call `useGetStaffBookingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStaffBookingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStaffBookingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStaffBookingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetStaffBookingsQuery, GetStaffBookingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetStaffBookingsQuery, GetStaffBookingsQueryVariables>(GetStaffBookingsDocument, options);
      }
export function useGetStaffBookingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetStaffBookingsQuery, GetStaffBookingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetStaffBookingsQuery, GetStaffBookingsQueryVariables>(GetStaffBookingsDocument, options);
        }
export function useGetStaffBookingsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetStaffBookingsQuery, GetStaffBookingsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetStaffBookingsQuery, GetStaffBookingsQueryVariables>(GetStaffBookingsDocument, options);
        }
export type GetStaffBookingsQueryHookResult = ReturnType<typeof useGetStaffBookingsQuery>;
export type GetStaffBookingsLazyQueryHookResult = ReturnType<typeof useGetStaffBookingsLazyQuery>;
export type GetStaffBookingsSuspenseQueryHookResult = ReturnType<typeof useGetStaffBookingsSuspenseQuery>;
export type GetStaffBookingsQueryResult = Apollo.QueryResult<GetStaffBookingsQuery, GetStaffBookingsQueryVariables>;
export const GetPaymentByIdDocument = gql`
    query GetPaymentById($id: ID!) {
  payment(id: $id) {
    id
    booking {
      id
      service {
        _id
        service_id
        name
      }
    }
    customer {
      id
      firstName
      lastName
      email
    }
    amount
    currency
    status
    paymentMethod {
      id
      type
      last4
      expiryMonth
      expiryYear
      brand
      isDefault
    }
    paymentIntentId
    refundAmount
    refundReason
    metadata
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetPaymentByIdQuery__
 *
 * To run a query within a React component, call `useGetPaymentByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPaymentByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetPaymentByIdQuery, GetPaymentByIdQueryVariables> & ({ variables: GetPaymentByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPaymentByIdQuery, GetPaymentByIdQueryVariables>(GetPaymentByIdDocument, options);
      }
export function useGetPaymentByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPaymentByIdQuery, GetPaymentByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPaymentByIdQuery, GetPaymentByIdQueryVariables>(GetPaymentByIdDocument, options);
        }
export function useGetPaymentByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetPaymentByIdQuery, GetPaymentByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetPaymentByIdQuery, GetPaymentByIdQueryVariables>(GetPaymentByIdDocument, options);
        }
export type GetPaymentByIdQueryHookResult = ReturnType<typeof useGetPaymentByIdQuery>;
export type GetPaymentByIdLazyQueryHookResult = ReturnType<typeof useGetPaymentByIdLazyQuery>;
export type GetPaymentByIdSuspenseQueryHookResult = ReturnType<typeof useGetPaymentByIdSuspenseQuery>;
export type GetPaymentByIdQueryResult = Apollo.QueryResult<GetPaymentByIdQuery, GetPaymentByIdQueryVariables>;
export const GetPaymentsDocument = gql`
    query GetPayments($status: PaymentStatus) {
  payments(status: $status) {
    id
    booking {
      id
      service {
        _id
        service_id
        name
      }
    }
    customer {
      id
      firstName
      lastName
      email
    }
    amount
    currency
    status
    paymentMethod {
      id
      type
      last4
      brand
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetPaymentsQuery__
 *
 * To run a query within a React component, call `useGetPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentsQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetPaymentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(GetPaymentsDocument, options);
      }
export function useGetPaymentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(GetPaymentsDocument, options);
        }
export function useGetPaymentsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetPaymentsQuery, GetPaymentsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(GetPaymentsDocument, options);
        }
export type GetPaymentsQueryHookResult = ReturnType<typeof useGetPaymentsQuery>;
export type GetPaymentsLazyQueryHookResult = ReturnType<typeof useGetPaymentsLazyQuery>;
export type GetPaymentsSuspenseQueryHookResult = ReturnType<typeof useGetPaymentsSuspenseQuery>;
export type GetPaymentsQueryResult = Apollo.QueryResult<GetPaymentsQuery, GetPaymentsQueryVariables>;
export const GetCustomerPaymentsDocument = gql`
    query GetCustomerPayments {
  customerPayments {
    id
    booking {
      id
      service {
        _id
        service_id
        name
      }
    }
    amount
    currency
    status
    paymentMethod {
      id
      type
      last4
      brand
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetCustomerPaymentsQuery__
 *
 * To run a query within a React component, call `useGetCustomerPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerPaymentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCustomerPaymentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCustomerPaymentsQuery, GetCustomerPaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCustomerPaymentsQuery, GetCustomerPaymentsQueryVariables>(GetCustomerPaymentsDocument, options);
      }
export function useGetCustomerPaymentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCustomerPaymentsQuery, GetCustomerPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCustomerPaymentsQuery, GetCustomerPaymentsQueryVariables>(GetCustomerPaymentsDocument, options);
        }
export function useGetCustomerPaymentsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCustomerPaymentsQuery, GetCustomerPaymentsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCustomerPaymentsQuery, GetCustomerPaymentsQueryVariables>(GetCustomerPaymentsDocument, options);
        }
export type GetCustomerPaymentsQueryHookResult = ReturnType<typeof useGetCustomerPaymentsQuery>;
export type GetCustomerPaymentsLazyQueryHookResult = ReturnType<typeof useGetCustomerPaymentsLazyQuery>;
export type GetCustomerPaymentsSuspenseQueryHookResult = ReturnType<typeof useGetCustomerPaymentsSuspenseQuery>;
export type GetCustomerPaymentsQueryResult = Apollo.QueryResult<GetCustomerPaymentsQuery, GetCustomerPaymentsQueryVariables>;
export const GetPaymentMethodsDocument = gql`
    query GetPaymentMethods {
  paymentMethods {
    id
    type
    last4
    expiryMonth
    expiryYear
    brand
    isDefault
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetPaymentMethodsQuery__
 *
 * To run a query within a React component, call `useGetPaymentMethodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentMethodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentMethodsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPaymentMethodsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>(GetPaymentMethodsDocument, options);
      }
export function useGetPaymentMethodsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>(GetPaymentMethodsDocument, options);
        }
export function useGetPaymentMethodsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>(GetPaymentMethodsDocument, options);
        }
export type GetPaymentMethodsQueryHookResult = ReturnType<typeof useGetPaymentMethodsQuery>;
export type GetPaymentMethodsLazyQueryHookResult = ReturnType<typeof useGetPaymentMethodsLazyQuery>;
export type GetPaymentMethodsSuspenseQueryHookResult = ReturnType<typeof useGetPaymentMethodsSuspenseQuery>;
export type GetPaymentMethodsQueryResult = Apollo.QueryResult<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>;
export const GetInvoiceByIdDocument = gql`
    query GetInvoiceById($id: ID!) {
  invoice(id: $id) {
    id
    payment {
      id
      amount
      currency
    }
    invoiceNumber
    subtotal
    tax
    total
    dueDate
    status
    items {
      description
      quantity
      unitPrice
      amount
    }
    paidAt
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetInvoiceByIdQuery__
 *
 * To run a query within a React component, call `useGetInvoiceByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoiceByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoiceByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetInvoiceByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetInvoiceByIdQuery, GetInvoiceByIdQueryVariables> & ({ variables: GetInvoiceByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetInvoiceByIdQuery, GetInvoiceByIdQueryVariables>(GetInvoiceByIdDocument, options);
      }
export function useGetInvoiceByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetInvoiceByIdQuery, GetInvoiceByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetInvoiceByIdQuery, GetInvoiceByIdQueryVariables>(GetInvoiceByIdDocument, options);
        }
export function useGetInvoiceByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetInvoiceByIdQuery, GetInvoiceByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetInvoiceByIdQuery, GetInvoiceByIdQueryVariables>(GetInvoiceByIdDocument, options);
        }
export type GetInvoiceByIdQueryHookResult = ReturnType<typeof useGetInvoiceByIdQuery>;
export type GetInvoiceByIdLazyQueryHookResult = ReturnType<typeof useGetInvoiceByIdLazyQuery>;
export type GetInvoiceByIdSuspenseQueryHookResult = ReturnType<typeof useGetInvoiceByIdSuspenseQuery>;
export type GetInvoiceByIdQueryResult = Apollo.QueryResult<GetInvoiceByIdQuery, GetInvoiceByIdQueryVariables>;
export const GetCustomerInvoicesDocument = gql`
    query GetCustomerInvoices {
  customerInvoices {
    id
    invoiceNumber
    subtotal
    tax
    total
    dueDate
    status
    items {
      description
      quantity
      unitPrice
      amount
    }
    paidAt
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetCustomerInvoicesQuery__
 *
 * To run a query within a React component, call `useGetCustomerInvoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerInvoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerInvoicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCustomerInvoicesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCustomerInvoicesQuery, GetCustomerInvoicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCustomerInvoicesQuery, GetCustomerInvoicesQueryVariables>(GetCustomerInvoicesDocument, options);
      }
export function useGetCustomerInvoicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCustomerInvoicesQuery, GetCustomerInvoicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCustomerInvoicesQuery, GetCustomerInvoicesQueryVariables>(GetCustomerInvoicesDocument, options);
        }
export function useGetCustomerInvoicesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCustomerInvoicesQuery, GetCustomerInvoicesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCustomerInvoicesQuery, GetCustomerInvoicesQueryVariables>(GetCustomerInvoicesDocument, options);
        }
export type GetCustomerInvoicesQueryHookResult = ReturnType<typeof useGetCustomerInvoicesQuery>;
export type GetCustomerInvoicesLazyQueryHookResult = ReturnType<typeof useGetCustomerInvoicesLazyQuery>;
export type GetCustomerInvoicesSuspenseQueryHookResult = ReturnType<typeof useGetCustomerInvoicesSuspenseQuery>;
export type GetCustomerInvoicesQueryResult = Apollo.QueryResult<GetCustomerInvoicesQuery, GetCustomerInvoicesQueryVariables>;
export const GetServicesDocument = gql`
    query GetServices($category: ServiceCategory, $status: ServiceStatus) {
  services(category: $category, status: $status) {
    _id
    service_id
    name
    label
    description
    category
    icon
    price
    displayPrice
    status
    imageUrl
    features
    inclusions
    options {
      id
      service_id
      label
      description
      price
      inclusions
      extraItems {
        name
        items
        cost
      }
    }
  }
}
    `;

/**
 * __useGetServicesQuery__
 *
 * To run a query within a React component, call `useGetServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServicesQuery({
 *   variables: {
 *      category: // value for 'category'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetServicesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetServicesQuery, GetServicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetServicesQuery, GetServicesQueryVariables>(GetServicesDocument, options);
      }
export function useGetServicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetServicesQuery, GetServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetServicesQuery, GetServicesQueryVariables>(GetServicesDocument, options);
        }
export function useGetServicesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetServicesQuery, GetServicesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetServicesQuery, GetServicesQueryVariables>(GetServicesDocument, options);
        }
export type GetServicesQueryHookResult = ReturnType<typeof useGetServicesQuery>;
export type GetServicesLazyQueryHookResult = ReturnType<typeof useGetServicesLazyQuery>;
export type GetServicesSuspenseQueryHookResult = ReturnType<typeof useGetServicesSuspenseQuery>;
export type GetServicesQueryResult = Apollo.QueryResult<GetServicesQuery, GetServicesQueryVariables>;
export const GetServiceByIdDocument = gql`
    query GetServiceById($id: ID!) {
  service(id: $id) {
    _id
    service_id
    name
    label
    description
    category
    icon
    price
    displayPrice
    status
    imageUrl
    features
    inclusions
    options {
      id
      service_id
      label
      description
      price
      inclusions
      extraItems {
        name
        items
        cost
      }
    }
  }
}
    `;

/**
 * __useGetServiceByIdQuery__
 *
 * To run a query within a React component, call `useGetServiceByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetServiceByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetServiceByIdQuery, GetServiceByIdQueryVariables> & ({ variables: GetServiceByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetServiceByIdQuery, GetServiceByIdQueryVariables>(GetServiceByIdDocument, options);
      }
export function useGetServiceByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetServiceByIdQuery, GetServiceByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetServiceByIdQuery, GetServiceByIdQueryVariables>(GetServiceByIdDocument, options);
        }
export function useGetServiceByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetServiceByIdQuery, GetServiceByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetServiceByIdQuery, GetServiceByIdQueryVariables>(GetServiceByIdDocument, options);
        }
export type GetServiceByIdQueryHookResult = ReturnType<typeof useGetServiceByIdQuery>;
export type GetServiceByIdLazyQueryHookResult = ReturnType<typeof useGetServiceByIdLazyQuery>;
export type GetServiceByIdSuspenseQueryHookResult = ReturnType<typeof useGetServiceByIdSuspenseQuery>;
export type GetServiceByIdQueryResult = Apollo.QueryResult<GetServiceByIdQuery, GetServiceByIdQueryVariables>;
export const GetStaffProfilesDocument = gql`
    query GetStaffProfiles($status: StaffStatus) {
  staffProfiles(status: $status) {
    id
    user {
      id
      firstName
      lastName
      email
    }
    serviceCategories
    availability {
      dayOfWeek
      startTime
      endTime
      isAvailable
    }
    rating
    totalJobs
    completedJobs
    activeJobs
    documents {
      id
      type
      url
      verified
      uploadedAt
    }
    status
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetStaffProfilesQuery__
 *
 * To run a query within a React component, call `useGetStaffProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStaffProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStaffProfilesQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetStaffProfilesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetStaffProfilesQuery, GetStaffProfilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetStaffProfilesQuery, GetStaffProfilesQueryVariables>(GetStaffProfilesDocument, options);
      }
export function useGetStaffProfilesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetStaffProfilesQuery, GetStaffProfilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetStaffProfilesQuery, GetStaffProfilesQueryVariables>(GetStaffProfilesDocument, options);
        }
export function useGetStaffProfilesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetStaffProfilesQuery, GetStaffProfilesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetStaffProfilesQuery, GetStaffProfilesQueryVariables>(GetStaffProfilesDocument, options);
        }
export type GetStaffProfilesQueryHookResult = ReturnType<typeof useGetStaffProfilesQuery>;
export type GetStaffProfilesLazyQueryHookResult = ReturnType<typeof useGetStaffProfilesLazyQuery>;
export type GetStaffProfilesSuspenseQueryHookResult = ReturnType<typeof useGetStaffProfilesSuspenseQuery>;
export type GetStaffProfilesQueryResult = Apollo.QueryResult<GetStaffProfilesQuery, GetStaffProfilesQueryVariables>;
export const GetStaffProfileByIdDocument = gql`
    query GetStaffProfileById($id: ID!) {
  staffProfile(id: $id) {
    id
    user {
      id
      firstName
      lastName
      email
    }
    serviceCategories
    availability {
      dayOfWeek
      startTime
      endTime
      isAvailable
    }
    rating
    totalJobs
    completedJobs
    activeJobs
    documents {
      id
      type
      url
      verified
      uploadedAt
    }
    status
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetStaffProfileByIdQuery__
 *
 * To run a query within a React component, call `useGetStaffProfileByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStaffProfileByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStaffProfileByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetStaffProfileByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetStaffProfileByIdQuery, GetStaffProfileByIdQueryVariables> & ({ variables: GetStaffProfileByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetStaffProfileByIdQuery, GetStaffProfileByIdQueryVariables>(GetStaffProfileByIdDocument, options);
      }
export function useGetStaffProfileByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetStaffProfileByIdQuery, GetStaffProfileByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetStaffProfileByIdQuery, GetStaffProfileByIdQueryVariables>(GetStaffProfileByIdDocument, options);
        }
export function useGetStaffProfileByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetStaffProfileByIdQuery, GetStaffProfileByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetStaffProfileByIdQuery, GetStaffProfileByIdQueryVariables>(GetStaffProfileByIdDocument, options);
        }
export type GetStaffProfileByIdQueryHookResult = ReturnType<typeof useGetStaffProfileByIdQuery>;
export type GetStaffProfileByIdLazyQueryHookResult = ReturnType<typeof useGetStaffProfileByIdLazyQuery>;
export type GetStaffProfileByIdSuspenseQueryHookResult = ReturnType<typeof useGetStaffProfileByIdSuspenseQuery>;
export type GetStaffProfileByIdQueryResult = Apollo.QueryResult<GetStaffProfileByIdQuery, GetStaffProfileByIdQueryVariables>;
export const GetAvailableStaffDocument = gql`
    query GetAvailableStaff($serviceCategory: ServiceCategory!, $date: DateTime!) {
  availableStaff(serviceCategory: $serviceCategory, date: $date) {
    id
    user {
      id
      firstName
      lastName
      email
    }
    serviceCategories
    availability {
      dayOfWeek
      startTime
      endTime
      isAvailable
    }
    rating
    totalJobs
    completedJobs
    activeJobs
    status
  }
}
    `;

/**
 * __useGetAvailableStaffQuery__
 *
 * To run a query within a React component, call `useGetAvailableStaffQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAvailableStaffQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAvailableStaffQuery({
 *   variables: {
 *      serviceCategory: // value for 'serviceCategory'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useGetAvailableStaffQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetAvailableStaffQuery, GetAvailableStaffQueryVariables> & ({ variables: GetAvailableStaffQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetAvailableStaffQuery, GetAvailableStaffQueryVariables>(GetAvailableStaffDocument, options);
      }
export function useGetAvailableStaffLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAvailableStaffQuery, GetAvailableStaffQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetAvailableStaffQuery, GetAvailableStaffQueryVariables>(GetAvailableStaffDocument, options);
        }
export function useGetAvailableStaffSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetAvailableStaffQuery, GetAvailableStaffQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetAvailableStaffQuery, GetAvailableStaffQueryVariables>(GetAvailableStaffDocument, options);
        }
export type GetAvailableStaffQueryHookResult = ReturnType<typeof useGetAvailableStaffQuery>;
export type GetAvailableStaffLazyQueryHookResult = ReturnType<typeof useGetAvailableStaffLazyQuery>;
export type GetAvailableStaffSuspenseQueryHookResult = ReturnType<typeof useGetAvailableStaffSuspenseQuery>;
export type GetAvailableStaffQueryResult = Apollo.QueryResult<GetAvailableStaffQuery, GetAvailableStaffQueryVariables>;
export const GetStaffPerformanceDocument = gql`
    query GetStaffPerformance($id: ID!) {
  staffPerformance(id: $id)
}
    `;

/**
 * __useGetStaffPerformanceQuery__
 *
 * To run a query within a React component, call `useGetStaffPerformanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStaffPerformanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStaffPerformanceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetStaffPerformanceQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetStaffPerformanceQuery, GetStaffPerformanceQueryVariables> & ({ variables: GetStaffPerformanceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetStaffPerformanceQuery, GetStaffPerformanceQueryVariables>(GetStaffPerformanceDocument, options);
      }
export function useGetStaffPerformanceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetStaffPerformanceQuery, GetStaffPerformanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetStaffPerformanceQuery, GetStaffPerformanceQueryVariables>(GetStaffPerformanceDocument, options);
        }
export function useGetStaffPerformanceSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetStaffPerformanceQuery, GetStaffPerformanceQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetStaffPerformanceQuery, GetStaffPerformanceQueryVariables>(GetStaffPerformanceDocument, options);
        }
export type GetStaffPerformanceQueryHookResult = ReturnType<typeof useGetStaffPerformanceQuery>;
export type GetStaffPerformanceLazyQueryHookResult = ReturnType<typeof useGetStaffPerformanceLazyQuery>;
export type GetStaffPerformanceSuspenseQueryHookResult = ReturnType<typeof useGetStaffPerformanceSuspenseQuery>;
export type GetStaffPerformanceQueryResult = Apollo.QueryResult<GetStaffPerformanceQuery, GetStaffPerformanceQueryVariables>;
export const GetSubscriptionByIdDocument = gql`
    query GetSubscriptionById($id: ID!) {
  subscription(id: $id) {
    id
    customer {
      id
      firstName
      lastName
      email
    }
    service {
      _id
      service_id
      name
      description
    }
    plan
    startDate
    endDate
    status
    frequency
    price
    nextBillingDate
    lastBillingDate
    autoRenew
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetSubscriptionByIdQuery__
 *
 * To run a query within a React component, call `useGetSubscriptionByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubscriptionByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubscriptionByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSubscriptionByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetSubscriptionByIdQuery, GetSubscriptionByIdQueryVariables> & ({ variables: GetSubscriptionByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetSubscriptionByIdQuery, GetSubscriptionByIdQueryVariables>(GetSubscriptionByIdDocument, options);
      }
export function useGetSubscriptionByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSubscriptionByIdQuery, GetSubscriptionByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetSubscriptionByIdQuery, GetSubscriptionByIdQueryVariables>(GetSubscriptionByIdDocument, options);
        }
export function useGetSubscriptionByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetSubscriptionByIdQuery, GetSubscriptionByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetSubscriptionByIdQuery, GetSubscriptionByIdQueryVariables>(GetSubscriptionByIdDocument, options);
        }
export type GetSubscriptionByIdQueryHookResult = ReturnType<typeof useGetSubscriptionByIdQuery>;
export type GetSubscriptionByIdLazyQueryHookResult = ReturnType<typeof useGetSubscriptionByIdLazyQuery>;
export type GetSubscriptionByIdSuspenseQueryHookResult = ReturnType<typeof useGetSubscriptionByIdSuspenseQuery>;
export type GetSubscriptionByIdQueryResult = Apollo.QueryResult<GetSubscriptionByIdQuery, GetSubscriptionByIdQueryVariables>;
export const GetSubscriptionsDocument = gql`
    query GetSubscriptions($status: SubscriptionStatus) {
  subscriptions(status: $status) {
    id
    customer {
      id
      firstName
      lastName
      email
    }
    service {
      _id
      service_id
      name
      description
    }
    plan
    startDate
    endDate
    status
    frequency
    price
    nextBillingDate
    lastBillingDate
    autoRenew
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetSubscriptionsQuery__
 *
 * To run a query within a React component, call `useGetSubscriptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubscriptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubscriptionsQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetSubscriptionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetSubscriptionsQuery, GetSubscriptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetSubscriptionsQuery, GetSubscriptionsQueryVariables>(GetSubscriptionsDocument, options);
      }
export function useGetSubscriptionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSubscriptionsQuery, GetSubscriptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetSubscriptionsQuery, GetSubscriptionsQueryVariables>(GetSubscriptionsDocument, options);
        }
export function useGetSubscriptionsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetSubscriptionsQuery, GetSubscriptionsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetSubscriptionsQuery, GetSubscriptionsQueryVariables>(GetSubscriptionsDocument, options);
        }
export type GetSubscriptionsQueryHookResult = ReturnType<typeof useGetSubscriptionsQuery>;
export type GetSubscriptionsLazyQueryHookResult = ReturnType<typeof useGetSubscriptionsLazyQuery>;
export type GetSubscriptionsSuspenseQueryHookResult = ReturnType<typeof useGetSubscriptionsSuspenseQuery>;
export type GetSubscriptionsQueryResult = Apollo.QueryResult<GetSubscriptionsQuery, GetSubscriptionsQueryVariables>;
export const GetCustomerSubscriptionsDocument = gql`
    query GetCustomerSubscriptions {
  customerSubscriptions {
    id
    service {
      _id
      service_id
      name
      description
    }
    plan
    startDate
    endDate
    status
    frequency
    price
    nextBillingDate
    lastBillingDate
    autoRenew
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetCustomerSubscriptionsQuery__
 *
 * To run a query within a React component, call `useGetCustomerSubscriptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerSubscriptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerSubscriptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCustomerSubscriptionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCustomerSubscriptionsQuery, GetCustomerSubscriptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetCustomerSubscriptionsQuery, GetCustomerSubscriptionsQueryVariables>(GetCustomerSubscriptionsDocument, options);
      }
export function useGetCustomerSubscriptionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCustomerSubscriptionsQuery, GetCustomerSubscriptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetCustomerSubscriptionsQuery, GetCustomerSubscriptionsQueryVariables>(GetCustomerSubscriptionsDocument, options);
        }
export function useGetCustomerSubscriptionsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetCustomerSubscriptionsQuery, GetCustomerSubscriptionsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetCustomerSubscriptionsQuery, GetCustomerSubscriptionsQueryVariables>(GetCustomerSubscriptionsDocument, options);
        }
export type GetCustomerSubscriptionsQueryHookResult = ReturnType<typeof useGetCustomerSubscriptionsQuery>;
export type GetCustomerSubscriptionsLazyQueryHookResult = ReturnType<typeof useGetCustomerSubscriptionsLazyQuery>;
export type GetCustomerSubscriptionsSuspenseQueryHookResult = ReturnType<typeof useGetCustomerSubscriptionsSuspenseQuery>;
export type GetCustomerSubscriptionsQueryResult = Apollo.QueryResult<GetCustomerSubscriptionsQuery, GetCustomerSubscriptionsQueryVariables>;