import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export default function StudentRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  return user?.role === 'student' ? <Outlet /> : <Navigate to="/" replace />;
}