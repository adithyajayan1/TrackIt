const mongoose = require('mongoose');
const transactionSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, trim: true, required: true, maxLength: 50 },
    amount: { type: Number, required: true, min: 0 },
    type: { type: String, required: true, enum: ['income', 'expense'] }, // 'income' or 'expense'
    date: { type: Date, required: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, trim: true, maxLength: 200 },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);