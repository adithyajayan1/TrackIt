// client/src/pages/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const registerUser = useAuthStore((state) => state.register); 
    const loading = useAuthStore((state) => state.loading);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            toast.success('Registration successful! Please log in.');
            navigate('/login'); 
        } catch (error) {
            toast.error(error.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary-dark">
            <div className="bg-secondary-dark p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-accent-blue mb-6">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-text-muted text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-text-light leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-text-muted text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-text-light leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-text-muted text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-text-light mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="********"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-accent-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition-all duration-300"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Sign Up'}
                        </button>
                        <Link to="/login" className="inline-block align-baseline font-bold text-sm text-accent-blue hover:text-blue-500">
                            Already have an account? Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
