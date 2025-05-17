import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = ({ isOpen, onClose, activePage = "events" }) => {
    return (
        <>
        {/* Mobile overlay - only visible when sidebar is open on small screens */}
        {isOpen && (
            <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={onClose}
            ></div>
        )}
        
        {/* Sidebar - changes position and visibility based on screen size and state */}
        <div className={`sidebar fixed lg:static inset-y-0 left-0 bg-white shadow-lg z-30 
                        transform transition-transform duration-300 ease-in-out 
                        lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                        w-64 px-4 py-8`}>
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-xl mr-2">
                        UI
                    </div>
                    <span className="text-xl font-bold text-yellow-600">UIvent Admin</span>
                </div>
                {/* Close button - only visible on small screens */}
                <button 
                    className="lg:hidden text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    <i className="fas fa-times"></i>
                </button>
            </div>
            
            <nav>
            <ul className="space-y-2">
                <li>
                <Link 
                    to="/admin" 
                    className={`flex items-center px-4 py-3 rounded-lg ${activePage === "events" ? "text-yellow-600 bg-yellow-100" : "text-gray-600 hover:bg-yellow-50"}`}
                >
                    <i className="fas fa-calendar-alt mr-3"></i>
                    Events
                </Link>
                </li>
                <li>
                <Link 
                    to="#" 
                    className={`flex items-center px-4 py-3 rounded-lg ${activePage === "users" ? "text-yellow-600 bg-yellow-100" : "text-gray-600 hover:bg-yellow-50"}`}
                >
                    <i className="fas fa-users mr-3"></i>
                    Users
                </Link>
                </li>
                <li>
                <Link 
                    to="/admin/statistics" 
                    className={`flex items-center px-4 py-3 rounded-lg ${activePage === "statistics" ? "text-yellow-600 bg-yellow-100" : "text-gray-600 hover:bg-yellow-50"}`}
                >
                    <i className="fas fa-chart-bar mr-3"></i>
                    Statistics
                </Link>
                </li>
                <li>
                <Link 
                    to="#" 
                    className={`flex items-center px-4 py-3 rounded-lg ${activePage === "settings" ? "text-yellow-600 bg-yellow-100" : "text-gray-600 hover:bg-yellow-50"}`}
                >
                    <i className="fas fa-cog mr-3"></i>
                    Settings
                </Link>
                </li>
            </ul>
            </nav>
        </div>
        </>
    );
};

export default AdminSidebar;