const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/smart_shop";
mongoose.connect(MONGO_URI)
    .then(() => console.log(" MongoDB connected successfully!"))
    .catch(err => console.error(" DB connection error:", err));

// Test Route
app.get('/api/status', (req, res) => {
    res.json({ message: "Backend is running fine!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server on port ${PORT}`));

app.use('/api', require('./routes/apiRoutes'));
