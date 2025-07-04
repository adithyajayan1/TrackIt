require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
    origin: 'https://track-it-jet-nu.vercel.app', // No trailing slash here
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json()); 
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api/transactions', transactionRoutes);
const reportRoutes = require('./routes/reportRoutes');
app.use('/api/reports', reportRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('API is running...');
});
const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


