# Billing Operations Hook

This directory contains the billing operations hook that provides functions for managing subscription billings, billing statistics, and user billings.

## Usage

```typescript
import { useBillingOperations } from '@/graphql/hooks/billing/useBillingOperations';

const MyComponent = () => {
  const {
    handleGetSubscriptionBillings,
    handleGetBillingStats,
    handleGetUserBillings,
    filterBillingsByStatus,
    calculateTotalAmount,
    getBillingsInDateRange
  } = useBillingOperations();

  // Get all billings for a subscription
  const getSubscriptionBillings = async (subscriptionId: string) => {
    try {
      const billings = await handleGetSubscriptionBillings(subscriptionId);
      console.log('Subscription billings:', billings);
    } catch (error) {
      console.error('Error fetching subscription billings:', error);
    }
  };

  // Get billing statistics for a subscription
  const getBillingStats = async (subscriptionId: string) => {
    try {
      const stats = await handleGetBillingStats(subscriptionId);
      console.log('Billing stats:', stats);
      // stats.total, stats.paid, stats.pending, stats.failed
      // stats.totalAmount, stats.paidAmount
    } catch (error) {
      console.error('Error fetching billing stats:', error);
    }
  };

  // Get all billings for the current user
  const getUserBillings = async () => {
    try {
      const userBillings = await handleGetUserBillings();
      console.log('User billings:', userBillings);
    } catch (error) {
      console.error('Error fetching user billings:', error);
    }
  };

  // Filter billings by status
  const paidBillings = filterBillingsByStatus(billings, BillingStatus.Paid);

  // Calculate total amount
  const totalAmount = calculateTotalAmount(billings);

  // Get billings within a date range
  const recentBillings = getBillingsInDateRange(
    billings,
    '2024-01-01',
    '2024-12-31'
  );

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};
```

## Available Queries

### 1. Get Subscription Billings

```graphql
query GetSubscriptionBillings($subscriptionId: ID!) {
  subscriptionBillings(subscriptionId: $subscriptionId) {
    id
    amount
    status
    billingDate
    paymentDate
    periodStartDate
    periodEndDate
    createdAt
    updatedAt
  }
}
```

### 2. Get Billing Stats

```graphql
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
```

### 3. Get User Billings

```graphql
query GetUserBillings {
  userBillings {
    id
    amount
    status
    billingDate
    paymentDate
    periodStartDate
    periodEndDate
    subscription {
      id
      status
      billingCycle
      totalPrice
    }
    createdAt
    updatedAt
  }
}
```

## Available Functions

- `handleGetSubscriptionBillings(subscriptionId: string)` - Get all billings for a subscription
- `handleGetBillingStats(subscriptionId: string)` - Get billing statistics for a subscription
- `handleGetUserBillings()` - Get all billings for the current user
- `filterBillingsByStatus(billings: Billing[], status: BillingStatus)` - Filter billings by status
- `calculateTotalAmount(billings: Billing[])` - Calculate total amount for a set of billings
- `getBillingsInDateRange(billings: Billing[], startDate: string, endDate: string)` - Get billings within a date range

## Types

- `Billing` - Individual billing record
- `BillingWithSubscription` - Billing record with subscription information
- `BillingStats` - Billing statistics object
- `BillingStatus` - Enum for billing status (Paid, Pending, Failed, Cancelled)
