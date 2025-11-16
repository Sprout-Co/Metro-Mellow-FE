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

  const handleSendInvites = () => {
    // Handle sending invites logic
    console.log("Sending invites to:", emails);
    setEmails([]);
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
        <DashboardHeader
          title="Referrals & Earnings"
          subtitle="Share Metromellow with friends and earn commission on their bookings"
          actionBtnText="Share"
          actionBtnIcon={<Share2 size={18} />}
          onActionButtonClick={() => {
            if (navigator.share && referralLink) {
              navigator.share({
                title: "Join Metromellow",
                text: "Use my referral code to get started!",
                url: referralLink,
              });
            }
          }}
        />
        {/* Stats Overview */}
        <motion.div
          className={styles.statsOverview}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className={styles.statsOverview__grid}>
            <div className={styles.statCard}>
              <div className={styles.statCard__icon}>
                <DollarSign />
              </div>
              <div className={styles.statCard__content}>
                <span className={styles.statCard__value}>
                  {formatCurrency(totalEarnings)}
                </span>
                <span className={styles.statCard__label}>Total Earnings</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statCard__icon}>
                <Clock />
              </div>
              <div className={styles.statCard__content}>
                <span className={styles.statCard__value}>
                  {formatCurrency(pendingEarnings)}
                </span>
                <span className={styles.statCard__label}>Pending Earnings</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statCard__icon}>
                <CheckCircle />
              </div>
              <div className={styles.statCard__content}>
                <span className={styles.statCard__value}>
                  {formatCurrency(paidEarnings)}
                </span>
                <span className={styles.statCard__label}>Paid Earnings</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statCard__icon}>
                <Users />
              </div>
              <div className={styles.statCard__content}>
                <span className={styles.statCard__value}>
                  {referredUsersCount}
                </span>
                <span className={styles.statCard__label}>Friends Referred</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          className={styles.howItWorks}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className={styles.howItWorks__title}>How It Works</h2>
          <div className={styles.howItWorks__steps}>
            {[
              {
                number: "1",
                title: "Share Your Code",
                description:
                  "Share your unique referral code or link with friends",
              },
              {
                number: "2",
                title: "Friends Sign Up",
                description:
                  "They sign up using your code and complete their booking",
              },
              {
                number: "3",
                title: "Earn Commission",
                description:
                  "Earn commission on their first 3 completed bookings",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className={styles.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className={styles.step__number}>{step.number}</div>
                <div className={styles.step__content}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Referral Methods */}
        <div className={styles.referralMethods}>
          {/* Referral Code */}
          <motion.div
            className={styles.codeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className={styles.codeSection__title}>Your Referral Code</h2>
            <div className={styles.codeBox}>
              <div className={styles.codeBox__code}>{referralCode}</div>
              <motion.button
                className={styles.codeBox__copyBtn}
                onClick={handleCopyCode}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
                {copied ? "Copied!" : "Copy Code"}
              </motion.button>
            </div>
            <div className={styles.linkBox}>
              <input
                type="text"
                value={referralLink}
                readOnly
                className={styles.linkBox__input}
              />
              <motion.button
                className={styles.linkBox__copyBtn}
                onClick={handleCopyLink}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Copy size={18} />
              </motion.button>
            </div>
          </motion.div>

          {/* Share Options */}
          <motion.div
            className={styles.shareSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className={styles.shareSection__title}>Share Via</h2>
            <div className={styles.shareButtons}>
              <motion.button
                className={`${styles.shareBtn} ${styles["shareBtn--whatsapp"]}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle />
                WhatsApp
              </motion.button>
              <motion.button
                className={`${styles.shareBtn} ${styles["shareBtn--facebook"]}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook />
                Facebook
              </motion.button>
              <motion.button
                className={`${styles.shareBtn} ${styles["shareBtn--twitter"]}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter />
                Twitter
              </motion.button>
              <motion.button
                className={`${styles.shareBtn} ${styles["shareBtn--email"]}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail />
                Email
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Email Invites */}
        <motion.div
          className={styles.emailInvites}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className={styles.emailInvites__title}>Send Email Invites</h2>
          <div className={styles.emailForm}>
            <div className={styles.emailForm__input}>
              <Input
                placeholder="Enter email address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddEmail()}
                leftIcon={<Mail size={20} />}
                fullWidth
              />
              <FnButton variant="primary" onClick={handleAddEmail}>
                Add
              </FnButton>
            </div>
            {emails.length > 0 && (
              <>
                <div className={styles.emailList}>
                  {emails.map((email, index) => (
                    <motion.div
                      key={index}
                      className={styles.emailChip}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <span>{email}</span>
                      <button onClick={() => handleRemoveEmail(index)}>
                        ×
                      </button>
                    </motion.div>
                  ))}
                </div>
                <FnButton variant="primary" onClick={handleSendInvites}>
                  <Send size={18} />
                  Send {emails.length} Invite{emails.length > 1 ? "s" : ""}
                </FnButton>
              </>
            )}
          </div>
        </motion.div>

        {/* Commissions by Referred User */}
        <motion.div
          className={styles.commissionsSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className={styles.commissionsSection__title}>Your Commissions</h2>
          {groupedCommissions.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No commissions yet. Start referring friends to earn!</p>
            </div>
          ) : (
            <div className={styles.commissionsList}>
              {groupedCommissions.map((group, index) => (
                <motion.div
                  key={group.user.id}
                  className={styles.commissionGroup}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                >
                  <div className={styles.commissionGroup__header}>
                    <div className={styles.commissionGroup__userInfo}>
                      <h4>{getUserName(group.user)}</h4>
                      <p>{group.user.email}</p>
                    </div>
                    <div className={styles.commissionGroup__summary}>
                      <span className={styles.commissionGroup__count}>
                        {group.count}/3 commissions
                      </span>
                      <span className={styles.commissionGroup__total}>
                        {formatCurrency(group.totalEarned)}
                      </span>
                    </div>
                  </div>
                  <div className={styles.commissionGroup__items}>
                    {group.commissions.map((commission) => {
                      const status = getStatusBadge(commission.status);
                      return (
                        <div
                          key={commission.id}
                          className={styles.commissionItem}
                        >
                          <div className={styles.commissionItem__details}>
                            <span className={styles.commissionItem__booking}>
                              Booking #{commission.booking.id}
                            </span>
                            <span className={styles.commissionItem__date}>
                              {new Date(
                                commission.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className={styles.commissionItem__right}>
                            <span className={styles.commissionItem__amount}>
                              {formatCurrency(commission.amount)}
                            </span>
                            <span
                              className={styles.commissionItem__badge}
                              style={{
                                backgroundColor: `${status?.color}20`,
                                color: status?.color,
                              }}
                            >
                              {status?.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Payout History */}
        {paidCommissions.length > 0 && (
          <motion.div
            className={styles.payoutHistory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h2 className={styles.payoutHistory__title}>Payout History</h2>
            <div className={styles.payoutList}>
              {paidCommissions.map((commission) => (
                <div key={commission.id} className={styles.payoutItem}>
                  <div className={styles.payoutItem__info}>
                    <span className={styles.payoutItem__user}>
                      {getUserName(commission.referredUser)}
                    </span>
                    <span className={styles.payoutItem__date}>
                      Paid on{" "}
                      {new Date(commission.paidAt!).toLocaleDateString()}
                    </span>
                  </div>
                  <span className={styles.payoutItem__amount}>
                    {formatCurrency(commission.amount)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
