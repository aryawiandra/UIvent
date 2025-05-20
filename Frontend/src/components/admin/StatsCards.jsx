import React, { useEffect, useState } from "react";
import axios from "axios";

const statusMap = {
  perencanaan: "Upcoming",
  berjalan: "Ongoing",
  selesai: "Closed",
};

const StatsCards = () => {
  const [stats, setStats] = useState({
    total: 0,
    upcoming: 0,
    ongoing: 0,
    closed: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "https://uivent-production.up.railway.app/api/events"
        );
        const events = res.data?.payload || [];
        const total = events.length;
        let upcoming = 0,
          ongoing = 0,
          closed = 0;
        events.forEach((event) => {
          const mapped = statusMap[event.status?.toLowerCase()];
          if (mapped === "Upcoming") upcoming++;
          else if (mapped === "Ongoing") ongoing++;
          else if (mapped === "Closed") closed++;
        });
        setStats({ total, upcoming, ongoing, closed });
      } catch {
        setStats({ total: 0, upcoming: 0, ongoing: 0, closed: 0 });
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-yellow-500">
        <h3 className="text-gray-500 text-sm">Total Events</h3>
        <p className="text-2xl font-bold">{stats.total}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-blue-500">
        <h3 className="text-gray-500 text-sm">Upcoming</h3>
        <p className="text-2xl font-bold">{stats.upcoming}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-green-500">
        <h3 className="text-gray-500 text-sm">Ongoing</h3>
        <p className="text-2xl font-bold">{stats.ongoing}</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-red-500">
        <h3 className="text-gray-500 text-sm">Closed</h3>
        <p className="text-2xl font-bold">{stats.closed}</p>
      </div>
    </div>
  );
};

export default StatsCards;
