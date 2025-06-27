const asyncHandler = require('express-async-handler');
const Transaction = require('../models/Transaction');
const ExcelJS = require('exceljs');


const exportTransactions = asyncHandler(async (req, res) => {
    const { type } = req.params; // 'income' or 'expense'
    let transactions;
    let filename;

    if (type === 'all') {
        transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1, createdAt: -1 });
        filename = 'All_Transactions_Report.xlsx';
    } else if (type === 'income' || type === 'expense') {
        transactions = await Transaction.find({ user: req.user.id, type }).sort({ date: -1, createdAt: -1 });
        filename = `${type.charAt(0).toUpperCase() + type.slice(1)}_Report.xlsx`;
    } else {
        res.status(400);
        throw new Error('Invalid report type. Must be "income", "expense", or "all".');
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Transactions');

    worksheet.columns = [
        { header: 'Date', key: 'date', width: 15 },
        { header: 'Type', key: 'type', width: 10 },
        { header: 'Title', key: 'title', width: 30 },
        { header: 'Category', key: 'category', width: 20 },
        { header: 'Amount', key: 'amount', width: 15, style: { numFmt: '#,##0.00' } },
        { header: 'Description', key: 'description', width: 40 },
    ];

    transactions.forEach(transaction => {
        worksheet.addRow({
            date: new Date(transaction.date).toLocaleDateString(),
            type: transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1),
            title: transaction.title,
            category: transaction.category,
            amount: transaction.amount,
            description: transaction.description,
        });
    });

    res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
        'Content-Disposition',
        `attachment; filename=${filename}`
    );

    await workbook.xlsx.write(res);
    res.end();
});

module.exports = { exportTransactions };