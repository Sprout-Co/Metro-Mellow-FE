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
  SubscriptionStatus,
  ServiceCategory,
  SubscriptionFrequency,
  Subscription,
} from "../../types/subscription";
import SubscriptionListView from "../SubscriptionListView/SubscriptionListView";
import AppointmentCard from "@/components/ui/AppointmentCard";
import SubscriptionGridView from "../SubscriptionGridView/SubscriptionGridView";

// Mock data with multiple services per subscription
const mockSubscriptions: Subscription[] = [
  {
    id: "1",
    name: "Complete Home Care Package",
    status: SubscriptionStatus.Active,
    billingCycle: "monthly",
    totalPrice: 45000,
    startDate: new Date(2024, 5, 1),
    address: "24 Emmanuel Osakwe Street, Lagos",
    autoRenewal: true,
    lastPaymentDate: new Date(2024, 6, 1),
    nextBillingDate: new Date(2024, 8, 1),
    paymentMethod: "Credit Card ****4242",
    discount: 15,
    services: [
      {
        id: "s1",
        serviceName: "Deep Home Cleaning",
        serviceType: ServiceCategory.Cleaning,
        price: 25000,
        frequency: SubscriptionFrequency.Weekly,
        scheduledDays: ["Monday"],
        completedServices: 12,
        totalServices: 52,
        nextServiceDate: new Date(2024, 7, 19, 10, 0),
        provider: "Maria Rodriguez",
        notes: "Focus on kitchen and bathrooms",
      },
      {
        id: "s2",
        serviceName: "Laundry Service",
        serviceType: ServiceCategory.Laundry,
        price: 8000,
        frequency: SubscriptionFrequency.BiWeekly,
        scheduledDays: ["Wednesday"],
        completedServices: 6,
        totalServices: 26,
        nextServiceDate: new Date(2024, 7, 21, 14, 0),
        provider: "QuickWash Team",
        notes: "3 bags of laundry, no starch",
      },
      {
        id: "s3",
        serviceName: "Meal Preparation",
        serviceType: ServiceCategory.Cooking,
        price: 15000,
        frequency: SubscriptionFrequency.Weekly,
        scheduledDays: ["Sunday"],
        completedServices: 10,
        totalServices: 52,
        nextServiceDate: new Date(2024, 7, 18, 17, 0),
        provider: "Chef Kemi",
        notes: "Vegetarian meals preferred",
      },
    ],
    upcomingBookings: [
      {
        id: "b1",
        serviceName: "Meal Preparation",
        serviceType: ServiceCategory.Cooking,
        date: new Date(2024, 7, 18),
        time: "5:00 PM",
        provider: "Chef Kemi",
        address: "24 Emmanuel Osakwe Street, Lagos",
        status: "confirmed",
      },
      {
        id: "b2",
        serviceName: "Deep Home Cleaning",
        serviceType: ServiceCategory.Cleaning,
        date: new Date(2024, 7, 19),
        time: "10:00 AM",
        provider: "Maria Rodriguez",
        address: "24 Emmanuel Osakwe Street, Lagos",
        status: "scheduled",
      },
      {
        id: "b3",
        serviceName: "Laundry Service",
        serviceType: ServiceCategory.Laundry,
        date: new Date(2024, 7, 21),
        time: "2:00 PM",
        provider: "QuickWash Team",
        address: "24 Emmanuel Osakwe Street, Lagos",
        status: "scheduled",
      },
    ],
    totalServices: 130,
    completedServices: 28,
    remainingServices: 102,
    nextServiceDate: new Date(2024, 7, 18, 17, 0),
    primaryProvider: "Maria Rodriguez",
  },
  {
    id: "2",
    name: "Professional Office Maintenance",
    status: SubscriptionStatus.Active,
    billingCycle: "monthly",
    totalPrice: 55000,
    startDate: new Date(2024, 6, 15),
    address: "Metro Office, Victoria Island",
    autoRenewal: true,
    lastPaymentDate: new Date(2024, 6, 15),
    nextBillingDate: new Date(2024, 7, 15),
    paymentMethod: "Corporate Card ****1234",
    services: [
      {
        id: "s4",
        serviceName: "Office Deep Cleaning",
        serviceType: ServiceCategory.Cleaning,
        price: 35000,
        frequency: SubscriptionFrequency.BiWeekly,
        scheduledDays: ["Friday"],
        completedServices: 4,
        totalServices: 26,
        nextServiceDate: new Date(2024, 7, 23, 18, 0),
        provider: "CleanPro Team",
        notes: "After hours cleaning only",
      },
      {
        id: "s5",
        serviceName: "Pest Control",
        serviceType: ServiceCategory.PestControl,
        price: 20000,
        frequency: SubscriptionFrequency.Monthly,
        scheduledDays: ["Last Friday"],
        completedServices: 2,
        totalServices: 12,
        nextServiceDate: new Date(2024, 7, 30, 19, 0),
        provider: "PestPro Team",
        notes: "Quarterly deep treatment",
      },
    ],
    upcomingBookings: [
      {
        id: "b4",
        serviceName: "Office Deep Cleaning",
        serviceType: ServiceCategory.Cleaning,
        date: new Date(2024, 7, 23),
        time: "6:00 PM",
        provider: "CleanPro Team",
        address: "Metro Office, Victoria Island",
        status: "scheduled",
      },
      {
        id: "b5",
        serviceName: "Pest Control",
        serviceType: ServiceCategory.PestControl,
        date: new Date(2024, 7, 30),
        time: "7:00 PM",
        provider: "PestPro Team",
        address: "Metro Office, Victoria Island",
        status: "scheduled",
      },
    ],
    totalServices: 38,
    completedServices: 6,
    remainingServices: 32,
    nextServiceDate: new Date(2024, 7, 23, 18, 0),
    primaryProvider: "CleanPro Team",
  },
  {
    id: "3",
    name: "Essential Home Services",
    status: SubscriptionStatus.Paused,
    billingCycle: "monthly",
    totalPrice: 20000,
    startDate: new Date(2024, 4, 1),
    address: "45 Admiralty Way, Lekki",
    autoRenewal: true,
    lastPaymentDate: new Date(2024, 6, 1),
    nextBillingDate: new Date(2024, 8, 1),
    paymentMethod: "Debit Card ****8901",
    services: [
      {
        id: "s6",
        serviceName: "Basic Cleaning",
        serviceType: ServiceCategory.Cleaning,
        price: 15000,
        frequency: SubscriptionFrequency.BiWeekly,
        scheduledDays: ["Saturday"],
        completedServices: 8,
        totalServices: 26,
        nextServiceDate: new Date(2024, 8, 5, 9, 0),
        provider: "Home Helpers",
        notes: "Paused due to travel",
      },
      {
        id: "s7",
        serviceName: "Grocery Run",
        serviceType: ServiceCategory.Errands,
        price: 5000,
        frequency: SubscriptionFrequency.Weekly,
        scheduledDays: ["Thursday"],
        completedServices: 12,
        totalServices: 52,
        nextServiceDate: new Date(2024, 8, 7, 11, 0),
        provider: "Shopping Assistant",
        notes: "Weekly grocery shopping",
      },
    ],
    upcomingBookings: [],
    totalServices: 78,
    completedServices: 20,
    remainingServices: 58,
    nextServiceDate: new Date(2024, 8, 5, 9, 0),
    primaryProvider: "Home Helpers",
  },
  {
    id: "4",
    name: "Premium Laundry Care",
    status: SubscriptionStatus.Active,
    billingCycle: "quarterly",
    totalPrice: 24000,
    startDate: new Date(2024, 0, 1),
    address: "12 Ozumba Mbadiwe, Victoria Island",
    autoRenewal: false,
    lastPaymentDate: new Date(2024, 6, 1),
    nextBillingDate: new Date(2024, 9, 1),
    paymentMethod: "Bank Transfer",
    services: [
      {
        id: "s8",
        serviceName: "Premium Laundry",
        serviceType: ServiceCategory.Laundry,
        price: 12000,
        frequency: SubscriptionFrequency.Weekly,
        scheduledDays: ["Tuesday", "Friday"],
        completedServices: 32,
        totalServices: 104,
        nextServiceDate: new Date(2024, 7, 20, 8, 0),
        provider: "Elite Laundry",
        notes: "Dry cleaning included",
      },
    ],
    upcomingBookings: [
      {
        id: "b6",
        serviceName: "Premium Laundry",
        serviceType: ServiceCategory.Laundry,
        date: new Date(2024, 7, 20),
        time: "8:00 AM",
        provider: "Elite Laundry",
        address: "12 Ozumba Mbadiwe, Victoria Island",
        status: "confirmed",
      },
      {
        id: "b7",
        serviceName: "Premium Laundry",
        serviceType: ServiceCategory.Laundry,
        date: new Date(2024, 7, 23),
        time: "8:00 AM",
        provider: "Elite Laundry",
        address: "12 Ozumba Mbadiwe, Victoria Island",
        status: "scheduled",
      },
    ],
    totalServices: 104,
    completedServices: 32,
    remainingServices: 72,
    nextServiceDate: new Date(2024, 7, 20, 8, 0),
    primaryProvider: "Elite Laundry",
  },
];

const SubscriptionsMain: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<
    SubscriptionStatus | "all"
  >("all");
  const [selectedFrequency, setSelectedFrequency] = useState<string | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [subscriptions] = useState<Subscription[]>(mockSubscriptions);
  const [viewType, setViewType] = useState<"list" | "grid">("list");

  const handleViewChange = (type: "list" | "grid") => {
    setViewType(type);
  };

  // Filter subscriptions
  const filteredSubscriptions = useMemo(() => {
    let filtered = [...subscriptions];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.services.some(
            (service) =>
              service.serviceName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              service.provider
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase())
          ) ||
          s.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((s) => s.status === selectedStatus);
    }

    // Filter by billing cycle
    if (selectedFrequency !== "all") {
      filtered = filtered.filter((s) => s.billingCycle === selectedFrequency);
    }

    return filtered;
  }, [subscriptions, selectedStatus, selectedFrequency, searchQuery]);

  // Get next upcoming service
  const nextSubscription = useMemo(() => {
    const now = new Date();
    const activeWithServices = subscriptions
      .filter(
        (s) => s.status === SubscriptionStatus.Active && s.nextServiceDate
      )
      .filter((s) => new Date(s.nextServiceDate!).getTime() > now.getTime())
      .sort(
        (a, b) =>
          new Date(a.nextServiceDate!).getTime() -
          new Date(b.nextServiceDate!).getTime()
      );
    return activeWithServices[0] || null;
  }, [subscriptions]);

  // Calculate subscription stats
  const subscriptionStats = useMemo(() => {
    const active = subscriptions.filter(
      (s) => s.status === SubscriptionStatus.Active
    ).length;
    const paused = subscriptions.filter(
      (s) => s.status === SubscriptionStatus.Paused
    ).length;
    const expired = subscriptions.filter(
      (s) => s.status === SubscriptionStatus.Expired
    ).length;
    const totalMonthlyValue = subscriptions
      .filter((s) => s.status === SubscriptionStatus.Active)
      .reduce((sum, s) => {
        const multiplier = {
          monthly: 1,
          quarterly: 0.33,
          annually: 0.083,
        };
        return sum + s.totalPrice * (multiplier[s.billingCycle] || 1);
      }, 0);

    return { active, paused, expired, totalMonthlyValue };
  }, [subscriptions]);

  const handleAddSubscription = () => {
    console.log("Add new subscription");
  };

  const handleExportData = () => {
    console.log("Export subscriptions data");
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
      <div className={styles.subscriptionsMain__header}>
        <div>
          <div className={styles.subscriptionsMain__headerContent}>
            <h1 className={styles.subscriptionsMain__title}>
              My Subscriptions
            </h1>
            <p className={styles.subscriptionsMain__subtitle}>
              Manage your recurring service subscriptions
            </p>
          </div>

          {/* Next Service Banner */}
          {nextSubscription && (
            <div className={styles.subscriptionsMain__upcomingService}>
              <AppointmentCard
                serviceName={`${nextSubscription.name} - Next Service`}
                serviceType={nextSubscription.services[0]?.serviceType as any}
                date={nextSubscription.nextServiceDate!}
                status={"Confirmed" as any}
                provider={nextSubscription.primaryProvider}
                variant="header"
              />
            </div>
          )}
        </div>

        <div className={styles.subscriptionsMain__headerActions}>
          <FnButton variant="white" size="md" onClick={handleAddSubscription}>
            <Plus size={18} />
            Add Subscription
          </FnButton>
        </div>
      </div>

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
                  value: SubscriptionStatus.PendingActivation,
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
        {filteredSubscriptions.length > 0 ? (
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
