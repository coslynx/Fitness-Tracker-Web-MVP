import { useState, useEffect } from 'react';
import { useUser } from '@/lib/hooks/useUser';
import { useStore } from '@/lib/store';
import { toast } from 'react-hot-toast';
import { getProgressData } from '@/lib/api/client';
import { formatDate } from '@/lib/utils/formatters';
import ProgressChart from '@/components/features/progress/ProgressChart';
import ProgressLog from '@/components/features/progress/ProgressLog';

const ProgressPage = ({ params }) => {
  const { user, isLoading } = useUser();
  const { setProgressData } = useStore((state) => state);
  const [isLoadingProgress, setIsLoadingProgress] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error('You need to be logged in to access your progress');
      return;
    }
    setIsLoadingProgress(true);
    getProgressData(params.id)
      .then((progressData) => {
        setProgressData(progressData);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoadingProgress(false);
      });
  }, [user, params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner" />
      </div>
    );
  }

  if (isLoadingProgress) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center py-12">
      <h1 className="text-3xl font-bold mb-4">Progress</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProgressChart progressData={progressData} />
        <ProgressLog progressData={progressData} />
      </div>
    </div>
  );
};

export default ProgressPage;