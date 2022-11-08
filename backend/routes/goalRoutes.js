const express = require("express");
const {
  getGoals,
  postGoals,
  updateGoal,
  deleteGoal,
} = require("../controller/goalController.js");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware.js");

router.route("/").get(protect, getGoals).post(protect, postGoals);
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
