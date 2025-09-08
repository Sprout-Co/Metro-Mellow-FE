'use client';

import React from 'react';
import styles from './AddressCard.module.scss';
import Button from '@/components/ui/Button/Button';

interface Address {
  id: string;
  fullname: string;
  state: string;
  lga: string;
  address: string;
  phone: string;
  email: string;
}

interface AddressCardProps {
  address: Address;
  onEdit: () => void;
}

const AddressCard = ({ address, onEdit }: AddressCardProps) => {
  return (
    <div className={styles.addressCard}>
      <div className={styles.addressCard__content}>
        <div className={styles.addressCard__details}>
          <div className={styles.addressCard__icon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div className={styles.addressCard__address}>
            {address.address}
          </div>
        </div>

        <div className={styles.addressCard__contact}>
          <div className={styles.addressCard__contactItem}>
            <div className={styles.addressCard__contactIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <span>{address.phone}</span>
          </div>
          <div className={styles.addressCard__contactItem}>
            <div className={styles.addressCard__contactIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <span>{address.email}</span>
          </div>
        </div>
      </div>
      
      <div className={styles.addressCard__actions}>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onEdit}
          className={styles.addressCard__editButton}
        >
          EDIT
        </Button>
      </div>
    </div>
  );
};

export default AddressCard;
