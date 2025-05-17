import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar = ({ isOpen, onClose, activeItem }) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // If activeItem is not provided, determine it from the current path
    const currentPath = location.pathname;
    const currentActiveItem = activeItem || (
        currentPath.includes('/statistics') ? 'statistics' :
        currentPath.includes('/users') ? 'users' :
        currentPath.includes('/settings') ? 'settings' : 
        'events'
    );

    const menuItems = [
        { id: "events", title: "Events", icon: "fas fa-calendar-alt", path: "/admin" },
        { id: "statistics", title: "Statistics", icon: "fas fa-chart-bar", path: "/admin/statistics" },
        { id: "users", title: "Users", icon: "fas fa-users", path: "/admin/users" },
        { id: "settings", title: "Settings", icon: "fas fa-cog", path: "/admin/settings" },
    ];

    const handleNavigation = (path) => {
        navigate(path);
        if (window.innerWidth < 1024) { // Close sidebar on mobile after navigation
            onClose && onClose();
        }
    };

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
            
            <nav className="space-y-1">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        className={`flex items-center w-full px-4 py-3 rounded-lg ${
                            currentActiveItem === item.id
                                ? 'text-yellow-600 bg-yellow-100'
                                : 'text-gray-600 hover:bg-yellow-50'
                        }`}
                        onClick={() => handleNavigation(item.path)}
                    >
                        <i className={`${item.icon} mr-3`}></i>
                        {item.title}
                    </button>
                ))}
            </nav>
        </div>
        </>
    );
};

export default AdminSidebar;