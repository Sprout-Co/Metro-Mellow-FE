'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button/Button';
import styles from './BillingSection.module.scss';

interface BillingData {
  paymentMethods: Array<{
    id: string;
    type: 'card' | 'bank';
    last4: string;
    brand: string;
    expiryDate: string;
    isDefault: boolean;
  }>;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  invoiceHistory: Array<{
    id: string;
    date: string;
    amount: string;
    status: 'paid' | 'pending' | 'failed';
    description: string;
    invoiceNumber: string;
  }>;
  billingPreferences: {
    automaticRenewal: boolean;
    receiptEmails: string[];
  };
}

interface BillingSectionProps {
  initialBilling?: BillingData;
  onSave?: (billing: BillingData) => void;
  isLoading?: boolean;
}

export default function BillingSection({ 
  initialBilling, 
  onSave, 
  isLoading = false 
}: BillingSectionProps) {
  const [billing, setBilling] = useState<BillingData>(
    initialBilling || {
      paymentMethods: [
        {
          id: '1',
          type: 'card',
          last4: '4242',
          brand: 'Visa',
          expiryDate: '12/25',
          isDefault: true
        }
      ],
      billingAddress: {
        street: '123 Main Street',
        city: 'Lagos',
        state: 'Lagos',
        zipCode: '100001',
        country: 'Nigeria'
      },
      invoiceHistory: [
        {
          id: '1',
          date: '2024-01-01',
          amount: '$29.99',
          status: 'paid',
          description: 'Premium Plan - January 2024',
          invoiceNumber: 'INV-2024-001'
        },
        {
          id: '2',
          date: '2023-12-01',
          amount: '$29.99',
          status: 'paid',
          description: 'Premium Plan - December 2023',
          invoiceNumber: 'INV-2023-012'
        },
        {
          id: '3',
          date: '2023-11-01',
          amount: '$29.99',
          status: 'paid',
          description: 'Premium Plan - November 2023',
          invoiceNumber: 'INV-2023-011'
        }
      ],
      billingPreferences: {
        automaticRenewal: true,
        receiptEmails: ['user@example.com', 'finance@company.com']
      }
    }
  );

  const [showAddPayment, setShowAddPayment] = useState(false);

  const handleSave = () => {
    onSave?.(billing);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return styles['billingSection__status--active'];
      case 'cancelled': return styles['billingSection__status--cancelled'];
      case 'expired': return styles['billingSection__status--expired'];
      case 'paid': return styles['billingSection__status--paid'];
      case 'pending': return styles['billingSection__status--pending'];
      case 'failed': return styles['billingSection__status--failed'];
      default: return '';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'cancelled': return 'Cancelled';
      case 'expired': return 'Expired';
      case 'paid': return 'Paid';
      case 'pending': return 'Pending';
      case 'failed': return 'Failed';
      default: return status;
    }
  };

  return (
    <div className={styles.billingSection}>
      {/* Payment Methods Section */}
      <div className={styles.billingSection__card}>
        <div className={styles.billingSection__cardHeader}>
          <h3 className={styles.billingSection__cardTitle}>Payment Methods</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowAddPayment(!showAddPayment)}
          >
            {showAddPayment ? 'Cancel' : 'Add New'}
          </Button>
        </div>
        
        <div className={styles.billingSection__paymentMethods}>
          {billing.paymentMethods.map((method) => (
            <div key={method.id} className={styles.billingSection__paymentCard}>
              <div className={styles.billingSection__cardIcon}>
                {method.brand === 'Visa' ? '💳' : '🏦'}
              </div>
              <div className={styles.billingSection__cardInfo}>
                <p className={styles.billingSection__cardBrand}>
                  {method.brand} •••• {method.last4}
                </p>
                <p className={styles.billingSection__cardExpiry}>
                  Expires {method.expiryDate}
                </p>
              </div>
              {method.isDefault && (
                <span className={styles.billingSection__defaultBadge}>Default</span>
              )}
            </div>
          ))}
        </div>

        {showAddPayment && (
          <div className={styles.billingSection__addPayment}>
            <p>Add new payment method form would go here...</p>
          </div>
        )}
      </div>

      {/* Billing Address Section */}
      <div className={styles.billingSection__card}>
        <h3 className={styles.billingSection__cardTitle}>Billing Address</h3>
        <div className={styles.billingSection__address}>
          <p className={styles.billingSection__addressLine}>
            {billing.billingAddress.street}
          </p>
          <p className={styles.billingSection__addressLine}>
            {billing.billingAddress.city}, {billing.billingAddress.state} {billing.billingAddress.zipCode}
          </p>
          <p className={styles.billingSection__addressLine}>
            {billing.billingAddress.country}
          </p>
        </div>
        <div className={styles.billingSection__addressActions}>
          <Button variant="ghost" size="sm">
            Edit Address
          </Button>
        </div>
      </div>

      {/* Invoice History Section */}
      <div className={`${styles.billingSection__card} ${styles['billingSection__card--full-width']}`}>
        <h3 className={styles.billingSection__cardTitle}>Invoice History</h3>
        <div className={styles.billingSection__history}>
          {billing.invoiceHistory.map((item) => (
            <div key={item.id} className={styles.billingSection__historyItem}>
              <div className={styles.billingSection__historyInfo}>
                <p className={styles.billingSection__historyDescription}>
                  {item.description}
                </p>
                <p className={styles.billingSection__historyInvoice}>
                  Invoice: {item.invoiceNumber}
                </p>
                <p className={styles.billingSection__historyDate}>
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
              <div className={styles.billingSection__historyAmount}>
                <span className={styles.billingSection__amount}>{item.amount}</span>
                <span className={`${styles.billingSection__status} ${getStatusColor(item.status)}`}>
                  {getStatusText(item.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.billingSection__historyActions}>
          <Button variant="ghost" size="sm">
            Download All Invoices
          </Button>
        </div>
      </div>

      {/* Billing Preferences Section */}
      <div className={`${styles.billingSection__card} ${styles['billingSection__card--full-width']}`}>
        <h3 className={styles.billingSection__cardTitle}>Billing Preferences</h3>
        
        <div className={styles.billingSection__preferences}>
          <div className={styles.billingSection__preferenceItem}>
            <div className={styles.billingSection__preferenceInfo}>
              <h4 className={styles.billingSection__preferenceTitle}>
                Automatic Renewal
              </h4>
              <p className={styles.billingSection__preferenceDescription}>
                Automatically renew your subscriptions when they expire
              </p>
            </div>
            <label className={styles.billingSection__toggle}>
              <input
                type="checkbox"
                checked={billing.billingPreferences.automaticRenewal}
                onChange={(e) => setBilling(prev => ({
                  ...prev,
                  billingPreferences: {
                    ...prev.billingPreferences,
                    automaticRenewal: e.target.checked
                  }
                }))}
                className={styles.billingSection__toggleInput}
              />
              <span className={styles.billingSection__toggleSlider} />
            </label>
          </div>

          <div className={styles.billingSection__preferenceItem}>
            <div className={styles.billingSection__preferenceInfo}>
              <h4 className={styles.billingSection__preferenceTitle}>
                Receipt Emails
              </h4>
              <p className={styles.billingSection__preferenceDescription}>
                Additional email addresses to receive payment receipts
              </p>
            </div>
            <div className={styles.billingSection__emailList}>
              {billing.billingPreferences.receiptEmails.map((email, index) => (
                <span key={index} className={styles.billingSection__emailTag}>
                  {email}
                </span>
              ))}
              <Button variant="ghost" size="sm">
                Add Email
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className={`${styles.billingSection__actions} ${styles['billingSection__actions--full-width']}`}>
        <Button 
          variant="primary" 
          size="lg"
          onClick={handleSave}
          loading={isLoading}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
