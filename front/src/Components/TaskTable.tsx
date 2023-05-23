import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TaskItem from "./TaskItem";
import { RootState, Task } from "../Store/index";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import useFetch from "use-http";
import alertify from "alertifyjs";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  tableWrapper: {},
}));

export default function TaskTable() {
  // const tasks = useSelector((state: RootState) => state.tasks);
  const { data, error, loading } = useFetch<Task[]>("/tasks", {}, []);

  const classes = useStyles();

  useEffect(() => {
    console.log(data, error, loading);
  }, [data, error, loading]);

  if (loading) {
    return <>You are getting Rick Rolled...</>;
  }

  if (error) {
    return <>You just got Rick Rolled!!!!!11</>;
  }

  if (!data) {
    return <>You just got Stick bugged!!!!11</>;
  }

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
            isHeader
          />
        </TableHead>
        <TableBody>
          {data.map((task, index) => (
            <TaskItem {...task} index={(index + 1).toString()} key={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
