const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');

// custom modules
const goalRoutes = require('./routes/goalRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;
const app = express();

// CONNECT DB
connectDB();

// MIDDLEWARE

// FORM DATA AND JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.use('/api', goalRoutes);
app.use('/api/users', userRoutes);

// DEPLOYMENT PHASE - SERVE FRONTEND
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')));
}
else {
    app.get('/', (req, res) => res.send('Please set to production'));
}

// ERRORHANDLER MIDDLEWARE
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
})