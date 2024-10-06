import { useState, useEffect } from 'react';
import { useUser } from '@/lib/hooks/useUser';
import { useStore } from '@/lib/store';
import { toast } from 'react-hot-toast';
import { getGoal, updateGoal, deleteGoal } from '@/lib/api/client';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { formatDate } from '@/lib/utils/formatters';

interface GoalCardProps {
  goal: Goal;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  const { user, isLoading } = useUser();
  const { goals, setGoals } = useStore((state) => state);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: goal.title,
    description: goal.description,
    targetValue: goal.targetValue,
    startDate: formatDate(goal.startDate),
    endDate: formatDate(goal.endDate),
    category: goal.category,
  });
  const [isLoadingGoal, setIsLoadingGoal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setFormData({
      title: goal.title,
      description: goal.description,
      targetValue: goal.targetValue,
      startDate: formatDate(goal.startDate),
      endDate: formatDate(goal.endDate),
      category: goal.category,
    });
  }, [goal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsLoadingGoal(true);
    try {
      const updatedGoal = await updateGoal({
        ...formData,
        targetValue: parseInt(formData.targetValue),
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        id: goal.id,
      });
      const updatedGoals = goals.map((g) => (g.id === goal.id ? updatedGoal : g));
      setGoals(updatedGoals);
      toast.success('Goal updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingGoal(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteGoal(goal.id);
      const updatedGoals = goals.filter((g) => g.id !== goal.id);
      setGoals(updatedGoals);
      toast.success('Goal deleted successfully');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <div className="spinner" />;
  }

  return (
    <>
      <Card className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{formData.title}</h2>
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={handleEdit} disabled={isEditing}>
              Edit
            </Button>
            <Button
              variant="secondary"
              onClick={handleOpenModal}
              disabled={isDeleting}
            >
              Delete
            </Button>
          </div>
        </div>
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <Input
              label="title"
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
            />
            <Input
              label="description"
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            <Input
              label="targetValue"
              type="number"
              placeholder="Target Value"
              value={formData.targetValue}
              onChange={handleChange}
            />
            <Input
              label="startDate"
              type="date"
              placeholder="Start Date"
              value={formData.startDate}
              onChange={handleChange}
            />
            <Input
              label="endDate"
              type="date"
              placeholder="End Date"
              value={formData.endDate}
              onChange={handleChange}
            />
            <div className="flex gap-2">
              <Button variant="primary" onClick={handleSave} disabled={isLoadingGoal}>
                Save
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-gray-600">{formData.description}</p>
            <p className="text-gray-600">
              Target Value: {formData.targetValue}
            </p>
            <p className="text-gray-600">
              Start Date: {formData.startDate}
            </p>
            <p className="text-gray-600">End Date: {formData.endDate}</p>
          </div>
        )}
      </Card>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Delete Goal">
        <p className="text-gray-600">
          Are you sure you want to delete this goal? This action cannot be undone.
        </p>
        <div className="flex gap-2">
          <Button variant="primary" onClick={handleDelete} disabled={isDeleting}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default GoalCard;