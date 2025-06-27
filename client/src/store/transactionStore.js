import { create } from 'zustand';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/'; // Replace with your backend URL

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
};

export const useTransactionStore = create((set, get) => ({
    incomes: [],
    expenses: [],
    summary: { totalIncome: 0, totalExpenses: 0, totalBalance: 0 },
    loading: false,
    error: null,

    fetchTransactions: async (type = 'all') => {
        set({ loading: true, error: null });
        try {
            const url = `${API_BASE_URL}transactions${type !== 'all' ? `?type=${type}` : ''}`;
            const response = await axios.get(url, { headers: getAuthHeader() });

            if (type === 'income') {
                set({ incomes: response.data, loading: false });
            } else if (type === 'expense') {
                set({ expenses: response.data, loading: false });
            } else { // 'all'
                const allTransactions = response.data;
                set({
                    incomes: allTransactions.filter(t => t.type === 'income'),
                    expenses: allTransactions.filter(t => t.type === 'expense'),
                    loading: false
                });
            }
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, loading: false });
        }
    },

    fetchSummary: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${API_BASE_URL}transactions/summary`, { headers: getAuthHeader() });
            set({ summary: response.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, loading: false });
        }
    },

    addTransaction: async (transactionData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${API_BASE_URL}transactions`, transactionData, { headers: getAuthHeader() });
            const newTransaction = response.data;
            set(state => {
                if (newTransaction.type === 'income') {
                    return { incomes: [...state.incomes, newTransaction], loading: false };
                } else {
                    return { expenses: [...state.expenses, newTransaction], loading: false };
                }
            });
            get().fetchSummary(); 
            return newTransaction;
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, loading: false });
            throw error;
        }
    },

    deleteTransaction: async (id, type) => {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${API_BASE_URL}transactions/${id}`, { headers: getAuthHeader() });
            set(state => {
                if (type === 'income') {
                    return { incomes: state.incomes.filter(t => t._id !== id), loading: false };
                } else {
                    return { expenses: state.expenses.filter(t => t._id !== id), loading: false };
                }
            });
            get().fetchSummary(); 
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, loading: false });
        }
    }
}));