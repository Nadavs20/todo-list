import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTask } from "../Reducers/TaskReducer";
import { IconButton } from "@mui/material";
import "alertifyjs/build/css/alertify.min.css";
import alertify from "alertifyjs";

interface TaskProps {
  index: string;
  id: string;
  description: string;
  dueDate: string;
  status: string;
  isHeader: boolean;
}
const useStyles = makeStyles((theme) => ({
  taskItem: {
    height: "8vh",
  },
  statusDropdown: {
    width: "20vh",
  },
}));

// const statusToColor = (status: string) => {
//   let color: string = "";

//   if (status === "To Do") {
//     color = "#42a5f5";
//   } else if (status === "Done") {
//     color = "#64ffda";
//   } else if (status === "In Progress") {
//     color = "#7e57c2";
//   } else {
//     color = "#cddc39";
//   }

//   return color;
// };

const TaskItem = (props: TaskProps) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(props.status);
  const classes = useStyles();
  const handleDelete = () => {
    dispatch(removeTask(props.id));
    alertify.success("Task deleted successfully");
  };

  return (
    <TableRow
      sx={{
        border: "solid black",
      }}
      className={classes.taskItem}
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
            onChange={(e) => setStatus(e.target.value as string)}
          >
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </Select>
        )}
      </TableCell>
      {props.isHeader ? null : (
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
      )}
    </TableRow>
  );
};

export default TaskItem;
