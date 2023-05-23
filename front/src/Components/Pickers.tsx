import { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  Box,
  FormControl,
} from "@material-ui/core";
import { addTask } from "../Reducers/TaskReducer";
import { Task } from "../Store/index";
import { validateDate, validateDescription } from "../rules/validation";
import "alertifyjs/build/css/alertify.min.css";
import alertify from "alertifyjs";

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
  addWrapper: {
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  allertValidations: {
    width: "80vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formWrapper: {
    marginTop: "18vh",
    marginBottom: "1vh",
    height: "25vh",
  },
}));

const Pickers = () => {
  const classes = useStyles();
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateDescription(description) || !validateDate(dueDate)) {
      alertify.error("Please validate all fields!");
      return;
    }

    const id = Math.floor(Math.random() * 1000).toString();
    const newTask: Task = { id, description, dueDate, status };
    dispatch(addTask(newTask));
    alertify.success("Task added successfully!");
    setDescription("");
    setDueDate("");
    setStatus("");
  };

  return (
    <div className={classes.formWrapper}>
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
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  labelId="status"
                  id="demo-simple-select"
                  value={status}
                  variant="outlined"
                  onChange={(e) => setStatus(e.target.value as string)}
                >
                  <MenuItem value="To Do">To Do</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid className={classes.addWrapper}>
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
