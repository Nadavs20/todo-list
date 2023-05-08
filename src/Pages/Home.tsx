import TaskTable from "../Components/TaskTable";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, removeTask } from "../Reducers/TaskReducer";
import { RootState, TaskProps } from '../Store/index';

const Home = () => {
    return (
        <div>
            <TaskTable />
        </div>
    )
}

export default Home;