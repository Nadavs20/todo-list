import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { TaskProps } from "../Interfaces/TaskInterfaces";

const Task = ({ id, description, dueDate, status }: TaskProps) => {
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>{dueDate}</TableCell>
      <TableCell>{status}</TableCell>
    </TableRow>
  );
};

export default Task;
