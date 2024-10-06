import { useState, useEffect } from 'react';
import { useUser } from '@/lib/hooks/useUser';
import { useStore } from '@/lib/store';
import { toast } from 'react-hot-toast';
import { getGoals, createGoal } from '@/lib/api/client';
import GoalForm from '@/components/features/goals/GoalForm';
import GoalCard from '@/components/features/goals/GoalCard';

const GoalList = () => {
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

  const handleGoalCreate = async (newGoal) => {
    try {
      const createdGoal = await createGoal(newGoal);
      setGoals([...goals, createdGoal]);
      toast.success('Goal created successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {isLoadingGoals ? (
        <div className="spinner" />
      ) : (
        goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))
      )}
    </div>
  );
};

export default GoalList;