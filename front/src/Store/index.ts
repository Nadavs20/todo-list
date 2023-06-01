import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../Reducers/TaskReducer";
import Status from "../Enums/status";

export interface Task {
  id: number;
  description: string;
  dueDate: string;
  status: Status;
}

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
