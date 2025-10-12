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

export type AcceptAdminInvitationInput = {
  invitationToken: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type AcceptInvitationResponse = {
  __typename?: 'AcceptInvitationResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export enum AccountStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Locked = 'LOCKED',
  PendingVerification = 'PENDING_VERIFICATION',
  Suspended = 'SUSPENDED'
}

export type AddPaymentMethodInput = {
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  token: Scalars['String']['input'];
  type: PaymentMethodType;
};

export type Address = {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isDefault?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  zipCode?: Maybe<Scalars['String']['output']>;
};

export type AddressInput = {
  city: Scalars['String']['input'];
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type AdminInvitation = {
  __typename?: 'AdminInvitation';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  expiresAt: Scalars['DateTime']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  invitationToken: Scalars['String']['output'];
  invitedBy: User;
  invitedByName: Scalars['String']['output'];
  isUsed: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  permissions: Array<Scalars['String']['output']>;
  role: UserRole;
  usedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AdminInvitationResponse = {
  __typename?: 'AdminInvitationResponse';
  invitation?: Maybe<AdminInvitation>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  message?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Billing = {
  __typename?: 'Billing';
  amount: Scalars['Float']['output'];
  billingDate: Scalars['DateTime']['output'];
  cancellationDate?: Maybe<Scalars['DateTime']['output']>;
  cancellationReason?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  payment?: Maybe<Payment>;
  paymentDate?: Maybe<Scalars['DateTime']['output']>;
  paystackReference?: Maybe<Scalars['String']['output']>;
  periodEndDate: Scalars['DateTime']['output'];
  periodStartDate: Scalars['DateTime']['output'];
  status: BillingStatus;
  subscription: Subscription;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export enum BillingCycle {
  Monthly = 'MONTHLY',
  Quarterly = 'QUARTERLY'
}

export type BillingStats = {
  __typename?: 'BillingStats';
  cancelled: Scalars['Int']['output'];
  failed: Scalars['Int']['output'];
  paid: Scalars['Int']['output'];
  paidAmount: Scalars['Float']['output'];
  pending: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalAmount: Scalars['Float']['output'];
};

export enum BillingStatus {
  Cancelled = 'CANCELLED',
  Failed = 'FAILED',
  Paid = 'PAID',
  Pending = 'PENDING'
}

export type Booking = {
  __typename?: 'Booking';
  address: Address;
  cancellationDate?: Maybe<Scalars['DateTime']['output']>;
  cancellationReason?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  customer: User;
  date: Scalars['DateTime']['output'];
  feedback?: Maybe<Feedback>;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  pauseDate?: Maybe<Scalars['DateTime']['output']>;
  paymentStatus: PaymentStatus;
  recurring?: Maybe<Scalars['Boolean']['output']>;
  recurringDiscount?: Maybe<Scalars['Float']['output']>;
  resumeDate?: Maybe<Scalars['DateTime']['output']>;
  service: Service;
  serviceDetails: ServiceDetails;
  serviceOption: ServiceId;
  service_category: ServiceCategory;
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
  Paused = 'PAUSED',
  Pending = 'PENDING'
}

export type BroadcastNotificationInput = {
  data?: InputMaybe<Scalars['JSON']['input']>;
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  message: Scalars['String']['input'];
  priority?: InputMaybe<NotificationPriority>;
  title: Scalars['String']['input'];
  type: NotificationType;
};

export type CleaningDetails = {
  __typename?: 'CleaningDetails';
  cleaningType: CleaningType;
  houseType: HouseType;
  rooms: RoomQuantities;
};

export type CleaningDetailsInput = {
  cleaningType: CleaningType;
  houseType: HouseType;
  rooms: RoomQuantitiesInput;
};

export enum CleaningType {
  DeepCleaning = 'DEEP_CLEANING',
  MoveInMoveOutCleaning = 'MOVE_IN_MOVE_OUT_CLEANING',
  PostConstructionCleaning = 'POST_CONSTRUCTION_CLEANING',
  StandardCleaning = 'STANDARD_CLEANING'
}

export type CookingDetails = {
  __typename?: 'CookingDetails';
  mealType: MealType;
  mealsPerDelivery: Array<MealDelivery>;
};

export type CookingDetailsInput = {
  mealType: MealType;
  mealsPerDelivery: Array<MealDeliveryInput>;
};

export type CreateAdminInvitationInput = {
  email: Scalars['String']['input'];
  expiresIn?: InputMaybe<Scalars['Int']['input']>;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  permissions?: InputMaybe<Array<Scalars['String']['input']>>;
  role: UserRole;
};

export type CreateBookingInput = {
  address: Scalars['ID']['input'];
  customerId?: InputMaybe<Scalars['ID']['input']>;
  date: Scalars['DateTime']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  serviceDetails: ServiceDetailsInput;
  serviceId: Scalars['ID']['input'];
  serviceOption: ServiceId;
  service_category: ServiceCategory;
  timeSlot: TimeSlot;
  totalPrice: Scalars['Float']['input'];
};

export type CreateCustomerAddressInput = {
  city: Scalars['String']['input'];
  street: Scalars['String']['input'];
};

export type CreateNotificationInput = {
  data?: InputMaybe<Scalars['JSON']['input']>;
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  message: Scalars['String']['input'];
  priority?: InputMaybe<NotificationPriority>;
  title: Scalars['String']['input'];
  type: NotificationType;
  user: Scalars['ID']['input'];
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
  roomPrices?: InputMaybe<RoomPricesInput>;
  service_id: ServiceId;
};

export type CreateStaffProfileInput = {
  availability: Array<StaffAvailabilityInput>;
  documents: Array<StaffDocumentInput>;
  serviceCategories: Array<ServiceCategory>;
};

export type CreateSubscriptionInput = {
  address: Scalars['String']['input'];
  autoRenew: Scalars['Boolean']['input'];
  billingCycle: BillingCycle;
  customerId?: InputMaybe<Scalars['ID']['input']>;
  duration: Scalars['Int']['input'];
  services: Array<SubscriptionServiceInput>;
  startDate: Scalars['DateTime']['input'];
};

export type CreateSubscriptionResponse = {
  __typename?: 'CreateSubscriptionResponse';
  billingId?: Maybe<Scalars['ID']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  requiresPayment: Scalars['Boolean']['output'];
  subscriptionId?: Maybe<Scalars['ID']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateUserInput = {
  address?: InputMaybe<CreateCustomerAddressInput>;
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

export type Feedback = {
  __typename?: 'Feedback';
  comment?: Maybe<Scalars['String']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
};

export type FeedbackInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  rating: Scalars['Int']['input'];
};

export enum HouseType {
  Duplex = 'DUPLEX',
  Flat = 'FLAT'
}

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

export type LaundryDetails = {
  __typename?: 'LaundryDetails';
  bags: Scalars['Int']['output'];
  items?: Maybe<LaundryItems>;
  laundryType: LaundryType;
};

export type LaundryDetailsInput = {
  bags: Scalars['Int']['input'];
  items?: InputMaybe<LaundryItemsInput>;
  laundryType: LaundryType;
};

export type LaundryItems = {
  __typename?: 'LaundryItems';
  dresses: Scalars['Int']['output'];
  others: Scalars['Int']['output'];
  pants: Scalars['Int']['output'];
  shirts: Scalars['Int']['output'];
  suits: Scalars['Int']['output'];
};

export type LaundryItemsInput = {
  dresses: Scalars['Int']['input'];
  others: Scalars['Int']['input'];
  pants: Scalars['Int']['input'];
  shirts: Scalars['Int']['input'];
  suits: Scalars['Int']['input'];
};

export enum LaundryType {
  DryCleaning = 'DRY_CLEANING',
  PremiumLaundry = 'PREMIUM_LAUNDRY',
  StandardLaundry = 'STANDARD_LAUNDRY'
}

export type MealDelivery = {
  __typename?: 'MealDelivery';
  count: Scalars['Int']['output'];
  day: ScheduleDays;
};

export type MealDeliveryInput = {
  count: Scalars['Int']['input'];
  day: ScheduleDays;
};

export enum MealType {
  Basic = 'BASIC',
  BasicCooking = 'BASIC_COOKING',
  Standard = 'STANDARD',
  StandardCooking = 'STANDARD_COOKING'
}

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']['output']>;
  acceptAdminInvitation: AcceptInvitationResponse;
  addAddress: Scalars['Boolean']['output'];
  addBookingFeedback: Scalars['Boolean']['output'];
  addPaymentMethod: PaymentMethod;
  addServiceToSubscription: Scalars['Boolean']['output'];
  assignStaff: Scalars['Boolean']['output'];
  broadcastNotification: Scalars['Boolean']['output'];
  cancelAdminInvitation: Scalars['Boolean']['output'];
  cancelBooking: Scalars['Boolean']['output'];
  cancelInvoice: Invoice;
  cancelSubscription: Scalars['Boolean']['output'];
  changePassword: Scalars['Boolean']['output'];
  cleanupExpiredInvitations: Scalars['Int']['output'];
  completeBooking: Scalars['Boolean']['output'];
  createAdmin: AuthPayload;
  createAdminInvitation: AdminInvitationResponse;
  createBooking: Scalars['String']['output'];
  createCustomer: AuthPayload;
  createNotification: Notification;
  createPayment: Payment;
  createService: Service;
  createStaff: AuthPayload;
  createStaffProfile: StaffProfile;
  createSubscription: CreateSubscriptionResponse;
  deleteBooking: Scalars['Boolean']['output'];
  deleteNotification: Scalars['Boolean']['output'];
  deleteService: Scalars['Boolean']['output'];
  deleteStaffDocument: Scalars['Boolean']['output'];
  forgotPassword: Scalars['Boolean']['output'];
  generateInvoice: Invoice;
  login: AuthPayload;
  markInvoiceAsPaid: Invoice;
  markNotificationAsRead?: Maybe<Notification>;
  markNotificationsAsRead: Scalars['Int']['output'];
  pauseSubscription: Scalars['Boolean']['output'];
  reactivateSubscription: Scalars['Boolean']['output'];
  refundPayment: Payment;
  register: AuthPayload;
  removeAddress: Scalars['Boolean']['output'];
  removePaymentMethod: Scalars['Boolean']['output'];
  removeServiceFromSubscription: Scalars['Boolean']['output'];
  rescheduleBooking: Scalars['Boolean']['output'];
  resendAdminInvitation: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  resumeSubscription: Scalars['Boolean']['output'];
  sendNotificationToRole: Scalars['Boolean']['output'];
  sendVerificationEmail: Scalars['Boolean']['output'];
  setDefaultAddress: Scalars['Boolean']['output'];
  setDefaultPaymentMethod: PaymentMethod;
  updateAccountStatus: Scalars['Boolean']['output'];
  updateAddress: Scalars['Boolean']['output'];
  updateBooking: Scalars['Boolean']['output'];
  updateBookingPaymentStatus: Scalars['Boolean']['output'];
  updateBookingStatus: Scalars['Boolean']['output'];
  updateProfile?: Maybe<User>;
  updateService: Service;
  updateServiceStatus: Service;
  updateStaffAvailability: StaffProfile;
  updateStaffProfile: StaffProfile;
  updateStaffStatus: StaffProfile;
  updateSubscription: Scalars['Boolean']['output'];
  updateSubscriptionService: Scalars['Boolean']['output'];
  updateSubscriptionStatus: Scalars['Boolean']['output'];
  updateUserRole: User;
  uploadStaffDocument: StaffDocument;
  verifyEmail: AuthPayload;
  verifyStaffDocument: StaffDocument;
};


export type MutationAcceptAdminInvitationArgs = {
  input: AcceptAdminInvitationInput;
};


export type MutationAddAddressArgs = {
  input: AddressInput;
};


export type MutationAddBookingFeedbackArgs = {
  feedback: FeedbackInput;
  id: Scalars['ID']['input'];
};


export type MutationAddPaymentMethodArgs = {
  input: AddPaymentMethodInput;
};


export type MutationAddServiceToSubscriptionArgs = {
  service: SubscriptionServiceInput;
  subscriptionId: Scalars['ID']['input'];
};


export type MutationAssignStaffArgs = {
  bookingId: Scalars['ID']['input'];
  staffId: Scalars['ID']['input'];
};


export type MutationBroadcastNotificationArgs = {
  input: BroadcastNotificationInput;
};


export type MutationCancelAdminInvitationArgs = {
  invitationId: Scalars['ID']['input'];
};


export type MutationCancelBookingArgs = {
  cancellationReason?: InputMaybe<Scalars['String']['input']>;
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


export type MutationCreateAdminArgs = {
  input: CreateUserInput;
};


export type MutationCreateAdminInvitationArgs = {
  input: CreateAdminInvitationInput;
};


export type MutationCreateBookingArgs = {
  input: CreateBookingInput;
};


export type MutationCreateCustomerArgs = {
  input: CreateUserInput;
};


export type MutationCreateNotificationArgs = {
  input: CreateNotificationInput;
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};


export type MutationCreateServiceArgs = {
  input: CreateServiceInput;
};


export type MutationCreateStaffArgs = {
  input: CreateUserInput;
};


export type MutationCreateStaffProfileArgs = {
  input: CreateStaffProfileInput;
};


export type MutationCreateSubscriptionArgs = {
  input: CreateSubscriptionInput;
};


export type MutationDeleteBookingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteNotificationArgs = {
  id: Scalars['ID']['input'];
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


export type MutationMarkNotificationAsReadArgs = {
  id: Scalars['ID']['input'];
};


export type MutationMarkNotificationsAsReadArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationPauseSubscriptionArgs = {
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


export type MutationRemoveAddressArgs = {
  addressId: Scalars['ID']['input'];
};


export type MutationRemovePaymentMethodArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveServiceFromSubscriptionArgs = {
  subscriptionId: Scalars['ID']['input'];
  subscriptionServiceId: Scalars['ID']['input'];
};


export type MutationRescheduleBookingArgs = {
  id: Scalars['ID']['input'];
  newDate: Scalars['DateTime']['input'];
  newTimeSlot: TimeSlot;
};


export type MutationResendAdminInvitationArgs = {
  invitationId: Scalars['ID']['input'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationResumeSubscriptionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSendNotificationToRoleArgs = {
  input: BroadcastNotificationInput;
  role: UserRole;
};


export type MutationSendVerificationEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationSetDefaultAddressArgs = {
  addressId: Scalars['ID']['input'];
};


export type MutationSetDefaultPaymentMethodArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateAccountStatusArgs = {
  reason?: InputMaybe<Scalars['String']['input']>;
  status: AccountStatus;
  userId: Scalars['ID']['input'];
};


export type MutationUpdateAddressArgs = {
  addressId: Scalars['ID']['input'];
  input: AddressInput;
};


export type MutationUpdateBookingArgs = {
  id: Scalars['ID']['input'];
  input: UpdateBookingInput;
};


export type MutationUpdateBookingPaymentStatusArgs = {
  id: Scalars['ID']['input'];
  paymentStatus: PaymentStatus;
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


export type MutationUpdateSubscriptionServiceArgs = {
  input: UpdateSubscriptionServiceInput;
  subscriptionId: Scalars['ID']['input'];
  subscriptionServiceId: Scalars['ID']['input'];
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


export type MutationVerifyEmailArgs = {
  token: Scalars['String']['input'];
};


export type MutationVerifyStaffDocumentArgs = {
  documentId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTime']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isDeleted: Scalars['Boolean']['output'];
  isRead: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  priority: NotificationPriority;
  readAt?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  type: NotificationType;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};

export type NotificationConnection = {
  __typename?: 'NotificationConnection';
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  notifications: Array<Notification>;
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type NotificationFilters = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  priority?: InputMaybe<NotificationPriority>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  type?: InputMaybe<NotificationType>;
};

export enum NotificationPriority {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM',
  Urgent = 'URGENT'
}

export type NotificationPriorityCount = {
  __typename?: 'NotificationPriorityCount';
  count: Scalars['Int']['output'];
  priority: NotificationPriority;
};

export type NotificationStats = {
  __typename?: 'NotificationStats';
  byPriority: Array<NotificationPriorityCount>;
  byType: Array<NotificationTypeCount>;
  total: Scalars['Int']['output'];
  unread: Scalars['Int']['output'];
};

export enum NotificationType {
  AdminInvitationAccepted = 'ADMIN_INVITATION_ACCEPTED',
  AdminInvitationSent = 'ADMIN_INVITATION_SENT',
  BookingCancellation = 'BOOKING_CANCELLATION',
  BookingConfirmation = 'BOOKING_CONFIRMATION',
  BookingReminder = 'BOOKING_REMINDER',
  BookingUpdate = 'BOOKING_UPDATE',
  PaymentFailed = 'PAYMENT_FAILED',
  PaymentSuccess = 'PAYMENT_SUCCESS',
  PaymentUpdate = 'PAYMENT_UPDATE',
  RewardEarned = 'REWARD_EARNED',
  RewardRedeemed = 'REWARD_REDEEMED',
  ServiceUpdate = 'SERVICE_UPDATE',
  StaffAssignment = 'STAFF_ASSIGNMENT',
  SubscriptionCancellation = 'SUBSCRIPTION_CANCELLATION',
  SubscriptionRenewal = 'SUBSCRIPTION_RENEWAL',
  SubscriptionUpdate = 'SUBSCRIPTION_UPDATE',
  SystemAlert = 'SYSTEM_ALERT',
  UserMessage = 'USER_MESSAGE'
}

export type NotificationTypeCount = {
  __typename?: 'NotificationTypeCount';
  count: Scalars['Int']['output'];
  type: NotificationType;
};

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
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

export type PestControlDetails = {
  __typename?: 'PestControlDetails';
  areas: Array<Scalars['String']['output']>;
  severity: Severity;
  treatmentType: TreatmentType;
};

export type PestControlDetailsInput = {
  areas: Array<Scalars['String']['input']>;
  severity: Severity;
  treatmentType: TreatmentType;
};

export enum PropertyType {
  Duplex = 'DUPLEX',
  Flat = 'FLAT'
}

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']['output']>;
  adminInvitation?: Maybe<AdminInvitation>;
  availableStaff: Array<StaffProfile>;
  billing?: Maybe<Billing>;
  billingStats: BillingStats;
  billingsByStatus: Array<Billing>;
  billingsDueToday: Array<Billing>;
  booking?: Maybe<Booking>;
  bookings: Array<Booking>;
  customerBookings: Array<Booking>;
  customerInvoices: Array<Invoice>;
  customerPayments: Array<Payment>;
  customerSubscriptions: Array<Subscription>;
  invoice: Invoice;
  isUserOnline: Scalars['Boolean']['output'];
  me?: Maybe<User>;
  notification?: Maybe<Notification>;
  notificationStats: NotificationStats;
  notifications: NotificationConnection;
  overdueBillings: Array<Billing>;
  paidBillings: Array<Billing>;
  payment: Payment;
  paymentMethods: Array<PaymentMethod>;
  payments: Array<Payment>;
  pendingAdminInvitations: Array<AdminInvitation>;
  pendingBillings: Array<Billing>;
  service?: Maybe<Service>;
  services: Array<Service>;
  staffBookings: Array<Booking>;
  staffPerformance: StaffPerformance;
  staffProfile?: Maybe<StaffProfile>;
  staffProfiles: Array<StaffProfile>;
  subscription?: Maybe<Subscription>;
  subscriptionBillings: Array<Billing>;
  subscriptionBillingsByStatus: Array<Billing>;
  subscriptionService?: Maybe<SubscriptionService>;
  subscriptions: Array<Subscription>;
  unreadNotificationCount: Scalars['Int']['output'];
  user?: Maybe<User>;
  userBillings: Array<Billing>;
  users: Array<User>;
};


export type QueryAdminInvitationArgs = {
  token: Scalars['String']['input'];
};


export type QueryAvailableStaffArgs = {
  date: Scalars['DateTime']['input'];
  serviceCategory: ServiceCategory;
};


export type QueryBillingArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBillingStatsArgs = {
  subscriptionId: Scalars['ID']['input'];
};


export type QueryBillingsByStatusArgs = {
  status: BillingStatus;
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


export type QueryIsUserOnlineArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryNotificationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNotificationStatsArgs = {
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryNotificationsArgs = {
  filters?: InputMaybe<NotificationFilters>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryPaidBillingsArgs = {
  subscriptionId: Scalars['ID']['input'];
};


export type QueryPaymentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPaymentsArgs = {
  status?: InputMaybe<PaymentStatus>;
};


export type QueryPendingBillingsArgs = {
  subscriptionId: Scalars['ID']['input'];
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


export type QuerySubscriptionBillingsArgs = {
  subscriptionId: Scalars['ID']['input'];
};


export type QuerySubscriptionBillingsByStatusArgs = {
  status: BillingStatus;
  subscriptionId: Scalars['ID']['input'];
};


export type QuerySubscriptionServiceArgs = {
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

export type RoomPrices = {
  __typename?: 'RoomPrices';
  balcony: Scalars['Float']['output'];
  bathroom: Scalars['Float']['output'];
  bedroom: Scalars['Float']['output'];
  kitchen: Scalars['Float']['output'];
  livingRoom: Scalars['Float']['output'];
  lobby: Scalars['Float']['output'];
  outdoor: Scalars['Float']['output'];
  study: Scalars['Float']['output'];
};

export type RoomPricesInput = {
  balcony: Scalars['Float']['input'];
  bathroom: Scalars['Float']['input'];
  bedroom: Scalars['Float']['input'];
  kitchen: Scalars['Float']['input'];
  livingRoom: Scalars['Float']['input'];
  lobby: Scalars['Float']['input'];
  outdoor: Scalars['Float']['input'];
  study: Scalars['Float']['input'];
};

export type RoomQuantities = {
  __typename?: 'RoomQuantities';
  balcony: Scalars['Int']['output'];
  bathroom: Scalars['Int']['output'];
  bedroom: Scalars['Int']['output'];
  kitchen: Scalars['Int']['output'];
  livingRoom: Scalars['Int']['output'];
  lobby: Scalars['Int']['output'];
  other: Scalars['Int']['output'];
  outdoor: Scalars['Int']['output'];
  studyRoom: Scalars['Int']['output'];
};

export type RoomQuantitiesInput = {
  balcony: Scalars['Int']['input'];
  bathroom: Scalars['Int']['input'];
  bedroom: Scalars['Int']['input'];
  kitchen: Scalars['Int']['input'];
  livingRoom: Scalars['Int']['input'];
  lobby: Scalars['Int']['input'];
  other: Scalars['Int']['input'];
  outdoor: Scalars['Int']['input'];
  studyRoom: Scalars['Int']['input'];
};

export enum ScheduleDays {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

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
  roomPrices?: Maybe<RoomPrices>;
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

export type ServiceDetails = {
  __typename?: 'ServiceDetails';
  cleaning?: Maybe<CleaningDetails>;
  cooking?: Maybe<CookingDetails>;
  laundry?: Maybe<LaundryDetails>;
  pestControl?: Maybe<PestControlDetails>;
  serviceOption?: Maybe<ServiceId>;
};

export type ServiceDetailsInput = {
  cleaning?: InputMaybe<CleaningDetailsInput>;
  cooking?: InputMaybe<CookingDetailsInput>;
  laundry?: InputMaybe<LaundryDetailsInput>;
  pestControl?: InputMaybe<PestControlDetailsInput>;
  serviceOption: ServiceId;
};

export enum ServiceId {
  BasicCooking = 'BASIC_COOKING',
  Cleaning = 'CLEANING',
  Cooking = 'COOKING',
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
  StandardCooking = 'STANDARD_COOKING',
  StandardLaundry = 'STANDARD_LAUNDRY'
}

export type ServiceOption = {
  __typename?: 'ServiceOption';
  description: Scalars['String']['output'];
  extraItems?: Maybe<Array<ExtraItem>>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  inclusions?: Maybe<Array<Scalars['String']['output']>>;
  label: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  service_id: ServiceId;
};

export type ServiceOptionInput = {
  description: Scalars['String']['input'];
  extraItems?: InputMaybe<Array<ExtraItemInput>>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  inclusions?: InputMaybe<Array<Scalars['String']['input']>>;
  label: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  service_id: ServiceId;
};

export enum ServiceStatus {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Inactive = 'INACTIVE'
}

export enum Severity {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
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
  address: Address;
  autoRenew: Scalars['Boolean']['output'];
  billingCycle: BillingCycle;
  createdAt: Scalars['DateTime']['output'];
  customer: User;
  duration: Scalars['Int']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  lastBillingDate?: Maybe<Scalars['DateTime']['output']>;
  nextBillingDate: Scalars['DateTime']['output'];
  pauseDate?: Maybe<Scalars['DateTime']['output']>;
  paymentMethod?: Maybe<PaymentMethod>;
  resumeDate?: Maybe<Scalars['DateTime']['output']>;
  startDate: Scalars['DateTime']['output'];
  status: SubscriptionStatus;
  subscriptionServices: Array<SubscriptionService>;
  totalPrice: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum SubscriptionFrequency {
  BiWeekly = 'BI_WEEKLY',
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Quarterly = 'QUARTERLY',
  Weekly = 'WEEKLY'
}

export type SubscriptionService = {
  __typename?: 'SubscriptionService';
  createdAt: Scalars['DateTime']['output'];
  frequency: SubscriptionFrequency;
  id: Scalars['ID']['output'];
  preferredTimeSlot: TimeSlot;
  price: Scalars['Float']['output'];
  scheduledDays: Array<ScheduleDays>;
  service: Service;
  serviceDetails: ServiceDetails;
  service_category: ServiceCategory;
  updatedAt: Scalars['DateTime']['output'];
};

export type SubscriptionServiceInput = {
  category: ServiceCategory;
  frequency: SubscriptionFrequency;
  preferredTimeSlot: TimeSlot;
  price: Scalars['Float']['input'];
  scheduledDays: Array<ScheduleDays>;
  serviceDetails: ServiceDetailsInput;
  serviceId: Scalars['String']['input'];
};

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

export enum TreatmentType {
  PestControlCommercial = 'PEST_CONTROL_COMMERCIAL',
  PestControlResidential = 'PEST_CONTROL_RESIDENTIAL'
}

export type UpdateBookingInput = {
  address: Scalars['ID']['input'];
  date: Scalars['DateTime']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  serviceDetails: ServiceDetailsInput;
  serviceOption: ServiceId;
  service_category: ServiceCategory;
  subscriptionId?: InputMaybe<Scalars['ID']['input']>;
  subscriptionServiceId?: InputMaybe<Scalars['ID']['input']>;
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
  roomPrices?: InputMaybe<RoomPricesInput>;
  status?: InputMaybe<ServiceStatus>;
};

export type UpdateStaffProfileInput = {
  availability?: InputMaybe<Array<StaffAvailabilityInput>>;
  serviceCategories?: InputMaybe<Array<ServiceCategory>>;
  status?: InputMaybe<StaffStatus>;
};

export type UpdateSubscriptionInput = {
  address?: InputMaybe<AddressInput>;
  autoRenew?: InputMaybe<Scalars['Boolean']['input']>;
  billingCycle?: InputMaybe<BillingCycle>;
  customerId: Scalars['ID']['input'];
  duration?: InputMaybe<Scalars['Int']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateSubscriptionServiceInput = {
  address?: InputMaybe<AddressInput>;
  frequency?: InputMaybe<SubscriptionFrequency>;
  preferredTimeSlot?: InputMaybe<TimeSlot>;
  price?: InputMaybe<Scalars['Float']['input']>;
  scheduledDays?: InputMaybe<Array<ScheduleDays>>;
  serviceDetails?: InputMaybe<ServiceDetailsInput>;
};

export type UpdateUserInput = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  accountStatus?: Maybe<AccountStatus>;
  addresses?: Maybe<Array<Maybe<Address>>>;
  createdAt: Scalars['DateTime']['output'];
  defaultAddress?: Maybe<Address>;
  email: Scalars['String']['output'];
  emailVerified?: Maybe<Scalars['Boolean']['output']>;
  emailVerifiedAt?: Maybe<Scalars['DateTime']['output']>;
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

export type CreateAdminInvitationMutationVariables = Exact<{
  input: CreateAdminInvitationInput;
}>;


export type CreateAdminInvitationMutation = { __typename?: 'Mutation', createAdminInvitation: { __typename?: 'AdminInvitationResponse', success: boolean, message: string, invitation?: { __typename?: 'AdminInvitation', id: string, email: string, firstName: string, lastName: string, role: UserRole, invitedByName: string, invitationToken: string, expiresAt: any, isUsed: boolean, usedAt?: any | null, createdAt: any, permissions: Array<string>, invitedBy: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, emailVerified?: boolean | null, emailVerifiedAt?: any | null, accountStatus?: AccountStatus | null } } | null } };

export type AcceptAdminInvitationMutationVariables = Exact<{
  input: AcceptAdminInvitationInput;
}>;


export type AcceptAdminInvitationMutation = { __typename?: 'Mutation', acceptAdminInvitation: { __typename?: 'AcceptInvitationResponse', success: boolean, message: string, token?: string | null, user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, emailVerified?: boolean | null, emailVerifiedAt?: any | null, accountStatus?: AccountStatus | null, createdAt: any, updatedAt: any } | null } };

export type ResendAdminInvitationMutationVariables = Exact<{
  invitationId: Scalars['ID']['input'];
}>;


export type ResendAdminInvitationMutation = { __typename?: 'Mutation', resendAdminInvitation: boolean };

export type CancelAdminInvitationMutationVariables = Exact<{
  invitationId: Scalars['ID']['input'];
}>;


export type CancelAdminInvitationMutation = { __typename?: 'Mutation', cancelAdminInvitation: boolean };

export type CleanupExpiredInvitationsMutationVariables = Exact<{ [key: string]: never; }>;


export type CleanupExpiredInvitationsMutation = { __typename?: 'Mutation', cleanupExpiredInvitations: number };

export type CreateCustomerMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateCustomerMutation = { __typename?: 'Mutation', createCustomer: { __typename?: 'AuthPayload', token?: string | null, message?: string | null, success?: boolean | null, user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, emailVerified?: boolean | null, emailVerifiedAt?: any | null, accountStatus?: AccountStatus | null, createdAt: any, updatedAt: any } | null } };

export type CreateStaffMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateStaffMutation = { __typename?: 'Mutation', createStaff: { __typename?: 'AuthPayload', token?: string | null, message?: string | null, success?: boolean | null, user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, emailVerified?: boolean | null, emailVerifiedAt?: any | null, accountStatus?: AccountStatus | null, createdAt: any, updatedAt: any, addresses?: Array<{ __typename?: 'Address', id: string, street?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, country?: string | null, isDefault?: boolean | null, label?: string | null } | null> | null, defaultAddress?: { __typename?: 'Address', id: string, street?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, country?: string | null, isDefault?: boolean | null, label?: string | null } | null } | null } };

export type RegisterMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthPayload', message?: string | null, token?: string | null, user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, emailVerified?: boolean | null, accountStatus?: AccountStatus | null } | null } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', token?: string | null, user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null } | null } };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null } | null };

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


export type UpdateUserRoleMutation = { __typename?: 'Mutation', updateUserRole: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null } };

export type SendVerificationEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendVerificationEmailMutation = { __typename?: 'Mutation', sendVerificationEmail: boolean };

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: { __typename?: 'AuthPayload', message?: string | null, token?: string | null, user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, emailVerified?: boolean | null, accountStatus?: AccountStatus | null } | null } };

export type UpdateAccountStatusMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  status: AccountStatus;
  reason?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateAccountStatusMutation = { __typename?: 'Mutation', updateAccountStatus: boolean };

export type AddAddressMutationVariables = Exact<{
  input: AddressInput;
}>;


export type AddAddressMutation = { __typename?: 'Mutation', addAddress: boolean };

export type SetDefaultAddressMutationVariables = Exact<{
  addressId: Scalars['ID']['input'];
}>;


export type SetDefaultAddressMutation = { __typename?: 'Mutation', setDefaultAddress: boolean };

export type UpdateAddressMutationVariables = Exact<{
  addressId: Scalars['ID']['input'];
  input: AddressInput;
}>;


export type UpdateAddressMutation = { __typename?: 'Mutation', updateAddress: boolean };

export type RemoveAddressMutationVariables = Exact<{
  addressId: Scalars['ID']['input'];
}>;


export type RemoveAddressMutation = { __typename?: 'Mutation', removeAddress: boolean };

export type UpdateBookingPaymentStatusMutationVariables = Exact<{
  updateBookingPaymentStatusId: Scalars['ID']['input'];
  paymentStatus: PaymentStatus;
}>;


export type UpdateBookingPaymentStatusMutation = { __typename?: 'Mutation', updateBookingPaymentStatus: boolean };

export type CreateBookingMutationVariables = Exact<{
  input: CreateBookingInput;
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: string };

export type UpdateBookingMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateBookingInput;
}>;


export type UpdateBookingMutation = { __typename?: 'Mutation', updateBooking: boolean };

export type CancelBookingMutationVariables = Exact<{
  cancelBookingId: Scalars['ID']['input'];
  cancellationReason?: InputMaybe<Scalars['String']['input']>;
}>;


export type CancelBookingMutation = { __typename?: 'Mutation', cancelBooking: boolean };

export type CompleteBookingMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CompleteBookingMutation = { __typename?: 'Mutation', completeBooking: boolean };

export type DeleteBookingMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteBookingMutation = { __typename?: 'Mutation', deleteBooking: boolean };

export type AssignStaffMutationVariables = Exact<{
  bookingId: Scalars['ID']['input'];
  staffId: Scalars['ID']['input'];
}>;


export type AssignStaffMutation = { __typename?: 'Mutation', assignStaff: boolean };

export type UpdateBookingStatusMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  status: BookingStatus;
}>;


export type UpdateBookingStatusMutation = { __typename?: 'Mutation', updateBookingStatus: boolean };

export type RescheduleBookingMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  newDate: Scalars['DateTime']['input'];
  newTimeSlot: TimeSlot;
}>;


export type RescheduleBookingMutation = { __typename?: 'Mutation', rescheduleBooking: boolean };

export type AddBookingFeedbackMutationVariables = Exact<{
  addBookingFeedbackId: Scalars['ID']['input'];
  feedback: FeedbackInput;
}>;


export type AddBookingFeedbackMutation = { __typename?: 'Mutation', addBookingFeedback: boolean };

export type CreateNotificationMutationVariables = Exact<{
  input: CreateNotificationInput;
}>;


export type CreateNotificationMutation = { __typename?: 'Mutation', createNotification: { __typename?: 'Notification', id: string, type: NotificationType, priority: NotificationPriority, title: string, message: string, data?: any | null, isRead: boolean, createdAt: any, user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, emailVerified?: boolean | null, emailVerifiedAt?: any | null, accountStatus?: AccountStatus | null } | null } };

export type MarkNotificationAsReadMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type MarkNotificationAsReadMutation = { __typename?: 'Mutation', markNotificationAsRead?: { __typename?: 'Notification', id: string, isRead: boolean, readAt?: any | null } | null };

export type MarkNotificationsAsReadMutationVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type MarkNotificationsAsReadMutation = { __typename?: 'Mutation', markNotificationsAsRead: number };

export type DeleteNotificationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteNotificationMutation = { __typename?: 'Mutation', deleteNotification: boolean };

export type BroadcastNotificationMutationVariables = Exact<{
  input: BroadcastNotificationInput;
}>;


export type BroadcastNotificationMutation = { __typename?: 'Mutation', broadcastNotification: boolean };

export type SendNotificationToRoleMutationVariables = Exact<{
  role: UserRole;
  input: BroadcastNotificationInput;
}>;


export type SendNotificationToRoleMutation = { __typename?: 'Mutation', sendNotificationToRole: boolean };

export type CreatePaymentMutationVariables = Exact<{
  input: CreatePaymentInput;
}>;


export type CreatePaymentMutation = { __typename?: 'Mutation', createPayment: { __typename?: 'Payment', id: string, amount: number, currency: string, status: PaymentStatus, paymentIntentId: string, refundAmount?: number | null, refundReason?: string | null, metadata?: any | null, createdAt: any, updatedAt: any, booking: { __typename?: 'Booking', id: string, service: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string } }, customer: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, paymentMethod: { __typename?: 'PaymentMethod', id: string, type: PaymentMethodType, last4: string, expiryMonth: number, expiryYear: number, brand: string, isDefault: boolean } } };

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


export type CreateSubscriptionMutation = { __typename?: 'Mutation', createSubscription: { __typename?: 'CreateSubscriptionResponse', success: boolean, subscriptionId?: string | null, billingId?: string | null, requiresPayment: boolean } };

export type UpdateSubscriptionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateSubscriptionInput;
}>;


export type UpdateSubscriptionMutation = { __typename?: 'Mutation', updateSubscription: boolean };

export type CancelSubscriptionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CancelSubscriptionMutation = { __typename?: 'Mutation', cancelSubscription: boolean };

export type PauseSubscriptionMutationVariables = Exact<{
  pauseSubscriptionId: Scalars['ID']['input'];
}>;


export type PauseSubscriptionMutation = { __typename?: 'Mutation', pauseSubscription: boolean };

export type ResumeSubscriptionMutationVariables = Exact<{
  resumeSubscriptionId: Scalars['ID']['input'];
}>;


export type ResumeSubscriptionMutation = { __typename?: 'Mutation', resumeSubscription: boolean };

export type UpdateSubscriptionStatusMutationVariables = Exact<{
  updateSubscriptionStatusId: Scalars['ID']['input'];
  status: SubscriptionStatus;
}>;


export type UpdateSubscriptionStatusMutation = { __typename?: 'Mutation', updateSubscriptionStatus: boolean };

export type AddServiceToSubscriptionMutationVariables = Exact<{
  subscriptionId: Scalars['ID']['input'];
  service: SubscriptionServiceInput;
}>;


export type AddServiceToSubscriptionMutation = { __typename?: 'Mutation', addServiceToSubscription: boolean };

export type RemoveServiceFromSubscriptionMutationVariables = Exact<{
  subscriptionId: Scalars['ID']['input'];
  subscriptionServiceId: Scalars['ID']['input'];
}>;


export type RemoveServiceFromSubscriptionMutation = { __typename?: 'Mutation', removeServiceFromSubscription: boolean };

export type UpdateSubscriptionServiceMutationVariables = Exact<{
  subscriptionId: Scalars['ID']['input'];
  subscriptionServiceId: Scalars['ID']['input'];
  input: UpdateSubscriptionServiceInput;
}>;


export type UpdateSubscriptionServiceMutation = { __typename?: 'Mutation', updateSubscriptionService: boolean };

export type ReactivateSubscriptionMutationVariables = Exact<{
  reactivateSubscriptionId: Scalars['ID']['input'];
}>;


export type ReactivateSubscriptionMutation = { __typename?: 'Mutation', reactivateSubscription: boolean };

export type PendingAdminInvitationsQueryVariables = Exact<{ [key: string]: never; }>;


export type PendingAdminInvitationsQuery = { __typename?: 'Query', pendingAdminInvitations: Array<{ __typename?: 'AdminInvitation', id: string, email: string, firstName: string, lastName: string, role: UserRole, invitedByName: string, invitationToken: string, expiresAt: any, isUsed: boolean, usedAt?: any | null, createdAt: any, permissions: Array<string>, invitedBy: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, emailVerified?: boolean | null, emailVerifiedAt?: any | null, accountStatus?: AccountStatus | null, createdAt: any, updatedAt: any } }> };

export type AdminInvitationQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type AdminInvitationQuery = { __typename?: 'Query', adminInvitation?: { __typename?: 'AdminInvitation', id: string, email: string, firstName: string, lastName: string, role: UserRole, invitedByName: string, invitationToken: string, expiresAt: any, isUsed: boolean, usedAt?: any | null, createdAt: any, permissions: Array<string>, invitedBy: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, emailVerified?: boolean | null, emailVerifiedAt?: any | null, accountStatus?: AccountStatus | null, createdAt: any, updatedAt: any } } | null };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, emailVerified?: boolean | null, emailVerifiedAt?: any | null, accountStatus?: AccountStatus | null, createdAt: any, updatedAt: any, defaultAddress?: { __typename?: 'Address', street?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, country?: string | null, id: string, isDefault?: boolean | null, label?: string | null } | null, addresses?: Array<{ __typename?: 'Address', id: string, street?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, country?: string | null, isDefault?: boolean | null, label?: string | null } | null> | null } | null };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, emailVerified?: boolean | null, emailVerifiedAt?: any | null, accountStatus?: AccountStatus | null, createdAt: any, updatedAt: any, defaultAddress?: { __typename?: 'Address', street?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, country?: string | null, id: string, isDefault?: boolean | null, label?: string | null } | null, addresses?: Array<{ __typename?: 'Address', id: string, street?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, country?: string | null, isDefault?: boolean | null, label?: string | null } | null> | null } | null };

export type GetUsersQueryVariables = Exact<{
  role?: InputMaybe<UserRole>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, emailVerified?: boolean | null, emailVerifiedAt?: any | null, accountStatus?: AccountStatus | null, createdAt: any, updatedAt: any, defaultAddress?: { __typename?: 'Address', street?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, country?: string | null, id: string, isDefault?: boolean | null, label?: string | null } | null, addresses?: Array<{ __typename?: 'Address', id: string, street?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, country?: string | null, isDefault?: boolean | null, label?: string | null } | null> | null }> };

export type GetSubscriptionBillingsQueryVariables = Exact<{
  subscriptionId: Scalars['ID']['input'];
}>;


export type GetSubscriptionBillingsQuery = { __typename?: 'Query', subscriptionBillings: Array<{ __typename?: 'Billing', id: string, amount: number, status: BillingStatus, billingDate: any, paymentDate?: any | null, description?: string | null, cancellationDate?: any | null, cancellationReason?: string | null, createdAt: any, updatedAt: any, periodStartDate: any, periodEndDate: any, paystackReference?: string | null, payment?: { __typename?: 'Payment', id: string, amount: number, currency: string, status: PaymentStatus, refundAmount?: number | null, refundReason?: string | null, metadata?: any | null, createdAt: any, updatedAt: any } | null }> };

export type GetBillingStatsQueryVariables = Exact<{
  subscriptionId: Scalars['ID']['input'];
}>;


export type GetBillingStatsQuery = { __typename?: 'Query', billingStats: { __typename?: 'BillingStats', total: number, paid: number, pending: number, failed: number, totalAmount: number, paidAmount: number } };

export type GetUserBillingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserBillingsQuery = { __typename?: 'Query', userBillings: Array<{ __typename?: 'Billing', id: string, amount: number, status: BillingStatus, billingDate: any, paymentDate?: any | null, description?: string | null, cancellationDate?: any | null, cancellationReason?: string | null, createdAt: any, updatedAt: any, periodStartDate: any, periodEndDate: any, paystackReference?: string | null, payment?: { __typename?: 'Payment', id: string, amount: number, currency: string, status: PaymentStatus, refundAmount?: number | null, refundReason?: string | null, metadata?: any | null, createdAt: any, updatedAt: any } | null }> };

export type GetBookingsQueryVariables = Exact<{
  status?: InputMaybe<BookingStatus>;
}>;


export type GetBookingsQuery = { __typename?: 'Query', bookings: Array<{ __typename?: 'Booking', id: string, totalPrice: number, paymentStatus: PaymentStatus, createdAt: any, updatedAt: any, service_category: ServiceCategory, serviceOption: ServiceId, date: any, timeSlot: TimeSlot, status: BookingStatus, notes?: string | null, recurring?: boolean | null, cancellationDate?: any | null, cancellationReason?: string | null, resumeDate?: any | null, pauseDate?: any | null, recurringDiscount?: number | null, feedback?: { __typename?: 'Feedback', rating?: number | null, comment?: string | null } | null, customer: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any }, service: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string, label: string, description: string, category: ServiceCategory, icon: string, price: number, displayPrice: string, status: ServiceStatus, imageUrl?: string | null, features?: Array<string> | null, inclusions?: Array<string> | null, options?: Array<{ __typename?: 'ServiceOption', id: string, service_id: ServiceId, label: string, description: string, price: number, inclusions?: Array<string> | null, imageUrl?: string | null, extraItems?: Array<{ __typename?: 'ExtraItem', name: string, items: number, cost: number }> | null }> | null }, staff?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any } | null, address: { __typename?: 'Address', id: string, street?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, country?: string | null, label?: string | null }, serviceDetails: { __typename?: 'ServiceDetails', serviceOption?: ServiceId | null, cleaning?: { __typename?: 'CleaningDetails', cleaningType: CleaningType, houseType: HouseType, rooms: { __typename?: 'RoomQuantities', bedroom: number, livingRoom: number, bathroom: number, kitchen: number, balcony: number, studyRoom: number, other: number, lobby: number, outdoor: number } } | null, laundry?: { __typename?: 'LaundryDetails', laundryType: LaundryType, bags: number, items?: { __typename?: 'LaundryItems', shirts: number, pants: number, dresses: number, suits: number, others: number } | null } | null, pestControl?: { __typename?: 'PestControlDetails', treatmentType: TreatmentType, areas: Array<string>, severity: Severity } | null, cooking?: { __typename?: 'CookingDetails', mealType: MealType, mealsPerDelivery: Array<{ __typename?: 'MealDelivery', day: ScheduleDays, count: number }> } | null } }> };

export type GetBookingByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetBookingByIdQuery = { __typename?: 'Query', booking?: { __typename?: 'Booking', id: string, date: any, timeSlot: TimeSlot, status: BookingStatus, notes?: string | null, totalPrice: number, paymentStatus: PaymentStatus, createdAt: any, updatedAt: any, service_category: ServiceCategory, serviceOption: ServiceId, recurring?: boolean | null, cancellationDate?: any | null, cancellationReason?: string | null, resumeDate?: any | null, pauseDate?: any | null, recurringDiscount?: number | null, feedback?: { __typename?: 'Feedback', rating?: number | null, comment?: string | null } | null, customer: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any }, service: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string, label: string, description: string, category: ServiceCategory, icon: string, price: number, displayPrice: string, status: ServiceStatus, imageUrl?: string | null, features?: Array<string> | null, inclusions?: Array<string> | null, options?: Array<{ __typename?: 'ServiceOption', id: string, service_id: ServiceId, label: string, description: string, price: number, inclusions?: Array<string> | null, imageUrl?: string | null, extraItems?: Array<{ __typename?: 'ExtraItem', name: string, items: number, cost: number }> | null }> | null }, staff?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any } | null, address: { __typename?: 'Address', id: string, street?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, country?: string | null, label?: string | null }, serviceDetails: { __typename?: 'ServiceDetails', serviceOption?: ServiceId | null, cleaning?: { __typename?: 'CleaningDetails', cleaningType: CleaningType, houseType: HouseType, rooms: { __typename?: 'RoomQuantities', bedroom: number, livingRoom: number, bathroom: number, kitchen: number, balcony: number, studyRoom: number, other: number, lobby: number, outdoor: number } } | null, laundry?: { __typename?: 'LaundryDetails', laundryType: LaundryType, bags: number, items?: { __typename?: 'LaundryItems', shirts: number, pants: number, dresses: number, suits: number, others: number } | null } | null, pestControl?: { __typename?: 'PestControlDetails', treatmentType: TreatmentType, areas: Array<string>, severity: Severity } | null, cooking?: { __typename?: 'CookingDetails', mealType: MealType, mealsPerDelivery: Array<{ __typename?: 'MealDelivery', day: ScheduleDays, count: number }> } | null } } | null };

export type GetCustomerBookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomerBookingsQuery = { __typename?: 'Query', customerBookings: Array<{ __typename?: 'Booking', id: string, date: any, timeSlot: TimeSlot, status: BookingStatus, notes?: string | null, totalPrice: number, paymentStatus: PaymentStatus, createdAt: any, updatedAt: any, service_category: ServiceCategory, serviceOption: ServiceId, recurring?: boolean | null, cancellationDate?: any | null, cancellationReason?: string | null, resumeDate?: any | null, pauseDate?: any | null, recurringDiscount?: number | null, feedback?: { __typename?: 'Feedback', rating?: number | null, comment?: string | null } | null, customer: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any }, service: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string, label: string, description: string, category: ServiceCategory, icon: string, price: number, displayPrice: string, status: ServiceStatus, imageUrl?: string | null, features?: Array<string> | null, inclusions?: Array<string> | null, options?: Array<{ __typename?: 'ServiceOption', id: string, service_id: ServiceId, label: string, description: string, price: number, inclusions?: Array<string> | null, imageUrl?: string | null, extraItems?: Array<{ __typename?: 'ExtraItem', name: string, items: number, cost: number }> | null }> | null }, staff?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any } | null, address: { __typename?: 'Address', id: string, street?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, country?: string | null, label?: string | null }, serviceDetails: { __typename?: 'ServiceDetails', serviceOption?: ServiceId | null, cleaning?: { __typename?: 'CleaningDetails', cleaningType: CleaningType, houseType: HouseType, rooms: { __typename?: 'RoomQuantities', bedroom: number, livingRoom: number, bathroom: number, kitchen: number, balcony: number, studyRoom: number, other: number, lobby: number, outdoor: number } } | null, laundry?: { __typename?: 'LaundryDetails', laundryType: LaundryType, bags: number, items?: { __typename?: 'LaundryItems', shirts: number, pants: number, dresses: number, suits: number, others: number } | null } | null, pestControl?: { __typename?: 'PestControlDetails', treatmentType: TreatmentType, areas: Array<string>, severity: Severity } | null, cooking?: { __typename?: 'CookingDetails', mealType: MealType, mealsPerDelivery: Array<{ __typename?: 'MealDelivery', day: ScheduleDays, count: number }> } | null } }> };

export type GetStaffBookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStaffBookingsQuery = { __typename?: 'Query', staffBookings: Array<{ __typename?: 'Booking', id: string, date: any, timeSlot: TimeSlot, status: BookingStatus, notes?: string | null, totalPrice: number, paymentStatus: PaymentStatus, createdAt: any, updatedAt: any, service_category: ServiceCategory, serviceOption: ServiceId, customer: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any }, service: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string, label: string, description: string, category: ServiceCategory, icon: string, price: number, displayPrice: string, status: ServiceStatus, imageUrl?: string | null, features?: Array<string> | null, inclusions?: Array<string> | null, options?: Array<{ __typename?: 'ServiceOption', id: string, service_id: ServiceId, label: string, description: string, price: number, inclusions?: Array<string> | null, imageUrl?: string | null, extraItems?: Array<{ __typename?: 'ExtraItem', name: string, items: number, cost: number }> | null }> | null }, staff?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any } | null, address: { __typename?: 'Address', id: string, street?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, country?: string | null, label?: string | null }, serviceDetails: { __typename?: 'ServiceDetails', cleaning?: { __typename?: 'CleaningDetails', cleaningType: CleaningType, houseType: HouseType, rooms: { __typename?: 'RoomQuantities', bedroom: number, livingRoom: number, bathroom: number, kitchen: number, balcony: number, studyRoom: number, other: number, lobby: number, outdoor: number } } | null, laundry?: { __typename?: 'LaundryDetails', laundryType: LaundryType, bags: number, items?: { __typename?: 'LaundryItems', shirts: number, pants: number, dresses: number, suits: number, others: number } | null } | null, pestControl?: { __typename?: 'PestControlDetails', treatmentType: TreatmentType, areas: Array<string>, severity: Severity } | null, cooking?: { __typename?: 'CookingDetails', mealType: MealType, mealsPerDelivery: Array<{ __typename?: 'MealDelivery', day: ScheduleDays, count: number }> } | null } }> };

export type GetNotificationsQueryVariables = Exact<{
  filters?: InputMaybe<NotificationFilters>;
  pagination?: InputMaybe<PaginationInput>;
}>;


export type GetNotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'NotificationConnection', total: number, page: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, notifications: Array<{ __typename?: 'Notification', id: string, type: NotificationType, priority: NotificationPriority, title: string, message: string, data?: any | null, isRead: boolean, isDeleted: boolean, readAt?: any | null, expiresAt?: any | null, createdAt: any, updatedAt: any, user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, emailVerified?: boolean | null, emailVerifiedAt?: any | null, accountStatus?: AccountStatus | null } | null }> } };

export type GetNotificationByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetNotificationByIdQuery = { __typename?: 'Query', notification?: { __typename?: 'Notification', id: string, type: NotificationType, priority: NotificationPriority, title: string, message: string, data?: any | null, isRead: boolean, isDeleted: boolean, readAt?: any | null, expiresAt?: any | null, createdAt: any, updatedAt: any, user?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, emailVerified?: boolean | null, emailVerifiedAt?: any | null, accountStatus?: AccountStatus | null } | null } | null };

export type GetUnreadNotificationCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnreadNotificationCountQuery = { __typename?: 'Query', unreadNotificationCount: number };

export type GetNotificationStatsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetNotificationStatsQuery = { __typename?: 'Query', notificationStats: { __typename?: 'NotificationStats', total: number, unread: number, byType: Array<{ __typename?: 'NotificationTypeCount', type: NotificationType, count: number }>, byPriority: Array<{ __typename?: 'NotificationPriorityCount', priority: NotificationPriority, count: number }> } };

export type IsUserOnlineQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type IsUserOnlineQuery = { __typename?: 'Query', isUserOnline: boolean };

export type GetPaymentByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPaymentByIdQuery = { __typename?: 'Query', payment: { __typename?: 'Payment', id: string, amount: number, currency: string, status: PaymentStatus, paymentIntentId: string, refundAmount?: number | null, refundReason?: string | null, metadata?: any | null, createdAt: any, updatedAt: any, booking: { __typename?: 'Booking', id: string, service: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string } }, customer: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, paymentMethod: { __typename?: 'PaymentMethod', id: string, type: PaymentMethodType, last4: string, expiryMonth: number, expiryYear: number, brand: string, isDefault: boolean } } };

export type GetPaymentsQueryVariables = Exact<{
  status?: InputMaybe<PaymentStatus>;
}>;


export type GetPaymentsQuery = { __typename?: 'Query', payments: Array<{ __typename?: 'Payment', id: string, amount: number, currency: string, status: PaymentStatus, createdAt: any, updatedAt: any, booking: { __typename?: 'Booking', id: string, service: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string } }, customer: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string }, paymentMethod: { __typename?: 'PaymentMethod', id: string, type: PaymentMethodType, last4: string, brand: string } }> };

export type GetCustomerPaymentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomerPaymentsQuery = { __typename?: 'Query', customerPayments: Array<{ __typename?: 'Payment', id: string, amount: number, currency: string, status: PaymentStatus, createdAt: any, updatedAt: any, booking: { __typename?: 'Booking', id: string, service: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string } }, paymentMethod: { __typename?: 'PaymentMethod', id: string, type: PaymentMethodType, last4: string, brand: string } }> };

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


export type GetServicesQuery = { __typename?: 'Query', services: Array<{ __typename?: 'Service', _id: string, service_id: ServiceId, name: string, label: string, description: string, category: ServiceCategory, icon: string, price: number, displayPrice: string, status: ServiceStatus, imageUrl?: string | null, features?: Array<string> | null, inclusions?: Array<string> | null, options?: Array<{ __typename?: 'ServiceOption', id: string, service_id: ServiceId, label: string, description: string, price: number, inclusions?: Array<string> | null, imageUrl?: string | null, extraItems?: Array<{ __typename?: 'ExtraItem', name: string, items: number, cost: number }> | null }> | null, roomPrices?: { __typename?: 'RoomPrices', bedroom: number, livingRoom: number, bathroom: number, kitchen: number, study: number, outdoor: number, lobby: number, balcony: number } | null }> };

export type GetServiceByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetServiceByIdQuery = { __typename?: 'Query', service?: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string, label: string, description: string, category: ServiceCategory, icon: string, price: number, displayPrice: string, status: ServiceStatus, imageUrl?: string | null, features?: Array<string> | null, inclusions?: Array<string> | null, options?: Array<{ __typename?: 'ServiceOption', id: string, service_id: ServiceId, label: string, description: string, price: number, inclusions?: Array<string> | null, imageUrl?: string | null, extraItems?: Array<{ __typename?: 'ExtraItem', name: string, items: number, cost: number }> | null }> | null, roomPrices?: { __typename?: 'RoomPrices', bedroom: number, livingRoom: number, bathroom: number, kitchen: number, study: number, outdoor: number, lobby: number, balcony: number } | null } | null };

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


export type GetSubscriptionByIdQuery = { __typename?: 'Query', subscription?: { __typename?: 'Subscription', id: string, startDate: any, endDate?: any | null, status: SubscriptionStatus, billingCycle: BillingCycle, duration: number, totalPrice: number, nextBillingDate: any, lastBillingDate?: any | null, autoRenew: boolean, createdAt: any, updatedAt: any, customer: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any }, address: { __typename?: 'Address', id: string, street?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, country?: string | null, isDefault?: boolean | null, label?: string | null }, paymentMethod?: { __typename?: 'PaymentMethod', id: string, type: PaymentMethodType, last4: string, expiryMonth: number, expiryYear: number, brand: string, isDefault: boolean, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any } } | null, subscriptionServices: Array<{ __typename?: 'SubscriptionService', service_category: ServiceCategory, frequency: SubscriptionFrequency, price: number, scheduledDays: Array<ScheduleDays>, preferredTimeSlot: TimeSlot, createdAt: any, updatedAt: any, id: string, service: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string, label: string, description: string, category: ServiceCategory, icon: string, price: number, displayPrice: string, status: ServiceStatus, imageUrl?: string | null, features?: Array<string> | null, inclusions?: Array<string> | null, options?: Array<{ __typename?: 'ServiceOption', id: string, service_id: ServiceId, label: string, description: string, price: number, inclusions?: Array<string> | null, imageUrl?: string | null, extraItems?: Array<{ __typename?: 'ExtraItem', name: string, items: number, cost: number }> | null }> | null }, serviceDetails: { __typename?: 'ServiceDetails', cleaning?: { __typename?: 'CleaningDetails', cleaningType: CleaningType, houseType: HouseType, rooms: { __typename?: 'RoomQuantities', bedroom: number, livingRoom: number, bathroom: number, kitchen: number, balcony: number, studyRoom: number, other: number } } | null, laundry?: { __typename?: 'LaundryDetails', laundryType: LaundryType, bags: number, items?: { __typename?: 'LaundryItems', shirts: number, pants: number, dresses: number, suits: number, others: number } | null } | null, pestControl?: { __typename?: 'PestControlDetails', treatmentType: TreatmentType, areas: Array<string>, severity: Severity } | null, cooking?: { __typename?: 'CookingDetails', mealType: MealType, mealsPerDelivery: Array<{ __typename?: 'MealDelivery', day: ScheduleDays, count: number }> } | null } }> } | null };

export type GetSubscriptionsQueryVariables = Exact<{
  status?: InputMaybe<SubscriptionStatus>;
}>;


export type GetSubscriptionsQuery = { __typename?: 'Query', subscriptions: Array<{ __typename?: 'Subscription', id: string, startDate: any, endDate?: any | null, status: SubscriptionStatus, billingCycle: BillingCycle, duration: number, totalPrice: number, nextBillingDate: any, lastBillingDate?: any | null, autoRenew: boolean, createdAt: any, updatedAt: any, customer: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any }, address: { __typename?: 'Address', id: string, street?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, country?: string | null, isDefault?: boolean | null, label?: string | null }, paymentMethod?: { __typename?: 'PaymentMethod', id: string, type: PaymentMethodType, last4: string, expiryMonth: number, expiryYear: number, brand: string, isDefault: boolean, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any } } | null, subscriptionServices: Array<{ __typename?: 'SubscriptionService', service_category: ServiceCategory, frequency: SubscriptionFrequency, price: number, scheduledDays: Array<ScheduleDays>, preferredTimeSlot: TimeSlot, createdAt: any, updatedAt: any, id: string, service: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string, label: string, description: string, category: ServiceCategory, icon: string, price: number, displayPrice: string, status: ServiceStatus, imageUrl?: string | null, features?: Array<string> | null, inclusions?: Array<string> | null, options?: Array<{ __typename?: 'ServiceOption', id: string, service_id: ServiceId, label: string, description: string, price: number, inclusions?: Array<string> | null, imageUrl?: string | null, extraItems?: Array<{ __typename?: 'ExtraItem', name: string, items: number, cost: number }> | null }> | null }, serviceDetails: { __typename?: 'ServiceDetails', cleaning?: { __typename?: 'CleaningDetails', cleaningType: CleaningType, houseType: HouseType, rooms: { __typename?: 'RoomQuantities', bedroom: number, livingRoom: number, bathroom: number, kitchen: number, balcony: number, studyRoom: number, other: number } } | null, laundry?: { __typename?: 'LaundryDetails', laundryType: LaundryType, bags: number, items?: { __typename?: 'LaundryItems', shirts: number, pants: number, dresses: number, suits: number, others: number } | null } | null, pestControl?: { __typename?: 'PestControlDetails', treatmentType: TreatmentType, areas: Array<string>, severity: Severity } | null, cooking?: { __typename?: 'CookingDetails', mealType: MealType, mealsPerDelivery: Array<{ __typename?: 'MealDelivery', day: ScheduleDays, count: number }> } | null } }> }> };

export type GetCustomerSubscriptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomerSubscriptionsQuery = { __typename?: 'Query', customerSubscriptions: Array<{ __typename?: 'Subscription', id: string, startDate: any, endDate?: any | null, status: SubscriptionStatus, billingCycle: BillingCycle, duration: number, totalPrice: number, nextBillingDate: any, lastBillingDate?: any | null, autoRenew: boolean, createdAt: any, updatedAt: any, customer: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any }, address: { __typename?: 'Address', id: string, street?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, country?: string | null, isDefault?: boolean | null, label?: string | null }, paymentMethod?: { __typename?: 'PaymentMethod', id: string, type: PaymentMethodType, last4: string, expiryMonth: number, expiryYear: number, brand: string, isDefault: boolean, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, role: UserRole, phone?: string | null, createdAt: any, updatedAt: any } } | null, subscriptionServices: Array<{ __typename?: 'SubscriptionService', service_category: ServiceCategory, frequency: SubscriptionFrequency, price: number, scheduledDays: Array<ScheduleDays>, preferredTimeSlot: TimeSlot, createdAt: any, updatedAt: any, id: string, service: { __typename?: 'Service', _id: string, service_id: ServiceId, name: string, label: string, description: string, category: ServiceCategory, icon: string, price: number, displayPrice: string, status: ServiceStatus, imageUrl?: string | null, features?: Array<string> | null, inclusions?: Array<string> | null, options?: Array<{ __typename?: 'ServiceOption', id: string, service_id: ServiceId, label: string, description: string, price: number, inclusions?: Array<string> | null, imageUrl?: string | null, extraItems?: Array<{ __typename?: 'ExtraItem', name: string, items: number, cost: number }> | null }> | null }, serviceDetails: { __typename?: 'ServiceDetails', cleaning?: { __typename?: 'CleaningDetails', cleaningType: CleaningType, houseType: HouseType, rooms: { __typename?: 'RoomQuantities', bedroom: number, livingRoom: number, bathroom: number, kitchen: number, balcony: number, studyRoom: number, other: number } } | null, laundry?: { __typename?: 'LaundryDetails', laundryType: LaundryType, bags: number, items?: { __typename?: 'LaundryItems', shirts: number, pants: number, dresses: number, suits: number, others: number } | null } | null, pestControl?: { __typename?: 'PestControlDetails', treatmentType: TreatmentType, areas: Array<string>, severity: Severity } | null, cooking?: { __typename?: 'CookingDetails', mealType: MealType, mealsPerDelivery: Array<{ __typename?: 'MealDelivery', day: ScheduleDays, count: number }> } | null } }> }> };


export const CreateAdminInvitationDocument = gql`
    mutation CreateAdminInvitation($input: CreateAdminInvitationInput!) {
  createAdminInvitation(input: $input) {
    success
    message
    invitation {
      id
      email
      firstName
      lastName
      role
      invitedBy {
        id
        email
        firstName
        lastName
        role
        phone
        emailVerified
        emailVerifiedAt
        accountStatus
      }
      invitedByName
      invitationToken
      expiresAt
      isUsed
      usedAt
      createdAt
      permissions
    }
  }
}
    `;
export type CreateAdminInvitationMutationFn = Apollo.MutationFunction<CreateAdminInvitationMutation, CreateAdminInvitationMutationVariables>;

/**
 * __useCreateAdminInvitationMutation__
 *
 * To run a mutation, you first call `useCreateAdminInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAdminInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAdminInvitationMutation, { data, loading, error }] = useCreateAdminInvitationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAdminInvitationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateAdminInvitationMutation, CreateAdminInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateAdminInvitationMutation, CreateAdminInvitationMutationVariables>(CreateAdminInvitationDocument, options);
      }
export type CreateAdminInvitationMutationHookResult = ReturnType<typeof useCreateAdminInvitationMutation>;
export type CreateAdminInvitationMutationResult = Apollo.MutationResult<CreateAdminInvitationMutation>;
export type CreateAdminInvitationMutationOptions = Apollo.BaseMutationOptions<CreateAdminInvitationMutation, CreateAdminInvitationMutationVariables>;
export const AcceptAdminInvitationDocument = gql`
    mutation AcceptAdminInvitation($input: AcceptAdminInvitationInput!) {
  acceptAdminInvitation(input: $input) {
    success
    message
    token
    user {
      id
      email
      firstName
      lastName
      role
      phone
      emailVerified
      emailVerifiedAt
      accountStatus
      createdAt
      updatedAt
    }
  }
}
    `;
export type AcceptAdminInvitationMutationFn = Apollo.MutationFunction<AcceptAdminInvitationMutation, AcceptAdminInvitationMutationVariables>;

/**
 * __useAcceptAdminInvitationMutation__
 *
 * To run a mutation, you first call `useAcceptAdminInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptAdminInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptAdminInvitationMutation, { data, loading, error }] = useAcceptAdminInvitationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAcceptAdminInvitationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AcceptAdminInvitationMutation, AcceptAdminInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AcceptAdminInvitationMutation, AcceptAdminInvitationMutationVariables>(AcceptAdminInvitationDocument, options);
      }
export type AcceptAdminInvitationMutationHookResult = ReturnType<typeof useAcceptAdminInvitationMutation>;
export type AcceptAdminInvitationMutationResult = Apollo.MutationResult<AcceptAdminInvitationMutation>;
export type AcceptAdminInvitationMutationOptions = Apollo.BaseMutationOptions<AcceptAdminInvitationMutation, AcceptAdminInvitationMutationVariables>;
export const ResendAdminInvitationDocument = gql`
    mutation ResendAdminInvitation($invitationId: ID!) {
  resendAdminInvitation(invitationId: $invitationId)
}
    `;
export type ResendAdminInvitationMutationFn = Apollo.MutationFunction<ResendAdminInvitationMutation, ResendAdminInvitationMutationVariables>;

/**
 * __useResendAdminInvitationMutation__
 *
 * To run a mutation, you first call `useResendAdminInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendAdminInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendAdminInvitationMutation, { data, loading, error }] = useResendAdminInvitationMutation({
 *   variables: {
 *      invitationId: // value for 'invitationId'
 *   },
 * });
 */
export function useResendAdminInvitationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResendAdminInvitationMutation, ResendAdminInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ResendAdminInvitationMutation, ResendAdminInvitationMutationVariables>(ResendAdminInvitationDocument, options);
      }
export type ResendAdminInvitationMutationHookResult = ReturnType<typeof useResendAdminInvitationMutation>;
export type ResendAdminInvitationMutationResult = Apollo.MutationResult<ResendAdminInvitationMutation>;
export type ResendAdminInvitationMutationOptions = Apollo.BaseMutationOptions<ResendAdminInvitationMutation, ResendAdminInvitationMutationVariables>;
export const CancelAdminInvitationDocument = gql`
    mutation CancelAdminInvitation($invitationId: ID!) {
  cancelAdminInvitation(invitationId: $invitationId)
}
    `;
export type CancelAdminInvitationMutationFn = Apollo.MutationFunction<CancelAdminInvitationMutation, CancelAdminInvitationMutationVariables>;

/**
 * __useCancelAdminInvitationMutation__
 *
 * To run a mutation, you first call `useCancelAdminInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelAdminInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelAdminInvitationMutation, { data, loading, error }] = useCancelAdminInvitationMutation({
 *   variables: {
 *      invitationId: // value for 'invitationId'
 *   },
 * });
 */
export function useCancelAdminInvitationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CancelAdminInvitationMutation, CancelAdminInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CancelAdminInvitationMutation, CancelAdminInvitationMutationVariables>(CancelAdminInvitationDocument, options);
      }
export type CancelAdminInvitationMutationHookResult = ReturnType<typeof useCancelAdminInvitationMutation>;
export type CancelAdminInvitationMutationResult = Apollo.MutationResult<CancelAdminInvitationMutation>;
export type CancelAdminInvitationMutationOptions = Apollo.BaseMutationOptions<CancelAdminInvitationMutation, CancelAdminInvitationMutationVariables>;
export const CleanupExpiredInvitationsDocument = gql`
    mutation CleanupExpiredInvitations {
  cleanupExpiredInvitations
}
    `;
export type CleanupExpiredInvitationsMutationFn = Apollo.MutationFunction<CleanupExpiredInvitationsMutation, CleanupExpiredInvitationsMutationVariables>;

/**
 * __useCleanupExpiredInvitationsMutation__
 *
 * To run a mutation, you first call `useCleanupExpiredInvitationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCleanupExpiredInvitationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cleanupExpiredInvitationsMutation, { data, loading, error }] = useCleanupExpiredInvitationsMutation({
 *   variables: {
 *   },
 * });
 */
export function useCleanupExpiredInvitationsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CleanupExpiredInvitationsMutation, CleanupExpiredInvitationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CleanupExpiredInvitationsMutation, CleanupExpiredInvitationsMutationVariables>(CleanupExpiredInvitationsDocument, options);
      }
export type CleanupExpiredInvitationsMutationHookResult = ReturnType<typeof useCleanupExpiredInvitationsMutation>;
export type CleanupExpiredInvitationsMutationResult = Apollo.MutationResult<CleanupExpiredInvitationsMutation>;
export type CleanupExpiredInvitationsMutationOptions = Apollo.BaseMutationOptions<CleanupExpiredInvitationsMutation, CleanupExpiredInvitationsMutationVariables>;
export const CreateCustomerDocument = gql`
    mutation CreateCustomer($input: CreateUserInput!) {
  createCustomer(input: $input) {
    token
    user {
      id
      email
      firstName
      lastName
      role
      phone
      emailVerified
      emailVerifiedAt
      accountStatus
      createdAt
      updatedAt
    }
    message
    success
  }
}
    `;
export type CreateCustomerMutationFn = Apollo.MutationFunction<CreateCustomerMutation, CreateCustomerMutationVariables>;

/**
 * __useCreateCustomerMutation__
 *
 * To run a mutation, you first call `useCreateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerMutation, { data, loading, error }] = useCreateCustomerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCustomerMutation, CreateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateCustomerMutation, CreateCustomerMutationVariables>(CreateCustomerDocument, options);
      }
export type CreateCustomerMutationHookResult = ReturnType<typeof useCreateCustomerMutation>;
export type CreateCustomerMutationResult = Apollo.MutationResult<CreateCustomerMutation>;
export type CreateCustomerMutationOptions = Apollo.BaseMutationOptions<CreateCustomerMutation, CreateCustomerMutationVariables>;
export const CreateStaffDocument = gql`
    mutation CreateStaff($input: CreateUserInput!) {
  createStaff(input: $input) {
    token
    user {
      id
      email
      firstName
      lastName
      role
      phone
      addresses {
        id
        street
        city
        state
        zipCode
        country
        isDefault
        label
      }
      defaultAddress {
        id
        street
        city
        state
        zipCode
        country
        isDefault
        label
      }
      emailVerified
      emailVerifiedAt
      accountStatus
      createdAt
      updatedAt
    }
    message
    success
  }
}
    `;
export type CreateStaffMutationFn = Apollo.MutationFunction<CreateStaffMutation, CreateStaffMutationVariables>;

/**
 * __useCreateStaffMutation__
 *
 * To run a mutation, you first call `useCreateStaffMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStaffMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStaffMutation, { data, loading, error }] = useCreateStaffMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStaffMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateStaffMutation, CreateStaffMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateStaffMutation, CreateStaffMutationVariables>(CreateStaffDocument, options);
      }
export type CreateStaffMutationHookResult = ReturnType<typeof useCreateStaffMutation>;
export type CreateStaffMutationResult = Apollo.MutationResult<CreateStaffMutation>;
export type CreateStaffMutationOptions = Apollo.BaseMutationOptions<CreateStaffMutation, CreateStaffMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: CreateUserInput!) {
  register(input: $input) {
    message
    token
    user {
      id
      email
      firstName
      lastName
      role
      emailVerified
      accountStatus
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
export const SendVerificationEmailDocument = gql`
    mutation SendVerificationEmail($email: String!) {
  sendVerificationEmail(email: $email)
}
    `;
export type SendVerificationEmailMutationFn = Apollo.MutationFunction<SendVerificationEmailMutation, SendVerificationEmailMutationVariables>;

/**
 * __useSendVerificationEmailMutation__
 *
 * To run a mutation, you first call `useSendVerificationEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendVerificationEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendVerificationEmailMutation, { data, loading, error }] = useSendVerificationEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendVerificationEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendVerificationEmailMutation, SendVerificationEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SendVerificationEmailMutation, SendVerificationEmailMutationVariables>(SendVerificationEmailDocument, options);
      }
export type SendVerificationEmailMutationHookResult = ReturnType<typeof useSendVerificationEmailMutation>;
export type SendVerificationEmailMutationResult = Apollo.MutationResult<SendVerificationEmailMutation>;
export type SendVerificationEmailMutationOptions = Apollo.BaseMutationOptions<SendVerificationEmailMutation, SendVerificationEmailMutationVariables>;
export const VerifyEmailDocument = gql`
    mutation VerifyEmail($token: String!) {
  verifyEmail(token: $token) {
    message
    token
    user {
      id
      email
      firstName
      lastName
      role
      emailVerified
      accountStatus
    }
  }
}
    `;
export type VerifyEmailMutationFn = Apollo.MutationFunction<VerifyEmailMutation, VerifyEmailMutationVariables>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyEmailMutation, VerifyEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument, options);
      }
export type VerifyEmailMutationHookResult = ReturnType<typeof useVerifyEmailMutation>;
export type VerifyEmailMutationResult = Apollo.MutationResult<VerifyEmailMutation>;
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const UpdateAccountStatusDocument = gql`
    mutation UpdateAccountStatus($userId: ID!, $status: AccountStatus!, $reason: String) {
  updateAccountStatus(userId: $userId, status: $status, reason: $reason)
}
    `;
export type UpdateAccountStatusMutationFn = Apollo.MutationFunction<UpdateAccountStatusMutation, UpdateAccountStatusMutationVariables>;

/**
 * __useUpdateAccountStatusMutation__
 *
 * To run a mutation, you first call `useUpdateAccountStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountStatusMutation, { data, loading, error }] = useUpdateAccountStatusMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      status: // value for 'status'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useUpdateAccountStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateAccountStatusMutation, UpdateAccountStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateAccountStatusMutation, UpdateAccountStatusMutationVariables>(UpdateAccountStatusDocument, options);
      }
export type UpdateAccountStatusMutationHookResult = ReturnType<typeof useUpdateAccountStatusMutation>;
export type UpdateAccountStatusMutationResult = Apollo.MutationResult<UpdateAccountStatusMutation>;
export type UpdateAccountStatusMutationOptions = Apollo.BaseMutationOptions<UpdateAccountStatusMutation, UpdateAccountStatusMutationVariables>;
export const AddAddressDocument = gql`
    mutation AddAddress($input: AddressInput!) {
  addAddress(input: $input)
}
    `;
export type AddAddressMutationFn = Apollo.MutationFunction<AddAddressMutation, AddAddressMutationVariables>;

/**
 * __useAddAddressMutation__
 *
 * To run a mutation, you first call `useAddAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAddressMutation, { data, loading, error }] = useAddAddressMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddAddressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddAddressMutation, AddAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AddAddressMutation, AddAddressMutationVariables>(AddAddressDocument, options);
      }
export type AddAddressMutationHookResult = ReturnType<typeof useAddAddressMutation>;
export type AddAddressMutationResult = Apollo.MutationResult<AddAddressMutation>;
export type AddAddressMutationOptions = Apollo.BaseMutationOptions<AddAddressMutation, AddAddressMutationVariables>;
export const SetDefaultAddressDocument = gql`
    mutation SetDefaultAddress($addressId: ID!) {
  setDefaultAddress(addressId: $addressId)
}
    `;
export type SetDefaultAddressMutationFn = Apollo.MutationFunction<SetDefaultAddressMutation, SetDefaultAddressMutationVariables>;

/**
 * __useSetDefaultAddressMutation__
 *
 * To run a mutation, you first call `useSetDefaultAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDefaultAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDefaultAddressMutation, { data, loading, error }] = useSetDefaultAddressMutation({
 *   variables: {
 *      addressId: // value for 'addressId'
 *   },
 * });
 */
export function useSetDefaultAddressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetDefaultAddressMutation, SetDefaultAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SetDefaultAddressMutation, SetDefaultAddressMutationVariables>(SetDefaultAddressDocument, options);
      }
export type SetDefaultAddressMutationHookResult = ReturnType<typeof useSetDefaultAddressMutation>;
export type SetDefaultAddressMutationResult = Apollo.MutationResult<SetDefaultAddressMutation>;
export type SetDefaultAddressMutationOptions = Apollo.BaseMutationOptions<SetDefaultAddressMutation, SetDefaultAddressMutationVariables>;
export const UpdateAddressDocument = gql`
    mutation UpdateAddress($addressId: ID!, $input: AddressInput!) {
  updateAddress(addressId: $addressId, input: $input)
}
    `;
export type UpdateAddressMutationFn = Apollo.MutationFunction<UpdateAddressMutation, UpdateAddressMutationVariables>;

/**
 * __useUpdateAddressMutation__
 *
 * To run a mutation, you first call `useUpdateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAddressMutation, { data, loading, error }] = useUpdateAddressMutation({
 *   variables: {
 *      addressId: // value for 'addressId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAddressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateAddressMutation, UpdateAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateAddressMutation, UpdateAddressMutationVariables>(UpdateAddressDocument, options);
      }
export type UpdateAddressMutationHookResult = ReturnType<typeof useUpdateAddressMutation>;
export type UpdateAddressMutationResult = Apollo.MutationResult<UpdateAddressMutation>;
export type UpdateAddressMutationOptions = Apollo.BaseMutationOptions<UpdateAddressMutation, UpdateAddressMutationVariables>;
export const RemoveAddressDocument = gql`
    mutation RemoveAddress($addressId: ID!) {
  removeAddress(addressId: $addressId)
}
    `;
export type RemoveAddressMutationFn = Apollo.MutationFunction<RemoveAddressMutation, RemoveAddressMutationVariables>;

/**
 * __useRemoveAddressMutation__
 *
 * To run a mutation, you first call `useRemoveAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAddressMutation, { data, loading, error }] = useRemoveAddressMutation({
 *   variables: {
 *      addressId: // value for 'addressId'
 *   },
 * });
 */
export function useRemoveAddressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveAddressMutation, RemoveAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveAddressMutation, RemoveAddressMutationVariables>(RemoveAddressDocument, options);
      }
export type RemoveAddressMutationHookResult = ReturnType<typeof useRemoveAddressMutation>;
export type RemoveAddressMutationResult = Apollo.MutationResult<RemoveAddressMutation>;
export type RemoveAddressMutationOptions = Apollo.BaseMutationOptions<RemoveAddressMutation, RemoveAddressMutationVariables>;
export const UpdateBookingPaymentStatusDocument = gql`
    mutation UpdateBookingPaymentStatus($updateBookingPaymentStatusId: ID!, $paymentStatus: PaymentStatus!) {
  updateBookingPaymentStatus(
    id: $updateBookingPaymentStatusId
    paymentStatus: $paymentStatus
  )
}
    `;
export type UpdateBookingPaymentStatusMutationFn = Apollo.MutationFunction<UpdateBookingPaymentStatusMutation, UpdateBookingPaymentStatusMutationVariables>;

/**
 * __useUpdateBookingPaymentStatusMutation__
 *
 * To run a mutation, you first call `useUpdateBookingPaymentStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookingPaymentStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookingPaymentStatusMutation, { data, loading, error }] = useUpdateBookingPaymentStatusMutation({
 *   variables: {
 *      updateBookingPaymentStatusId: // value for 'updateBookingPaymentStatusId'
 *      paymentStatus: // value for 'paymentStatus'
 *   },
 * });
 */
export function useUpdateBookingPaymentStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateBookingPaymentStatusMutation, UpdateBookingPaymentStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateBookingPaymentStatusMutation, UpdateBookingPaymentStatusMutationVariables>(UpdateBookingPaymentStatusDocument, options);
      }
export type UpdateBookingPaymentStatusMutationHookResult = ReturnType<typeof useUpdateBookingPaymentStatusMutation>;
export type UpdateBookingPaymentStatusMutationResult = Apollo.MutationResult<UpdateBookingPaymentStatusMutation>;
export type UpdateBookingPaymentStatusMutationOptions = Apollo.BaseMutationOptions<UpdateBookingPaymentStatusMutation, UpdateBookingPaymentStatusMutationVariables>;
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
  updateBooking(id: $id, input: $input)
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
    mutation CancelBooking($cancelBookingId: ID!, $cancellationReason: String) {
  cancelBooking(id: $cancelBookingId, cancellationReason: $cancellationReason)
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
 *      cancelBookingId: // value for 'cancelBookingId'
 *      cancellationReason: // value for 'cancellationReason'
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
  completeBooking(id: $id)
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
export const DeleteBookingDocument = gql`
    mutation DeleteBooking($id: ID!) {
  deleteBooking(id: $id)
}
    `;
export type DeleteBookingMutationFn = Apollo.MutationFunction<DeleteBookingMutation, DeleteBookingMutationVariables>;

/**
 * __useDeleteBookingMutation__
 *
 * To run a mutation, you first call `useDeleteBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookingMutation, { data, loading, error }] = useDeleteBookingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBookingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteBookingMutation, DeleteBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteBookingMutation, DeleteBookingMutationVariables>(DeleteBookingDocument, options);
      }
export type DeleteBookingMutationHookResult = ReturnType<typeof useDeleteBookingMutation>;
export type DeleteBookingMutationResult = Apollo.MutationResult<DeleteBookingMutation>;
export type DeleteBookingMutationOptions = Apollo.BaseMutationOptions<DeleteBookingMutation, DeleteBookingMutationVariables>;
export const AssignStaffDocument = gql`
    mutation AssignStaff($bookingId: ID!, $staffId: ID!) {
  assignStaff(bookingId: $bookingId, staffId: $staffId)
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
  updateBookingStatus(id: $id, status: $status)
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
export const RescheduleBookingDocument = gql`
    mutation RescheduleBooking($id: ID!, $newDate: DateTime!, $newTimeSlot: TimeSlot!) {
  rescheduleBooking(id: $id, newDate: $newDate, newTimeSlot: $newTimeSlot)
}
    `;
export type RescheduleBookingMutationFn = Apollo.MutationFunction<RescheduleBookingMutation, RescheduleBookingMutationVariables>;

/**
 * __useRescheduleBookingMutation__
 *
 * To run a mutation, you first call `useRescheduleBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRescheduleBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rescheduleBookingMutation, { data, loading, error }] = useRescheduleBookingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      newDate: // value for 'newDate'
 *      newTimeSlot: // value for 'newTimeSlot'
 *   },
 * });
 */
export function useRescheduleBookingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RescheduleBookingMutation, RescheduleBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RescheduleBookingMutation, RescheduleBookingMutationVariables>(RescheduleBookingDocument, options);
      }
export type RescheduleBookingMutationHookResult = ReturnType<typeof useRescheduleBookingMutation>;
export type RescheduleBookingMutationResult = Apollo.MutationResult<RescheduleBookingMutation>;
export type RescheduleBookingMutationOptions = Apollo.BaseMutationOptions<RescheduleBookingMutation, RescheduleBookingMutationVariables>;
export const AddBookingFeedbackDocument = gql`
    mutation AddBookingFeedback($addBookingFeedbackId: ID!, $feedback: FeedbackInput!) {
  addBookingFeedback(id: $addBookingFeedbackId, feedback: $feedback)
}
    `;
export type AddBookingFeedbackMutationFn = Apollo.MutationFunction<AddBookingFeedbackMutation, AddBookingFeedbackMutationVariables>;

/**
 * __useAddBookingFeedbackMutation__
 *
 * To run a mutation, you first call `useAddBookingFeedbackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBookingFeedbackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBookingFeedbackMutation, { data, loading, error }] = useAddBookingFeedbackMutation({
 *   variables: {
 *      addBookingFeedbackId: // value for 'addBookingFeedbackId'
 *      feedback: // value for 'feedback'
 *   },
 * });
 */
export function useAddBookingFeedbackMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddBookingFeedbackMutation, AddBookingFeedbackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AddBookingFeedbackMutation, AddBookingFeedbackMutationVariables>(AddBookingFeedbackDocument, options);
      }
export type AddBookingFeedbackMutationHookResult = ReturnType<typeof useAddBookingFeedbackMutation>;
export type AddBookingFeedbackMutationResult = Apollo.MutationResult<AddBookingFeedbackMutation>;
export type AddBookingFeedbackMutationOptions = Apollo.BaseMutationOptions<AddBookingFeedbackMutation, AddBookingFeedbackMutationVariables>;
export const CreateNotificationDocument = gql`
    mutation CreateNotification($input: CreateNotificationInput!) {
  createNotification(input: $input) {
    id
    user {
      id
      email
      firstName
      lastName
      role
      emailVerified
      emailVerifiedAt
      accountStatus
    }
    type
    priority
    title
    message
    data
    isRead
    createdAt
  }
}
    `;
export type CreateNotificationMutationFn = Apollo.MutationFunction<CreateNotificationMutation, CreateNotificationMutationVariables>;

/**
 * __useCreateNotificationMutation__
 *
 * To run a mutation, you first call `useCreateNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNotificationMutation, { data, loading, error }] = useCreateNotificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNotificationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateNotificationMutation, CreateNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateNotificationMutation, CreateNotificationMutationVariables>(CreateNotificationDocument, options);
      }
export type CreateNotificationMutationHookResult = ReturnType<typeof useCreateNotificationMutation>;
export type CreateNotificationMutationResult = Apollo.MutationResult<CreateNotificationMutation>;
export type CreateNotificationMutationOptions = Apollo.BaseMutationOptions<CreateNotificationMutation, CreateNotificationMutationVariables>;
export const MarkNotificationAsReadDocument = gql`
    mutation MarkNotificationAsRead($id: ID!) {
  markNotificationAsRead(id: $id) {
    id
    isRead
    readAt
  }
}
    `;
export type MarkNotificationAsReadMutationFn = Apollo.MutationFunction<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;

/**
 * __useMarkNotificationAsReadMutation__
 *
 * To run a mutation, you first call `useMarkNotificationAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkNotificationAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markNotificationAsReadMutation, { data, loading, error }] = useMarkNotificationAsReadMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkNotificationAsReadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>(MarkNotificationAsReadDocument, options);
      }
export type MarkNotificationAsReadMutationHookResult = ReturnType<typeof useMarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationResult = Apollo.MutationResult<MarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationOptions = Apollo.BaseMutationOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;
export const MarkNotificationsAsReadDocument = gql`
    mutation MarkNotificationsAsRead($ids: [ID!]!) {
  markNotificationsAsRead(ids: $ids)
}
    `;
export type MarkNotificationsAsReadMutationFn = Apollo.MutationFunction<MarkNotificationsAsReadMutation, MarkNotificationsAsReadMutationVariables>;

/**
 * __useMarkNotificationsAsReadMutation__
 *
 * To run a mutation, you first call `useMarkNotificationsAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkNotificationsAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markNotificationsAsReadMutation, { data, loading, error }] = useMarkNotificationsAsReadMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useMarkNotificationsAsReadMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MarkNotificationsAsReadMutation, MarkNotificationsAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<MarkNotificationsAsReadMutation, MarkNotificationsAsReadMutationVariables>(MarkNotificationsAsReadDocument, options);
      }
export type MarkNotificationsAsReadMutationHookResult = ReturnType<typeof useMarkNotificationsAsReadMutation>;
export type MarkNotificationsAsReadMutationResult = Apollo.MutationResult<MarkNotificationsAsReadMutation>;
export type MarkNotificationsAsReadMutationOptions = Apollo.BaseMutationOptions<MarkNotificationsAsReadMutation, MarkNotificationsAsReadMutationVariables>;
export const DeleteNotificationDocument = gql`
    mutation DeleteNotification($id: ID!) {
  deleteNotification(id: $id)
}
    `;
export type DeleteNotificationMutationFn = Apollo.MutationFunction<DeleteNotificationMutation, DeleteNotificationMutationVariables>;

/**
 * __useDeleteNotificationMutation__
 *
 * To run a mutation, you first call `useDeleteNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNotificationMutation, { data, loading, error }] = useDeleteNotificationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteNotificationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteNotificationMutation, DeleteNotificationMutationVariables>(DeleteNotificationDocument, options);
      }
export type DeleteNotificationMutationHookResult = ReturnType<typeof useDeleteNotificationMutation>;
export type DeleteNotificationMutationResult = Apollo.MutationResult<DeleteNotificationMutation>;
export type DeleteNotificationMutationOptions = Apollo.BaseMutationOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export const BroadcastNotificationDocument = gql`
    mutation BroadcastNotification($input: BroadcastNotificationInput!) {
  broadcastNotification(input: $input)
}
    `;
export type BroadcastNotificationMutationFn = Apollo.MutationFunction<BroadcastNotificationMutation, BroadcastNotificationMutationVariables>;

/**
 * __useBroadcastNotificationMutation__
 *
 * To run a mutation, you first call `useBroadcastNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBroadcastNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [broadcastNotificationMutation, { data, loading, error }] = useBroadcastNotificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBroadcastNotificationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<BroadcastNotificationMutation, BroadcastNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<BroadcastNotificationMutation, BroadcastNotificationMutationVariables>(BroadcastNotificationDocument, options);
      }
export type BroadcastNotificationMutationHookResult = ReturnType<typeof useBroadcastNotificationMutation>;
export type BroadcastNotificationMutationResult = Apollo.MutationResult<BroadcastNotificationMutation>;
export type BroadcastNotificationMutationOptions = Apollo.BaseMutationOptions<BroadcastNotificationMutation, BroadcastNotificationMutationVariables>;
export const SendNotificationToRoleDocument = gql`
    mutation SendNotificationToRole($role: UserRole!, $input: BroadcastNotificationInput!) {
  sendNotificationToRole(role: $role, input: $input)
}
    `;
export type SendNotificationToRoleMutationFn = Apollo.MutationFunction<SendNotificationToRoleMutation, SendNotificationToRoleMutationVariables>;

/**
 * __useSendNotificationToRoleMutation__
 *
 * To run a mutation, you first call `useSendNotificationToRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendNotificationToRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendNotificationToRoleMutation, { data, loading, error }] = useSendNotificationToRoleMutation({
 *   variables: {
 *      role: // value for 'role'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendNotificationToRoleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendNotificationToRoleMutation, SendNotificationToRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SendNotificationToRoleMutation, SendNotificationToRoleMutationVariables>(SendNotificationToRoleDocument, options);
      }
export type SendNotificationToRoleMutationHookResult = ReturnType<typeof useSendNotificationToRoleMutation>;
export type SendNotificationToRoleMutationResult = Apollo.MutationResult<SendNotificationToRoleMutation>;
export type SendNotificationToRoleMutationOptions = Apollo.BaseMutationOptions<SendNotificationToRoleMutation, SendNotificationToRoleMutationVariables>;
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
    success
    subscriptionId
    billingId
    requiresPayment
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
  updateSubscription(id: $id, input: $input)
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
  cancelSubscription(id: $id)
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
export const PauseSubscriptionDocument = gql`
    mutation PauseSubscription($pauseSubscriptionId: ID!) {
  pauseSubscription(id: $pauseSubscriptionId)
}
    `;
export type PauseSubscriptionMutationFn = Apollo.MutationFunction<PauseSubscriptionMutation, PauseSubscriptionMutationVariables>;

/**
 * __usePauseSubscriptionMutation__
 *
 * To run a mutation, you first call `usePauseSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePauseSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pauseSubscriptionMutation, { data, loading, error }] = usePauseSubscriptionMutation({
 *   variables: {
 *      pauseSubscriptionId: // value for 'pauseSubscriptionId'
 *   },
 * });
 */
export function usePauseSubscriptionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PauseSubscriptionMutation, PauseSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<PauseSubscriptionMutation, PauseSubscriptionMutationVariables>(PauseSubscriptionDocument, options);
      }
export type PauseSubscriptionMutationHookResult = ReturnType<typeof usePauseSubscriptionMutation>;
export type PauseSubscriptionMutationResult = Apollo.MutationResult<PauseSubscriptionMutation>;
export type PauseSubscriptionMutationOptions = Apollo.BaseMutationOptions<PauseSubscriptionMutation, PauseSubscriptionMutationVariables>;
export const ResumeSubscriptionDocument = gql`
    mutation ResumeSubscription($resumeSubscriptionId: ID!) {
  resumeSubscription(id: $resumeSubscriptionId)
}
    `;
export type ResumeSubscriptionMutationFn = Apollo.MutationFunction<ResumeSubscriptionMutation, ResumeSubscriptionMutationVariables>;

/**
 * __useResumeSubscriptionMutation__
 *
 * To run a mutation, you first call `useResumeSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResumeSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resumeSubscriptionMutation, { data, loading, error }] = useResumeSubscriptionMutation({
 *   variables: {
 *      resumeSubscriptionId: // value for 'resumeSubscriptionId'
 *   },
 * });
 */
export function useResumeSubscriptionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResumeSubscriptionMutation, ResumeSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ResumeSubscriptionMutation, ResumeSubscriptionMutationVariables>(ResumeSubscriptionDocument, options);
      }
export type ResumeSubscriptionMutationHookResult = ReturnType<typeof useResumeSubscriptionMutation>;
export type ResumeSubscriptionMutationResult = Apollo.MutationResult<ResumeSubscriptionMutation>;
export type ResumeSubscriptionMutationOptions = Apollo.BaseMutationOptions<ResumeSubscriptionMutation, ResumeSubscriptionMutationVariables>;
export const UpdateSubscriptionStatusDocument = gql`
    mutation UpdateSubscriptionStatus($updateSubscriptionStatusId: ID!, $status: SubscriptionStatus!) {
  updateSubscriptionStatus(id: $updateSubscriptionStatusId, status: $status)
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
 *      updateSubscriptionStatusId: // value for 'updateSubscriptionStatusId'
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
export const AddServiceToSubscriptionDocument = gql`
    mutation AddServiceToSubscription($subscriptionId: ID!, $service: SubscriptionServiceInput!) {
  addServiceToSubscription(subscriptionId: $subscriptionId, service: $service)
}
    `;
export type AddServiceToSubscriptionMutationFn = Apollo.MutationFunction<AddServiceToSubscriptionMutation, AddServiceToSubscriptionMutationVariables>;

/**
 * __useAddServiceToSubscriptionMutation__
 *
 * To run a mutation, you first call `useAddServiceToSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddServiceToSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addServiceToSubscriptionMutation, { data, loading, error }] = useAddServiceToSubscriptionMutation({
 *   variables: {
 *      subscriptionId: // value for 'subscriptionId'
 *      service: // value for 'service'
 *   },
 * });
 */
export function useAddServiceToSubscriptionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddServiceToSubscriptionMutation, AddServiceToSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AddServiceToSubscriptionMutation, AddServiceToSubscriptionMutationVariables>(AddServiceToSubscriptionDocument, options);
      }
export type AddServiceToSubscriptionMutationHookResult = ReturnType<typeof useAddServiceToSubscriptionMutation>;
export type AddServiceToSubscriptionMutationResult = Apollo.MutationResult<AddServiceToSubscriptionMutation>;
export type AddServiceToSubscriptionMutationOptions = Apollo.BaseMutationOptions<AddServiceToSubscriptionMutation, AddServiceToSubscriptionMutationVariables>;
export const RemoveServiceFromSubscriptionDocument = gql`
    mutation RemoveServiceFromSubscription($subscriptionId: ID!, $subscriptionServiceId: ID!) {
  removeServiceFromSubscription(
    subscriptionId: $subscriptionId
    subscriptionServiceId: $subscriptionServiceId
  )
}
    `;
export type RemoveServiceFromSubscriptionMutationFn = Apollo.MutationFunction<RemoveServiceFromSubscriptionMutation, RemoveServiceFromSubscriptionMutationVariables>;

/**
 * __useRemoveServiceFromSubscriptionMutation__
 *
 * To run a mutation, you first call `useRemoveServiceFromSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveServiceFromSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeServiceFromSubscriptionMutation, { data, loading, error }] = useRemoveServiceFromSubscriptionMutation({
 *   variables: {
 *      subscriptionId: // value for 'subscriptionId'
 *      subscriptionServiceId: // value for 'subscriptionServiceId'
 *   },
 * });
 */
export function useRemoveServiceFromSubscriptionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveServiceFromSubscriptionMutation, RemoveServiceFromSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveServiceFromSubscriptionMutation, RemoveServiceFromSubscriptionMutationVariables>(RemoveServiceFromSubscriptionDocument, options);
      }
export type RemoveServiceFromSubscriptionMutationHookResult = ReturnType<typeof useRemoveServiceFromSubscriptionMutation>;
export type RemoveServiceFromSubscriptionMutationResult = Apollo.MutationResult<RemoveServiceFromSubscriptionMutation>;
export type RemoveServiceFromSubscriptionMutationOptions = Apollo.BaseMutationOptions<RemoveServiceFromSubscriptionMutation, RemoveServiceFromSubscriptionMutationVariables>;
export const UpdateSubscriptionServiceDocument = gql`
    mutation UpdateSubscriptionService($subscriptionId: ID!, $subscriptionServiceId: ID!, $input: UpdateSubscriptionServiceInput!) {
  updateSubscriptionService(
    subscriptionId: $subscriptionId
    subscriptionServiceId: $subscriptionServiceId
    input: $input
  )
}
    `;
export type UpdateSubscriptionServiceMutationFn = Apollo.MutationFunction<UpdateSubscriptionServiceMutation, UpdateSubscriptionServiceMutationVariables>;

/**
 * __useUpdateSubscriptionServiceMutation__
 *
 * To run a mutation, you first call `useUpdateSubscriptionServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubscriptionServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubscriptionServiceMutation, { data, loading, error }] = useUpdateSubscriptionServiceMutation({
 *   variables: {
 *      subscriptionId: // value for 'subscriptionId'
 *      subscriptionServiceId: // value for 'subscriptionServiceId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSubscriptionServiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateSubscriptionServiceMutation, UpdateSubscriptionServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateSubscriptionServiceMutation, UpdateSubscriptionServiceMutationVariables>(UpdateSubscriptionServiceDocument, options);
      }
export type UpdateSubscriptionServiceMutationHookResult = ReturnType<typeof useUpdateSubscriptionServiceMutation>;
export type UpdateSubscriptionServiceMutationResult = Apollo.MutationResult<UpdateSubscriptionServiceMutation>;
export type UpdateSubscriptionServiceMutationOptions = Apollo.BaseMutationOptions<UpdateSubscriptionServiceMutation, UpdateSubscriptionServiceMutationVariables>;
export const ReactivateSubscriptionDocument = gql`
    mutation ReactivateSubscription($reactivateSubscriptionId: ID!) {
  reactivateSubscription(id: $reactivateSubscriptionId)
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
 *      reactivateSubscriptionId: // value for 'reactivateSubscriptionId'
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
export const PendingAdminInvitationsDocument = gql`
    query PendingAdminInvitations {
  pendingAdminInvitations {
    id
    email
    firstName
    lastName
    role
    invitedBy {
      id
      email
      firstName
      lastName
      role
      phone
      emailVerified
      emailVerifiedAt
      accountStatus
      createdAt
      updatedAt
    }
    invitedByName
    invitationToken
    expiresAt
    isUsed
    usedAt
    createdAt
    permissions
  }
}
    `;

/**
 * __usePendingAdminInvitationsQuery__
 *
 * To run a query within a React component, call `usePendingAdminInvitationsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePendingAdminInvitationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePendingAdminInvitationsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePendingAdminInvitationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PendingAdminInvitationsQuery, PendingAdminInvitationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PendingAdminInvitationsQuery, PendingAdminInvitationsQueryVariables>(PendingAdminInvitationsDocument, options);
      }
export function usePendingAdminInvitationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PendingAdminInvitationsQuery, PendingAdminInvitationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PendingAdminInvitationsQuery, PendingAdminInvitationsQueryVariables>(PendingAdminInvitationsDocument, options);
        }
export function usePendingAdminInvitationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PendingAdminInvitationsQuery, PendingAdminInvitationsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<PendingAdminInvitationsQuery, PendingAdminInvitationsQueryVariables>(PendingAdminInvitationsDocument, options);
        }
export type PendingAdminInvitationsQueryHookResult = ReturnType<typeof usePendingAdminInvitationsQuery>;
export type PendingAdminInvitationsLazyQueryHookResult = ReturnType<typeof usePendingAdminInvitationsLazyQuery>;
export type PendingAdminInvitationsSuspenseQueryHookResult = ReturnType<typeof usePendingAdminInvitationsSuspenseQuery>;
export type PendingAdminInvitationsQueryResult = Apollo.QueryResult<PendingAdminInvitationsQuery, PendingAdminInvitationsQueryVariables>;
export const AdminInvitationDocument = gql`
    query AdminInvitation($token: String!) {
  adminInvitation(token: $token) {
    id
    email
    firstName
    lastName
    role
    invitedBy {
      id
      email
      firstName
      lastName
      role
      phone
      emailVerified
      emailVerifiedAt
      accountStatus
      createdAt
      updatedAt
    }
    invitedByName
    invitationToken
    expiresAt
    isUsed
    usedAt
    createdAt
    permissions
  }
}
    `;

/**
 * __useAdminInvitationQuery__
 *
 * To run a query within a React component, call `useAdminInvitationQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminInvitationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminInvitationQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useAdminInvitationQuery(baseOptions: ApolloReactHooks.QueryHookOptions<AdminInvitationQuery, AdminInvitationQueryVariables> & ({ variables: AdminInvitationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminInvitationQuery, AdminInvitationQueryVariables>(AdminInvitationDocument, options);
      }
export function useAdminInvitationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminInvitationQuery, AdminInvitationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminInvitationQuery, AdminInvitationQueryVariables>(AdminInvitationDocument, options);
        }
export function useAdminInvitationSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminInvitationQuery, AdminInvitationQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminInvitationQuery, AdminInvitationQueryVariables>(AdminInvitationDocument, options);
        }
export type AdminInvitationQueryHookResult = ReturnType<typeof useAdminInvitationQuery>;
export type AdminInvitationLazyQueryHookResult = ReturnType<typeof useAdminInvitationLazyQuery>;
export type AdminInvitationSuspenseQueryHookResult = ReturnType<typeof useAdminInvitationSuspenseQuery>;
export type AdminInvitationQueryResult = Apollo.QueryResult<AdminInvitationQuery, AdminInvitationQueryVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  me {
    id
    email
    firstName
    lastName
    role
    phone
    defaultAddress {
      street
      city
      state
      zipCode
      country
      id
      isDefault
      label
    }
    addresses {
      id
      street
      city
      state
      zipCode
      country
      isDefault
      label
    }
    emailVerified
    emailVerifiedAt
    accountStatus
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
    defaultAddress {
      street
      city
      state
      zipCode
      country
      id
      isDefault
      label
    }
    addresses {
      id
      street
      city
      state
      zipCode
      country
      isDefault
      label
    }
    emailVerified
    emailVerifiedAt
    accountStatus
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
    defaultAddress {
      street
      city
      state
      zipCode
      country
      id
      isDefault
      label
    }
    addresses {
      id
      street
      city
      state
      zipCode
      country
      isDefault
      label
    }
    emailVerified
    emailVerifiedAt
    accountStatus
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
export const GetSubscriptionBillingsDocument = gql`
    query GetSubscriptionBillings($subscriptionId: ID!) {
  subscriptionBillings(subscriptionId: $subscriptionId) {
    id
    amount
    status
    billingDate
    paymentDate
    description
    cancellationDate
    cancellationReason
    createdAt
    updatedAt
    periodStartDate
    periodEndDate
    paystackReference
    payment {
      id
      amount
      currency
      status
      refundAmount
      refundReason
      metadata
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetSubscriptionBillingsQuery__
 *
 * To run a query within a React component, call `useGetSubscriptionBillingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubscriptionBillingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubscriptionBillingsQuery({
 *   variables: {
 *      subscriptionId: // value for 'subscriptionId'
 *   },
 * });
 */
export function useGetSubscriptionBillingsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetSubscriptionBillingsQuery, GetSubscriptionBillingsQueryVariables> & ({ variables: GetSubscriptionBillingsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetSubscriptionBillingsQuery, GetSubscriptionBillingsQueryVariables>(GetSubscriptionBillingsDocument, options);
      }
export function useGetSubscriptionBillingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSubscriptionBillingsQuery, GetSubscriptionBillingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetSubscriptionBillingsQuery, GetSubscriptionBillingsQueryVariables>(GetSubscriptionBillingsDocument, options);
        }
export function useGetSubscriptionBillingsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetSubscriptionBillingsQuery, GetSubscriptionBillingsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetSubscriptionBillingsQuery, GetSubscriptionBillingsQueryVariables>(GetSubscriptionBillingsDocument, options);
        }
export type GetSubscriptionBillingsQueryHookResult = ReturnType<typeof useGetSubscriptionBillingsQuery>;
export type GetSubscriptionBillingsLazyQueryHookResult = ReturnType<typeof useGetSubscriptionBillingsLazyQuery>;
export type GetSubscriptionBillingsSuspenseQueryHookResult = ReturnType<typeof useGetSubscriptionBillingsSuspenseQuery>;
export type GetSubscriptionBillingsQueryResult = Apollo.QueryResult<GetSubscriptionBillingsQuery, GetSubscriptionBillingsQueryVariables>;
export const GetBillingStatsDocument = gql`
    query GetBillingStats($subscriptionId: ID!) {
  billingStats(subscriptionId: $subscriptionId) {
    total
    paid
    pending
    failed
    totalAmount
    paidAmount
  }
}
    `;

/**
 * __useGetBillingStatsQuery__
 *
 * To run a query within a React component, call `useGetBillingStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBillingStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBillingStatsQuery({
 *   variables: {
 *      subscriptionId: // value for 'subscriptionId'
 *   },
 * });
 */
export function useGetBillingStatsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetBillingStatsQuery, GetBillingStatsQueryVariables> & ({ variables: GetBillingStatsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetBillingStatsQuery, GetBillingStatsQueryVariables>(GetBillingStatsDocument, options);
      }
export function useGetBillingStatsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetBillingStatsQuery, GetBillingStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetBillingStatsQuery, GetBillingStatsQueryVariables>(GetBillingStatsDocument, options);
        }
export function useGetBillingStatsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetBillingStatsQuery, GetBillingStatsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetBillingStatsQuery, GetBillingStatsQueryVariables>(GetBillingStatsDocument, options);
        }
export type GetBillingStatsQueryHookResult = ReturnType<typeof useGetBillingStatsQuery>;
export type GetBillingStatsLazyQueryHookResult = ReturnType<typeof useGetBillingStatsLazyQuery>;
export type GetBillingStatsSuspenseQueryHookResult = ReturnType<typeof useGetBillingStatsSuspenseQuery>;
export type GetBillingStatsQueryResult = Apollo.QueryResult<GetBillingStatsQuery, GetBillingStatsQueryVariables>;
export const GetUserBillingsDocument = gql`
    query GetUserBillings {
  userBillings {
    id
    amount
    status
    billingDate
    paymentDate
    description
    cancellationDate
    cancellationReason
    createdAt
    updatedAt
    periodStartDate
    periodEndDate
    paystackReference
    payment {
      id
      amount
      currency
      status
      refundAmount
      refundReason
      metadata
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetUserBillingsQuery__
 *
 * To run a query within a React component, call `useGetUserBillingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserBillingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserBillingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserBillingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserBillingsQuery, GetUserBillingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserBillingsQuery, GetUserBillingsQueryVariables>(GetUserBillingsDocument, options);
      }
export function useGetUserBillingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserBillingsQuery, GetUserBillingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserBillingsQuery, GetUserBillingsQueryVariables>(GetUserBillingsDocument, options);
        }
export function useGetUserBillingsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetUserBillingsQuery, GetUserBillingsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetUserBillingsQuery, GetUserBillingsQueryVariables>(GetUserBillingsDocument, options);
        }
export type GetUserBillingsQueryHookResult = ReturnType<typeof useGetUserBillingsQuery>;
export type GetUserBillingsLazyQueryHookResult = ReturnType<typeof useGetUserBillingsLazyQuery>;
export type GetUserBillingsSuspenseQueryHookResult = ReturnType<typeof useGetUserBillingsSuspenseQuery>;
export type GetUserBillingsQueryResult = Apollo.QueryResult<GetUserBillingsQuery, GetUserBillingsQueryVariables>;
export const GetBookingsDocument = gql`
    query GetBookings($status: BookingStatus) {
  bookings(status: $status) {
    id
    totalPrice
    paymentStatus
    createdAt
    updatedAt
    service_category
    serviceOption
    date
    timeSlot
    status
    notes
    recurring
    cancellationDate
    cancellationReason
    resumeDate
    pauseDate
    recurringDiscount
    feedback {
      rating
      comment
    }
    customer {
      id
      email
      firstName
      lastName
      role
      phone
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
        imageUrl
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
    }
    address {
      id
      street
      city
      state
      zipCode
      country
      label
    }
    serviceDetails {
      serviceOption
      cleaning {
        cleaningType
        houseType
        rooms {
          bedroom
          livingRoom
          bathroom
          kitchen
          balcony
          studyRoom
          other
          lobby
          outdoor
        }
      }
      laundry {
        laundryType
        bags
        items {
          shirts
          pants
          dresses
          suits
          others
        }
      }
      pestControl {
        treatmentType
        areas
        severity
      }
      cooking {
        mealType
        mealsPerDelivery {
          day
          count
        }
      }
    }
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
    date
    timeSlot
    status
    notes
    totalPrice
    paymentStatus
    createdAt
    updatedAt
    service_category
    serviceOption
    recurring
    cancellationDate
    cancellationReason
    resumeDate
    pauseDate
    recurringDiscount
    feedback {
      rating
      comment
    }
    customer {
      id
      email
      firstName
      lastName
      role
      phone
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
        imageUrl
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
    }
    address {
      id
      street
      city
      state
      zipCode
      country
      label
    }
    serviceDetails {
      serviceOption
      cleaning {
        cleaningType
        houseType
        rooms {
          bedroom
          livingRoom
          bathroom
          kitchen
          balcony
          studyRoom
          other
          lobby
          outdoor
        }
      }
      laundry {
        laundryType
        bags
        items {
          shirts
          pants
          dresses
          suits
          others
        }
      }
      pestControl {
        treatmentType
        areas
        severity
      }
      cooking {
        mealType
        mealsPerDelivery {
          day
          count
        }
      }
    }
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
    date
    timeSlot
    status
    notes
    totalPrice
    paymentStatus
    createdAt
    updatedAt
    service_category
    serviceOption
    recurring
    cancellationDate
    cancellationReason
    resumeDate
    pauseDate
    recurringDiscount
    feedback {
      rating
      comment
    }
    customer {
      id
      email
      firstName
      lastName
      role
      phone
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
        imageUrl
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
    }
    address {
      id
      street
      city
      state
      zipCode
      country
      label
    }
    serviceDetails {
      serviceOption
      cleaning {
        cleaningType
        houseType
        rooms {
          bedroom
          livingRoom
          bathroom
          kitchen
          balcony
          studyRoom
          other
          lobby
          outdoor
        }
      }
      laundry {
        laundryType
        bags
        items {
          shirts
          pants
          dresses
          suits
          others
        }
      }
      pestControl {
        treatmentType
        areas
        severity
      }
      cooking {
        mealType
        mealsPerDelivery {
          day
          count
        }
      }
    }
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
        imageUrl
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
    }
    date
    timeSlot
    status
    notes
    address {
      id
      street
      city
      state
      zipCode
      country
      label
    }
    totalPrice
    paymentStatus
    createdAt
    updatedAt
    service_category
    serviceOption
    serviceDetails {
      cleaning {
        cleaningType
        houseType
        rooms {
          bedroom
          livingRoom
          bathroom
          kitchen
          balcony
          studyRoom
          other
          lobby
          outdoor
        }
      }
      laundry {
        laundryType
        bags
        items {
          shirts
          pants
          dresses
          suits
          others
        }
      }
      pestControl {
        treatmentType
        areas
        severity
      }
      cooking {
        mealType
        mealsPerDelivery {
          day
          count
        }
      }
    }
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
export const GetNotificationsDocument = gql`
    query GetNotifications($filters: NotificationFilters, $pagination: PaginationInput) {
  notifications(filters: $filters, pagination: $pagination) {
    notifications {
      id
      user {
        id
        email
        firstName
        lastName
        role
        emailVerified
        emailVerifiedAt
        accountStatus
      }
      type
      priority
      title
      message
      data
      isRead
      isDeleted
      readAt
      expiresAt
      createdAt
      updatedAt
    }
    total
    page
    totalPages
    hasNextPage
    hasPreviousPage
  }
}
    `;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a React component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetNotificationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
      }
export function useGetNotificationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export function useGetNotificationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export type GetNotificationsQueryHookResult = ReturnType<typeof useGetNotificationsQuery>;
export type GetNotificationsLazyQueryHookResult = ReturnType<typeof useGetNotificationsLazyQuery>;
export type GetNotificationsSuspenseQueryHookResult = ReturnType<typeof useGetNotificationsSuspenseQuery>;
export type GetNotificationsQueryResult = Apollo.QueryResult<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const GetNotificationByIdDocument = gql`
    query GetNotificationById($id: ID!) {
  notification(id: $id) {
    id
    user {
      id
      email
      firstName
      lastName
      role
      emailVerified
      emailVerifiedAt
      accountStatus
    }
    type
    priority
    title
    message
    data
    isRead
    isDeleted
    readAt
    expiresAt
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetNotificationByIdQuery__
 *
 * To run a query within a React component, call `useGetNotificationByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetNotificationByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetNotificationByIdQuery, GetNotificationByIdQueryVariables> & ({ variables: GetNotificationByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetNotificationByIdQuery, GetNotificationByIdQueryVariables>(GetNotificationByIdDocument, options);
      }
export function useGetNotificationByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetNotificationByIdQuery, GetNotificationByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetNotificationByIdQuery, GetNotificationByIdQueryVariables>(GetNotificationByIdDocument, options);
        }
export function useGetNotificationByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetNotificationByIdQuery, GetNotificationByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetNotificationByIdQuery, GetNotificationByIdQueryVariables>(GetNotificationByIdDocument, options);
        }
export type GetNotificationByIdQueryHookResult = ReturnType<typeof useGetNotificationByIdQuery>;
export type GetNotificationByIdLazyQueryHookResult = ReturnType<typeof useGetNotificationByIdLazyQuery>;
export type GetNotificationByIdSuspenseQueryHookResult = ReturnType<typeof useGetNotificationByIdSuspenseQuery>;
export type GetNotificationByIdQueryResult = Apollo.QueryResult<GetNotificationByIdQuery, GetNotificationByIdQueryVariables>;
export const GetUnreadNotificationCountDocument = gql`
    query GetUnreadNotificationCount {
  unreadNotificationCount
}
    `;

/**
 * __useGetUnreadNotificationCountQuery__
 *
 * To run a query within a React component, call `useGetUnreadNotificationCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnreadNotificationCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnreadNotificationCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUnreadNotificationCountQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUnreadNotificationCountQuery, GetUnreadNotificationCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUnreadNotificationCountQuery, GetUnreadNotificationCountQueryVariables>(GetUnreadNotificationCountDocument, options);
      }
export function useGetUnreadNotificationCountLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUnreadNotificationCountQuery, GetUnreadNotificationCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUnreadNotificationCountQuery, GetUnreadNotificationCountQueryVariables>(GetUnreadNotificationCountDocument, options);
        }
export function useGetUnreadNotificationCountSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetUnreadNotificationCountQuery, GetUnreadNotificationCountQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetUnreadNotificationCountQuery, GetUnreadNotificationCountQueryVariables>(GetUnreadNotificationCountDocument, options);
        }
export type GetUnreadNotificationCountQueryHookResult = ReturnType<typeof useGetUnreadNotificationCountQuery>;
export type GetUnreadNotificationCountLazyQueryHookResult = ReturnType<typeof useGetUnreadNotificationCountLazyQuery>;
export type GetUnreadNotificationCountSuspenseQueryHookResult = ReturnType<typeof useGetUnreadNotificationCountSuspenseQuery>;
export type GetUnreadNotificationCountQueryResult = Apollo.QueryResult<GetUnreadNotificationCountQuery, GetUnreadNotificationCountQueryVariables>;
export const GetNotificationStatsDocument = gql`
    query GetNotificationStats($userId: ID) {
  notificationStats(userId: $userId) {
    total
    unread
    byType {
      type
      count
    }
    byPriority {
      priority
      count
    }
  }
}
    `;

/**
 * __useGetNotificationStatsQuery__
 *
 * To run a query within a React component, call `useGetNotificationStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationStatsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetNotificationStatsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetNotificationStatsQuery, GetNotificationStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetNotificationStatsQuery, GetNotificationStatsQueryVariables>(GetNotificationStatsDocument, options);
      }
export function useGetNotificationStatsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetNotificationStatsQuery, GetNotificationStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetNotificationStatsQuery, GetNotificationStatsQueryVariables>(GetNotificationStatsDocument, options);
        }
export function useGetNotificationStatsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GetNotificationStatsQuery, GetNotificationStatsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetNotificationStatsQuery, GetNotificationStatsQueryVariables>(GetNotificationStatsDocument, options);
        }
export type GetNotificationStatsQueryHookResult = ReturnType<typeof useGetNotificationStatsQuery>;
export type GetNotificationStatsLazyQueryHookResult = ReturnType<typeof useGetNotificationStatsLazyQuery>;
export type GetNotificationStatsSuspenseQueryHookResult = ReturnType<typeof useGetNotificationStatsSuspenseQuery>;
export type GetNotificationStatsQueryResult = Apollo.QueryResult<GetNotificationStatsQuery, GetNotificationStatsQueryVariables>;
export const IsUserOnlineDocument = gql`
    query IsUserOnline($userId: ID!) {
  isUserOnline(userId: $userId)
}
    `;

/**
 * __useIsUserOnlineQuery__
 *
 * To run a query within a React component, call `useIsUserOnlineQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUserOnlineQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUserOnlineQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useIsUserOnlineQuery(baseOptions: ApolloReactHooks.QueryHookOptions<IsUserOnlineQuery, IsUserOnlineQueryVariables> & ({ variables: IsUserOnlineQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<IsUserOnlineQuery, IsUserOnlineQueryVariables>(IsUserOnlineDocument, options);
      }
export function useIsUserOnlineLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IsUserOnlineQuery, IsUserOnlineQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<IsUserOnlineQuery, IsUserOnlineQueryVariables>(IsUserOnlineDocument, options);
        }
export function useIsUserOnlineSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<IsUserOnlineQuery, IsUserOnlineQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<IsUserOnlineQuery, IsUserOnlineQueryVariables>(IsUserOnlineDocument, options);
        }
export type IsUserOnlineQueryHookResult = ReturnType<typeof useIsUserOnlineQuery>;
export type IsUserOnlineLazyQueryHookResult = ReturnType<typeof useIsUserOnlineLazyQuery>;
export type IsUserOnlineSuspenseQueryHookResult = ReturnType<typeof useIsUserOnlineSuspenseQuery>;
export type IsUserOnlineQueryResult = Apollo.QueryResult<IsUserOnlineQuery, IsUserOnlineQueryVariables>;
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
      imageUrl
      extraItems {
        name
        items
        cost
      }
    }
    roomPrices {
      bedroom
      livingRoom
      bathroom
      kitchen
      study
      outdoor
      lobby
      balcony
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
      imageUrl
      extraItems {
        name
        items
        cost
      }
    }
    roomPrices {
      bedroom
      livingRoom
      bathroom
      kitchen
      study
      outdoor
      lobby
      balcony
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
      email
      firstName
      lastName
      role
      phone
      createdAt
      updatedAt
    }
    startDate
    endDate
    status
    billingCycle
    duration
    totalPrice
    nextBillingDate
    lastBillingDate
    autoRenew
    address {
      id
      street
      city
      state
      zipCode
      country
      isDefault
      label
    }
    paymentMethod {
      id
      user {
        id
        email
        firstName
        lastName
        role
        phone
        createdAt
        updatedAt
      }
      type
      last4
      expiryMonth
      expiryYear
      brand
      isDefault
      createdAt
      updatedAt
    }
    subscriptionServices {
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
          imageUrl
          extraItems {
            name
            items
            cost
          }
        }
      }
      service_category
      frequency
      price
      serviceDetails {
        cleaning {
          cleaningType
          houseType
          rooms {
            bedroom
            livingRoom
            bathroom
            kitchen
            balcony
            studyRoom
            other
          }
        }
        laundry {
          laundryType
          bags
          items {
            shirts
            pants
            dresses
            suits
            others
          }
        }
        pestControl {
          treatmentType
          areas
          severity
        }
        cooking {
          mealType
          mealsPerDelivery {
            day
            count
          }
        }
      }
      scheduledDays
      preferredTimeSlot
      createdAt
      updatedAt
      id
    }
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
      email
      firstName
      lastName
      role
      phone
      createdAt
      updatedAt
    }
    startDate
    endDate
    status
    billingCycle
    duration
    totalPrice
    nextBillingDate
    lastBillingDate
    autoRenew
    address {
      id
      street
      city
      state
      zipCode
      country
      isDefault
      label
    }
    paymentMethod {
      id
      user {
        id
        email
        firstName
        lastName
        role
        phone
        createdAt
        updatedAt
      }
      type
      last4
      expiryMonth
      expiryYear
      brand
      isDefault
      createdAt
      updatedAt
    }
    subscriptionServices {
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
          imageUrl
          extraItems {
            name
            items
            cost
          }
        }
      }
      service_category
      frequency
      price
      serviceDetails {
        cleaning {
          cleaningType
          houseType
          rooms {
            bedroom
            livingRoom
            bathroom
            kitchen
            balcony
            studyRoom
            other
          }
        }
        laundry {
          laundryType
          bags
          items {
            shirts
            pants
            dresses
            suits
            others
          }
        }
        pestControl {
          treatmentType
          areas
          severity
        }
        cooking {
          mealType
          mealsPerDelivery {
            day
            count
          }
        }
      }
      scheduledDays
      preferredTimeSlot
      createdAt
      updatedAt
      id
    }
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
    customer {
      id
      email
      firstName
      lastName
      role
      phone
      createdAt
      updatedAt
    }
    startDate
    endDate
    status
    billingCycle
    duration
    totalPrice
    nextBillingDate
    lastBillingDate
    autoRenew
    address {
      id
      street
      city
      state
      zipCode
      country
      isDefault
      label
    }
    paymentMethod {
      id
      user {
        id
        email
        firstName
        lastName
        role
        phone
        createdAt
        updatedAt
      }
      type
      last4
      expiryMonth
      expiryYear
      brand
      isDefault
      createdAt
      updatedAt
    }
    subscriptionServices {
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
          imageUrl
          extraItems {
            name
            items
            cost
          }
        }
      }
      service_category
      frequency
      price
      serviceDetails {
        cleaning {
          cleaningType
          houseType
          rooms {
            bedroom
            livingRoom
            bathroom
            kitchen
            balcony
            studyRoom
            other
          }
        }
        laundry {
          laundryType
          bags
          items {
            shirts
            pants
            dresses
            suits
            others
          }
        }
        pestControl {
          treatmentType
          areas
          severity
        }
        cooking {
          mealType
          mealsPerDelivery {
            day
            count
          }
        }
      }
      scheduledDays
      preferredTimeSlot
      createdAt
      updatedAt
      id
    }
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