// src/app/(routes)/(app)/dashboard/rewards/refer/page.tsx
"use client";

import React, { useState } from "react";
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
  TrendingUp,
  Award,
  DollarSign,
} from "lucide-react";
import styles from "./ReferFriend.module.scss";
import FnButton from "@/components/ui/Button/FnButton";
import Input from "@/components/ui/Input/Input";
import DashboardLayout from "../_components/DashboardLayout/DashboardLayout";
import DashboardHeader from "../_components/DashboardHeader/DashboardHeader";

interface Referral {
  id: string;
  name: string;
  email: string;
  status: "pending" | "joined" | "completed";
  dateReferred: string;
  reward?: number;
}

const mockReferrals: Referral[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "completed",
    dateReferred: "2024-07-15",
    reward: 100,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "joined",
    dateReferred: "2024-08-01",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    status: "pending",
    dateReferred: "2024-08-10",
  },
];

export default function ReferFriendPage() {
  const [referralCode] = useState("SARAH320");
  const [copied, setCopied] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [referrals] = useState<Referral[]>(mockReferrals);

  const referralLink = `https://metromellow.com/join?ref=${referralCode}`;
  const totalEarned = referrals
    .filter((r) => r.status === "completed")
    .reduce((sum, r) => sum + (r.reward || 0), 0);
  const totalReferred = referrals.length;
  const successfulReferrals = referrals.filter(
    (r) => r.status === "completed"
  ).length;

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
      pending: { color: "#f2994a", label: "Pending" },
      joined: { color: "#2293fb", label: "Joined" },
      completed: { color: "#059669", label: "Completed" },
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  return (
    <DashboardLayout>
      <div className={styles.refer}>
        <DashboardHeader
          title="Refer a Friend"
          subtitle="Share Metro Mellow with friends and earn rewards together"
          actionBtnText="Share"
          actionBtnIcon={<Share2 size={18} />}
          onActionButtonClick={() => {
            // Handle share action
            console.log("Sharing referral link");
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
                <Users />
              </div>
              <div className={styles.statCard__content}>
                <span className={styles.statCard__value}>{totalReferred}</span>
                <span className={styles.statCard__label}>Friends Referred</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statCard__icon}>
                <Check />
              </div>
              <div className={styles.statCard__content}>
                <span className={styles.statCard__value}>
                  {successfulReferrals}
                </span>
                <span className={styles.statCard__label}>
                  Successful Referrals
                </span>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statCard__icon}>
                <Gift />
              </div>
              <div className={styles.statCard__content}>
                <span className={styles.statCard__value}>{totalEarned}</span>
                <span className={styles.statCard__label}>Points Earned</span>
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
                  "They sign up using your code and book their first service",
              },
              {
                number: "3",
                title: "Earn Rewards",
                description:
                  "You both get 100 bonus points after their first service",
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

        {/* Referral History */}
        <motion.div
          className={styles.referralHistory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className={styles.referralHistory__title}>Your Referrals</h2>
          <div className={styles.referralList}>
            {referrals.map((referral, index) => {
              const status = getStatusBadge(referral.status);
              return (
                <motion.div
                  key={referral.id}
                  className={styles.referralItem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                >
                  <div className={styles.referralItem__info}>
                    <h4>{referral.name}</h4>
                    <p>{referral.email}</p>
                    <span className={styles.referralItem__date}>
                      Referred on{" "}
                      {new Date(referral.dateReferred).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.referralItem__status}>
                    <span
                      className={styles.referralItem__badge}
                      style={{
                        backgroundColor: `${status?.color}20`,
                        color: status?.color,
                      }}
                    >
                      {status?.label}
                    </span>
                    {referral.reward && (
                      <span className={styles.referralItem__reward}>
                        +{referral.reward} points
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
