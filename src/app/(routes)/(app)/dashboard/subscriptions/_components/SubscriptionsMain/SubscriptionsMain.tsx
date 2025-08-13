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

// Mock data
const mockSubscriptions: Subscription[] = [
  {
    id: "1",
    serviceName: "Deep Home Cleaning",
    serviceType: ServiceCategory.Cleaning,
    status: SubscriptionStatus.Active,
    frequency: SubscriptionFrequency.Weekly,
    nextServiceDate: new Date(2024, 7, 20, 10, 0),
    price: 25000,
    startDate: new Date(2024, 5, 1),
    provider: "Maria Rodriguez",
    address: "24 Emmanuel Osakwe Street, Lagos",
    notes: "Focus on kitchen and bathrooms",
    totalServices: 52,
    completedServices: 12,
    remainingServices: 40,
    autoRenewal: true,
    billingCycle: "monthly",
    lastPaymentDate: new Date(2024, 6, 1),
    nextBillingDate: new Date(2024, 7, 1),
    paymentMethod: "Credit Card ****4242",
  },
  {
    id: "2",
    serviceName: "Laundry Service",
    serviceType: ServiceCategory.Laundry,
    status: SubscriptionStatus.Active,
    frequency: SubscriptionFrequency.BiWeekly,
    nextServiceDate: new Date(2024, 7, 22, 14, 0),
    price: 8000,
    startDate: new Date(2024, 6, 15),
    provider: "QuickWash Team",
    address: "24 Emmanuel Osakwe Street, Lagos",
    notes: "3 bags of laundry, no starch",
    totalServices: 26,
    completedServices: 4,
    remainingServices: 22,
    autoRenewal: true,
    billingCycle: "monthly",
    lastPaymentDate: new Date(2024, 6, 15),
    nextBillingDate: new Date(2024, 7, 15),
    paymentMethod: "Debit Card ****8901",
    discount: 10,
  },
  {
    id: "3",
    serviceName: "Meal Preparation",
    serviceType: ServiceCategory.Cooking,
    status: SubscriptionStatus.Paused,
    frequency: SubscriptionFrequency.Weekly,
    nextServiceDate: new Date(2024, 8, 5, 17, 0),
    price: 15000,
    startDate: new Date(2024, 4, 1),
    provider: "Chef Kemi",
    address: "24 Emmanuel Osakwe Street, Lagos",
    notes: "Vegetarian meals only, paused due to travel",
    totalServices: 52,
    completedServices: 20,
    remainingServices: 32,
    autoRenewal: true,
    billingCycle: "monthly",
    lastPaymentDate: new Date(2024, 6, 1),
    nextBillingDate: new Date(2024, 8, 1),
    paymentMethod: "Credit Card ****4242",
  },
  {
    id: "4",
    serviceName: "Pest Control Treatment",
    serviceType: ServiceCategory.PestControl,
    status: SubscriptionStatus.Active,
    frequency: SubscriptionFrequency.Monthly,
    nextServiceDate: new Date(2024, 7, 25, 8, 0),
    price: 20000,
    startDate: new Date(2024, 0, 1),
    provider: "PestPro Team",
    address: "24 Emmanuel Osakwe Street, Lagos",
    notes: "Monthly prevention service",
    totalServices: 12,
    completedServices: 8,
    remainingServices: 4,
    autoRenewal: false,
    billingCycle: "quarterly",
    lastPaymentDate: new Date(2024, 6, 1),
    nextBillingDate: new Date(2024, 9, 1),
    paymentMethod: "Bank Transfer",
  },
  {
    id: "5",
    serviceName: "Grocery Shopping",
    serviceType: ServiceCategory.Errands,
    status: SubscriptionStatus.Expired,
    frequency: SubscriptionFrequency.Weekly,
    nextServiceDate: new Date(2024, 6, 30, 9, 0),
    price: 5000,
    startDate: new Date(2024, 3, 1),
    endDate: new Date(2024, 6, 30),
    provider: "Shopping Assistant",
    address: "Shoprite, Ikeja",
    notes: "Weekly grocery runs - expired and needs renewal",
    totalServices: 16,
    completedServices: 16,
    remainingServices: 0,
    autoRenewal: false,
    billingCycle: "monthly",
    lastPaymentDate: new Date(2024, 5, 1),
    nextBillingDate: new Date(2024, 7, 1),
    paymentMethod: "Credit Card ****4242",
  },
  {
    id: "6",
    serviceName: "Office Cleaning",
    serviceType: ServiceCategory.Cleaning,
    status: SubscriptionStatus.PendingActivation,
    frequency: SubscriptionFrequency.BiWeekly,
    nextServiceDate: new Date(2024, 7, 25, 18, 0),
    price: 35000,
    startDate: new Date(2024, 7, 25),
    provider: "CleanPro Team",
    address: "Metro Office, Victoria Island",
    notes: "New subscription starting soon",
    totalServices: 26,
    completedServices: 0,
    remainingServices: 26,
    autoRenewal: true,
    billingCycle: "monthly",
    lastPaymentDate: new Date(2024, 7, 15),
    nextBillingDate: new Date(2024, 8, 15),
    paymentMethod: "Corporate Card ****1234",
  },
];

const SubscriptionsMain: React.FC = () => {
  const [selectedServiceType, setSelectedServiceType] = useState<
    ServiceCategory | "all"
  >("all");
  const [selectedStatus, setSelectedStatus] = useState<
    SubscriptionStatus | "all"
  >("all");
  const [selectedFrequency, setSelectedFrequency] = useState<
    SubscriptionFrequency | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [subscriptions] = useState<Subscription[]>(mockSubscriptions);
  const [showNotifications, setShowNotifications] = useState(false);

  // Filter subscriptions
  const filteredSubscriptions = useMemo(() => {
    let filtered = [...subscriptions];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (s) =>
          s.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.provider?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by service type
    if (selectedServiceType !== "all") {
      filtered = filtered.filter((s) => s.serviceType === selectedServiceType);
    }

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((s) => s.status === selectedStatus);
    }

    // Filter by frequency
    if (selectedFrequency !== "all") {
      filtered = filtered.filter((s) => s.frequency === selectedFrequency);
    }

    return filtered;
  }, [
    subscriptions,
    selectedServiceType,
    selectedStatus,
    selectedFrequency,
    searchQuery,
  ]);

  // Get next upcoming service
  const nextSubscription = useMemo(() => {
    const now = new Date();
    const active = subscriptions
      .filter((s) => {
        const serviceDate = new Date(s.nextServiceDate);
        return serviceDate > now && s.status === SubscriptionStatus.Active;
      })
      .sort(
        (a, b) =>
          new Date(a.nextServiceDate).getTime() -
          new Date(b.nextServiceDate).getTime()
      );
    return active[0] || null;
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
          [SubscriptionFrequency.Weekly]: 4.33,
          [SubscriptionFrequency.BiWeekly]: 2.17,
          [SubscriptionFrequency.Monthly]: 1,
          [SubscriptionFrequency.Quarterly]: 0.33,
        };
        return sum + s.price * multiplier[s.frequency];
      }, 0);

    return { active, paused, expired, totalMonthlyValue };
  }, [subscriptions]);

  const handleAddSubscription = () => {
    console.log("Add new subscription");
  };

  const handleExportData = () => {
    console.log("Export subscriptions data");
  };

  const handleServiceTypeChange = (value: string) => {
    setSelectedServiceType(value as ServiceCategory | "all");
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value as SubscriptionStatus | "all");
  };

  const handleFrequencyChange = (value: string) => {
    setSelectedFrequency(value as SubscriptionFrequency | "all");
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
                serviceName={nextSubscription.serviceName}
                serviceType={nextSubscription.serviceType as any}
                date={nextSubscription.nextServiceDate}
                status="Confirmed"
                as
                any
                provider={nextSubscription.provider}
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
              label="Service"
              value={selectedServiceType}
              onChange={handleServiceTypeChange}
              options={[
                { value: "all", label: "All Services" },
                { value: ServiceCategory.Cleaning, label: "Cleaning" },
                { value: ServiceCategory.Laundry, label: "Laundry" },
                { value: ServiceCategory.Cooking, label: "Cooking" },
                { value: ServiceCategory.Errands, label: "Errands" },
                { value: ServiceCategory.PestControl, label: "Pest Control" },
              ]}
            />
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
              label="Frequency"
              value={selectedFrequency}
              onChange={handleFrequencyChange}
              options={[
                { value: "all", label: "All Frequencies" },
                { value: SubscriptionFrequency.Weekly, label: "Weekly" },
                { value: SubscriptionFrequency.BiWeekly, label: "Bi-weekly" },
                { value: SubscriptionFrequency.Monthly, label: "Monthly" },
                { value: SubscriptionFrequency.Quarterly, label: "Quarterly" },
              ]}
            />
          </div>

          {/* Export Button */}
          <motion.button
            className={styles.subscriptionsMain__exportBtn}
            onClick={handleExportData}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={16} />
            Export
          </motion.button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={styles.subscriptionsMain__content}>
        {filteredSubscriptions.length > 0 ? (
          <SubscriptionListView subscriptions={filteredSubscriptions} />
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
              selectedServiceType !== "all" ||
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
