import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;

  if (req.method === 'GET') {
    try {
      const goals = await prisma.goal.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return res.status(200).json(goals);
    } catch (error) {
      console.error('Error fetching goals:', error);
      return res.status(500).json({ message: 'Error fetching goals' });
    }
  }

  if (req.method === 'POST') {
    const { title, description, targetValue, startDate, endDate } = req.body;

    if (!title || !targetValue || !startDate || !endDate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const goal = await prisma.goal.create({
        data: {
          userId,
          title,
          description,
          targetValue,
          startDate,
          endDate,
        },
      });

      return res.status(201).json(goal);
    } catch (error) {
      console.error('Error creating goal:', error);
      return res.status(500).json({ message: 'Error creating goal' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}