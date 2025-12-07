/**
 * Date normalization utilities for handling timezone-safe date operations
 *
 * These functions normalize dates from the API to prevent timezone-related issues
 * where UTC dates might shift to previous/next day when parsed in local timezones.
 */

import { parseAPIDateAsLocal } from "./slotHelpers";
import { Booking, Subscription } from "@/graphql/api";

/**
 * Normalizes all date fields in a booking object
 * Converts API date strings to local Date objects to prevent timezone shifts
 *
 * @param booking - Booking object from GraphQL API
 * @returns Booking with normalized date fields
 */
export const normalizeBooking = (booking: Booking): Booking => {
  return {
    ...booking,
    date: parseAPIDateAsLocal(booking.date) as any,
    createdAt: parseAPIDateAsLocal(booking.createdAt) as any,
    updatedAt: parseAPIDateAsLocal(booking.updatedAt) as any,
    cancellationDate: booking.cancellationDate
      ? (parseAPIDateAsLocal(booking.cancellationDate) as any)
      : undefined,
    resumeDate: booking.resumeDate
      ? (parseAPIDateAsLocal(booking.resumeDate) as any)
      : undefined,
    pauseDate: booking.pauseDate
      ? (parseAPIDateAsLocal(booking.pauseDate) as any)
      : undefined,
  };
};

/**
 * Normalizes all date fields in a subscription object
 * Converts API date strings to local Date objects to prevent timezone shifts
 *
 * @param subscription - Subscription object from GraphQL API
 * @returns Subscription with normalized date fields
 */
export const normalizeSubscription = (
  subscription: Subscription
): Subscription => {
  return {
    ...subscription,
    startDate: parseAPIDateAsLocal(subscription.startDate) as any,
    endDate: subscription.endDate
      ? (parseAPIDateAsLocal(subscription.endDate) as any)
      : undefined,
    nextBillingDate: parseAPIDateAsLocal(subscription.nextBillingDate) as any,
    lastBillingDate: subscription.lastBillingDate
      ? (parseAPIDateAsLocal(subscription.lastBillingDate) as any)
      : undefined,
    pauseDate: subscription.pauseDate
      ? (parseAPIDateAsLocal(subscription.pauseDate) as any)
      : undefined,
    resumeDate: subscription.resumeDate
      ? (parseAPIDateAsLocal(subscription.resumeDate) as any)
      : undefined,
    createdAt: parseAPIDateAsLocal(subscription.createdAt) as any,
    updatedAt: parseAPIDateAsLocal(subscription.updatedAt) as any,
  };
};

/**
 * Normalizes an array of bookings
 *
 * @param bookings - Array of booking objects from GraphQL API
 * @returns Array of bookings with normalized date fields
 */
export const normalizeBookings = (bookings: Booking[]): Booking[] => {
  return bookings.map(normalizeBooking);
};

/**
 * Normalizes an array of subscriptions
 *
 * @param subscriptions - Array of subscription objects from GraphQL API
 * @returns Array of subscriptions with normalized date fields
 */
export const normalizeSubscriptions = (subscriptions: any[]): any[] => {
  return subscriptions.map(normalizeSubscription);
};
