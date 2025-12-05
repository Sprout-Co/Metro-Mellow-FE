"use client";
import { useState, useEffect } from "react";
import AdminDashboardLayout from "../_components/AdminDashboardLayout/AdminDashboardLayout";
import styles from "./commissions.module.scss";
import Card from "../_components/UI/Card/Card";
import Button from "../_components/UI/Button/Button";
import Table from "../_components/UI/Table/Table";
import StatusBadge from "../_components/UI/StatusBadge/StatusBadge";
import ConfirmationModal from "../_components/UI/ConfirmationModal/ConfirmationModal";
import { motion } from "framer-motion";
import { useReferralOperations } from "@/graphql/hooks/referrals/useReferralOperations";
import { Icon } from "@/components/ui/Icon/Icon";

interface Commission {
  id: string;
  amount: number;
  status: string;
  paidAt: string | null;
  referredUser: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
  referrer: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
  booking: {
    id: string;
  };
  createdAt: string;
}

export default function CommissionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "PENDING" | "PAID">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: "single" | "user";
    id: string;
    title: string;
    message: string;
  } | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const {
    handleGetAllCommissions,
    handlePayoutCommission,
    handlePayoutUserCommissions,
  } = useReferralOperations();

  useEffect(() => {
    fetchCommissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCommissions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await handleGetAllCommissions();
      setCommissions((data as Commission[]) || []);
    } catch (error) {
      console.error("Error fetching commissions:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch commissions"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCommissions = commissions.filter((commission) => {
    const matchesSearch =
      searchQuery === "" ||
      getUserName(commission.referrer).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getUserName(commission.referredUser).toLowerCase().includes(searchQuery.toLowerCase()) ||
      commission.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      commission.booking.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === "all" || commission.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const getUserName = (user: { firstName: string | null; lastName: string | null; email: string }) => {
    if (user.firstName || user.lastName) {
      return `${user.firstName || ""} ${user.lastName || ""}`.trim();
    }
    return user.email;
  };

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  const openPayoutConfirmation = (type: "single" | "user", id: string, name: string) => {
    let title = "";
    let message = "";

    if (type === "single") {
      title = "Confirm Payout";
      message = `Are you sure you want to process this commission payout?`;
    } else {
      title = "Confirm User Payout";
      message = `Are you sure you want to pay out all pending commissions for ${name}?`;
    }

    setConfirmAction({ type, id, title, message });
    setShowConfirmModal(true);
  };

  const handleConfirmAction = async () => {
    if (!confirmAction) return;

    setIsActionLoading(true);
    try {
      if (confirmAction.type === "single") {
        await handlePayoutCommission(confirmAction.id);
      } else {
        await handlePayoutUserCommissions(confirmAction.id);
      }
      await fetchCommissions();
      setShowConfirmModal(false);
      setConfirmAction(null);
    } catch (error) {
      console.error("Error processing payout:", error);
      alert(error instanceof Error ? error.message : "Failed to process payout");
    } finally {
      setIsActionLoading(false);
    }
  };

  // Calculate stats
  const totalPending = commissions
    .filter((c) => c.status === "PENDING")
    .reduce((sum, c) => sum + c.amount, 0);
  const totalPaid = commissions
    .filter((c) => c.status === "PAID")
    .reduce((sum, c) => sum + c.amount, 0);
  const usersWithPending = new Set(
    commissions.filter((c) => c.status === "PENDING").map((c) => c.referrer.id)
  ).size;

  const tableColumns = [
    { key: "referrer", label: "Referrer" },
    { key: "referredUser", label: "Referred User" },
    { key: "booking", label: "Booking ID" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Date" },
    { key: "actions", label: "Actions" },
  ];

  const tableData = filteredCommissions.map((commission) => ({
    id: commission.id,
    referrer: getUserName(commission.referrer),
    referredUser: getUserName(commission.referredUser),
    booking: `#${commission.booking.id}`,
    amount: formatCurrency(commission.amount),
    status: (
      <StatusBadge
        status={commission.status}
        variant={commission.status === "PAID" ? "success" : "warning"}
      />
    ),
    createdAt: new Date(commission.createdAt).toLocaleDateString(),
    actions: commission.status === "PENDING" && (
      <Button
        variant="primary"
        size="small"
        onClick={() => openPayoutConfirmation("single", commission.id, "")}
      >
        Payout
      </Button>
    ),
  }));

  const filters = [
    { label: "All", value: "all" as const },
    { label: "Pending", value: "PENDING" as const },
    { label: "Paid", value: "PAID" as const },
  ];

  return (
    <AdminDashboardLayout>
      <div className={styles.commissionsPage}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Commission Management</h1>
            <p className={styles.subtitle}>
              Manage and process referral commission payouts
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <div className={styles.statCard}>
                <div className={styles.statCard__icon}>
                  <Icon name="Clock" size={24} />
                </div>
                <div className={styles.statCard__content}>
                  <p className={styles.statCard__label}>Pending Commissions</p>
                  <h3 className={styles.statCard__value}>{formatCurrency(totalPending)}</h3>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <div className={styles.statCard}>
                <div className={styles.statCard__icon}>
                  <Icon name="CheckCircle" size={24} />
                </div>
                <div className={styles.statCard__content}>
                  <p className={styles.statCard__label}>Total Paid</p>
                  <h3 className={styles.statCard__value}>{formatCurrency(totalPaid)}</h3>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <div className={styles.statCard}>
                <div className={styles.statCard__icon}>
                  <Icon name="Users" size={24} />
                </div>
                <div className={styles.statCard__content}>
                  <p className={styles.statCard__label}>Users with Pending</p>
                  <h3 className={styles.statCard__value}>{usersWithPending}</h3>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Commissions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <div className={styles.tableHeader}>
              <div className={styles.filters}>
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    className={`${styles.filterBtn} ${
                      activeFilter === filter.value ? styles.filterBtn__active : ""
                    }`}
                    onClick={() => setActiveFilter(filter.value)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <div className={styles.searchBar}>
                <Icon name="Search" size={20} />
                <input
                  type="text"
                  placeholder="Search commissions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>

            {isLoading ? (
              <div className={styles.loading}>Loading commissions...</div>
            ) : error ? (
              <div className={styles.error}>{error}</div>
            ) : filteredCommissions.length === 0 ? (
              <div className={styles.empty}>No commissions found</div>
            ) : (
              <Table columns={tableColumns} data={tableData} />
            )}
          </Card>
        </motion.div>

        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => {
            setShowConfirmModal(false);
            setConfirmAction(null);
          }}
          onConfirm={handleConfirmAction}
          title={confirmAction?.title || ""}
          message={confirmAction?.message || ""}
          confirmText="Confirm Payout"
          cancelText="Cancel"
          isLoading={isActionLoading}
        />
      </div>
    </AdminDashboardLayout>
  );
}

