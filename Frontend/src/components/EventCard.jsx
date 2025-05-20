import { CalendarDays, MapPin, Clock, Tag, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const EventCard = ({
  id,
  image,
  title,
  description,
  venue,
  time_start,
  time_end,
  organization,
  category,
  status, // tambahkan prop status
}) => {
  const navigate = useNavigate();
  const displayImage = image || "/default-event.jpg";
  const displayOrg = organization || "Unknown Organizer";
  const displayCategory = category || "Uncategorized";
  const displayStatus = status || "-";

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-4 md:p-6 max-w-5xl mx-auto hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row">
      {/* Image & Date */}
      <div className="relative flex-shrink-0 w-full md:w-72">
        <img
          src={displayImage}
          alt={title}
          className="w-full h-48 md:h-full object-cover rounded-xl"
        />
        <div className="absolute top-2 left-2 bg-gray-900 text-white text-sm font-semibold px-3 py-1 rounded-md flex items-center gap-2">
          <CalendarDays className="w-4 h-4" />
          {formatDate(time_start)}
        </div>
        {/* Status badge */}
        <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-md shadow">
          {displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1)}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 md:pl-8 mt-4 md:mt-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-700">
              {displayCategory}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mt-3 font-medium">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-yellow-600" />
              {venue}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-yellow-600" />
              {formatTime(time_start)} - {formatTime(time_end)}
            </div>
          </div>
          <p className="text-gray-500 mt-3 mb-6 md:mb-10">{description}</p>
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between mt-auto relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-800 font-bold">
              {displayOrg.charAt(0)}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800">
                {displayOrg}
              </h4>
              <span className="text-xs text-gray-500">Organizer</span>
            </div>
          </div>
          <button
            className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-yellow-500 font-semibold rounded-xl hover:bg-gray-800 transition ml-auto"
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
