import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import FormatLineSpacingIcon from "@mui/icons-material/FormatLineSpacing";
import { Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { IconButton } from "@mui/material";
import "alertifyjs/build/css/alertify.min.css";
import alertify from "alertifyjs";
import useFetch from "use-http";

export interface TaskProps {
  index: string;
  id: number;
  description: string;
  dueDate: string;
  status: string;
  isHeader?: boolean;
}
const useStyles = makeStyles((theme) => ({
  taskItem: {
    height: "12vh",
    width: "80vh",
  },
  statusDropdown: {
    width: "20vh",
  },
  headerItem: {
    background: "#42a5f5",
    fontSize: "10vh",
  },
}));

const TaskItem = (props: TaskProps) => {
  const classes = useStyles();
  const [status, setStatus] = useState(props.status);
  const { del, put, error } = useFetch(`/tasks`);

  const deleteTask = async () => {
    await del(`/${props.id}`);
    error
      ? alertify.error(`Error deleting task ${props.id}`)
      : alertify.success(`Task deleted successfully`);
  };

  const updateTask = async (newStatus: string) => {
    await put(`/${props.id}`, {
      id: props.id,
      description: props.description,
      dueDate: props.dueDate,
      status: newStatus,
    });

    error
      ? alertify.error(`Error while updating task: ${error.message}`)
      : alertify.success("Task updated successfully!");
  };

  const handleDelete = async () => {
    await deleteTask();
  };

  const handleUpdate = (newStatus: string) => {
    setStatus(newStatus);
    updateTask(newStatus);
  };

  const handleReverse = () => {
    window.open("https://puginarug.com/");
    alert("You just honored the pug, thank you dear Moses!");
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
