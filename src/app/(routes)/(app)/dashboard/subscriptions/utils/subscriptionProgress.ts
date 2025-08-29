import { GetCustomerSubscriptionsQuery } from "@/graphql/api";

// Type for GraphQL subscription data
type Subscription = GetCustomerSubscriptionsQuery["customerSubscriptions"][0];

/**
 * Calculate subscription progress based on time elapsed within the subscription period
 * @param subscription - The subscription object containing startDate, endDate, and duration
 * @returns Progress percentage (0-100) rounded to nearest integer
 */
export const calculateSubscriptionProgress = (
  subscription: Subscription
): number => {
  // Calculate progress based on subscription duration and time elapsed
  const startDate = new Date(subscription.startDate);
  const endDate = subscription.endDate ? new Date(subscription.endDate) : null;
  const now = new Date();

  // If subscription has ended, show 100% progress
  if (endDate && now > endDate) {
    return 100;
  }

  // If subscription hasn't started yet, show 0% progress
  if (now < startDate) {
    return 0;
  }

  // Calculate progress based on time elapsed vs total duration
  const totalDuration = endDate
    ? endDate.getTime() - startDate.getTime()
    : subscription.duration * 30 * 24 * 60 * 60 * 1000; // Convert months to milliseconds (approximate)

  const elapsedTime = now.getTime() - startDate.getTime();
  const progress = Math.min(
    100,
    Math.max(0, (elapsedTime / totalDuration) * 100)
  );

  return Math.round(progress);
};
