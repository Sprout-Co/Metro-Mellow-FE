import { useState, useCallback, useEffect } from "react";
import { ValidationError, ValidationResult } from "../validation";

interface UseValidationOptions {
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  debounceMs?: number;
}

export const useValidation = (
  initialValues: any,
  validator: (values: any) => ValidationResult,
  options: UseValidationOptions = {}
) => {
  const {
    validateOnChange = true,
    validateOnBlur = true,
    debounceMs = 300,
  } = options;

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(true);

  // Debounced validation
  useEffect(() => {
    if (!validateOnChange) return;

    setIsValidating(true);
    const timer = setTimeout(() => {
      const result = validator(values);
      setErrors(result.errors);
      setIsValid(result.isValid);
      setIsValidating(false);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [values, validator, validateOnChange, debounceMs]);

  const handleChange = useCallback((field: string, value: any) => {
    setValues((prev: any) => ({ ...prev, [field]: value }));
  }, []);

  const handleBlur = useCallback(
    (field: string) => {
      setTouched((prev) => ({ ...prev, [field]: true }));

      if (validateOnBlur) {
        const result = validator(values);
        setErrors(result.errors);
        setIsValid(result.isValid);
      }
    },
    [values, validator, validateOnBlur]
  );

  const validateForm = useCallback(() => {
    const result = validator(values);
    setErrors(result.errors);
    setIsValid(result.isValid);

    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    return result;
  }, [values, validator]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors([]);
    setTouched({});
    setIsValid(true);
  }, [initialValues]);

  const getFieldError = useCallback(
    (field: string) => {
      return errors.find((error) => error.field === field)?.message;
    },
    [errors]
  );

  const isFieldTouched = useCallback(
    (field: string) => {
      return touched[field] || false;
    },
    [touched]
  );

  return {
    values,
    errors,
    touched,
    isValid,
    isValidating,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    getFieldError,
    isFieldTouched,
  };
};
