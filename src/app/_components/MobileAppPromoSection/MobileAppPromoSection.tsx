"use client";
import React from "react";
import styles from "./MobileAppPromoSection.module.scss";
import SignaturePattern from "@/components/ui/SignaturePattern/SignaturePattern";

const MobileAppPromoSection = () => {
  return (
    <section className={styles["app-promo"]}>
      <SignaturePattern />
      <div className={styles["app-promo__container"]}>
        <div className={styles["app-promo__content"]}>
          <h2 className={styles["app-promo__heading"]}>
            Mobile App <br /> Coming Soon
          </h2>
          <p className={styles["app-promo__description"]}>
            We're building something amazing! Get notified when our mobile app launches and be among the first to experience effortless home service management on-the-go with real-time tracking, push notifications, and exclusive app-only deals.
          </p>
        </div>
        <div className={styles["app-promo__image"]}>
          <img
            className={styles["app-promo__phone"]}
            src="/images/home/iphone.jpeg"
            alt="Metromellow mobile app coming soon"
            width={350}
            height={700}
          />
        </div>
      </div>
    </section>
  );
};

export default MobileAppPromoSection;
