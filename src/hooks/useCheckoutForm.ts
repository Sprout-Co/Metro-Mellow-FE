import { useState, useEffect, useMemo, useCallback } from "react";
import { TimeSlot, User } from "@/graphql/api";
import {
  formatDateToLocalString,
  getTomorrowDate,
} from "@/utils/slotHelpers";

export interface CheckoutFormData {
  date: string;
  timeSlot: TimeSlot;
  city: string;
  street: string;
  addressId?: string;
}

interface UseCheckoutFormOptions {
  user: User | null;
  isOpen: boolean;
}

interface UseCheckoutFormReturn {
  formData: CheckoutFormData;
  isNewAddress: boolean;
  deliveryCost: number;
  setFormData: React.Dispatch<React.SetStateAction<CheckoutFormData>>;
  setIsNewAddress: (value: boolean) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleDateSelect: (date: Date) => void;
  handleTimeSlotSelect: (timeSlot: TimeSlot) => void;
  handleAddressSelect: (addressId: string, city: string, street: string) => void;
  resetForm: () => void;
}

export const useCheckoutForm = ({
  user,
  isOpen,
}: UseCheckoutFormOptions): UseCheckoutFormReturn => {
  // Initialize form data with user's default address or empty values
  const getInitialFormData = useCallback((): CheckoutFormData => {
    return {
      date: formatDateToLocalString(getTomorrowDate()),
      timeSlot: TimeSlot.Morning,
      city: user?.defaultAddress?.city ?? "",
      street: user?.defaultAddress?.street ?? "",
      addressId: user?.defaultAddress?.id,
    };
  }, [user]);

  const [formData, setFormData] = useState<CheckoutFormData>(getInitialFormData());
  const [isNewAddress, setIsNewAddress] = useState(!user?.addresses?.length);

  // Update form data when user changes
  useEffect(() => {
    if (user?.defaultAddress) {
      setFormData((prev) => ({
        ...prev,
        addressId: user.defaultAddress?.id,
        city: user.defaultAddress?.city ?? "",
        street: user.defaultAddress?.street ?? "",
      }));
    }
  }, [user]);

  // Reset date to tomorrow when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        date: formatDateToLocalString(getTomorrowDate()),
      }));
    }
  }, [isOpen]);

  // Handle input changes
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  // Handle date selection
  const handleDateSelect = useCallback((date: Date) => {
    const dateString = formatDateToLocalString(date);
    setFormData((prev) => ({
      ...prev,
      date: dateString,
    }));
  }, []);

  // Handle time slot selection
  const handleTimeSlotSelect = useCallback((timeSlot: TimeSlot) => {
    setFormData((prev) => ({
      ...prev,
      timeSlot,
    }));
  }, []);

  // Handle address selection
  const handleAddressSelect = useCallback(
    (addressId: string, city: string, street: string) => {
      setFormData((prev) => ({
        ...prev,
        addressId,
        city,
        street,
      }));
    },
    []
  );

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setFormData(getInitialFormData());
    setIsNewAddress(!user?.addresses?.length);
  }, [getInitialFormData, user]);

  // Calculate delivery cost based on selected address
  const deliveryCost = useMemo(() => {
    if (formData.addressId && user?.addresses) {
      const selectedAddress = user.addresses.find(
        (addr) => addr?.id === formData.addressId
      );
      return selectedAddress?.serviceArea?.deliveryCost ?? 0;
    }
    return user?.defaultAddress?.serviceArea?.deliveryCost ?? 0;
  }, [formData.addressId, user?.addresses, user?.defaultAddress]);

  return {
    formData,
    isNewAddress,
    deliveryCost,
    setFormData,
    setIsNewAddress,
    handleInputChange,
    handleDateSelect,
    handleTimeSlotSelect,
    handleAddressSelect,
    resetForm,
  };
};

