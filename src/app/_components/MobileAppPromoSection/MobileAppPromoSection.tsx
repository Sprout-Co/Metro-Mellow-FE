"use client";
import React from "react";
import styles from "./MobileAppPromoSection.module.scss";
import { Button } from "@/components/ui/Button/Button";
import SignaturePattern from "@/components/ui/SignaturePattern/SignaturePattern";

const MobileAppPromoSection = () => {
  return (
    <section className={styles["app-promo"]}>
      <SignaturePattern />
      <div className={styles["app-promo__container"]}>
        <div className={styles["app-promo__content"]}>
          <h2 className={styles["app-promo__heading"]}>
            Book Services <br /> On-The-Go with <br /> Our Mobile App
          </h2>
          <p className={styles["app-promo__description"]}>
            Get instant access to all our services with real-time tracking, push notifications, and exclusive app-only deals. Join 1,000+ Lagos residents who manage their home services effortlessly.
          </p>
          <div className={styles["app-promo__buttons"]}>
            <Button variant="primary" size="lg" fullWidth={false}>
              Download for Android
            </Button>
            <Button variant="white" size="lg" fullWidth={false}>
              Download for iOS
            </Button>
          </div>
        </div>
        <div className={styles["app-promo__image"]}>
          <img
            className={styles["app-promo__phone"]}
            src="/images/home/iphone.jpeg"
            alt="Metromellow mobile app on iPhone"
            width={350}
            height={700}
          />
        </div>
      </div>
    </section>
  );
};

export default MobileAppPromoSection;
