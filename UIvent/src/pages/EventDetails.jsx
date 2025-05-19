import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Clock,
  Users,
  Ticket,
  Bookmark,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import InHeader from "../components/InHeader";
import { motion } from "framer-motion";
import axios from "axios";

// Mapping status dari DB ke label FE
const statusMap = {
  perencanaan: "Upcoming",
  berjalan: "Ongoing",
  selesai: "Closed",
};

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`https://uivent-production.up.railway.app/api/events/${id}`);
        setEvent(res.data?.payload);
      } catch (err) {
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Event not found.
      </div>
    );
  }

  // Format tanggal dan waktu
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  const formatTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Ambil status FE dari status DB
  const displayStatus = statusMap[event.status?.toLowerCase()] || "-";

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
              src={
                event.image ||
                "https://images.unsplash.com/photo-1587829741301-dc798b83add3"
              }
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
                  {event.organization || "Unknown Organizer"}
                </p>
                {/* Tampilkan status FE */}
                <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold mt-2">
                  {displayStatus}
                </span>
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
                    <p className="text-gray-900">
                      {formatDate(event.time_start)}
                    </p>
                    <p className="text-gray-900">
                      {formatTime(event.time_start)} -{" "}
                      {formatTime(event.time_end)}
                    </p>
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
                    <p className="text-gray-900">{event.venue}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                    <Ticket className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Price</h3>
                    <p className="text-gray-900">{event.price || "Free"}</p>
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
                    <p className="text-gray-900">{event.capacity || "-"}</p>
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
            <p className="text-gray-700 mb-6">{event.description}</p>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Contact
                </h3>
                <p className="text-gray-900">{event.contact || "-"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Website
                </h3>
                <a
                  href={event.website || "#"}
                  className="text-yellow-600 hover:underline"
                >
                  {event.website || "-"}
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
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default EventDetails;
