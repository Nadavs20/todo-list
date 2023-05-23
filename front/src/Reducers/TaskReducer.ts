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
    status: "In Progress",
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
    setTaskList(state: Task[], action: PayloadAction<Task[]>) {
      return (state = action.payload);
    },
    reverseList(state: Task[], action: PayloadAction<void>) {
      return state.slice().reverse();
    },
  },
});

export const { addTask, removeTask, setTaskList, reverseList } =
  tasksSlice.actions;
export default tasksSlice.reducer;
