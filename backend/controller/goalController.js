const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel.js");
const User = require("../models/userModel.js");

//@Desc   Get Goals
//@Route  Get /api/goals
//@access Private

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});
//@Desc   Create Goal
//@Route  Post /api/goals
//@access Private
const postGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id, // ne için burada ?
  });
  res.status(201).json(goal);
});

//@Desc   Update Goal
//@Route  Put /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  // make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

//@Desc   Delete Goal
//@Route  Delete /api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  // make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }
  await goal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  postGoals,
  updateGoal,
  deleteGoal,
};
