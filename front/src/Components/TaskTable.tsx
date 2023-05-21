import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TaskItem from "./TaskItem";
import { RootState } from "../Store/index";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tableWrapper: {},
}));

export default function TaskTable() {
  const tasks = useSelector((state: RootState) => state.tasks);
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableWrapper}>
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
            isHeader={true}
          />
        </TableHead>
        <TableBody>
          {tasks.map((task, index) => (
            <TaskItem
              {...task}
              index={(index + 1).toString()}
              isHeader={false}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
