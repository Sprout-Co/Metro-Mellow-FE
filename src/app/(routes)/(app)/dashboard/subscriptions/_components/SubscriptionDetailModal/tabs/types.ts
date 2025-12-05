import { ServiceCategory, BookingStatus, BillingStatus } from "@/graphql/api";

// Service helper functions
export const getServiceIcon = (service_category: ServiceCategory) => {
  const icons = {
    [ServiceCategory.Cleaning]: "🧹",
    [ServiceCategory.Laundry]: "👕",
    [ServiceCategory.Cooking]: "🍳",
    [ServiceCategory.Errands]: "📦",
    [ServiceCategory.PestControl]: "🐛",
  };
  return icons[service_category] || "🏠";
};

export const getServiceColor = (service_category: ServiceCategory) => {
  const colors = {
    [ServiceCategory.Cleaning]: "#075056",
    [ServiceCategory.Laundry]: "#6366f1",
    [ServiceCategory.Cooking]: "#fe5b04",
    [ServiceCategory.Errands]: "#10b981",
    [ServiceCategory.PestControl]: "#ec4899",
  };
  return colors[service_category] || "#6b7280";
};

// Date and time formatters
export const formatDate = (dateValue: string | Date) => {
  const date = new Date(dateValue);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatTime = (dateValue: string | Date) => {
  const date = new Date(dateValue);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

// Price formatter
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price);
};

// Booking status helpers
export const formatStatusName = (status: BookingStatus): string => {
  switch (status) {
    case BookingStatus.InProgress:
      return "In Progress";
    case BookingStatus.Pending:
      return "Pending";
    case BookingStatus.Confirmed:
      return "Confirmed";
    case BookingStatus.Completed:
      return "Completed";
    case BookingStatus.Cancelled:
      return "Cancelled";
    case BookingStatus.Paused:
      return "Paused";
    default:
      return status;
  }
};

// Billing status helpers
export const formatBillingStatusName = (status: BillingStatus): string => {
  switch (status) {
    case BillingStatus.Paid:
      return "Paid";
    case BillingStatus.Pending:
      return "Pending";
    case BillingStatus.Failed:
      return "Failed";
    case BillingStatus.Cancelled:
      return "Cancelled";
    default:
      return status;
  }
};

export const getBillingStatusColor = (status: BillingStatus): string => {
  switch (status) {
    case BillingStatus.Paid:
      return "#10b981";
    case BillingStatus.Pending:
      return "#f59e0b";
    case BillingStatus.Failed:
      return "#ef4444";
    case BillingStatus.Cancelled:
      return "#6b7280";
    default:
      return "#6b7280";
  }
};
