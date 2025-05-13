import React, { useState } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import StatsCards from '../components/admin/StatsCards';
import EventsTable from '../components/admin/EventsTable';
import CreateEvent from '../components/admin/CreateEvent';
import ActionBar from '../components/admin/ActionBar';

const AdminDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="font-sans bg-yellow-50">
        <div className="flex h-screen overflow-hidden">
            <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="flex-1 overflow-auto">
            <AdminHeader onToggleSidebar={toggleSidebar} />
            <main className="p-6">                <ActionBar onCreateEvent={handleOpenModal} />
                <StatsCards />
                <EventsTable />
                <CreateEvent isOpen={isModalOpen} onClose={handleCloseModal} />
            </main>
            </div>
        </div>
        </div>
    );
};

export default AdminDashboard;
