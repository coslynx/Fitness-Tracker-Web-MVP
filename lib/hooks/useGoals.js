import { useStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getGoals } from '@/lib/api/client';
import { toast } from 'react-hot-toast';

export const useGoals = () => {
  const router = useRouter();
  const { goals, setGoals } = useStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGoals = async () => {
      setIsLoading(true);
      try {
        const data = await getGoals();
        setGoals(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, []);

  return { isLoading, goals };
};