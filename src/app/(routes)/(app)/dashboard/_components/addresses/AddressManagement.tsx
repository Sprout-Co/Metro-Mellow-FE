'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../common/Icon';
import styles from './AddressManagement.module.scss';
import EmptyState from '../overview/EmptyState';

// Mock data for addresses
const mockAddresses = [
  {
    id: '1',
    name: 'Home',
    isPrimary: true,
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    instructions: 'Gate code: 1234. Please ring doorbell.'
  },
  {
    id: '2',
    name: 'Office',
    isPrimary: false,
    street: '456 Park Avenue',
    city: 'New York',
    state: 'NY',
    zipCode: '10022',
    instructions: 'Ask for John at the front desk.'
  }
];

export default function AddressManagement() {
  const [addresses] = useState(mockAddresses);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);

  const handleEditClick = (addressId: string) => {
    setEditingAddress(addressId);
  };

  const handleDeleteClick = (addressId: string) => {
    console.log(`Delete address ${addressId}`);
  };

  const handleSetPrimaryClick = (addressId: string) => {
    console.log(`Set address ${addressId} as primary`);
  };

  if (!addresses || addresses.length === 0) {
    return (
      <EmptyState 
        type="upcoming"
        onAction={() => console.log('Add address clicked')}
      />
    );
  }

  return (
    <div className={styles.addresses}>
      <header className={styles.addresses__header}>
        <h2 className={styles.addresses__title}>
          Your Addresses
          <span className={styles.addresses__count}>{addresses.length}</span>
        </h2>
        <button className={styles.addresses__addBtn}>
          <Icon name="plus" />
          Add New Address
        </button>
      </header>

      <div className={styles.addresses__list}>
        {addresses.map((address) => (
          <motion.div 
            key={address.id}
            className={styles.addresses__card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: addresses.findIndex(a => a.id === address.id) * 0.1
            }}
          >
            <div className={styles.addresses__cardHeader}>
              <div className={styles.addresses__cardInfo}>
                <h3 className={styles.addresses__cardTitle}>
                  {address.name}
                  {address.isPrimary && (
                    <span className={styles.addresses__primaryBadge}>Primary</span>
                  )}
                </h3>
              </div>
            </div>

            <div className={styles.addresses__cardContent}>
              <div className={styles.addresses__addressDetails}>
                <div className={styles.addresses__addressLine}>
                  <Icon name="map-pin" className={styles.addresses__icon} />
                  <span>{address.street}</span>
                </div>
                <div className={styles.addresses__addressLine}>
                  <Icon name="map" className={styles.addresses__icon} />
                  <span>{address.city}, {address.state} {address.zipCode}</span>
                </div>
                {address.instructions && (
                  <div className={styles.addresses__addressLine}>
                    <Icon name="info" className={styles.addresses__icon} />
                    <span>{address.instructions}</span>
                  </div>
                )}
              </div>

              <div className={styles.addresses__actions}>
                <button 
                  className={`${styles.addresses__actionBtn} ${styles['addresses__actionBtn--secondary']}`}
                  onClick={() => handleEditClick(address.id)}
                >
                  <Icon name="edit-2" />
                  Edit
                </button>
                {!address.isPrimary && (
                  <button 
                    className={`${styles.addresses__actionBtn} ${styles['addresses__actionBtn--primary']}`}
                    onClick={() => handleSetPrimaryClick(address.id)}
                  >
                    <Icon name="star" />
                    Set as Primary
                  </button>
                )}
                <button 
                  className={`${styles.addresses__actionBtn} ${styles['addresses__actionBtn--danger']}`}
                  onClick={() => handleDeleteClick(address.id)}
                >
                  <Icon name="trash-2" />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}