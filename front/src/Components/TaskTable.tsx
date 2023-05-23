import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";
import TaskItem from "./TaskItem";
import { RootState } from "../Store";
import { useSelector } from "react-redux";

export default function TaskTable() {
  const tasks = useSelector((state: RootState) => state.tasks);

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
            id="0"
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
