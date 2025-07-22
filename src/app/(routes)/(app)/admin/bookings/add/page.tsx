"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminDashboardLayout from "../../_components/AdminDashboardLayout/AdminDashboardLayout";
import styles from "./AddBooking.module.scss";
import Card from "../../_components/UI/Card/Card";
import Button from "../../_components/UI/Button/Button";
import { Icon } from "@/components/ui/Icon/Icon";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import { useServiceOperations } from "@/graphql/hooks/services/useServiceOperations";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
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

export default function AddBookingPage() {
  const router = useRouter();
  const { handleCreateBooking } = useBookingOperations();
  const { handleGetServices } = useServiceOperations();
  const { handleGetUsers } = useAuthOperations();

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      }
    };

    fetchData();
  }, [handleGetUsers, handleGetServices]);

  // Get selected entities
  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);
  const selectedService = services.find((s) => s._id === selectedServiceId);
  const selectedOption = selectedService?.options?.find(
    (o) => o.id === selectedOptionId
  );

  // Filter customers based on search
  const filteredCustomers = customers.filter((customer) => {
    if (!customerSearchQuery) return true;
    const fullName =
      `${customer.firstName || ""} ${customer.lastName || ""}`.toLowerCase();
    const email = customer.email.toLowerCase();
    const phone = customer.phone || "";
    const query = customerSearchQuery.toLowerCase();

    return (
      fullName.includes(query) || email.includes(query) || phone.includes(query)
    );
  });

  // Room quantity handlers
  const handleQuantityChange = (
    room: keyof RoomQuantitiesInput,
    increment: boolean
  ) => {
    setRoomQuantities((prev) => ({
      ...prev,
      [room]: Math.max(0, (prev[room] as number) + (increment ? 1 : -1)),
    }));
  };

  const handleLaundryBagChange = (increment: boolean) => {
    setLaundryBags((prev) => Math.max(1, prev + (increment ? 1 : -1)));
  };

  // Track price changes for animation
  const [previousPrice, setPreviousPrice] = useState(0);
  const [priceChanged, setPriceChanged] = useState(false);

  // Calculate total price
  const calculateTotalPrice = () => {
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
  };

  // Track price changes for animation
  useEffect(() => {
    const currentPrice = calculateTotalPrice();
    if (currentPrice !== previousPrice && previousPrice > 0) {
      setPriceChanged(true);
      setTimeout(() => setPriceChanged(false), 1000);
    }
    setPreviousPrice(currentPrice);
  }, [
    selectedService,
    selectedOption,
    roomQuantities,
    laundryBags,
    severity,
    treatmentType,
    propertyType,
  ]);

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
        totalPrice: calculateTotalPrice(),
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

  const isFormValid = () => {
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
  };

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
          <p>Loading...</p>
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

        {error && (
          <div className={styles.add_booking__error}>
            <Icon name="alert-triangle" />
            <span>{error}</span>
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.add_booking__form_grid}>
            {/* Customer Selection */}
            <Card className={styles.add_booking__section}>
              <h3 className={styles.add_booking__section_title}>
                <Icon name="user" />
                Customer
              </h3>

              <div className={styles.add_booking__search}>
                <Icon name="search" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={customerSearchQuery}
                  onChange={(e) => setCustomerSearchQuery(e.target.value)}
                  className={styles.add_booking__search_input}
                />
              </div>

              <div className={styles.add_booking__customer_list}>
                {filteredCustomers.map((customer) => (
                  <label
                    key={customer.id}
                    className={`${styles.add_booking__customer_option} ${
                      selectedCustomerId === customer.id ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="customer"
                      value={customer.id}
                      checked={selectedCustomerId === customer.id}
                      onChange={(e) => setSelectedCustomerId(e.target.value)}
                      className={styles.add_booking__radio}
                    />
                    <div className={styles.add_booking__customer_avatar}>
                      {customer.firstName?.charAt(0) || "N"}
                    </div>
                    <div className={styles.add_booking__customer_info}>
                      <div className={styles.add_booking__customer_name}>
                        {`${customer.firstName || ""} ${customer.lastName || ""}`.trim() ||
                          "N/A"}
                      </div>
                      <div className={styles.add_booking__customer_email}>
                        {customer.email}
                      </div>
                      {customer.phone && (
                        <div className={styles.add_booking__customer_phone}>
                          {customer.phone}
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </Card>

            {/* Service Selection */}
            <Card className={styles.add_booking__section}>
              <h3 className={styles.add_booking__section_title}>
                <Icon name="package" />
                Service
              </h3>

              <div className={styles.add_booking__field}>
                <label className={styles.add_booking__label}>
                  Service Type
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => {
                    setSelectedServiceId(e.target.value);
                    setSelectedOptionId(""); // Reset option when service changes
                  }}
                  className={styles.add_booking__select}
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.label} - {service.displayPrice}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Options */}
              {selectedService?.options &&
                selectedService.options.length > 0 && (
                  <div className={styles.add_booking__field}>
                    <label className={styles.add_booking__label}>
                      Service Option
                    </label>
                    <select
                      value={selectedOptionId}
                      onChange={(e) => setSelectedOptionId(e.target.value)}
                      className={styles.add_booking__select}
                    >
                      <option value="">Select an option</option>
                      {selectedService.options.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label} - From ₦{option.price.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
            </Card>

            {/* Service Details */}
            {selectedService && (
              <Card className={styles.add_booking__section}>
                <h3 className={styles.add_booking__section_title}>
                  <Icon name="settings" />
                  Service Details
                </h3>

                {/* Cleaning Details */}
                {selectedService.service_id === ServiceId.Cleaning && (
                  <>
                    <div className={styles.add_booking__field}>
                      <label className={styles.add_booking__label}>
                        Property Type
                      </label>
                      <div className={styles.add_booking__radio_group}>
                        <label className={styles.add_booking__radio_option}>
                          <input
                            type="radio"
                            name="propertyType"
                            value={HouseType.Flat}
                            checked={propertyType === HouseType.Flat}
                            onChange={(e) =>
                              setPropertyType(e.target.value as HouseType)
                            }
                          />
                          Flat / Apartment
                        </label>
                        <label className={styles.add_booking__radio_option}>
                          <input
                            type="radio"
                            name="propertyType"
                            value={HouseType.Duplex}
                            checked={propertyType === HouseType.Duplex}
                            onChange={(e) =>
                              setPropertyType(e.target.value as HouseType)
                            }
                          />
                          Duplex / House
                        </label>
                      </div>
                    </div>

                    <div className={styles.add_booking__field}>
                      <label className={styles.add_booking__label}>
                        Rooms to Clean
                      </label>
                      <div className={styles.add_booking__counter_grid}>
                        {Object.entries(roomQuantities).map(
                          ([room, quantity]) => (
                            <div
                              key={room}
                              className={styles.add_booking__counter}
                            >
                              <span
                                className={styles.add_booking__counter_label}
                              >
                                {room
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (str) => str.toUpperCase())}
                              </span>
                              <div
                                className={styles.add_booking__counter_controls}
                              >
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleQuantityChange(
                                      room as keyof RoomQuantitiesInput,
                                      false
                                    )
                                  }
                                  disabled={(quantity as number) <= 0}
                                  className={styles.add_booking__counter_btn}
                                >
                                  <Icon name="minus" />
                                </button>
                                <span
                                  className={styles.add_booking__counter_value}
                                >
                                  {quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleQuantityChange(
                                      room as keyof RoomQuantitiesInput,
                                      true
                                    )
                                  }
                                  className={styles.add_booking__counter_btn}
                                >
                                  <Icon name="plus" />
                                </button>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Laundry Details */}
                {selectedService.service_id === ServiceId.Laundry && (
                  <div className={styles.add_booking__field}>
                    <label className={styles.add_booking__label}>
                      Number of Laundry Bags
                    </label>
                    <div className={styles.add_booking__counter}>
                      <span className={styles.add_booking__counter_label}>
                        Bags (approx. 30 items each)
                      </span>
                      <div className={styles.add_booking__counter_controls}>
                        <button
                          type="button"
                          onClick={() => handleLaundryBagChange(false)}
                          disabled={laundryBags <= 1}
                          className={styles.add_booking__counter_btn}
                        >
                          <Icon name="minus" />
                        </button>
                        <span className={styles.add_booking__counter_value}>
                          {laundryBags}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleLaundryBagChange(true)}
                          className={styles.add_booking__counter_btn}
                        >
                          <Icon name="plus" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Pest Control Details */}
                {(selectedService.service_id === ServiceId.PestControl ||
                  selectedService.service_id ===
                    ServiceId.PestControlResidential ||
                  selectedService.service_id ===
                    ServiceId.PestControlCommercial) && (
                  <>
                    <div className={styles.add_booking__field}>
                      <label className={styles.add_booking__label}>
                        Severity Level
                      </label>
                      <div className={styles.add_booking__radio_group}>
                        <label className={styles.add_booking__radio_option}>
                          <input
                            type="radio"
                            name="severity"
                            value={Severity.Low}
                            checked={severity === Severity.Low}
                            onChange={(e) =>
                              setSeverity(e.target.value as Severity)
                            }
                          />
                          Low
                        </label>
                        <label className={styles.add_booking__radio_option}>
                          <input
                            type="radio"
                            name="severity"
                            value={Severity.Medium}
                            checked={severity === Severity.Medium}
                            onChange={(e) =>
                              setSeverity(e.target.value as Severity)
                            }
                          />
                          Medium
                        </label>
                        <label className={styles.add_booking__radio_option}>
                          <input
                            type="radio"
                            name="severity"
                            value={Severity.High}
                            checked={severity === Severity.High}
                            onChange={(e) =>
                              setSeverity(e.target.value as Severity)
                            }
                          />
                          High
                        </label>
                      </div>
                    </div>

                    <div className={styles.add_booking__field}>
                      <label className={styles.add_booking__label}>
                        Treatment Type
                      </label>
                      <div className={styles.add_booking__radio_group}>
                        <label className={styles.add_booking__radio_option}>
                          <input
                            type="radio"
                            name="treatmentType"
                            value={TreatmentType.Residential}
                            checked={
                              treatmentType === TreatmentType.Residential
                            }
                            onChange={(e) =>
                              setTreatmentType(e.target.value as TreatmentType)
                            }
                          />
                          Residential
                        </label>
                        <label className={styles.add_booking__radio_option}>
                          <input
                            type="radio"
                            name="treatmentType"
                            value={TreatmentType.Commercial}
                            checked={treatmentType === TreatmentType.Commercial}
                            onChange={(e) =>
                              setTreatmentType(e.target.value as TreatmentType)
                            }
                          />
                          Commercial
                        </label>
                      </div>
                    </div>
                  </>
                )}
              </Card>
            )}

            {/* Schedule */}
            <Card className={styles.add_booking__section}>
              <h3 className={styles.add_booking__section_title}>
                <Icon name="calendar" />
                Schedule
              </h3>

              <div className={styles.add_booking__form_row}>
                <div className={styles.add_booking__field}>
                  <label className={styles.add_booking__label}>Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className={styles.add_booking__input}
                    required
                  />
                </div>

                <div className={styles.add_booking__field}>
                  <label className={styles.add_booking__label}>Time Slot</label>
                  <select
                    value={selectedTime}
                    onChange={(e) =>
                      setSelectedTime(e.target.value as TimeSlot)
                    }
                    className={styles.add_booking__select}
                    required
                  >
                    <option value="">Select time slot</option>
                    <option value={TimeSlot.Morning}>Morning (8AM-12PM)</option>
                    <option value={TimeSlot.Afternoon}>
                      Afternoon (12PM-4PM)
                    </option>
                    <option value={TimeSlot.Evening}>Evening (4PM-8PM)</option>
                  </select>
                </div>
              </div>

              <div className={styles.add_booking__field}>
                <label className={styles.add_booking__label}>
                  Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any special instructions or notes..."
                  className={styles.add_booking__textarea}
                  rows={3}
                />
              </div>
            </Card>

            {/* Price Summary */}
            {selectedService && (
              <Card className={styles.add_booking__section}>
                <h3 className={styles.add_booking__section_title}>
                  <Icon name="dollar-sign" />
                  Price Summary
                </h3>

                <div className={styles.add_booking__price_summary}>
                  <div className={styles.add_booking__price_row}>
                    <span>Service:</span>
                    <span>{selectedService.label}</span>
                  </div>
                  {selectedOption && (
                    <div className={styles.add_booking__price_row}>
                      <span>Option:</span>
                      <span>{selectedOption.label}</span>
                    </div>
                  )}
                  <div className={styles.add_booking__price_total}>
                    <span>Total:</span>
                    <span className={priceChanged ? styles.price_changed : ""}>
                      ₦{calculateTotalPrice().toLocaleString()}
                    </span>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Submit Button */}
          <div className={styles.add_booking__footer}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!isFormValid() || isSubmitting}
              icon={isSubmitting ? "loader" : "check"}
            >
              {isSubmitting ? "Creating..." : "Create Booking"}
            </Button>
          </div>
        </form>
      </div>
    </AdminDashboardLayout>
  );
}
