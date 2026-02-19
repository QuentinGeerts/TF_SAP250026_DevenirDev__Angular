export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: number;
  createdAt: Date;
  isDeleted: boolean;
}