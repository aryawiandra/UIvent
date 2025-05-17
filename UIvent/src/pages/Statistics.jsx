import React, { useState } from 'react';
import StatsCards from '../components/admin/StatsCards';
import EventsPerformance from '../components/admin/EventsPerformance';
import TopEvents from '../components/admin/TopEvents';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';

const Statistics = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // This would typically come from your authentication context or API
  const [userRole, setUserRole] = useState('admin'); // 'admin' or 'organization'
  
  // For demo purposes, let's add a toggle
  const toggleRole = () => {
    setUserRole(userRole === 'admin' ? 'organization' : 'admin');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="font-sans bg-yellow-50">
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} activePage="statistics" />
        <div className="flex-1 overflow-auto">
          <AdminHeader 
            title={userRole === 'admin' ? "Event Statistics Dashboard" : "Organization Statistics"} 
            onToggleSidebar={toggleSidebar} 
          />
          
          {/* Role toggle for demo purposes - would be removed in production */}
          <div className="bg-blue-100 p-2 flex justify-center items-center">
            <button 
              onClick={toggleRole} 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Switch to {userRole === 'admin' ? 'Organization' : 'Admin'} View (Demo)
            </button>
            <p className="ml-3 text-blue-800">Current view: <strong>{userRole === 'admin' ? 'Admin' : 'Organization'}</strong></p>
          </div>
          
          <main className="p-6">
            {/* Stats Cards - different metrics for different roles */}
            {userRole === 'admin' ? (
              <AdminStatsView />
            ) : (
              <OrganizationStatsView />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

// Admin statistics view component
const AdminStatsView = () => {
  return (
    <>
      <StatsCards />
      <EventsPerformance />
      <TopEvents />
    </>
  );
};

// Organization statistics view component
const OrganizationStatsView = () => {
  // Mock data for organization's events
  const orgEvents = [
    {
      id: 1,
      name: "Tech Workshop 2023",
      date: "June 15, 2023",
      participants: 78,
      registrations: 85,
      rating: 4.6
    },
    {
      id: 2,
      name: "Annual Conference",
      date: "August 20, 2023",
      participants: 156,
      registrations: 180,
      rating: 4.2
    },
    {
      id: 3,
      name: "Networking Mixer",
      date: "October 5, 2023",
      participants: 45,
      registrations: 50,
      rating: 4.8
    }
  ];

  return (
    <>
      {/* Organization-specific statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="stat-card bg-white p-6 rounded-xl shadow-sm transition-all duration-200 border-l-4 border-blue-500 hover:transform hover:translate-y-[-3px] hover:shadow-lg">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Your Events</p>
              <p className="text-3xl font-bold mt-1">3</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <i className="fas fa-calendar-alt"></i>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            <span className="text-green-500 font-medium">↑ 1</span> from last month
          </p>
        </div>
        
        <div className="stat-card bg-white p-6 rounded-xl shadow-sm transition-all duration-200 border-l-4 border-green-500 hover:transform hover:translate-y-[-3px] hover:shadow-lg">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Participants</p>
              <p className="text-3xl font-bold mt-1">279</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg text-green-600">
              <i className="fas fa-users"></i>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            <span className="text-green-500 font-medium">↑ 34</span> from last month
          </p>
        </div>
          <div className="stat-card bg-white p-6 rounded-xl shadow-sm transition-all duration-200 border-l-4 border-purple-500 hover:transform hover:translate-y-[-3px] hover:shadow-lg">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Upcoming Events</p>
              <p className="text-3xl font-bold mt-1">2</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
              <i className="fas fa-calendar-plus"></i>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            <span className="text-green-500 font-medium">↑ 1</span> from last month
          </p>
        </div>
        
        <div className="stat-card bg-white p-6 rounded-xl shadow-sm transition-all duration-200 border-l-4 border-yellow-500 hover:transform hover:translate-y-[-3px] hover:shadow-lg">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Rating</p>
              <p className="text-3xl font-bold mt-1">4.5</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600">
              <i className="fas fa-star"></i>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            <span className="text-green-500 font-medium">↑ 0.2</span> from last month
          </p>
        </div>
      </div>
      
      {/* Organization's events table */}      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Your Events Performance</h2>
        </div>
          <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registrations</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orgEvents.map((event) => (
                <tr key={event.id} className="hover:bg-yellow-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
                        <i className="fas fa-calendar-day"></i>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{event.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{event.registrations}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star ${i < Math.floor(event.rating) ? 'text-yellow-500' : 'text-gray-300'}`}></i>
                      ))}
                      <span className="ml-2 text-gray-700">{event.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Statistics;
