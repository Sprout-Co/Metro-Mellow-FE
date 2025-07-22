"use client";

import AdminDashboardLayout from "../../_components/AdminDashboardLayout/AdminDashboardLayout";
import { useBookingForm } from "./_hooks/useBookingForm";
import CustomerSelectionSection from "./_components/CustomerSelectionSection/CustomerSelectionSection";
import ServiceSelectionSection from "./_components/ServiceSelectionSection/ServiceSelectionSection";
import ServiceDetailsSection from "./_components/ServiceDetailsSection/ServiceDetailsSection";
import ScheduleSection from "./_components/ScheduleSection/ScheduleSection";
import PriceSummarySection from "./_components/PriceSummarySection/PriceSummarySection";
import ErrorDisplay from "./_components/ErrorDisplay/ErrorDisplay";
import FormActions from "./_components/FormActions/FormActions";
import { Icon } from "@/components/ui/Icon/Icon";
import styles from "./AddBooking.module.scss";

export default function AddBookingPage() {
  const [state, handlers] = useBookingForm();

  if (state.isLoading) {
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

        <ErrorDisplay error={state.error} onClear={handlers.clearError} />

        <form onSubmit={handlers.handleSubmit}>
          <div className={styles.add_booking__form_grid}>
            <CustomerSelectionSection
              customers={state.customers}
              selectedCustomerId={state.selectedCustomerId}
              customerSearchQuery={state.customerSearchQuery}
              onCustomerSelect={handlers.setSelectedCustomerId}
              onSearchQueryChange={handlers.setCustomerSearchQuery}
            />

            <ServiceSelectionSection
              services={state.services}
              selectedServiceId={state.selectedServiceId}
              selectedOptionId={state.selectedOptionId}
              onServiceSelect={handlers.setSelectedServiceId}
              onOptionSelect={handlers.setSelectedOptionId}
            />

            <ServiceDetailsSection
              selectedService={state.selectedService}
              propertyType={state.propertyType}
              roomQuantities={state.roomQuantities}
              laundryBags={state.laundryBags}
              severity={state.severity}
              treatmentType={state.treatmentType}
              onPropertyTypeChange={handlers.setPropertyType}
              onRoomQuantityChange={handlers.updateRoomQuantity}
              onLaundryBagsChange={handlers.setLaundryBags}
              onSeverityChange={handlers.setSeverity}
              onTreatmentTypeChange={handlers.setTreatmentType}
            />

            <ScheduleSection
              selectedDate={state.selectedDate}
              selectedTime={state.selectedTime}
              notes={state.notes}
              onDateChange={handlers.setSelectedDate}
              onTimeChange={handlers.setSelectedTime}
              onNotesChange={handlers.setNotes}
            />

            <PriceSummarySection
              selectedService={state.selectedService}
              selectedOption={state.selectedOption}
              calculatedPrice={state.calculatedPrice}
            />
          </div>

          <FormActions
            isValid={state.isValid}
            isSubmitting={state.isSubmitting}
            onSubmit={handlers.handleSubmit}
          />
        </form>
      </div>
    </AdminDashboardLayout>
  );
}
