const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { getSession } = require('next-auth/react');

const prisma = new PrismaClient();
const router = express.Router();

// Get all goals for the current user
router.get('/', async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;

  try {
    const goals = await prisma.goal.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json(goals);
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.status(500).json({ message: 'Error fetching goals' });
  }
});

// Create a new goal for the current user
router.post('/', async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;
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
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    res.status(201).json(goal);
  } catch (error) {
    console.error('Error creating goal:', error);
    res.status(500).json({ message: 'Error creating goal' });
  }
});

// Get a single goal by ID
router.get('/:id', async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;
  const goalId = parseInt(req.params.id);

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

    res.status(200).json(goal);
  } catch (error) {
    console.error('Error fetching goal:', error);
    res.status(500).json({ message: 'Error fetching goal' });
  }
});

// Update a single goal by ID
router.put('/:id', async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;
  const goalId = parseInt(req.params.id);
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
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    res.status(200).json(goal);
  } catch (error) {
    console.error('Error updating goal:', error);
    res.status(500).json({ message: 'Error updating goal' });
  }
});

// Delete a single goal by ID
router.delete('/:id', async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;
  const goalId = parseInt(req.params.id);

  try {
    await prisma.goal.delete({
      where: {
        id: goalId,
        userId,
      },
    });

    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error('Error deleting goal:', error);
    res.status(500).json({ message: 'Error deleting goal' });
  }
});

module.exports = router;