import React, { useState } from "react";
import InHeader from "../components/InHeader";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";

// Contoh data event yang dibookmark (ganti dengan data dari state/global store jika sudah ada)
const bookmarkedEvents = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    date: "Jan 15, 2025",
    title: "PSB Genap DTE 2025",
    location: "Lapangan Teknik UI, Depok",
    time: "08:00 - 17:00 WIB",
    description:
      "Pelepasan Sarjana Baru DTE UI 2025 adalah acara perayaan puncak keberhasilan para lulusan Fakultas Teknik UI.",
    organization: "IME FTUI",
  },
  // Tambahkan event lain jika perlu
];

const Bookmarks = () => {
  // Jika nanti ada state global, ganti bookmarkedEvents dengan state/props
  const [events] = useState(bookmarkedEvents);

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
            {events.length === 0 ? (
              <div className="text-center text-gray-500 py-16">
                Belum ada event yang dibookmark.
              </div>
            ) : (
              events.map((event) => (
                <EventCard key={event.id} {...event} />
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Bookmarks;