import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatLineSpacingIcon from "@mui/icons-material/FormatLineSpacing";
import { Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTask, reverseList, updateTask } from "../Reducers/TaskReducer";
import { IconButton } from "@mui/material";
import "alertifyjs/build/css/alertify.min.css";
import alertify from "alertifyjs";

export interface TaskProps {
  index: string;
  id: string;
  description: string;
  dueDate: string;
  status: string;
  isHeader?: boolean;
}
const useStyles = makeStyles((theme) => ({
  taskItem: {
    height: "8vh",
    width: "80vh",
  },
  statusDropdown: {
    width: "20vh",
  },
  headerItem: {
    fontSize: "4vm",
    fontWeight: "bold",
    fontFamily: "Courier New",
    background: "#42a5f5",
  },
}));

const TaskItem = (props: TaskProps) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(props.status);
  const classes = useStyles();

  const handleReverse = () => {
    dispatch(reverseList());
    alertify.success("Reversed todo-list");
  };

  const handleDelete = () => {
    dispatch(removeTask(props.id));
    alertify.success("Task deleted successfully");
  };

  const handleUpdate = (newStatus: string) => {
    setStatus(newStatus);

    dispatch(
      updateTask({
        id: props.id,
        description: props.description,
        dueDate: props.dueDate,
        status: newStatus,
      })
    );

    alertify.success("Task updated successfully");
  };

  const taskItemClass = `${classes.taskItem} ${
    props.isHeader ? classes.headerItem : null
  }`;

  return (
    <TableRow
      sx={{
        border: "solid black",
      }}
      className={taskItemClass}
    >
      <TableCell>{props.index}</TableCell>
      <TableCell>{props.description}</TableCell>
      <TableCell>{props.dueDate}</TableCell>
      <TableCell>
        {props.isHeader ? (
          props.status
        ) : (
          <Select
            className={classes.statusDropdown}
            id="status"
            label="Status"
            variant="outlined"
            fullWidth
            value={status}
            onChange={(e) => handleUpdate(e.target.value as string)}
          >
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        )}
      </TableCell>
      <TableCell>
        {props.isHeader ? (
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
        ) : (
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
        )}
      </TableCell>
    </TableRow>
  );
};

export default TaskItem;
