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
      const progress = await prisma.progress.findMany({
        where: {
          goalId,
          userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return res.status(200).json(progress);
    } catch (error) {
      console.error('Error fetching progress:', error);
      return res.status(500).json({ message: 'Error fetching progress' });
    }
  }

  if (req.method === 'POST') {
    const { date, value } = req.body;

    if (!date || !value) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      const progress = await prisma.progress.create({
        data: {
          userId,
          goalId,
          date,
          value,
        },
      });

      return res.status(201).json(progress);
    } catch (error) {
      console.error('Error creating progress:', error);
      return res.status(500).json({ message: 'Error creating progress' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}