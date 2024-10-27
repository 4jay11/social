const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/postRoutes');

const path = require('path');

require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON

app.use(express.json());

// Use routes
app.use('/api', userRoutes);
//Join build folder from frontend 
app.use(express.static(path.join(__dirname, '../frontend/build')));
//Parse all requests to the build folder/index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
