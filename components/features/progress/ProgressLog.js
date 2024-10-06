import { useStore } from '@/lib/store';
import { formatDate } from '@/lib/utils/formatters';
import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface ProgressLogProps {
  progressData: Progress[];
}

const ProgressLog: React.FC<ProgressLogProps> = ({ progressData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { progressData: currentProgressData, setProgressData } = useStore((state) => state);

  const handleDeleteProgressEntry = async (id: number) => {
    try {
      const updatedProgress = currentProgressData.filter(
        (progressEntry) => progressEntry.id !== id
      );
      setProgressData(updatedProgress);
    } catch (error) {
      console.error('Error deleting progress entry:', error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card title="Progress Log" className="flex flex-col gap-4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Value
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {progressData.map((progressEntry) => (
              <tr
                key={progressEntry.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td className="px-6 py-4">{formatDate(progressEntry.date)}</td>
                <td className="px-6 py-4">{progressEntry.value}</td>
                <td className="px-6 py-4">
                  <Button variant="secondary" onClick={() => handleDeleteProgressEntry(progressEntry.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Delete Progress Entry">
        <p className="text-gray-600">
          Are you sure you want to delete this progress entry? This action cannot be undone.
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

export default ProgressLog;