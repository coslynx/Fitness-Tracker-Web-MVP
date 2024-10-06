import axios from 'axios';
import { toast } from 'react-hot-toast';

const apiClient = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      toast.error('Authentication required. Please login.');
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export const createUser = async (userData) => {
  try {
    const response = await apiClient.post('/api/auth/register', userData);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};

export const signIn = async (credentials) => {
  try {
    const response = await apiClient.post('/api/auth/login', credentials);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};

export const getGoals = async () => {
  try {
    const response = await apiClient.get('/api/goals');
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};

export const createGoal = async (newGoal) => {
  try {
    const response = await apiClient.post('/api/goals', newGoal);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};

export const getGoal = async (goalId) => {
  try {
    const response = await apiClient.get(`/api/goals/${goalId}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};

export const updateGoal = async (updatedGoal) => {
  try {
    const response = await apiClient.put(`/api/goals/${updatedGoal.id}`, updatedGoal);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};

export const deleteGoal = async (goalId) => {
  try {
    await apiClient.delete(`/api/goals/${goalId}`);
    toast.success('Goal deleted successfully.');
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};

export const getProgressData = async (goalId) => {
  try {
    const response = await apiClient.get(`/api/progress/${goalId}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};

export const getDashboardData = async () => {
  try {
    const [goalsResponse, progressResponse] = await Promise.all([
      apiClient.get('/api/goals'),
      apiClient.get('/api/progress'),
    ]);
    return { goals: goalsResponse.data, progressData: progressResponse.data };
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};

export const updateUser = async (updatedUser) => {
  try {
    const response = await apiClient.put(`/api/users/${updatedUser.id}`, updatedUser);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};

export const getUser = async (userId) => {
  try {
    const response = await apiClient.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const response = await apiClient.get('/api/community/posts');
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};