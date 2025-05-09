import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function CompanyRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  return user?.role === 'company' ? <Outlet /> : <Navigate to="/" replace />;
}