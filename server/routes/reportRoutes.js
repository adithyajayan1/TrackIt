const express = require('express');
const router = express.Router();
const { exportTransactions } = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

router.get('/export/:type', protect, exportTransactions);

module.exports = router;