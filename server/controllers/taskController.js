const asyncHandler = require("express-async-handler");
const Task = require("../models/Task");

// @desc    Get all tasks for logged in user
// @route   GET /api/tasks
const getTasks = asyncHandler(async (req, res) => {
  const { status, priority, search } = req.query;

  let filter = { user: req.user._id };

  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  res.json(tasks);
});

// @desc    Create a task
// @route   POST /api/tasks
const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, status, dueDate, category } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Task title is required");
  }

  const task = await Task.create({
    user: req.user._id,
    title,
    description,
    priority,
    status,
    dueDate,
    category,
  });

  res.status(201).json(task);
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Make sure logged in user owns the task
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this task");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updatedTask);
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Make sure logged in user owns the task
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to delete this task");
  }

  await task.deleteOne();
  res.json({ message: "Task removed successfully" });
});

// @desc    Get task summary/stats
// @route   GET /api/tasks/summary
const getTaskSummary = asyncHandler(async (req, res) => {
  const total = await Task.countDocuments({ user: req.user._id });
  const completed = await Task.countDocuments({
    user: req.user._id,
    status: "completed",
  });
  const pending = await Task.countDocuments({
    user: req.user._id,
    status: "pending",
  });
  const inProgress = await Task.countDocuments({
    user: req.user._id,
    status: "in-progress",
  });
  const high = await Task.countDocuments({
    user: req.user._id,
    priority: "high",
  });

  res.json({ total, completed, pending, inProgress, high });
});

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskSummary,
};
