import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../Store/index";

export interface TasksState {
  tasks: Task[];
}

const initialState: Task[] = [
  {
    id: "1",
    description: "Finish React project",
    dueDate: "2023-06-01",
    status: "To Do",
  },
];

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state: Task[], action: PayloadAction<Task>) {
      state.push(action.payload);
    },
    removeTask(state: Task[], action: PayloadAction<string>) {
      return state.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
