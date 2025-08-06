"use client";

import React from "react";
import CTAButton from "./CTAButton";
import styles from "./CTAButtonExample.module.scss";

const CTAButtonExample: React.FC = () => {
  return (
    <div className={styles.showcase}>
      <h2 className={styles.title}>CTA Button Showcase</h2>
      <div className={styles.grid}>
        {/* Pulse - Great for primary CTAs */}
        <div className={styles.item}>
          <CTAButton
            animationType="pulse"
            animationIntensity="medium"
            autoAnimate={1000}
            animationInterval={4000}
            variant="primary"
            size="lg"
          >
            🚀 Get Started Now
          </CTAButton>
          <p className={styles.description}>Pulse - Perfect for main CTAs</p>
        </div>

        {/* Heartbeat - For urgent actions */}
        <div className={styles.item}>
          <CTAButton
            animationType="heartbeat"
            animationIntensity="intense"
            autoAnimate={2000}
            animationInterval={6000}
            variant="secondary"
            size="lg"
          >
            💝 Limited Offer
          </CTAButton>
          <p className={styles.description}>Heartbeat - For urgent offers</p>
        </div>

        {/* Glow - Eye-catching and premium feel */}
        <div className={styles.item}>
          <CTAButton
            animationType="glow"
            continuous={true}
            pauseOnHover={true}
            variant="primary"
            size="lg"
          >
            ✨ Premium Access
          </CTAButton>
          <p className={styles.description}>Glow - Premium feel</p>
        </div>

        {/* Bounce - Playful and fun */}
        <div className={styles.item}>
          <CTAButton
            animationType="bounce"
            animationIntensity="medium"
            autoAnimate={1500}
            animationInterval={5000}
            variant="ghost"
            size="md"
          >
            🎉 Join the Fun
          </CTAButton>
          <p className={styles.description}>Bounce - Playful interactions</p>
        </div>

        {/* Shimmer - Modern and sleek */}
        <div className={styles.item}>
          <CTAButton
            animationType="shimmer"
            autoAnimate={3000}
            animationInterval={8000}
            variant="white"
            size="lg"
          >
            🌟 Discover More
          </CTAButton>
          <p className={styles.description}>Shimmer - Modern and sleek</p>
        </div>

        {/* Flash - High attention grabber */}
        <div className={styles.item}>
          <CTAButton
            animationType="flash"
            animationIntensity="intense"
            autoAnimate={2500}
            animationInterval={7000}
            variant="secondary"
            size="lg"
          >
            ⚡ Flash Sale
          </CTAButton>
          <p className={styles.description}>Flash - Maximum attention</p>
        </div>

        {/* Vibrate - For notifications/alerts */}
        <div className={styles.item}>
          <CTAButton
            animationType="vibrate"
            animationIntensity="medium"
            autoAnimate={4000}
            animationInterval={10000}
            variant="primary"
            size="md"
          >
            🔔 New Message
          </CTAButton>
          <p className={styles.description}>Vibrate - Notifications</p>
        </div>

        {/* Wobble - Quirky and attention-getting */}
        <div className={styles.item}>
          <CTAButton
            animationType="wobble"
            animationIntensity="subtle"
            autoAnimate={3500}
            animationInterval={9000}
            variant="ghost"
            size="lg"
          >
            🎭 Try Something New
          </CTAButton>
          <p className={styles.description}>Wobble - Quirky appeal</p>
        </div>

        {/* Flicker - Electric energy */}
        <div className={styles.item}>
          <CTAButton
            animationType="flicker"
            animationIntensity="medium"
            autoAnimate={2000}
            animationInterval={6000}
            variant="primary"
            size="lg"
          >
            ⚡ Power Up
          </CTAButton>
          <p className={styles.description}>Flicker - Electric energy</p>
        </div>
      </div>

      <div className={styles.tips}>
        <h3>Usage Tips:</h3>
        <ul>
          <li>
            <strong>Pulse:</strong> Best for primary CTAs, converts well
          </li>
          <li>
            <strong>Heartbeat:</strong> Perfect for urgent/limited time offers
          </li>
          <li>
            <strong>Glow:</strong> Great for premium features or upgrades
          </li>
          <li>
            <strong>Bounce:</strong> Ideal for playful, fun interactions
          </li>
          <li>
            <strong>Shimmer:</strong> Modern feel, works well for "new" features
          </li>
          <li>
            <strong>Flash:</strong> Maximum attention, use sparingly
          </li>
          <li>
            <strong>Vibrate:</strong> Excellent for notifications and alerts
          </li>
          <li>
            <strong>Wobble:</strong> Quirky, great for creative/artistic brands
          </li>
          <li>
            <strong>Flicker:</strong> High energy, tech-focused actions
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CTAButtonExample;
