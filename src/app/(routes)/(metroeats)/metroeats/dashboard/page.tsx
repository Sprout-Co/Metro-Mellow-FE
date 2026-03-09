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
  ArrowRight,
  Plus,
  CheckCircle,
  CreditCard as CardIcon,
  Edit3,
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
  useUpdateProfileMutation,
  MealOrderStatus,
  MealStyle,
  GetMealOrdersQuery,
} from "@/graphql/api";
import { logout } from "@/lib/redux/slices/authSlice";
import { useMetroEatsCart } from "../_context/MetroEatsCartContext";
import styles from "./dashboard.module.scss";

const fmt = (n: number) => `₦${n.toLocaleString()}`;

function formatOrderDate(createdAt: string | unknown): string {
  if (!createdAt) return "—";
  const d = new Date(createdAt as string);
  const now = new Date();
  const isToday =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();
  if (isToday) {
    return `Today, ${d.toLocaleTimeString("en-NG", { hour: "numeric", minute: "2-digit" })}`;
  }
  return d.toLocaleDateString("en-NG", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function orderDisplayId(id: string): string {
  return id.length >= 8 ? `#${id.slice(-8).toUpperCase()}` : `#${id}`;
}

function statusLabel(status: MealOrderStatus): string {
  const map: Record<MealOrderStatus, string> = {
    [MealOrderStatus.Confirmed]: "Confirmed",
    [MealOrderStatus.Preparing]: "Preparing",
    [MealOrderStatus.ReadyForDelivery]: "Ready",
    [MealOrderStatus.OutForDelivery]: "In Transit",
    [MealOrderStatus.Delivered]: "Delivered",
    [MealOrderStatus.Received]: "Delivered",
    [MealOrderStatus.Cancelled]: "Cancelled",
  };
  return map[status] ?? status;
}

function statusBadgeClass(status: MealOrderStatus): string {
  if (
    status === MealOrderStatus.Delivered ||
    status === MealOrderStatus.Received
  ) {
    return styles["dashboard-page__status-badge--success"];
  }
  if (status === MealOrderStatus.Cancelled) {
    return styles["dashboard-page__status-badge--error"];
  }
  return styles["dashboard-page__status-badge--upcoming"];
}

const ACTIVE_STATUSES: MealOrderStatus[] = [
  MealOrderStatus.Confirmed,
  MealOrderStatus.Preparing,
  MealOrderStatus.ReadyForDelivery,
  MealOrderStatus.OutForDelivery,
];

function progressForStatus(status: MealOrderStatus): number {
  switch (status) {
    case MealOrderStatus.Confirmed:
      return 25;
    case MealOrderStatus.Preparing:
      return 50;
    case MealOrderStatus.ReadyForDelivery:
    case MealOrderStatus.OutForDelivery:
      return 75;
    case MealOrderStatus.Delivered:
    case MealOrderStatus.Received:
      return 100;
    default:
      return 0;
  }
}

type OrderItem = GetMealOrdersQuery["mealOrders"][0]["items"][0];

function ClientDashboardContent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [toast, setToast] = useState({ show: false, message: "" });

  const { data: ordersData, loading: ordersLoading } = useGetMealOrdersQuery();
  const { data: mealsData, loading: mealsLoading } = useGetMealsQuery();
  const { data: userData, refetch: refetchUser } = useGetCurrentUserQuery();
  const { data: paymentsData } = useGetPaymentMethodsQuery();
  const [updateProfile, { loading: profileSaving }] = useUpdateProfileMutation();
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
    () => [...mealOrders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [mealOrders],
  );

  const handleReorder = (items: OrderItem[]) => {
    for (const line of items) {
      const price =
        line.style === MealStyle.Plate
          ? (line.meal.pricePlate ?? 0)
          : (line.meal.priceBowl ?? 0);
      const extras = line.extras?.length
        ? line.extras.map((e) => ({ id: e.id, name: e.name, price: e.price, quantity: 1 }))
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
    const style = MealStyle.Plate;
    addItem(mealId, name, price, 1, undefined, style, image);
    triggerToast(`Added ${name} to cart!`);
    openCart();
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/metroeats");
    triggerToast("Logged out");
  };

  const DashboardView = () => {
    const order = activeOrder;
    const progress = order ? progressForStatus(order.mealOrderStatus) : 0;
    const isDelivered =
      order?.mealOrderStatus === MealOrderStatus.Delivered ||
      order?.mealOrderStatus === MealOrderStatus.Received;

    return (
      <div className={styles["dashboard-page__dashboard"]}>
        {order && (
          <section className={styles["dashboard-page__tracking-widget"]}>
            <div className={styles["dashboard-page__tracking-widget-info"]}>
              <div className={styles["dashboard-page__tracking-widget-header"]}>
                <div>
                  <h2 className={styles["dashboard-page__tracking-widget-status"]}>
                    {statusLabel(order.mealOrderStatus)}
                  </h2>
                  <p className={styles["dashboard-page__tracking-widget-eta"]}>
                    {isDelivered ? (
                      <strong style={{ color: "var(--color-dark-base)" }}>
                        Delivered
                      </strong>
                    ) : (
                      <>
                        Estimated arrival{" "}
                        <strong style={{ color: "var(--color-dark-base)" }}>
                          soon
                        </strong>
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className={styles["dashboard-page__progress-bar"]}>
                <div
                  className={styles["dashboard-page__progress-bar-fill"]}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className={styles["dashboard-page__progress-steps"]}>
                <span
                  className={
                    progress >= 25
                      ? styles["dashboard-page__progress-steps-step--active"]
                      : ""
                  }
                >
                  Accepted
                </span>
                <span
                  className={
                    progress >= 50
                      ? styles["dashboard-page__progress-steps-step--active"]
                      : ""
                  }
                >
                  Preparing
                </span>
                <span
                  className={
                    progress >= 75
                      ? styles["dashboard-page__progress-steps-step--active"]
                      : ""
                  }
                >
                  Out for Delivery
                </span>
                <span
                  className={
                    isDelivered
                      ? styles["dashboard-page__progress-steps-step--active"]
                      : ""
                  }
                >
                  Delivered
                </span>
              </div>
              <div style={{ marginTop: "var(--spacing-sm)" }}>
                <p style={{ fontWeight: 600, marginBottom: "var(--spacing-xs)" }}>
                  Order {orderDisplayId(order.id)}
                </p>
                <p
                  style={{
                    color: "var(--color-dark-muted)",
                    fontSize: "0.875rem",
                  }}
                >
                  {order.items
                    .map(
                      (i) =>
                        `${i.quantity}x ${i.meal.name}${i.extras?.length ? ` + extras` : ""}`,
                    )
                    .join(", ")}
                </p>
              </div>
            </div>
          </section>
        )}

        <section>
          <div className={styles["dashboard-page__section-header"]}>
            <h2 className={styles["dashboard-page__section-header-title"]}>
              Quick Reorder
            </h2>
            <button
              className={styles["dashboard-page__quick-order-link"]}
              onClick={() => setActiveTab("favorites")}
            >
              See All <ArrowRight size={16} />
            </button>
          </div>
          {mealsLoading ? (
            <p className={styles["dashboard-page__empty"]}>Loading meals…</p>
          ) : (
            <div className={styles["dashboard-page__quick-order-grid"]}>
              {meals.slice(0, 6).map((meal) => {
                const price = meal.pricePlate ?? meal.priceBowl ?? 0;
                return (
                  <article
                    className={styles["dashboard-page__meal-card"]}
                    key={meal.id}
                  >
                    <div className={styles["dashboard-page__meal-card-img-wrapper"]}>
                      <img
                        src={meal.image || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80"}
                        alt={meal.name}
                        className={styles["dashboard-page__meal-card-img"]}
                      />
                    </div>
                    <div className={styles["dashboard-page__meal-card-content"]}>
                      <h3 className={styles["dashboard-page__meal-card-title"]}>
                        {meal.name}
                      </h3>
                      <div className={styles["dashboard-page__meal-card-meta"]}>
                        <span>MetroEats</span>
                      </div>
                      <div className={styles["dashboard-page__meal-card-price"]}>
                        {fmt(price)}
                      </div>
                    </div>
                    <button
                      className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--primary"]} ${styles["dashboard-page__meal-card-action"]}`}
                      onClick={() =>
                        handleQuickOrder(meal.id, meal.name, price, meal.image)
                      }
                    >
                      <Plus size={18} /> Quick Order
                    </button>
                  </article>
                );
              })}
            </div>
          )}
          {!mealsLoading && meals.length === 0 && (
            <p className={styles["dashboard-page__empty"]}>No meals available.</p>
          )}
        </section>

        <section>
          <div className={styles["dashboard-page__section-header"]}>
            <h2 className={styles["dashboard-page__section-header-title"]}>
              Recent Orders
            </h2>
          </div>
          {ordersLoading ? (
            <p className={styles["dashboard-page__empty"]}>Loading orders…</p>
          ) : (
            <div className={styles["dashboard-page__history-card"]}>
              <table className={styles["dashboard-page__history-table"]}>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.slice(0, 5).map((order) => {
                    const isActive = ACTIVE_STATUSES.includes(order.mealOrderStatus);
                    return (
                      <tr key={order.id}>
                        <td>{orderDisplayId(order.id)}</td>
                        <td>{formatOrderDate(order.createdAt)}</td>
                        <td>{fmt(order.totalPrice)}</td>
                        <td>
                          <span
                            className={`${styles["dashboard-page__status-badge"]} ${statusBadgeClass(order.mealOrderStatus)}`}
                          >
                            {statusLabel(order.mealOrderStatus)}
                          </span>
                        </td>
                        <td>
                          {isActive ? (
                            <button
                              className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--outline"]} ${styles["dashboard-page__btn--sm"]}`}
                              onClick={() => triggerToast("Viewing active order above")}
                            >
                              Track
                            </button>
                          ) : (
                            <button
                              className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--outline"]} ${styles["dashboard-page__btn--sm"]}`}
                              onClick={() => handleReorder(order.items)}
                            >
                              Reorder
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {!ordersLoading && recentOrders.length === 0 && (
            <p className={styles["dashboard-page__empty"]}>No orders yet.</p>
          )}
        </section>
      </div>
    );
  };

  const HistoryView = () => (
    <div className={styles["dashboard-page__dashboard"]}>
      <div className={styles["dashboard-page__section-header"]}>
        <h2 className={styles["dashboard-page__section-header-title"]}>
          Full Order History
        </h2>
      </div>
      {ordersLoading ? (
        <p className={styles["dashboard-page__empty"]}>Loading orders…</p>
      ) : (
        <div className={styles["dashboard-page__history-card"]}>
          <table className={styles["dashboard-page__history-table"]}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => {
                const isActive = ACTIVE_STATUSES.includes(order.mealOrderStatus);
                return (
                  <tr key={order.id}>
                    <td>{orderDisplayId(order.id)}</td>
                    <td>{formatOrderDate(order.createdAt)}</td>
                    <td>{fmt(order.totalPrice)}</td>
                    <td>
                      <span
                        className={`${styles["dashboard-page__status-badge"]} ${statusBadgeClass(order.mealOrderStatus)}`}
                      >
                        {statusLabel(order.mealOrderStatus)}
                      </span>
                    </td>
                    <td>
                      {isActive ? (
                        <button
                          className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--outline"]} ${styles["dashboard-page__btn--sm"]}`}
                          onClick={() => setActiveTab("dashboard")}
                        >
                          Track
                        </button>
                      ) : (
                        <button
                          className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--outline"]} ${styles["dashboard-page__btn--sm"]}`}
                          onClick={() => handleReorder(order.items)}
                        >
                          Reorder
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {!ordersLoading && recentOrders.length === 0 && (
        <p className={styles["dashboard-page__empty"]}>No orders yet.</p>
      )}
    </div>
  );

  const FavoritesView = () => (
    <div className={styles["dashboard-page__dashboard"]}>
      <div className={styles["dashboard-page__section-header"]}>
        <h2 className={styles["dashboard-page__section-header-title"]}>
          Meals You Might Like
        </h2>
      </div>
      {mealsLoading ? (
        <p className={styles["dashboard-page__empty"]}>Loading…</p>
      ) : (
        <div className={styles["dashboard-page__quick-order-grid"]}>
          {meals.slice(0, 12).map((meal) => {
            const price = meal.pricePlate ?? meal.priceBowl ?? 0;
            return (
              <article
                className={styles["dashboard-page__meal-card"]}
                key={meal.id}
              >
                <div className={styles["dashboard-page__meal-card-img-wrapper"]}>
                  <img
                    src={meal.image || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80"}
                    alt={meal.name}
                    className={styles["dashboard-page__meal-card-img"]}
                  />
                </div>
                <div className={styles["dashboard-page__meal-card-content"]}>
                  <h3 className={styles["dashboard-page__meal-card-title"]}>
                    {meal.name}
                  </h3>
                  <div className={styles["dashboard-page__meal-card-meta"]}>
                    <span>MetroEats</span>
                  </div>
                  <div className={styles["dashboard-page__meal-card-price"]}>
                    {fmt(price)}
                  </div>
                </div>
                <button
                  className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--primary"]} ${styles["dashboard-page__meal-card-action"]}`}
                  onClick={() =>
                    handleQuickOrder(meal.id, meal.name, price, meal.image)
                  }
                >
                  <Plus size={18} /> Add to Cart
                </button>
              </article>
            );
          })}
        </div>
      )}
      {!mealsLoading && meals.length === 0 && (
        <p className={styles["dashboard-page__empty"]}>No meals available.</p>
      )}
    </div>
  );

  const PaymentsView = () => (
    <div className={styles["dashboard-page__dashboard"]}>
      <div className={styles["dashboard-page__section-header"]}>
        <h2 className={styles["dashboard-page__section-header-title"]}>
          Payment Methods
        </h2>
        <button
          className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--primary"]}`}
          onClick={() => triggerToast("Add payment at checkout")}
        >
          <Plus size={18} /> Add New Card
        </button>
      </div>
      <div className={styles["dashboard-page__quick-order-grid"]}>
        {paymentMethods.map((pm) => (
          <article
            key={pm.id}
            className={styles["dashboard-page__meal-card"]}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: "var(--spacing-xl)",
            }}
          >
            <div
              style={{
                background: "var(--color-bg-light)",
                padding: "1rem",
                borderRadius: "var(--radius-lg)",
                marginRight: "var(--spacing-md)",
              }}
            >
              <CardIcon size={32} color="var(--color-dark-base)" />
            </div>
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontFamily: "var(--font-secondary)",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                }}
              >
                •••• •••• •••• {pm.last4}
              </h3>
              <p style={{ color: "var(--color-dark-muted)" }}>
                Expires {String(pm.expiryMonth).padStart(2, "0")}/{pm.expiryYear}
              </p>
            </div>
            {pm.isDefault && (
              <span
                className={`${styles["dashboard-page__status-badge"]} ${styles["dashboard-page__status-badge--success"]}`}
              >
                Default
              </span>
            )}
          </article>
        ))}
      </div>
      {paymentMethods.length === 0 && (
        <p className={styles["dashboard-page__empty"]}>
          No payment methods. Add one at checkout.
        </p>
      )}
    </div>
  );

  const [settingsFirstName, setSettingsFirstName] = useState(me?.firstName ?? "");
  const [settingsLastName, setSettingsLastName] = useState(me?.lastName ?? "");
  const [settingsPhone, setSettingsPhone] = useState(me?.phone ?? "");

  React.useEffect(() => {
    setSettingsFirstName(me?.firstName ?? "");
    setSettingsLastName(me?.lastName ?? "");
    setSettingsPhone(me?.phone ?? "");
  }, [me?.firstName, me?.lastName, me?.phone]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        variables: {
          input: {
            firstName: settingsFirstName.trim() || undefined,
            lastName: settingsLastName.trim() || undefined,
            phone: settingsPhone.trim() || undefined,
          },
        },
      });
      await refetchUser();
      triggerToast("Settings saved successfully!");
    } catch {
      triggerToast("Failed to save settings.");
    }
  };

  const SettingsView = () => (
    <div className={styles["dashboard-page__dashboard"]}>
      <div className={styles["dashboard-page__section-header"]}>
        <h2 className={styles["dashboard-page__section-header-title"]}>
          Account Settings
        </h2>
      </div>
      <div className={styles["dashboard-page__history-card"]}>
        <div className={styles["dashboard-page__settings-card"]}>
          <div className={styles["dashboard-page__settings-avatar-row"]}>
            <div className={styles["dashboard-page__settings-avatar"]}>
              {(me?.firstName?.[0] ?? me?.email?.[0] ?? "?").toUpperCase()}
            </div>
            <div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-secondary)",
                }}
              >
                {me ? `${me.firstName} ${me.lastName}`.trim() || "User" : "—"}
              </h3>
              <p style={{ color: "var(--color-dark-muted)" }}>
                {me?.email ?? "—"}
              </p>
              <button
                className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--outline"]}`}
                style={{ marginTop: "var(--spacing-md)" }}
                onClick={() => triggerToast("Avatar upload not available")}
              >
                <Edit3 size={16} /> Change Picture
              </button>
            </div>
          </div>

          <form onSubmit={handleSaveSettings}>
            <div className={styles["dashboard-page__settings-grid"]}>
              <div className={styles["dashboard-page__settings-field"]}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "var(--spacing-xs)",
                    fontWeight: 600,
                  }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  value={settingsFirstName}
                  onChange={(e) => setSettingsFirstName(e.target.value)}
                />
              </div>
              <div className={styles["dashboard-page__settings-field"]}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "var(--spacing-xs)",
                    fontWeight: 600,
                  }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  value={settingsLastName}
                  onChange={(e) => setSettingsLastName(e.target.value)}
                />
              </div>
              <div
                className={styles["dashboard-page__settings-field"]}
                style={{ gridColumn: "1 / -1" }}
              >
                <label
                  style={{
                    display: "block",
                    marginBottom: "var(--spacing-xs)",
                    fontWeight: 600,
                  }}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={settingsPhone}
                  onChange={(e) => setSettingsPhone(e.target.value)}
                />
              </div>
            </div>

            <div className={styles["dashboard-page__settings-actions"]}>
              <button
                type="submit"
                className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--primary"]}`}
                disabled={profileSaving}
              >
                {profileSaving ? "Saving…" : "Save Changes"}
              </button>
              <button
                type="button"
                className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--outline"]}`}
                onClick={() => setActiveTab("dashboard")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

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

          {activeTab === "dashboard" && <DashboardView />}
          {activeTab === "history" && <HistoryView />}
          {activeTab === "favorites" && <FavoritesView />}
          {activeTab === "payments" && <PaymentsView />}
          {activeTab === "settings" && <SettingsView />}
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
