const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/postRoutes');
const cors = require("cors");
require('dotenv').config();

const app = express();
const corsOptions = {
    origin: "http://localhost:3000", // Allow your frontend origin
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  };
  
app.use(cors(corsOptions));
// Connect to MongoDB
connectDB();

// Middleware to parse JSON

app.use(express.json());

// Use routes
app.use('/api', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
