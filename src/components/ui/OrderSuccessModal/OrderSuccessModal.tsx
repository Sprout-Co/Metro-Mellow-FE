"use client";

import React from "react";
import Image from "next/image";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import styles from "./OrderSuccessModal.module.scss";

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
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
          <h2 className={styles.success__title}>
            Your order has been sent. Thank you!
          </h2>
                      <p className={styles.success__message}>
              We'll notify you once your order is ready.
            </p>
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
            RETURN HOME
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderSuccessModal; 