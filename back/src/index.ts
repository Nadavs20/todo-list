import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import { taskRouter } from "./Routes/task-router";

// Load environment variables from .env file
dotenv.config();

// Create a new express app instance
const app = express();

// Set up middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/tasks", taskRouter);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

// Connect to the database
createConnection()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error(err);
  });
