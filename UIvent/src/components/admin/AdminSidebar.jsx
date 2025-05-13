import React from 'react';

const AdminSidebar = ({ isOpen, onClose }) => {
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
            
            {/* Mobile close button */}
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
                <a href="#" className="flex items-center px-4 py-3 text-yellow-600 bg-yellow-100 rounded-lg">
                    <i className="fas fa-calendar-alt mr-3"></i>
                    Events
                </a>
                </li>
                <li>
                <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-yellow-50 rounded-lg">
                    <i className="fas fa-users mr-3"></i>
                    Users
                </a>
                </li>
                <li>
                <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-yellow-50 rounded-lg">
                    <i className="fas fa-chart-bar mr-3"></i>
                    Analytics
                </a>
                </li>
                <li>
                <a href="#" className="flex items-center px-4 py-3 text-gray-600 hover:bg-yellow-50 rounded-lg">
                    <i className="fas fa-cog mr-3"></i>
                    Settings
                </a>
                </li>
            </ul>
            </nav>
        </div>
        </>
    );
};

export default AdminSidebar;