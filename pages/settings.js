import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/hooks/useUser';
import { useStore } from '@/lib/store';
import { toast } from 'react-hot-toast';
import { updateUser } from '@/lib/api/client';

const SettingsPage = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const { setUser } = useStore((state) => state);

  const [formData, setFormData] = useState({
    email: user?.email || '',
    name: user?.name || '',
    password: '',
    newPassword: '',
  });

  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner" />
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingUpdate(true);
    try {
      await updateUser({
        email: formData.email,
        name: formData.name,
        password: formData.password,
        newPassword: formData.newPassword,
      });
      toast.success('Profile updated successfully');
      setUser({ ...user, ...formData });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center py-12">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md rounded px-8 pt-6 pb-8 mb-4 bg-white shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Current Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
            New Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="newPassword"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            disabled={isLoadingUpdate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isLoadingUpdate ? <div className="spinner" /> : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;