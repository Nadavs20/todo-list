import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@material-ui/core/styles";
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
  row: {
    height: "8vh",
  },
}));

const TaskItem = (props: TaskProps) => {
  const dispatch = useDispatch();
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
      className={classes.row}
    >
      <TableCell>{props.index}</TableCell>
      <TableCell>{props.description}</TableCell>
      <TableCell>{props.dueDate}</TableCell>
      <TableCell>{props.status}</TableCell>
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
