import { useStore } from '@/lib/store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAnalytics = () => {
  const router = useRouter();
  const { setAnalyticsData } = useStore((state) => state);

  useEffect(() => {
    const handleRouteChange = () => {
      // Implement analytics tracking logic here
      // Example: Send data to a tracking service
      // console.log('Route changed to:', router.asPath);
      // setAnalyticsData({ ...analyticsData, route: router.asPath });
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return {};
};