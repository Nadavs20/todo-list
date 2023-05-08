import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskProps } from "../Store/index";

interface TasksState {
  tasks: TaskProps[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state: TasksState, action: PayloadAction<TaskProps>) {
      state.tasks.push(action.payload);
    },
    removeTask(state: TasksState, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
