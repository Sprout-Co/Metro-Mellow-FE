// components/auth/AuthForm.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "./AuthForm.module.scss";
import { useAuthOperations } from "@/hooks/useAuthOperations";

type AuthMode = "login" | "register" | "verify";

export default function AuthForm() {
  console.log("AuthForm component rendering");
  const { handleLogin, handleRegister, handleLogout } = useAuthOperations();
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [activeVerificationIndex, setActiveVerificationIndex] = useState(0);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError(null);
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setRegisterData({
      ...registerData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError(null);
  };

  const handleVerificationChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste of the entire code
      const pasteData = value.slice(0, 6).split("");
      const newVerificationCode = [...verificationCode];

      pasteData.forEach((char, i) => {
        if (i < 6) {
          newVerificationCode[i] = char;
        }
      });

      setVerificationCode(newVerificationCode);

      // Focus on the last field or submit if all filled
      const lastFilledIndex = Math.min(5, pasteData.length - 1);
      setActiveVerificationIndex(lastFilledIndex);

      if (pasteData.length >= 6) {
        // All codes filled from paste, auto-verify
        console.log(
          "Verification code submitted:",
          newVerificationCode.join("")
        );
      }
    } else {
      // Handle single digit input
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);

      // Auto-focus next input if current one is filled
      if (value !== "" && index < 5) {
        setActiveVerificationIndex(index + 1);
      }
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleLoginSubmit called");
    console.log("Current form state:", loginData);

    if (!loginData.email || !loginData.password) {
      console.log("Form validation failed: missing required fields");
      setError("Please fill in all required fields");
      return;
    }

    setError(null);
    try {
      console.log("Attempting login with:", { email: loginData.email });
      await handleLogin(loginData.email, loginData.password);
    } catch (err) {
      console.error("Login error in form:", err);
      setError("Invalid email or password");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!registerData.agreeTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    try {
      await handleRegister({
        email: registerData.email,
        password: registerData.password,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
      });
      setRegisteredEmail(registerData.email);
      setAuthMode("verify");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = verificationCode.join("");
    console.log("Verification code submitted:", code);

    // In a real app, you would verify the code with an API call
    // For demo, we'll just log it and go back to login
    setTimeout(() => {
      setAuthMode("login");
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // In a real app, you would handle social login here
  };

  const handleResendCode = () => {
    console.log("Resend verification code to:", registeredEmail);
    // In a real app, you would call an API to resend the code
  };

  return (
    <section className={styles.auth}>
      <div className={styles.auth__container}>
        <div className={styles.auth__wrapper}>
          <div className={styles.auth__card}>
            <Link href="/" className={styles.auth__logo}>
              <Image
                src="/images/logo.svg"
                alt="Metro Mellow"
                width={180}
                height={50}
              />
            </Link>

            {error && <div className={styles.auth__error}>{error}</div>}

            <AnimatePresence mode="wait">
              {authMode === "login" && (
                <motion.div
                  className={styles.auth__form}
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className={styles.auth__title}>Welcome Back</h1>
                  <p className={styles.auth__subtitle}>
                    Sign in to continue to Metro Mellow
                  </p>

                  <div className={styles.auth__social}>
                    <button
                      type="button"
                      className={styles.auth__socialButton}
                      onClick={() => handleSocialLogin("google")}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                          fill="#4285F4"
                        />
                      </svg>
                      Continue with Google
                    </button>

                    <button
                      type="button"
                      className={styles.auth__socialButton}
                      onClick={() => handleSocialLogin("apple")}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.05 20.28c-.98.95-2.05.86-3.08.44-1.09-.44-2.09-.48-3.24 0-1.44.61-2.19.43-3.05-.44C2.18 14.86 3.15 6.28 9.08 6c1.18.09 2.03.69 2.78.57.67-.09 1.9-.73 3.41-.62.58.03 2.21.24 3.26 1.8-2.31 1.49-1.93 4.75.48 5.86-.87 2.31-2.01 4.64-2.96 5.67zM12.03 5.95c-.12-2.28 1.69-4.32 3.72-4.42.31 2.5-1.77 4.46-3.72 4.42z"
                          fill="#000000"
                        />
                      </svg>
                      Continue with Apple
                    </button>
                  </div>

                  <div className={styles.auth__divider}>
                    <span className={styles.auth__dividerText}>or</span>
                  </div>

                  <form onSubmit={handleLoginSubmit}>
                    <div className={styles.auth__inputGroup}>
                      <label className={styles.auth__label}>
                        Email Address
                      </label>
                      <div className={styles.auth__inputWrapper}>
                        <input
                          type="email"
                          className={styles.auth__input}
                          name="email"
                          value={loginData.email}
                          onChange={handleLoginChange}
                          placeholder="Your email"
                          required
                        />
                        <svg
                          className={styles.auth__inputIcon}
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 6L12 13L2 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className={styles.auth__inputGroup}>
                      <div className={styles.auth__labelFlex}>
                        <label className={styles.auth__label}>Password</label>
                        <Link
                          href="/forgot-password"
                          className={styles.auth__labelLink}
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      <div className={styles.auth__inputWrapper}>
                        <input
                          type="password"
                          className={styles.auth__input}
                          name="password"
                          value={loginData.password}
                          onChange={handleLoginChange}
                          placeholder="Your password"
                          required
                        />
                        <svg
                          className={styles.auth__inputIcon}
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
                      </div>
                    </div>

                    <div className={styles.auth__checkGroup}>
                      <label className={styles.auth__checkbox}>
                        <input
                          type="checkbox"
                          name="rememberMe"
                          checked={loginData.rememberMe}
                          onChange={handleLoginChange}
                        />
                        <span className={styles.auth__checkmark}></span>
                        <span>Remember me</span>
                      </label>
                    </div>

                    <motion.button
                      type="submit"
                      className={styles.auth__button}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign In
                    </motion.button>
                  </form>

                  <div className={styles.auth__switch}>
                    Don't have an account?
                    <button
                      type="button"
                      className={styles.auth__switchLink}
                      onClick={() => setAuthMode("register")}
                    >
                      Sign Up
                    </button>
                  </div>
                </motion.div>
              )}

              {authMode === "register" && (
                <motion.div
                  className={styles.auth__form}
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className={styles.auth__title}>Create Account</h1>
                  <p className={styles.auth__subtitle}>
                    Join Metro Mellow today
                  </p>

                  <form onSubmit={handleRegisterSubmit}>
                    <div className={styles.auth__inputGroup}>
                      <label className={styles.auth__label}>First Name</label>
                      <div className={styles.auth__inputWrapper}>
                        <input
                          type="text"
                          className={styles.auth__input}
                          name="firstName"
                          value={registerData.firstName}
                          onChange={handleRegisterChange}
                          placeholder="Your first name"
                          required
                        />
                        <svg
                          className={styles.auth__inputIcon}
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.9391 15 5.9217 15.4214 5.1716 16.1716C4.4214 16.9217 4 17.9391 4 19V21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className={styles.auth__inputGroup}>
                      <label className={styles.auth__label}>Last Name</label>
                      <div className={styles.auth__inputWrapper}>
                        <input
                          type="text"
                          className={styles.auth__input}
                          name="lastName"
                          value={registerData.lastName}
                          onChange={handleRegisterChange}
                          placeholder="Your last name"
                          required
                        />
                        <svg
                          className={styles.auth__inputIcon}
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.9391 15 5.9217 15.4214 5.1716 16.1716C4.4214 16.9217 4 17.9391 4 19V21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className={styles.auth__inputGroup}>
                      <label className={styles.auth__label}>
                        Email Address
                      </label>
                      <div className={styles.auth__inputWrapper}>
                        <input
                          type="email"
                          className={styles.auth__input}
                          name="email"
                          value={registerData.email}
                          onChange={handleRegisterChange}
                          placeholder="Your email"
                          required
                        />
                        <svg
                          className={styles.auth__inputIcon}
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 6L12 13L2 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className={styles.auth__inputGroup}>
                      <label className={styles.auth__label}>Password</label>
                      <div className={styles.auth__inputWrapper}>
                        <input
                          type="password"
                          className={styles.auth__input}
                          name="password"
                          value={registerData.password}
                          onChange={handleRegisterChange}
                          placeholder="Create a password"
                          required
                        />
                        <svg
                          className={styles.auth__inputIcon}
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
                      </div>
                    </div>

                    <div className={styles.auth__inputGroup}>
                      <label className={styles.auth__label}>
                        Confirm Password
                      </label>
                      <div className={styles.auth__inputWrapper}>
                        <input
                          type="password"
                          className={styles.auth__input}
                          name="confirmPassword"
                          value={registerData.confirmPassword}
                          onChange={handleRegisterChange}
                          placeholder="Confirm your password"
                          required
                        />
                        <svg
                          className={styles.auth__inputIcon}
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
                      </div>
                    </div>

                    <div className={styles.auth__checkGroup}>
                      <label className={styles.auth__checkbox}>
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={registerData.agreeTerms}
                          onChange={handleRegisterChange}
                        />
                        <span className={styles.auth__checkmark}></span>
                        <span>
                          I agree to the{" "}
                          <Link href="/terms" className={styles.auth__link}>
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className={styles.auth__link}>
                            Privacy Policy
                          </Link>
                        </span>
                      </label>
                    </div>

                    <motion.button
                      type="submit"
                      className={styles.auth__button}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Create Account
                    </motion.button>
                  </form>

                  <div className={styles.auth__switch}>
                    Already have an account?
                    <button
                      type="button"
                      className={styles.auth__switchLink}
                      onClick={() => setAuthMode("login")}
                    >
                      Sign In
                    </button>
                  </div>
                </motion.div>
              )}

              {authMode === "verify" && (
                <motion.div
                  className={styles.auth__form}
                  key="verify"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className={styles.auth__title}>Verify Your Email</h1>
                  <p className={styles.auth__subtitle}>
                    We've sent a verification code to {registeredEmail}
                  </p>

                  <form onSubmit={handleVerificationSubmit}>
                    <div className={styles.auth__verification}>
                      {verificationCode.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handleVerificationChange(index, e.target.value)
                          }
                          className={styles.auth__verificationInput}
                          autoFocus={index === activeVerificationIndex}
                        />
                      ))}
                    </div>

                    <motion.button
                      type="submit"
                      className={styles.auth__button}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Verify Email
                    </motion.button>

                    <button
                      type="button"
                      className={styles.auth__resend}
                      onClick={handleResendCode}
                    >
                      Resend Code
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={styles.auth__imageWrapper}>
            <div className={styles.auth__image}>
              <h2 className={styles.auth__imageTitle}>
                Experience the Metro Mellow Difference
              </h2>
              <p className={styles.auth__imageText}>
                Join thousands of satisfied customers enjoying premium home
                services
              </p>

              <div className={styles.auth__stats}>
                <div className={styles.auth__statItem}>
                  <div className={styles.auth__statNumber}>15k+</div>
                  <div className={styles.auth__statLabel}>Happy Customers</div>
                </div>
                <div className={styles.auth__statItem}>
                  <div className={styles.auth__statNumber}>50k+</div>
                  <div className={styles.auth__statLabel}>
                    Services Completed
                  </div>
                </div>
                <div className={styles.auth__statItem}>
                  <div className={styles.auth__statNumber}>4.9</div>
                  <div className={styles.auth__statLabel}>Star Rating</div>
                </div>
              </div>

              <div className={styles.auth__testimonials}>
                <div className={styles.auth__testimonial}>
                  <p className={styles.auth__testimonialText}>
                    "Metro Mellow transformed our home care experience with
                    their reliable and professional service!"
                  </p>
                  <div className={styles.auth__testimonialAuthor}>
                    <div className={styles.auth__testimonialName}>Sarah J.</div>
                    <div className={styles.auth__testimonialStars}>★★★★★</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
