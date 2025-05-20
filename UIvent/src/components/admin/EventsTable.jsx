import React, { useEffect, useState } from "react";
import axios from "axios";
import EditEvents from "../EditEvents";
import CreateEvent from "../admin/CreateEvent"; 
import ActionBar from "./ActionBar";

const statusMap = {
  perencanaan: "Upcoming",
  berjalan: "Ongoing",
  selesai: "Closed",
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";

const EventsTable = () => {
  const [events, setEvents] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [createOpen, setCreateOpen] = useState(false); // Tambahkan state untuk modal create
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          "https://uivent-production.up.railway.app/api/events"
        );
        setEvents(res.data?.payload || []);
      } catch (err) {
        setEvents([]);
      }
    };
    fetchEvents();
  }, []);

  // Filter events berdasarkan searchTerm
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ActionBar
        onCreateEvent={() => setCreateOpen(true)} // Panggil modal CreateEvent
        onSearch={setSearchTerm}
      />
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider w-32">
                  Event
                </th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider w-24">
                  Date
                </th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider w-24">
                  Org
                </th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider w-20">
                  Status
                </th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider w-24">
                  Created
                </th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider w-16">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400">
                    No events found.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-yellow-50">
                    <td className="px-2 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={event.image || DEFAULT_IMAGE}
                          alt={event.title}
                          className="h-7 w-7 object-cover rounded bg-yellow-100"
                        />
                        <div className="ml-2">
                          <div className="font-medium text-gray-900 truncate max-w-[80px]">
                            {event.title}
                          </div>
                          <div className="text-gray-500 truncate max-w-[80px]">
                            {event.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <div>
                        {event.date_start
                          ? new Date(event.date_start).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )
                          : "-"}
                      </div>
                      <div className="text-gray-500">
                        {event.time_start && event.time_end
                          ? `${event.time_start} - ${event.time_end} WIB`
                          : ""}
                      </div>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-gray-500">
                      <span className="truncate block max-w-[60px]">
                        {event.organization_name || "-"}
                      </span>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {statusMap[event.status?.toLowerCase()] ||
                          event.status ||
                          "-"}
                      </span>
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap text-gray-500">
                      {event.created_at
                        ? new Date(event.created_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
                        : "-"}
                    </td>
                    <td className="px-2 py-2 whitespace-nowrap font-medium">
                      <button
                        className="text-yellow-600 hover:text-yellow-800 mr-2"
                        onClick={() => {
                          setEditId(event.id);
                          setEditOpen(true);
                        }}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <EditEvents
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        eventId={editId}
        onUpdated={() => {
          /* fetchEvents() lagi jika ingin refresh */
        }}
      />
      <CreateEvent
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        // Tambahkan onCreated={() => fetchEvents()} jika ingin refresh setelah create
      />
    </>
  );
};

export default EventsTable;
