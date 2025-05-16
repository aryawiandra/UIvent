import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Clock,
  Users,
  Ticket,
  Share2,
  Bookmark,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import InHeader from "../components/InHeader";
import { motion } from "framer-motion";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State untuk bookmark
  const [bookmarked, setBookmarked] = useState(false);

  // Scroll ke atas saat page ini dimount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // In a real app, you'd fetch this data based on the ID
  const event = {
    id: 1,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    date: "Jan 15, 2025",
    title: "PSB Genap DTE 2025",
    location: "Lapangan Teknik UI, Depok",
    time: "08:00 - 17:00 WIB",
    description:
      "Pelepasan Sarjana Baru DTE UI 2025 adalah acara perayaan puncak keberhasilan para lulusan Fakultas Teknik UI, khususnya program studi DTE, dalam menyelesaikan pendidikan tinggi mereka.",
    longDescription:
      "Pelepasan Sarjana Baru DTE UI 2025 mengukir momen bersejarah yang mencerminkan dedikasi dan kerja keras para lulusan selama masa studi. Acara ini menampilkan prosesi simbolis pelepasan sarjana yang dipadukan dengan nilai kebersamaan, inovasi, dan semangat untuk menghadapi tantangan global di dunia profesional. Selain merayakan pencapaian akademik, acara ini juga menampilkan paparan visi dan harapan masa depan, memberikan inspirasi serta motivasi untuk menapaki perjalanan karir yang penuh prestasi.",
    organization: "IME FTUI",
    category: "Academic",
    price: "Free",
    capacity: "500 participants",
    contact: "psb@ime.ui.ac.id",
    website: "https://psb.ime.ui.ac.id",
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-yellow-50 to-white"
      initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <InHeader />
      <main className="container mx-auto px-4 py-8 pt-28">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            className="mb-6 flex items-center gap-2 text-yellow-600 hover:underline font-medium"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          {/* Event Hero Section */}
          <div className="mb-8 rounded-2xl overflow-hidden shadow-md">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>

          {/* Event Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  {event.organization}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className={`p-2 rounded-full border border-gray-200 hover:bg-yellow-50 transition ${
                    bookmarked ? "bg-yellow-100 border-yellow-300" : "bg-white"
                  }`}
                  onClick={() => setBookmarked((prev) => !prev)}
                  aria-label="Bookmark"
                >
                  <Bookmark
                    className={`w-5 h-5 transition-colors ${
                      bookmarked
                        ? "text-yellow-500 fill-yellow-400"
                        : "text-gray-700"
                    }`}
                    fill={bookmarked ? "#FACC15" : "none"}
                  />
                </button>
                <button className="p-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-yellow-50">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Event Meta */}
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                    <CalendarDays className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Date & Time
                    </h3>
                    <p className="text-gray-900">{event.date}</p>
                    <p className="text-gray-900">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Location
                    </h3>
                    <p className="text-gray-900">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                    <Ticket className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Price</h3>
                    <p className="text-gray-900">{event.price}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Capacity
                    </h3>
                    <p className="text-gray-900">{event.capacity}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              About This Event
            </h2>
            <p className="text-gray-700 mb-6">{event.longDescription}</p>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Contact
                </h3>
                <p className="text-gray-900">{event.contact}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Website
                </h3>
                <a
                  href={event.website}
                  className="text-yellow-600 hover:underline"
                >
                  {event.website}
                </a>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-yellow-500 rounded-2xl p-6 text-center text-white">
            <h2 className="text-xl font-bold mb-4">
              Ready to join this event?
            </h2>
            <button className="bg-white text-yellow-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors">
              Register Now
            </button>
          </div>

          {/* Similar Events Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Similar Events
            </h2>
            <div className="space-y-6">
              {/* You would map through similar events here */}
              <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                  alt="Similar event"
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-900">
                    PMB Universitas Indonesia 2025
                  </h3>
                  <p className="text-sm text-gray-600">
                    Jan 5, 2025 • 09:00 WIB
                  </p>
                  <button className="text-yellow-600 text-sm font-medium mt-1 hover:underline">
                    View details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default EventDetails;