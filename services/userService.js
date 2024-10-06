import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;
  const id = req.query.id as string;

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ message: 'Error fetching user' });
    }
  }

  if (req.method === 'PUT') {
    const { name, password, newPassword } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    if (password && !newPassword) {
      return res.status(400).json({ message: 'New password is required' });
    }

    try {
      const updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          password: password ? newPassword : undefined,
        },
      });

      toast.success('User updated successfully');

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ message: 'Error updating user' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.user.delete({
        where: {
          id,
        },
      });

      toast.success('User deleted successfully');

      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ message: 'Error deleting user' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}