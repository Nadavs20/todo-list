import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { TaskProps } from "../Store/index";
import { useDispatch } from "react-redux";
import { removeTask } from "../Reducers/TaskReducer";

const Task = ({ id, description, dueDate, status }: TaskProps) => {
  const dispatch = useDispatch();
  const handleDelete = (id: string) => {
    dispatch(removeTask(id));
  };

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>{dueDate}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>
        <button
          onClick={() => {
            handleDelete(id);
          }}
          className="me-2 btn btn-danger"
        >
          DELETE TASK
        </button>
      </TableCell>
    </TableRow>
  );
};

export default Task;
