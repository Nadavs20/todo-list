/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";
import TaskItem from "./TaskItem";
import useFetch from "use-http";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, Task } from "../Store";
import { setTaskList } from "../Reducers/TaskReducer";
import { useDispatch } from "react-redux";

export default function TaskTable() {
  const tasks = useSelector((state: RootState) => state.tasks);
  const { loading, error, data } = useFetch<Task[]>("/tasks", {}, []);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setTaskList(data));
    }
  }, [data]);

  if (loading) return <>Loading...</>;
  if (error || !data || !tasks) return <>Error...</>;

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          width: "100vm",
        }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TaskItem
            id={0}
            description="Description"
            dueDate="Due date"
            status="Status"
            index="Index"
            isHeader
          />
        </TableHead>
        <TableBody>
          {tasks.map((task, index) => (
            <TaskItem {...task} index={(index + 1).toString()} key={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
