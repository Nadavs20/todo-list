import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@mui/material";
import "alertifyjs/build/css/alertify.min.css";
import alertify from "alertifyjs";
import useFetch from "use-http";
import { useDispatch } from "react-redux";
import { removeTask, updateTask } from "../Reducers/TaskReducer";

export interface TaskProps {
  index: number;
  id: number;
  description: string;
  dueDate: string;
  status: string;
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
  const { del, put, error, response } = useFetch(`/tasks`);

  const handleDelete = async () => {
    await del(`/${props.id}`);

    if (response.status !== 200 || error) {
      alertify.error(`Error while deleting task ${props.id}`);
    } else {
      dispatch(removeTask(props.id));
      alertify.success(`Task deleted successfully`);
    }
  };

  const handleUpdate = async (newStatus: string) => {
    const updatedTask = {
      id: props.id,
      description: props.description,
      dueDate: props.dueDate,
      status: newStatus,
    };
    await put(`/${props.id}`, updatedTask);

    if (response.status !== 200 || error) {
      alertify.error(`Error while updating task ${props.id}`);
    } else {
      dispatch(updateTask(updatedTask));
      alertify.success(`Task updated successfully`);
    }
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
          onChange={(e) => handleUpdate(e.target.value as string)}
        >
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
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
