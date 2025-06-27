import React from 'react';
import { FaMoneyBillWave, FaArrowUp, FaArrowDown } from 'react-icons/fa';

function SummaryCards({ summary }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-secondary-dark p-6 rounded-lg shadow-md flex items-center justify-between">
                <div className="text-text-light">
                    <p className="text-lg text-text-muted">Total Balance</p>
                    <h3 className="text-3xl font-extrabold text-accent-blue mt-1">
                        ₹{summary.totalBalance.toFixed(2)}
                    </h3>
                </div>
                <FaMoneyBillWave className="text-5xl text-accent-blue opacity-50" />
            </div>
            <div className="bg-secondary-dark p-6 rounded-lg shadow-md flex items-center justify-between">
                <div className="text-text-light">
                    <p className="text-lg text-text-muted">Total Income</p>
                    <h3 className="text-3xl font-extrabold text-accent-green mt-1">
                        ₹{summary.totalIncome.toFixed(2)}
                    </h3>
                </div>
                <FaArrowUp className="text-5xl text-accent-green opacity-50" />
            </div>
            <div className="bg-secondary-dark p-6 rounded-lg shadow-md flex items-center justify-between">
                <div className="text-text-light">
                    <p className="text-lg text-text-muted">Total Expenses</p>
                    <h3 className="text-3xl font-extrabold text-accent-red mt-1">
                        ₹{summary.totalExpenses.toFixed(2)}
                    </h3>
                </div>
                <FaArrowDown className="text-5xl text-accent-red opacity-50" />
            </div>
        </div>
    );
}

export default SummaryCards;
