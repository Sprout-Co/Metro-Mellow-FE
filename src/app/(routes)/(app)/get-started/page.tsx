// app/get-started/page.tsx
import { Metadata } from 'next';
import AuthForm from './_components/Auth/AuthForm';
import AuthManagement from './_components/AuthManagement';

export const metadata: Metadata = {
  title: 'Get Started | Metro Mellow',
  description: 'Create an account or sign in to Metro Mellow to access our home services.',
};

export default function GetStartedPage() {
  return (
    <main className="get-started-page">
      <AuthManagement />
    </main>
  );
}