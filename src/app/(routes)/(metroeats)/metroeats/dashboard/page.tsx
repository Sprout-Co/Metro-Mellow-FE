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
  Search,
  Bell,
  Plus,
  MapPin,
  Truck,
  Receipt,
  TrendingUp,
  Flame,
  UtensilsCrossed,
  Settings,
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
  const [search, setSearch] = useState("");

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

  // Most-ordered meals across all orders → "Popular for you"
  const popularMeals = useMemo(() => {
    const counts = new Map<string, { meal: (typeof meals)[number]; count: number }>();
    for (const order of mealOrders) {
      for (const line of order.items) {
        const id = line.meal.id;
        const existing = counts.get(id);
        const mealRef =
          meals.find((m) => m.id === id) ??
          ({
            ...line.meal,
            description: null,
            image: null,
            pricePlate: null,
            priceBowl: null,
          } as unknown as (typeof meals)[number]);
        if (existing) {
          existing.count += line.quantity;
        } else {
          counts.set(id, { meal: mealRef, count: line.quantity });
        }
      }
    }
    const top = Array.from(counts.values())
      .sort((a, b) => b.count - a.count)
      .map((c) => c.meal);

    if (top.length >= 4) return top.slice(0, 4);
    const seen = new Set(top.map((m) => m.id));
    const filler = meals.filter((m) => !seen.has(m.id));
    return [...top, ...filler].slice(0, 4);
  }, [mealOrders, meals]);

  const filteredPopular = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return popularMeals;
    return popularMeals.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        (m.description ?? "").toLowerCase().includes(q),
    );
  }, [popularMeals, search]);

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
  const displayName = me
    ? `${me.firstName ?? ""} ${me.lastName ?? ""}`.trim() || "Guest"
    : "Guest";

  type NavItem = { id: Tab; label: string; icon: React.ReactNode };
  const primaryNav: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "history", label: "Orders", icon: <Clock size={18} /> },
  ];
  const secondaryNav: NavItem[] = [
    { id: "settings", label: "Account", icon: <Settings size={18} /> },
  ];

  const headerTitle =
    activeTab === "dashboard"
      ? greeting
      : activeTab === "history"
        ? "Order History"
        : "Account Settings";
  const headerSubtitle =
    activeTab === "dashboard"
      ? "Ready for a delicious meal today?"
      : activeTab === "history"
        ? "View and manage your past orders"
        : "Manage your profile and preferences";

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        {/* ─── SIDEBAR ─────────────────────────────────── */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <Link href="/metroeats" className={styles.sidebarBack} aria-label="Back">
              <ChevronLeft size={20} />
            </Link>
            <Link href="/metroeats" className={styles.sidebarLogo}>
              <Image
                src="/images/metroeats/brand-logo/stacked/yellow-on-black-stacked.png"
                alt="MetroEats"
                width={120}
                height={28}
              />
            </Link>
          </div>

          <nav className={styles.sidebarNav}>
            <span className={styles.sidebarNavLabel}>Menu</span>
            {primaryNav.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.sidebarNavItem} ${activeTab === tab.id ? styles.sidebarNavItemActive : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
            <Link href="/metroeats/menu" className={styles.sidebarNavItem}>
              <ShoppingBag size={18} />
              <span>Browse Menu</span>
            </Link>

            <span className={styles.sidebarNavLabel}>Settings</span>
            {secondaryNav.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.sidebarNavItem} ${activeTab === tab.id ? styles.sidebarNavItemActive : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className={styles.sidebarFooter}>
            <div
              className={styles.sidebarUser}
              onClick={() => setActiveTab("settings")}
            >
              <div className={styles.avatar}>{initials}</div>
              <div className={styles.sidebarUserInfo}>
                <p className={styles.sidebarUserName}>{displayName}</p>
                <p className={styles.sidebarUserEmail}>{me?.email ?? ""}</p>
              </div>
              <button
                className={styles.sidebarLogout}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLogout();
                }}
                aria-label="Log out"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </aside>

        {/* ─── CONTENT ──────────────────────────────────── */}
        <div className={styles.content}>
          <header className={styles.topbar}>
            <Link href="/metroeats" className={styles.topbarMobileLogo}>
              <Image
                src="/images/metroeats/brand-logo/stacked/yellow-on-black-stacked.png"
                alt="MetroEats"
                width={100}
                height={24}
              />
            </Link>

            <div className={styles.searchBox}>
              <Search size={16} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search meals, orders, restaurants..."
                className={styles.searchInput}
              />
            </div>

            <div className={styles.topbarRight}>
              <button
                className={styles.iconBtn}
                aria-label="Notifications"
                onClick={() =>
                  triggerToast(
                    dashboardStats.activeCount > 0
                      ? `${dashboardStats.activeCount} order(s) in progress`
                      : "You're all caught up",
                  )
                }
              >
                <Bell size={18} />
                {dashboardStats.activeCount > 0 && (
                  <span className={styles.notificationDot} />
                )}
              </button>

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
                      <p className={styles.profileMenuName}>{displayName}</p>
                      <p className={styles.profileMenuEmail}>
                        {me?.email ?? ""}
                      </p>
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
            </div>
          </header>

          <main className={styles.main}>
            <div className={styles.mainInner}>
              {activeTab === "settings" && (
                <button
                  className={styles.settingsBack}
                  onClick={() => setActiveTab("dashboard")}
                >
                  <ChevronLeft size={18} /> Back to Dashboard
                </button>
              )}

              <div className={styles.greeting}>
                <h1 className={styles.greetingTitle}>{headerTitle}</h1>
                <p className={styles.greetingSubtitle}>{headerSubtitle}</p>
              </div>

              {activeTab === "dashboard" && (
                <>
                  {/* ─── HERO ─── */}
                  <section className={styles.hero}>
                    <div className={styles.heroGlow} />
                    <div className={styles.heroContent}>
                      <span className={styles.heroEyebrow}>
                        <Flame size={12} /> Today&apos;s pick
                      </span>
                      <h2 className={styles.heroTitle}>
                        Hot meals, delivered to your door in minutes.
                      </h2>
                      <p className={styles.heroSubtitle}>
                        Browse seasonal menus from MetroEats kitchens and reorder
                        your favorites in just a tap.
                      </p>
                      <div className={styles.heroActions}>
                        <button
                          className={styles.heroBtnPrimary}
                          onClick={() => router.push("/metroeats/menu")}
                        >
                          <ShoppingBag size={16} />
                          Order Now
                        </button>
                        <button
                          className={styles.heroBtnGhost}
                          onClick={() => setActiveTab("history")}
                        >
                          <History size={16} />
                          View History
                        </button>
                      </div>
                    </div>
                    <div className={styles.heroVisual}>
                      <div className={styles.heroPlate}>
                        <UtensilsCrossed size={64} />
                      </div>
                    </div>
                  </section>

                  {/* ─── STATS ─── */}
                  <section className={styles.statsGrid}>
                    <article className={styles.statCard}>
                      <div className={styles.statHeader}>
                        <div
                          className={`${styles.statIcon} ${styles.statIconYellow}`}
                        >
                          <Receipt size={20} />
                        </div>
                      </div>
                      <div className={styles.statBody}>
                        <span className={styles.statLabel}>Total Orders</span>
                        <p className={styles.statValue}>
                          {dashboardStats.totalOrders}
                        </p>
                        <p className={styles.statMeta}>
                          {dashboardStats.deliveredCount} delivered
                        </p>
                      </div>
                    </article>

                    <article className={styles.statCard}>
                      <div className={styles.statHeader}>
                        <div
                          className={`${styles.statIcon} ${styles.statIconOrange}`}
                        >
                          <Truck size={20} />
                        </div>
                        {dashboardStats.activeCount > 0 && (
                          <span className={styles.statTrend}>
                            <Flame size={12} /> Live
                          </span>
                        )}
                      </div>
                      <div className={styles.statBody}>
                        <span className={styles.statLabel}>
                          Active Deliveries
                        </span>
                        <p className={styles.statValue}>
                          {dashboardStats.activeCount}
                        </p>
                        <p className={styles.statMeta}>
                          {dashboardStats.activeCount > 0
                            ? "Track in real time"
                            : "No active deliveries"}
                        </p>
                      </div>
                    </article>

                    <article className={styles.statCard}>
                      <div className={styles.statHeader}>
                        <div
                          className={`${styles.statIcon} ${styles.statIconGreen}`}
                        >
                          <TrendingUp size={20} />
                        </div>
                      </div>
                      <div className={styles.statBody}>
                        <span className={styles.statLabel}>Total Spend</span>
                        <p className={styles.statValue}>
                          {fmt(dashboardStats.totalSpend)}
                        </p>
                        <p className={styles.statMeta}>
                          Across all MetroEats orders
                        </p>
                      </div>
                    </article>

                    <article className={styles.statCard}>
                      <div className={styles.statHeader}>
                        <div
                          className={`${styles.statIcon} ${styles.statIconDark}`}
                        >
                          <Sparkles size={20} />
                        </div>
                      </div>
                      <div className={styles.statBody}>
                        <span className={styles.statLabel}>Favorites</span>
                        <p className={styles.statValue}>
                          {popularMeals.length}
                        </p>
                        <p className={styles.statMeta}>
                          Top picks based on history
                        </p>
                      </div>
                    </article>
                  </section>

                  {/* ─── QUICK ACTIONS ─── */}
                  <section className={styles.quickActions}>
                    <button
                      className={styles.quickAction}
                      onClick={() => router.push("/metroeats/menu")}
                    >
                      <div
                        className={`${styles.quickActionIcon} ${styles.quickActionIconDark}`}
                      >
                        <ShoppingBag size={18} />
                      </div>
                      <div className={styles.quickActionBody}>
                        <p className={styles.quickActionTitle}>Browse Menu</p>
                        <p className={styles.quickActionText}>
                          Explore today&apos;s meals and combos.
                        </p>
                      </div>
                    </button>

                    <button
                      className={styles.quickAction}
                      onClick={() => setActiveTab("history")}
                    >
                      <div className={styles.quickActionIcon}>
                        <History size={18} />
                      </div>
                      <div className={styles.quickActionBody}>
                        <p className={styles.quickActionTitle}>Order History</p>
                        <p className={styles.quickActionText}>
                          Review previous orders and reorder quickly.
                        </p>
                      </div>
                    </button>

                    {popularMeals[0] && (
                      <button
                        className={styles.quickAction}
                        onClick={() =>
                          handleQuickOrder(
                            popularMeals[0].id,
                            popularMeals[0].name,
                            popularMeals[0].pricePlate ?? 0,
                            popularMeals[0].image ?? undefined,
                          )
                        }
                      >
                        <div
                          className={`${styles.quickActionIcon} ${styles.quickActionIconOrange}`}
                        >
                          <Sparkles size={18} />
                        </div>
                        <div className={styles.quickActionBody}>
                          <p className={styles.quickActionTitle}>
                            Quick Add: {popularMeals[0].name}
                          </p>
                          <p className={styles.quickActionText}>
                            Add one plate instantly to your cart.
                          </p>
                        </div>
                      </button>
                    )}
                  </section>

                  {/* ─── POPULAR ITEMS ─── */}
                  <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                      <div>
                        <h2 className={styles.sectionTitle}>
                          Popular for you
                        </h2>
                        <p className={styles.sectionSubtitle}>
                          {search
                            ? `Showing results for "${search}"`
                            : "Top picks based on your taste"}
                        </p>
                      </div>
                      <button
                        className={styles.sectionLink}
                        onClick={() => router.push("/metroeats/menu")}
                      >
                        See all menu
                      </button>
                    </div>

                    {mealsLoading ? (
                      <div className={styles.popularGrid}>
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className={styles.orderCardSkeleton}>
                            <div className={styles.skeletonLine} />
                            <div className={styles.skeletonLineShort} />
                          </div>
                        ))}
                      </div>
                    ) : filteredPopular.length === 0 ? (
                      <div className={styles.emptyCardSmall}>
                        <UtensilsCrossed
                          size={24}
                          className={styles.emptyIconSmall}
                        />
                        <p>
                          {search
                            ? "No meals match your search."
                            : "Place your first order to see picks here."}
                        </p>
                      </div>
                    ) : (
                      <div className={styles.popularGrid}>
                        {filteredPopular.map((meal, idx) => {
                          const price = meal.pricePlate ?? 0;
                          return (
                            <article
                              className={styles.popularCard}
                              key={meal.id}
                              onClick={() =>
                                handleQuickOrder(
                                  meal.id,
                                  meal.name,
                                  price,
                                  meal.image ?? undefined,
                                )
                              }
                            >
                              <div className={styles.popularImage}>
                                {meal.image ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={meal.image} alt={meal.name} />
                                ) : (
                                  <div
                                    className={styles.popularImageFallback}
                                  >
                                    <UtensilsCrossed size={32} />
                                  </div>
                                )}
                                {idx === 0 && (
                                  <span className={styles.popularBadge}>
                                    <Flame size={10} /> Hot
                                  </span>
                                )}
                              </div>
                              <div className={styles.popularBody}>
                                <h3 className={styles.popularName}>
                                  {meal.name}
                                </h3>
                                <p className={styles.popularDesc}>
                                  {meal.description ??
                                    "A signature MetroEats favorite."}
                                </p>
                                <div className={styles.popularFooter}>
                                  <span className={styles.popularPrice}>
                                    {fmt(price)}
                                  </span>
                                  <button
                                    className={styles.popularAdd}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleQuickOrder(
                                        meal.id,
                                        meal.name,
                                        price,
                                        meal.image ?? undefined,
                                      );
                                    }}
                                    aria-label={`Add ${meal.name}`}
                                  >
                                    <Plus size={16} />
                                  </button>
                                </div>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    )}
                  </section>

                  {/* ─── CURRENT ORDER + DELIVERY MAP ─── */}
                  <div className={styles.dashboardGrid}>
                    <DashboardTab
                      activeOrder={activeOrder}
                      ordersLoading={ordersLoading}
                      recentOrders={recentOrders}
                      onSeeAllFavorites={() => router.push("/metroeats/menu")}
                      onReorder={handleReorder}
                    />

                    <aside className={styles.mapCard}>
                      <div className={styles.mapVisual}>
                        <div
                          className={styles.mapPin}
                          style={{ left: "22%", top: "70%" }}
                        >
                          <span
                            className={`${styles.mapPinIcon} ${styles.mapPinIconActive}`}
                          >
                            <Truck size={14} />
                          </span>
                        </div>
                        <div
                          className={styles.mapPin}
                          style={{ left: "75%", top: "30%" }}
                        >
                          <span className={styles.mapPinIcon}>
                            <MapPin size={14} />
                          </span>
                        </div>
                      </div>
                      <div className={styles.mapBody}>
                        <div className={styles.mapBodyHeader}>
                          <h3 className={styles.mapTitle}>
                            {activeOrder ? "Live tracking" : "Delivery preview"}
                          </h3>
                          {activeOrder && (
                            <span className={styles.mapEta}>
                              <Clock size={12} /> ETA soon
                            </span>
                          )}
                        </div>
                        <p className={styles.mapMeta}>
                          {activeOrder
                            ? "Your courier is on the way. Follow the route in real time once your order is dispatched."
                            : "When you have an active delivery, you'll see the courier's route here."}
                        </p>
                      </div>
                    </aside>
                  </div>
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
                  onSaveSuccess={() =>
                    triggerToast("Settings saved successfully!")
                  }
                  onSaveError={() => triggerToast("Failed to save settings.")}
                  onCancel={() => setActiveTab("dashboard")}
                  onToast={triggerToast}
                />
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className={styles.mobileNav}>
        {primaryNav.map((tab) => (
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
