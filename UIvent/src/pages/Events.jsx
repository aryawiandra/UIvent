import EventCard from "../components/EventCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Search, Calendar, MapPin, Filter, Plus } from "lucide-react";

const sampleEvents = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
        date: "Jan 15, 2025",
        title: "PSB Genap 2025",
        location: "Lapangan Teknik UI, Depok",
        time: "08:00 - 17:00 WIB",
        description: "Penerimaan mahasiswa baru periode genap tahun 2025 oleh IME FTUI. Acara ini menampilkan berbagai program studi dan fasilitas yang tersedia.",
        organization: "IME FTUI",
        category: "Academic"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865",
        date: "Feb 20, 2025",
        title: "COMPFEST 2025 Grand Launching",
        location: "Balai Sidang UI, Depok",
        time: "09:00 - 21:00 WIB",
        description: "Grand launching event teknologi terbesar di Indonesia oleh COMPFEST. Menampilkan pembicara ternama, workshop, dan berbagai kompetisi IT.",
        organization: "COMPFEST",
        category: "Technology"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
        date: "Mar 10, 2025",
        title: "Exertion",
        location: "Mochtiar Riady Plaza Quantum, Depok",
        time: "07:00 - 15:00 WIB",
        description: "Annual sports competition organized by Exercise FTUI. Berbagai cabang olahraga akan dipertandingkan antar fakultas di lingkungan UI.",
        organization: "Exercise FTUI",
        category: "Sports"
    }
];

const Events = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        <Header />
        
        <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto"> {/* Reduced max-width for better readability */}
            
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Upcoming Events
                </h1>
                <p className="text-lg text-gray-600">
                Discover and join exciting events across Universitas Indonesia
                </p>
            </div>

            {/* Search and Filter */}
            <div className="mb-12 bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                    type="text"
                    placeholder="Search events..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    />
                </div>
                <div className="flex gap-4">
                    <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 px-4 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors">
                    <Calendar size={18} />
                    Date
                    </button>
                    <button className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 px-4 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors">
                    <MapPin size={18} />
                    Location
                    </button>
                </div>
                </div>
                <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    All Events
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                    Academic
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                    Technology
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                    Sports
                </button>
                </div>
            </div>

            {/* Event Cards - Vertical Stack */}
            <div className="space-y-8 mb-12">
                {sampleEvents.map((event) => (
                <EventCard key={event.id} {...event} />
                ))}
            </div>

            {/* Floating Action Button for Mobile */}
            <div className="fixed bottom-6 right-6 sm:hidden">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105">
                <Plus size={24} />
                </button>
            </div>

            {/* Create Event CTA */}
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Hosting an event?</h2>
                <p className="mb-6 text-gray-600">
                Reach thousands of students by listing your event on UIvent
                </p>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto transition-colors">
                <Plus size={18} />
                Create New Event
                </button>
            </div>
            </div>
        </main>

        <Footer />
        </div>
    );
};

export default Events;