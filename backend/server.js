const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');

// custom modules
const goalRoutes = require('./routes/goalRoutes');
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
app.use('/api', goalRoutes)

// ERRORHANDLER MIDDLEWARE
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
})