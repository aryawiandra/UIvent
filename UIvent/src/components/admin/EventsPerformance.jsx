import React from 'react';

const EventsPerformance = () => {
  // Mock data for events
  const events = [
    {
      id: 1,
      name: 'Tech Conference 2023',
      location: 'Balairung UI',
      organizer: 'Faculty of Computer Science',
      date: 'May 10, 2023',
      participants: 486,
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Engineering Workshop',
      location: 'Engineering Center',
      organizer: 'Faculty of Engineering',
      date: 'April 25, 2023',
      participants: 342,
      rating: 4.6,
    },
    {
      id: 3,
      name: 'Startup Networking',
      location: 'Innovation Hub',
      organizer: 'Entrepreneurship Club',
      date: 'June 5, 2023',
      participants: 278,
      rating: 4.5,
    },
    {
      id: 4,
      name: 'Data Science Summit',
      location: 'Faculty of CS',
      organizer: 'Data Science Society',
      date: 'March 15, 2023',
      participants: 256,
      rating: 4.7,
    },
    {
      id: 5,
      name: 'Career Fair 2023',
      location: 'Main Campus',
      organizer: 'Career Development Center',
      date: 'February 20, 2023',
      participants: 614,
      rating: 4.3,
    },
    {
      id: 6,
      name: 'Mobile App Development Workshop',
      location: 'Digital Lab',
      organizer: 'Mobile Dev Community',
      date: 'July 8, 2023',
      participants: 185,
      rating: 4.9,
    },
    {
      id: 7,
      name: 'AI Research Conference',
      location: 'Science Center',
      organizer: 'AI Research Group',
      date: 'August 12, 2023',
      participants: 325,
      rating: 4.6,
    },
    {
      id: 8,
      name: 'Blockchain Technology Seminar',
      location: 'Virtual Hall',
      organizer: 'Blockchain Initiative',
      date: 'September 3, 2023',
      participants: 210,
      rating: 4.4,
    },
  ];

  // Generate star rating display
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <i 
            key={i} 
            className={`fas fa-star ${
              i < fullStars 
                ? 'text-yellow-500' 
                : i === fullStars && hasHalfStar 
                  ? 'text-yellow-500' 
                  : 'text-gray-300'
            }`}
          ></i>
        ))}
        <span className="ml-2 text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Events Performance</h2>
        <div className="flex space-x-2">
          <select className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm">
            <option>All Events</option>
            <option>Past Events</option>
            <option>Upcoming Events</option>
          </select>
          <select className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm">
            <option>Sort by Date</option>
            <option>Sort by Participants</option>
            <option>Sort by Rating</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>              
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organizer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Participants</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Rating</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-yellow-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
                      <i className="fas fa-calendar-day"></i>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{event.name}</div>
                      <div className="text-sm text-gray-500">{event.location}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {event.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {event.organizer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{event.participants}</div>
                </td>                
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderStars(event.rating)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing 8 of 24 events
        </div>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Previous</button>
          <button className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">2</button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">3</button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">Next</button>
        </div>
      </div>
    </div>
  );
};

export default EventsPerformance;
