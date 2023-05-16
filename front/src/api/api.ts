import axios, { AxiosInstance } from 'axios';

const API_URL = 'http://localhost:3000';

export const tasksApi: AxiosInstance = axios.create({
  baseURL: `${API_URL}/tasks`,
});

