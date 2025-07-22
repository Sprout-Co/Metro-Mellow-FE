"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminDashboardLayout from "../../_components/AdminDashboardLayout/AdminDashboardLayout";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import { useServiceOperations } from "@/graphql/hooks/services/useServiceOperations";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import CustomerSelectionSection from "./_components/CustomerSelectionSection/CustomerSelectionSection";
import ServiceSelectionSection from "./_components/ServiceSelectionSection/ServiceSelectionSection";
import ServiceDetailsSection from "./_components/ServiceDetailsSection/ServiceDetailsSection";
import ScheduleSection from "./_components/ScheduleSection/ScheduleSection";
import PriceSummarySection from "./_components/PriceSummarySection/PriceSummarySection";
import ErrorDisplay from "./_components/ErrorDisplay/ErrorDisplay";
import FormActions from "./_components/FormActions/FormActions";
import { Icon } from "@/components/ui/Icon/Icon";
import {
  ServiceCategory,
  ServiceStatus,
  TimeSlot,
  Service,
  ServiceOption,
  HouseType,
  RoomQuantitiesInput,
  ServiceId,
  Severity,
  TreatmentType,
  CreateBookingInput,
  User,
  UserRole,
} from "@/graphql/api";
import styles from "./AddBooking.module.scss";

export default function AddBookingPage() {
  const router = useRouter();
  const { handleCreateBooking } = useBookingOperations();
  const { handleGetServices } = useServiceOperations();
  const { handleGetUsers } = useAuthOperations();

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Section loading states
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [isLoadingServices, setIsLoadingServices] = useState(false);

  // Data state
  const [customers, setCustomers] = useState<User[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  // Form state
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [customerSearchQuery, setCustomerSearchQuery] = useState("");

  // Service details state
  const [propertyType, setPropertyType] = useState<HouseType>(HouseType.Flat);
  const [roomQuantities, setRoomQuantities] = useState<RoomQuantitiesInput>({
    balcony: 0,
    bathroom: 1,
    bedroom: 1,
    kitchen: 1,
    livingRoom: 1,
    lobby: 1,
    other: 0,
    outdoor: 0,
    studyRoom: 0,
  });
  const [laundryBags, setLaundryBags] = useState<number>(1);
  const [severity, setSeverity] = useState<Severity>(Severity.Medium);
  const [treatmentType, setTreatmentType] = useState<TreatmentType>(
    TreatmentType.Residential
  );

  // Schedule state
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState<TimeSlot | "">("");
  const [notes, setNotes] = useState("");

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setIsLoadingCustomers(true);
        setIsLoadingServices(true);

        const [customersData, servicesData] = await Promise.all([
          handleGetUsers(UserRole.Customer),
          handleGetServices(undefined, ServiceStatus.Active),
        ]);

        setCustomers((customersData as User[]) || []);
        setServices(
          (servicesData || []).filter(
            (service) => service.category !== ServiceCategory.Cooking
          )
        );
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setIsLoading(false);
        setIsLoadingCustomers(false);
        setIsLoadingServices(false);
      }
    };

    fetchData();
  }, [handleGetUsers, handleGetServices]);

  // Computed values
  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);
  const selectedService = services.find((s) => s._id === selectedServiceId);
  const selectedOption = selectedService?.options?.find(
    (o) => o.id === selectedOptionId
  );

  // Calculate total price
  const calculateTotalPrice = useCallback(() => {
    if (!selectedService) return 0;

    let totalPrice = selectedService.price;

    switch (selectedService.category) {
      case ServiceCategory.Cleaning: {
        const roomPrices = selectedService.roomPrices || {};
        const roomTotal = Object.entries(roomQuantities).reduce(
          (total, [room, quantity]) => {
            const roomPrice = roomPrices[room as keyof typeof roomPrices] || 0;
            return total + roomPrice * (quantity as number);
          },
          0
        );

        let cleaningTypeMultiplier = 1;
        switch (selectedOption?.service_id) {
          case ServiceId.StandardCleaning:
            cleaningTypeMultiplier = 1;
            break;
          case ServiceId.DeepCleaning:
            cleaningTypeMultiplier = 2.5;
            break;
          case ServiceId.PostConstructionCleaning:
            cleaningTypeMultiplier = 4;
            break;
          case ServiceId.MoveInMoveOutCleaning:
            cleaningTypeMultiplier = 2.5;
            break;
        }

        totalPrice = roomTotal * cleaningTypeMultiplier;
        if (propertyType === HouseType.Duplex) {
          totalPrice *= 1.5;
        }
        break;
      }
      case ServiceCategory.Laundry: {
        const basePrice = selectedOption?.price || selectedService.price;
        totalPrice = laundryBags * basePrice;
        break;
      }
      case ServiceCategory.PestControl: {
        const basePrice = selectedOption?.price || selectedService.price;
        const severityMultiplier = {
          [Severity.Low]: 1,
          [Severity.Medium]: 1.2,
          [Severity.High]: 1.5,
        };
        const treatmentMultiplier = {
          [TreatmentType.Residential]: 1,
          [TreatmentType.Commercial]: 1.5,
        };
        totalPrice =
          basePrice *
          severityMultiplier[severity] *
          treatmentMultiplier[treatmentType];
        break;
      }
      default:
        totalPrice = selectedService.price;
        break;
    }

    return totalPrice;
  }, [
    selectedService,
    selectedOption,
    roomQuantities,
    laundryBags,
    severity,
    treatmentType,
    propertyType,
  ]);

  const calculatedPrice = calculateTotalPrice();

  // Form validation
  const isValid = useCallback(() => {
    if (
      !selectedCustomerId ||
      !selectedServiceId ||
      !selectedDate ||
      !selectedTime
    ) {
      return false;
    }

    // Check if service requires option selection
    if (
      selectedService &&
      (selectedService.service_id === ServiceId.Cleaning ||
        selectedService.service_id === ServiceId.Laundry ||
        selectedService.service_id === ServiceId.PestControl) &&
      selectedService.options &&
      selectedService.options.length > 0 &&
      !selectedOptionId
    ) {
      return false;
    }

    // Check if cleaning service has at least one room selected
    if (
      selectedService?.service_id === ServiceId.Cleaning &&
      Object.values(roomQuantities).every((qty) => Number(qty) === 0)
    ) {
      return false;
    }

    return true;
  }, [
    selectedCustomerId,
    selectedServiceId,
    selectedDate,
    selectedTime,
    selectedService,
    selectedOptionId,
    roomQuantities,
  ]);

  // Room quantity handlers
  const updateRoomQuantity = useCallback(
    (room: keyof RoomQuantitiesInput, increment: boolean) => {
      setRoomQuantities((prev) => ({
        ...prev,
        [room]: Math.max(0, (prev[room] as number) + (increment ? 1 : -1)),
      }));
    },
    []
  );

  // Submit booking
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !selectedCustomer ||
      !selectedService ||
      !selectedDate ||
      !selectedTime
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const getServiceType = (serviceId: string): ServiceCategory => {
        switch (serviceId) {
          case ServiceId.Cleaning:
            return ServiceCategory.Cleaning;
          case ServiceId.Laundry:
            return ServiceCategory.Laundry;
          case ServiceId.PestControl:
          case ServiceId.PestControlResidential:
          case ServiceId.PestControlCommercial:
            return ServiceCategory.PestControl;
          default:
            return ServiceCategory.Cleaning;
        }
      };

      const bookingData: CreateBookingInput = {
        serviceId: selectedService._id,
        serviceType: getServiceType(selectedService.service_id),
        serviceOption: selectedOption?.service_id || ("" as string),
        date: new Date(selectedDate),
        timeSlot: selectedTime as TimeSlot,
        address: selectedCustomer.defaultAddress?.id || "",
        notes: notes,
        serviceDetails: {
          serviceOption: selectedOption?.service_id || ("" as string),
          cleaning:
            selectedService.service_id === ServiceId.Cleaning
              ? {
                  cleaningType: selectedOption?.service_id as unknown as any,
                  houseType: propertyType,
                  rooms: roomQuantities,
                }
              : undefined,
          laundry:
            selectedService.service_id === ServiceId.Laundry
              ? {
                  bags: laundryBags,
                  laundryType: selectedOption?.service_id as unknown as any,
                }
              : undefined,
          pestControl:
            selectedService.service_id === ServiceId.PestControl ||
            selectedService.service_id === ServiceId.PestControlResidential ||
            selectedService.service_id === ServiceId.PestControlCommercial
              ? {
                  areas: ["living room", "kitchen", "bathroom"],
                  severity: severity,
                  treatmentType: treatmentType,
                }
              : undefined,
        },
        totalPrice: calculatedPrice,
      };

      await handleCreateBooking(bookingData);
      router.push("/admin/bookings");
    } catch (error) {
      console.error("Failed to create booking:", error);
      setError(
        error instanceof Error ? error.message : "Failed to create booking"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearError = () => setError(null);

  if (isLoading) {
    return (
      <AdminDashboardLayout
        title="Add Booking"
        breadcrumbs={[
          { label: "Home", path: "/admin" },
          { label: "Bookings", path: "/admin/bookings" },
          { label: "Add Booking", path: "/admin/bookings/add" },
        ]}
      >
        <div className={styles.add_booking__loading}>
          <Icon name="loader" size={32} />
          <p>Loading booking form...</p>
        </div>
      </AdminDashboardLayout>
    );
  }

  return (
    <AdminDashboardLayout
      title="Add Booking"
      breadcrumbs={[
        { label: "Home", path: "/admin" },
        { label: "Bookings", path: "/admin/bookings" },
        { label: "Add Booking", path: "/admin/bookings/add" },
      ]}
    >
      <div className={styles.add_booking}>
        <div className={styles.add_booking__header}>
          <div className={styles.add_booking__title_area}>
            <h2 className={styles.add_booking__title}>Create New Booking</h2>
            <p className={styles.add_booking__subtitle}>
              Add a new service booking for a customer
            </p>
          </div>
        </div>

        <ErrorDisplay error={error} onClear={clearError} />

        <form onSubmit={handleSubmit}>
          <div className={styles.add_booking__form_grid}>
            <CustomerSelectionSection
              customers={customers}
              selectedCustomerId={selectedCustomerId}
              customerSearchQuery={customerSearchQuery}
              onCustomerSelect={setSelectedCustomerId}
              onSearchQueryChange={setCustomerSearchQuery}
              isLoading={isLoadingCustomers}
            />

            <ServiceSelectionSection
              services={services}
              selectedServiceId={selectedServiceId}
              selectedOptionId={selectedOptionId}
              onServiceSelect={(id) => {
                setSelectedServiceId(id);
                setSelectedOptionId(""); // Reset option when service changes
              }}
              onOptionSelect={setSelectedOptionId}
              isLoading={isLoadingServices}
            />

            <ServiceDetailsSection
              selectedService={selectedService}
              propertyType={propertyType}
              roomQuantities={roomQuantities}
              laundryBags={laundryBags}
              severity={severity}
              treatmentType={treatmentType}
              onPropertyTypeChange={setPropertyType}
              onRoomQuantityChange={updateRoomQuantity}
              onLaundryBagsChange={setLaundryBags}
              onSeverityChange={setSeverity}
              onTreatmentTypeChange={setTreatmentType}
            />

            <ScheduleSection
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              notes={notes}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
              onNotesChange={setNotes}
            />

            <PriceSummarySection
              selectedService={selectedService}
              selectedOption={selectedOption}
              calculatedPrice={calculatedPrice}
            />
          </div>

          <FormActions
            isValid={isValid()}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />
        </form>
      </div>
    </AdminDashboardLayout>
  );
}
