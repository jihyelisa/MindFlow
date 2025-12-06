const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import routes
const userRoutes = require('./routes/userRoutes');
const sajuRoutes = require('./routes/sajuRoutes');
const errorHandler = require('./middleware/errorHandler');

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
    res.json({ 
        success: true,
        message: 'MindFlow Backend API is running',
        version: '1.0.0'
    });
});

app.use('/api/users', userRoutes);
app.use('/api/saju', sajuRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
