import { useState } from 'react';
import { useUser } from '@/lib/hooks/useUser';
import { useStore } from '@/lib/store';
import { toast } from 'react-hot-toast';
import { signIn } from '@/lib/api/client';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const LoginForm = () => {
  const { user, isLoading } = useUser();
  const { setUser } = useStore((state) => state);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingSubmit(true);
    try {
      await signIn(formData);
      toast.success('Login successful');
      setUser(formData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  if (isLoading || user) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md rounded px-8 pt-6 pb-8 mb-4 bg-white shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <Input
          type="email"
          name="email"
          placeholder="john.doe@example.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <Input
          type="password"
          name="password"
          placeholder="********"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <Button type="submit" disabled={isLoadingSubmit}>
          {isLoadingSubmit ? <div className="spinner" /> : 'Log In'}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;