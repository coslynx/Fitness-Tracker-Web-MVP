import { useStore } from '@/lib/store';
import { formatDate } from '@/lib/utils/formatters';
import Card from '@/components/ui/Card';

interface RecentActivityProps {
  dashboardData: DashboardData;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ dashboardData }) => {
  const { progressData } = useStore((state) => state);

  const recentProgress = progressData
    .slice(0, 5)
    .map((progressEntry) => ({
      ...progressEntry,
      date: formatDate(progressEntry.date),
    }));

  return (
    <Card title="Recent Activity" className="flex flex-col gap-4">
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
  );
};

export default RecentActivity;