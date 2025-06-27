import React, { useState, useEffect } from 'react';
import { useTransactionStore } from '../store/transactionStore'; // Corrected path
import toast from 'react-hot-toast'; // Corrected import
import { FaTrashAlt, FaDownload } from 'react-icons/fa'; // Corrected import
import moment from 'moment';

const expenseCategories = ['Food', 'Transport', 'Utilities', 'Rent', 'Entertainment', 'Shopping', 'Health', 'Education', 'Other'];
const API_BASE_URL = 'http://localhost:5000/api/'; 

function Expenses() {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        date: moment().format('YYYY-MM-DD'),
        category: expenseCategories[0], 
        description: '',
    });
    const { expenses, fetchTransactions, addTransaction, deleteTransaction, loading, error } = useTransactionStore();

    useEffect(() => {
    
        fetchTransactions('expense');
    }, [fetchTransactions]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           
            await addTransaction({ ...formData, type: 'expense' });
            toast.success('Expense added successfully!');
            setFormData({
                title: '',
                amount: '',
                date: moment().format('YYYY-MM-DD'),
                category: expenseCategories[0],
                description: '',
            });
        } catch (err) {
            toast.error(err.message || 'Failed to add expense.');
        }
    };

    const handleDelete = async (id) => {
        // Confirm deletion with the user
        if (window.confirm('Are you sure you want to delete this expense record?')) {
            try {
                
                await deleteTransaction(id, 'expense');
                toast.success('Expense deleted successfully!');
            } catch (err) {
                toast.error(err.message || 'Failed to delete expense.');
            }
        }
    };

    const handleExport = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
            toast.error('You must be logged in to export data.');
            return;
        }

        try {
            toast.loading('Generating report...');
            // Export expenses by calling the backend API
            const response = await fetch(`${API_BASE_URL}reports/export/expense`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to export expense report');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Expense_Report.xlsx');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.dismiss();
            toast.success('Expense report downloaded!');
        } catch (err) {
            toast.dismiss();
            toast.error(`Export failed: ${err.message}`);
        }
    };

    return (
        <div className="min-h-screen p-6 bg-primary-dark rounded-lg shadow-inner">
            <h1 className="text-4xl font-bold text-text-light mb-8">Expense Management</h1>

            <div className="bg-secondary-dark p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold text-text-light mb-4">Add New Expense</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-text-muted text-sm font-bold mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Groceries"
                            className="bg-gray-800 text-text-light border border-gray-700 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-accent-blue"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-text-muted text-sm font-bold mb-2">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="e.g., 50.00"
                            className="bg-gray-800 text-text-light border border-gray-700 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-accent-blue"
                            required
                            min="0"
                        />
                    </div>
                    <div>
                        <label className="block text-text-muted text-sm font-bold mb-2">Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="bg-gray-800 text-text-light border border-gray-700 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-accent-blue"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-text-muted text-sm font-bold mb-2">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="bg-gray-800 text-text-light border border-gray-700 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-accent-blue"
                            required
                        >
                            {expenseCategories.map(cat => ( // Use expense categories here
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-text-muted text-sm font-bold mb-2">Description (Optional)</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Brief description of expense"
                            rows="3"
                            className="bg-gray-800 text-text-light border border-gray-700 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-accent-blue"
                        ></textarea>
                    </div>
                    <div className="col-span-1 md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            className="bg-accent-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-all duration-300 flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'Add Expense'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-secondary-dark p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-text-light">All Expense Records</h2>
                    <button
                        onClick={handleExport}
                        className="bg-accent-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 flex items-center"
                    >
                        <FaDownload className="mr-2" /> Export to Excel
                    </button>
                </div>
                {expenses.length === 0 ? (
                    <p className="text-text-muted text-center py-4">No expense records found. Add one above!</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-secondary-dark divide-y divide-gray-700">
                                {expenses.map((expense) => (
                                    <tr key={expense._id} className="hover:bg-gray-700 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-text-light">
                                            {moment(expense.date).format('YYYY-MM-DD')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-text-light">
                                            {expense.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-text-light">
                                            {expense.category}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-accent-red font-semibold">
                                            -₹{expense.amount.toFixed(2)} {/* Display as negative for expenses */}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleDelete(expense._id)}
                                                className="text-red-500 hover:text-red-700 transition-colors duration-200"
                                                title="Delete Expense"
                                            >
                                                <FaTrashAlt className="inline-block text-lg" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Expenses;
