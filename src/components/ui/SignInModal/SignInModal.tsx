import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Modal from "../Modal/Modal";
import styles from "./SignInModal.module.scss";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUp?: () => void;
  onSuccess?: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  onSignUp,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear errors on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal 
      isOpen={isOpen}
      onClose={onClose}
      showHeader={false}
      maxWidth="500px"
      className={styles.signInModal}
    >
      <div className={styles.signInModal__container}>
        <button className={styles.signInModal__close} onClick={onClose}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        
        <div className={styles.signInModal__content}>
          <div className={styles.signInModal__logo}>
            <Image 
              src="/images/brand/logo.jpeg" 
              alt="Metro Mellow"
              width={180}
              height={60}
              priority
            />
          </div>
          
          <h2 className={styles.signInModal__title}>
            Sign in with your work email
          </h2>
          <p className={styles.signInModal__subtitle}>
            Use your work email to sign in to your team workspace
          </p>
          
          <form onSubmit={handleSubmit} className={styles.signInModal__form}>
            <div className={styles.signInModal__formGroup}>
              <label htmlFor="email" className={styles.signInModal__label}>
                Email Address
              </label>
              <div className={styles.signInModal__inputWrapper}>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className={styles.signInModal__input}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="youremail@company.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className={styles.signInModal__error}>{errors.email}</p>
                )}
              </div>
            </div>
            
            <div className={styles.signInModal__formGroup}>
              <label htmlFor="password" className={styles.signInModal__label}>
                Password
              </label>
              <div className={styles.signInModal__inputWrapper}>
                <div className={styles.signInModal__passwordContainer}>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className={styles.signInModal__input}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className={styles.signInModal__passwordToggle}
                    onClick={togglePasswordVisibility}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {showPassword ? (
                        <path
                          d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      ) : (
                        <>
                          <path
                            d="M9.88 9.88C9.58 10.18 9.39 10.57 9.35 11C9.32 11.43 9.44 11.85 9.69 12.19C9.95 12.54 10.31 12.78 10.73 12.87C11.15 12.96 11.58 12.89 11.95 12.69"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M1 1L23 23M17.3 17.3C15.6 18.4 13.8 19 12 19C5 19 1 12 1 12C2.3 9.9 4 8.1 6 6.7M12 5C16.2 5 19.5 7.6 21 9.5C21 9.5 21 9.5 21 9.6C20.3 10.8 19.3 12.1 18 13.1"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
                {errors.password && (
                  <p className={styles.signInModal__error}>{errors.password}</p>
                )}
              </div>
            </div>
            
            <motion.button
              type="submit"
              className={styles.signInModal__button}
              disabled={loading}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <>
                  <div className={styles.signInModal__buttonSpinner}></div>
                  Signing In...
                </>
              ) : (
                "LOGIN"
              )}
            </motion.button>
          </form>
          
          <div className={styles.signInModal__signup}>
            <p>Don't have an account?</p>
            <button 
              type="button"
              onClick={onSignUp}
              className={styles.signInModal__signupLink}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SignInModal; 