import { useAuth } from '@/contexts/AuthContext';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import StudentDashboard from '@/components/dashboard/StudentDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  return user?.role === 'admin' ? <AdminDashboard /> : <StudentDashboard />;
};

export default Dashboard;
