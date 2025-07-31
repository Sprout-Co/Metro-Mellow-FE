"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ChefHat, Users, Calendar } from "lucide-react";
import styles from "./CateringHero.module.scss";

const CateringHero: React.FC = () => {
  return (
    <section className={styles.cateringHero}>
      <div className={styles.cateringHero__background} />
      <div className={styles.cateringHero__overlay} />
      <div className={styles.cateringHero__container}>
        <motion.div
          className={styles.cateringHero__content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.cateringHero__badge}>
            Professional Corporate Catering
          </div>
          <h1 className={styles.cateringHero__title}>
            <span className={styles["cateringHero__title--accent"]}>Exceptional</span>
            <span className={styles["cateringHero__title--main"]}>
              Corporate<br />Dining Solutions
            </span>
          </h1>
          <p className={styles.cateringHero__subtitle}>
            Elevate your workplace dining experience with our premium catering services.
            From daily office meals to special corporate events, we deliver culinary excellence
            that nourishes your team and impresses your clients.
          </p>
          <div className={styles.cateringHero__cta}>
            <Button variant="primary" size="lg" rightIcon={<ArrowRight size={18} />}>
              View Menu Options
            </Button>
            <Button variant="white" size="lg" rightIcon={<Calendar size={18} />}>
              Schedule Tasting
            </Button>
          </div>
        </motion.div>
        <div className={styles.cateringHero__stats}>
          <div className={styles.cateringHero__stat}>
            <ChefHat size={24} />
            <div>50+ Menu Options</div>
          </div>
          <div className={styles.cateringHero__stat}>
            <Users size={24} />
            <div>200+ Corporate Clients</div>
          </div>
          <div className={styles.cateringHero__stat}>
            <Calendar size={24} />
            <div>Same-Day Service</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CateringHero;