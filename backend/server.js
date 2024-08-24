const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/postRoutes');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Use routes
app.use('/api', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));