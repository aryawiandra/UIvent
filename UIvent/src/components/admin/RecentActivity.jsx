import React from "react";

const RecentActivity = ({ activities = [] }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case "create":
        return <i className="fas fa-calendar-plus text-sm"></i>;
      case "update":
        return <i className="fas fa-user-edit text-sm"></i>;
      case "complete":
        return <i className="fas fa-check-circle text-sm"></i>;
      case "report":
        return <i className="fas fa-chart-line text-sm"></i>;
      default:
        return <i className="fas fa-bell text-sm"></i>;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "create":
        return "yellow";
      case "update":
        return "blue";
      case "complete":
        return "green";
      case "report":
        return "purple";
      default:
        return "gray";
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start">
            <div
              className={`p-2 bg-${getActivityColor(
                activity.type
              )}-100 rounded-full text-${getActivityColor(
                activity.type
              )}-600 mr-3`}
            >
              {getActivityIcon(activity.type)}
            </div>
            <div>
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-xs text-gray-500">
                {activity.description} • {activity.time}
              </p>
            </div>
          </div>
        ))}

        {/* Show empty state if no activities */}
        {activities.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <i className="fas fa-history text-4xl mb-2"></i>
            <p>No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
