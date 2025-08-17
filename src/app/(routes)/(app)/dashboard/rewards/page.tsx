// src/app/(routes)/(app)/dashboard/rewards/page.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Star,
  Gift,
  TrendingUp,
  Clock,
  CheckCircle,
  Lock,
  ArrowRight,
  Zap,
  Target,
  Award,
} from "lucide-react";
import DashboardLayout from "../_components/DashboardLayout/DashboardLayout";
import styles from "./Rewards.module.scss";
import FnButton from "@/components/ui/Button/FnButton";

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: string;
  isUnlocked: boolean;
  icon: React.ReactNode;
  discount?: string;
}

interface Tier {
  name: string;
  minPoints: number;
  maxPoints: number;
  benefits: string[];
  color: string;
}

const tiers: Tier[] = [
  {
    name: "Bronze",
    minPoints: 0,
    maxPoints: 499,
    benefits: ["5% discount on services", "Birthday bonus points"],
    color: "#CD7F32",
  },
  {
    name: "Silver",
    minPoints: 500,
    maxPoints: 999,
    benefits: [
      "10% discount on services",
      "Priority booking",
      "Birthday bonus points",
    ],
    color: "#C0C0C0",
  },
  {
    name: "Gold",
    minPoints: 1000,
    maxPoints: 2499,
    benefits: [
      "15% discount on services",
      "Priority booking",
      "Free monthly service",
      "Birthday bonus points",
    ],
    color: "#FFD700",
  },
  {
    name: "Platinum",
    minPoints: 2500,
    maxPoints: Infinity,
    benefits: [
      "20% discount on services",
      "VIP support",
      "Priority booking",
      "Free monthly service",
      "Exclusive offers",
    ],
    color: "#E5E4E2",
  },
];

const availableRewards: Reward[] = [
  {
    id: "1",
    title: "15% Off Next Booking",
    description: "Save 15% on your next service booking",
    pointsCost: 500,
    category: "Discount",
    isUnlocked: true,
    icon: <TrendingUp />,
    discount: "15%",
  },
  {
    id: "2",
    title: "Free Deep Cleaning",
    description: "Get a complimentary deep cleaning service",
    pointsCost: 1200,
    category: "Service",
    isUnlocked: false,
    icon: <Gift />,
  },
  {
    id: "3",
    title: "Priority Booking",
    description: "Book services with priority scheduling",
    pointsCost: 300,
    category: "Perk",
    isUnlocked: true,
    icon: <Clock />,
  },
  {
    id: "4",
    title: "₦5,000 Service Credit",
    description: "Get ₦5,000 credit towards any service",
    pointsCost: 800,
    category: "Credit",
    isUnlocked: false,
    icon: <Star />,
    discount: "₦5,000",
  },
];

export default function RewardsPage() {
  const [currentPoints] = useState(320);
  const [lifetimePoints] = useState(1850);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  const currentTier =
    tiers.find(
      (tier) =>
        lifetimePoints >= tier.minPoints && lifetimePoints <= tier.maxPoints
    ) || tiers[0];

  const nextTier = tiers[tiers.indexOf(currentTier) + 1];
  const pointsToNextTier = nextTier ? nextTier.minPoints - lifetimePoints : 0;
  const progressToNextTier = nextTier
    ? ((lifetimePoints - currentTier.minPoints) /
        (nextTier.minPoints - currentTier.minPoints)) *
      100
    : 100;

  const handleRedeemReward = (reward: Reward) => {
    if (reward.isUnlocked) {
      setSelectedReward(reward);
      // Handle redemption logic
    }
  };

  return (
    <DashboardLayout>
      <div className={styles.rewards}>
        {/* Header Section */}
        <div className={styles.rewards__header}>
          <motion.div
            className={styles.rewards__headerContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Trophy className={styles.rewards__headerIcon} />
            <div>
              <h1 className={styles.rewards__title}>Loyalty Program</h1>
              <p className={styles.rewards__subtitle}>
                Earn points with every service and unlock exclusive rewards
              </p>
            </div>
          </motion.div>
        </div>

        {/* Points Overview */}
        <motion.div
          className={styles.pointsOverview}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className={styles.pointsOverview__main}>
            <div className={styles.pointsOverview__current}>
              <span className={styles.pointsOverview__label}>
                Available Points
              </span>
              <span className={styles.pointsOverview__value}>
                {currentPoints.toLocaleString()}
              </span>
              <span className={styles.pointsOverview__points}>points</span>
            </div>
            <div className={styles.pointsOverview__stats}>
              <div className={styles.pointsOverview__stat}>
                <Zap size={20} />
                <div>
                  <span className={styles.pointsOverview__statValue}>
                    {lifetimePoints.toLocaleString()}
                  </span>
                  <span className={styles.pointsOverview__statLabel}>
                    Lifetime Points
                  </span>
                </div>
              </div>
              <div className={styles.pointsOverview__stat}>
                <Target size={20} />
                <div>
                  <span className={styles.pointsOverview__statValue}>
                    {currentTier.name}
                  </span>
                  <span className={styles.pointsOverview__statLabel}>
                    Current Tier
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tier Progress */}
          <div className={styles.tierProgress}>
            <div className={styles.tierProgress__header}>
              <div className={styles.tierProgress__current}>
                <span
                  className={styles.tierProgress__badge}
                  style={{ backgroundColor: currentTier.color }}
                >
                  {currentTier.name}
                </span>
              </div>
              {nextTier && (
                <div className={styles.tierProgress__next}>
                  <span>{pointsToNextTier} points to</span>
                  <span
                    className={styles.tierProgress__badge}
                    style={{ backgroundColor: nextTier.color }}
                  >
                    {nextTier.name}
                  </span>
                </div>
              )}
            </div>
            <div className={styles.tierProgress__bar}>
              <motion.div
                className={styles.tierProgress__fill}
                initial={{ width: 0 }}
                animate={{ width: `${progressToNextTier}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{
                  background: `linear-gradient(90deg, ${currentTier.color}, ${nextTier?.color || currentTier.color})`,
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* How to Earn Points */}
        <motion.div
          className={styles.earnPoints}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className={styles.earnPoints__title}>How to Earn Points</h2>
          <div className={styles.earnPoints__grid}>
            {[
              {
                icon: <Star />,
                title: "Book Services",
                points: "10 points per ₦1,000 spent",
              },
              {
                icon: <Gift />,
                title: "Subscribe",
                points: "500 bonus points",
              },
              {
                icon: <Trophy />,
                title: "Refer Friends",
                points: "100 points per referral",
              },
              {
                icon: <CheckCircle />,
                title: "Complete Profile",
                points: "50 points one-time",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={styles.earnPoints__card}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <div className={styles.earnPoints__icon}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.points}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Available Rewards */}
        <motion.div
          className={styles.rewardsSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className={styles.rewardsSection__title}>Available Rewards</h2>
          <div className={styles.rewardsGrid}>
            {availableRewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                className={`${styles.rewardCard} ${!reward.isUnlocked ? styles["rewardCard--locked"] : ""}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={reward.isUnlocked ? { y: -4 } : {}}
              >
                <div className={styles.rewardCard__header}>
                  <div className={styles.rewardCard__icon}>
                    {reward.isUnlocked ? reward.icon : <Lock />}
                  </div>
                  {reward.discount && (
                    <span className={styles.rewardCard__discount}>
                      {reward.discount}
                    </span>
                  )}
                </div>
                <div className={styles.rewardCard__content}>
                  <h3 className={styles.rewardCard__title}>{reward.title}</h3>
                  <p className={styles.rewardCard__description}>
                    {reward.description}
                  </p>
                  <div className={styles.rewardCard__footer}>
                    <span className={styles.rewardCard__cost}>
                      {reward.pointsCost} points
                    </span>
                    <FnButton
                      variant={reward.isUnlocked ? "primary" : "ghost"}
                      size="sm"
                      disabled={
                        !reward.isUnlocked || currentPoints < reward.pointsCost
                      }
                      onClick={() => handleRedeemReward(reward)}
                    >
                      {reward.isUnlocked
                        ? currentPoints >= reward.pointsCost
                          ? "Redeem"
                          : "Not Enough Points"
                        : "Locked"}
                    </FnButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tier Benefits */}
        <motion.div
          className={styles.tierBenefits}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className={styles.tierBenefits__title}>Tier Benefits</h2>
          <div className={styles.tierBenefits__grid}>
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                className={`${styles.tierCard} ${tier.name === currentTier.name ? styles["tierCard--current"] : ""}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                style={{ borderColor: tier.color }}
              >
                <div
                  className={styles.tierCard__header}
                  style={{
                    background: `linear-gradient(135deg, ${tier.color}20, ${tier.color}10)`,
                  }}
                >
                  <Award
                    className={styles.tierCard__icon}
                    style={{ color: tier.color }}
                  />
                  <h3 className={styles.tierCard__name}>{tier.name}</h3>
                  <span className={styles.tierCard__range}>
                    {tier.maxPoints === Infinity
                      ? `${tier.minPoints}+ points`
                      : `${tier.minPoints} - ${tier.maxPoints} points`}
                  </span>
                </div>
                <ul className={styles.tierCard__benefits}>
                  {tier.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex}>
                      <CheckCircle size={16} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                {tier.name === currentTier.name && (
                  <span className={styles.tierCard__badge}>Your Tier</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
