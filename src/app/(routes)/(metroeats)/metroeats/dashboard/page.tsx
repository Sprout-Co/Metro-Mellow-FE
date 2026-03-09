"use client";

import React, { useState, useEffect } from "react";
import {
  Utensils,
  LayoutDashboard,
  Clock,
  Heart,
  CreditCard,
  Settings as SettingsIcon,
  LogOut,
  Search,
  Bell,
  MapPin,
  Star,
  Phone,
  MessageSquare,
  ArrowRight,
  Plus,
  CheckCircle,
  CreditCard as CardIcon,
  Edit3,
} from "lucide-react";

export default function ClientDashboard() {
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

    useEffect(() => {
      if (isDelivered) return;

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus("Delivered!");
            setEta(0);
            setIsDelivered(true);
            triggerToast("Your food has arrived! Enjoy.");
            return 100;
          }
          const next = prev + 5;
          if (next >= 95 && next < 100) setStatus("Driver is nearby");
          return next;
        });

        setEta((prev) => {
          if (prev <= 0) return 0;
          // Decrease ETA periodically
          return Math.max(1, prev - 1);
        });
      }, 3000);

      return () => clearInterval(interval);
    }, [isDelivered]);

    return (
      <div className="dashboard">
        {/* ACTIVE ORDER WIDGET */}
        <section className="tracking-widget">
          <div className="tracking-widget__info">
            <div className="tracking-widget__header">
              <div>
                <h2 className="tracking-widget__status">{status}</h2>
                <p className="tracking-widget__eta">
                  Estimated arrival in{" "}
                  <strong style={{ color: "var(--color-dark-base)" }}>
                    {isDelivered ? "Arrived" : `${eta} mins`}
                  </strong>
                </p>
              </div>
              <button
                className="btn btn--outline"
                onClick={() => triggerToast("Viewing full map...")}
              >
                <MapPin size={18} /> View Map
              </button>
            </div>

            <div className="tracking-widget__progress">
              <div className="progress-bar">
                <div
                  className="progress-bar__fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="progress-steps">
                <span className="progress-steps__step--active">Accepted</span>
                <span className="progress-steps__step--active">Preparing</span>
                <span className="progress-steps__step--active">
                  Out for Delivery
                </span>
                <span
                  className={isDelivered ? "progress-steps__step--active" : ""}
                >
                  Delivered
                </span>
              </div>
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

          <div className="tracking-widget__driver">
            <h3
              style={{
                fontSize: "1.125rem",
                fontFamily: "var(--font-secondary)",
              }}
            >
              Your Courier
            </h3>
            <div className="driver-info">
              <div
                className="driver-info__avatar"
                style={{
                  backgroundImage:
                    "url('https://api.dicebear.com/7.x/avataaars/svg?seed=Felix')",
                }}
              ></div>
              <div className="driver-info__details">
                <span className="driver-info__name">Michael T.</span>
                <span className="driver-info__vehicle">
                  Silver Honda Civic • ABC 123
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    color: "var(--color-primary)",
                    marginTop: "4px",
                    fontWeight: 700,
                  }}
                >
                  <Star size={14} fill="currentColor" /> 4.9
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "var(--spacing-sm)",
                marginTop: "auto",
              }}
            >
              <button
                className="btn btn--outline"
                style={{ flex: 1, padding: "0.5rem" }}
                onClick={() => triggerToast("Calling driver...")}
              >
                <Phone size={18} />
              </button>
              <button
                className="btn btn--primary"
                style={{ flex: 1, padding: "0.5rem" }}
                onClick={() => triggerToast("Opening chat...")}
              >
                <MessageSquare size={18} /> Message
              </button>
            </div>
          </div>
        </section>

        {/* QUICK REORDER */}
        <section>
          <div className="section-header">
            <h2 className="section-header__title">Quick Reorder</h2>
            <button
              style={{
                background: "none",
                border: "none",
                color: "var(--color-primary)",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "4px",
                cursor: "pointer",
              }}
              onClick={() => setActiveTab("favorites")}
            >
              See All <ArrowRight size={16} />
            </button>
          </div>

          <div className="quick-order__grid">
            <article className="meal-card">
              <div className="meal-card__img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Burger"
                  className="meal-card__img"
                />
              </div>
              <div className="meal-card__content">
                <h3 className="meal-card__title">Double Smash Burger</h3>
                <div className="meal-card__meta">
                  <span>Burger Joint</span>
                  <span>★ 4.8</span>
                </div>
                <div className="meal-card__price">$14.50</div>
              </div>
              <button
                className="btn btn--primary meal-card__action"
                onClick={() =>
                  triggerToast("Added Double Smash Burger to cart!")
                }
              >
                <Plus size={18} /> Quick Order
              </button>
            </article>

            <article className="meal-card">
              <div className="meal-card__img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Pizza"
                  className="meal-card__img"
                />
              </div>
              <div className="meal-card__content">
                <h3 className="meal-card__title">Pepperoni Pan Pizza</h3>
                <div className="meal-card__meta">
                  <span>Luigi's Pizzeria</span>
                  <span>★ 4.9</span>
                </div>
                <div className="meal-card__price">$18.00</div>
              </div>
              <button
                className="btn btn--primary meal-card__action"
                onClick={() =>
                  triggerToast("Added Pepperoni Pan Pizza to cart!")
                }
              >
                <Plus size={18} /> Quick Order
              </button>
            </article>

            <article className="meal-card">
              <div className="meal-card__img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Healthy Bowl"
                  className="meal-card__img"
                />
              </div>
              <div className="meal-card__content">
                <h3 className="meal-card__title">Quinoa Veggie Bowl</h3>
                <div className="meal-card__meta">
                  <span>Green Life</span>
                  <span>★ 4.7</span>
                </div>
                <div className="meal-card__price">$12.99</div>
              </div>
              <button
                className="btn btn--primary meal-card__action"
                onClick={() =>
                  triggerToast("Added Quinoa Veggie Bowl to cart!")
                }
              >
                <Plus size={18} /> Quick Order
              </button>
            </article>
          </div>
        </section>

        {/* RECENT ORDERS HISTORY */}
        <section>
          <div className="section-header">
            <h2 className="section-header__title">Recent Orders</h2>
          </div>

          <div className="history-card">
            <table className="history-table">
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
                    <span className="status-badge status-badge--upcoming">
                      In Transit
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn--outline btn--sm"
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
                    <span className="status-badge status-badge--success">
                      Delivered
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn--outline btn--sm"
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
    <div className="dashboard">
      <div className="section-header">
        <h2 className="section-header__title">Full Order History</h2>
      </div>
      <div className="history-card">
        <table className="history-table">
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
                <span className="status-badge status-badge--upcoming">
                  In Transit
                </span>
              </td>
              <td>
                <button
                  className="btn btn--outline btn--sm"
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
                <span className="status-badge status-badge--success">
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
            <tr>
              <td>#ME-8105</td>
              <td>Oct 20, 1:00 PM</td>
              <td>Burger Joint</td>
              <td>$18.50</td>
              <td>
                <span className="status-badge status-badge--success">
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
            <tr>
              <td>#ME-7992</td>
              <td>Oct 15, 7:45 PM</td>
              <td>Green Life</td>
              <td>$15.99</td>
              <td>
                <span className="status-badge status-badge--success">
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
            <tr>
              <td>#ME-7850</td>
              <td>Oct 05, 8:30 PM</td>
              <td>Sushi Master</td>
              <td>$42.00</td>
              <td>
                <span className="status-badge status-badge--success">
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
    <div className="dashboard">
      <div className="section-header">
        <h2 className="section-header__title">Your Favorites</h2>
      </div>
      <div className="quick-order__grid">
        {/* Repeating cards for demo */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <article className="meal-card" key={i}>
            <div className="meal-card__img-wrapper">
              <img
                src={`https://images.unsplash.com/photo-${1568901346375 + i}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`}
                alt="Food item"
                className="meal-card__img"
              />
            </div>
            <div className="meal-card__content">
              <h3 className="meal-card__title">Favorite Meal #{i}</h3>
              <div className="meal-card__meta">
                <span>Awesome Restaurant</span>
                <span>★ 4.9</span>
              </div>
              <div className="meal-card__price">
                ${(10 + i * 2.5).toFixed(2)}
              </div>
            </div>
            <button
              className="btn btn--primary meal-card__action"
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
    <div className="dashboard">
      <div className="section-header">
        <h2 className="section-header__title">Payment Methods</h2>
        <button
          className="btn btn--primary"
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
    <div className="dashboard">
      <div className="section-header">
        <h2 className="section-header__title">Account Settings</h2>
      </div>
      <div
        className="history-card"
        style={{ padding: "var(--spacing-2xl)", maxWidth: "800px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-xl)",
            marginBottom: "var(--spacing-2xl)",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "var(--radius-pill)",
              backgroundColor: "var(--color-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.5rem",
              fontWeight: 700,
            }}
          >
            A
          </div>
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
              className="btn btn--outline"
              style={{ marginTop: "var(--spacing-md)" }}
              onClick={() => triggerToast("Avatar upload opened")}
            >
              <Edit3 size={16} /> Change Picture
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--spacing-lg)",
          }}
        >
          <div>
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
              defaultValue="Alex"
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                outline: "none",
              }}
            />
          </div>
          <div>
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
              defaultValue="Johnson"
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                outline: "none",
              }}
            />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
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
              defaultValue="+1 (555) 123-4567"
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                outline: "none",
              }}
            />
          </div>
        </div>

        <div
          style={{
            marginTop: "var(--spacing-2xl)",
            display: "flex",
            gap: "var(--spacing-md)",
          }}
        >
          <button
            className="btn btn--primary"
            onClick={() => triggerToast("Settings saved successfully!")}
          >
            Save Changes
          </button>
          <button
            className="btn btn--outline"
            onClick={() => setActiveTab("dashboard")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400..800&family=Montserrat:wght@300..700&display=swap');

        :root {
            --color-primary: #ffcc00;
            --color-primary-dark: #ffd633;
            --color-secondary: #ffffff;
            --color-dark-base: #1b2124;
            --color-dark-muted: #6e6e6e;
            --color-bg-light: #fbfbfb;
            --color-border: #f1f1f1;
            
            --color-success: #059669;
            --color-error: #fb2222;
            --color-upcoming-bg: #fff2e7;
            --color-upcoming-text: #f2994a;

            --font-primary: 'Baloo 2', sans-serif;
            --font-secondary: 'Montserrat', sans-serif;

            --spacing-xs: 0.25rem;
            --spacing-sm: 0.5rem;
            --spacing-md: 1rem;
            --spacing-lg: 1.5rem;
            --spacing-xl: 2rem;
            --spacing-2xl: 2.5rem;

            --radius-md: 0.25rem;
            --radius-lg: 0.5rem;
            --radius-xl: 0.75rem;
            --radius-pill: 50rem;

            --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

            --transition-base: all 200ms ease-in-out;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: var(--font-secondary);
            background-color: var(--color-bg-light);
            color: var(--color-dark-base);
            line-height: 1.5;
            overflow-x: hidden;
        }

        h1, h2, h3, h4, h5, h6 {
            font-family: var(--font-primary);
            line-height: 1.1;
            color: var(--color-dark-base);
        }

        .app-layout {
            display: flex;
            height: 100vh;
            width: 100vw;
            overflow: hidden;
        }

        .sidebar {
            width: 260px;
            background-color: var(--color-secondary);
            border-right: 1px solid var(--color-border);
            display: flex;
            flex-direction: column;
            padding: var(--spacing-xl) var(--spacing-lg);
            transition: var(--transition-base);
            z-index: 10;
        }

        .sidebar__logo {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            font-family: var(--font-primary);
            font-size: 2.25rem;
            font-weight: 800;
            color: var(--color-dark-base);
            margin-bottom: var(--spacing-2xl);
        }

        .sidebar__logo-icon {
            color: var(--color-primary);
        }

        .sidebar__nav {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: var(--spacing-sm);
        }

        .sidebar__nav-item {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            padding: var(--spacing-md);
            border-radius: var(--radius-lg);
            font-weight: 600;
            color: var(--color-dark-muted);
            transition: var(--transition-base);
            background: transparent;
            border: none;
            cursor: pointer;
            width: 100%;
            text-align: left;
            font-family: var(--font-secondary);
            font-size: 1rem;
        }

        .sidebar__nav-item:hover,
        .sidebar__nav-item--active {
            background-color: var(--color-primary);
            color: var(--color-dark-base);
        }

        .sidebar__footer {
            margin-top: auto;
        }

        .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            position: relative;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: var(--spacing-xl) var(--spacing-2xl);
            background-color: var(--color-bg-light);
            position: sticky;
            top: 0;
            z-index: 5;
        }

        .header__greeting {
            display: flex;
            flex-direction: column;
        }

        .header__title {
            font-size: 2.25rem;
            font-weight: 700;
        }

        .header__subtitle {
            font-size: 1.125rem;
            color: var(--color-dark-muted);
        }

        .header__actions {
            display: flex;
            align-items: center;
            gap: var(--spacing-lg);
        }

        .header__btn {
            background: var(--color-secondary);
            border: 1px solid var(--color-border);
            padding: var(--spacing-sm);
            border-radius: var(--radius-pill);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition-base);
            box-shadow: var(--shadow-sm);
            cursor: pointer;
        }

        .header__btn:hover {
            box-shadow: var(--shadow-md);
            transform: translateY(-2px);
            border-color: var(--color-primary);
            color: var(--color-primary);
        }

        .header__profile {
            width: 48px;
            height: 48px;
            border-radius: var(--radius-pill);
            background-color: var(--color-primary);
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.25rem;
            border: 2px solid var(--color-secondary);
            box-shadow: var(--shadow-sm);
            cursor: pointer;
        }

        .dashboard {
            padding: 0 var(--spacing-2xl) var(--spacing-2xl);
            display: flex;
            flex-direction: column;
            gap: var(--spacing-2xl);
            animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .tracking-widget {
            background-color: var(--color-secondary);
            border-radius: var(--radius-xl);
            padding: var(--spacing-xl);
            box-shadow: var(--shadow-md);
            display: grid;
            grid-template-columns: 1fr 300px;
            gap: var(--spacing-xl);
        }

        .tracking-widget__info {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
        }

        .tracking-widget__header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }

        .tracking-widget__status {
            font-family: var(--font-primary);
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--color-primary);
        }

        .tracking-widget__eta {
            font-size: 1.125rem;
            color: var(--color-dark-muted);
            font-weight: 500;
        }

        .tracking-widget__progress {
            margin-top: var(--spacing-lg);
            position: relative;
        }

        .progress-bar {
            height: 8px;
            background-color: var(--color-border);
            border-radius: var(--radius-pill);
            position: relative;
            overflow: hidden;
        }

        .progress-bar__fill {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background-color: var(--color-primary);
            border-radius: var(--radius-pill);
            transition: width 1s ease-in-out;
        }

        .progress-steps {
            display: flex;
            justify-content: space-between;
            margin-top: var(--spacing-sm);
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--color-dark-muted);
        }

        .progress-steps__step--active {
            color: var(--color-dark-base);
        }

        .tracking-widget__driver {
            background-color: var(--color-bg-light);
            border-radius: var(--radius-lg);
            padding: var(--spacing-lg);
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
            border: 1px solid var(--color-border);
        }

        .driver-info {
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
        }

        .driver-info__avatar {
            width: 50px;
            height: 50px;
            background-color: #ddd;
            border-radius: var(--radius-pill);
            background-size: cover;
        }

        .driver-info__details {
            display: flex;
            flex-direction: column;
        }

        .driver-info__name {
            font-weight: 700;
            font-size: 1.125rem;
        }

        .driver-info__vehicle {
            font-size: 0.875rem;
            color: var(--color-dark-muted);
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: var(--spacing-sm);
            font-family: var(--font-secondary);
            font-size: 1.125rem;
            font-weight: 700;
            text-transform: capitalize;
            border-radius: var(--radius-pill);
            cursor: pointer;
            transition: var(--transition-base);
            padding: 0.75rem 1.5rem;
            border: none;
        }

        .btn--sm {
            padding: 0.25rem 0.75rem;
            font-size: 0.875rem;
        }

        .btn--primary {
            background-color: var(--color-primary);
            color: var(--color-dark-base);
            border: 2px solid var(--color-primary);
        }

        .btn--primary:hover {
            background-color: var(--color-secondary);
            color: var(--color-primary);
            box-shadow: var(--shadow-md);
            transform: translateY(-1px);
        }

        .btn--outline {
            background-color: transparent;
            color: var(--color-dark-base);
            border: 2px solid var(--color-border);
        }

        .btn--outline:hover {
            border-color: var(--color-primary);
            color: var(--color-primary);
        }

        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--spacing-lg);
        }

        .section-header__title {
            font-size: 1.875rem;
            font-weight: 600;
        }

        .quick-order__grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: var(--spacing-lg);
        }

        .meal-card {
            background-color: var(--color-secondary);
            border-radius: var(--radius-lg);
            padding: var(--spacing-md);
            box-shadow: var(--shadow-sm);
            transition: var(--transition-base);
            display: flex;
            flex-direction: column;
            gap: var(--spacing-md);
            border: 1px solid var(--color-border);
        }

        .meal-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
            border-color: var(--color-primary);
        }

        .meal-card__img-wrapper {
            width: 100%;
            height: 160px;
            border-radius: var(--radius-md);
            overflow: hidden;
            background-color: var(--color-bg-light);
        }

        .meal-card__img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: var(--transition-base);
        }

        .meal-card:hover .meal-card__img {
            transform: scale(1.05);
        }

        .meal-card__content {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-xs);
        }

        .meal-card__title {
            font-family: var(--font-primary);
            font-size: 1.5rem;
            font-weight: 700;
        }

        .meal-card__meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--color-dark-muted);
            font-size: 0.875rem;
            font-weight: 500;
        }

        .meal-card__price {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--color-dark-base);
        }

        .meal-card__action {
            margin-top: auto;
            width: 100%;
        }

        .history-card {
            background-color: var(--color-secondary);
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-md);
            overflow: hidden;
        }

        .history-table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
        }

        .history-table th {
            padding: var(--spacing-md) var(--spacing-lg);
            background-color: var(--color-bg-light);
            font-weight: 600;
            color: var(--color-dark-muted);
            border-bottom: 1px solid var(--color-border);
        }

        .history-table td {
            padding: var(--spacing-md) var(--spacing-lg);
            border-bottom: 1px solid var(--color-border);
            font-weight: 500;
        }

        .history-table tr:last-child td {
            border-bottom: none;
        }

        .history-table tr:hover td {
            background-color: var(--color-bg-light);
        }

        .status-badge {
            display: inline-flex;
            align-items: center;
            padding: 0.25rem 0.75rem;
            border-radius: var(--radius-pill);
            font-size: 0.875rem;
            font-weight: 700;
        }

        .status-badge--success {
            background-color: rgba(5, 150, 105, 0.1);
            color: var(--color-success);
        }

        .status-badge--upcoming {
            background-color: var(--color-upcoming-bg);
            color: var(--color-upcoming-text);
        }

        .toast {
            position: fixed;
            bottom: var(--spacing-xl);
            right: var(--spacing-xl);
            background-color: var(--color-dark-base);
            color: var(--color-secondary);
            padding: var(--spacing-md) var(--spacing-lg);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            font-weight: 600;
            transform: translateY(100px);
            opacity: 0;
            transition: all 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
            z-index: 2000;
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            pointer-events: none;
        }

        .toast--show {
            transform: translateY(0);
            opacity: 1;
        }

        @media (max-width: 1024px) {
            .tracking-widget { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
            .app-layout { flex-direction: column; }
            .sidebar {
                width: 100%;
                height: 70px;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                padding: var(--spacing-md);
                border-right: none;
                border-bottom: 1px solid var(--color-border);
            }
            .sidebar__logo { margin-bottom: 0; }
            .sidebar__nav, .sidebar__footer { display: none; }
            .header { padding: var(--spacing-lg); }
            .dashboard { padding: 0 var(--spacing-lg) var(--spacing-lg); }
            .quick-order__grid { grid-template-columns: 1fr; }
            .history-table { display: block; overflow-x: auto; white-space: nowrap; }
        }
      `}</style>

      <div className="app-layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar__logo">
            <Utensils className="sidebar__logo-icon" />
            MetroEats
          </div>

          <nav className="sidebar__nav">
            <button
              className={`sidebar__nav-item ${activeTab === "dashboard" ? "sidebar__nav-item--active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              <LayoutDashboard size={20} /> Dashboard
            </button>
            <button
              className={`sidebar__nav-item ${activeTab === "history" ? "sidebar__nav-item--active" : ""}`}
              onClick={() => setActiveTab("history")}
            >
              <Clock size={20} /> Order History
            </button>
            <button
              className={`sidebar__nav-item ${activeTab === "favorites" ? "sidebar__nav-item--active" : ""}`}
              onClick={() => setActiveTab("favorites")}
            >
              <Heart size={20} /> Favorites
            </button>
            <button
              className={`sidebar__nav-item ${activeTab === "payments" ? "sidebar__nav-item--active" : ""}`}
              onClick={() => setActiveTab("payments")}
            >
              <CreditCard size={20} /> Payments
            </button>
          </nav>

          <div className="sidebar__footer">
            <button
              className={`sidebar__nav-item ${activeTab === "settings" ? "sidebar__nav-item--active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <SettingsIcon size={20} /> Settings
            </button>
            <button
              className="sidebar__nav-item"
              style={{ color: "var(--color-error)" }}
              onClick={() => triggerToast("Logging out...")}
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="main-content">
          {/* HEADER */}
          <header className="header">
            <div className="header__greeting">
              <h1 className="header__title">
                {activeTab === "dashboard" && "Hello, Alex 👋"}
                {activeTab === "history" && "Order History 📜"}
                {activeTab === "favorites" && "Your Favorites ❤️"}
                {activeTab === "payments" && "Payment Methods 💳"}
                {activeTab === "settings" && "Account Settings ⚙️"}
              </h1>
              <p className="header__subtitle">
                {activeTab === "dashboard" &&
                  "Ready for a delicious meal today?"}
                {activeTab !== "dashboard" &&
                  "Manage your account and preferences."}
              </p>
            </div>
            <div className="header__actions">
              <button
                className="header__btn"
                title="Search"
                onClick={() => triggerToast("Search opened")}
              >
                <Search size={20} />
              </button>
              <button
                className="header__btn"
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
                className="header__profile"
                onClick={() => setActiveTab("settings")}
              >
                A
              </div>
            </div>
          </header>

          {/* DYNAMIC TAB RENDERING */}
          {activeTab === "dashboard" && <DashboardView />}
          {activeTab === "history" && <HistoryView />}
          {activeTab === "favorites" && <FavoritesView />}
          {activeTab === "payments" && <PaymentsView />}
          {activeTab === "settings" && <SettingsView />}
        </main>
      </div>

      {/* Toast Notification Box */}
      <div className={`toast ${toast.show ? "toast--show" : ""}`}>
        <CheckCircle style={{ color: "var(--color-primary)" }} size={24} />
        <span>{toast.message}</span>
      </div>
    </>
  );
}
