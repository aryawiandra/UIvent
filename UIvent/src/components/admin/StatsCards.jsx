import React from 'react';

const StatsCards = () => {  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-yellow-500">
            <h3 className="text-gray-500 text-sm">Total Events</h3>
            <p className="text-2xl font-bold">24</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
            <h3 className="text-gray-500 text-sm">Upcoming</h3>
            <p className="text-2xl font-bold">8</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm">Ongoing</h3>
            <p className="text-2xl font-bold">12</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-500">
            <h3 className="text-gray-500 text-sm">Past Events</h3>
            <p className="text-2xl font-bold">4</p>
        </div>
    </div>
    );
};

export default StatsCards;
