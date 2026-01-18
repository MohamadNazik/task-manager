import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com/todos";

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch all tasks (limited to 10)
export const fetchTasks = async () => {
  try {
    const response = await api.get("/", {
      params: { _limit: 10 },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch tasks");
  }
};

// Create a new task
export const createTask = async (taskData) => {
  try {
    const response = await api.post("/", {
      title: taskData.title,
      completed: taskData.completed || false,
      userId: 1,
    });

    return {
      ...response.data,
      id: Date.now(),
      color: taskData.color,
    };
  } catch (error) {
    console.error("Error creating task:", error.message);
    throw new Error(error.response?.data?.message || "Failed to create task");
  }
};

// Update a task (toggle completion or edit title)
export const updateTask = async (id, taskData) => {
  try {
    const response = await api.patch(`/${id}`, taskData);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error.message);
    throw new Error(error.response?.data?.message || "Failed to update task");
  }
};

// Delete a task
export const deleteTask = async (id) => {
  try {
    await api.delete(`/${id}`);
    return { success: true, id };
  } catch (error) {
    console.error("Error deleting task:", error.message);
    throw new Error(error.response?.data?.message || "Failed to delete task");
  }
};
