import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { removeTask } from "../Reducers/TaskReducer";
import { IconButton } from "@mui/material";

const Task = (props: any) => {
  const { index, id, description, dueDate, status } = props;
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(removeTask(id));
  };

  return (
    <TableRow sx={{
      border: "solid black",
      backgroundColor: ""
    }}>
      <TableCell>{index}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>{dueDate}</TableCell>
      <TableCell>{status}</TableCell>
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

export default Task;
