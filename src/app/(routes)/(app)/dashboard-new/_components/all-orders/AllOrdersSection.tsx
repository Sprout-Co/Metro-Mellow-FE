"use client";

import { useState } from "react";
import ServiceList from "../services/list/ServiceList";
import { ServiceCardProps } from "../services/card/ServiceCard";
import SectionHeader from "../common/SectionHeader";
import FilterTabs, { FilterTab } from "../common/FilterTabs";
import styles from "./AllOrdersSection.module.scss";

// Mock data for services with different service types
const mockAllOrders: ServiceCardProps[] = [
  {
    id: "1",
    service_category: "Cleaning",
    status: "upcoming",
    date: "Sat, Aug 25",
    time: "8:00 AM",
    timeOfDay: "Morning",
    location: "7, Abisogun Street, Highcost, Barnawa, Lagos",
    additionalInfo: "Deep cleaning for the entire house",
    frequency: "One-time off",
    isAssigned: false,
    icon: "Sparkles",
  },
  {
    id: "2",
    service_category: "Laundry",
    status: "completed",
    date: "Sat, Aug 25",
    time: "8:00 AM",
    timeOfDay: "Morning",
    location: "7, Abisogun Street, Highcost, Barnawa, Lagos",
    additionalInfo: "Includes ironing and folding services",
    frequency: "Weekly",
    isAssigned: true,
    icon: "Shirt",
  },
  {
    id: "3",
    service_category: "Food",
    status: "canceled",
    date: "Sat, Aug 25",
    time: "8:00 AM",
    timeOfDay: "Morning",
    location: "7, Abisogun Street, Highcost, Barnawa, Lagos",
    additionalInfo: "Traditional Nigerian dishes",
    frequency: "One-time off",
    isAssigned: true,
    icon: "CookingPot",
  },
  {
    id: "4",
    service_category: "Cleaning",
    status: "upcoming",
    date: "Mon, Aug 27",
    time: "10:00 AM",
    timeOfDay: "Morning",
    location: "7, Abisogun Street, Highcost, Barnawa, Lagos",
    additionalInfo: "Focus on bathroom and kitchen",
    frequency: "One-time off",
    isAssigned: true,
    icon: "Sparkles",
  },
  {
    id: "5",
    service_category: "Pest Control",
    status: "completed",
    date: "Fri, Aug 24",
    time: "9:00 AM",
    timeOfDay: "Morning",
    location: "7, Abisogun Street, Highcost, Barnawa, Lagos",
    additionalInfo: "Treatment for ants and cockroaches",
    frequency: "Monthly",
    isAssigned: true,
    icon: "BugOff",
  },
  {
    id: "6",
    service_category: "Food",
    status: "upcoming",
    date: "Tue, Aug 28",
    time: "2:00 PM",
    timeOfDay: "Afternoon",
    location: "7, Abisogun Street, Highcost, Barnawa, Lagos",
    additionalInfo: "Home-cooked meals preparation",
    frequency: "Bi-weekly",
    isAssigned: true,
    icon: "CookingPot",
  },
  {
    id: "7",
    service_category: "Laundry",
    status: "completed",
    date: "Wed, Aug 22",
    time: "11:00 AM",
    timeOfDay: "Morning",
    location: "7, Abisogun Street, Highcost, Barnawa, Lagos",
    additionalInfo: "Dry cleaning and ironing",
    frequency: "One-time off",
    isAssigned: true,
    icon: "Shirt",
  },
  {
    id: "8",
    service_category: "Cleaning",
    status: "canceled",
    date: "Thu, Aug 23",
    time: "1:00 PM",
    timeOfDay: "Afternoon",
    location: "7, Abisogun Street, Highcost, Barnawa, Lagos",
    additionalInfo: "Window cleaning and dusting",
    frequency: "One-time off",
    isAssigned: true,
    icon: "Sparkles",
  },
];

export default function AllOrdersSection() {
  const [serviceFilterTabs] = useState<FilterTab[]>([
    { id: "upcoming", label: "UPCOMING", isActive: false },
    { id: "completed", label: "COMPLETED", isActive: false },
    { id: "canceled", label: "CANCELED", isActive: false },
    { id: "paused", label: "PAUSED", isActive: false },
    { id: "all", label: "ALL", isActive: true },
  ]);

  const [activeTab, setActiveTab] = useState<string>("all");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className={styles.allOrders}>
      <SectionHeader
        title="Overview"
        subtitle="Here are a list of your orders and bookings:"
      />

      <FilterTabs
        tabs={serviceFilterTabs}
        onTabChange={handleTabChange}
        className={styles.allOrders__filterTabs}
      />

      <div className={styles.allOrders__content}>
        <ServiceList services={mockAllOrders} activeTab={activeTab} />
      </div>
    </div>
  );
}
