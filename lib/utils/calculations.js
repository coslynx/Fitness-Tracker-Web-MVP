import { formatDate } from './formatters';

export const calculateProgressPercentage = (goal: Goal, progressData: Progress[]) => {
  const targetValue = goal.targetValue;
  const currentValue = progressData.reduce((sum, entry) => sum + entry.value, 0);
  if (targetValue === 0) {
    return 0;
  }
  return Math.round((currentValue / targetValue) * 100);
};

export const calculateTimeRemaining = (goal: Goal) => {
  const endDate = new Date(goal.endDate);
  const today = new Date();
  const timeRemaining = endDate.getTime() - today.getTime();
  if (timeRemaining <= 0) {
    return 'Goal Completed';
  }
  const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));
  return `${daysRemaining} day${daysRemaining > 1 ? 's' : ''} remaining`;
};

export const calculateAverageProgress = (progressData: Progress[]) => {
  if (progressData.length === 0) {
    return 0;
  }
  const totalValue = progressData.reduce((sum, entry) => sum + entry.value, 0);
  return Math.round(totalValue / progressData.length);
};

export const calculateDaysSinceLastProgress = (progressData: Progress[]) => {
  if (progressData.length === 0) {
    return 'No Progress Recorded';
  }
  const lastEntryDate = progressData[0].date;
  const daysSinceLastEntry = Math.ceil(
    (new Date().getTime() - new Date(lastEntryDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return `${daysSinceLastEntry} day${daysSinceLastEntry > 1 ? 's' : ''} ago`;
};

export const calculateDaysToGoalCompletion = (goal: Goal, progressData: Progress[]) => {
  const progressPercentage = calculateProgressPercentage(goal, progressData);
  if (progressPercentage >= 100) {
    return 'Goal Completed';
  }
  const endDate = new Date(goal.endDate);
  const today = new Date();
  const totalDays = Math.ceil(
    (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysToCompletion = Math.ceil(
    (totalDays * (100 - progressPercentage)) / 100
  );
  return `${daysToCompletion} day${daysToCompletion > 1 ? 's' : ''} to completion`;
};

export const calculateGoalProgress = (goal: Goal, progressData: Progress[]) => {
  const progressPercentage = calculateProgressPercentage(goal, progressData);
  const timeRemaining = calculateTimeRemaining(goal);
  return { progressPercentage, timeRemaining };
};