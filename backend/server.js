const express = require('express');
const dotenv = require('dotenv').config();

// custom modules
const goalRoutes = require('./routes/goalRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const PORT = process.env.PORT || 5000;
const app = express();

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