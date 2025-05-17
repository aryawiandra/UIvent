import React, { useState } from 'react';

const EventsRatingTable = ({ events = [], isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('event_name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;
  
  // Filter events based on search term
  const filteredEvents = events.filter(event => 
    event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.organizer_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort events based on sort field and direction
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  // Calculate pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(sortedEvents.length / eventsPerPage);
  
  // Handle sort change
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Reset to first page when sorting
  };
  
  // Handle search change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };
  
  // Handle pagination
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 col-span-1 lg:col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Events Ratings</h3>        
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={handleSearch}
              className="px-3 py-1 pl-8 text-sm border border-gray-200 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
            <i className="fas fa-search absolute left-2.5 top-2 text-gray-400 text-xs"></i>
          </div>
          <button className="text-yellow-600 hover:text-yellow-800">
            <i className="fas fa-download"></i>
          </button>
        </div>
      </div>      
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm leading-normal">
              <th 
                className="py-3 px-6 text-left cursor-pointer hover:bg-gray-100" 
                onClick={() => handleSort('event_name')}
              >
                Event Name
                {sortField === 'event_name' && (
                  <i className={`fas fa-sort-${sortDirection === 'asc' ? 'down' : 'up'} ml-1 text-xs`}></i>
                )}
              </th>
              <th 
                className="py-3 px-6 text-left cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('organizer_name')}
              >
                Organizer
                {sortField === 'organizer_name' && (
                  <i className={`fas fa-sort-${sortDirection === 'asc' ? 'down' : 'up'} ml-1 text-xs`}></i>
                )}
              </th>
              <th 
                className="py-3 px-6 text-center cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('event_start_time')}
              >
                Start Time
                {sortField === 'event_start_time' && (
                  <i className={`fas fa-sort-${sortDirection === 'asc' ? 'down' : 'up'} ml-1 text-xs`}></i>
                )}
              </th>
              <th className="py-3 px-6 text-center">End Time</th>
              <th 
                className="py-3 px-6 text-center cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('participant_count')}
              >
                Participants
                {sortField === 'participant_count' && (
                  <i className={`fas fa-sort-${sortDirection === 'asc' ? 'down' : 'up'} ml-1 text-xs`}></i>
                )}
              </th>
              <th 
                className="py-3 px-6 text-center cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('average_rating')}
              >
                Rating
                {sortField === 'average_rating' && (
                  <i className={`fas fa-sort-${sortDirection === 'asc' ? 'down' : 'up'} ml-1 text-xs`}></i>
                )}
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {isLoading ? (
              <tr>
                <td colSpan="6" className="py-4 px-6 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-pulse flex space-x-2 items-center">
                      <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                      <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                      <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-500 ml-2">Loading data...</span>
                    </div>
                  </div>
                </td>
              </tr>
            ) : currentEvents.length > 0 ? (
              currentEvents.map((event) => (
                <tr
                  key={event.event_id}
                  className="border-b border-gray-200 hover:bg-yellow-50"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap font-medium">
                    {event.event_name}
                  </td>
                  <td className="py-3 px-6 text-left">{event.organizer_name}</td>
                  <td className="py-3 px-6 text-center">
                    {formatDate(event.event_start_time)}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {formatDate(event.event_end_time)}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {event.participant_count || 0}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex items-center justify-center">
                      <span className="font-medium">
                        {event.average_rating
                          ? Number(event.average_rating).toFixed(1)
                          : 'N/A'}
                      </span>
                      {event.average_rating && (
                        <span className="ml-1 text-yellow-500">
                          <i className="fas fa-star"></i>
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-10 px-6 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center">
                    <i className="fas fa-clipboard-list text-4xl mb-2"></i>
                    <p>{searchTerm ? 'No matching events found' : 'No event ratings available'}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {sortedEvents.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            {searchTerm ? (
              <>Showing {indexOfFirstEvent + 1}-{Math.min(indexOfLastEvent, sortedEvents.length)} of {sortedEvents.length} results</>
            ) : (
              <>Showing {indexOfFirstEvent + 1}-{Math.min(indexOfLastEvent, events.length)} of {events.length} events</>
            )}
          </div>
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 border border-gray-200 rounded-lg text-sm ${currentPage > 1 ? 'hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'}`}
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button 
              className={`px-3 py-1 ${currentPage < totalPages ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'} rounded-lg text-sm`}
              onClick={goToNextPage}
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsRatingTable;
