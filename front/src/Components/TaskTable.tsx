/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";
import TaskItem from "./TaskItem";
import { Task } from "../Store";
import useFetch from "use-http";
import { useEffect, useState } from "react";

export default function TaskTable() {
  const [data, setData] = useState<Task[]>();
  const { get, loading, error } = useFetch("/tasks", []);
  const fetchData = async () => {
    const res = await get();
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, [get]);

  if (loading || !data) return <>Loading...</>;
  if (error) return <>Error...</>;

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          width: "100vm",
        }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TaskItem
            id="0"
            description="Description"
            dueDate="Due date"
            status="Status"
            index="Index"
            isHeader
          />
        </TableHead>
        <TableBody>
          {data!.map((task, index) => (
            <TaskItem {...task} index={(index + 1).toString()} key={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
