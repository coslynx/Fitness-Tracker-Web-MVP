import { useUser } from '@/lib/hooks/useUser';
import { useStore } from '@/lib/store';
import { getUser } from '@/lib/api/client';
import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { formatDate } from '@/lib/utils/formatters';
import { toast } from 'react-hot-toast';

interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const { user, isLoading } = useUser();
  const { setUser } = useStore((state) => state);
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    newPassword: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  useEffect(() => {
    if (!userId) {
      return;
    }
    setIsLoadingUser(true);
    getUser(userId)
      .then((user) => {
        setUserData(user);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoadingUser(false);
      });
  }, [userId]);

  useEffect(() => {
    if (userData) {
      setFormData({
        email: userData.email,
        name: userData.name,
        password: '',
        newPassword: '',
      });
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsLoadingUpdate(true);
    try {
      await updateUser({
        ...formData,
        id: userId,
      });
      toast.success('Profile updated successfully');
      setUserData({ ...userData, ...formData });
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading || isLoadingUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <>
      <Card className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {userData?.name || 'User Profile'}
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={handleEdit} disabled={isEditing}>
              Edit
            </Button>
            <Button variant="secondary" onClick={handleOpenModal}>
              Delete
            </Button>
          </div>
        </div>
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <Input
              label="email"
              type="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled
            />
            <Input
              label="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              label="password"
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
            />
            <Input
              label="newPassword"
              type="password"
              placeholder="********"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <div className="flex gap-2">
              <Button variant="primary" onClick={handleSave} disabled={isLoadingUpdate}>
                Save
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-gray-600">Email: {userData?.email}</p>
            <p className="text-gray-600">
              Joined: {formatDate(userData?.createdAt)}
            </p>
          </div>
        )}
      </Card>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Delete User">
        <p className="text-gray-600">
          Are you sure you want to delete this user? This action cannot be undone.
        </p>
        <div className="flex gap-2">
          <Button variant="primary" onClick={handleCloseModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default UserProfile;