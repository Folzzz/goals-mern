const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Please add a text value']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;