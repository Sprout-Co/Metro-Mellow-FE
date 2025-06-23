// src/app/(routes)/(app)/admin/customers/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./CustomerDetails.module.scss";
import AdminDashboardLayout from "../../_components/AdminDashboardLayout/AdminDashboardLayout";
import Card from "../../_components/UI/Card/Card";
import StatusBadge from "../../_components/UI/StatusBadge/StatusBadge";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import { useSubscriptionOperations } from "@/graphql/hooks/subscriptions/useSubscriptionOperations";
import { usePaymentOperations } from "@/graphql/hooks/payments/usePaymentOperations";
import { User, AccountStatus, BookingStatus } from "@/graphql/api";
import { formatToNaira } from "@/utils/string";

export default function CustomerDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params.id as string;

  const [activeTab, setActiveTab] = useState("overview");
  const [customer, setCustomer] = useState<User | null>(null);
  const [bookings, setBookings] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { handleGetUserById } = useAuthOperations();
  const { handleGetCustomerBookings } = useBookingOperations();
  const { handleGetCustomerSubscriptions } = useSubscriptionOperations();
  const { handleGetCustomerPayments } = usePaymentOperations();

  // Animation variants for smooth transitions
  const fadeInVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch customer details
        const customerData = await handleGetUserById(customerId);
        setCustomer(customerData as User);

        // For demo purposes, we'll just simulate these other API calls
        // In a real implementation, you would uncomment these and use the actual data
        /*
        // Fetch customer bookings
        const bookingsData = await handleGetCustomerBookings();
        setBookings(bookingsData || []);
        
        // Fetch customer subscriptions
        const subscriptionsData = await handleGetCustomerSubscriptions();
        setSubscriptions(subscriptionsData || []);
        
        // Fetch customer payments
        const paymentsData = await handleGetCustomerPayments();
        setPayments(paymentsData || []);
        */

        // Mock data for demonstration
        setBookings([
          {
            id: "b1",
            service: "Cleaning Service",
            date: "2025-06-15",
            status: BookingStatus.Completed,
            amount: 12000,
          },
          {
            id: "b2",
            service: "Laundry Service",
            date: "2025-06-22",
            status: BookingStatus.Scheduled,
            amount: 8500,
          },
          {
            id: "b3",
            service: "Pest Control",
            date: "2025-07-01",
            status: BookingStatus.Pending,
            amount: 15000,
          },
        ]);

        setSubscriptions([
          {
            id: "s1",
            service: "Weekly Cleaning",
            status: "Active",
            nextBilling: "2025-07-01",
            amount: 25000,
          },
        ]);

        setPayments([
          {
            id: "p1",
            date: "2025-06-15",
            amount: 12000,
            status: "Completed",
            method: "Credit Card",
          },
          {
            id: "p2",
            date: "2025-05-18",
            amount: 12000,
            status: "Completed",
            method: "Credit Card",
          },
          {
            id: "p3",
            date: "2025-04-17",
            amount: 12000,
            status: "Completed",
            method: "Credit Card",
          },
        ]);
      } catch (error) {
        console.error("Error fetching customer data:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch customer data"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerData();
  }, [customerId, handleGetUserById]);

  const getStatusColor = (status: AccountStatus) => {
    switch (status) {
      case AccountStatus.Active:
        return "active";
      case AccountStatus.Inactive:
        return "inactive";
      case AccountStatus.Locked:
        return "cancelled";
      case AccountStatus.PendingVerification:
        return "pending";
      case AccountStatus.Suspended:
        return "cancelled";
      default:
        return "pending";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatBookingStatus = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.Completed:
        return { label: "Completed", status: "active" };
      case BookingStatus.Pending:
        return { label: "Pending", status: "pending" };
      case BookingStatus.Cancelled:
        return { label: "Cancelled", status: "cancelled" };
      case BookingStatus.Confirmed:
        return { label: "Confirmed", status: "active" };
      case BookingStatus.InProgress:
        return { label: "In Progress", status: "pending" };
      default:
        return { label: status, status: "pending" };
    }
  };

  // Calculate summary statistics
  const totalSpent = payments.reduce(
    (sum, payment) => sum + (payment.amount || 0),
    0
  );
  const completedBookings = bookings.filter(
    (b) => b.status === BookingStatus.Completed
  ).length;
  const activeSubscriptions = subscriptions.filter(
    (s) => s.status === "Active"
  ).length;

  return (
    <AdminDashboardLayout
      title="Customer Details"
      breadcrumbs={[
        { label: "Home", path: "/admin" },
        { label: "Customers", path: "/admin/customers" },
        {
          label: customer
            ? `${customer.firstName} ${customer.lastName}`
            : "Customer Details",
          path: `/admin/customers/${customerId}`,
        },
      ]}
    >
      {isLoading ? (
        <div className="loading-spinner">Loading customer data...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : customer ? (
        <motion.div
          className={styles.customer_details}
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <motion.div
            className={styles.customer_details__header}
            variants={fadeInVariants}
          >
            <div className={styles.customer_details__title_area}>
              <button
                className={styles.customer_details__back_button}
                onClick={() => router.push("/admin/customers")}
              >
                ← Back to customers
              </button>
              <h1 className={styles.customer_details__title}>
                {customer.firstName} {customer.lastName}
                <span className={styles.customer_details__customer_badge}>
                  Customer
                </span>
              </h1>
              <p className={styles.customer_details__subtitle}>
                Customer since{" "}
                {customer.createdAt ? formatDate(customer.createdAt) : "N/A"}
              </p>
            </div>

            <div className={styles.customer_details__actions}>
              <button className={styles.customer_details__edit_button}>
                Edit Customer
              </button>
              <button className={styles.customer_details__danger_button}>
                Deactivate Account
              </button>
            </div>
          </motion.div>

          <div className={styles.customer_details__tabs}>
            <button
              className={`${styles.customer_details__tab} ${activeTab === "overview" ? styles["customer_details__tab--active"] : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`${styles.customer_details__tab} ${activeTab === "bookings" ? styles["customer_details__tab--active"] : ""}`}
              onClick={() => setActiveTab("bookings")}
            >
              Bookings
            </button>
            <button
              className={`${styles.customer_details__tab} ${activeTab === "subscriptions" ? styles["customer_details__tab--active"] : ""}`}
              onClick={() => setActiveTab("subscriptions")}
            >
              Subscriptions
            </button>
            <button
              className={`${styles.customer_details__tab} ${activeTab === "payments" ? styles["customer_details__tab--active"] : ""}`}
              onClick={() => setActiveTab("payments")}
            >
              Payments
            </button>
            <button
              className={`${styles.customer_details__tab} ${activeTab === "notes" ? styles["customer_details__tab--active"] : ""}`}
              onClick={() => setActiveTab("notes")}
            >
              Notes
            </button>
          </div>

          <motion.div
            className={styles.customer_details__content}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            key={activeTab}
          >
            {activeTab === "overview" && (
              <div className={styles.customer_details__tab_content}>
                <motion.div
                  className={styles.customer_details__card}
                  variants={fadeInVariants}
                >
                  <div className={styles.customer_details__card_header}>
                    <h3 className={styles.customer_details__card_title}>
                      <i className="fas fa-user"></i> Personal Information
                    </h3>
                    <div className={styles.customer_details__card_actions}>
                      <button className={styles.customer_details__icon_button}>
                        <i className="fas fa-pen"></i>
                      </button>
                    </div>
                  </div>

                  <div className={styles.customer_details__avatar}>
                    {customer.firstName?.charAt(0) || ""}
                    {customer.lastName?.charAt(0) || ""}
                  </div>

                  <div className={styles.customer_details__info_grid}>
                    <div className={styles.customer_details__info_item}>
                      <p className={styles.customer_details__info_label}>
                        First Name
                      </p>
                      <p className={styles.customer_details__info_value}>
                        {customer.firstName || "N/A"}
                      </p>
                    </div>

                    <div className={styles.customer_details__info_item}>
                      <p className={styles.customer_details__info_label}>
                        Last Name
                      </p>
                      <p className={styles.customer_details__info_value}>
                        {customer.lastName || "N/A"}
                      </p>
                    </div>

                    <div className={styles.customer_details__info_item}>
                      <p className={styles.customer_details__info_label}>
                        Email
                      </p>
                      <p className={styles.customer_details__info_value}>
                        {customer.email || "N/A"}
                      </p>
                    </div>

                    <div className={styles.customer_details__info_item}>
                      <p className={styles.customer_details__info_label}>
                        Phone
                      </p>
                      <p className={styles.customer_details__info_value}>
                        {customer.phone || "N/A"}
                      </p>
                    </div>

                    <div className={styles.customer_details__info_item}>
                      <p className={styles.customer_details__info_label}>
                        Status
                      </p>
                      <p className={styles.customer_details__info_value}>
                        <span
                          className={`${styles.customer_details__status} ${styles[`customer_details__status--${getStatusColor(customer.accountStatus)}`]}`}
                        >
                          {customer.accountStatus
                            ?.replace(/([A-Z])/g, " $1")
                            .trim() || "N/A"}
                        </span>
                      </p>
                    </div>

                    <div className={styles.customer_details__info_item}>
                      <p className={styles.customer_details__info_label}>
                        Email Verified
                      </p>
                      <p className={styles.customer_details__info_value}>
                        <span
                          className={`${styles.customer_details__status} ${styles[`customer_details__status--${customer.emailVerified ? "active" : "pending"}`]}`}
                        >
                          {customer.emailVerified ? "Verified" : "Not Verified"}
                        </span>
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className={styles.customer_details__card}
                  variants={fadeInVariants}
                >
                  <div className={styles.customer_details__card_header}>
                    <h3 className={styles.customer_details__card_title}>
                      <i className="fas fa-home"></i> Address Information
                    </h3>
                    <div className={styles.customer_details__card_actions}>
                      <button className={styles.customer_details__icon_button}>
                        <i className="fas fa-pen"></i>
                      </button>
                    </div>
                  </div>

                  <div className={styles.customer_details__info_grid}>
                    <div className={styles.customer_details__info_item}>
                      <p className={styles.customer_details__info_label}>
                        Street
                      </p>
                      <p className={styles.customer_details__info_value}>
                        {customer.address?.street || "N/A"}
                      </p>
                    </div>

                    <div className={styles.customer_details__info_item}>
                      <p className={styles.customer_details__info_label}>
                        City
                      </p>
                      <p className={styles.customer_details__info_value}>
                        {customer.address?.city || "N/A"}
                      </p>
                    </div>

                    <div className={styles.customer_details__info_item}>
                      <p className={styles.customer_details__info_label}>
                        State
                      </p>
                      <p className={styles.customer_details__info_value}>
                        {customer.address?.state || "N/A"}
                      </p>
                    </div>

                    <div className={styles.customer_details__info_item}>
                      <p className={styles.customer_details__info_label}>
                        Zip Code
                      </p>
                      <p className={styles.customer_details__info_value}>
                        {customer.address?.zipCode || "N/A"}
                      </p>
                    </div>

                    <div className={styles.customer_details__info_item}>
                      <p className={styles.customer_details__info_label}>
                        Country
                      </p>
                      <p className={styles.customer_details__info_value}>
                        {customer.address?.country || "N/A"}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className={`${styles.customer_details__card} ${styles["customer_details__card--full"]}`}
                  variants={fadeInVariants}
                >
                  <div className={styles.customer_details__card_header}>
                    <h3 className={styles.customer_details__card_title}>
                      <i className="fas fa-chart-line"></i> Customer Summary
                    </h3>
                  </div>

                  <div className={styles.customer_details__bookings_summary}>
                    <div className={styles.customer_details__summary_card}>
                      <p className={styles.customer_details__summary_value}>
                        {formatToNaira(totalSpent)}
                      </p>
                      <p className={styles.customer_details__summary_label}>
                        Total Spent
                      </p>
                    </div>

                    <div className={styles.customer_details__summary_card}>
                      <p className={styles.customer_details__summary_value}>
                        {bookings.length}
                      </p>
                      <p className={styles.customer_details__summary_label}>
                        Total Bookings
                      </p>
                    </div>

                    <div className={styles.customer_details__summary_card}>
                      <p className={styles.customer_details__summary_value}>
                        {completedBookings}
                      </p>
                      <p className={styles.customer_details__summary_label}>
                        Completed Bookings
                      </p>
                    </div>

                    <div className={styles.customer_details__summary_card}>
                      <p className={styles.customer_details__summary_value}>
                        {activeSubscriptions}
                      </p>
                      <p className={styles.customer_details__summary_label}>
                        Active Subscriptions
                      </p>
                    </div>
                  </div>

                  <div className={styles.customer_details__chart}>
                    Spending Graph (Placeholder)
                  </div>
                </motion.div>

                <motion.div
                  className={`${styles.customer_details__card} ${styles["customer_details__card--full"]}`}
                  variants={fadeInVariants}
                >
                  <div className={styles.customer_details__card_header}>
                    <h3 className={styles.customer_details__card_title}>
                      <i className="fas fa-calendar-alt"></i> Recent Bookings
                    </h3>
                    <div className={styles.customer_details__card_actions}>
                      <button
                        className={styles.customer_details__icon_button}
                        onClick={() => setActiveTab("bookings")}
                      >
                        View All
                      </button>
                    </div>
                  </div>

                  {bookings.length > 0 ? (
                    <table className={styles.customer_details__table}>
                      <thead>
                        <tr>
                          <th>Service</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.slice(0, 3).map((booking) => {
                          const { label, status } = formatBookingStatus(
                            booking.status
                          );
                          return (
                            <tr key={booking.id}>
                              <td>{booking.service}</td>
                              <td>{formatDate(booking.date)}</td>
                              <td>
                                <StatusBadge status={status} label={label} />
                              </td>
                              <td>{formatToNaira(booking.amount)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <p className={styles.customer_details__empty}>
                      No bookings found
                    </p>
                  )}
                </motion.div>
              </div>
            )}

            {activeTab === "bookings" && (
              <motion.div
                className={`${styles.customer_details__card} ${styles["customer_details__card--full"]}`}
                variants={fadeInVariants}
              >
                <div className={styles.customer_details__card_header}>
                  <h3 className={styles.customer_details__card_title}>
                    <i className="fas fa-calendar-alt"></i> All Bookings
                  </h3>
                </div>

                {bookings.length > 0 ? (
                  <table className={styles.customer_details__table}>
                    <thead>
                      <tr>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => {
                        const { label, status } = formatBookingStatus(
                          booking.status
                        );
                        return (
                          <tr key={booking.id}>
                            <td>{booking.service}</td>
                            <td>{formatDate(booking.date)}</td>
                            <td>
                              <StatusBadge status={status} label={label} />
                            </td>
                            <td>{formatToNaira(booking.amount)}</td>
                            <td>
                              <button
                                className={styles.customer_details__icon_button}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <p className={styles.customer_details__empty}>
                    No bookings found
                  </p>
                )}
              </motion.div>
            )}

            {activeTab === "subscriptions" && (
              <motion.div
                className={`${styles.customer_details__card} ${styles["customer_details__card--full"]}`}
                variants={fadeInVariants}
              >
                <div className={styles.customer_details__card_header}>
                  <h3 className={styles.customer_details__card_title}>
                    <i className="fas fa-sync-alt"></i> Subscriptions
                  </h3>
                </div>

                {subscriptions.length > 0 ? (
                  <table className={styles.customer_details__table}>
                    <thead>
                      <tr>
                        <th>Service</th>
                        <th>Status</th>
                        <th>Next Billing</th>
                        <th>Amount</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscriptions.map((subscription) => (
                        <tr key={subscription.id}>
                          <td>{subscription.service}</td>
                          <td>
                            <StatusBadge
                              status={
                                subscription.status === "Active"
                                  ? "active"
                                  : "inactive"
                              }
                              label={subscription.status}
                            />
                          </td>
                          <td>{formatDate(subscription.nextBilling)}</td>
                          <td>{formatToNaira(subscription.amount)}</td>
                          <td>
                            <button
                              className={styles.customer_details__icon_button}
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className={styles.customer_details__empty}>
                    No subscriptions found
                  </p>
                )}
              </motion.div>
            )}

            {activeTab === "payments" && (
              <motion.div
                className={`${styles.customer_details__card} ${styles["customer_details__card--full"]}`}
                variants={fadeInVariants}
              >
                <div className={styles.customer_details__card_header}>
                  <h3 className={styles.customer_details__card_title}>
                    <i className="fas fa-credit-card"></i> Payment History
                  </h3>
                </div>

                {payments.length > 0 ? (
                  <table className={styles.customer_details__table}>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Payment Method</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment.id}>
                          <td>{formatDate(payment.date)}</td>
                          <td>{formatToNaira(payment.amount)}</td>
                          <td>
                            <StatusBadge
                              status={
                                payment.status === "Completed"
                                  ? "active"
                                  : "pending"
                              }
                              label={payment.status}
                            />
                          </td>
                          <td>{payment.method}</td>
                          <td>
                            <button
                              className={styles.customer_details__icon_button}
                            >
                              Receipt
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className={styles.customer_details__empty}>
                    No payment history found
                  </p>
                )}
              </motion.div>
            )}

            {activeTab === "notes" && (
              <motion.div
                className={`${styles.customer_details__card} ${styles["customer_details__card--full"]}`}
                variants={fadeInVariants}
              >
                <div className={styles.customer_details__card_header}>
                  <h3 className={styles.customer_details__card_title}>
                    <i className="fas fa-sticky-note"></i> Customer Notes
                  </h3>
                </div>

                <div className={styles.customer_details__notes}>
                  <textarea
                    placeholder="Add notes about this customer here..."
                    rows={6}
                    className={styles.customer_details__notes_input}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "4px",
                      border: "1px solid #c4cad4",
                      resize: "vertical",
                    }}
                  />

                  <div style={{ marginTop: "12px", textAlign: "right" }}>
                    <button className={styles.customer_details__edit_button}>
                      Save Notes
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      ) : (
        <div className="error-message">Customer not found</div>
      )}
    </AdminDashboardLayout>
  );
}
