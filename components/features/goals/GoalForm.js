import { useState } from 'react';
import { useUser } from '@/lib/hooks/useUser';
import { useStore } from '@/lib/store';
import { toast } from 'react-hot-toast';
import { createGoal } from '@/lib/api/client';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';

interface GoalFormProps {
  onCreate: (goal: Goal) => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ onCreate }) => {
  const { user, isLoading } = useUser();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetValue: '',
    startDate: '',
    endDate: '',
    category: 'weight',
  });

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingSubmit(true);

    try {
      const newGoal = {
        ...formData,
        targetValue: parseInt(formData.targetValue),
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      };

      if (!user) {
        toast.error('You need to be logged in to create a goal');
        return;
      }

      const createdGoal = await createGoal(newGoal);
      onCreate(createdGoal);
      toast.success('Goal created successfully');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md rounded px-8 pt-6 pb-8 mb-4 bg-white shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title
        </label>
        <Input
          type="text"
          name="title"
          placeholder="Lose 10 pounds"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <Input
          type="text"
          name="description"
          placeholder="Weight loss goal"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="targetValue">
          Target Value
        </label>
        <Input
          type="number"
          name="targetValue"
          placeholder="10"
          value={formData.targetValue}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
          Start Date
        </label>
        <Input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
          End Date
        </label>
        <Input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
          Category
        </label>
        <Select
          label="category"
          options={[
            { value: 'weight', label: 'Weight' },
            { value: 'steps', label: 'Steps' },
            { value: 'distance', label: 'Distance' },
          ]}
          defaultValue={formData.category}
          onChange={handleChange}
        />
      </div>
      <div className="flex items-center justify-between">
        <Button type="submit" disabled={isLoadingSubmit}>
          {isLoadingSubmit ? <div className="spinner" /> : 'Create Goal'}
        </Button>
      </div>
    </form>
  );
};

export default GoalForm;