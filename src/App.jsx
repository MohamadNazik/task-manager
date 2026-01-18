import { useState, useEffect, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/taskService";
import { getRandomColor } from "./constants/stickyColors";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import FilterButtons from "./components/FilterButtons";
import SearchBar from "./components/SearchBar";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks();

      const tasksWithColors = data.map((task) => ({
        ...task,
        color: getRandomColor(),
      }));

      setTasks(tasksWithColors);
    } catch (error) {
      toast.error("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (title) => {
    try {
      const taskData = {
        title,
        completed: false,
        color: getRandomColor(),
      };

      const newTask = await createTask(taskData);
      setTasks((prevTasks) => [newTask, ...prevTasks]);
      toast.success("Task added successfully!");
    } catch (error) {
      toast.error("Failed to add task. Please try again.");
      console.error(error);
    }
  };

  const handleToggleTask = async (id) => {
    try {
      const task = tasks.find((t) => t.id === id);

      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t,
        ),
      );

      await updateTask(id, { completed: !task.completed });
      toast.success(
        task.completed ? "Task marked as active" : "Task completed!",
      );
    } catch (error) {
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t,
        ),
      );
      toast.error("Failed to update task.");
      console.error(error);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    try {
      const taskToDelete = tasks.find((t) => t.id === id);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));

      await deleteTask(id);
      toast.success("Task deleted successfully!");
    } catch (error) {
      setTasks((prevTasks) => [...prevTasks, taskToDelete]);
      toast.error("Failed to delete task.");
      console.error(error);
    }
  };

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (filter === "active") {
      filtered = filtered.filter((task) => !task.completed);
    } else if (filter === "completed") {
      filtered = filtered.filter((task) => task.completed);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return filtered;
  }, [tasks, filter, searchQuery]);

  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-50 via-orange-50 to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            Task Management Application
          </h1>
        </div>

        <TaskForm onAddTask={handleAddTask} />

        <FilterButtons currentFilter={filter} onFilterChange={setFilter} />

        <SearchBar query={searchQuery} onSearchChange={setSearchQuery} />

        <TaskList
          tasks={filteredTasks}
          loading={loading}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
