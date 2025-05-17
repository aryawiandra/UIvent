import EventCard from "../components/EventCard";
import Header from "../components/InHeader";
import Footer from "../components/Footer";
import { Search, Calendar, MapPin, Plus, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const categoryOptions = [
  "All Events",
  "Academics",
  "Sports",
  "Competition",
  "Arts",
];
const statusOptions = ["Upcoming", "Ongoing", "Closed"];

const Dropdown = ({ label, options, selected, setSelected }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 px-4 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors min-w-[140px]"
        onClick={() => setOpen((prev) => !prev)}
      >
        {selected || label}
        <ChevronDown
          size={18}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10"
          >
            {options.map((option) => (
              <li
                key={option}
                className={`px-4 py-2 cursor-pointer hover:bg-yellow-50 ${
                  selected === option ? "bg-yellow-100 font-semibold" : ""
                }`}
                onClick={() => {
                  setSelected(option);
                  setOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5; // Number of events to show per page
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    let url = "http://localhost:5000/api/events";
    const params = new URLSearchParams();
    
    if (selectedCategory && selectedCategory !== "All Events") {
      params.append('category', selectedCategory);
    }
    
    if (selectedStatus) {
      params.append('status', selectedStatus);
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setEvents(data.data);
        } else {
          setError(data.message || "Failed to fetch events");
          setEvents([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
        setEvents([]);
      })
      .finally(() => {
        setIsLoading(false);
        setCurrentPage(1); // Reset to first page when filters change
      });
  }, [selectedCategory, selectedStatus]);
  // Filter events based on searchTerm (case insensitive)
  const filteredEvents = events.filter((event) =>
    event.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Previous and next page functions
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <Header />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h1>
            <p className="text-lg text-gray-600">
              Discover and join exciting events across Universitas Indonesia
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-12 bg-white p-6 rounded-2xl shadow-sm"
          >
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>
              <div className="flex gap-4">
                <button
                  className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 px-4 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                  onClick={() => navigate("/calendar")}
                >
                  <Calendar size={18} />
                  Calendar
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {/* Dropdowns */}
              <Dropdown
                label="Category"
                options={categoryOptions}
                selected={selectedCategory}
                setSelected={setSelectedCategory}
              />
              <Dropdown
                label="Status"
                options={statusOptions}
                selected={selectedStatus}
                setSelected={setSelectedStatus}
              />
            </div>
          </motion.div>          {/* Event Cards - Vertical Stack */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-8 mb-12"
          >
            {isLoading ? (
              <div className="flex flex-col items-center py-10">
                <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 font-medium">Loading events...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <p className="text-red-600 font-medium mb-2">⚠️ {error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="text-red-600 underline text-sm hover:text-red-800"
                >
                  Try again
                </button>
              </div>
            ) : currentEvents.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-10 text-center">
                <p className="text-gray-600 font-medium mb-2">No events found</p>
                <p className="text-gray-500 text-sm">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              currentEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))
            )}
            
            {/* Pagination */}
            {!isLoading && !error && filteredEvents.length > eventsPerPage && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={goToPreviousPage} 
                    disabled={currentPage === 1}
                    className={`px-3 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`w-10 h-10 rounded-md ${currentPage === i + 1 ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button 
                    onClick={goToNextPage} 
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Floating Action Button for Mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="fixed bottom-6 right-6 sm:hidden"
          >
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105">
              <Plus size={24} />
            </button>
          </motion.div>

          {/* Create Event CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Hosting an event?
            </h2>
            <p className="mb-6 text-gray-600">
              Reach thousands of students by listing your event on UIvent
            </p>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto transition-colors"
              onClick={() => navigate("/admin")}
            >
              <Plus size={18} />
              Create New Event
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
