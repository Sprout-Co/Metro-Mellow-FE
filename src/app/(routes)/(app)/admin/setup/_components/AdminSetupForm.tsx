'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import FormInput from '../../../get-started/_components/FormInput';
import styles from '../../../get-started/_components/AuthLayout.module.scss';
import { useAdminOperations } from '@/graphql/hooks/admin/useAdminOperations';
import { useAuthStore } from '@/store/slices/auth';
import { Routes } from '@/constants/routes';

interface AdminSetupFormState {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function AdminSetupForm() {
  const [formData, setFormData] = useState<AdminSetupFormState>({
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [validatingToken, setValidatingToken] = useState(true);
  const [invitation, setInvitation] = useState<any>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const { handleGetAdminInvitation, handleAcceptAdminInvitation } = useAdminOperations();
  const { login } = useAuthStore();

  // Validate token on component mount
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setErrors({ general: 'Invalid invitation link. No token provided.' });
        setValidatingToken(false);
        return;
      }

      try {
        const invitationData = await handleGetAdminInvitation(token);
        
        if (!invitationData) {
          setErrors({ general: 'Invalid or expired invitation link.' });
          setValidatingToken(false);
          return;
        }

        if (invitationData.isUsed) {
          setErrors({ general: 'This invitation has already been used.' });
          setValidatingToken(false);
          return;
        }

        // Check if invitation is expired
        const expirationDate = new Date(invitationData.expiresAt);
        const now = new Date();
        if (expirationDate < now) {
          setErrors({ general: 'This invitation has expired.' });
          setValidatingToken(false);
          return;
        }

        setInvitation(invitationData);
        setValidatingToken(false);
      } catch (error) {
        console.error('Token validation error:', error);
        setErrors({ 
          general: error instanceof Error ? error.message : 'Failed to validate invitation link.' 
        });
        setValidatingToken(false);
      }
    };

    validateToken();
  }, [token, handleGetAdminInvitation]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must include uppercase, lowercase and a number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the error for this field when user changes it
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any previous general error
    setErrors({ ...errors, general: undefined });

    if (!validateForm() || !token) {
      return;
    }

    setLoading(true);

    try {
      const result = await handleAcceptAdminInvitation({
        invitationToken: token,
        password: formData.password,
      });

      if (result?.success && result.user && result.token) {
        // Store auth data
        login(result.user as any, result.token);

        // Redirect to admin dashboard
        if (typeof window !== 'undefined') {
          window.location.href = Routes.ADMIN_DASHBOARD;
        }
      } else {
        throw new Error(result?.message || 'Failed to accept invitation');
      }
    } catch (error) {
      console.error('Admin setup error:', error);

      const err = error as Error;
      setErrors({
        ...errors,
        general: err.message || 'Failed to set up admin account. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = (): {
    strength: 'weak' | 'medium' | 'strong';
    percentage: number;
  } => {
    if (!formData.password) {
      return { strength: 'weak', percentage: 0 };
    }

    let score = 0;

    // Length check
    if (formData.password.length >= 8) score += 1;
    if (formData.password.length >= 12) score += 1;

    // Complexity checks
    if (/[A-Z]/.test(formData.password)) score += 1;
    if (/[a-z]/.test(formData.password)) score += 1;
    if (/[0-9]/.test(formData.password)) score += 1;
    if (/[^A-Za-z0-9]/.test(formData.password)) score += 1;

    // Calculate percentage and strength
    const percentage = Math.min(100, Math.round((score / 6) * 100));

    let strength: 'weak' | 'medium' | 'strong' = 'weak';
    if (percentage >= 70) strength = 'strong';
    else if (percentage >= 40) strength = 'medium';

    return { strength, percentage };
  };

  const { strength, percentage } = passwordStrength();

  if (validatingToken) {
    return (
      <div className={styles.registerForm}>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Validating invitation...</p>
        </div>
      </div>
    );
  }

  if (!invitation || errors.general) {
    return (
      <div className={styles.registerForm}>
        <div className="text-center">
          <div className="mb-6">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto text-red-500"
            >
              <path
                d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 className={styles.registerForm__title}>Invitation Invalid</h1>
          <p className={styles.registerForm__subtitle}>
            {errors.general}
          </p>
          <button
            onClick={() => router.push(Routes.GET_STARTED)}
            className={`${styles.registerForm__button} mt-6`}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.registerForm}>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className={styles.registerForm__title}>Complete Admin Setup</h1>
        <p className={styles.registerForm__subtitle}>
          Welcome {invitation.firstName} {invitation.lastName}! Set up your admin account.
        </p>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm text-gray-700">
            <p><strong>Email:</strong> {invitation.email}</p>
            <p><strong>Role:</strong> {invitation.role}</p>
            <p><strong>Invited by:</strong> {invitation.invitedByName}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {errors.general && (
            <div className={styles.registerForm__error}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              {errors.general}
            </div>
          )}

          <FormInput
            id="admin-password"
            name="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a secure password"
            required
            error={errors.password}
            autoComplete="new-password"
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />

          {formData.password && (
            <div className={styles.registerForm__passwordStrength}>
              <div className={styles.registerForm__passwordStrengthBar}>
                <div
                  className={`
                    ${styles.registerForm__passwordStrengthIndicator} 
                    ${styles[`registerForm__passwordStrengthIndicator--${strength}`]}
                  `}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className={styles.registerForm__passwordStrengthText}>
                Password strength:{' '}
                <span
                  className={
                    styles[`registerForm__passwordStrengthLabel--${strength}`]
                  }
                >
                  {strength}
                </span>
              </div>
            </div>
          )}

          <FormInput
            id="admin-confirm-password"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
            error={errors.confirmPassword}
            autoComplete="new-password"
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />

          <motion.button
            type="submit"
            className={styles.registerForm__button}
            disabled={loading}
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
          >
            {loading ? (
              <>
                <div className={styles.registerForm__buttonSpinner}></div>
                Setting up account...
              </>
            ) : (
              'Complete Setup'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}