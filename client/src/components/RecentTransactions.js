import React from 'react';
import moment from 'moment';

function RecentTransactions({ transactions }) {
    return (
        <div className="bg-secondary-dark p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-text-light mb-4">Recent Transactions</h2>
            {transactions.length === 0 ? (
                <p className="text-text-muted">No recent transactions found.</p>
            ) : (
                <ul>
                    {transactions.map((t) => (
                        <li
                            key={t._id}
                            className="flex justify-between items-center py-3 border-b border-gray-700 last:border-b-0"
                        >
                            <div>
                                <p className="text-text-light font-medium">{t.title}</p>
                                <p className="text-sm text-text-muted">{moment(t.date).format('MMM D,YYYY')}</p>
                            </div>
                            <p className={`text-lg font-semibold ${t.type === 'income' ? 'text-accent-green' : 'text-accent-red'}`}>
                                {t.type === 'income' ? '+' : '-'}₹{t.amount.toFixed(2)}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default RecentTransactions;
