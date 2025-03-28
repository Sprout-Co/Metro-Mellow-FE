"use client";
import { useState } from "react";
import AdminDashboardLayout from "../_components/AdminDashboardLayout/AdminDashboardLayout";
import styles from "./scheduling.module.scss";
import Card from "../_components/UI/Card/Card";
import Button from "../_components/UI/Button/Button";
import Table from "../_components/UI/Table/Table";
import StatusBadge from "../_components/UI/StatusBadge/StatusBadge";
import { motion } from "framer-motion";

export default function SchedulingPage() {
  const [activeView, setActiveView] = useState("calendar");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Mock scheduling data
  const scheduleItems = [
    {
      id: "1",
      customerName: "Sarah Johnson",
      service: "House Cleaning",
      date: "May 18, 2024",
      time: "09:00 AM - 12:00 PM",
      staff: "Michael Rodriguez",
      status: "confirmed",
    },
    {
      id: "2",
      customerName: "David Wilson",
      service: "Laundry Service",
      date: "May 18, 2024",
      time: "01:00 PM - 03:00 PM",
      staff: "Emma Davis",
      status: "pending",
    },
    {
      id: "3",
      customerName: "Emily Brooks",
      service: "Cooking Service",
      date: "May 19, 2024",
      time: "10:00 AM - 02:00 PM",
      staff: "James Garcia",
      status: "confirmed",
    },
    {
      id: "4",
      customerName: "Robert Thompson",
      service: "Pest Control",
      date: "May 20, 2024",
      time: "09:30 AM - 11:30 AM",
      staff: "Sophia Martinez",
      status: "confirmed",
    },
    {
      id: "5",
      customerName: "Jennifer Adams",
      service: "House Cleaning",
      date: "May 20, 2024",
      time: "02:00 PM - 05:00 PM",
      staff: "Michael Rodriguez",
      status: "pending",
    },
    {
      id: "6",
      customerName: "Thomas Lee",
      service: "Grocery Shopping",
      date: "May 21, 2024",
      time: "11:00 AM - 01:00 PM",
      staff: "Emma Davis",
      status: "cancelled",
    },
  ];

  // Table columns configuration
  const columns = [
    { key: "customerName", header: "Customer", width: "20%" },
    { key: "service", header: "Service", width: "20%" },
    { key: "date", header: "Date", width: "15%" },
    { key: "time", header: "Time", width: "20%" },
    { key: "staff", header: "Staff Assigned", width: "15%" },
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
          }
          label={value.charAt(0).toUpperCase() + value.slice(1)}
        />
      ),
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
            <Button variant="primary" size="medium" icon="+">
              New Appointment
            </Button>
          </div>
        </div>

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

        {activeView === "calendar" ? (
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
                    className={`${styles.scheduling_page__calendar_day} ${isToday ? styles["scheduling_page__calendar_day--today"] : ""}`}
                  >
                    <div className={styles.scheduling_page__calendar_date}>
                      {day.getDate()}
                    </div>
                    <div
                      className={styles.scheduling_page__calendar_appointments}
                    >
                      {appointments.length > 0 ? (
                        <div className={styles.scheduling_page__calendar_count}>
                          {appointments.length} appointments
                        </div>
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
      </div>
    </AdminDashboardLayout>
  );
}
