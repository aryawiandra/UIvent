import React, { useEffect, useState } from "react";
import InHeader from "../components/InHeader";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";
import axios from "axios";

const Bookmarks = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ganti dengan cara ambil userId yang sesuai (misal dari context/auth)
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/bookmarks?userId=${userId}`
        );
        setEvents(res.data?.payload || []);
      } catch (err) {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchBookmarks();
    else setLoading(false);
  }, [userId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <InHeader />
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Bookmarked Events
            </h1>
            <p className="text-lg text-gray-600">
              Event-event yang sudah kamu simpan untuk dilihat nanti.
            </p>
          </div>
          <div className="space-y-8">
            {loading ? (
              <div className="text-center text-gray-500 py-16">Loading...</div>
            ) : events.length === 0 ? (
              <div className="text-center text-gray-500 py-16">
                Belum ada event yang dibookmark.
              </div>
            ) : (
              events.map((event) => <EventCard key={event.id} {...event} />)
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Bookmarks;
