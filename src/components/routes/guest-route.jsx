import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth.js';

export default function GuestRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  return !user ? <Outlet /> : <Navigate to="/" replace />;
}