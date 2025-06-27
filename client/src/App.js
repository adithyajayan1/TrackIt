import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login'; 
import Register from './pages/Register'; 
import Dashboard from './pages/Dashboard'; 
import Income from './pages/Income'; 
import Expenses from './pages/Expenses'; 
import Sidebar from './components/Sidebar'; 
import { useAuthStore } from './store/authStore'; 
import { Toaster } from 'react-hot-toast'; 

const PrivateRoute = ({ children }) => {
    const { user } = useAuthStore();
    return user ? children : <Navigate to="/login" />;
};

function App() {
    const { user } = useAuthStore();

    return (
        <Router>
            <div className="flex h-screen bg-primary-dark text-text-light font-inter">
                {user && <Sidebar />} {/* Show sidebar only if logged in */}
                <main className={`flex-1 overflow-auto p-6 ${user ? 'ml-64' : ''} transition-all duration-300 ease-in-out`}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        <Route path="/income" element={<PrivateRoute><Income /></PrivateRoute>} />
                        <Route path="/expenses" element={<PrivateRoute><Expenses /></PrivateRoute>} />
                        {/* Redirect to dashboard if logged in, else to login */}
                        <Route path="*" element={user ? <Navigate to="/" /> : <Navigate to="/login" />} />
                    </Routes>
                </main>
                <Toaster position="bottom-right" reverseOrder={false} />
            </div>
        </Router>
    );
}

export default App;