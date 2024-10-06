import { useState, useEffect } from 'react';
import { useUser } from '@/lib/hooks/useUser';
import { useStore } from '@/lib/store';
import { toast } from 'react-hot-toast';
import { getAllPosts } from '@/lib/api/client';

const CommunityPage = () => {
  const { user, isLoading } = useUser();
  const { setPosts } = useStore((state) => state);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error('You need to be logged in to access the community');
      return;
    }
    setIsLoadingPosts(true);
    getAllPosts()
      .then((posts) => {
        setPosts(posts);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoadingPosts(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center py-12">
      <h1 className="text-3xl font-bold mb-4">Community</h1>
      {isLoadingPosts ? (
        <div className="spinner" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* TODO: Render posts here */}
        </div>
      )}
    </div>
  );
};

export default CommunityPage;