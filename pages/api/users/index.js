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
      const users = await prisma.user.findMany({
        where: {
          id: userId,
        },
      });

      return res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Error fetching users' });
    }
  }

  if (req.method === 'POST') {
    // Not implemented in the MVP
    return res.status(405).json({ message: 'Method not allowed' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}