import type { GetMealOrdersQuery } from "@/graphql/api";
import { MealOrderStatus } from "@/graphql/api";

export const fmt = (n: number) => `₦${n.toLocaleString()}`;

export function formatOrderDate(createdAt: string | unknown): string {
  if (!createdAt) return "—";
  const d = new Date(createdAt as string);
  const now = new Date();
  const isToday =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();
  if (isToday) {
    return `Today, ${d.toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit" })}`;
  }
  return d.toLocaleDateString("en-NG", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function orderDisplayId(id: string): string {
  return id.length >= 8 ? `#${id.slice(-8).toUpperCase()}` : `#${id}`;
}

export function statusLabel(status: MealOrderStatus): string {
  const map: Record<MealOrderStatus, string> = {
    [MealOrderStatus.Confirmed]: "Confirmed",
    [MealOrderStatus.Preparing]: "Preparing",
    [MealOrderStatus.ReadyForDelivery]: "Ready",
    [MealOrderStatus.OutForDelivery]: "In Transit",
    [MealOrderStatus.Delivered]: "Delivered",
    [MealOrderStatus.Received]: "Delivered",
    [MealOrderStatus.Cancelled]: "Cancelled",
  };
  return map[status] ?? status;
}

export const ACTIVE_STATUSES: MealOrderStatus[] = [
  MealOrderStatus.Confirmed,
  MealOrderStatus.Preparing,
  MealOrderStatus.ReadyForDelivery,
  MealOrderStatus.OutForDelivery,
];

export function progressForStatus(status: MealOrderStatus): number {
  switch (status) {
    case MealOrderStatus.Confirmed:
      return 25;
    case MealOrderStatus.Preparing:
      return 50;
    case MealOrderStatus.ReadyForDelivery:
    case MealOrderStatus.OutForDelivery:
      return 75;
    case MealOrderStatus.Delivered:
    case MealOrderStatus.Received:
      return 100;
    default:
      return 0;
  }
}

export type OrderItem = GetMealOrdersQuery["mealOrders"][0]["items"][0];
export type MealOrder = GetMealOrdersQuery["mealOrders"][0];

export function getStatusBadgeClass(
  status: MealOrderStatus,
  s: { [key: string]: string },
): string {
  if (
    status === MealOrderStatus.Delivered ||
    status === MealOrderStatus.Received
  ) {
    return s["badgeSuccess"];
  }
  if (status === MealOrderStatus.Cancelled) {
    return s["badgeError"];
  }
  return s["badgeWarning"];
}
