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
            Be first to know when our app launches! Enjoy easy home service
            bookings, real-time updates, and app-only deals—coming soon.
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
