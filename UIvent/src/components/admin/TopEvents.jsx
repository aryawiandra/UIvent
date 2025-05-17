import React from "react";

const TopEvents = ({ events = [] }) => {
  const getBadgeColor = (category) => {
    const colors = {
      Technology: "yellow",
      Sports: "blue",
      Academic: "green",
      Cultural: "purple",
      Other: "gray",
    };
    return colors[category] || "gray";
  };
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Top 5 Events by Attendance
      </h3>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`flex items-center justify-between p-3 ${
              index === 0 ? "bg-yellow-50" : "hover:bg-gray-50"
            } rounded-lg`}
          >
            <div className="flex items-center">
              <div
                className={`w-10 h-10 ${
                  index === 0 ? "bg-yellow-100 text-yellow-600" : 
                  index === 1 ? "bg-blue-100 text-blue-600" : 
                  "bg-green-100 text-green-600"
                } rounded-lg flex items-center justify-center mr-4`}
              >
                {index === 0 ? <i className="fas fa-trophy"></i> : index + 1}
              </div>
              <div>
                <p className="font-medium">{event.name}</p>
                <p className="text-sm text-gray-500">
                  {event.participants.toLocaleString()} participants
                </p>
              </div>
            </div>
            <span
              className={`bg-${getBadgeColor(
                event.category
              )}-100 text-${getBadgeColor(
                event.category
              )}-800 px-2 py-1 rounded-full text-xs font-medium`}
            >
              {event.category}
            </span>
          </div>
        ))}

        {/* Show empty state if no events */}
        {events.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <i className="fas fa-chart-bar text-4xl mb-2"></i>
            <p>No events data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopEvents;
