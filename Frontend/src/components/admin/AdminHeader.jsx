import React from 'react';

const AdminHeader = ({ onToggleSidebar }) => {
    return (
        <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
            {/* Hamburger menu - only visible on smaller screens */}
            <button 
            className="mr-4 text-gray-600 hover:text-gray-900 lg:hidden"
            onClick={onToggleSidebar}
            >
            <i className="fas fa-bars"></i>
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Event Management</h1>
        </div>
        <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:bg-yellow-50 rounded-full">
            <i className="fas fa-bell"></i>
            </button>
            <div className="flex items-center">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Admin" className="w-8 h-8 rounded-full mr-2"/>
            <span className="text-gray-700">Admin</span>
            </div>
        </div>
        </header>
    );
};

export default AdminHeader;
