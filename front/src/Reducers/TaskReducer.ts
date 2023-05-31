import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../Store/index";

export interface TasksState {
  tasks: Task[];
}

const initialState: Task[] = [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.push(action.payload);
    },
    removeTask(state, action: PayloadAction<number>) {
      return state.filter((task) => task.id !== action.payload);
    },
    setTaskList(state, action: PayloadAction<Task[]>) {
      return (state = action.payload);
    },
    reverseList(state) {
      return state.slice().reverse();
    },
    updateTask(state, action: PayloadAction<Task>) {
      return (state = [...state].map((task) =>
        task.id === action.payload.id ? action.payload : task
      ));
    },
  },
});

export const { addTask, removeTask, setTaskList, reverseList, updateTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
