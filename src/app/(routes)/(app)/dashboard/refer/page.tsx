// src/app/(routes)/(app)/dashboard/refer/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Gift,
  Copy,
  Check,
  Share2,
  Mail,
  MessageCircle,
  Facebook,
  Twitter,
  Send,
  DollarSign,
  Clock,
  CheckCircle,
} from "lucide-react";
import styles from "./ReferFriend.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import Input from "@/components/ui/Input/Input";
import DashboardLayout from "../_components/DashboardLayout/DashboardLayout";
import DashboardHeader from "../_components/DashboardHeader/DashboardHeader";
import { useReferralOperations } from "@/graphql/hooks/referrals/useReferralOperations";

interface Commission {
  id: string;
  amount: number;
  status: string;
  paidAt?: string | null;
  referredUser: {
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

interface GroupedCommission {
  user: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
  };
  commissions: Commission[];
  totalEarned: number;
  count: number;
}

export default function ReferFriendPage() {
  const { handleGetMyReferralInfo, handleGetMyCommissions } =
    useReferralOperations();

  const [copied, setCopied] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Store fetched data in local state
  const [referralInfo, setReferralInfo] = useState<any>(null);
  const [commissions, setCommissions] = useState<Commission[]>([]);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [referralData, commissionsData] = await Promise.all([
          handleGetMyReferralInfo(),
          handleGetMyCommissions(),
        ]);
        setReferralInfo(referralData);
        setCommissions(commissionsData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [handleGetMyReferralInfo, handleGetMyCommissions]);
  const referralCode = referralInfo?.referralCode || "";
  const referralLink = referralInfo?.referralLink || "";
  const totalEarnings = referralInfo?.totalEarnings || 0;
  const pendingEarnings = referralInfo?.pendingEarnings || 0;
  const paidEarnings = referralInfo?.paidEarnings || 0;
  const referredUsersCount = referralInfo?.referredUsersCount || 0;

  // Group commissions by referred user
  const groupedCommissions: GroupedCommission[] = Object.values(
    commissions.reduce(
      (acc: Record<string, GroupedCommission>, commission: Commission) => {
        const userId = commission.referredUser.id;
        if (!acc[userId]) {
          acc[userId] = {
            user: commission.referredUser,
            commissions: [],
            totalEarned: 0,
            count: 0,
          };
        }
        acc[userId].commissions.push(commission);
        acc[userId].totalEarned += commission.amount;
        acc[userId].count += 1;
        return acc;
      },
      {}
    )
  );

  // Filter paid commissions for payout history
  const paidCommissions = commissions.filter(
    (c: Commission) => c.status === "PAID" && c.paidAt
  );

  // Filter commissions based on search term
  const filteredCommissions = commissions.filter((commission) => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      commission.id.toLowerCase().includes(searchLower) ||
      commission.referredUser.email.toLowerCase().includes(searchLower) ||
      getUserName(commission.referredUser)
        .toLowerCase()
        .includes(searchLower) ||
      commission.status.toLowerCase().includes(searchLower)
    );
  });

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  const getUserName = (user: {
    firstName: string | null;
    lastName: string | null;
    email: string;
  }) => {
    if (user.firstName || user.lastName) {
      return `${user.firstName || ""} ${user.lastName || ""}`.trim();
    }
    return user.email;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddEmail = () => {
    if (emailInput && emailInput.includes("@")) {
      setEmails([...emails, emailInput]);
      setEmailInput("");
    }
  };

  const handleRemoveEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const handleRequestPayout = () => {
    // TODO: Implement payout request logic
    alert(`Requesting payout for ${formatCurrency(pendingEarnings)}`);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { color: "#f2994a", label: "Pending" },
      PAID: { color: "#059669", label: "Paid" },
    };
    return (
      statusConfig[status as keyof typeof statusConfig] || {
        color: "#6B7280",
        label: status,
      }
    );
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className={styles.refer}>
          <div style={{ textAlign: "center", padding: "3rem" }}>Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className={styles.refer}>
          <div
            style={{ textAlign: "center", padding: "3rem", color: "#ef4444" }}
          >
            Error: {error}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className={styles.refer}>
        {/* Header Section */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.header__left}>
            <div>
              {/* <Gift className={styles.header__icon} /> */}
              <h1 className={styles.header__title}>Referral program</h1>
              <p className={styles.header__subtitle}>
                Share your unique referral link or code with friends and earn
                10% commission on their first booking
              </p>
            </div>
          </div>
          <div className={styles.header__rightWrapper}>
            <div className={styles.header__right}>
              <span className={styles.header__label}>Referral link:</span>
              <span className={styles.header__link}>{referralLink}</span>
              <FnButton variant="secondary" size="sm" onClick={handleCopyLink}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                Copy link
              </FnButton>
            </div>
            <div className={styles.header__right}>
              <span className={styles.header__label}>Referral code:</span>
              <span className={styles.header__code}>{referralCode}</span>
              <FnButton variant="secondary" size="sm" onClick={handleCopyCode}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                Copy code
              </FnButton>
            </div>
            {pendingEarnings > 0 && (
              <FnButton
                variant="primary"
                size="md"
                fullWidth
                // className={styles.header__payoutBtn}
                onClick={handleRequestPayout}
              >
                Request Payout ({formatCurrency(pendingEarnings)})
              </FnButton>
            )}
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className={styles.statsGrid}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className={styles.statCard}>
            <div className={styles.statCard__icon}>
              <DollarSign size={24} />
            </div>
            <div className={styles.statCard__content}>
              <h3 className={styles.statCard__label}>Total earnings</h3>
              <p className={styles.statCard__value}>
                {formatCurrency(totalEarnings)}
              </p>
              <div className={styles.statCard__details}>
                <div className={styles.statCard__detail}>
                  <span className={styles.statCard__detailLabel}>
                    Next payout
                  </span>
                  <span className={styles.statCard__detailValue}>
                    {formatCurrency(pendingEarnings)}
                  </span>
                </div>
                <div className={styles.statCard__detail}>
                  <span className={styles.statCard__detailLabel}>Paid</span>
                  <span className={styles.statCard__detailValue}>
                    {formatCurrency(paidEarnings)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCard__icon}>
              <Users size={24} />
            </div>
            <div className={styles.statCard__content}>
              <h3 className={styles.statCard__label}>Total referrals</h3>
              <p className={styles.statCard__value}>{referredUsersCount}</p>
              <div className={styles.statCard__details}>
                <div className={styles.statCard__detail}>
                  <span className={styles.statCard__detailLabel}>
                    Active referrals
                  </span>
                  <span className={styles.statCard__detailValue}>
                    {commissions.filter((c) => c.status === "PENDING").length}
                  </span>
                </div>
                <div className={styles.statCard__detail}>
                  <span className={styles.statCard__detailLabel}>
                    Completed
                  </span>
                  <span className={styles.statCard__detailValue}>
                    {commissions.filter((c) => c.status === "PAID").length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statCard__icon}>
              <CheckCircle size={24} />
            </div>
            <div className={styles.statCard__content}>
              <h3 className={styles.statCard__label}>Commission rate</h3>
              <p className={styles.statCard__value}>10%</p>
              <div className={styles.statCard__details}>
                <div className={styles.statCard__detail}>
                  <span className={styles.statCard__detailLabel}>
                    Avg. commission
                  </span>
                  <span className={styles.statCard__detailValue}>
                    {formatCurrency(
                      commissions.length > 0
                        ? commissions.reduce((sum, c) => sum + c.amount, 0) /
                            commissions.length
                        : 0
                    )}
                  </span>
                </div>
                <div className={styles.statCard__detail}>
                  <span className={styles.statCard__detailLabel}>
                    Total commissions
                  </span>
                  <span className={styles.statCard__detailValue}>
                    {commissions.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Active Referrals Table */}
        <motion.div
          className={styles.tableSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className={styles.tableHeader}>
            <h2 className={styles.tableHeader__title}>
              Your current active referral
            </h2>
            <div className={styles.tableHeader__search}>
              <input
                type="text"
                placeholder="Search"
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Referred via</th>
                  <th>Rate type</th>
                  <th>Rate</th>
                  <th>Commission</th>
                </tr>
              </thead>
              <tbody>
                {filteredCommissions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className={styles.emptyState}>
                      {searchTerm
                        ? "No referrals match your search"
                        : "No active referrals yet"}
                    </td>
                  </tr>
                ) : (
                  filteredCommissions.map((commission) => {
                    const status = getStatusBadge(commission.status);
                    return (
                      <tr key={commission.id}>
                        <td>{commission.id.slice(0, 8)}</td>
                        <td>
                          {new Date(commission.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td>
                          <span
                            className={styles.statusBadge}
                            style={{
                              backgroundColor:
                                status.color === "#059669"
                                  ? "#D1FAE5"
                                  : "#FEF3C7",
                              color: status.color,
                            }}
                          >
                            {status.label}
                          </span>
                        </td>
                        <td>
                          {commission.referredUser.email.includes("@")
                            ? "Your unique referral link"
                            : "Invite by email"}
                        </td>
                        <td>Percentage</td>
                        <td>10.00%</td>
                        <td className={styles.commissionAmount}>
                          {formatCurrency(commission.amount)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
