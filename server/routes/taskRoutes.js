const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskSummary,
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");

// All routes are protected
router.use(protect);

router.get("/summary", getTaskSummary);
router.route("/").get(getTasks).post(createTask);
router.route("/:id").put(updateTask).delete(deleteTask);

module.exports = router;
