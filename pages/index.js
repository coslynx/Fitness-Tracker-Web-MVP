import { useState, useEffect } from 'react';
import { useUser } from '@/lib/hooks/useUser';
import { useStore } from '@/lib/store';
import { toast } from 'react-hot-toast';
import { getGoals } from '@/lib/api/client';

const GoalsPage = () => {
  const { user, isLoading } = useUser();
  const { goals, setGoals } = useStore((state) => state);
  const [isLoadingGoals, setIsLoadingGoals] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error('You need to be logged in to access your goals');
      return;
    }
    setIsLoadingGoals(true);
    getGoals()
      .then((goals) => {
        setGoals(goals);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoadingGoals(false);
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
      <h1 className="text-3xl font-bold mb-4">Goals</h1>
      {isLoadingGoals ? (
        <div className="spinner" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* TODO: Render goals here */}
        </div>
      )}
    </div>
  );
};

export default GoalsPage;