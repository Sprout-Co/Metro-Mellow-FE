"use client";

import React, { useState, useMemo } from "react";
import {
  LayoutDashboard,
  Clock,
  Heart,
  CreditCard,
  Settings as SettingsIcon,
  LogOut,
  Search,
  Bell,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  useGetMealOrdersQuery,
  useGetMealsQuery,
  useGetCurrentUserQuery,
  useGetPaymentMethodsQuery,
  MealStyle,
} from "@/graphql/api";
import { logout } from "@/lib/redux/slices/authSlice";
import { useMetroEatsCart } from "../_context/MetroEatsCartContext";
import { ACTIVE_STATUSES, type OrderItem } from "./utils";
import DashboardTab from "./_components/DashboardTab/DashboardTab";
import HistoryTab from "./_components/HistoryTab/HistoryTab";
import FavoritesTab from "./_components/FavoritesTab/FavoritesTab";
import PaymentsTab from "./_components/PaymentsTab/PaymentsTab";
import SettingsTab from "./_components/SettingsTab/SettingsTab";
import styles from "./dashboard.module.scss";

function ClientDashboardContent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [toast, setToast] = useState({ show: false, message: "" });

  const { data: ordersData, loading: ordersLoading } = useGetMealOrdersQuery();
  const { data: mealsData, loading: mealsLoading } = useGetMealsQuery();
  const { data: userData } = useGetCurrentUserQuery();
  const { data: paymentsData } = useGetPaymentMethodsQuery();
  const { addItem, openCart } = useMetroEatsCart();

  const mealOrders = ordersData?.mealOrders ?? [];
  const meals = mealsData?.meals ?? [];
  const me = userData?.me;
  const paymentMethods = paymentsData?.paymentMethods ?? [];

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
  const greeting = firstName ? `Hello, ${firstName} 👋` : "Hello 👋";

  return (
    <>
      <div className={styles["dashboard-page__app-layout"]}>
        <aside className={styles["dashboard-page__sidebar"]}>
          <div className={styles["dashboard-page__sidebar-logo"]}>
            <Link href="/metroeats">
              <Image
                src="/images/metroeats/brand-logo/stacked/yellow-on-black-stacked.png"
                alt="MetroEats"
                width={235}
                height={28}
              />
            </Link>
          </div>

          <nav className={styles["dashboard-page__sidebar-nav"]}>
            <button
              className={`${styles["dashboard-page__sidebar-nav-item"]} ${
                activeTab === "dashboard"
                  ? styles["dashboard-page__sidebar-nav-item--active"]
                  : ""
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              <LayoutDashboard size={20} /> Dashboard
            </button>
            <button
              className={`${styles["dashboard-page__sidebar-nav-item"]} ${
                activeTab === "history"
                  ? styles["dashboard-page__sidebar-nav-item--active"]
                  : ""
              }`}
              onClick={() => setActiveTab("history")}
            >
              <Clock size={20} /> Order History
            </button>
            <button
              className={`${styles["dashboard-page__sidebar-nav-item"]} ${
                activeTab === "favorites"
                  ? styles["dashboard-page__sidebar-nav-item--active"]
                  : ""
              }`}
              onClick={() => setActiveTab("favorites")}
            >
              <Heart size={20} /> Favorites
            </button>
            <button
              className={`${styles["dashboard-page__sidebar-nav-item"]} ${
                activeTab === "payments"
                  ? styles["dashboard-page__sidebar-nav-item--active"]
                  : ""
              }`}
              onClick={() => setActiveTab("payments")}
            >
              <CreditCard size={20} /> Payments
            </button>
          </nav>

          <div className={styles["dashboard-page__sidebar-footer"]}>
            <button
              className={`${styles["dashboard-page__sidebar-nav-item"]} ${
                activeTab === "settings"
                  ? styles["dashboard-page__sidebar-nav-item--active"]
                  : ""
              }`}
              onClick={() => setActiveTab("settings")}
            >
              <SettingsIcon size={20} /> Settings
            </button>
            <button
              className={styles["dashboard-page__sidebar-nav-item"]}
              style={{ color: "var(--color-error)" }}
              onClick={handleLogout}
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </aside>

        <main className={styles["dashboard-page__main-content"]}>
          <header className={styles["dashboard-page__header"]}>
            <div className={styles["dashboard-page__header-greeting"]}>
              <h1 className={styles["dashboard-page__header-title"]}>
                {activeTab === "dashboard" && greeting}
                {activeTab === "history" && "Order History 📜"}
                {activeTab === "favorites" && "Meals You Might Like ❤️"}
                {activeTab === "payments" && "Payment Methods 💳"}
                {activeTab === "settings" && "Account Settings ⚙️"}
              </h1>
              <p className={styles["dashboard-page__header-subtitle"]}>
                {activeTab === "dashboard" &&
                  "Ready for a delicious meal today?"}
                {activeTab !== "dashboard" &&
                  "Manage your account and preferences."}
              </p>
            </div>
            <div className={styles["dashboard-page__header-actions"]}>
              <Link
                href="/metroeats/menu"
                className={styles["dashboard-page__header-btn"]}
                title="Search menu"
              >
                <Search size={20} />
              </Link>
              <button
                className={styles["dashboard-page__header-btn"]}
                title="Notifications"
                style={{ position: "relative" }}
                onClick={() => triggerToast("No new notifications")}
              >
                <Bell size={20} />
              </button>
              <div
                className={styles["dashboard-page__header-profile"]}
                onClick={() => setActiveTab("settings")}
              >
                {(me?.firstName?.[0] ?? me?.email?.[0] ?? "?").toUpperCase()}
              </div>
            </div>
          </header>

          {activeTab === "dashboard" && (
            <DashboardTab
              activeOrder={activeOrder}
              meals={meals}
              mealsLoading={mealsLoading}
              ordersLoading={ordersLoading}
              recentOrders={recentOrders}
              onSeeAllFavorites={() => setActiveTab("favorites")}
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
          {activeTab === "favorites" && (
            <FavoritesTab
              meals={meals}
              mealsLoading={mealsLoading}
              onQuickOrder={handleQuickOrder}
            />
          )}
          {activeTab === "payments" && (
            <PaymentsTab
              paymentMethods={paymentMethods}
              onAddCardToast={triggerToast}
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
        </main>
      </div>

      <div
        className={`${styles["dashboard-page__toast"]} ${
          toast.show ? styles["dashboard-page__toast--show"] : ""
        }`}
      >
        <CheckCircle style={{ color: "var(--color-primary)" }} size={24} />
        <span>{toast.message}</span>
      </div>
    </>
  );
}

export default function ClientDashboardPage() {
  return (
    <React.Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
      <ClientDashboardContent />
    </React.Suspense>
  );
}
