// components/auth/FormInput.tsx
import { ChangeEvent, FocusEvent, useState } from "react";
import styles from "./AuthLayout.module.scss";

interface FormInputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  placeholder?: string;
  icon?: React.ReactNode;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  id,
  name,
  type,
  label,
  value,
  placeholder,
  icon,
  required = false,
  error,
  autoComplete,
  onChange,
  onFocus,
  onBlur,
}: FormInputProps) {
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    if (onFocus) onFocus(e);
  };
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    if (onBlur) onBlur(e);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const inputType = type === "password" && passwordVisible ? "text" : type;

  return (
    <div className={styles.formInput}>
      <label htmlFor={id} className={styles.formInput__label}>
        {label}
        {required && <span className={styles.formInput__required}>*</span>}
      </label>

      <div
        className={`
          ${styles.formInput__wrapper} 
          ${focused ? styles["formInput__wrapper--focused"] : ""} 
          ${error ? styles["formInput__wrapper--error"] : ""}
        `}
      >
        {icon && <div className={styles.formInput__icon}>{icon}</div>}

        <input
          id={id}
          type={inputType}
          name={name}
          value={value}
          placeholder={placeholder}
          className={styles.formInput__input}
          required={required}
          autoComplete={autoComplete}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {type === "password" && (
          <button
            type="button"
            className={styles.formInput__passwordToggle}
            onClick={togglePasswordVisibility}
            tabIndex={-1}
          >
            {passwordVisible ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 3L21 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      {error && <p className={styles.formInput__error}>{error}</p>}
    </div>
  );
}
