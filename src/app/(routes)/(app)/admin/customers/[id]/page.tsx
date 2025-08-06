// src/app/(routes)/(app)/admin/customers/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./CustomerDetails.module.scss";
import AdminDashboardLayout from "../../_components/AdminDashboardLayout/AdminDashboardLayout";
import Card from "../../_components/UI/Card/Card";
import StatusBadge from "../../_components/UI/StatusBadge/StatusBadge";
import CustomerOverview from "./_components/CustomerOverview";
import CustomerBookings from "./_components/CustomerBookings";
import CustomerSubscriptions from "./_components/CustomerSubscriptions";
import CustomerPayments from "./_components/CustomerPayments";
import CustomerInvoices from "./_components/CustomerInvoices";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import { useBookingOperations } from "@/graphql/hooks/bookings/useBookingOperations";
import { useSubscriptionOperations } from "@/graphql/hooks/subscriptions/useSubscriptionOperations";
import { usePaymentOperations } from "@/graphql/hooks/payments/usePaymentOperations";
import { useInvoiceOperations } from "@/graphql/hooks/invoices/useInvoiceOperations";
import {
  User,
  AccountStatus,
  BookingStatus,
  Booking,
  Subscription,
  Payment,
  Invoice,
  SubscriptionStatus,
} from "@/graphql/api";
import { formatToNaira } from "@/utils/string";
import EditCustomerModal from "./_components/EditCustomerModal/EditCustomerModal";

export default function CustomerDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params.id as string;

  const [activeTab, setActiveTab] = useState("overview");
  const [customer, setCustomer] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingStates, setLoadingStates] = useState({
    customer: true,
    bookings: true,
    subscriptions: true,
    payments: true,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { handleGetUserById } = useAuthOperations();
  const { handleGetBookings } = useBookingOperations();
  const { handleGetSubscriptions } = useSubscriptionOperations();
  const { handleGetPayments } = usePaymentOperations();
  const { invoices } = useInvoiceOperations();

  // Animation variants for smooth transitions
  const fadeInVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const fetchCustomerData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setLoadingStates({
        customer: true,
        bookings: true,
        subscriptions: true,
        payments: true,
      });

      // Fetch customer details
      try {
        const customerData = await handleGetUserById(customerId);
        setCustomer(customerData as User);
        setLoadingStates((prev) => ({ ...prev, customer: false }));
      } catch (err) {
        console.error("Failed to fetch customer:", err);
        setLoadingStates((prev) => ({ ...prev, customer: false }));
        throw new Error("Failed to fetch customer details");
      }

      // Fetch all data and filter by customer ID
      // Note: Current GraphQL schema doesn't support customer ID parameters
      // These queries return all data for admin context, filtered client-side

      const fetchBookings = async () => {
        try {
          const allBookings = await handleGetBookings();
          const customerBookings =
            allBookings?.filter(
              (booking) => booking.customer?.id === customerId
            ) || [];
          setBookings(customerBookings as Booking[]);
          setLoadingStates((prev) => ({ ...prev, bookings: false }));
          return customerBookings;
        } catch (err) {
          console.warn("Failed to fetch bookings:", err);
          setLoadingStates((prev) => ({ ...prev, bookings: false }));
          return [];
        }
      };

      const fetchSubscriptions = async () => {
        try {
          const allSubscriptions = await handleGetSubscriptions();
          const customerSubscriptions =
            allSubscriptions?.filter(
              (subscription) => subscription.customer?.id === customerId
            ) || [];
          setSubscriptions(customerSubscriptions as Subscription[]);
          setLoadingStates((prev) => ({ ...prev, subscriptions: false }));
          return customerSubscriptions;
        } catch (err) {
          console.warn("Failed to fetch subscriptions:", err);
          setLoadingStates((prev) => ({ ...prev, subscriptions: false }));
          return [];
        }
      };

      const fetchPayments = async () => {
        try {
          const allPayments = await handleGetPayments();
          const customerPayments =
            allPayments?.filter(
              (payment) => payment.customer?.id === customerId
            ) || [];
          setPayments(customerPayments as Payment[]);
          setLoadingStates((prev) => ({ ...prev, payments: false }));
          return customerPayments;
        } catch (err) {
          console.warn("Failed to fetch payments:", err);
          setLoadingStates((prev) => ({ ...prev, payments: false }));
          return [];
        }
      };

      // Fetch all data in parallel
      const [customerBookings, customerSubscriptions, customerPayments] =
        await Promise.all([
          fetchBookings(),
          fetchSubscriptions(),
          fetchPayments(),
        ]);

      // Fallback to mock data if no real data is available
      // Use mock data as fallback if no real data was fetched
      if (customerBookings.length === 0) {
        // Create mock booking data that matches the GraphQL Booking type structure
        setBookings([
          // Mock bookings will be added when GraphQL schema is properly connected
        ] as Booking[]);
      }

      if (customerSubscriptions.length === 0) {
        // Create mock subscription data that matches the GraphQL Subscription type structure
        setSubscriptions([
          // Mock subscriptions will be added when GraphQL schema is properly connected
        ] as Subscription[]);
      }

      if (customerPayments.length === 0) {
        // Create mock payment data that matches the GraphQL Payment type structure
        setPayments([
          // Mock payments will be added when GraphQL schema is properly connected
        ] as Payment[]);
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch customer data"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, [
    customerId,
    handleGetUserById,
    handleGetBookings,
    handleGetSubscriptions,
    handleGetPayments,
  ]);

  const getStatusColor = (status: AccountStatus | undefined) => {
    if (!status) return "pending";
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
  const totalSpent = bookings.reduce(
    (sum, booking) => sum + (booking.totalPrice || 0),
    0
  );
  const completedBookings = bookings.filter(
    (b) => b.status === BookingStatus.Completed
  ).length;
  const activeSubscriptions = subscriptions.filter(
    (s) => s.status === SubscriptionStatus.Active
  ).length;

  // Filter invoices by customer ID (invoices from hook include all customer invoices)
  const customerInvoices: any[] =
    invoices.filter(
      (invoice: any) => invoice.payment?.customer?.id === customerId
    ) || [];
  const totalInvoiced = customerInvoices.reduce(
    (sum, invoice) => sum + (invoice.total || 0),
    0
  );

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
        <motion.div className={styles.customer_details__error}>
          <i className="fas fa-exclamation-triangle"></i>
          <h3>Error Loading Customer Data</h3>
          <p>{error}</p>
          <button
            className={styles.customer_details__edit_button}
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </motion.div>
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
              <button
                className={styles.customer_details__add_booking_button}
                onClick={() =>
                  router.push(`/admin/bookings/add?customerId=${customerId}`)
                }
              >
                Add Booking
              </button>
              <button
                className={styles.customer_details__edit_button}
                onClick={() => setIsEditModalOpen(true)}
              >
                Edit Customer
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
              className={`${styles.customer_details__tab} ${activeTab === "invoices" ? styles["customer_details__tab--active"] : ""}`}
              onClick={() => setActiveTab("invoices")}
            >
              Invoices
            </button>
          </div>

          <motion.div
            className={styles.customer_details__content}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && (
              <CustomerOverview
                customer={customer}
                bookings={bookings}
                totalSpent={totalSpent}
                completedBookings={completedBookings}
                activeSubscriptions={activeSubscriptions}
                customerInvoices={customerInvoices}
                totalInvoiced={totalInvoiced}
                loadingStates={loadingStates}
                onTabChange={setActiveTab}
                formatDate={formatDate}
                formatBookingStatus={formatBookingStatus}
                getStatusColor={getStatusColor}
              />
            )}

            {activeTab === "bookings" && (
              <CustomerBookings
                bookings={bookings}
                loadingStates={loadingStates}
                formatDate={formatDate}
                formatBookingStatus={formatBookingStatus}
              />
            )}

            {activeTab === "subscriptions" && (
              <CustomerSubscriptions
                subscriptions={subscriptions}
                loadingStates={loadingStates}
                formatDate={formatDate}
              />
            )}

            {activeTab === "payments" && (
              <CustomerPayments
                payments={payments}
                loadingStates={loadingStates}
                formatDate={formatDate}
              />
            )}

            {activeTab === "invoices" && (
              <CustomerInvoices
                customerInvoices={customerInvoices}
                formatDate={formatDate}
              />
            )}
          </motion.div>
        </motion.div>
      ) : (
        <div className="error-message">Customer not found</div>
      )}
      {customer && (
        <EditCustomerModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={() => {
            // Refresh customer data after successful edit
            fetchCustomerData();
          }}
          customer={customer}
        />
      )}
    </AdminDashboardLayout>
  );
}
