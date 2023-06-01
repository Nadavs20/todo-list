/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import FormatLineSpacingIcon from "@mui/icons-material/FormatLineSpacing";
import TaskItem from "./TaskItem";
import useFetch from "use-http";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, Task } from "../Store";
import { reverseList, setTaskList } from "../Reducers/TaskReducer";
import { useDispatch } from "react-redux";
import alertify from "alertifyjs";

const useStyles = makeStyles({
  headerItem: {
    height: "12vh",
    width: "80vh",
    background: "#42a5f5",
    fontSize: "10vh",
  },
});

const TaskTable = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const { loading, error, data } = useFetch<Task[]>("/tasks", {}, []);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (data) {
      dispatch(setTaskList(data));
    }
  }, [data]);

  const handleReverse = () => {
    dispatch(reverseList());
    alertify.success("You just honored the pug, thank you dear Moses!");
  };

  if (loading) return <>Loading...</>;
  if (error || !data) return <>Error...</>;

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
          <TableRow
            sx={{
              border: "solid black",
            }}
            className={classes.headerItem}
          >
            <TableCell>Index</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>
              <IconButton
                aria-label="reverse"
                onClick={handleReverse}
                sx={{
                  width: "5vh",
                  height: "5vh",
                  color: "black",
                  borderRadius: "4vh",
                }}
              >
                <FormatLineSpacingIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task, index) => (
            <TaskItem {...task} index={index} key={task.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
