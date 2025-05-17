import React from 'react';

const TopEvents = () => {  // Mock data for top events
  const topEvents = [
    {
      id: 1,
      name: 'Tech Conference 2023',
      organizer: 'Faculty of Computer Science',
      attendees: 486,
      percentage: 98,
    },
    {
      id: 2,
      name: 'Engineering Workshop',
      organizer: 'Faculty of Engineering',
      attendees: 342,
      percentage: 94,
    },
    {
      id: 3,
      name: 'Startup Networking',
      organizer: 'Entrepreneurship Club',
      attendees: 278,
      percentage: 92,
    },
    {
      id: 4,
      name: 'Data Science Summit',
      organizer: 'Data Science Society',
      attendees: 256,
      percentage: 89,
    },
    {
      id: 5,
      name: 'Career Fair 2023',
      organizer: 'Career Development Center',
      attendees: 214,
      percentage: 85,
    },
  ];  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800">Top Events by Participants</h3>
        <div className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
          View All <i className="fas fa-arrow-right ml-1"></i>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="pb-3">Event</th>
              <th className="pb-3">Participants</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {topEvents.map((event) => (
              <tr key={event.id} className="hover:bg-yellow-50">
                <td className="py-3 pr-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-9 w-9 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
                      <i className="fas fa-calendar-day"></i>
                    </div>
                    <div className="ml-3">                      <div className="text-sm font-medium text-gray-900">{event.name}</div>
                      <div className="text-xs text-gray-500">{event.organizer}</div>
                    </div>
                  </div>
                </td>                <td className="py-3 pr-4">
                  <div className="text-sm font-medium">{event.attendees}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopEvents;
