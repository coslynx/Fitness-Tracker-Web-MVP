export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
  goals?: Goal[];
  progress?: Progress[];
}