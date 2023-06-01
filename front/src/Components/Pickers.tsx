import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Task } from "../Store";
import { useDispatch } from "react-redux";
import { addTask } from "../Reducers/TaskReducer";
import { useEffect } from "react";
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
import { validateDate, validateDescription } from "../rules/validation";
import useFetch from "use-http";
import "alertifyjs/build/css/alertify.min.css";
import alertify from "alertifyjs";
import Status from "../Enums/status";

const useStyles = makeStyles({
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
  formWrapper: {
    marginTop: "12vh",
    marginBottom: "1vh",
    height: "25vh",
  },
});

const Pickers = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const { post, data, error } = useFetch<Task>("/tasks");

  useEffect(() => {
    if (error) {
      alertify.error(`Error while saving task`);
      return;
    }

    if (data) {
      dispatch(addTask(data));
      setDescription("");
      setDueDate("");
      setStatus("");
      alertify.success(`Task updated successfully`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  const saveTask = () => {
    post(`/`, { description, dueDate, status });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !validateDescription(description) ||
      !validateDate(dueDate) ||
      !status
    ) {
      alertify.error("Please validate all fields!");
      return;
    }

    saveTask();
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
                  onChange={(e) => setStatus(e.target.value as Status)}
                >
                  <MenuItem value={Status.toDo}>To Do</MenuItem>
                  <MenuItem value={Status.inProgress}>In Progress</MenuItem>
                  <MenuItem value={Status.done}>Done</MenuItem>
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
