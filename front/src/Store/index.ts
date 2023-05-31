import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../Reducers/TaskReducer";

export interface Task {
  id: number;
  description: string;
  dueDate: string;
  status: string;
}

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
