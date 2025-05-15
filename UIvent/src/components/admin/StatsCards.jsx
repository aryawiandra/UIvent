import React from 'react';

const StatsCards = () => {  
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="stat-card bg-white p-6 rounded-xl shadow-sm transition-all duration-200 border-l-4 border-yellow-500 hover:transform hover:translate-y-[-3px] hover:shadow-lg">
                <div className="flex justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Events</p>
                        <p className="text-3xl font-bold mt-1">142</p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600">
                        <i className="fas fa-calendar-alt"></i>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    <span className="text-green-500 font-medium">↑ 12%</span> from last period
                </p>
            </div>
            
            <div className="stat-card bg-white p-6 rounded-xl shadow-sm transition-all duration-200 border-l-4 border-blue-500 hover:transform hover:translate-y-[-3px] hover:shadow-lg">
                <div className="flex justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Participants</p>
                        <p className="text-3xl font-bold mt-1">3,842</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                        <i className="fas fa-users"></i>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    <span className="text-green-500 font-medium">↑ 23%</span> from last period
                </p>
            </div>
            
            <div className="stat-card bg-white p-6 rounded-xl shadow-sm transition-all duration-200 border-l-4 border-green-500 hover:transform hover:translate-y-[-3px] hover:shadow-lg">
                <div className="flex justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Active Organizations</p>
                        <p className="text-3xl font-bold mt-1">42</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg text-green-600">
                        <i className="fas fa-building"></i>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    <span className="text-green-500 font-medium">↑ 8%</span> from last period
                </p>
            </div>
        </div>
    );
};

export default StatsCards;
