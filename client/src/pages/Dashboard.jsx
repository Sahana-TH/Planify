import { useState, useEffect } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  getTaskSummary,
} from "../services/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import toast from "react-hot-toast";

const initialForm = {
  title: "",
  description: "",
  priority: "medium",
  status: "pending",
  dueDate: "",
  category: "General",
};

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (filterStatus) params.status = filterStatus;
      if (filterPriority) params.priority = filterPriority;
      const { data } = await getTasks(params);
      setTasks(data);
    } catch {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  // Fetch summary
  const fetchSummary = async () => {
    try {
      const { data } = await getTaskSummary();
      setSummary(data);
    } catch {}
  };

  useEffect(() => {
    fetchTasks();
    fetchSummary();
  }, [search, filterStatus, filterPriority]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        const { data } = await updateTask(editingTask._id, form);
        setTasks(tasks.map((t) => (t._id === data._id ? data : t)));
        toast.success("Task updated!");
      } else {
        const { data } = await createTask(form);
        setTasks([data, ...tasks]);
        toast.success("Task created!");
      }
      setForm(initialForm);
      setShowForm(false);
      setEditingTask(null);
      fetchSummary();
    } catch {
      toast.error("Failed to save task");
    }
  };

  // Handle edit
  const handleUpdate = (task, isEdit) => {
    if (isEdit) {
      setEditingTask(task);
      setForm({
        title: task.title,
        description: task.description || "",
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
        category: task.category || "General",
      });
      setShowForm(true);
    } else {
      setTasks(tasks.map((t) => (t._id === task._id ? task : t)));
      fetchSummary();
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    setTasks(tasks.filter((t) => t._id !== id));
    fetchSummary();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Good day, {user?.name}! 🌟
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Here's your task overview
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Tasks",
              value: summary.total || 0,
              color: "bg-blue-500",
              emoji: "📋",
            },
            {
              label: "Completed",
              value: summary.completed || 0,
              color: "bg-green-500",
              emoji: "✅",
            },
            {
              label: "In Progress",
              value: summary.inProgress || 0,
              color: "bg-yellow-500",
              emoji: "⏳",
            },
            {
              label: "High Priority",
              value: summary.high || 0,
              color: "bg-red-500",
              emoji: "🔥",
            },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {card.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {card.value}
                  </p>
                </div>
                <span className="text-3xl">{card.emoji}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Search + Filter + Add Button */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-48 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
          >
            <option value="">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingTask(null);
              setForm(initialForm);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition"
          >
            + Add Task
          </button>
        </div>

        {/* Add/Edit Task Form */}
        {showForm && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {editingTask ? "✏️ Edit Task" : "➕ New Task"}
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                placeholder="Task title *"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Category (e.g. Work, Personal)"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Description (optional)"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
                rows={2}
              />
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
              >
                <option value="low">🟢 Low Priority</option>
                <option value="medium">🟡 Medium Priority</option>
                <option value="high">🔴 High Priority</option>
              </select>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
              />
              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
                >
                  {editingTask ? "Update Task" : "Create Task"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingTask(null);
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Task List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">📭</p>
            <p className="text-gray-500 text-xl">
              No tasks yet. Add your first task!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
