import { useState, useCallback } from 'react';
import { waitlistService, WaitlistEntry, WaitlistStats } from '@/lib/services/waitlist';

export interface UseWaitlistReturn {
  isLoading: boolean;
  isSubmitted: boolean;
  error: string | null;
  successMessage: string | null;
  stats: WaitlistStats | null;
  addToWaitlist: (email: string, additionalData?: Partial<WaitlistEntry>) => Promise<void>;
  getStats: () => Promise<void>;
  reset: () => void;
}

export const useWaitlist = (): UseWaitlistReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [stats, setStats] = useState<WaitlistStats | null>(null);

  const addToWaitlist = useCallback(async (
    email: string, 
    additionalData?: Partial<WaitlistEntry>
  ) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Add browser info if available
      const browserData = typeof window !== 'undefined' ? {
        userAgent: window.navigator.userAgent,
        // You could add more browser info here
      } : {};

      const result = await waitlistService.addToWaitlist(email, {
        ...additionalData,
        ...browserData
      });

      if (result.success) {
        setIsSubmitted(true);
        setSuccessMessage(result.message);
        
        // Track analytics event if available
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'waitlist_signup', {
            event_category: 'engagement',
            event_label: 'waitlist',
            value: 1
          });
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error('Waitlist signup error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getStats = useCallback(async () => {
    try {
      const waitlistStats = await waitlistService.getWaitlistStats();
      setStats(waitlistStats);
    } catch (err) {
      console.error('Error fetching waitlist stats:', err);
    }
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setIsSubmitted(false);
    setError(null);
    setSuccessMessage(null);
  }, []);

  return {
    isLoading,
    isSubmitted,
    error,
    successMessage,
    stats,
    addToWaitlist,
    getStats,
    reset
  };
};