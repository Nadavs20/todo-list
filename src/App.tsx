import React from "react";
import { useState } from "react";
// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import Status from "./components/Status";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [statusArray, setStatusArray] = useState<string[]>([]);

  return (
    <Box className="App">
      <Grid>

      </Grid>
      <Grid className="App-intro">
        <Grid>
          <label>
            Enter task:
            <input
              type="text"
              placeholder="task name"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </label>
          <button
            type="submit"
            onClick={() => {
              setTodoList((prevTodoList) => [...prevTodoList, input]);
              setInput("");
            }}
          >
            Add task
          </button>
        </Grid>
      </Grid>
      <Grid className="task-list">
        <ul>
          {todoList.map((task, index) => {
            return (
              <li key={index} className="task">
                {task}
              </li>
            );
          })}
        </ul>
      </Grid>
    </Box>
  );
}

export default App;
