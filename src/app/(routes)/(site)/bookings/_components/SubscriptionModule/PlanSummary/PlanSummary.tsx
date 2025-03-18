
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './PlanSummary.module.scss';
import ServiceEditor from './ServiceEditor/ServiceEditor';

interface ServiceType {
  id: string;
  name: string;
  icon: string;
  type: 'cleaning' | 'food' | 'laundry';
  details: any;
}

const PlanSummary: React.FC = () => {
  const [services, setServices] = useState<ServiceType[]>([
    {
      id: 'cleaning-1',
      name: 'Cleaning Service',
      icon: '🧹',
      type: 'cleaning',
      details: {
        cleaningType: 'standard',
        houseType: 'flat',
        rooms: {
          bedroom: 2,
          livingRoom: 1,
          bathroom: 1,
          kitchen: 1,
          balcony: 0,
          studyRoom: 0
        },
        frequency: 1,
        day: 'friday',
        time: '8am'
      }
    },
    {
      id: 'food-1',
      name: 'Food Service',
      icon: '🍳',
      type: 'food',
      details: {
        foodPlanType: 'basic',
        deliveryFrequency: 2,
        deliveryDays: ['monday', 'tuesday'],
        mealsPerDay: {
          monday: 5,
          tuesday: 2
        }
      }
    }
  ]);
  
  const [editingService, setEditingService] = useState<ServiceType | null>(null);
  
  // Open service editor
  const handleEditService = (service: ServiceType) => {
    setEditingService(service);
  };
  
  // Close service editor
  const handleCloseEditor = () => {
    setEditingService(null);
  };
  
  // Save service changes
  const handleSaveService = (serviceData: any) => {
    if (editingService) {
      // Update the service in the services array
      const updatedServices = services.map(service => 
        service.id === editingService.id
          ? { ...service, details: serviceData }
          : service
      );
      
      setServices(updatedServices);
      setEditingService(null);
    }
  };
  
  return (
    <div className={styles.plan_summary}>
      <h2 className={styles.plan_summary__title}>Your Plan Summary</h2>
      
      {/* Social proof element */}
      <div className={styles.plan_summary__social_proof}>
        <span className={styles.plan_summary__social_proof_text}>
          450+ people are using similar plans
        </span>
      </div>
      
      {/* Services List */}
      <div className={styles.plan_summary__services}>
        {services.map((service) => (
          <div 
            key={service.id}
            className={styles.plan_summary__service}
          >
            <div className={styles.plan_summary__service_header}>
              <div className={styles.plan_summary__service_icon}>
                <span>{service.icon}</span>
              </div>
              <div className={styles.plan_summary__service_info}>
                <h3 className={styles.plan_summary__service_name}>{service.name}</h3>
                <p className={styles.plan_summary__service_type}>
                  {service.type === 'cleaning' 
                    ? (service.details.cleaningType === 'standard' ? 'Standard Cleaning' : 
                       service.details.cleaningType === 'deep' ? 'Deep Cleaning' : 
                       'Post Construction Cleaning')
                    : service.type === 'food'
                    ? (service.details.foodPlanType === 'basic' ? 'Basic Plan' : 'Standard Plan')
                    : (service.details.laundryType === 'wash-and-iron' ? 'Wash And Iron' : 'Wash And Fold')
                  }
                </p>
              </div>
              <button 
                className={styles.plan_summary__service_edit}
                onClick={() => handleEditService(service)}
              >
                EDIT {service.type.toUpperCase()}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Service Editor Modal */}
      {editingService && (
        <div className={styles.plan_summary__modal}>
          <div className={styles.plan_summary__modal_backdrop} onClick={handleCloseEditor} />
          <div className={styles.plan_summary__modal_content}>
            <ServiceEditor
              serviceType={editingService.type}
              onClose={handleCloseEditor}
              onSave={handleSaveService}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanSummary;