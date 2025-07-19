"use client";

import React, { useState } from 'react';
import { Button } from '../Button/Button';
import LoginModal from './LoginModal';

const LoginModalExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
      <Button 
        variant="primary"
        onClick={openModal}
      >
        Open Login Modal
      </Button>

      <LoginModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default LoginModalExample; 