"use client";

import React, { useState, useMemo } from "react";
import {
  LayoutDashboard,
  Clock,
  LogOut,
  CheckCircle,
  ChevronLeft,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  useGetMealOrdersQuery,
  useGetMealsQuery,
  useGetCurrentUserQuery,
  MealStyle,
} from "@/graphql/api";
import { logout } from "@/lib/redux/slices/authSlice";
import { useMetroEatsCart } from "../_context/MetroEatsCartContext";
import { ACTIVE_STATUSES, type OrderItem } from "./utils";
import DashboardTab from "./_components/DashboardTab/DashboardTab";
import HistoryTab from "./_components/HistoryTab/HistoryTab";
import SettingsTab from "./_components/SettingsTab/SettingsTab";
import styles from "./dashboard.module.scss";

type Tab = "dashboard" | "history" | "settings";

function ClientDashboardContent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { data: ordersData, loading: ordersLoading } = useGetMealOrdersQuery();
  const { data: mealsData, loading: mealsLoading } = useGetMealsQuery();
  const { data: userData } = useGetCurrentUserQuery();
  const { addItem, openCart } = useMetroEatsCart();

  const mealOrders = ordersData?.mealOrders ?? [];
  const meals = mealsData?.meals ?? [];
  const me = userData?.me;

  const triggerToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const activeOrder = useMemo(
    () =>
      mealOrders.find((o) => ACTIVE_STATUSES.includes(o.mealOrderStatus)) ??
      null,
    [mealOrders],
  );

  const recentOrders = useMemo(
    () =>
      [...mealOrders].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [mealOrders],
  );

  const handleReorder = (items: OrderItem[]) => {
    for (const line of items) {
      const price =
        line.style === MealStyle.Plate
          ? (line.meal.pricePlate ?? 0)
          : (line.meal.priceBowl ?? 0);
      const extras = line.extras?.length
        ? line.extras.map((e) => ({
            id: e.id,
            name: e.name,
            price: e.price,
            quantity: 1,
          }))
        : undefined;
      addItem(
        line.meal.id,
        line.meal.name,
        price,
        line.quantity,
        undefined,
        line.style as MealStyle,
        undefined,
        extras,
      );
    }
    triggerToast("Order added to cart!");
    openCart();
  };

  const handleQuickOrder = (
    mealId: string,
    name: string,
    price: number,
    image?: string,
  ) => {
    addItem(mealId, name, price, 1, undefined, MealStyle.Plate, image);
    triggerToast(`Added ${name} to cart!`);
    openCart();
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/metroeats");
    triggerToast("Logged out");
  };

  const firstName = me?.firstName ?? "";
  const greeting = firstName ? `Hello, ${firstName}` : "Hello";
  const initials = (
    me?.firstName?.[0] ??
    me?.email?.[0] ??
    "?"
  ).toUpperCase();

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "history", label: "Orders", icon: <Clock size={18} /> },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/metroeats" className={styles.backLink}>
            <ChevronLeft size={20} />
          </Link>
          <Link href="/metroeats" className={styles.logo}>
            <Image
              src="/images/metroeats/brand-logo/stacked/yellow-on-black-stacked.png"
              alt="MetroEats"
              width={120}
              height={28}
            />
          </Link>
        </div>

        <nav className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.headerRight}>
          <div
            className={styles.avatar}
            onClick={() => setShowProfileMenu((v) => !v)}
          >
            {initials}
          </div>
          {showProfileMenu && (
            <div className={styles.profileMenu}>
              <div className={styles.profileMenuHeader}>
                <p className={styles.profileMenuName}>
                  {me ? `${me.firstName ?? ""} ${me.lastName ?? ""}`.trim() || "User" : "User"}
                </p>
                <p className={styles.profileMenuEmail}>{me?.email ?? ""}</p>
              </div>
              <div className={styles.profileMenuDivider} />
              <button
                className={styles.profileMenuItem}
                onClick={() => {
                  setActiveTab("settings");
                  setShowProfileMenu(false);
                }}
              >
                <User size={16} /> Account Settings
              </button>
              <button
                className={`${styles.profileMenuItem} ${styles.profileMenuItemDanger}`}
                onClick={handleLogout}
              >
                <LogOut size={16} /> Log Out
              </button>
            </div>
          )}
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainInner}>
          {activeTab !== "settings" && (
            <div className={styles.greeting}>
              <h1 className={styles.greetingTitle}>
                {activeTab === "dashboard" ? greeting : "Order History"}
              </h1>
              <p className={styles.greetingSubtitle}>
                {activeTab === "dashboard"
                  ? "Ready for a delicious meal today?"
                  : "View and manage your past orders"}
              </p>
            </div>
          )}

          {activeTab === "settings" && (
            <div className={styles.greeting}>
              <button
                className={styles.settingsBack}
                onClick={() => setActiveTab("dashboard")}
              >
                <ChevronLeft size={18} /> Back to Dashboard
              </button>
              <h1 className={styles.greetingTitle}>Account Settings</h1>
            </div>
          )}

          {activeTab === "dashboard" && (
            <DashboardTab
              activeOrder={activeOrder}
              meals={meals}
              mealsLoading={mealsLoading}
              ordersLoading={ordersLoading}
              recentOrders={recentOrders}
              onSeeAllFavorites={() => router.push("/metroeats/menu")}
              onTrackToast={triggerToast}
              onReorder={handleReorder}
              onQuickOrder={handleQuickOrder}
            />
          )}
          {activeTab === "history" && (
            <HistoryTab
              ordersLoading={ordersLoading}
              recentOrders={recentOrders}
              onGoToDashboard={() => setActiveTab("dashboard")}
              onReorder={handleReorder}
            />
          )}
          {activeTab === "settings" && (
            <SettingsTab
              onSaveSuccess={() => triggerToast("Settings saved successfully!")}
              onSaveError={() => triggerToast("Failed to save settings.")}
              onCancel={() => setActiveTab("dashboard")}
              onToast={triggerToast}
            />
          )}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className={styles.mobileNav}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.mobileNavItem} ${activeTab === tab.id ? styles.mobileNavItemActive : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
        <button
          className={`${styles.mobileNavItem} ${activeTab === "settings" ? styles.mobileNavItemActive : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          <User size={18} />
          <span>Account</span>
        </button>
      </nav>

      {/* Profile menu overlay for mobile */}
      {showProfileMenu && (
        <div
          className={styles.profileOverlay}
          onClick={() => setShowProfileMenu(false)}
        />
      )}

      <div
        className={`${styles.toast} ${toast.show ? styles.toastShow : ""}`}
      >
        <CheckCircle size={20} />
        <span>{toast.message}</span>
        <button
          className={styles.toastClose}
          onClick={() => setToast({ show: false, message: "" })}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

export default function ClientDashboardPage() {
  return (
    <React.Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
      <ClientDashboardContent />
    </React.Suspense>
  );
}
