"use client";

import React from "react";
import Image from "next/image";
import Modal from "@/components/ui/Modal/Modal";
import { Button } from "@/components/ui/Button/Button";
import styles from "./OrderSuccessModal.module.scss";

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  title = "Order Confirmed! 🚀",
  message = "We've received your order. Sit back, relax, and we'll update you shortly!",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={true}
      maxWidth="580px"
      showHeader={false}
    >
      <div className={styles.success}>
        <div className={styles.success__content}>
          <h2 className={styles.success__title}>{title}</h2>
          <p className={styles.success__message}>{message}</p>
          <div className={styles.success__illustration}>
            <Image
              src="/images/general/success_order.png"
              alt="Order Success"
              width={300}
              height={300}
              priority
            />
          </div>
          <Button
            variant="primary"
            fullWidth
            className={styles.success__button}
            onClick={onClose}
          >
            CLOSE
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderSuccessModal;
