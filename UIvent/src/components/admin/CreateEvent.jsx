import React, { useState } from "react";
import axios from "axios";

const categoryOptions = [
  "Academics",
  "Sports",
  "Competition",
  "Arts",
  "Concerts",
  "Others",
];

const statusOptions = ["Upcoming", "Ongoing", "Closed"];
const statusMapReverse = {
  Upcoming: "perencanaan",
  Ongoing: "berjalan",
  Closed: "selesai",
};

const CreateEvent = ({ isOpen, onClose, onCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [category, setCategory] = useState(categoryOptions[0]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://uivent-production.up.railway.app/api/events", {
        title,
        description,
        venue,
        time_start: `${dateStart}T${timeStart}`,
        time_end: `${dateEnd}T${timeEnd}`,
        category,
        status: statusMapReverse[status],
        image_url: imageUrl,
      });
      if (onCreated) onCreated();
      onClose();
      // Reset form
      setTitle("");
      setDescription("");
      setVenue("");
      setDateStart("");
      setDateEnd("");
      setTimeStart("");
      setTimeEnd("");
      setCategory(categoryOptions[0]);
      setStatus(statusOptions[0]);
      setImageUrl("");
    } catch (err) {
      alert("Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-2xl my-8 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white rounded-t-xl z-10">
          <h3 className="text-lg font-semibold text-gray-900">
            Create New Event
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-grow">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Venue
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={dateEnd}
                  onChange={(e) => setDateEnd(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={timeStart}
                  onChange={(e) => setTimeStart(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={timeEnd}
                  onChange={(e) => setTimeEnd(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categoryOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
