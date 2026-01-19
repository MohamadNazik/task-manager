import { useState } from "react";

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onEdit(task.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  return (
    <div
      className={`relative p-6 rounded-sm shadow-md min-h-50 max-w-62.5 w-full transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl ${
        task.color || "bg-yellow-200"
      } ${task.completed ? "opacity-60" : "opacity-100"}`}
    >
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
        <span className="text-xs text-gray-600 font-mono">#{task.id}</span>
        <div className="flex gap-1">
          {/* Edit button */}
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 text-xs font-bold"
              title="Edit"
            >
              &#x270E;
            </button>
          )}
          {/* Delete button */}
          <button
            onClick={() => onDelete(task.id)}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 text-xs font-bold"
            title="Delete"
          >
            X
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mt-10">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="mt-1.5 w-5 h-5 cursor-pointer accent-green-600 shrink-0"
          />
          {isEditing ? (
            <div className="flex-1">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-2 py-1 border-2 border-blue-500 rounded text-gray-800 text-base focus:outline-none"
                autoFocus
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 bg-gray-400 text-white rounded text-xs hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p
              className={`flex-1 font-bold text-gray-800 text-base leading-relaxed ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.title}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
