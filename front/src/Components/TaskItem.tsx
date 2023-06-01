/* eslint-disable react-hooks/exhaustive-deps */
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { Select, MenuItem } from "@material-ui/core";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@mui/material";
import "alertifyjs/build/css/alertify.min.css";
import alertify from "alertifyjs";
import useFetch from "use-http";
import { useDispatch } from "react-redux";
import { removeTask, updateTask } from "../Reducers/TaskReducer";
import Status from "../Enums/status";
import { Task } from "../Store";

export interface TaskProps {
  index: number;
  id: number;
  description: string;
  dueDate: string;
  status: Status;
}
const useStyles = makeStyles({
  taskItem: {
    height: "12vh",
    width: "80vh",
  },
  statusDropdown: {
    width: "20vh",
  },
});

const TaskItem = (props: TaskProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { put, data: putData, error: putError } = useFetch<Task>(`/tasks`);
  const { del, data: delData, error: delError } = useFetch(`/tasks`);

  // INFO: called after task has been updated and data or error returned
  useEffect(() => {
    if (putError) {
      alertify.error(`Error while updating task ${props.id}`);
      return;
    }

    if (putData) {
      dispatch(updateTask(putData));
      alertify.success(`Task updated successfully`);
    }
  }, [putData, putError]);

  // INFO: called after task has been deleted and data or error returned
  useEffect(() => {
    if (delError) {
      alertify.error(`Error while deleting task ${props.id}`);
      return;
    }

    if (delData) {
      dispatch(removeTask(props.id));
      alertify.success(`Task deleted successfully`);
    }
  }, [delData, delError]);

  const handleDelete = () => {
    del(`/${props.id}`);
  };

  const handleUpdate = (newStatus: Status) => {
    const updatedTask = {
      id: props.id,
      description: props.description,
      dueDate: props.dueDate,
      status: newStatus,
    };

    put(`/${props.id}`, updatedTask);
  };

  return (
    <TableRow
      sx={{
        border: "solid black",
      }}
      className={classes.taskItem}
    >
      <TableCell>{props.index + 1}</TableCell>
      <TableCell>{props.description}</TableCell>
      <TableCell>{props.dueDate}</TableCell>
      <TableCell>
        <Select
          className={classes.statusDropdown}
          id="status"
          label="Status"
          variant="outlined"
          fullWidth
          value={props.status}
          onChange={(e) => handleUpdate(e.target.value as Status)}
        >
          <MenuItem value={Status.toDo}>To Do</MenuItem>
          <MenuItem value={Status.inProgress}>In Progress</MenuItem>
          <MenuItem value={Status.Done}>Done</MenuItem>
        </Select>
      </TableCell>
      <TableCell>
        <IconButton
          aria-label="delete"
          onClick={handleDelete}
          sx={{
            width: "5vh",
            height: "5vh",
            color: "red",
            borderRadius: "4vh",
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TaskItem;
