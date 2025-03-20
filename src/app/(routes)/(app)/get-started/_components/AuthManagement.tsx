'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from './AuthLayout';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import VerificationForm from './VerificationForm';

type AuthMode = 'login' | 'register' | 'verify';

export default function AuthManagement() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const router = useRouter();
  
  const handleLoginSuccess = () => {
    // Redirect to dashboard or return URL
    router.push('/dashboard');
  };
  
  const handleRegisterSuccess = (email: string) => {
    setRegisteredEmail(email);
    setAuthMode('verify');
  };
  
  const handleVerificationSuccess = () => {
    // Redirect to dashboard with welcome message
    router.push('/dashboard?welcome=true');
  };
  
  const handleSwitchToLogin = () => {
    setAuthMode('login');
  };
  
  const handleSwitchToRegister = () => {
    setAuthMode('register');
  };

  return (
    <AuthLayout>
      {authMode === 'login' && (
        <LoginForm 
          onSuccess={handleLoginSuccess} 
          onRegisterClick={handleSwitchToRegister}
        />
      )}
      
      {authMode === 'register' && (
        <RegisterForm 
          onSuccess={handleRegisterSuccess} 
          onLoginClick={handleSwitchToLogin}
        />
      )}
      
      {authMode === 'verify' && (
        <VerificationForm
          email={registeredEmail}
          onSuccess={handleVerificationSuccess}
          onBack={handleSwitchToLogin}
        />
      )}
    </AuthLayout>
  );
}