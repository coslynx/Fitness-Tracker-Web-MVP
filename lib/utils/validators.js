import { isEmail } from 'validator';

export const validateEmail = (email: string) => {
  if (!email) {
    return 'Email is required';
  }
  if (!isEmail(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validatePassword = (password: string) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  return null;
};

export const validateName = (name: string) => {
  if (!name) {
    return 'Name is required';
  }
  if (name.length < 3) {
    return 'Name must be at least 3 characters long';
  }
  return null;
};

export const validateGoalTitle = (title: string) => {
  if (!title) {
    return 'Goal title is required';
  }
  if (title.length < 5) {
    return 'Goal title must be at least 5 characters long';
  }
  return null;
};

export const validateGoalDescription = (description: string) => {
  if (!description) {
    return 'Goal description is required';
  }
  if (description.length < 10) {
    return 'Goal description must be at least 10 characters long';
  }
  return null;
};

export const validateTargetValue = (targetValue: string) => {
  if (!targetValue) {
    return 'Target value is required';
  }
  if (isNaN(parseInt(targetValue))) {
    return 'Target value must be a number';
  }
  return null;
};

export const validateDate = (date: string) => {
  if (!date) {
    return 'Date is required';
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return 'Please enter a valid date';
  }
  return null;
};

export const validateGoalCategory = (category: string) => {
  if (!category) {
    return 'Category is required';
  }
  if (!['weight', 'steps', 'distance'].includes(category)) {
    return 'Invalid category';
  }
  return null;
};

export const validateProgressValue = (value: string) => {
  if (!value) {
    return 'Progress value is required';
  }
  if (isNaN(parseInt(value))) {
    return 'Progress value must be a number';
  }
  return null;
};