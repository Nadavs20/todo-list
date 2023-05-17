import { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Grid, Select, MenuItem } from "@material-ui/core";
import { Alert, AlertTitle, Color } from "@material-ui/lab";
import { addTask } from "../Reducers/TaskReducer";
import { Task } from "../Store/index";
import { validateDate, validateDescription } from "../rules/validation";

const useStyles = makeStyles((theme) => ({
  submit: {
    borderRadius: "4vh",
    padding: "1vh",
    margin: "1vh",
    width: "30%",
    color: "#61CEF2",
    fontFamily: "Courier New",
    fontSize: "3vh",
    backgroundColor: "#000000",
    marginBottom: "8vh",
    marginTop: "2vh",
  },
  formWrapper: {
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Pickers = () => {
  const classes = useStyles();
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("todo");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !validateDescription(description) ||
      !status ||
      !validateDate(dueDate)
    ) {
      setAlert({ type: "error", message: "Please validate all fields" });
      return;
    }

    const id = Math.floor(Math.random() * 1000).toString();
    const newTask: Task = { id, description, dueDate, status };
    dispatch(addTask(newTask));
    setAlert({ type: "success", message: "Task added successfully" });
    setDescription("");
    setDueDate("");
    setStatus("todo");
  };

  return (
    <div>
      {alert.message && (
        <Alert severity={alert.type as Color}>
          <AlertTitle>
            {alert.type === "success" ? "Success" : "Error"}
          </AlertTitle>
          {alert.message}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              id="due-date"
              label="Due Date"
              variant="outlined"
              fullWidth
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Select
              id="status"
              label="Status"
              variant="outlined"
              fullWidth
              value={status}
              onChange={(e) => setStatus(e.target.value as string)}
            >
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </Grid>
          <Grid className={classes.formWrapper}>
            <Button
              variant="contained"
              type="submit"
              className={classes.submit}
            >
              Add Task
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Pickers;