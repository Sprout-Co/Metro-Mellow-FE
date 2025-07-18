'use client';

import { useState } from 'react';
import { SignInModal } from './';
import styles from './SignInModal.module.scss';

const SignInModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSignUp = () => {
    console.log('Sign up clicked');
    // Handle sign up action, e.g., redirect to sign up page or open sign up modal
    closeModal();
  };

  const handleSuccess = () => {
    console.log('Login successful');
    // Handle successful login, e.g., redirect to dashboard
  };

  return (
    <div>
      <button 
        onClick={openModal}
        className={styles.signInModal__button}
      >
        Sign In
      </button>
      
      <SignInModal 
        isOpen={isOpen}
        onClose={closeModal}
        onSignUp={handleSignUp}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default SignInModalExample; 