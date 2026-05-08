import { deleteTask, updateTask } from "../services/api";
import toast from "react-hot-toast";

const priorityColors = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  low: "bg-green-100 text-green-700 border-green-200",
};

const statusColors = {
  pending: "bg-gray-100 text-gray-700",
  "in-progress": "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
};

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm("Delete this task?")) {
      try {
        await deleteTask(task._id);
        toast.success("Task deleted!");
        onDelete(task._id);
      } catch {
        toast.error("Failed to delete task");
      }
    }
  };

  const handleComplete = async () => {
    try {
      const newStatus = task.status === "completed" ? "pending" : "completed";
      const { data } = await updateTask(task._id, { status: newStatus });
      toast.success(
        newStatus === "completed" ? "✅ Task completed!" : "Task reopened",
      );
      onUpdate(data);
    } catch {
      toast.error("Failed to update task");
    }
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border p-5 transition hover:shadow-md ${task.status === "completed" ? "opacity-70" : ""}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3
          className={`font-semibold text-gray-900 dark:text-white text-lg ${task.status === "completed" ? "line-through text-gray-400" : ""}`}
        >
          {task.title}
        </h3>
        <span
          className={`text-xs px-2 py-1 rounded-full border font-medium ${priorityColors[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[task.status]}`}
          >
            {task.status}
          </span>
          {task.dueDate && (
            <span className="text-xs text-gray-400">
              📅 {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleComplete}
            className={`text-sm px-3 py-1 rounded-lg font-medium transition ${
              task.status === "completed"
                ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {task.status === "completed" ? "↩ Reopen" : "✓ Done"}
          </button>
          <button
            onClick={() => onUpdate(task, true)}
            className="text-sm px-3 py-1 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium transition"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-sm px-3 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 font-medium transition"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
