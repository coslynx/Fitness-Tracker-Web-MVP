import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;
  const goalId = req.query.id as string;

  if (req.method === 'GET') {
    try {
      const goal = await prisma.goal.findUnique({
        where: {
          id: goalId,
          userId,
        },
      });

      if (!goal) {
        return res.status(404).json({ message: 'Goal not found' });
      }

      return res.status(200).json(goal);
    } catch (error) {
      console.error('Error fetching goal:', error);
      return res.status(500).json({ message: 'Error fetching goal' });
    }
  }

  if (req.method === 'PUT') {
    const { title, description, targetValue, startDate, endDate } = req.body;

    if (!title || !targetValue || !startDate || !endDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const goal = await prisma.goal.update({
        where: {
          id: goalId,
          userId,
        },
        data: {
          title,
          description,
          targetValue,
          startDate,
          endDate,
        },
      });

      return res.status(200).json(goal);
    } catch (error) {
      console.error('Error updating goal:', error);
      return res.status(500).json({ message: 'Error updating goal' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const goal = await prisma.goal.delete({
        where: {
          id: goalId,
          userId,
        },
      });

      return res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
      console.error('Error deleting goal:', error);
      return res.status(500).json({ message: 'Error deleting goal' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}