import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { removeTask } from "../Reducers/TaskReducer";
import { IconButton } from "@mui/material";

interface TaskProps {
  index: string;
  id: string;
  description: string;
  dueDate: string;
  status: string;
}

const TaskItem = (props: TaskProps) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(removeTask(props.id));
  };

  return (
    <TableRow
      sx={{
        border: "solid black",
      }}
    >
      <TableCell>{props.index}</TableCell>
      <TableCell>{props.description}</TableCell>
      <TableCell>{props.dueDate}</TableCell>
      <TableCell>{props.status}</TableCell>
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
