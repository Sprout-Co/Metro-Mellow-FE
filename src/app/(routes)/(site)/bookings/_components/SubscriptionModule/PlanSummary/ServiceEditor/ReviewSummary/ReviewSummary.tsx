import React from 'react';
import styles from './ReviewSummary.module.scss';

interface ReviewSummaryProps {
  serviceType: 'cleaning' | 'food' | 'laundry';
  serviceData: any;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({
  serviceType,
  serviceData
}) => {
  // Format cleaning service data
  const renderCleaningData = () => {
    return (
      <>
        <div className={styles.summary__item}>
          <span className={styles.summary__label}>Plan type</span>
          <span className={styles.summary__value}>
            {serviceData.cleaningType === 'standard' ? 'Standard Cleaning' : 
             serviceData.cleaningType === 'deep' ? 'Deep Cleaning' : 
             'Post Construction Cleaning'}
          </span>
        </div>
        
        <div className={styles.summary__item}>
          <span className={styles.summary__label}>House Information</span>
          <span className={styles.summary__value}>
            {serviceData.houseType === 'flat' ? 'Flat' : 'Duplex'}
          </span>
        </div>
        
        <div className={styles.summary__item}>
          <span className={styles.summary__label}>Rooms</span>
          <div className={styles.summary__value_list}>
            {serviceData.rooms.bedroom > 0 && (
              <span>{serviceData.rooms.bedroom} Bedrooms</span>
            )}
            {serviceData.rooms.livingRoom > 0 && (
              <span>{serviceData.rooms.livingRoom} Living Rooms</span>
            )}
            {serviceData.rooms.bathroom > 0 && (
              <span>{serviceData.rooms.bathroom} Bathrooms</span>
            )}
            {serviceData.rooms.kitchen > 0 && (
              <span>{serviceData.rooms.kitchen} Kitchens</span>
            )}
            {serviceData.rooms.balcony > 0 && (
              <span>{serviceData.rooms.balcony} Balconies</span>
            )}
            {serviceData.rooms.studyRoom > 0 && (
              <span>{serviceData.rooms.studyRoom} Study Rooms</span>
            )}
          </div>
        </div>
        
        <div className={styles.summary__item}>
          <span className={styles.summary__label}>Frequency</span>
          <span className={styles.summary__value}>Once a week</span>
        </div>
        
        <div className={styles.summary__item}>
          <span className={styles.summary__label}>Cleaning Days</span>
          <span className={styles.summary__value}>
            {serviceData.day.charAt(0).toUpperCase() + serviceData.day.slice(1)}
          </span>
        </div>
      </>
    );
  };
  
  // Format food service data
  const renderFoodData = () => {
    return (
      <>
        <div className={styles.summary__item}>
          <span className={styles.summary__label}>Plan type</span>
          <span className={styles.summary__value}>
            {serviceData.foodPlanType === 'basic' ? 'Basic Plan' : 'Standard Plan'}
          </span>
        </div>
        
        <div className={styles.summary__item}>
          <span className={styles.summary__label}>Delivery frequency</span>
          <span className={styles.summary__value}>
            {serviceData.deliveryFrequency === 1 ? 'Once a week' : 
             serviceData.deliveryFrequency === 2 ? 'Twice a week' : 
             `${serviceData.deliveryFrequency} times a week`}
          </span>
        </div>
        
        <div className={styles.summary__item}>
          <span className={styles.summary__label}>Meals Per Delivery</span>
          {Object.entries(serviceData.mealsPerDay).map(([day, count]) => (
            <span key={day} className={styles.summary__value}>
              {count} on {day.charAt(0).toUpperCase() + day.slice(1)}
            </span>
          ))}
        </div>
        
        <div className={styles.summary__item}>
          <span className={styles.summary__label}>Delivery Day(s)</span>
          <span className={styles.summary__value}>
            {serviceData.deliveryDays.map(day => 
              day.charAt(0).toUpperCase() + day.slice(1)
            ).join(', ')}
          </span>
        </div>
      </>
    );
  };
  
  // Format laundry service data
  const renderLaundryData = () => {
    return (
      <>
        <div className={styles.summary__item}>
          <span className={styles.summary__label}>Plan type</span>
          <span className={styles.summary__value}>
            {serviceData.laundryType === 'wash-and-iron' ? 'wash and iron' : 'wash and fold'}
          </span>
        </div>
        
        <div className={styles.summary__item}>
          <span className={styles.summary__label}>No. of Bags Per Pickup</span>
          <span className={styles.summary__value}>{serviceData.bags}</span>
        </div>
        
        <div className={styles.summary__item}>
          <span className={styles.summary__label}>Frequency</span>
          <span className={styles.summary__value}>Once a week</span>
        </div>
        
        <div className={styles.summary__item}>
          <span className={styles.summary__label}>Pickup Days</span>
          <span className={styles.summary__value}>
            {serviceData.pickupDay}
          </span>
        </div>
      </>
    );
  };

  return (
    <div className={styles.summary}>
      <div className={styles.summary__container}>
        {serviceType === 'cleaning' && renderCleaningData()}
        {serviceType === 'food' && renderFoodData()}
        {serviceType === 'laundry' && renderLaundryData()}
      </div>
    </div>
  );
};

export default ReviewSummary;