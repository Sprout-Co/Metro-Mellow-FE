"use client";
import { useState, useEffect } from "react";
import AdminDashboardLayout from "../_components/AdminDashboardLayout/AdminDashboardLayout";
import styles from "./customers.module.scss";
import Card from "../_components/UI/Card/Card";
import Button from "../_components/UI/Button/Button";
import Table from "../_components/UI/Table/Table";
import StatusBadge from "../_components/UI/StatusBadge/StatusBadge";
import { motion } from "framer-motion";
import { useAuthOperations } from "@/graphql/hooks/auth/useAuthOperations";
import { User, UserRole, AccountStatus } from "@/graphql/api";
import { formatToNaira } from "@/utils/string";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectUser } from "@/lib/redux";
import { Icon } from "@/components/ui/Icon/Icon";
import AddCustomerModal from "./AddCustomerModal/AddCustomerModal";
import { useRouter } from "next/navigation";

export default function CustomersPage() {
  const router = useRouter();
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<AccountStatus | "all">(
    "all"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { handleGetUsers } = useAuthOperations();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await handleGetUsers(UserRole.Customer);
      setCustomers((data as User[]) || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch customers"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Filter customers based on search and status filter
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      searchQuery === "" ||
      `${customer.firstName || ""} ${customer.lastName || ""}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (customer.phone || "").includes(searchQuery);

    const matchesFilter =
      activeFilter === "all" || customer.accountStatus === activeFilter;

    return matchesSearch && matchesFilter;
  });

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

  // Table columns configuration
  const columns = [
    {
      key: "firstName",
      header: "Customer",
      width: "25%",
      render: (value: unknown, row: unknown) => {
        const customer = row as User;
        const fullName =
          `${customer.firstName || ""} ${customer.lastName || ""}`.trim() ||
          "N/A";
        return (
          <div className={styles.customers_page__customer_cell}>
            <div className={styles.customers_page__customer_initial}>
              {customer.firstName?.charAt(0) || "N"}
            </div>
            <div className={styles.customers_page__customer_info}>
              <div className={styles.customers_page__customer_name}>
                {fullName}
              </div>
              <div className={styles.customers_page__customer_email}>
                {customer.email}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      key: "phone",
      header: "Phone",
      width: "15%",
      render: (value: string) => value || "N/A",
    },
    {
      key: "createdAt",
      header: "Customer Since",
      width: "15%",
      render: (value: string) => formatDate(value),
    },
    {
      key: "accountStatus",
      header: "Status",
      width: "20%",
      render: (value: AccountStatus) => (
        <StatusBadge
          status={getStatusColor(value)}
          label={value.replace(/([A-Z])/g, " $1").trim()}
        />
      ),
    },
    {
      key: "emailVerified",
      header: "Verified",
      width: "10%",
      render: (value: boolean) => (
        <StatusBadge
          status={value ? "completed" : "pending"}
          label={value ? "Verified" : "Pending"}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      width: "10%",
      render: (_value: unknown, row: unknown) => {
        const customer = row as User;
        return (
          <div className={styles.customers_page__actions_cell}>
            <button
              className={styles.customers_page__action_button}
              onClick={() => router.push(`/admin/customers/${customer.id}`)}
            >
              View
            </button>
          </div>
        );
      },
    },
  ];

  // Customer statistics
  const customerStats = [
    { label: "Total Customers", value: customers.length },
    {
      label: "Active Customers",
      value: customers.filter((c) => c.accountStatus === AccountStatus.Active)
        .length,
    },
    {
      label: "Pending Verification",
      value: customers.filter(
        (c) => c.accountStatus === AccountStatus.PendingVerification
      ).length,
    },
    {
      label: "Inactive Customers",
      value: customers.filter((c) => c.accountStatus === AccountStatus.Inactive)
        .length,
    },
  ];

  const filterOptions = [
    { value: "all", label: "All" },
    { value: AccountStatus.Active, label: "Active" },
    { value: AccountStatus.PendingVerification, label: "Pending Verification" },
    { value: AccountStatus.Inactive, label: "Inactive" },
    { value: AccountStatus.Locked, label: "Locked" },
    { value: AccountStatus.Suspended, label: "Suspended" },
  ];

  return (
    <AdminDashboardLayout
      title="Customers"
      breadcrumbs={[
        { label: "Home", path: "/admin" },
        { label: "Customers", path: "/admin/customers" },
      ]}
    >
      <div className={styles.customers_page}>
        <div className={styles.customers_page__header}>
          <div className={styles.customers_page__title_area}>
            <h2 className={styles.customers_page__title}>
              Customer Management
            </h2>
            <p className={styles.customers_page__subtitle}>
              View and manage your customers
            </p>
          </div>

          <div className={styles.customers_page__actions}>
            <Button
              variant="primary"
              size="medium"
              icon="+"
              onClick={() => setIsAddCustomerModalOpen(true)}
            >
              Add Customer
            </Button>
          </div>
        </div>

        {error && (
          <div className={styles.customers_page__error}>
            <div className={styles.customers_page__error_content}>
              <Icon
                name="alert-triangle"
                size={16}
                className={styles.customers_page__error_icon}
              />
              <span className={styles.customers_page__error_message}>
                {error}
              </span>
              <button
                className={styles.customers_page__error_dismiss}
                onClick={() => setError(null)}
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className={styles.customers_page__stats}>
          {customerStats.map((stat, index) => (
            <Card key={index} className={styles.customers_page__stat_card}>
              <h3 className={styles.customers_page__stat_label}>
                {stat.label}
              </h3>
              <p className={styles.customers_page__stat_value}>{stat.value}</p>
            </Card>
          ))}
        </div>

        <Card className={styles.customers_page__content}>
          <div className={styles.customers_page__filters}>
            <div className={styles.customers_page__search}>
              <input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.customers_page__search_input}
              />
            </div>

            <div className={styles.customers_page__filter_buttons}>
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  className={`${styles.customers_page__filter_button} ${activeFilter === option.value ? styles["customers_page__filter_button--active"] : ""}`}
                  onClick={() =>
                    setActiveFilter(option.value as AccountStatus | "all")
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isLoading ? (
              <div className={styles.customers_page__loading}>
                Loading customers...
              </div>
            ) : (
              <Table
                columns={columns}
                data={filteredCustomers}
                onRowClick={(customer) =>
                  router.push(`/admin/customers/${customer.id}`)
                }
              />
            )}
          </motion.div>
        </Card>
      </div>

      <AddCustomerModal
        isOpen={isAddCustomerModalOpen}
        onClose={() => setIsAddCustomerModalOpen(false)}
        onSuccess={() => fetchCustomers()}
      />
    </AdminDashboardLayout>
  );
}
