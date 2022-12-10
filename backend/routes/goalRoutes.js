const express = require('express');

const router = express.Router();
// custom
const { protect } = require('../middleware/authMiddleware');
const { getGoals, createGoal, updateGoal, deleteGoal } = require('../controller/goalController');

// one-liner
// router.route('/goals').get(getGoals).post(createGoal);
// router.route('/goals/:id').put(updateGoal).delete(deleteGoal);

// @route GET /api/goals
// @access PRIVATE
router.get('/goals', protect, getGoals);

// @route POST /api/goals
// @access PRIVATE
router.post('/goals', protect, createGoal);

// @route PUT /api/goals/id
// @access PRIVATE
router.put('/goals/:id', protect, updateGoal);

// @route DELETE /api/goals/id
// @access PRIVATE
router.delete('/goals/:id', protect, deleteGoal);

module.exports = router;