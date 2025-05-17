import React, { useState } from 'react';

const CreateEvent = ({ isOpen, onClose }) => {
    const [isMultiDay, setIsMultiDay] = useState(false);
    const [isIndefiniteEnd, setIsIndefiniteEnd] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setUploading(true);
        setUploadError('');
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'Finpro_SBD'); // Replace with your Cloudinary upload preset
        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dbdcxwxma/image/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            setForm({ ...form, image: data.secure_url });
        } catch (err) {
            setUploadError('Image upload failed.');
        }
        setUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Send form data (including image URL) to backend
        await fetch('http://localhost:5000/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="relative bg-white rounded-xl shadow-lg w-full max-w-2xl my-8 max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white rounded-t-xl z-10">
                    <h3 className="text-lg font-semibold text-gray-900">Create New Event</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="p-6 overflow-y-auto flex-grow">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" />
                            </div>                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                                <input name="organization" type="text" value={form.organization} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" />
                            </div>
                            
                            {/* Date Selection Section */}
                            <div className="md:col-span-2">
                                <div className="flex items-center mb-2">
                                    <input 
                                        type="checkbox" 
                                        id="multiDay" 
                                        className="mr-2 h-4 w-4 text-yellow-500 focus:ring-yellow-400"
                                        checked={isMultiDay}
                                        onChange={(e) => setIsMultiDay(e.target.checked)}
                                    />
                                    <label htmlFor="multiDay" className="text-sm font-medium text-gray-700">Multi-day event</label>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {isMultiDay ? 'Start Date' : 'Date'}
                                        </label>
                                        <input 
                                            type="date" 
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" 
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Format: YYYY-MM-DD</p>
                                    </div>
                                    
                                    {isMultiDay && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                            <input 
                                                type="date" 
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" 
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Format: YYYY-MM-DD</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* Time Selection Section */}
                            <div className="md:col-span-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                        <input 
                                            type="time" 
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" 
                                        />
                                        <p className="text-xs text-gray-500 mt-1">24-hour format (HH:MM)</p>
                                    </div>
                                    
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <label className="block text-sm font-medium text-gray-700">End Time</label>
                                            <div className="flex items-center">
                                                <input 
                                                    type="checkbox" 
                                                    id="indefiniteEnd" 
                                                    className="mr-2 h-4 w-4 text-yellow-500 focus:ring-yellow-400"
                                                    checked={isIndefiniteEnd}
                                                    onChange={(e) => setIsIndefiniteEnd(e.target.checked)}
                                                />
                                                <label htmlFor="indefiniteEnd" className="text-sm text-gray-700">Until Finished</label>
                                            </div>
                                        </div>
                                        
                                        {!isIndefiniteEnd ? (
                                            <>
                                                <input 
                                                    type="time" 
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" 
                                                />
                                                <p className="text-xs text-gray-500 mt-1">24-hour format (HH:MM)</p>
                                            </>
                                        ) : (
                                            <div className="px-3 py-2 border border-gray-300 bg-gray-50 rounded-lg text-gray-500 w-full">
                                                Until Finished
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                                <input name="venue" type="text" value={form.venue} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea name="description" rows="3" value={form.description} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select name="category" value={form.category} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500">
                                    <option value="">Select Category</option>
                                    <option>Academics</option>
                                    <option>Sports</option>
                                    <option>Competition</option>
                                    <option>Arts</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select name="status" value={form.status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-yellow-500 focus:border-yellow-500">
                                    <option value="">Select Status</option>
                                    <option>Upcoming</option>
                                    <option>Ongoing</option>
                                    <option>Closed</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
                                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
                                {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                                {uploadError && <p className="text-sm text-red-500 mt-1">{uploadError}</p>}
                                {form.image && <img src={form.image} alt="Preview" className="w-32 h-32 mt-2 object-cover rounded" />}
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex justify-end space-x-3 p-4 border-t sticky bottom-0 bg-white rounded-b-xl">
                    <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" form="event-form" className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                        Create Event
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;