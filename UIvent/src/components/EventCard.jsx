import { CalendarDays, MapPin, Clock, ArrowUpRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const EventCard = ({
  image_url,
  time_start,
  time_end,
  title,
  venue,
  description,
  organizer_id,
  id,
  status
}) => {
  const [organizerName, setOrganizerName] = useState("");
  const navigate = useNavigate();
  
  // Format date from ISO string
  const startDate = new Date(time_start);
  const formattedDate = startDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  
  // Format time from ISO string
  const formattedTime = `${startDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })}`;

  // Truncate description if it's too long
  const truncatedDescription = description && description.length > 150 
    ? `${description.substring(0, 150)}...` 
    : description;

  // Fetch organizer name when component mounts
  useEffect(() => {
    if (organizer_id) {
      fetch(`http://localhost:5000/api/users/${organizer_id}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setOrganizerName(data.data.name || data.data.username || "Unknown Organizer");
          }
        })
        .catch(err => {
          console.error("Error fetching organizer details:", err);
          setOrganizerName("Unknown Organizer");
        });
    }
  }, [organizer_id]);

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden p-4 md:p-6 max-w-5xl mx-auto hover:shadow-lg transition-shadow duration-300">
      {/* Image & Date */}
      <div className="relative flex-shrink-0">
        <img
          src={image_url || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={title}
          className="w-full md:w-72 h-48 md:h-full object-cover rounded-xl"
        />
        <div className="absolute top-2 left-2 bg-gray-900 text-white text-sm font-semibold px-3 py-1 rounded-md flex items-center gap-2">
          <CalendarDays className="w-4 h-4" />
          {formattedDate}
        </div>
        {status && (
          <div className={`absolute top-2 right-2 text-sm font-semibold px-3 py-1 rounded-md ${
            status === 'Upcoming' ? 'bg-blue-500 text-white' : 
            status === 'Ongoing' ? 'bg-green-500 text-white' : 
            'bg-gray-500 text-white'
          }`}>
            {status}
          </div>
        )}
      </div>      {/* Content */}
      <div className="md:ml-6 mt-4 md:mt-0 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title || "Untitled Event"}
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mt-3 font-medium">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-yellow-600" />
              {venue || "Location not specified"}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-yellow-600" />
              {formattedTime || "Time not specified"}
            </div>
          </div>

          <p className="text-gray-500 mt-3">{truncatedDescription || "No description provided."}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-800 font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800">
                {organizerName || "Loading..."}
              </h4>
              <span className="text-xs text-gray-500">Organizer</span>
            </div>
          </div>

          <button
            className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-yellow-500 font-semibold rounded-xl hover:bg-gray-800 transition"
            onClick={() => navigate(`/events/${id}`)}
          >
            Event Details <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
