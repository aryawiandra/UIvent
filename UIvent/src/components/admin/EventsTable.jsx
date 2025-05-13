import React from 'react';

const EventsTable = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {/* Event 1 */}
                        <tr className="hover:bg-yellow-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600">
                                        <i className="fas fa-calendar-day"></i>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">PSB Genap 2025</div>
                                        <div className="text-sm text-gray-500">Lapangan Teknik UI</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">Jan 15, 2025</div>
                                <div className="text-sm text-gray-500">08:00-17:00 WIB</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                IME FTUI
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Active
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Dec 22, 2024
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-yellow-600 hover:text-yellow-800 mr-3"><i className="fas fa-edit"></i></button>
                                <button className="text-red-600 hover:text-red-800"><i className="fas fa-trash"></i></button>
                            </td>
                        </tr>
                        
                        {/* Event 2 */}
                        <tr className="hover:bg-yellow-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                        <i className="fas fa-laptop-code"></i>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">COMPFEST 2025</div>
                                        <div className="text-sm text-gray-500">Balai Sidang UI</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">Feb 20, 2025</div>
                                <div className="text-sm text-gray-500">09:00-21:00 WIB</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                COMPFEST
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    Upcoming
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Jan 3, 2025
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-yellow-600 hover:text-yellow-800 mr-3"><i className="fas fa-edit"></i></button>
                                <button className="text-red-600 hover:text-red-800"><i className="fas fa-trash"></i></button>
                            </td>
                        </tr>
                        
                        {/* Event 3 */}
                        <tr className="hover:bg-yellow-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                                        <i className="fas fa-running"></i>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">Exertion</div>
                                        <div className="text-sm text-gray-500">MRP Quantum UI</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">Mar 10, 2025</div>
                                <div className="text-sm text-gray-500">07:00-15:00 WIB</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Exercise FTUI
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                    Draft
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Apr 28, 2025
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-yellow-600 hover:text-yellow-800 mr-3"><i className="fas fa-edit"></i></button>
                                <button className="text-red-600 hover:text-red-800"><i className="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EventsTable;
