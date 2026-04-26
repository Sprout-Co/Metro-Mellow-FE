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
  ShoppingBag,
  History,
  Sparkles,
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
  MealOrderStatus,
} from "@/graphql/api";
import { logout } from "@/lib/redux/slices/authSlice";
import { useMetroEatsCart } from "../_context/MetroEatsCartContext";
import { ACTIVE_STATUSES, fmt, type OrderItem } from "./utils";
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

  const dashboardStats = useMemo(() => {
    const deliveredCount = mealOrders.filter(
      (order) =>
        order.mealOrderStatus === MealOrderStatus.Delivered ||
        order.mealOrderStatus === MealOrderStatus.Received,
    ).length;
    const activeCount = mealOrders.filter((order) =>
      ACTIVE_STATUSES.includes(order.mealOrderStatus),
    ).length;
    const totalSpend = mealOrders.reduce(
      (total, order) => total + (order.totalPrice ?? 0),
      0,
    );

    return {
      totalOrders: mealOrders.length,
      deliveredCount,
      activeCount,
      totalSpend,
    };
  }, [mealOrders]);

  const recommendationMeals = useMemo(() => meals.slice(0, 3), [meals]);

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
  const initials = (me?.firstName?.[0] ?? me?.email?.[0] ?? "?").toUpperCase();

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
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
                  {me
                    ? `${me.firstName ?? ""} ${me.lastName ?? ""}`.trim() ||
                      "User"
                    : "User"}
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
            <>
              <section className={styles.overviewSection}>
                <div className={styles.overviewStats}>
                  <article className={styles.overviewCard}>
                    <span className={styles.overviewLabel}>Total Orders</span>
                    <p className={styles.overviewValue}>
                      {dashboardStats.totalOrders}
                    </p>
                    <span className={styles.overviewMeta}>
                      {dashboardStats.deliveredCount} delivered
                    </span>
                  </article>
                  <article className={styles.overviewCard}>
                    <span className={styles.overviewLabel}>Active Orders</span>
                    <p className={styles.overviewValue}>
                      {dashboardStats.activeCount}
                    </p>
                    <span className={styles.overviewMeta}>
                      Live order tracking available
                    </span>
                  </article>
                  <article className={styles.overviewCard}>
                    <span className={styles.overviewLabel}>Total Spend</span>
                    <p className={styles.overviewValue}>
                      {fmt(dashboardStats.totalSpend)}
                    </p>
                    <span className={styles.overviewMeta}>
                      Across all MetroEats orders
                    </span>
                  </article>
                </div>

                <div className={styles.overviewActions}>
                  <button
                    className={styles.overviewAction}
                    onClick={() => router.push("/metroeats/menu")}
                  >
                    <div className={styles.overviewActionIcon}>
                      <ShoppingBag size={16} />
                    </div>
                    <div>
                      <p className={styles.overviewActionTitle}>Browse Menu</p>
                      <p className={styles.overviewActionText}>
                        Explore today&apos;s meals and combos.
                      </p>
                    </div>
                  </button>

                  <button
                    className={styles.overviewAction}
                    onClick={() => setActiveTab("history")}
                  >
                    <div className={styles.overviewActionIcon}>
                      <History size={16} />
                    </div>
                    <div>
                      <p className={styles.overviewActionTitle}>Order History</p>
                      <p className={styles.overviewActionText}>
                        Review previous orders and reorder quickly.
                      </p>
                    </div>
                  </button>

                  {recommendationMeals[0] && (
                    <button
                      className={styles.overviewAction}
                      onClick={() =>
                        handleQuickOrder(
                          recommendationMeals[0].id,
                          recommendationMeals[0].name,
                          recommendationMeals[0].pricePlate ?? 0,
                          recommendationMeals[0].image ?? undefined,
                        )
                      }
                    >
                      <div className={styles.overviewActionIcon}>
                        <Sparkles size={16} />
                      </div>
                      <div>
                        <p className={styles.overviewActionTitle}>
                          Quick Add: {recommendationMeals[0].name}
                        </p>
                        <p className={styles.overviewActionText}>
                          Add one plate instantly to your cart.
                        </p>
                      </div>
                    </button>
                  )}
                </div>

                {mealsLoading && (
                  <p className={styles.overviewHint}>
                    Loading meal suggestions...
                  </p>
                )}
                {!mealsLoading && recommendationMeals.length > 1 && (
                  <p className={styles.overviewHint}>
                    Suggestions:{" "}
                    {recommendationMeals
                      .slice(1)
                      .map((meal) => meal.name)
                      .join(" • ")}
                  </p>
                )}
              </section>

              <DashboardTab
                activeOrder={activeOrder}
                ordersLoading={ordersLoading}
                recentOrders={recentOrders}
                onSeeAllFavorites={() => router.push("/metroeats/menu")}
                onReorder={handleReorder}
              />
            </>
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

      <div className={`${styles.toast} ${toast.show ? styles.toastShow : ""}`}>
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
