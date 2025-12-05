'use client';

import { Suspense } from 'react';
import AuthLayout from '../../get-started/_components/AuthLayout';
import AdminSetupForm from './_components/AdminSetupForm';

export default function AdminSetupPage() {
  return (
    <AuthLayout>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }>
        <AdminSetupForm />
      </Suspense>
    </AuthLayout>
  );
}