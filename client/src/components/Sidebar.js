import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaPlus, FaMinus, FaSignOutAlt } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore'; 
import toast from 'react-hot-toast';

function Sidebar() {
    const location = useLocation();
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully!');
    };

    const navItems = [
        { name: 'Dashboard', icon: FaHome, path: '/' },
        { name: 'Income', icon: FaPlus, path: '/income' },
        { name: 'Expenses', icon: FaMinus, path: '/expenses' },
    ];

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-secondary-dark p-6 flex flex-col justify-between shadow-lg">
            <div>
                <h1 className="text-3xl font-extrabold text-accent-blue mb-10 text-center">
                    TrackIt
                </h1>
                <nav>
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.name} className="mb-4">
                                <Link
                                    to={item.path}
                                    className={`flex items-center p-3 rounded-lg text-text-light text-lg font-medium transition-colors duration-200
                                        ${location.pathname === item.path ? 'bg-primary-dark text-accent-blue shadow-inner' : 'hover:bg-primary-dark hover:text-accent-blue'}`}
                                >
                                    <item.icon className="mr-4 text-xl" />
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="mt-auto">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full p-3 rounded-lg text-red-400 text-lg font-medium hover:bg-primary-dark hover:text-red-300 transition-colors duration-200"
                >
                    <FaSignOutAlt className="mr-4 text-xl" />
                    Logout
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;