import { useStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProgressData } from '@/lib/api/client';
import { toast } from 'react-hot-toast';

export const useProgress = (goalId: string) => {
  const router = useRouter();
  const { setProgressData } = useStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [progressData, setProgressDataState] = useState<Progress[]>([]);

  useEffect(() => {
    const fetchProgress = async () => {
      setIsLoading(true);
      try {
        const data = await getProgressData(goalId);
        setProgressDataState(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (goalId) {
      fetchProgress();
    }
  }, [goalId]);

  useEffect(() => {
    setProgressData(progressData);
  }, [progressData, setProgressData]);

  return { isLoading, progressData };
};