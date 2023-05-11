import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskProps } from "../Store/index";


export interface TasksState {
  tasks: TaskProps[];
}

const initialState: TaskProps[] = [
  {
    id: "1",
    description: "Finish React project",
    dueDate: "2023-06-01",
    status: "Incomplete",
  },
];

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state: TaskProps[], action: PayloadAction<TaskProps>) {
      state.push(action.payload);
    },
    removeTask(state: TaskProps[], action: PayloadAction<string>) {
      return state.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
