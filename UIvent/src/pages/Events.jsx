import EventCard from "../components/EventCard";
import Header from "../components/InHeader";
import Footer from "../components/Footer";
import { Search, Calendar, MapPin, Plus, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const sampleEvents = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    date: "Jan 15, 2025",
    title: "PSB Genap 2025",
    location: "Lapangan Teknik UI, Depok",
    time: "08:00 - 17:00 WIB",
    description:
      "Pelepasa Sarjana aru periode genap tahun 2025 oleh IME FTUI. Acara ini menampilkan berbagai program studi dan fasilitas yang tersedia.",
    organization: "IME FTUI",
    category: "Others",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865",
    date: "Feb 20, 2025",
    title: "COMPFEST 2025 Grand Launching",
    location: "Balai Sidang UI, Depok",
    time: "09:00 - 21:00 WIB",
    description:
      "Grand launching event teknologi terbesar di Indonesia oleh COMPFEST. Menampilkan pembicara ternama, workshop, dan berbagai kompetisi IT.",
    organization: "COMPFEST",
    category: "Technology",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    date: "Mar 10, 2025",
    title: "Exertion",
    location: "Mochtiar Riady Plaza Quantum, Depok",
    time: "07:00 - 15:00 WIB",
    description:
      "Annual sports competition organized by Exercise FTUI. Berbagai cabang olahraga akan dipertandingkan antar fakultas di lingkungan UI.",
    organization: "Exercise FTUI",
    category: "Sports",
  },
];

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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Filter events berdasarkan searchTerm (tidak case sensitive)
  const filteredEvents = sampleEvents.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            {filteredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
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
