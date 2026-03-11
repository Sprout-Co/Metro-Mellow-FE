import { useState, useEffect, useMemo, useCallback } from "react";
import { TimeSlot, User } from "@/graphql/api";
import { formatDateToLocalString, getTomorrowDate } from "@/utils/slotHelpers";

export interface CheckoutFormData {
  date: string;
  timeSlot: TimeSlot;
  serviceArea: string;
  address: string;
  notes?: string;
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  handleDateSelect: (date: Date) => void;
  handleTimeSlotSelect: (timeSlot: TimeSlot) => void;
  handleAddressSelect: (address: string, serviceArea: string) => void;
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
      serviceArea: "",
      address: user?.defaultAddress ?? "",
      notes: "",
    };
  }, [user]);

  const [formData, setFormData] =
    useState<CheckoutFormData>(getInitialFormData());
  const [isNewAddress, setIsNewAddress] = useState(!user?.addresses?.length);

  // Update form data when user changes
  useEffect(() => {
    if (user?.defaultAddress) {
      setFormData((prev) => ({
        ...prev,
        address: user.defaultAddress ?? "",
        serviceArea: "",
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
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
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
    (address: string, serviceArea: string) => {
      setFormData((prev) => ({
        ...prev,
        address,
        serviceArea,
      }));
    },
    [],
  );

  // Reset form to initial state
  const resetForm = useCallback(() => {
    setFormData(getInitialFormData());
    setIsNewAddress(!user?.addresses?.length);
  }, [getInitialFormData, user]);

  // Calculate delivery cost based on selected address
  const deliveryCost = useMemo(() => {
    if (formData.address && user?.addresses) {
      const selectedAddress = user.addresses.find(
        (addr) => addr === formData.address,
      );
      return 0; //TODO: Decide later if we want to charge for delivery or not
      // return selectedAddress?.serviceArea?.deliveryCost ?? 0;
    }
    // return user?.defaultAddress?.serviceArea?.deliveryCost ?? 0;
    return 0; //TODO: Decide later if we want to charge for delivery or not
  }, [formData.address, user?.addresses, user?.defaultAddress]);

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
