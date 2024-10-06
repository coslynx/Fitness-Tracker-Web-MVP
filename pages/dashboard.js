import { useState, useEffect } from 'react';
import { useUser } from '@/lib/hooks/useUser';
import { useStore } from '@/lib/store';
import { toast } from 'react-hot-toast';
import { getDashboardData } from '@/lib/api/client';
import DashboardStats from '@/components/features/dashboard/DashboardStats';
import RecentActivity from '@/components/features/dashboard/RecentActivity';

const DashboardPage = () => {
  const { user, isLoading } = useUser();
  const { setDashboardData } = useStore((state) => state);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error('You need to be logged in to access your dashboard');
      return;
    }
    setIsLoadingDashboard(true);
    getDashboardData()
      .then((dashboardData) => {
        setDashboardData(dashboardData);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoadingDashboard(false);
      });
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center py-12">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {isLoadingDashboard ? (
        <div className="spinner" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardStats dashboardData={dashboardData} />
          <RecentActivity dashboardData={dashboardData} />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;