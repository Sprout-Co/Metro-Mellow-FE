'use client';
import { motion } from 'framer-motion';
import Icon from '../common/Icon';
import styles from './RewardsLoyalty.module.scss';

// Sample rewards data
const rewardsData = {
  points: 650,
  tier: 'Silver',
  nextTier: 'Gold',
  pointsToNextTier: 350,
  history: [
    {
      id: 'rh1',
      type: 'earned',
      amount: 150,
      description: 'Weekly Home Cleaning Service',
      date: '2025-03-10'
    },
    {
      id: 'rh2',
      type: 'earned',
      amount: 100,
      description: 'Monthly Pest Control Service',
      date: '2025-02-15'
    },
    {
      id: 'rh3',
      type: 'redeemed',
      amount: 200,
      description: '$20 Discount on Next Service',
      date: '2025-02-01'
    }
  ]
};

// Sample available rewards
const availableRewards = [
  {
    id: 'r1',
    title: '$10 Off Your Next Service',
    points: 100,
    description: 'Redeem 100 points for $10 off your next scheduled service.',
    type: 'discount'
  },
  {
    id: 'r2',
    title: 'Free Upgrade to Deep Cleaning',
    points: 250,
    description: 'Upgrade your regular cleaning to a deep cleaning at no additional cost.',
    type: 'upgrade'
  },
  {
    id: 'r3',
    title: 'One Free Service',
    points: 1000,
    description: 'Redeem 1000 points for one free standard service of your choice.',
    type: 'free'
  }
];

// Referral program data
const referralData = {
  code: 'JOHN25',
  pointsPerReferral: 250,
  referrals: 2,
  pointsEarned: 500
};

export default function RewardsLoyalty() {
  // Format date to more readable format
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };
  
  const calculateProgress = () => {
    const currentTierPoints = rewardsData.points;
    const totalPointsNeeded = currentTierPoints + rewardsData.pointsToNextTier;
    return (currentTierPoints / totalPointsNeeded) * 100;
  };
  
  return (
    <motion.div 
      className={styles.rewards}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <header className={styles.rewards__header}>
        <div>
          <h1 className={styles.rewards__title}>Rewards & Loyalty</h1>
          <p className={styles.rewards__subtitle}>
            View your rewards points, redeem offers, and track your loyalty status
          </p>
        </div>
      </header>
      
      <motion.div 
        className={styles.rewards__summary}
        variants={itemVariants}
      >
        <div className={styles.rewards__points}>
          <h2 className={styles.rewards__pointsValue}>{rewardsData.points}</h2>
          <p className={styles.rewards__pointsLabel}>Available Points</p>
        </div>
        
        <div className={styles.rewards__tier}>
          <div className={styles.rewards__tierInfo}>
            <div className={styles.rewards__currentTier}>
              <h3 className={styles.rewards__tierTitle}>Current Tier</h3>
              <div className={styles.rewards__tierBadge}>
                <Icon name="award" />
                {rewardsData.tier}
              </div>
            </div>
            
            <div className={styles.rewards__nextTier}>
              <h3 className={styles.rewards__tierTitle}>Next Tier</h3>
              <div className={styles.rewards__tierBadge}>
                <Icon name="award" />
                {rewardsData.nextTier}
              </div>
            </div>
          </div>
          
          <div className={styles.rewards__progress}>
            <div className={styles.rewards__progressText}>
              <span>
                {rewardsData.points} / {rewardsData.points + rewardsData.pointsToNextTier} points
              </span>
              <span>
                {rewardsData.pointsToNextTier} points to {rewardsData.nextTier}
              </span>
            </div>
            <div className={styles.rewards__progressBar}>
              <div 
                className={styles.rewards__progressFill}
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className={styles.rewards__content}>
        <div className={styles.rewards__column}>
          <motion.section 
            className={styles.rewards__section}
            variants={itemVariants}
          >
            <h2 className={styles.rewards__sectionTitle}>
              <Icon name="gift" />
              Available Rewards
            </h2>
            
            <div className={styles.rewards__rewardsList}>
              {availableRewards.map((reward) => (
                <div key={reward.id} className={styles.rewards__rewardCard}>
                  <div className={styles.rewards__rewardHeader}>
                    <h3 className={styles.rewards__rewardTitle}>{reward.title}</h3>
                    <div className={styles.rewards__rewardPoints}>
                      <Icon name="star" />
                      {reward.points} pts
                    </div>
                  </div>
                  <p className={styles.rewards__rewardDescription}>
                    {reward.description}
                  </p>
                  <button 
                    className={styles.rewards__rewardBtn}
                    disabled={rewardsData.points < reward.points}
                  >
                    {rewardsData.points >= reward.points ? 'Redeem Reward' : 'Not Enough Points'}
                  </button>
                </div>
              ))}
            </div>
          </motion.section>
          
          <motion.section 
            className={styles.rewards__section}
            variants={itemVariants}
          >
            <h2 className={styles.rewards__sectionTitle}>
              <Icon name="users" />
              Referral Program
            </h2>
            
            <div className={styles.rewards__referral}>
              <div className={styles.rewards__referralInfo}>
                <p className={styles.rewards__referralDescription}>
                  Share your referral code with friends and family. 
                  You'll earn <strong>{referralData.pointsPerReferral} points</strong> for each 
                  new customer who signs up and completes their first service.
                </p>
                
                <div className={styles.rewards__referralCode}>
                  <span className={styles.rewards__referralCodeLabel}>Your Referral Code:</span>
                  <div className={styles.rewards__referralCodeValue}>
                    <span>{referralData.code}</span>
                    <button className={styles.rewards__copyBtn}>
                      <Icon name="copy" />
                    </button>
                  </div>
                </div>
                
                <div className={styles.rewards__referralStats}>
                  <div className={styles.rewards__referralStat}>
                    <span className={styles.rewards__referralStatValue}>
                      {referralData.referrals}
                    </span>
                    <span className={styles.rewards__referralStatLabel}>
                      Successful Referrals
                    </span>
                  </div>
                  <div className={styles.rewards__referralStat}>
                    <span className={styles.rewards__referralStatValue}>
                      {referralData.pointsEarned}
                    </span>
                    <span className={styles.rewards__referralStatLabel}>
                      Points Earned From Referrals
                    </span>
                  </div>
                </div>
              </div>
              
              <div className={styles.rewards__referralShare}>
                <h3 className={styles.rewards__referralShareTitle}>Share Your Code</h3>
                <div className={styles.rewards__referralButtons}>
                  <button className={styles.rewards__shareBtn}>
                    <Icon name="mail" />
                    Email
                  </button>
                  <button className={styles.rewards__shareBtn}>
                    <Icon name="message-square" />
                    Text Message
                  </button>
                  <button className={styles.rewards__shareBtn}>
                    <Icon name="link" />
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
        
        <div className={styles.rewards__column}>
          <motion.section 
            className={styles.rewards__section}
            variants={itemVariants}
          >
            <h2 className={styles.rewards__sectionTitle}>
              <Icon name="clock" />
              Points History
            </h2>
            
            <div className={styles.rewards__historyList}>
              {rewardsData.history.map((item) => (
                <div 
                  key={item.id} 
                  className={`${styles.rewards__historyItem} ${
                    item.type === 'redeemed' ? styles['rewards__historyItem--redeemed'] : ''
                  }`}
                >
                  <div className={styles.rewards__historyIcon}>
                    <Icon name={item.type === 'earned' ? 'plus-circle' : 'minus-circle'} />
                  </div>
                  <div className={styles.rewards__historyContent}>
                    <div className={styles.rewards__historyHeader}>
                      <h3 className={styles.rewards__historyTitle}>
                        {item.type === 'earned' ? 'Points Earned' : 'Points Redeemed'}
                      </h3>
                      <span className={styles.rewards__historyDate}>
                        {formatDate(item.date)}
                      </span>
                    </div>
                    <p className={styles.rewards__historyDescription}>{item.description}</p>
                  </div>
                  <div className={styles.rewards__historyPoints}>
                    {item.type === 'earned' ? '+' : '-'}{item.amount}
                  </div>
                </div>
              ))}
            </div>
            
            <button className={styles.rewards__viewBtn}>
              View Full History
              <Icon name="arrow-right" />
            </button>
          </motion.section>
          
          <motion.section 
            className={styles.rewards__section}
            variants={itemVariants}
          >
            <h2 className={styles.rewards__sectionTitle}>
              <Icon name="help-circle" />
              How to Earn More Points
            </h2>
            
            <div className={styles.rewards__earnList}>
              <div className={styles.rewards__earnItem}>
                <div className={styles.rewards__earnIcon}>
                  <Icon name="calendar" />
                </div>
                <div className={styles.rewards__earnContent}>
                  <h3 className={styles.rewards__earnTitle}>Book Services</h3>
                  <p className={styles.rewards__earnDescription}>
                    Earn points for every service you book. The more often you book, the more you earn!
                  </p>
                </div>
              </div>
              
              <div className={styles.rewards__earnItem}>
                <div className={styles.rewards__earnIcon}>
                  <Icon name="repeat" />
                </div>
                <div className={styles.rewards__earnContent}>
                  <h3 className={styles.rewards__earnTitle}>Create Subscriptions</h3>
                  <p className={styles.rewards__earnDescription}>
                    Get bonus points when you sign up for recurring services.
                  </p>
                </div>
              </div>
              
              <div className={styles.rewards__earnItem}>
                <div className={styles.rewards__earnIcon}>
                  <Icon name="users" />
                </div>
                <div className={styles.rewards__earnContent}>
                  <h3 className={styles.rewards__earnTitle}>Refer Friends</h3>
                  <p className={styles.rewards__earnDescription}>
                    Share your referral code and earn {referralData.pointsPerReferral} points for each new customer.
                  </p>
                </div>
              </div>
              
              <div className={styles.rewards__earnItem}>
                <div className={styles.rewards__earnIcon}>
                  <Icon name="star" />
                </div>
                <div className={styles.rewards__earnContent}>
                  <h3 className={styles.rewards__earnTitle}>Leave Reviews</h3>
                  <p className={styles.rewards__earnDescription}>
                    Earn points for leaving reviews after your service is completed.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
}