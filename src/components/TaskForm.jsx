import { useState } from "react";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim()) {
      onAddTask(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-3 rounded-lg bg-blue-50 border-2 border-blue-200 focus:outline-none focus:border-blue-400 text-gray-800 placeholder-gray-500 shadow-md"
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className="px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          + Add Note
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
