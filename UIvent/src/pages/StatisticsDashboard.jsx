import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import StatsCards from "../components/admin/StatsCards";
import EventsRatingTable from "../components/admin/EventsRatingTable";
import TopEvents from "../components/admin/TopEvents";
import RecentActivity from "../components/admin/RecentActivity";

const StatisticsDashboard = () => {
  const [timeRange, setTimeRange] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState({
    totalEvents: 142,
    totalParticipants: 3842,
    averageAttendance: 87,
    newOrganizations: 28,
    growthRates: {
      events: 12,
      participants: 23,
      attendance: 5,
      organizations: -2,
    },
  });

  const [topEvents, setTopEvents] = useState([
    {
      id: 1,
      name: "COMPFEST 2024",
      participants: 1248,
      category: "Technology",
      rank: 1,
    },
    {
      id: 2,
      name: "Exertion 2024",
      participants: 876,
      category: "Sports",
      rank: 2,
    },
    {
      id: 3,
      name: "PSB Ganjil 2024",
      participants: 754,
      category: "Academic",
      rank: 3,
    },
  ]);

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: "create",
      title: "New event created",
      description: "PSB Genap 2025",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "update",
      title: "Event updated",
      description: "COMPFEST 2025",
      time: "5 hours ago",
    },
    {
      id: 3,
      type: "complete",
      title: "Event completed",
      description: "Exertion 2024",
      time: "1 day ago",
    },
    {
      id: 4,
      type: "report",
      title: "Statistics report",
      description: "Monthly summary",
      time: "2 days ago",
    },
  ]);

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
    fetchStatisticsData(e.target.value);
  };  // State for events rating table
  const [eventsRatings, setEventsRatings] = useState([
    {
      event_id: 1,
      event_name: "COMPFEST 2024",
      organizer_name: "Computer Science Student Association",
      event_start_time: "2024-08-15T08:00:00",
      event_end_time: "2024-08-15T17:00:00",
      participant_count: 1248,
      average_rating: 4.8
    },
    {
      event_id: 2,
      event_name: "PSB Genap 2025",
      organizer_name: "IME FTUI",
      event_start_time: "2025-01-15T08:00:00",
      event_end_time: "2025-01-15T17:00:00",
      participant_count: 754,
      average_rating: 4.5
    },
    {
      event_id: 3,
      event_name: "Exertion 2024",
      organizer_name: "Exercise FTUI",
      event_start_time: "2024-09-10T07:00:00",
      event_end_time: "2024-09-10T15:00:00",
      participant_count: 876,
      average_rating: 4.2
    },
    {
      event_id: 4,
      event_name: "UI Job Fair 2024",
      organizer_name: "Career Development Center UI",
      event_start_time: "2024-11-05T09:00:00",
      event_end_time: "2024-11-06T17:00:00",
      participant_count: 1872,
      average_rating: 4.7
    },
    {
      event_id: 5,
      event_name: "Seminar Teknologi AI",
      organizer_name: "Fakultas Ilmu Komputer",
      event_start_time: "2024-10-20T13:00:00",
      event_end_time: "2024-10-20T16:00:00",
      participant_count: 325,
      average_rating: 4.6
    }
  ]);

  const fetchStatisticsData = async (selectedTimeRange) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5000/api/statistics?timeRange=${selectedTimeRange}`
      );
      const data = await response.json();

      if (data.success) {
        setStatistics(data.data.stats || statistics);
        setTopEvents(data.data.topEvents || topEvents);
        setRecentActivity(data.data.activities || recentActivity);
        
        // Fetch events ratings
        const eventsResponse = await fetch("http://localhost:5000/api/statistics/events");
        const eventsData = await eventsResponse.json();
        
        if (eventsData.success) {
          setEventsRatings(eventsData.data || []);
        }
      } else {
        setError(data.message || "Failed to fetch statistics");
      }
    } catch (err) {
      console.error("Error fetching statistics:", err);
      setError("Failed to connect to the server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data from backend on component mount
  useEffect(() => {
    // Uncomment this to fetch real data
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch events ratings
        const eventsResponse = await fetch("http://localhost:5000/api/statistics/events");
        const eventsData = await eventsResponse.json();
        
        if (eventsData.success) {
          setEventsRatings(eventsData.data || []);
        }
        
        // Fetch general statistics
        const statsResponse = await fetch(`http://localhost:5000/api/statistics/general`);
        const statsData = await statsResponse.json();
        
        if (statsData.success) {
          setStatistics({
            totalEvents: statsData.data.total_events || 0,
            totalParticipants: statsData.data.total_participants || 0,
            averageAttendance: statsData.data.average_attendance || 0,
            newOrganizations: statsData.data.organization_count || 0,
            growthRates: {
              events: 12, // These would come from a different endpoint or calculation
              participants: 23,
              attendance: 5,
              organizations: -2,
            }
          });
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to connect to the server. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    // Comment out to use dummy data during development
    // fetchData();
  }, []);

  // Handle downloading reports
  const handleDownloadReport = () => {
    // In a real app, this would generate and download a report
    alert("Report download feature will be implemented soon!");
  };
  return (
    <div className="flex h-screen overflow-hidden bg-yellow-50">
      <div className="transition-all duration-300">
        <AdminSidebar
          activeItem="statistics"
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
          <div className="flex items-center">
            {/* Mobile sidebar toggle */}
            <button
              className="mr-4 text-gray-600 lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <i className="fas fa-bars"></i>
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              Event Statistics Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={timeRange}
                onChange={handleTimeRangeChange}
                className="appearance-none bg-white border border-gray-200 px-4 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                disabled={isLoading}
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
                <option value="all">All Time</option>
              </select>
              <i className="fas fa-chevron-down absolute right-3 top-3 text-gray-400 pointer-events-none"></i>
            </div>
            <button
              className="p-2 text-gray-600 hover:bg-yellow-50 rounded-full"
              onClick={handleDownloadReport}
              disabled={isLoading}
            >
              <i className="fas fa-download"></i>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {isLoading && (
            <div className="flex justify-center mb-6">
              <div className="animate-pulse flex space-x-2 items-center">
                <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-500 ml-2">Loading data...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
              <p className="flex items-center">
                <i className="fas fa-exclamation-circle mr-2"></i>
                {error}
              </p>
            </div>
          )}          {/* Stats Cards */}
          <StatsCards statistics={statistics} />
          
          {/* Events Rating Table (replaces charts) */}
          <div className="mb-8">
            <EventsRatingTable
              events={eventsRatings}
              isLoading={isLoading}
            />
          </div>

          {/* Additional Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <TopEvents events={topEvents} />
            <RecentActivity activities={recentActivity} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StatisticsDashboard;