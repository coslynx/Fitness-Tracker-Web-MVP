import { useStore } from '@/lib/store';
import { formatDate } from '@/lib/utils/formatters';
import Card from '@/components/ui/Card';
import { useMemo } from 'react';

interface DashboardStatsProps {
  dashboardData: DashboardData;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ dashboardData }) => {
  const { goals, progressData } = useStore((state) => state);

  const totalGoals = goals.length;

  const recentProgress = useMemo(() => {
    return progressData
      .slice(0, 5)
      .map((progressEntry) => ({
        ...progressEntry,
        date: formatDate(progressEntry.date),
      }));
  }, [progressData]);

  const recentProgressCount = recentProgress.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card title="Total Goals" className="flex flex-col gap-4">
        <p className="text-3xl font-bold text-gray-800">{totalGoals}</p>
      </Card>
      <Card title="Recent Progress" className="flex flex-col gap-4">
        <p className="text-gray-600">
          {recentProgressCount > 0
            ? `Last ${recentProgressCount} entries`
            : 'No recent progress'}
        </p>
        <ul className="list-disc pl-4">
          {recentProgress.length > 0 ? (
            recentProgress.map((progressEntry) => (
              <li key={progressEntry.id}>
                <p className="text-gray-600">
                  {progressEntry.date} - {progressEntry.value} for{' '}
                  {progressEntry.goal?.title}
                </p>
              </li>
            ))
          ) : (
            <li className="text-gray-600">No recent activity found.</li>
          )}
        </ul>
      </Card>
      {/* Add more dashboard stats cards here */}
    </div>
  );
};

export default DashboardStats;