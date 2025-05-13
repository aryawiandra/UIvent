import { CalendarDays, MapPin, Clock, ArrowUpRight } from "lucide-react";

const EventCard = ({ 
    image, 
    date, 
    title, 
    location, 
    time, 
    description, 
    organization 
}) => {
    return (
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden p-4 md:p-6 max-w-5xl mx-auto hover:shadow-lg transition-shadow duration-300">
        
        {/* Image & Date */}
        <div className="relative flex-shrink-0">
            <img
            src={image}
            alt={title}
            className="w-full md:w-72 h-48 md:h-full object-cover rounded-xl"
            />
            <div className="absolute top-2 left-2 bg-gray-900 text-white text-sm font-semibold px-3 py-1 rounded-md flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            {date}
            </div>
        </div>

        {/* Content */}
        <div className="md:ml-6 mt-4 md:mt-0 flex flex-col justify-between">
            <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mt-3 font-medium">
                <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-yellow-600" />
                {location}
                </div>
                <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-yellow-600" />
                {time}
                </div>
            </div>

            <p className="text-gray-500 mt-3">
                {description}
            </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-800 font-bold">
                    {organization.charAt(0)}
                </div>
                <div>
                <h4 className="text-sm font-semibold text-gray-800">{organization}</h4>
                <span className="text-xs text-gray-500">Organizer</span>
                </div>
            </div>

            <button className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-yellow-500 font-semibold rounded-xl hover:bg-gray-800 transition">
                Event Details <ArrowUpRight className="w-4 h-4" />
            </button>
            </div>
        </div>
        </div>
    );
};

export default EventCard;