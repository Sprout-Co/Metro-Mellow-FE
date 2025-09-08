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
            It gets even <br /> better with our <br /> mobile App
          </h2>
          <p className={styles["app-promo__description"]}>
            We're the spark that turns your chaos into calm, the groove that
            gets your life back in tune.
          </p>
          <div className={styles["app-promo__buttons"]}>
            <Button variant="primary" size="lg" fullWidth={false}>
              Download the app
            </Button>
            <Button variant="white" size="lg" fullWidth={false}>
              IOS DOWNLOAD
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
