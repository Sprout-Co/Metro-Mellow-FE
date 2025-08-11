"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./RewardsWidget.module.scss";

// Mock rewards data
const rewardsData = {
  points: 320,
  pointsToNextReward: 180,
  nextRewardThreshold: 500,
  tier: "Silver",
  rewards: [
    {
      id: "1",
      name: "15% Off Next Booking",
      pointsCost: 500,
      unlocked: false,
    },
    {
      id: "2",
      name: "Free Deep Clean",
      pointsCost: 1200,
      unlocked: false,
    },
    {
      id: "3",
      name: "Priority Scheduling",
      pointsCost: 300,
      unlocked: true,
    },
  ],
};

const RewardsWidget: React.FC = () => {
  const progressPercentage =
    (rewardsData.points / rewardsData.nextRewardThreshold) * 100;

  return (
    <div className={styles.rewardsWidget}>
      <div className={styles.rewardsWidget__header}>
        <h2 className={styles.rewardsWidget__title}>Rewards</h2>
        <span className={styles.rewardsWidget__tier}>
          {rewardsData.tier} Member
        </span>
      </div>

      <div className={styles.rewardsWidget__points}>
        <div className={styles.rewardsWidget__pointsValue}>
          {rewardsData.points}
        </div>
        <div className={styles.rewardsWidget__pointsLabel}>loyalty points</div>
      </div>

      <div className={styles.rewardsWidget__progress}>
        <div className={styles.rewardsWidget__progressLabel}>
          <span>{rewardsData.pointsToNextReward} points to next reward</span>
        </div>
        <div className={styles.rewardsWidget__progressBar}>
          <motion.div
            className={styles.rewardsWidget__progressFill}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          ></motion.div>
        </div>
      </div>

      <div className={styles.rewardsWidget__availableRewards}>
        <h3 className={styles.rewardsWidget__sectionTitle}>
          Available Rewards
        </h3>

        <div className={styles.rewardsWidget__rewardsList}>
          {rewardsData.rewards.map((reward) => (
            <motion.div
              key={reward.id}
              className={`${styles.rewardsWidget__rewardItem} ${reward.unlocked ? styles["rewardsWidget__rewardItem--unlocked"] : ""}`}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className={styles.rewardsWidget__rewardInfo}>
                <div className={styles.rewardsWidget__rewardName}>
                  {reward.name}
                </div>
                <div className={styles.rewardsWidget__rewardCost}>
                  {reward.unlocked
                    ? "Unlocked!"
                    : `${reward.pointsCost} points`}
                </div>
              </div>

              <motion.button
                className={`${styles.rewardsWidget__rewardButton} ${!reward.unlocked ? styles["rewardsWidget__rewardButton--disabled"] : ""}`}
                disabled={!reward.unlocked}
                whileHover={reward.unlocked ? { scale: 1.05 } : {}}
                whileTap={reward.unlocked ? { scale: 0.95 } : {}}
              >
                {reward.unlocked ? "Redeem" : "Locked"}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      <div className={styles.rewardsWidget__footer}>
        <motion.button
          className={styles.rewardsWidget__referButton}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Refer a Friend (+100 points)
        </motion.button>
      </div>
    </div>
  );
};

export default RewardsWidget;
