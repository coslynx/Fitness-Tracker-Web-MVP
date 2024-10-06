import { useState, useEffect } from 'react';
import { useUser } from '@/lib/hooks/useUser';
import { useStore } from '@/lib/store';
import { toast } from 'react-hot-toast';
import { getAllPosts } from '@/lib/api/client';
import PostCard from '@/components/features/community/PostCard';
import NewPostForm from '@/components/features/community/NewPostForm';
import { useRouter } from 'next/navigation';

const CommunityFeed = () => {
  const { user, isLoading } = useUser();
  const { posts, setPosts } = useStore((state) => state);
  const router = useRouter();
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error('You need to be logged in to access the community');
      router.push('/auth/login');
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
  }, [user]);

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
      <NewPostForm />
      {isLoadingPosts ? (
        <div className="spinner" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityFeed;