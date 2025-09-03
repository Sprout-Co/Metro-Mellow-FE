// src/app/(routes)/(app)/dashboard/subscriptions/_components/SubscriptionsMain/SubscriptionsMain.tsx
"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  List,
  Plus,
  Search,
  CalendarDays,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Download,
  Bell,
  RefreshCw,
  Pause,
  Play,
  Grid3X3,
} from "lucide-react";
import styles from "./SubscriptionsMain.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import FilterDropdown from "../../../bookings/_components/FilterDropdown/FilterDropdown";
import {
  useGetCustomerSubscriptionsQuery,
  SubscriptionStatus,
  ServiceCategory,
  SubscriptionFrequency,
  BillingCycle,
  ScheduleDays,
  TimeSlot,
  GetCustomerSubscriptionsQuery,
} from "@/graphql/api";
import SubscriptionListView from "../SubscriptionListView/SubscriptionListView";
import AppointmentCard from "@/components/ui/AppointmentCard";
import SubscriptionGridView from "../SubscriptionGridView/SubscriptionGridView";
import DashboardHeader from "../../../_components/DashboardHeader/DashboardHeader";
import { Routes } from "@/constants/routes";
import { useRouter } from "next/navigation";

// Type for GraphQL subscription data
type Subscription = GetCustomerSubscriptionsQuery["customerSubscriptions"][0];

const SubscriptionsMain: React.FC = () => {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<
    SubscriptionStatus | "all"
  >("all");
  const [selectedFrequency, setSelectedFrequency] = useState<string | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  // Fetch subscriptions from GraphQL
  const { data, loading, error, refetch } = useGetCustomerSubscriptionsQuery({
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
  });

  // Use GraphQL data directly
  const subscriptions = useMemo(() => {
    return data?.customerSubscriptions || [];
  }, [data]);
  const [viewType, setViewType] = useState<"list" | "grid">("list");

  const handleViewChange = (type: "list" | "grid") => {
    setViewType(type);
  };

  // Filter subscriptions
  const filteredSubscriptions = useMemo(() => {
    let filtered = [...subscriptions];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((s) =>
        s.subscriptionServices.some((service) =>
          service.service.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((s) => s.status === selectedStatus);
    }

    // Filter by billing cycle
    if (selectedFrequency !== "all") {
      filtered = filtered.filter(
        (s) => s.billingCycle.toLowerCase() === selectedFrequency
      );
    }

    return filtered;
  }, [subscriptions, selectedStatus, selectedFrequency, searchQuery]);

  const handleAddSubscription = () => {
    console.log("Add new subscription");
    router.push(Routes.DASHBOARD_SUBSCRIPTIONS_ADD);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value as SubscriptionStatus | "all");
  };

  const handleFrequencyChange = (value: string) => {
    setSelectedFrequency(value);
  };

  return (
    <div className={styles.subscriptionsMain}>
      {/* Header Section */}
      <DashboardHeader
        title="My Subscriptions"
        subtitle="Manage your recurring service subscriptions"
        actionBtnText="Add Subscription"
        actionBtnIcon={<Plus size={18} />}
        onActionButtonClick={handleAddSubscription}
      />

      {/* Controls Section */}
      <div className={styles.subscriptionsMain__controls}>
        <div className={styles.subscriptionsMain__controlsLeft}>
          {/* Search Bar */}
          <div className={styles.subscriptionsMain__searchContainer}>
            <Search className={styles.subscriptionsMain__searchIcon} />
            <input
              type="text"
              placeholder="Search subscriptions..."
              className={styles.subscriptionsMain__searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.subscriptionsMain__controlsRight}>
          {/* Filters */}
          <div className={styles.subscriptionsMain__filters}>
            <FilterDropdown
              label="Status"
              value={selectedStatus}
              onChange={handleStatusChange}
              options={[
                { value: "all", label: "All Status" },
                { value: SubscriptionStatus.Active, label: "Active" },
                { value: SubscriptionStatus.Paused, label: "Paused" },
                { value: SubscriptionStatus.Cancelled, label: "Cancelled" },
                { value: SubscriptionStatus.Expired, label: "Expired" },
                {
                  value: SubscriptionStatus.Pending,
                  label: "Pending",
                },
              ]}
            />
            <FilterDropdown
              label="Billing"
              value={selectedFrequency}
              onChange={handleFrequencyChange}
              options={[
                { value: "all", label: "All Billing Cycles" },
                { value: "monthly", label: "Monthly" },
                { value: "quarterly", label: "Quarterly" },
                { value: "annually", label: "Annually" },
              ]}
            />
          </div>

          <div className={styles.subscriptionsMain__viewToggle}>
            <motion.button
              className={`${styles.subscriptionsMain__viewBtn} ${
                viewType === "list"
                  ? styles["subscriptionsMain__viewBtn--active"]
                  : ""
              }`}
              onClick={() => handleViewChange("list")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <List size={18} />
            </motion.button>
            <motion.button
              className={`${styles.subscriptionsMain__viewBtn} ${
                viewType === "grid"
                  ? styles["subscriptionsMain__viewBtn--active"]
                  : ""
              }`}
              onClick={() => handleViewChange("grid")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Grid3X3 size={18} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={styles.subscriptionsMain__content}>
        {loading ? (
          <div className={styles.subscriptionsMain__loadingState}>
            <div className={styles.subscriptionsMain__loadingIcon}>
              <RefreshCw className="animate-spin" />
            </div>
            <h3 className={styles.subscriptionsMain__loadingTitle}>
              Loading subscriptions...
            </h3>
            <p className={styles.subscriptionsMain__loadingText}>
              Please wait while we fetch your subscription data.
            </p>
          </div>
        ) : error ? (
          <div className={styles.subscriptionsMain__errorState}>
            <div className={styles.subscriptionsMain__errorIcon}>
              <AlertCircle />
            </div>
            <h3 className={styles.subscriptionsMain__errorTitle}>
              Unable to load subscriptions
            </h3>
            <p className={styles.subscriptionsMain__errorText}>
              There was an error loading your subscriptions. Please try again.
            </p>
            <FnButton variant="primary" onClick={() => refetch()}>
              <RefreshCw size={18} />
              Try Again
            </FnButton>
          </div>
        ) : filteredSubscriptions.length > 0 ? (
          viewType === "list" ? (
            <SubscriptionListView subscriptions={filteredSubscriptions} />
          ) : (
            <SubscriptionGridView subscriptions={filteredSubscriptions} />
          )
        ) : (
          <div className={styles.subscriptionsMain__emptyState}>
            <div className={styles.subscriptionsMain__emptyIcon}>
              <RefreshCw />
            </div>
            <h3 className={styles.subscriptionsMain__emptyTitle}>
              No subscriptions found
            </h3>
            <p className={styles.subscriptionsMain__emptyText}>
              {searchQuery ||
              selectedStatus !== "all" ||
              selectedFrequency !== "all"
                ? "Try adjusting your filters to see more subscriptions"
                : "You don't have any subscriptions yet. Click the button below to create your first subscription."}
            </p>
            <FnButton variant="primary" onClick={handleAddSubscription}>
              <Plus size={18} />
              Create Your First Subscription
            </FnButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionsMain;
