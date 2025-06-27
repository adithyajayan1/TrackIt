const express = require('express');
const router = express.Router();
const {
    getTransactions,
    addTransaction,
    deleteTransaction,
    getSummary,
} = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getTransactions) 
    .post(protect, addTransaction);

router.get('/summary', protect, getSummary); 
router.delete('/:id', protect, deleteTransaction); 

module.exports = router;