const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @desc GET ALL GOALS
const getGoals = asyncHandler(async (req, res) => {
    // access the user field in the goal model
    const goals = await Goal.find({ user: req.user.id }).sort({ createdAt: -1 }).lean();

    res.json(goals);
})

// @desc CREATE NEW GOALS
const createGoal = asyncHandler(async (req, res) => {
    // throw error if no text
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field');
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    });

    res.json(goal);
})

// @desc EDIT/UPDATE A GOAL
const updateGoal = asyncHandler(async (req, res) => {
    let goal = await Goal.findById(req.params.id).lean();

    if (!goal) {
        res.status(400);
        throw new Error(`Goal with id ${req.params.id} does not exist`);
    }

    // const user = await User.findById(req.user.id);

    // check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    goal = await Goal.findByIdAndUpdate(req.params.id, req.body, { 
        new: true,
        runValidators: true }
    );

    res.json({ message: `${req.params.id} updated`, goal });
})

// @desc DELETE A GOAL
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error(`Goal with id ${req.params.id} does not exist`);
    }

    // const user = await User.findById(req.user.id);

    // check for user
    if (!req.user) {
        res.status(401);
        throw new Error('user not found')
    }

    // make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }
    
    await goal.remove();
    
    res.json({ id: req.params.id });
});

module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal
}