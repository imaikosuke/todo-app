export interface Todo {
  id: string;
  createdAt: string;
  title: string;
  completed: boolean;
  category?: string;
  dueDate?: string;
}
