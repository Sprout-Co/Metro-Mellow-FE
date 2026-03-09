"use client";

import React, { useState } from "react";
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
import styles from "./dashboard.module.scss";

function ClientDashboardContent() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [toast, setToast] = useState({ show: false, message: "" });

  const triggerToast = (message: string) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3000);
  };

  // --- Sub-components for different views ---

  const DashboardView = () => {
    const [progress, setProgress] = useState(65);
    const [eta, setEta] = useState(15);
    const [status, setStatus] = useState("On the way!");
    const [isDelivered, setIsDelivered] = useState(false);

    return (
      <div className={styles["dashboard-page__dashboard"]}>
        <section className={styles["dashboard-page__tracking-widget"]}>
          <div className={styles["dashboard-page__tracking-widget-info"]}>
            <div className={styles["dashboard-page__tracking-widget-header"]}>
              <div>
                <h2 className={styles["dashboard-page__tracking-widget-status"]}>
                  {status}
                </h2>
                <p className={styles["dashboard-page__tracking-widget-eta"]}>
                  Estimated arrival in{" "}
                  <strong style={{ color: "var(--color-dark-base)" }}>
                    {isDelivered ? "Arrived" : `${eta} mins`}
                  </strong>
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
                  styles["dashboard-page__progress-steps-step--active"]
                }
              >
                Accepted
              </span>
              <span
                className={
                  styles["dashboard-page__progress-steps-step--active"]
                }
              >
                Preparing
              </span>
              <span
                className={
                  styles["dashboard-page__progress-steps-step--active"]
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
                Order #ME-8492
              </p>
              <p
                style={{
                  color: "var(--color-dark-muted)",
                  fontSize: "0.875rem",
                }}
              >
                1x Spicy Chicken Sandwich Combo, 1x Extra Fries, 1x Vanilla
                Shake
              </p>
            </div>
          </div>
        </section>

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

          <div className={styles["dashboard-page__quick-order-grid"]}>
            <article className={styles["dashboard-page__meal-card"]}>
              <div className={styles["dashboard-page__meal-card-img-wrapper"]}>
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Burger"
                  className={styles["dashboard-page__meal-card-img"]}
                />
              </div>
              <div className={styles["dashboard-page__meal-card-content"]}>
                <h3 className={styles["dashboard-page__meal-card-title"]}>
                  Double Smash Burger
                </h3>
                <div className={styles["dashboard-page__meal-card-meta"]}>
                  <span>Burger Joint</span>
                  <span>★ 4.8</span>
                </div>
                <div className={styles["dashboard-page__meal-card-price"]}>
                  $14.50
                </div>
              </div>
              <button
                className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--primary"]} ${styles["dashboard-page__meal-card-action"]}`}
                onClick={() =>
                  triggerToast("Added Double Smash Burger to cart!")
                }
              >
                <Plus size={18} /> Quick Order
              </button>
            </article>

            <article className={styles["dashboard-page__meal-card"]}>
              <div className={styles["dashboard-page__meal-card-img-wrapper"]}>
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Pizza"
                  className={styles["dashboard-page__meal-card-img"]}
                />
              </div>
              <div className={styles["dashboard-page__meal-card-content"]}>
                <h3 className={styles["dashboard-page__meal-card-title"]}>
                  Pepperoni Pan Pizza
                </h3>
                <div className={styles["dashboard-page__meal-card-meta"]}>
                  <span>Luigi's Pizzeria</span>
                  <span>★ 4.9</span>
                </div>
                <div className={styles["dashboard-page__meal-card-price"]}>
                  $18.00
                </div>
              </div>
              <button
                className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--primary"]} ${styles["dashboard-page__meal-card-action"]}`}
                onClick={() =>
                  triggerToast("Added Pepperoni Pan Pizza to cart!")
                }
              >
                <Plus size={18} /> Quick Order
              </button>
            </article>

            <article className={styles["dashboard-page__meal-card"]}>
              <div className={styles["dashboard-page__meal-card-img-wrapper"]}>
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Healthy Bowl"
                  className={styles["dashboard-page__meal-card-img"]}
                />
              </div>
              <div className={styles["dashboard-page__meal-card-content"]}>
                <h3 className={styles["dashboard-page__meal-card-title"]}>
                  Quinoa Veggie Bowl
                </h3>
                <div className={styles["dashboard-page__meal-card-meta"]}>
                  <span>Green Life</span>
                  <span>★ 4.7</span>
                </div>
              <div className={styles["dashboard-page__meal-card-price"]}>
                $12.99
              </div>
              </div>
              <button
                className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--primary"]} ${styles["dashboard-page__meal-card-action"]}`}
                onClick={() =>
                  triggerToast("Added Quinoa Veggie Bowl to cart!")
                }
              >
                <Plus size={18} /> Quick Order
              </button>
            </article>
          </div>
        </section>

        <section>
          <div className={styles["dashboard-page__section-header"]}>
            <h2 className={styles["dashboard-page__section-header-title"]}>
              Recent Orders
            </h2>
          </div>

          <div className={styles["dashboard-page__history-card"]}>
            <table className={styles["dashboard-page__history-table"]}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Restaurant</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ME-8492</td>
                  <td>Today, 12:30 PM</td>
                  <td>Chicken Republic</td>
                  <td>$22.50</td>
                  <td>
                    <span
                      className={`${styles["dashboard-page__status-badge"]} ${styles["dashboard-page__status-badge--upcoming"]}`}
                    >
                      In Transit
                    </span>
                  </td>
                  <td>
                    <button
                    className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--outline"]} ${styles["dashboard-page__btn--sm"]}`}
                      onClick={() => triggerToast("Tracking active order")}
                    >
                      Track
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>#ME-8310</td>
                  <td>Oct 24, 6:15 PM</td>
                  <td>Luigi's Pizzeria</td>
                  <td>$35.00</td>
                  <td>
                    <span
                      className={`${styles["dashboard-page__status-badge"]} ${styles["dashboard-page__status-badge--success"]}`}
                    >
                      Delivered
                    </span>
                  </td>
                  <td>
                    <button
                    className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--outline"]} ${styles["dashboard-page__btn--sm"]}`}
                      onClick={() => triggerToast("Added Pizza Order to cart")}
                    >
                      Reorder
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
      <div className={styles["dashboard-page__history-card"]}>
        <table className={styles["dashboard-page__history-table"]}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Restaurant</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#ME-8492</td>
              <td>Today, 12:30 PM</td>
              <td>Chicken Republic</td>
              <td>$22.50</td>
              <td>
                <span
                  className={`${styles["dashboard-page__status-badge"]} ${styles["dashboard-page__status-badge--upcoming"]}`}
                >
                  In Transit
                </span>
              </td>
              <td>
                <button
                  className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--outline"]} ${styles["dashboard-page__btn--sm"]}`}
                  onClick={() => setActiveTab("dashboard")}
                >
                  Track
                </button>
              </td>
            </tr>
            <tr>
              <td>#ME-8310</td>
              <td>Oct 24, 6:15 PM</td>
              <td>Luigi's Pizzeria</td>
              <td>$35.00</td>
              <td>
                <span
                  className={`${styles["dashboard-page__status-badge"]} ${styles["dashboard-page__status-badge--success"]}`}
                >
                  Delivered
                </span>
              </td>
              <td>
                <button
                  className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--outline"]} ${styles["dashboard-page__btn--sm"]}`}
                  onClick={() => triggerToast("Reordering...")}
                >
                  Reorder
                </button>
              </td>
            </tr>
            <tr>
              <td>#ME-8105</td>
              <td>Oct 20, 1:00 PM</td>
              <td>Burger Joint</td>
              <td>$18.50</td>
              <td>
                <span
                  className={`${styles["dashboard-page__status-badge"]} ${styles["dashboard-page__status-badge--success"]}`}
                >
                  Delivered
                </span>
              </td>
              <td>
                <button
                  className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--outline"]} ${styles["dashboard-page__btn--sm"]}`}
                  onClick={() => triggerToast("Reordering...")}
                >
                  Reorder
                </button>
              </td>
            </tr>
            <tr>
              <td>#ME-7992</td>
              <td>Oct 15, 7:45 PM</td>
              <td>Green Life</td>
              <td>$15.99</td>
              <td>
                <span
                  className={`${styles["dashboard-page__status-badge"]} ${styles["dashboard-page__status-badge--success"]}`}
                >
                  Delivered
                </span>
              </td>
              <td>
                <button
                  className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--outline"]} ${styles["dashboard-page__btn--sm"]}`}
                  onClick={() => triggerToast("Reordering...")}
                >
                  Reorder
                </button>
              </td>
            </tr>
            <tr>
              <td>#ME-7850</td>
              <td>Oct 05, 8:30 PM</td>
              <td>Sushi Master</td>
              <td>$42.00</td>
              <td>
                <span
                  className={`${styles["dashboard-page__status-badge"]} ${styles["dashboard-page__status-badge--success"]}`}
                >
                  Delivered
                </span>
              </td>
              <td>
                <button
                  className="btn btn--outline btn--sm"
                  onClick={() => triggerToast("Reordering...")}
                >
                  Reorder
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const FavoritesView = () => (
    <div className={styles["dashboard-page__dashboard"]}>
      <div className={styles["dashboard-page__section-header"]}>
        <h2 className={styles["dashboard-page__section-header-title"]}>
          Your Favorites
        </h2>
      </div>
      <div className={styles["dashboard-page__quick-order-grid"]}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <article className={styles["dashboard-page__meal-card"]} key={i}>
            <div
              className={styles["dashboard-page__meal-card-img-wrapper"]}
            >
              <img
                src={`https://images.unsplash.com/photo-${1568901346375 + i}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`}
                alt="Food item"
                className={styles["dashboard-page__meal-card-img"]}
              />
            </div>
            <div className={styles["dashboard-page__meal-card-content"]}>
              <h3 className={styles["dashboard-page__meal-card-title"]}>
                Favorite Meal #{i}
              </h3>
              <div className={styles["dashboard-page__meal-card-meta"]}>
                <span>Awesome Restaurant</span>
                <span>★ 4.9</span>
              </div>
              <div className={styles["dashboard-page__meal-card-price"]}>
                ${(10 + i * 2.5).toFixed(2)}
              </div>
            </div>
            <button
              className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--primary"]} ${styles["dashboard-page__meal-card-action"]}`}
              onClick={() => triggerToast(`Added Favorite Meal #${i} to cart!`)}
            >
              <Plus size={18} /> Add to Cart
            </button>
          </article>
        ))}
      </div>
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
          onClick={() => triggerToast("Add payment method flow started")}
        >
          <Plus size={18} /> Add New Card
        </button>
      </div>
      <div className="quick-order__grid">
        <article
          className="meal-card"
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
              •••• •••• •••• 4242
            </h3>
            <p style={{ color: "var(--color-dark-muted)" }}>Expires 12/26</p>
          </div>
          <span className="status-badge status-badge--success">Default</span>
        </article>

        <article
          className="meal-card"
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
            <CardIcon size={32} color="var(--color-dark-muted)" />
          </div>
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontFamily: "var(--font-secondary)",
                fontWeight: 700,
                fontSize: "1.25rem",
              }}
            >
              •••• •••• •••• 5555
            </h3>
            <p style={{ color: "var(--color-dark-muted)" }}>Expires 08/25</p>
          </div>
        </article>
      </div>
    </div>
  );

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
            <div className={styles["dashboard-page__settings-avatar"]}>A</div>
            <div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-secondary)",
                }}
              >
                Alex Johnson
              </h3>
              <p style={{ color: "var(--color-dark-muted)" }}>
                alex.johnson@example.com
              </p>
              <button
                className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--outline"]}`}
                style={{ marginTop: "var(--spacing-md)" }}
                onClick={() => triggerToast("Avatar upload opened")}
              >
                <Edit3 size={16} /> Change Picture
              </button>
            </div>
          </div>

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
              <input type="text" defaultValue="Alex" />
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
              <input type="text" defaultValue="Johnson" />
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
              <input type="tel" defaultValue="+1 (555) 123-4567" />
            </div>
          </div>

          <div className={styles["dashboard-page__settings-actions"]}>
            <button
              className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--primary"]}`}
              onClick={() => triggerToast("Settings saved successfully!")}
            >
              Save Changes
            </button>
            <button
              className={`${styles["dashboard-page__btn"]} ${styles["dashboard-page__btn--outline"]}`}
              onClick={() => setActiveTab("dashboard")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
              onClick={() => triggerToast("Logging out...")}
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </aside>

        <main className={styles["dashboard-page__main-content"]}>
          <header className={styles["dashboard-page__header"]}>
            <div className={styles["dashboard-page__header-greeting"]}>
              <h1 className={styles["dashboard-page__header-title"]}>
                {activeTab === "dashboard" && "Hello, Alex 👋"}
                {activeTab === "history" && "Order History 📜"}
                {activeTab === "favorites" && "Your Favorites ❤️"}
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
              <button
                className={styles["dashboard-page__header-btn"]}
                title="Search"
                onClick={() => triggerToast("Search opened")}
              >
                <Search size={20} />
              </button>
              <button
                className={styles["dashboard-page__header-btn"]}
                title="Notifications"
                style={{ position: "relative" }}
                onClick={() => triggerToast("No new notifications")}
              >
                <Bell size={20} />
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "10px",
                    height: "10px",
                    background: "var(--color-primary)",
                    borderRadius: "50%",
                    border: "2px solid #fff",
                  }}
                ></span>
              </button>
              <div
                className={styles["dashboard-page__header-profile"]}
                onClick={() => setActiveTab("settings")}
              >
                A
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
