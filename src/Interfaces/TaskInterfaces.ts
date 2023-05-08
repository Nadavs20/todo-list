export interface TaskProps {
  id: string;
  description: string;
  dueDate: string;
  status: string;
}

export interface TaskList {
  tasks: TaskProps[];
}