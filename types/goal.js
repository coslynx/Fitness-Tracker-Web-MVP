export interface Goal {
  id: number;
  userId: number;
  title: string;
  description: string;
  targetValue: number;
  startDate: Date;
  endDate: Date;
  category: 'weight' | 'steps' | 'distance';
  createdAt: Date;
  updatedAt: Date;
}

export interface Progress {
  id: number;
  goalId: number;
  userId: number;
  date: Date;
  value: number;
  createdAt: Date;
  updatedAt: Date;
  goal?: Goal;
}

export interface DashboardData {
  goals: Goal[];
  progressData: Progress[];
}