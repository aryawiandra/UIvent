import React from 'react';

const StatsCards = ({ statistics }) => {
  const {
    totalEvents = 142,
    totalParticipants = 3842,
    averageAttendance = 87,
    newOrganizations = 28,
    growthRates = {
      events: 12,
      participants: 23,
      attendance: 5,
      organizations: -2,
    }
  } = statistics || {};

  const cards = [
    {
      id: "events",
      title: "Total Events",
      value: totalEvents,
      growth: growthRates.events,
      icon: "fas fa-calendar-alt",
      color: "yellow",
    },
    {
      id: "participants",
      title: "Total Participants",
      value: totalParticipants.toLocaleString(),
      growth: growthRates.participants,
      icon: "fas fa-users",
      color: "blue",
    },
    {
      id: "attendance",
      title: "Avg. Attendance",
      value: `${averageAttendance}%`,
      growth: growthRates.attendance,
      icon: "fas fa-user-check",
      color: "green",
    },
    {
      id: "organizations",
      title: "New Organizations",
      value: newOrganizations,
      growth: growthRates.organizations,
      icon: "fas fa-building",
      color: "purple",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`bg-white p-6 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-[3px] hover:shadow-lg border-l-4 border-${card.color}-500`}
        >
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <p className="text-3xl font-bold mt-1">{card.value}</p>
            </div>
            <div
              className={`p-3 bg-${card.color}-100 rounded-lg text-${card.color}-600`}
            >
              <i className={card.icon}></i>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            <span
              className={`${
                card.growth >= 0 ? "text-green-500" : "text-red-500"
              } font-medium`}
            >
              {card.growth >= 0 ? "↑" : "↓"} {Math.abs(card.growth)}%
            </span>{" "}
            from last period
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
