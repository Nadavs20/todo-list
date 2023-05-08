import { TaskProps } from '../Interfaces/TaskInterfaces';

interface AddTaskAction {
  type: 'ADD_TASK';
  payload: TaskProps;
}

interface RemoveTaskAction {
  type: 'REMOVE_TASK';
  payload: string; // ID of the task to remove
}

type TasksActionTypes = AddTaskAction | RemoveTaskAction;

const initialState: TaskProps[] = [];

const tasksReducer = (state = initialState, action: TasksActionTypes): TaskProps[] => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'REMOVE_TASK':
      return state.filter(task => task.id !== action.payload);
    default:
      return state;
  }
};

export default tasksReducer;
