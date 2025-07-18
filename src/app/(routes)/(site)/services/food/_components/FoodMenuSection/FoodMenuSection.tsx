'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button/Button';
import styles from './FoodMenuSection.module.scss';
import FoodMenuModal from '../FoodMenuModal/FoodMenuModal';

const FoodMenuSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Delicious Meals on Demand</h2>
          <p className={styles.description}>
            Browse through our extensive menu of freshly prepared meals from local chefs. 
            From traditional Nigerian classics to international cuisine, we have something 
            to satisfy every craving. Place your order now and enjoy a delicious meal 
            delivered to your doorstep.
          </p>
          <Button size="lg" onClick={openModal}>
            Explore Menu Options
          </Button>
        </div>
        <div className={styles.imageContainer}>
          <Image 
            src="/images/food/jollof-rice.png" 
            alt="Delicious Food"
            width={500}
            height={400}
            className={styles.image}
          />
        </div>
      </div>
      <FoodMenuModal 
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default FoodMenuSection; 