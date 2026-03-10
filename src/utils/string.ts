/**
 * Converts a number to Nigerian Naira format string
 * @param amount - The amount to convert
 * @returns Formatted Naira string (e.g., "#10,000")
 */
export function formatToNaira(amount: number): string {
  // Handle edge cases
  if (amount === 0) return "₦0";
  if (!amount || isNaN(amount)) return "₦0";
  
  // Convert to string and add commas for thousands
  const formattedAmount = Math.abs(amount).toLocaleString('en-NG');
  
  // Add Naira symbol and handle negative numbers
  return amount < 0 ? `-₦${formattedAmount}` : `₦${formattedAmount}`;
}

/**
 * Converts a number to Nigerian Naira format string with decimal places
 * @param amount - The amount to convert
 * @param decimalPlaces - Number of decimal places (default: 2)
 * @returns Formatted Naira string with decimals (e.g., "#10,000.50")
 */
export function formatToNairaWithDecimals(amount: number, decimalPlaces: number = 2): string {
  // Handle edge cases
  if (amount === 0) return `₦0${decimalPlaces > 0 ? '.' + '0'.repeat(decimalPlaces) : ''}`;
  if (!amount || isNaN(amount)) return `₦0${decimalPlaces > 0 ? '.' + '0'.repeat(decimalPlaces) : ''}`;
  
  // Format with specified decimal places
  const formattedAmount = Math.abs(amount).toLocaleString('en-NG', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  });
  
  // Add Naira symbol and handle negative numbers
  return amount < 0 ? `-₦${formattedAmount}` : `₦${formattedAmount}`;
}

export function truncateText(text: string, limit: number): string {
  if (limit <= 0) return "";
  if (!text || text.length <= limit) return text;

  const ellipsis = "…";
  const sliceLength = Math.max(0, limit - ellipsis.length);

  return `${text.slice(0, sliceLength).trimEnd()}${ellipsis}`;
}
