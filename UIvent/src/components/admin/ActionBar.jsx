import React, { useState } from "react";

const ActionBar = ({ onCreateEvent, onSearch }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <div className="relative w-full sm:w-64">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
      </div>
      <button
        onClick={onCreateEvent}
        className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
      >
        <i className="fas fa-plus mr-2"></i>
        Create Event
      </button>
    </div>
  );
};

export default ActionBar;
