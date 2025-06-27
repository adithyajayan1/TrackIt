import React, { useEffect } from 'react';
import { useTransactionStore } from '../store/transactionStore'; 
import SummaryCards from '../components/SummaryCard'; 
import RecentTransactions from '../components/RecentTransactions'; 
import ChartsOverview from '../components/ChartsOverview'; 
import toast from 'react-hot-toast'; 

function Dashboard() {
    const { fetchSummary, fetchTransactions, summary, incomes, expenses, loading, error } = useTransactionStore();

    useEffect(() => {
        fetchSummary();
        fetchTransactions('all'); 
    }, [fetchSummary, fetchTransactions]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const allTransactions = [...incomes, ...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
    const recentTransactions = allTransactions.slice(0, 5); 

    if (loading) return <div className="text-center text-text-light">Loading dashboard...</div>;

    return (
        <div className="min-h-screen p-6 bg-primary-dark rounded-lg shadow-inner">
            <h1 className="text-4xl font-bold text-text-light mb-8">Dashboard</h1>

            <SummaryCards summary={summary} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
                <ChartsOverview incomes={incomes} expenses={expenses} />
                <RecentTransactions transactions={recentTransactions} />
            </div>
        </div>
    );
}

export default Dashboard;