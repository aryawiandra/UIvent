import React from 'react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'registration',
      user: 'John Doe',
      event: 'Tech Conference 2023',
      time: '2 hours ago',
      icon: 'fa-user-plus',
      color: 'blue',
    },
    {
      id: 2,
      type: 'event-created',
      user: 'Alice Smith',
      event: 'Data Science Workshop',
      time: '5 hours ago',
      icon: 'fa-calendar-plus',
      color: 'yellow',
    },
    {
      id: 3,
      type: 'event-update',
      user: 'Robert Johnson',
      event: 'Leadership Bootcamp',
      time: '8 hours ago',
      icon: 'fa-edit',
      color: 'purple',
    },
    {
      id: 4,
      type: 'payment',
      user: 'Emily Wilson',
      event: 'Design Thinking Workshop',
      time: '1 day ago',
      icon: 'fa-credit-card',
      color: 'green',
    },
    {
      id: 5,
      type: 'registration',
      user: 'Michael Brown',
      event: 'Mobile Dev Summit',
      time: '1 day ago',
      icon: 'fa-user-plus',
      color: 'blue',
    },
  ];

  // Function to get background color based on activity type
  const getBgColor = (color) => {
    const colors = {
      blue: 'bg-blue-100',
      yellow: 'bg-yellow-100',
      green: 'bg-green-100',
      purple: 'bg-purple-100',
    };
    return colors[color] || 'bg-gray-100';
  };

  // Function to get text color based on activity type
  const getTextColor = (color) => {
    const colors = {
      blue: 'text-blue-600',
      yellow: 'text-yellow-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
    };
    return colors[color] || 'text-gray-600';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
        <div className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
          View All <i className="fas fa-arrow-right ml-1"></i>
        </div>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start">
            <div className={`flex-shrink-0 h-8 w-8 ${getBgColor(activity.color)} rounded-lg flex items-center justify-center ${getTextColor(activity.color)} mr-3`}>
              <i className={`fas ${activity.icon}`}></i>
            </div>
            <div>
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span> {activity.type === 'registration' ? 'registered for' : activity.type === 'event-created' ? 'created' : activity.type === 'event-update' ? 'updated' : 'paid for'} <span className="font-medium">{activity.event}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
