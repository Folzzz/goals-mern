const asyncHandler = require('express-async-handler');

// @desc GET ALL GOALS
const getGoals = asyncHandler(async (req, res) => {
    res.json({ message: 'get goals'});
})

// @desc CREATE NEW GOALS
const createGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field');
    }

    res.json({ message: 'create new goals'});
})

// @desc EDIT/UPDATE A GOAL
const updateGoal = asyncHandler(async (req, res) => {
    res.json({ message: 'update goals'});
})

// @desc DELETE A GOAL
const deleteGoal = asyncHandler(async (req, res) => {
    res.json({ message: 'del goals'});
});

module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal
}