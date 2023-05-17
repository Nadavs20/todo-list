import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TaskItem from "./Task";
import { RootState } from "../Store/index";
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
          />
        </TableHead>
        <TableBody>
          {tasks.map((task, index) => (
            <TaskItem {...task} index={(index + 1).toString()} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
