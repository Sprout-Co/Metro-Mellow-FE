# Service Modals

Simple, standalone modals for each service type. Each modal is self-contained and handles its own configuration logic.

## Available Modals

### 1. CleaningServiceModal

- **Purpose**: Handle cleaning service bookings
- **Configuration**: Apartment type selection and room counting
- **Props**: `CleaningServiceModalProps`
- **Configuration Type**: `CleaningServiceConfiguration`

### 2. LaundryServiceModal

- **Purpose**: Handle laundry service bookings
- **Configuration**: Laundry type, bag count, and item breakdown
- **Props**: `LaundryServiceModalProps`
- **Configuration Type**: `LaundryServiceConfiguration`

### 3. CookingServiceModal

- **Purpose**: Handle cooking service bookings
- **Configuration**: Meal type, delivery frequency, and meal selection
- **Props**: `CookingServiceModalProps`
- **Configuration Type**: `CookingServiceConfiguration`

### 4. PestControlServiceModal

- **Purpose**: Handle pest control service bookings
- **Configuration**: Treatment type, severity level, and treatment areas
- **Props**: `PestControlServiceModalProps`
- **Configuration Type**: `PestControlServiceConfiguration`

## Usage Examples

### Cleaning Service

```tsx
import CleaningServiceModal, {
  CleaningServiceConfiguration,
} from "@/components/ui/booking/modals/CleaningServiceModal/CleaningServiceModal";

<CleaningServiceModal
  isOpen={isModalOpen}
  onClose={handleCloseModal}
  serviceTitle="Standard Cleaning"
  serviceDescription="Regular maintenance cleaning for your home"
  servicePrice={2950}
  serviceImage="/images/cleaning/c1.jpeg"
  includedFeatures={[
    "Professional cleaning supplies included",
    "Experienced and vetted cleaning professionals",
    "Satisfaction guarantee",
  ]}
  onOrderSubmit={(configuration: CleaningServiceConfiguration) => {
    console.log("Cleaning configuration:", configuration);
    // configuration.apartmentType: "flat" | "duplex"
    // configuration.rooms: Array of room counts
  }}
/>;
```

### Laundry Service

```tsx
import LaundryServiceModal, {
  LaundryServiceConfiguration,
} from "@/components/ui/booking/modals/LaundryServiceModal/LaundryServiceModal";

<LaundryServiceModal
  isOpen={isModalOpen}
  onClose={handleCloseModal}
  serviceTitle="Standard Laundry"
  serviceDescription="Professional laundry service"
  servicePrice={1500}
  serviceImage="/images/laundry/l1.jpeg"
  onOrderSubmit={(configuration: LaundryServiceConfiguration) => {
    console.log("Laundry configuration:", configuration);
    // configuration.laundryType: "standard" | "dry-clean" | "express"
    // configuration.bags: number
    // configuration.items: Array of item counts
  }}
/>;
```

### Cooking Service

```tsx
import CookingServiceModal, {
  CookingServiceConfiguration,
} from "@/components/ui/booking/modals/CookingServiceModal/CookingServiceModal";

<CookingServiceModal
  isOpen={isModalOpen}
  onClose={handleCloseModal}
  serviceTitle="Meal Prep Service"
  serviceDescription="Professional cooking and meal preparation"
  servicePrice={2500}
  serviceImage="/images/food/f1.jpeg"
  onOrderSubmit={(configuration: CookingServiceConfiguration) => {
    console.log("Cooking configuration:", configuration);
    // configuration.mealType: "basic" | "standard" | "premium"
    // configuration.deliveryFrequency: "daily" | "weekly" | "monthly"
    // configuration.meals: Array of meal counts
  }}
/>;
```

### Pest Control Service

```tsx
import PestControlServiceModal, {
  PestControlServiceConfiguration,
} from "@/components/ui/booking/modals/PestControlServiceModal/PestControlServiceModal";

<PestControlServiceModal
  isOpen={isModalOpen}
  onClose={handleCloseModal}
  serviceTitle="Pest Control Treatment"
  serviceDescription="Professional pest control and extermination"
  servicePrice={3500}
  serviceImage="/images/pest-control/p1.jpeg"
  onOrderSubmit={(configuration: PestControlServiceConfiguration) => {
    console.log("Pest control configuration:", configuration);
    // configuration.treatmentType: "residential" | "commercial" | "emergency"
    // configuration.severity: "low" | "medium" | "high"
    // configuration.areas: Array of selected treatment areas
  }}
/>;
```

## Benefits

✅ **Simple and Direct**: Each modal is self-contained with no complex abstractions  
✅ **Type Safe**: Strongly typed configurations for each service type  
✅ **Easy to Maintain**: Each modal handles only its specific logic  
✅ **No Dependencies**: No base modal or complex inheritance  
✅ **Clear Purpose**: Each modal has a single, well-defined responsibility

## File Structure

```
src/components/ui/booking/modals/
├── CleaningServiceModal/
│   ├── CleaningServiceModal.tsx
│   ├── CleaningServiceModal.module.scss
│   └── index.ts
├── LaundryServiceModal/
│   ├── LaundryServiceModal.tsx
│   ├── LaundryServiceModal.module.scss
│   └── index.ts
├── CookingServiceModal/
│   ├── CookingServiceModal.tsx
│   ├── CookingServiceModal.module.scss
│   └── index.ts
├── PestControlServiceModal/
│   ├── PestControlServiceModal.tsx
│   ├── PestControlServiceModal.module.scss
│   └── index.ts
└── README.md
```

Each modal includes:

- Complete modal functionality (display, checkout, slide panel)
- Service-specific configuration UI
- TypeScript interfaces for props and configuration
- Styled components with SCSS modules
- Export index file for clean imports
