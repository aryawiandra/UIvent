import EventCard from "../components/EventCard";
import Header from "../components/InHeader";
import Footer from "../components/Footer";
import { Search, Calendar, MapPin, Plus, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const categoryOptions = [
  "All Events",
  "Academics",
  "Sports",
  "Competition",
  "Arts",
  "Concerts",
  "Others",
];
const statusOptions = ["All Events", "Upcoming", "Ongoing", "Closed"];

// Mapping status dari DB ke label FE
const statusMap = {
  perencanaan: "Upcoming",
  berjalan: "Ongoing",
  selesai: "Closed",
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";

const categoryList = [
  { id: "896bd5f2-6a16-4965-b5f2-1cde31509f49", name: "Competition" },
  { id: "b0f9b36b-0bbc-40c2-a7c1-dab50befef5b", name: "Academics" },
  { id: "c2b088be-2c7f-4a76-9ce6-9f9055fbae26", name: "Sports" },
  { id: "9e16da27-afe0-4c51-b28e-4ea60255def4", name: "Arts" },
  { id: "a63fb010-9e4d-48dd-8230-2e5e39b3f436", name: "Concerts" },
  { id: "2ac657d7-6e4d-4f6c-a2e6-51f97c3e6398", name: "Others" },
];

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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/events");
        console.log("Backend response:", res.data);

        setEvents(res.data?.payload || []); // Ambil array event dari payload
      } catch (err) {
        console.error("Fetch failed:", err);
        setEvents([]);
      }
    };
    fetchEvents();
  }, []);

  // Filter events berdasarkan searchTerm, kategori, dan status
  const filteredEvents = events.filter((event) => {
    // Filter nama event
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Filter kategori
    let matchesCategory = true;
    if (selectedCategory && selectedCategory !== "All Events") {
      const categoryObj = categoryList.find(
        (cat) => cat.id === event.category_id
      );
      matchesCategory = categoryObj && categoryObj.name === selectedCategory;
    }

    // Filter status
    let matchesStatus = true;
    if (selectedStatus && selectedStatus !== "All Events") {
      const mappedStatus = statusMap[event.status?.toLowerCase()] || "";
      matchesStatus = mappedStatus === selectedStatus;
    }

    return matchesSearch && matchesCategory && matchesStatus;
  });

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
          </motion.div>

          {/* Event Cards - Vertical Stack */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-8 mb-12"
          >
            {filteredEvents.length === 0 ? (
              <div className="text-center text-gray-500 py-16">
                No events found.
              </div>
            ) : (
              filteredEvents.map((event) => {
                const categoryObj = categoryList.find(
                  (cat) => cat.id === event.category_id
                );
                const categoryName = categoryObj
                  ? categoryObj.name
                  : "Uncategorized";
                const mappedStatus =
                  statusMap[event.status?.toLowerCase()] || "-";
                return (
                  <EventCard
                    key={event.id}
                    {...event}
                    image={event.image || DEFAULT_IMAGE}
                    category={categoryName}
                    status={mappedStatus} // <-- gunakan mappedStatus, bukan event.status langsung
                  />
                );
              })
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
