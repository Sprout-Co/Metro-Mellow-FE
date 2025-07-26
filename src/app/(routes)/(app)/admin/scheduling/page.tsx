"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import AdminDashboardLayout from "../_components/AdminDashboardLayout/AdminDashboardLayout";
import styles from "./scheduling.module.scss";
import Card from "../_components/UI/Card/Card";
import Button from "../_components/UI/Button/Button";
import Table from "../_components/UI/Table/Table";
import StatusBadge from "../_components/UI/StatusBadge/StatusBadge";
import { motion } from "framer-motion";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import { useStaffOperations } from "@/graphql/hooks/staff/useStaffOperations";
import {
  BookingStatus,
  TimeSlot,
  type Booking,
  type StaffProfile,
  type CreateBookingInput,
} from "@/graphql/api";

export default function SchedulingPage() {
  const [activeView, setActiveView] = useState("calendar");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">(
    "all"
  );
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [staffFilter, setStaffFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [availableStaff, setAvailableStaff] = useState<StaffProfile[]>([]);
  const [showStaffModal, setShowStaffModal] = useState<string | null>(null);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [selectedDateAppointments, setSelectedDateAppointments] = useState<
    any[]
  >([]);
  const [showDayDetailsModal, setShowDayDetailsModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    handleGetBookings,
    handleUpdateBookingStatus,
    handleAssignStaff,
    handleCreateBooking,
  } = useBookingOperations();
  const { handleGetStaffProfiles } = useStaffOperations();

  // Load available staff on component mount
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const staff = await handleGetStaffProfiles();
        if (staff) {
          // Filter out any staff profiles with invalid user data
          const validStaff = staff.filter((staffProfile: any) => {
            return (
              staffProfile?.user?.firstName &&
              staffProfile?.user?.lastName &&
              staffProfile?.user?.email
            );
          });
          setAvailableStaff(validStaff as any[]); // Type assertion to handle GraphQL type mismatch

          // Log warning if some staff were filtered out
          if (validStaff.length < staff.length) {
            console.warn(
              `Filtered out ${staff.length - validStaff.length} staff profiles with incomplete user data`
            );
          }
        }
      } catch (error) {
        console.error("Failed to fetch staff:", error);
        // Set empty array to prevent the component from crashing
        setAvailableStaff([]);
      }
    };

    fetchStaff();
  }, [handleGetStaffProfiles]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch bookings data
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await handleGetBookings(
          statusFilter === "all" ? undefined : statusFilter
        );
        if (result) {
          setBookings(result as Booking[]);
        } else {
          setError("Failed to fetch bookings");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [statusFilter, handleGetBookings]);

  // Get unique services and staff for filter options
  const uniqueServices = useMemo(() => {
    const services = bookings.map((booking) => booking.service.name);
    return [...new Set(services)];
  }, [bookings]);

  const uniqueStaff = useMemo(() => {
    const staff = bookings
      .filter((booking) => booking.staff)
      .map(
        (booking) => `${booking.staff!.firstName} ${booking.staff!.lastName}`
      );
    return [...new Set(staff)];
  }, [bookings]);

  // Filter bookings based on current filters
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const statusMatch =
        statusFilter === "all" || booking.status === statusFilter;
      const serviceMatch =
        serviceFilter === "all" || booking.service.name === serviceFilter;
      const staffMatch =
        staffFilter === "all" ||
        (booking.staff &&
          `${booking.staff.firstName} ${booking.staff.lastName}` ===
            staffFilter);

      return statusMatch && serviceMatch && staffMatch;
    });
  }, [bookings, statusFilter, serviceFilter, staffFilter]);

  // Helper function to display time slots
  const getTimeSlotDisplay = (timeSlot: string) => {
    switch (timeSlot) {
      case "MORNING":
        return "09:00 AM - 12:00 PM";
      case "AFTERNOON":
        return "01:00 PM - 05:00 PM";
      case "EVENING":
        return "06:00 PM - 09:00 PM";
      default:
        return "Time TBD";
    }
  };

  // Transform filtered bookings data for display
  const scheduleItems = useMemo(() => {
    return filteredBookings.map((booking) => ({
      id: booking.id,
      customerName: `${booking.customer.firstName} ${booking.customer.lastName}`,
      service: booking.service.name,
      date: new Date(booking.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      time: getTimeSlotDisplay(booking.timeSlot),
      staff: booking.staff
        ? `${booking.staff.firstName} ${booking.staff.lastName}`
        : "Unassigned",
      status: booking.status.toLowerCase(),
      originalBooking: booking,
    }));
  }, [filteredBookings]);

  // Table columns configuration
  const columns = [
    { key: "customerName", header: "Customer", width: "18%" },
    { key: "service", header: "Service", width: "18%" },
    { key: "date", header: "Date", width: "15%" },
    { key: "time", header: "Time", width: "18%" },
    {
      key: "staff",
      header: "Staff Assigned",
      width: "15%",
      render: (value: string, item: any) => (
        <div className={styles.scheduling_page__staff_cell}>
          <span
            className={
              value === "Unassigned" ? styles.scheduling_page__unassigned : ""
            }
          >
            {value}
          </span>
          {value === "Unassigned" && (
            <button
              className={styles.scheduling_page__assign_button}
              onClick={(e) => {
                e.stopPropagation();
                setShowStaffModal(item.id);
              }}
            >
              Assign
            </button>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "10%",
      render: (value: string) => (
        <StatusBadge
          status={
            value as
              | "active"
              | "inactive"
              | "pending"
              | "completed"
              | "cancelled"
              | "confirmed"
          }
          label={value.charAt(0).toUpperCase() + value.slice(1)}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "6%",
      render: (value: any, item: any) => {
        const statusOptions = getAvailableStatusOptions(item.status);
        const isDropdownOpen = activeDropdown === item.id;

        return (
          <div
            className={styles.scheduling_page__actions_menu}
            ref={dropdownRef}
          >
            <button
              className={styles.scheduling_page__action_button}
              onClick={(e) => {
                e.stopPropagation();
                setActiveDropdown(isDropdownOpen ? null : item.id);
              }}
              disabled={statusOptions.length === 0}
            >
              ⋯
            </button>

            {isDropdownOpen && statusOptions.length > 0 && (
              <div className={styles.scheduling_page__dropdown}>
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    className={`${styles.scheduling_page__dropdown_item} ${styles[`scheduling_page__dropdown_item--${option.color}`]}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusUpdate(item.id, option.value);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      },
    },
  ];

  // Generate array of days for the calendar view
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push(date);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Get the day's appointments
  const getAppointmentsForDay = (date: Date) => {
    const dateString = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return scheduleItems.filter((item) => item.date === dateString);
  };

  // Handle calendar day click
  const handleDayClick = (date: Date) => {
    const appointments = getAppointmentsForDay(date);
    if (appointments.length > 0) {
      setSelectedDateAppointments(appointments);
      setShowDayDetailsModal(true);
    }
  };

  // Handle appointment status updates
  const handleStatusUpdate = async (
    bookingId: string,
    newStatus: BookingStatus
  ) => {
    try {
      setActiveDropdown(null);
      const result = await handleUpdateBookingStatus(bookingId, newStatus);
      if (result) {
        // Refresh bookings
        const updatedBookings = await handleGetBookings(
          statusFilter === "all" ? undefined : statusFilter
        );
        if (updatedBookings) {
          setBookings(updatedBookings);
        }
      }
    } catch (error) {
      console.error("Failed to update booking status:", error);
    }
  };

  // Get available status options for a booking
  const getAvailableStatusOptions = (currentStatus: string) => {
    const options = [];

    switch (currentStatus.toUpperCase()) {
      case "PENDING":
        options.push(
          {
            value: BookingStatus.Confirmed,
            label: "Confirm",
            color: "success",
          },
          { value: BookingStatus.Cancelled, label: "Cancel", color: "error" }
        );
        break;
      case "CONFIRMED":
        options.push(
          {
            value: BookingStatus.InProgress,
            label: "Start Service",
            color: "warning",
          },
          { value: BookingStatus.Cancelled, label: "Cancel", color: "error" }
        );
        break;
      case "IN_PROGRESS":
        options.push(
          {
            value: BookingStatus.Completed,
            label: "Mark Complete",
            color: "success",
          },
          { value: BookingStatus.Paused, label: "Pause", color: "warning" }
        );
        break;
      case "PAUSED":
        options.push(
          {
            value: BookingStatus.InProgress,
            label: "Resume",
            color: "success",
          },
          { value: BookingStatus.Cancelled, label: "Cancel", color: "error" }
        );
        break;
    }

    return options;
  };

  // Handle staff assignment
  const handleStaffAssignment = async (bookingId: string, staffId: string) => {
    try {
      const result = await handleAssignStaff(bookingId, staffId);
      if (result) {
        // Refresh bookings to show updated assignment
        const updatedBookings = await handleGetBookings({
          status: statusFilter === "all" ? undefined : statusFilter,
        });
        if (updatedBookings.success && updatedBookings.data) {
          setBookings(updatedBookings.data);
        }
        setShowStaffModal(null);
      }
    } catch (error) {
      console.error("Failed to assign staff:", error);
    }
  };

  // Handle new appointment creation
  const handleCreateNewAppointment = async (
    bookingData: CreateBookingInput
  ) => {
    try {
      const result = await handleCreateBooking(bookingData);
      if (result.success) {
        // Refresh bookings to show new appointment
        const updatedBookings = await handleGetBookings({
          status: statusFilter === "all" ? undefined : statusFilter,
        });
        if (updatedBookings.success && updatedBookings.data) {
          setBookings(updatedBookings.data);
        }
        setShowNewAppointmentModal(false);
      }
    } catch (error) {
      console.error("Failed to create appointment:", error);
    }
  };

  // Month navigation
  const goToPreviousMonth = () => {
    const prevMonth = new Date(selectedDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setSelectedDate(prevMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(selectedDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setSelectedDate(nextMonth);
  };

  return (
    <AdminDashboardLayout
      title="Scheduling"
      breadcrumbs={[
        { label: "Home", path: "/admin" },
        { label: "Scheduling", path: "/admin/scheduling" },
      ]}
    >
      <div className={styles.scheduling_page}>
        <div className={styles.scheduling_page__header}>
          <div className={styles.scheduling_page__title_area}>
            <h2 className={styles.scheduling_page__title}>
              Service Scheduling
            </h2>
            <p className={styles.scheduling_page__subtitle}>
              Manage appointments and staff schedules
            </p>
          </div>

          <div className={styles.scheduling_page__actions}>
            <Button
              variant="primary"
              size="medium"
              icon="+"
              onClick={() => setShowNewAppointmentModal(true)}
            >
              New Appointment
            </Button>
          </div>
        </div>

        <div className={styles.scheduling_page__controls}>
          <div className={styles.scheduling_page__view_toggle}>
            <button
              className={`${styles.scheduling_page__view_button} ${activeView === "calendar" ? styles["scheduling_page__view_button--active"] : ""}`}
              onClick={() => setActiveView("calendar")}
            >
              Calendar View
            </button>
            <button
              className={`${styles.scheduling_page__view_button} ${activeView === "list" ? styles["scheduling_page__view_button--active"] : ""}`}
              onClick={() => setActiveView("list")}
            >
              List View
            </button>
          </div>

          <div className={styles.scheduling_page__filters}>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as BookingStatus | "all")
              }
              className={styles.scheduling_page__filter_select}
            >
              <option value="all">All Status</option>
              <option value={BookingStatus.Pending}>Pending</option>
              <option value={BookingStatus.Confirmed}>Confirmed</option>
              <option value={BookingStatus.InProgress}>In Progress</option>
              <option value={BookingStatus.Completed}>Completed</option>
              <option value={BookingStatus.Cancelled}>Cancelled</option>
            </select>

            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className={styles.scheduling_page__filter_select}
            >
              <option value="all">All Services</option>
              {uniqueServices.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>

            <select
              value={staffFilter}
              onChange={(e) => setStaffFilter(e.target.value)}
              className={styles.scheduling_page__filter_select}
            >
              <option value="all">All Staff</option>
              {uniqueStaff.map((staff) => (
                <option key={staff} value={staff}>
                  {staff}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <Card className={styles.scheduling_page__loading}>
            <div className={styles.scheduling_page__loading_content}>
              <div className={styles.scheduling_page__spinner}></div>
              <p>Loading appointments...</p>
            </div>
          </Card>
        ) : error ? (
          <Card className={styles.scheduling_page__error}>
            <div className={styles.scheduling_page__error_content}>
              <h3>Error Loading Appointments</h3>
              <p>{error}</p>
              <Button
                variant="primary"
                size="small"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          </Card>
        ) : activeView === "calendar" ? (
          <Card className={styles.scheduling_page__calendar}>
            <div className={styles.scheduling_page__calendar_header}>
              <h3 className={styles.scheduling_page__calendar_title}>
                {selectedDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h3>
              <div className={styles.scheduling_page__calendar_nav}>
                <button
                  className={styles.scheduling_page__calendar_nav_button}
                  onClick={goToPreviousMonth}
                >
                  &lt; Prev
                </button>
                <button
                  className={styles.scheduling_page__calendar_nav_button}
                  onClick={goToNextMonth}
                >
                  Next &gt;
                </button>
              </div>
            </div>

            <div className={styles.scheduling_page__calendar_days}>
              {calendarDays.map((day) => {
                const appointments = getAppointmentsForDay(day);
                const isToday =
                  new Date().toDateString() === day.toDateString();

                return (
                  <div
                    key={day.toISOString()}
                    className={`${styles.scheduling_page__calendar_day} ${isToday ? styles["scheduling_page__calendar_day--today"] : ""} ${appointments.length > 0 ? styles["scheduling_page__calendar_day--has_appointments"] : ""}`}
                    onClick={() => handleDayClick(day)}
                  >
                    <div className={styles.scheduling_page__calendar_date}>
                      {day.getDate()}
                    </div>
                    <div
                      className={styles.scheduling_page__calendar_appointments}
                    >
                      {appointments.length > 0 ? (
                        <>
                          <div
                            className={styles.scheduling_page__calendar_count}
                          >
                            {appointments.length} appointment
                            {appointments.length !== 1 ? "s" : ""}
                          </div>
                          <div
                            className={styles.scheduling_page__calendar_preview}
                          >
                            {appointments.slice(0, 2).map((apt, index) => (
                              <div
                                key={apt.id}
                                className={`${styles.scheduling_page__calendar_appointment} ${styles[`scheduling_page__calendar_appointment--${apt.status}`]}`}
                              >
                                <span
                                  className={
                                    styles.scheduling_page__appointment_time
                                  }
                                >
                                  {apt.time.split(" - ")[0]}
                                </span>
                                <span
                                  className={
                                    styles.scheduling_page__appointment_service
                                  }
                                >
                                  {apt.service}
                                </span>
                              </div>
                            ))}
                            {appointments.length > 2 && (
                              <div
                                className={
                                  styles.scheduling_page__calendar_more
                                }
                              >
                                +{appointments.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className={styles.scheduling_page__calendar_empty}>
                          No appointments
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={styles.scheduling_page__list}>
              <Table
                columns={columns}
                data={scheduleItems}
                onRowClick={(item) =>
                  console.log("Appointment selected:", item)
                }
              />
            </Card>
          </motion.div>
        )}

        {/* Day Details Modal */}
        {showDayDetailsModal && (
          <div className={styles.scheduling_page__modal_overlay}>
            <div className={styles.scheduling_page__modal}>
              <div className={styles.scheduling_page__modal_header}>
                <h3>Appointments for {selectedDateAppointments[0]?.date}</h3>
                <button
                  className={styles.scheduling_page__modal_close}
                  onClick={() => setShowDayDetailsModal(false)}
                >
                  ×
                </button>
              </div>
              <div className={styles.scheduling_page__modal_content}>
                <div className={styles.scheduling_page__day_appointments}>
                  {selectedDateAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className={styles.scheduling_page__day_appointment_card}
                    >
                      <div
                        className={styles.scheduling_page__appointment_header}
                      >
                        <h4>{apt.customerName}</h4>
                        <StatusBadge
                          status={apt.status as any}
                          label={
                            apt.status.charAt(0).toUpperCase() +
                            apt.status.slice(1)
                          }
                        />
                      </div>
                      <div
                        className={styles.scheduling_page__appointment_details}
                      >
                        <p>
                          <strong>Service:</strong> {apt.service}
                        </p>
                        <p>
                          <strong>Time:</strong> {apt.time}
                        </p>
                        <p>
                          <strong>Staff:</strong> {apt.staff}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Appointment Modal */}
        {showNewAppointmentModal && (
          <div className={styles.scheduling_page__modal_overlay}>
            <div className={styles.scheduling_page__modal}>
              <div className={styles.scheduling_page__modal_header}>
                <h3>Create New Appointment</h3>
                <button
                  className={styles.scheduling_page__modal_close}
                  onClick={() => setShowNewAppointmentModal(false)}
                >
                  ×
                </button>
              </div>
              <div className={styles.scheduling_page__modal_content}>
                <div className={styles.scheduling_page__coming_soon}>
                  <h4>Feature Coming Soon</h4>
                  <p>
                    The new appointment creation form is currently under
                    development. For now, appointments can be created through
                    the customer dashboard.
                  </p>
                  <Button
                    variant="primary"
                    size="medium"
                    onClick={() => setShowNewAppointmentModal(false)}
                  >
                    Got it
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Staff Assignment Modal */}
        {showStaffModal && (
          <div className={styles.scheduling_page__modal_overlay}>
            <div className={styles.scheduling_page__modal}>
              <div className={styles.scheduling_page__modal_header}>
                <h3>Assign Staff</h3>
                <button
                  className={styles.scheduling_page__modal_close}
                  onClick={() => setShowStaffModal(null)}
                >
                  ×
                </button>
              </div>
              <div className={styles.scheduling_page__modal_content}>
                <p>Select a staff member to assign to this appointment:</p>
                <div className={styles.scheduling_page__staff_list}>
                  {availableStaff.map((staff) => (
                    <button
                      key={staff.id}
                      className={styles.scheduling_page__staff_option}
                      onClick={() =>
                        handleStaffAssignment(showStaffModal, staff.id)
                      }
                    >
                      <div className={styles.scheduling_page__staff_info}>
                        <span className={styles.scheduling_page__staff_name}>
                          {staff.user.firstName} {staff.user.lastName}
                        </span>
                        <span className={styles.scheduling_page__staff_rating}>
                          ⭐ {staff.rating.toFixed(1)} ({staff.completedJobs}{" "}
                          jobs)
                        </span>
                      </div>
                      <div className={styles.scheduling_page__staff_status}>
                        <StatusBadge
                          status={staff.status.toLowerCase() as any}
                          label={staff.status}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
