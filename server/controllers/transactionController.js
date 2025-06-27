const asyncHandler = require('express-async-handler');
const Transaction = require('../models/Transaction');
const User = require('../models/User'); 


const getTransactions = asyncHandler(async (req, res) => {
    const query = { user: req.user.id };
    if (req.query.type) {
        query.type = req.query.type;
    }

    const transactions = await Transaction.find(query)
        .sort({ date: -1, createdAt: -1 }); 
    res.status(200).json(transactions);
});

const addTransaction = asyncHandler(async (req, res) => {
    const { title, amount, type, date, category, description } = req.body;
    if (!title || !amount || !type || !date || !category) {
        res.status(400);
        throw new Error('Please fill all required fields');
    }

    const transaction = await Transaction.create({
        user: req.user.id,
        title,
        amount,
        type,
        date,
        category,
        description,
    });
    res.status(201).json(transaction);
});

const deleteTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
        res.status(404);
        throw new Error('Transaction not found');
    }

    if (transaction.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await transaction.deleteOne(); // Use deleteOne()
    res.status(200).json({ id: req.params.id, message: 'Transaction removed' });
});

const getSummary = asyncHandler(async (req, res) => {
    const incomeTransactions = await Transaction.find({ user: req.user.id, type: 'income' });
    const expenseTransactions = await Transaction.find({ user: req.user.id, type: 'expense' });

    const totalIncome = incomeTransactions.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpenses = expenseTransactions.reduce((acc, curr) => acc + curr.amount, 0);
    const totalBalance = totalIncome - totalExpenses;

    res.status(200).json({ totalIncome, totalExpenses, totalBalance });
});

module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction,
    getSummary,
};