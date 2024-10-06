import { useStore } from '@/lib/store';
import { useState, useEffect } from 'react';
import { formatDate } from '@/lib/utils/formatters';
import Card from '@/components/ui/Card';
import Chart from 'chart.js/auto';
import { LineController, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import { useMemo, useRef } from 'react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale);

interface ProgressChartProps {
  progressData: Progress[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ progressData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { progressData: currentProgressData, setProgressData } = useStore((state) => state);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

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

  useEffect(() => {
    if (chartRef.current && chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current && progressData.length > 0) {
      chartInstance.current = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: progressData.map((entry) => formatDate(entry.date)),
          datasets: [
            {
              label: 'Progress',
              data: progressData.map((entry) => entry.value),
              borderColor: 'blue',
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [progressData]);

  return (
    <>
      <Card title="Progress Chart" className="flex flex-col gap-4">
        <canvas ref={chartRef} />
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

export default ProgressChart;