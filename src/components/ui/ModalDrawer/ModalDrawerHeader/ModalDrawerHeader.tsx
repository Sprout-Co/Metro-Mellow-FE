import React from "react";
import styles from "./ModalDrawerHeader.module.scss";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import SignaturePattern from "@/components/ui/SignaturePattern/SignaturePattern";

interface ModalDrawerHeaderProps {
  title: string;
  description?: string;
  onClose: () => void;
}

const ModalDrawerHeader: React.FC<ModalDrawerHeaderProps> = ({
  title,
  description,
  onClose,
}) => {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className={styles.modalDrawerHeader}>
      <button
        className={styles.close__button}
        onClick={onClose}
        type="button"
        aria-label="Close modal"
      >
        <X />
      </button>

      {/* Header */}
      <motion.div
        className={styles.header}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <SignaturePattern />
        <div className={styles.header__content}>
          <div className={styles.header__text}>
            <h2 className={styles.header__title}>{title}</h2>
            <p className={styles.header__subtitle}>{description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ModalDrawerHeader;
