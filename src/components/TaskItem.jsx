const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div
      className={`relative p-6 rounded-sm shadow-md min-h-50 max-w-62.5 w-full transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl ${
        task.color || "bg-yellow-200"
      } ${task.completed ? "opacity-60" : "opacity-100"}`}
    >
      {/* Top section */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
        <span className="text-xs text-gray-600 font-mono">#{task.id}</span>
        <button
          onClick={() => onDelete(task.id)}
          className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 text-xs font-bold"
          title="Delete"
        >
          X
        </button>
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
          <p
            className={`flex-1 font-bold text-gray-800 text-base leading-relaxed ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
