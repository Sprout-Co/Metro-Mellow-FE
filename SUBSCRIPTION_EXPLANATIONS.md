I'll analyze the subscription and billing cycle frequency system in your codebase to explain how it works with a user journey.

Search files...
Now let me look at some test examples to better understand the user journey:

Read file: src/**tests**/integration/consolidated/subscription.test.ts
Let me also check the subscription service to understand how bookings are generated:

Read file: src/services/subscription/subscription.service.ts
Now let me check the booking generation logic:

Read file: src/services/subscription/subscription.service.ts
Based on my analysis of the codebase, I can now explain how the frequency works in your subscription and billing cycle system with a comprehensive user journey.

## How Frequency Works in Subscription and Billing Cycle

Your system has a sophisticated two-tier frequency system that separates **service frequency** from **billing frequency**. Here's how it works:

### 1. **Service Frequency** (How often services are performed)

- **DAILY**: Services performed every day
- **WEEKLY**: Services performed weekly on selected days
- **BI_WEEKLY**: Services performed every other week on selected days
- **MONTHLY**: Services performed once per month on selected days
- **QUARTERLY**: Services performed once per quarter on selected days
- **ONE_OFF**: Single service booking

### 2. **Billing Cycle** (How often customers are charged)

- **MONTHLY**: Customer charged monthly
- **QUARTERLY**: Customer charged quarterly

## User Journey Example: Sarah's Cleaning Subscription

Let me walk you through a complete user journey:

### **Step 1: Sarah Creates a Subscription**

Sarah wants weekly cleaning services and chooses:

- **Service**: Standard Cleaning
- **Service Frequency**: WEEKLY (every Monday and Thursday)
- **Billing Cycle**: MONTHLY (charged monthly)
- **Duration**: 6 months
- **Start Date**: January 1st, 2024

```typescript
const subscriptionData = {
  billingCycle: BillingCycle.MONTHLY,
  duration: 6,
  startDate: new Date("2024-01-01"),
  autoRenew: true,
  services: [
    {
      serviceId: "cleaning_service_id",
      frequency: SubscriptionFrequency.WEEKLY,
      scheduledDays: [ScheduleDays.MONDAY, ScheduleDays.THURSDAY],
      preferredTimeSlot: TimeSlot.MORNING,
      price: 100, // per service
      // ... service details
    },
  ],
};
```

### **Step 2: System Validation**

The system validates:

- ✅ Monthly billing requires minimum 1 month duration (6 months is valid)
- ✅ Weekly cleaning frequency is allowed
- ✅ Duration (6 months) meets minimum requirements for weekly frequency
- ✅ Service and billing alignment is valid

### **Step 3: Booking Generation**

The system automatically generates **48 bookings** for Sarah:

- **6 months × 4 weeks × 2 days per week = 48 bookings**
- **January**: 8 bookings (Mondays: 1st, 8th, 15th, 22nd, 29th | Thursdays: 4th, 11th, 18th, 25th)
- **February**: 8 bookings (Mondays: 5th, 12th, 19th, 26th | Thursdays: 1st, 8th, 15th, 22nd)
- **...continues for 6 months**

### **Step 4: Billing Schedule**

Sarah is billed monthly:

- **January 1st**: First billing - $200 (2 weeks × 2 days × $100)
- **February 1st**: Second billing - $200
- **March 1st**: Third billing - $200
- **...continues monthly**

### **Step 5: Service Execution**

Each booking is executed on schedule:

- **January 1st, 8:00 AM**: Cleaning service performed
- **January 4th, 8:00 AM**: Cleaning service performed
- **January 8th, 8:00 AM**: Cleaning service performed
- **...continues on schedule**

## Key System Rules

### **Billing Cycle Constraints**

```typescript
// Monthly billing: minimum 1 month duration
if (billingCycle === BillingCycle.MONTHLY && duration < 1) {
  throw new ValidationError("Duration must be at least 1 month");
}

// Quarterly billing: minimum 3 months duration
if (billingCycle === BillingCycle.QUARTERLY && duration < 3) {
  throw new ValidationError("Duration must be at least 3 months");
}
```

### **Service Frequency Rules**

```typescript
// Cleaning services: weekly, bi-weekly, or monthly only
if (
  service_category === ServiceCategory.CLEANING &&
  !["WEEKLY", "BI_WEEKLY", "MONTHLY"].includes(frequency)
) {
  throw new ValidationError("Invalid cleaning frequency");
}

// Pest control: quarterly only
if (
  service_category === ServiceCategory.PEST_CONTROL &&
  frequency !== SubscriptionFrequency.QUARTERLY
) {
  throw new ValidationError("Pest control must be quarterly");
}
```

### **Billing Alignment Rules**

```typescript
// Cleaning services must use monthly billing
if (
  service_category === ServiceCategory.CLEANING &&
  billingCycle !== BillingCycle.MONTHLY
) {
  throw new ValidationError("Cleaning services must use monthly billing");
}

// Pest control must use quarterly billing
if (
  service_category === ServiceCategory.PEST_CONTROL &&
  billingCycle !== BillingCycle.QUARTERLY
) {
  throw new ValidationError("Pest control must use quarterly billing");
}
```

## Advanced Scenarios

### **Multi-Service Subscription**

Sarah adds laundry service:

- **Cleaning**: Weekly (Mon, Thu) - $100 per service
- **Laundry**: Bi-weekly (Wed) - $50 per service
- **Total monthly billing**: $450
  - Cleaning: 8 services × $100 = $800
  - Laundry: 4 services × $50 = $200
  - **Monthly total**: $1000

### **Bi-Weekly Service Example**

If Sarah chose bi-weekly cleaning:

- **Service Frequency**: BI_WEEKLY
- **Scheduled Days**: Monday
- **Duration**: 6 months
- **Bookings Generated**: 12 (every other Monday for 6 months)
- **Monthly Billing**: $200 (2 services per month × $100)

### **Quarterly Service Example**

Pest control service:

- **Service Frequency**: QUARTERLY
- **Billing Cycle**: QUARTERLY
- **Duration**: 12 months
- **Bookings Generated**: 4 (once per quarter)
- **Quarterly Billing**: $300 (1 service per quarter × $300)

## System Benefits

1. **Flexibility**: Customers can choose service frequency independent of billing
2. **Predictability**: All bookings are pre-generated for the entire subscription period
3. **Automation**: Billing and service scheduling happen automatically
4. **Validation**: System ensures logical consistency between services and billing
5. **Scalability**: Supports multiple services with different frequencies in one subscription

This system allows customers to have services performed as frequently as they need while being billed at intervals that work for their budget, creating a flexible and user-friendly subscription experience.

I'll create comprehensive user journeys for each billing cycle and frequency combination in your system. Let me analyze the codebase to ensure I cover all valid scenarios.

Search files...
Now I have a comprehensive understanding of all the valid billing cycle and frequency combinations. Let me create detailed user journeys for each scenario.

# Complete User Journeys for All Billing Cycle and Frequency Scenarios

Based on the validation rules in your system, here are all the valid combinations with detailed user journeys:

## **Service Categories & Valid Combinations**

| Service Category | Valid Frequencies          | Required Billing Cycle | Min Duration |
| ---------------- | -------------------------- | ---------------------- | ------------ |
| **Cleaning**     | WEEKLY, BI_WEEKLY, MONTHLY | MONTHLY                | 1 month      |
| **Laundry**      | WEEKLY, BI_WEEKLY, MONTHLY | MONTHLY                | 1 month      |
| **Cooking**      | WEEKLY, BI_WEEKLY          | MONTHLY                | 1 month      |
| **Pest Control** | QUARTERLY                  | QUARTERLY              | 3 months     |

---

## **1. MONTHLY BILLING CYCLE SCENARIOS**

### **Scenario 1A: Weekly Cleaning with Monthly Billing**

**Customer**: Emma, a busy professional  
**Service**: Standard Cleaning  
**Frequency**: WEEKLY (every Monday and Wednesday)  
**Billing**: MONTHLY  
**Duration**: 6 months  
**Start Date**: January 1st, 2024

```typescript
const subscriptionData = {
  billingCycle: BillingCycle.MONTHLY,
  duration: 6,
  startDate: new Date("2024-01-01"),
  autoRenew: true,
  services: [
    {
      serviceId: "cleaning_service_id",
      frequency: SubscriptionFrequency.WEEKLY,
      scheduledDays: [ScheduleDays.MONDAY, ScheduleDays.WEDNESDAY],
      preferredTimeSlot: TimeSlot.MORNING,
      price: 120, // per service
      category: ServiceCategory.CLEANING,
    },
  ],
};
```

**System Validation**: ✅ All validations pass  
**Bookings Generated**: 48 bookings (6 months × 4 weeks × 2 days)  
**Monthly Billing**: $960 (8 services × $120)  
**Total Cost**: $5,760

**Service Schedule**:

- **January**: 8 bookings (Mondays: 1st, 8th, 15th, 22nd, 29th | Wednesdays: 3rd, 10th, 17th, 24th, 31st)
- **February**: 8 bookings (Mondays: 5th, 12th, 19th, 26th | Wednesdays: 7th, 14th, 21st, 28th)
- **...continues for 6 months**

---

### **Scenario 1B: Bi-Weekly Laundry with Monthly Billing**

**Customer**: David, a family man  
**Service**: Premium Laundry  
**Frequency**: BI_WEEKLY (every other Friday)  
**Billing**: MONTHLY  
**Duration**: 12 months  
**Start Date**: March 1st, 2024

```typescript
const subscriptionData = {
  billingCycle: BillingCycle.MONTHLY,
  duration: 12,
  startDate: new Date("2024-03-01"),
  autoRenew: true,
  services: [
    {
      serviceId: "laundry_service_id",
      frequency: SubscriptionFrequency.BI_WEEKLY,
      scheduledDays: [ScheduleDays.FRIDAY],
      preferredTimeSlot: TimeSlot.AFTERNOON,
      price: 80, // per service
      category: ServiceCategory.LAUNDRY,
    },
  ],
};
```

**System Validation**: ✅ All validations pass  
**Bookings Generated**: 24 bookings (12 months × 2 services per month)  
**Monthly Billing**: $160 (2 services × $80)  
**Total Cost**: $1,920

**Service Schedule**:

- **March**: 2 bookings (Fridays: 1st, 15th)
- **April**: 2 bookings (Fridays: 5th, 19th)
- **...continues for 12 months**

---

### **Scenario 1C: Monthly Cooking with Monthly Billing**

**Customer**: Sarah, a health-conscious individual  
**Service**: Standard Cooking  
**Frequency**: MONTHLY (first Saturday of each month)  
**Billing**: MONTHLY  
**Duration**: 3 months  
**Start Date**: April 1st, 2024

```typescript
const subscriptionData = {
  billingCycle: BillingCycle.MONTHLY,
  duration: 3,
  startDate: new Date("2024-04-01"),
  autoRenew: true,
  services: [
    {
      serviceId: "cooking_service_id",
      frequency: SubscriptionFrequency.MONTHLY,
      scheduledDays: [ScheduleDays.SATURDAY],
      preferredTimeSlot: TimeSlot.MORNING,
      price: 200, // per service
      category: ServiceCategory.COOKING,
    },
  ],
};
```

**System Validation**: ✅ All validations pass  
**Bookings Generated**: 3 bookings (3 months × 1 service per month)  
**Monthly Billing**: $200 (1 service × $200)  
**Total Cost**: $600

**Service Schedule**:

- **April**: 1 booking (Saturday: 6th)
- **May**: 1 booking (Saturday: 4th)
- **June**: 1 booking (Saturday: 1st)

---

### **Scenario 1D: Multi-Service Monthly Billing**

**Customer**: Michael, a busy executive  
**Services**: Cleaning + Laundry + Cooking  
**Frequencies**: WEEKLY (cleaning), BI_WEEKLY (laundry), WEEKLY (cooking)  
**Billing**: MONTHLY  
**Duration**: 6 months  
**Start Date**: May 1st, 2024

```typescript
const subscriptionData = {
  billingCycle: BillingCycle.MONTHLY,
  duration: 6,
  startDate: new Date("2024-05-01"),
  autoRenew: true,
  services: [
    {
      serviceId: "cleaning_service_id",
      frequency: SubscriptionFrequency.WEEKLY,
      scheduledDays: [ScheduleDays.MONDAY],
      preferredTimeSlot: TimeSlot.MORNING,
      price: 100,
      category: ServiceCategory.CLEANING,
    },
    {
      serviceId: "laundry_service_id",
      frequency: SubscriptionFrequency.BI_WEEKLY,
      scheduledDays: [ScheduleDays.WEDNESDAY],
      preferredTimeSlot: TimeSlot.AFTERNOON,
      price: 60,
      category: ServiceCategory.LAUNDRY,
    },
    {
      serviceId: "cooking_service_id",
      frequency: SubscriptionFrequency.WEEKLY,
      scheduledDays: [ScheduleDays.FRIDAY],
      preferredTimeSlot: TimeSlot.EVENING,
      price: 150,
      category: ServiceCategory.COOKING,
    },
  ],
};
```

**System Validation**: ✅ All validations pass  
**Bookings Generated**: 144 bookings total

- **Cleaning**: 24 bookings (6 months × 4 weeks)
- **Laundry**: 12 bookings (6 months × 2 services per month)
- **Cooking**: 24 bookings (6 months × 4 weeks)

**Monthly Billing**: $1,320

- **Cleaning**: 4 services × $100 = $400
- **Laundry**: 2 services × $60 = $120
- **Cooking**: 4 services × $150 = $600

**Total Cost**: $7,920

---

## **2. QUARTERLY BILLING CYCLE SCENARIOS**

### **Scenario 2A: Quarterly Pest Control with Quarterly Billing**

**Customer**: Lisa, a homeowner  
**Service**: Residential Pest Control  
**Frequency**: QUARTERLY (once per quarter)  
**Billing**: QUARTERLY  
**Duration**: 12 months  
**Start Date**: January 1st, 2024

```typescript
const subscriptionData = {
  billingCycle: BillingCycle.QUARTERLY,
  duration: 12,
  startDate: new Date("2024-01-01"),
  autoRenew: true,
  services: [
    {
      serviceId: "pest_control_service_id",
      frequency: SubscriptionFrequency.QUARTERLY,
      scheduledDays: [ScheduleDays.TUESDAY],
      preferredTimeSlot: TimeSlot.MORNING,
      price: 300, // per service
      category: ServiceCategory.PEST_CONTROL,
    },
  ],
};
```

**System Validation**: ✅ All validations pass  
**Bookings Generated**: 4 bookings (4 quarters × 1 service per quarter)  
**Quarterly Billing**: $300 (1 service × $300)  
**Total Cost**: $1,200

**Service Schedule**:

- **Q1 (Jan-Mar)**: 1 booking (Tuesday: January 2nd)
- **Q2 (Apr-Jun)**: 1 booking (Tuesday: April 2nd)
- **Q3 (Jul-Sep)**: 1 booking (Tuesday: July 2nd)
- **Q4 (Oct-Dec)**: 1 booking (Tuesday: October 1st)

---

### **Scenario 2B: Extended Quarterly Pest Control**

**Customer**: Robert, a property manager  
**Service**: Commercial Pest Control  
**Frequency**: QUARTERLY (once per quarter)  
**Billing**: QUARTERLY  
**Duration**: 24 months  
**Start Date**: March 1st, 2024

```typescript
const subscriptionData = {
  billingCycle: BillingCycle.QUARTERLY,
  duration: 24,
  startDate: new Date("2024-03-01"),
  autoRenew: true,
  services: [
    {
      serviceId: "pest_control_service_id",
      frequency: SubscriptionFrequency.QUARTERLY,
      scheduledDays: [ScheduleDays.THURSDAY],
      preferredTimeSlot: TimeSlot.AFTERNOON,
      price: 500, // per service
      category: ServiceCategory.PEST_CONTROL,
    },
  ],
};
```

**System Validation**: ✅ All validations pass  
**Bookings Generated**: 8 bookings (8 quarters × 1 service per quarter)  
**Quarterly Billing**: $500 (1 service × $500)  
**Total Cost**: $4,000

**Service Schedule**:

- **Q1 (Mar-May)**: 1 booking (Thursday: March 7th)
- **Q2 (Jun-Aug)**: 1 booking (Thursday: June 6th)
- **Q3 (Sep-Nov)**: 1 booking (Thursday: September 5th)
- **Q4 (Dec-Feb)**: 1 booking (Thursday: December 5th)
- **...continues for 24 months**

---

## **3. INVALID SCENARIOS (System Rejects)**

### **Invalid Scenario 1: Cleaning with Quarterly Billing**

```typescript
const invalidSubscription = {
  billingCycle: BillingCycle.QUARTERLY, // ❌ Invalid for cleaning
  duration: 6,
  services: [
    {
      category: ServiceCategory.CLEANING,
      frequency: SubscriptionFrequency.WEEKLY,
    },
  ],
};
```

**System Response**: ❌ Throws `INVALID_CLEANING_BILLING` error

---

### **Invalid Scenario 2: Pest Control with Monthly Billing**

```typescript
const invalidSubscription = {
  billingCycle: BillingCycle.MONTHLY, // ❌ Invalid for pest control
  duration: 6,
  services: [
    {
      category: ServiceCategory.PEST_CONTROL,
      frequency: SubscriptionFrequency.QUARTERLY,
    },
  ],
};
```

**System Response**: ❌ Throws `INVALID_PEST_CONTROL_BILLING` error

---

### **Invalid Scenario 3: Cooking with Monthly Frequency**

```typescript
const invalidSubscription = {
  billingCycle: BillingCycle.MONTHLY,
  duration: 3,
  services: [
    {
      category: ServiceCategory.COOKING,
      frequency: SubscriptionFrequency.MONTHLY, // ❌ Invalid for cooking
    },
  ],
};
```

**System Response**: ❌ Throws `INVALID_COOKING_FREQUENCY` error

---

### **Invalid Scenario 4: Quarterly Service with Insufficient Duration**

```typescript
const invalidSubscription = {
  billingCycle: BillingCycle.QUARTERLY,
  duration: 2, // ❌ Less than minimum 3 months
  services: [
    {
      category: ServiceCategory.PEST_CONTROL,
      frequency: SubscriptionFrequency.QUARTERLY,
    },
  ],
};
```

**System Response**: ❌ Throws `INVALID_QUARTERLY_DURATION` error

---

## **4. SYSTEM CALCULATIONS & LOGIC**

### **Booking Generation Algorithm**

```typescript
// For WEEKLY frequency
if (frequency === "WEEKLY") {
  return validDates; // All dates matching scheduledDays
}

// For BI_WEEKLY frequency
if (frequency === "BI_WEEKLY") {
  // Only dates from even week numbers (0, 2, 4, etc.)
  return filteredDates;
}

// For MONTHLY frequency
if (frequency === "MONTHLY") {
  // First occurrence in each month
  return filteredDates;
}

// For QUARTERLY frequency
if (frequency === "QUARTERLY") {
  // First occurrence in each quarter
  return filteredDates;
}
```

### **Billing Calculation**

```typescript
// Monthly billing calculation
const monthlyBilling = services.reduce((total, service) => {
  let servicesPerMonth = 0;

  switch (service.frequency) {
    case SubscriptionFrequency.WEEKLY:
      servicesPerMonth = service.scheduledDays.length * 4; // ~4 weeks
      break;
    case SubscriptionFrequency.BI_WEEKLY:
      servicesPerMonth = service.scheduledDays.length * 2; // ~2 bi-weeks
      break;
    case SubscriptionFrequency.MONTHLY:
      servicesPerMonth = service.scheduledDays.length; // 1 per month
      break;
    case SubscriptionFrequency.QUARTERLY:
      servicesPerMonth = service.scheduledDays.length / 3; // ~1/3 per month
      break;
  }

  return total + servicesPerMonth * service.price;
}, 0);
```

### **Next Billing Date Calculation**

```typescript
calculateNextBillingDate(startDate: Date, billingCycle: BillingCycle): Date {
  const nextDate = new Date(startDate);

  switch (billingCycle) {
    case BillingCycle.MONTHLY:
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
    case BillingCycle.QUARTERLY:
      nextDate.setMonth(nextDate.getMonth() + 3);
      break;
  }

  return nextDate;
}
```

## **5. KEY SYSTEM FEATURES**

### **Automatic Booking Generation**

- All bookings are pre-generated for the entire subscription period
- System calculates exact dates based on frequency and scheduled days
- No manual booking creation required

### **Flexible Scheduling**

- Customers can choose specific days of the week
- Multiple services can have different frequencies
- Time slots can be customized (MORNING, AFTERNOON, EVENING)

### **Smart Validation**

- Prevents incompatible service combinations
- Ensures logical billing cycle alignment
- Validates minimum duration requirements

### **Cost Predictability**

- Fixed monthly/quarterly billing amounts
- No surprise charges
- Easy budget planning for customers

This comprehensive system ensures that customers get exactly the services they need at the frequency they want, while maintaining predictable billing cycles that work for their budget.
