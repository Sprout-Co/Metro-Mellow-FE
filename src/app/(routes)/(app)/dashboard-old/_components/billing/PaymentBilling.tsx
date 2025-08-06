'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../common/Icon';
import styles from './PaymentBilling.module.scss';

// Sample payment methods data
const paymentMethods = [
  {
    id: 'pm1',
    type: 'credit-card',
    brand: 'Visa',
    last4: '4242',
    expMonth: 12,
    expYear: 2025,
    isDefault: true
  },
  {
    id: 'pm2',
    type: 'credit-card',
    brand: 'Mastercard',
    last4: '5555',
    expMonth: 8,
    expYear: 2026,
    isDefault: false
  }
];

// Sample billing history data
const billingHistory = [
  {
    id: 'inv1',
    service: 'Weekly Home Cleaning',
    date: '2025-03-10',
    amount: 120,
    status: 'paid',
    invoice: '/invoices/INV-20250310.pdf'
  },
  {
    id: 'inv2',
    service: 'Bi-weekly Laundry Service',
    date: '2025-03-05',
    amount: 75,
    status: 'paid',
    invoice: '/invoices/INV-20250305.pdf'
  },
  {
    id: 'inv3',
    service: 'Monthly Pest Control',
    date: '2025-02-15',
    amount: 90,
    status: 'paid',
    invoice: '/invoices/INV-20250215.pdf'
  },
  {
    id: 'inv4',
    service: 'Weekly Home Cleaning',
    date: '2025-02-03',
    amount: 120,
    status: 'paid',
    invoice: '/invoices/INV-20250203.pdf'
  }
];

// Sample subscription data
const subscriptions = [
  {
    id: 'sub1',
    service: 'Weekly Home Cleaning',
    price: 120,
    frequency: 'weekly',
    nextBilling: '2025-03-17',
    status: 'active'
  },
  {
    id: 'sub2',
    service: 'Bi-weekly Laundry Service',
    price: 75,
    frequency: 'bi-weekly',
    nextBilling: '2025-03-19',
    status: 'active'
  },
  {
    id: 'sub3',
    service: 'Monthly Pest Control',
    price: 90,
    frequency: 'monthly',
    nextBilling: '2025-03-15',
    status: 'paused'
  }
];

type TabType = 'payment-methods' | 'billing-history' | 'subscriptions';

export default function PaymentBilling() {
  const [activeTab, setActiveTab] = useState<TabType>('payment-methods');
  const [showAddCard, setShowAddCard] = useState(false);
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  const getCardIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return 'credit-card';
      case 'mastercard':
        return 'credit-card';
      case 'amex':
        return 'credit-card';
      default:
        return 'credit-card';
    }
  };
  
  return (
    <div className={styles.billing}>
      <header className={styles.billing__header}>
        <div>
          <h1 className={styles.billing__title}>Payment & Billing</h1>
          <p className={styles.billing__subtitle}>
            Manage your payment methods and view billing history
          </p>
        </div>
      </header>
      
      <div className={styles.billing__tabs}>
        <button 
          className={`${styles.billing__tab} ${activeTab === 'payment-methods' ? styles['billing__tab--active'] : ''}`}
          onClick={() => setActiveTab('payment-methods')}
        >
          <Icon name="credit-card" />
          Payment Methods
        </button>
        <button 
          className={`${styles.billing__tab} ${activeTab === 'billing-history' ? styles['billing__tab--active'] : ''}`}
          onClick={() => setActiveTab('billing-history')}
        >
          <Icon name="file-text" />
          Billing History
        </button>
        <button 
          className={`${styles.billing__tab} ${activeTab === 'subscriptions' ? styles['billing__tab--active'] : ''}`}
          onClick={() => setActiveTab('subscriptions')}
        >
          <Icon name="refresh-cw" />
          Subscriptions
        </button>
      </div>
      
      <div className={styles.billing__content}>
        <AnimatePresence mode="wait">
          {activeTab === 'payment-methods' && (
            <motion.div
              key="payment-methods"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.billing__section}
            >
              <div className={styles.billing__sectionHeader}>
                <h2 className={styles.billing__sectionTitle}>Your Payment Methods</h2>
                <button 
                  className={styles.billing__addBtn}
                  onClick={() => setShowAddCard(!showAddCard)}
                >
                  {showAddCard ? 'Cancel' : 'Add Payment Method'}
                </button>
              </div>
              
              <AnimatePresence>
                {showAddCard && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={styles.billing__addCard}
                  >
                    <div className={styles.billing__addCardForm}>
                      <div className={styles.billing__formRow}>
                        <div className={styles.billing__formGroup}>
                          <label htmlFor="cardNumber" className={styles.billing__formLabel}>
                            Card Number
                          </label>
                          <input 
                            type="text" 
                            id="cardNumber" 
                            className={styles.billing__formInput}
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                      </div>
                      
                      <div className={styles.billing__formRow}>
                        <div className={styles.billing__formGroup}>
                          <label htmlFor="cardName" className={styles.billing__formLabel}>
                            Cardholder Name
                          </label>
                          <input 
                            type="text" 
                            id="cardName" 
                            className={styles.billing__formInput}
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                      
                      <div className={styles.billing__formRow}>
                        <div className={styles.billing__formGroup}>
                          <label htmlFor="expDate" className={styles.billing__formLabel}>
                            Expiration Date
                          </label>
                          <input 
                            type="text" 
                            id="expDate" 
                            className={styles.billing__formInput}
                            placeholder="MM/YY"
                          />
                        </div>
                        
                        <div className={styles.billing__formGroup}>
                          <label htmlFor="cvv" className={styles.billing__formLabel}>
                            CVV
                          </label>
                          <input 
                            type="text" 
                            id="cvv" 
                            className={styles.billing__formInput}
                            placeholder="123"
                          />
                        </div>
                      </div>
                      
                      <div className={styles.billing__formActions}>
                        <button className={styles.billing__formSubmit}>
                          Add Card
                        </button>
                        <button 
                          className={styles.billing__formCancel}
                          onClick={() => setShowAddCard(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className={styles.billing__cardsList}>
                {paymentMethods.map((method) => (
                  <div key={method.id} className={styles.billing__card}>
                    <div className={styles.billing__cardIcon}>
                      <Icon name={getCardIcon(method.brand)} />
                    </div>
                    <div className={styles.billing__cardDetails}>
                      <div className={styles.billing__cardInfo}>
                        <h3 className={styles.billing__cardType}>
                          {method.brand} ●●●● {method.last4}
                        </h3>
                        <p className={styles.billing__cardExpiry}>
                          Expires {method.expMonth}/{method.expYear}
                        </p>
                      </div>
                      {method.isDefault && (
                        <span className={styles.billing__cardDefault}>Default</span>
                      )}
                    </div>
                    <div className={styles.billing__cardActions}>
                      {!method.isDefault && (
                        <button className={styles.billing__cardBtn}>
                          Set as Default
                        </button>
                      )}
                      <button className={styles.billing__cardBtn}>
                        <Icon name="edit" />
                      </button>
                      <button className={styles.billing__cardBtn}>
                        <Icon name="trash" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          
          {activeTab === 'billing-history' && (
            <motion.div
              key="billing-history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.billing__section}
            >
              <div className={styles.billing__sectionHeader}>
                <h2 className={styles.billing__sectionTitle}>Billing History</h2>
                <div className={styles.billing__filter}>
                  <label htmlFor="period" className={styles.billing__filterLabel}>
                    Period:
                  </label>
                  <select id="period" className={styles.billing__filterSelect}>
                    <option value="last3months">Last 3 months</option>
                    <option value="last6months">Last 6 months</option>
                    <option value="year">Last year</option>
                    <option value="all">All time</option>
                  </select>
                </div>
              </div>
              
              <div className={styles.billing__table}>
                <div className={styles.billing__tableHeader}>
                  <div className={styles.billing__tableHeaderCell}>Date</div>
                  <div className={styles.billing__tableHeaderCell}>Service</div>
                  <div className={styles.billing__tableHeaderCell}>Amount</div>
                  <div className={styles.billing__tableHeaderCell}>Status</div>
                  <div className={styles.billing__tableHeaderCell}>Invoice</div>
                </div>
                
                <div className={styles.billing__tableBody}>
                  {billingHistory.map((invoice) => (
                    <div key={invoice.id} className={styles.billing__tableRow}>
                      <div className={styles.billing__tableCell}>
                        {formatDate(invoice.date)}
                      </div>
                      <div className={styles.billing__tableCell}>
                        {invoice.service}
                      </div>
                      <div className={styles.billing__tableCell}>
                        {formatCurrency(invoice.amount)}
                      </div>
                      <div className={styles.billing__tableCell}>
                        <span className={`${styles.billing__status} ${styles[`billing__status--${invoice.status}`]}`}>
                          {invoice.status === 'paid' ? 'Paid' : 'Pending'}
                        </span>
                      </div>
                      <div className={styles.billing__tableCell}>
                        <a 
                          href={invoice.invoice} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.billing__invoiceLink}
                        >
                          <Icon name="download" />
                          Download
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={styles.billing__pagination}>
                <button className={styles.billing__paginationBtn} disabled>
                  <Icon name="chevron-left" />
                  Previous
                </button>
                <div className={styles.billing__paginationInfo}>
                  Page <strong>1</strong> of <strong>1</strong>
                </div>
                <button className={styles.billing__paginationBtn} disabled>
                  Next
                  <Icon name="chevron-right" />
                </button>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'subscriptions' && (
            <motion.div
              key="subscriptions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={styles.billing__section}
            >
              <div className={styles.billing__sectionHeader}>
                <h2 className={styles.billing__sectionTitle}>Your Subscriptions</h2>
              </div>
              
              <div className={styles.billing__subscriptionsList}>
                {subscriptions.map((subscription) => (
                  <div key={subscription.id} className={styles.billing__subscription}>
                    <div className={styles.billing__subscriptionHeader}>
                      <h3 className={styles.billing__subscriptionTitle}>
                        {subscription.service}
                      </h3>
                      <div 
                        className={`${styles.billing__subscriptionStatus} ${
                          styles[`billing__subscriptionStatus--${subscription.status}`]
                        }`}
                      >
                        {subscription.status === 'active' ? 'Active' : 'Paused'}
                      </div>
                    </div>
                    
                    <div className={styles.billing__subscriptionDetails}>
                      <div className={styles.billing__subscriptionDetail}>
                        <span className={styles.billing__subscriptionLabel}>Price:</span>
                        <span className={styles.billing__subscriptionValue}>
                          {formatCurrency(subscription.price)}
                        </span>
                      </div>
                      <div className={styles.billing__subscriptionDetail}>
                        <span className={styles.billing__subscriptionLabel}>Frequency:</span>
                        <span className={styles.billing__subscriptionValue}>
                          {subscription.frequency.charAt(0).toUpperCase() + subscription.frequency.slice(1)}
                        </span>
                      </div>
                      <div className={styles.billing__subscriptionDetail}>
                        <span className={styles.billing__subscriptionLabel}>Next billing:</span>
                        <span className={styles.billing__subscriptionValue}>
                          {subscription.status === 'active' 
                            ? formatDate(subscription.nextBilling)
                            : 'Paused'}
                        </span>
                      </div>
                    </div>
                    
                    <div className={styles.billing__subscriptionActions}>
                      {subscription.status === 'active' ? (
                        <button className={styles.billing__subscriptionBtn}>
                          Pause Subscription
                        </button>
                      ) : (
                        <button className={`${styles.billing__subscriptionBtn} ${styles['billing__subscriptionBtn--resume']}`}>
                          Resume Subscription
                        </button>
                      )}
                      <button className={styles.billing__subscriptionBtn}>
                        <Icon name="edit" />
                        Edit
                      </button>
                      <button className={`${styles.billing__subscriptionBtn} ${styles['billing__subscriptionBtn--cancel']}`}>
                        <Icon name="x" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}