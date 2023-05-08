import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import Task from "./Task";
import { RootState } from "../Store/index";
import { useSelector } from 'react-redux'

export default function TaskTable() {
  const tasks = useSelector((state: RootState) => state.tasks);
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <Task
            id="ID"
            description="Description"
            dueDate="Due date"
            status="Status"
          />
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              description={task.description}
              dueDate={task.dueDate}
              status={task.status}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
