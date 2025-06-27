import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/'; // Replace with your backend URL

export const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,

    register: async (userData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(API_URL + 'register', userData);
            localStorage.setItem('user', JSON.stringify(response.data));
            set({ user: response.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, loading: false });
            throw error; 
        }
    },

    login: async (userData) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(API_URL + 'login', userData);
            localStorage.setItem('user', JSON.stringify(response.data));
            set({ user: response.data, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || error.message, loading: false });
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('user');
        set({ user: null });
    },
}));
