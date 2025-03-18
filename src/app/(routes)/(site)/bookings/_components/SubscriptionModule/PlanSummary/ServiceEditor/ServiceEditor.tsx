import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ServiceEditor.module.scss';
import ServiceTypeSelector from './ServiceTypeSelector/ServiceTypeSelector';
import PropertySelector from './PropertySelector/PropertySelector';
import ScheduleSelector from './ScheduleSelector/ScheduleSelector';
import QuantitySelector from './QuantitySelector/QuantitySelector';
import ReviewSummary from './ReviewSummary/ReviewSummary';

type ServiceEditorProps = {
  serviceType: 'cleaning' | 'food' | 'laundry';
  onClose: () => void;
  onSave: (serviceData: any) => void;
};

const ServiceEditor: React.FC<ServiceEditorProps> = ({ 
  serviceType, 
  onClose, 
  onSave 
}) => {
  const [activeStep, setActiveStep] = useState(1);
  const totalSteps = 4;
  
  // Service data state
  const [serviceData, setServiceData] = useState({
    // Cleaning data
    cleaningType: 'standard',
    houseType: 'flat',
    rooms: {
      bedroom: 1,
      livingRoom: 0,
      bathroom: 0,
      kitchen: 0,
      balcony: 0,
      studyRoom: 0
    },
    frequency: 1,
    day: 'friday',
    time: '8am',
    
    // Food data
    foodPlanType: 'basic',
    deliveryFrequency: 2,
    deliveryDays: ['monday', 'tuesday'],
    mealsPerDay: {
      monday: 5,
      tuesday: 2
    },
    
    // Laundry data
    laundryType: 'wash-and-iron',
    bags: 3,
    pickupFrequency: 1,
    pickupDay: 'friday'
  });
  
  // Update service data
  const updateServiceData = (newData: Partial<typeof serviceData>) => {
    setServiceData({ ...serviceData, ...newData });
  };
  
  // Handle next step
  const handleNext = () => {
    if (activeStep < totalSteps) {
      setActiveStep(activeStep + 1);
    } else {
      onSave(serviceData);
    }
  };
  
  // Handle back step
  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };
  
  // Determine title and content based on service type
  let title = 'Edit your service plan';
  if (serviceType === 'cleaning') title = 'Edit your cleaning plan';
  if (serviceType === 'food') title = 'Edit your food plan';
  if (serviceType === 'laundry') title = 'Edit your laundry plan';
  
  const getButtonLabel = () => {
    if (activeStep < totalSteps) return 'Continue';
    if (activeStep === totalSteps) return 'Save Changes';
    return 'Next';
  };

  return (
    <div className={styles.editor}>
      <div className={styles.editor__header}>
        <h2 className={styles.editor__title}>{title}</h2>
        <button className={styles.editor__close} onClick={onClose}>×</button>
      </div>
      
      {/* Progress Bar */}
      <div className={styles.editor__progress}>
        <div 
          className={styles.editor__progress_bar} 
          style={{ width: `${(activeStep / totalSteps) * 100}%` }}
        />
        <div className={styles.editor__progress_text}>
          STEP {activeStep} of {totalSteps}
        </div>
      </div>
      
      {/* Step content */}
      <div className={styles.editor__content}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`step-${activeStep}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={styles.editor__step}
          >
            {activeStep === 1 && (
              serviceType === 'cleaning' ? (
                <ServiceTypeSelector
                  type="cleaning"
                  selectedType={serviceData.cleaningType}
                  onChange={(type) => updateServiceData({ cleaningType: type })}
                />
              ) : serviceType === 'food' ? (
                <ServiceTypeSelector
                  type="food"
                  selectedType={serviceData.foodPlanType}
                  onChange={(type) => updateServiceData({ foodPlanType: type })}
                />
              ) : (
                <ServiceTypeSelector
                  type="laundry"
                  selectedType={serviceData.laundryType}
                  onChange={(type) => updateServiceData({ laundryType: type })}
                />
              )
            )}
            
            {activeStep === 2 && (
              serviceType === 'cleaning' ? (
                <PropertySelector
                  houseType={serviceData.houseType}
                  rooms={serviceData.rooms}
                  onHouseTypeChange={(type) => updateServiceData({ houseType: type })}
                  onRoomsChange={(rooms) => updateServiceData({ rooms })}
                />
              ) : serviceType === 'food' ? (
                <ScheduleSelector
                  type="food"
                  frequency={serviceData.deliveryFrequency}
                  days={serviceData.deliveryDays}
                  onFrequencyChange={(freq) => updateServiceData({ deliveryFrequency: freq })}
                  onDaysChange={(days) => updateServiceData({ deliveryDays: days })}
                />
              ) : (
                <QuantitySelector
                  type="laundry"
                  quantity={serviceData.bags}
                  onQuantityChange={(bags) => updateServiceData({ bags })}
                />
              )
            )}
            
            {activeStep === 3 && (
              serviceType === 'cleaning' ? (
                <ScheduleSelector
                  type="cleaning"
                  frequency={serviceData.frequency}
                  days={[serviceData.day]}
                  time={serviceData.time}
                  onFrequencyChange={(freq) => updateServiceData({ frequency: freq })}
                  onDaysChange={(days) => updateServiceData({ day: days[0] })}
                  onTimeChange={(time) => updateServiceData({ time })}
                />
              ) : serviceType === 'food' ? (
                <QuantitySelector
                  type="food"
                  mealsPerDay={serviceData.mealsPerDay}
                  days={serviceData.deliveryDays}
                  onMealsChange={(mealsPerDay) => updateServiceData({ mealsPerDay })}
                />
              ) : (
                <ScheduleSelector
                  type="laundry"
                  frequency={serviceData.pickupFrequency}
                  days={[serviceData.pickupDay]}
                  onFrequencyChange={(freq) => updateServiceData({ pickupFrequency: freq })}
                  onDaysChange={(days) => updateServiceData({ pickupDay: days[0] })}
                />
              )
            )}
            
            {activeStep === 4 && (
              <ReviewSummary
                serviceType={serviceType}
                serviceData={serviceData}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Action buttons */}
      <div className={styles.editor__actions}>
        {activeStep > 1 && (
          <button 
            className={styles.editor__back_btn}
            onClick={handleBack}
          >
            ← BACK
          </button>
        )}
        
        <button 
          className={styles.editor__continue_btn}
          onClick={handleNext}
        >
          {getButtonLabel()}
        </button>
      </div>
    </div>
  );
};

export default ServiceEditor;