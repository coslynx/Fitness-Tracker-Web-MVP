import { useState, useEffect } from 'react';
import { useUser } from '@/lib/hooks/useUser';
import { useStore } from '@/lib/store';
import { toast } from 'react-hot-toast';
import { getGoals, createGoal } from '@/lib/api/client';
import GoalForm from '@/components/features/goals/GoalForm';
import GoalCard from '@/components/features/goals/GoalCard';
import GoalList from '@/components/features/goals/GoalList';

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
    <div className="container mx-auto flex flex-col items-center justify-center py-12">
      <h1 className="text-3xl font-bold mb-4">Goals</h1>
      <GoalForm onCreate={handleGoalCreate} />
      {isLoadingGoals ? (
        <div className="spinner" />
      ) : (
        <GoalList goals={goals} />
      )}
    </div>
  );
};

export default GoalsPage;