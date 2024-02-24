import { Timestamp } from "firebase/firestore";

export interface Todo {
  id: string;
  createdAt: string;
  title: string;
  completed: boolean;
  category?: string;
  dueDate?: Timestamp;
}
